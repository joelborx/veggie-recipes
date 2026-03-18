/**
 * Sharing Routes
 * Handles recipe sharing via shareable links
 */

const express = require('express');
const crypto = require('crypto');
const Recipe = require('../models/Recipe');
const SharedRecipe = require('../models/SharedRecipe');
const { verifyToken } = require('../middleware/auth');

// Router for recipe-scoped sharing routes (POST /:id/share, GET /:id/shares)
const recipeSharingRouter = express.Router();

// Router for public shared access routes (GET /:token, DELETE /:token)
const publicSharingRouter = express.Router();

/**
 * @route   POST /:id/share
 * @desc    Generate a shareable link for a recipe
 * @access  Private
 * @params  { id }
 * @body    { expiresInDays } - Optional, defaults to 30 days
 */
recipeSharingRouter.post('/:id/share', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { expiresInDays = 30 } = req.body;
    const userId = req.userId;

    // Validate recipe exists
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    // Check if recipe is active
    if (!recipe.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Cannot share inactive recipe'
      });
    }

    // Validate expiration days
    const days = parseInt(expiresInDays);
    if (isNaN(days) || days < 1 || days > 365) {
      return res.status(400).json({
        success: false,
        message: 'Expiration must be between 1 and 365 days'
      });
    }

    // Generate unique token
    let token;
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 10;

    while (!isUnique && attempts < maxAttempts) {
      token = crypto.randomBytes(8).toString('hex'); // 16 character hex string
      const existing = await SharedRecipe.findOne({ token });
      if (!existing) {
        isUnique = true;
      }
      attempts++;
    }

    if (!isUnique) {
      return res.status(500).json({
        success: false,
        message: 'Failed to generate unique share token'
      });
    }

    // Calculate expiration date
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + days);

    // Create share record
    const sharedRecipe = new SharedRecipe({
      recipe: id,
      token,
      createdBy: userId,
      expiresAt
    });

    await sharedRecipe.save();

    // Construct share URL
    const baseUrl = process.env.FRONTEND_URL || process.env.APP_URL || 'http://localhost:4200';
    const shareUrl = `${baseUrl}/shared/${token}`;

    res.status(201).json({
      success: true,
      message: 'Share link created successfully',
      data: {
        shareUrl,
        token,
        expiresAt,
        recipe: {
          id: recipe._id,
          title: recipe.title
        }
      }
    });
  } catch (error) {
    console.error('Create share error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create share link',
      error: error.message
    });
  }
});

/**
 * @route   GET /:id/shares
 * @desc    Get all active share links for a recipe (created by current user)
 * @access  Private
 * @params  { id }
 */
recipeSharingRouter.get('/:id/shares', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // Find all shares for this recipe created by the current user
    const shares = await SharedRecipe.find({
      recipe: id,
      createdBy: userId,
      expiresAt: { $gt: new Date() }
    }).sort({ createdAt: -1 });

    const baseUrl = process.env.FRONTEND_URL || process.env.APP_URL || 'http://localhost:4200';

    const shareLinks = shares.map(share => ({
      token: share.token,
      shareUrl: `${baseUrl}/shared/${share.token}`,
      expiresAt: share.expiresAt,
      createdAt: share.createdAt
    }));

    res.json({
      success: true,
      data: {
        shares: shareLinks,
        count: shareLinks.length
      }
    });
  } catch (error) {
    console.error('Get shares error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get share links',
      error: error.message
    });
  }
});

/**
 * @route   GET /:token
 * @desc    Get shared recipe by token (public, no auth required)
 * @access  Public
 * @params  { token }
 */
publicSharingRouter.get('/:token', async (req, res) => {
  try {
    const { token } = req.params;

    // Find the share record
    const sharedRecipe = await SharedRecipe.findOne({ token })
      .populate('recipe')
      .populate('createdBy', 'username profile.firstName profile.lastName');

    if (!sharedRecipe) {
      return res.status(404).json({
        success: false,
        message: 'Share link not found or has been revoked'
      });
    }

    // Check if expired
    if (sharedRecipe.isExpired()) {
      return res.status(410).json({
        success: false,
        message: 'Share link has expired',
        data: {
          expiredAt: sharedRecipe.expiresAt
        }
      });
    }

    // Check if recipe is still active
    if (!sharedRecipe.recipe || !sharedRecipe.recipe.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Recipe is no longer available'
      });
    }

    res.json({
      success: true,
      data: {
        recipe: sharedRecipe.recipe,
        sharedBy: {
          id: sharedRecipe.createdBy._id,
          username: sharedRecipe.createdBy.username,
          name: sharedRecipe.createdBy.profile 
            ? `${sharedRecipe.createdBy.profile.firstName || ''} ${sharedRecipe.createdBy.profile.lastName || ''}`.trim()
            : sharedRecipe.createdBy.username
        },
        sharedAt: sharedRecipe.createdAt,
        expiresAt: sharedRecipe.expiresAt
      }
    });
  } catch (error) {
    console.error('Get shared recipe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get shared recipe',
      error: error.message
    });
  }
});

/**
 * @route   DELETE /:token
 * @desc    Revoke a share link
 * @access  Private (only the creator can revoke)
 * @params  { token }
 */
publicSharingRouter.delete('/:token', verifyToken, async (req, res) => {
  try {
    const { token } = req.params;
    const userId = req.userId;

    // Find the share record
    const sharedRecipe = await SharedRecipe.findOne({ token });

    if (!sharedRecipe) {
      return res.status(404).json({
        success: false,
        message: 'Share link not found'
      });
    }

    // Check if user is the creator
    if (sharedRecipe.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only revoke share links you created'
      });
    }

    // Delete the share record
    await SharedRecipe.deleteOne({ token });

    res.json({
      success: true,
      message: 'Share link revoked successfully'
    });
  } catch (error) {
    console.error('Revoke share error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to revoke share link',
      error: error.message
    });
  }
});

module.exports = {
  recipeSharingRouter,
  publicSharingRouter
};
