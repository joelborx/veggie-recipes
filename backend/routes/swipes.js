/**
 * Swipe Routes
 * Handles swipe actions (like, dislike, superlike) and swipe history
 * Base path: /api/swipes
 */

const express = require('express');
const router = express.Router();
const SwipeAction = require('../models/SwipeAction');
const Recipe = require('../models/Recipe');
const { verifyToken } = require('../middleware/auth');

// Valid swipe actions
const VALID_ACTIONS = ['like', 'dislike', 'superlike'];

/**
 * @route   POST /api/swipes
 * @desc    Record a swipe action (like/dislike/superlike)
 * @access  Private
 * @body    { recipeId, action }
 */
router.post('/', verifyToken, async (req, res) => {
  try {
    const { recipeId, action } = req.body;
    
    // Input validation
    if (!recipeId || !action) {
      return res.status(400).json({
        success: false,
        message: 'Recipe ID and action are required'
      });
    }
    
    if (!VALID_ACTIONS.includes(action)) {
      return res.status(400).json({
        success: false,
        message: `Action must be one of: ${VALID_ACTIONS.join(', ')}`
      });
    }
    
    // Verify recipe exists
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }
    
    // Save swipe action (upsert to handle re-swipes)
    const swipeAction = await SwipeAction.findOneAndUpdate(
      { userId: req.userId, recipeId },
      { 
        userId: req.userId, 
        recipeId, 
        action, 
        timestamp: new Date() 
      },
      { upsert: true, new: true }
    );
    
    // Update recipe swipe stats
    const updateField = `swipeStats.${action}s`;
    await Recipe.findByIdAndUpdate(recipeId, {
      $inc: { [updateField]: 1 }
    });
    
    res.json({
      success: true,
      message: 'Swipe recorded successfully',
      data: { swipeAction }
    });
  } catch (error) {
    console.error('Swipe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to record swipe',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/swipes/history
 * @desc    Get user's swipe history with pagination
 * @access  Private
 * @query   { page, limit }
 */
router.get('/history', verifyToken, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    const [swipes, total] = await Promise.all([
      SwipeAction.find({ userId: req.userId })
        .populate('recipeId', 'title images nutrition tags')
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      SwipeAction.countDocuments({ userId: req.userId })
    ]);
    
    res.json({
      success: true,
      data: {
        swipes,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum)
        }
      }
    });
  } catch (error) {
    console.error('Get swipe history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get swipe history',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/swipes/liked
 * @desc    Get all recipes the user has liked (like or superlike)
 * @access  Private
 * @query   { page, limit }
 */
router.get('/liked', verifyToken, async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    const [likedSwipes, total] = await Promise.all([
      SwipeAction.find({
        userId: req.userId,
        action: { $in: ['like', 'superlike'] }
      })
        .populate('recipeId')
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      SwipeAction.countDocuments({
        userId: req.userId,
        action: { $in: ['like', 'superlike'] }
      })
    ]);
    
    const recipes = likedSwipes.map(swipe => ({
      ...swipe.recipeId,
      swipedAt: swipe.timestamp,
      swipeAction: swipe.action
    })).filter(r => r._id); // Filter out any null recipes
    
    res.json({
      success: true,
      data: { 
        recipes,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum)
        }
      }
    });
  } catch (error) {
    console.error('Get liked recipes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get liked recipes',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/swipes/recommendations/debug
 * @desc    Get recommendation debug info (for development)
 * @access  Private
 */
router.get('/recommendations/debug', verifyToken, async (req, res) => {
  try {
    // Get user's liked recipes
    const likedSwipes = await SwipeAction.find({
      userId: req.userId,
      action: { $in: ['like', 'superlike'] }
    }).populate('recipeId', 'tags title');
    
    const likedTags = likedSwipes.flatMap(swipe => swipe.recipeId?.tags || []);
    const tagCounts = {};
    likedTags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
    
    // Get disliked tags for comparison
    const dislikedSwipes = await SwipeAction.find({
      userId: req.userId,
      action: 'dislike'
    }).populate('recipeId', 'tags');
    
    const dislikedTags = dislikedSwipes.flatMap(swipe => swipe.recipeId?.tags || []);
    const dislikedTagCounts = {};
    dislikedTags.forEach(tag => {
      dislikedTagCounts[tag] = (dislikedTagCounts[tag] || 0) + 1;
    });
    
    res.json({
      success: true,
      data: {
        likedCount: likedSwipes.length,
        dislikedCount: dislikedSwipes.length,
        likedTagPreferences: tagCounts,
        dislikedTagPreferences: dislikedTagCounts
      }
    });
  } catch (error) {
    console.error('Get recommendations debug error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get recommendations debug info',
      error: error.message
    });
  }
});

module.exports = router;