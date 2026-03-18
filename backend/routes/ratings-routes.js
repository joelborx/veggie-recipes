/**
 * Ratings & Reviews Routes
 * Handles recipe ratings and reviews
 * Base path: /api/recipes
 */

const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const { verifyToken } = require('../middleware/auth');

/**
 * @route   POST /api/recipes/:id/rate
 * @desc    Add or update a rating (1-5 stars) for a recipe
 * @access  Private
 * @params  { id }
 * @body    { rating: Number (1-5) }
 */
router.post('/:id/rate', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;
    const userId = req.userId;

    // Validate rating
    if (!rating || typeof rating !== 'number' || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be a number between 1 and 5'
      });
    }

    // Find recipe
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    // Check if user already rated this recipe
    const existingRatingIndex = recipe.ratings.findIndex(
      r => r.user.toString() === userId.toString()
    );

    if (existingRatingIndex >= 0) {
      // Update existing rating
      recipe.ratings[existingRatingIndex].rating = rating;
      recipe.ratings[existingRatingIndex].date = new Date();
    } else {
      // Add new rating
      recipe.ratings.push({
        user: userId,
        rating: rating,
        date: new Date()
      });
    }

    // Calculate new average and count
    const totalRatings = recipe.ratings.length;
    const sumRatings = recipe.ratings.reduce((sum, r) => sum + r.rating, 0);
    recipe.ratingStats.average = Math.round((sumRatings / totalRatings) * 10) / 10;
    recipe.ratingStats.count = totalRatings;

    await recipe.save();

    res.json({
      success: true,
      message: existingRatingIndex >= 0 ? 'Rating updated successfully' : 'Rating added successfully',
      data: {
        rating: rating,
        ratingStats: recipe.ratingStats
      }
    });
  } catch (error) {
    console.error('Add rating error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add rating',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/recipes/:id/ratings
 * @desc    Get all ratings and reviews for a recipe
 * @access  Public
 * @params  { id }
 * @query   { page, limit, includeReviews }
 */
router.get('/:id/ratings', async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 20, includeReviews = 'true' } = req.query;

    // Find recipe with populated ratings
    const recipe = await Recipe.findById(id)
      .populate('ratings.user', 'username profile.firstName profile.lastName profile.avatar');

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    // Filter to only ratings with reviews if requested
    let ratings = recipe.ratings;
    if (includeReviews === 'only') {
      ratings = ratings.filter(r => r.review && r.review.trim().length > 0);
    }

    // Sort by date (newest first)
    ratings.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const total = ratings.length;
    const paginatedRatings = ratings.slice((pageNum - 1) * limitNum, pageNum * limitNum);

    // Calculate rating distribution
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    recipe.ratings.forEach(r => {
      if (distribution[r.rating] !== undefined) {
        distribution[r.rating]++;
      }
    });

    res.json({
      success: true,
      data: {
        ratings: paginatedRatings,
        ratingStats: recipe.ratingStats,
        distribution,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum)
        }
      }
    });
  } catch (error) {
    console.error('Get ratings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get ratings',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/recipes/top-rated
 * @desc    Get top rated recipes
 * @access  Public
 * @query   { limit, minRatings }
 */
router.get('/top-rated', async (req, res) => {
  try {
    const { limit = 10, minRatings = 1 } = req.query;
    const limitNum = parseInt(limit);
    const minRatingsNum = parseInt(minRatings);

    const recipes = await Recipe.find({
      isActive: true,
      'ratingStats.count': { $gte: minRatingsNum }
    })
      .sort({ 'ratingStats.average': -1, 'ratingStats.count': -1 })
      .limit(limitNum)
      .lean();

    res.json({
      success: true,
      data: {
        recipes,
        count: recipes.length
      }
    });
  } catch (error) {
    console.error('Get top rated error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get top rated recipes',
      error: error.message
    });
  }
});

/**
 * @route   POST /api/recipes/:id/review
 * @desc    Add or update a text review for a recipe
 * @access  Private
 * @params  { id }
 * @body    { review: String }
 */
router.post('/:id/review', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { review } = req.body;
    const userId = req.userId;

    // Validate review
    if (!review || typeof review !== 'string' || review.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Review text is required'
      });
    }

    if (review.length > 2000) {
      return res.status(400).json({
        success: false,
        message: 'Review cannot exceed 2000 characters'
      });
    }

    // Find recipe
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    // Check if user has already rated this recipe
    const existingRatingIndex = recipe.ratings.findIndex(
      r => r.user.toString() === userId.toString()
    );

    if (existingRatingIndex >= 0) {
      // Update existing rating with review
      recipe.ratings[existingRatingIndex].review = review.trim();
      recipe.ratings[existingRatingIndex].date = new Date();
    } else {
      // Create a new rating entry with just a review (no numeric rating)
      // This creates an entry where rating might be null
      recipe.ratings.push({
        user: userId,
        rating: null,
        review: review.trim(),
        date: new Date()
      });
    }

    await recipe.save();

    res.json({
      success: true,
      message: 'Review added successfully',
      data: {
        review: review.trim(),
        ratingStats: recipe.ratingStats
      }
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add review',
      error: error.message
    });
  }
});

/**
 * @route   DELETE /api/recipes/:id/rate
 * @desc    Remove user's rating and review from a recipe
 * @access  Private
 * @params  { id }
 */
router.delete('/:id/rate', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // Find recipe
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    // Remove user's rating
    const originalLength = recipe.ratings.length;
    recipe.ratings = recipe.ratings.filter(
      r => r.user.toString() !== userId.toString()
    );

    if (recipe.ratings.length === originalLength) {
      return res.status(404).json({
        success: false,
        message: 'You have not rated this recipe'
      });
    }

    // Recalculate rating stats
    const numericRatings = recipe.ratings.filter(r => r.rating !== null && r.rating !== undefined);
    if (numericRatings.length > 0) {
      const sumRatings = numericRatings.reduce((sum, r) => sum + r.rating, 0);
      recipe.ratingStats.average = Math.round((sumRatings / numericRatings.length) * 10) / 10;
      recipe.ratingStats.count = numericRatings.length;
    } else {
      recipe.ratingStats.average = 0;
      recipe.ratingStats.count = 0;
    }

    await recipe.save();

    res.json({
      success: true,
      message: 'Rating removed successfully',
      data: {
        ratingStats: recipe.ratingStats
      }
    });
  } catch (error) {
    console.error('Remove rating error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove rating',
      error: error.message
    });
  }
});

module.exports = router;
