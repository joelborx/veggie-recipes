/**
 * Recipe Routes
 * Handles recipe CRUD, search/filter operations, and recommendations
 * Base path: /api/recipes
 */

const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const SwipeAction = require('../models/SwipeAction');
const { verifyToken, optionalAuth } = require('../middleware/auth');
const { verifyAdmin } = require('../middleware/admin');

/**
 * @route   GET /api/recipes
 * @desc    Get all recipes with pagination and filtering
 * @access  Public (optional auth for personalization)
 * @query   { page, limit, tags, difficulty, maxTime, minCalories, maxCalories, minProtein, isVegan, isGlutenFree, search }
 */
router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      tags,
      difficulty,
      maxTime,
      minCalories,
      maxCalories,
      minProtein,
      isVegan,
      isGlutenFree,
      search
    } = req.query;
    
    // Build query
    const query = { isActive: true };
    
    // Apply filters
    if (tags) {
      const tagList = tags.split(',').map(t => t.trim()).filter(Boolean);
      query.tags = { $in: tagList };
    }
    
    if (difficulty) {
      const validDifficulties = ['easy', 'medium', 'hard'];
      if (validDifficulties.includes(difficulty)) {
        query.difficulty = difficulty;
      }
    }
    
    if (maxTime) {
      query['time.total'] = { $lte: parseInt(maxTime) };
    }
    
    if (minCalories || maxCalories) {
      query['nutrition.calories'] = {};
      if (minCalories) query['nutrition.calories'].$gte = parseInt(minCalories);
      if (maxCalories) query['nutrition.calories'].$lte = parseInt(maxCalories);
    }
    
    if (minProtein) {
      query['nutrition.protein'] = { $gte: parseInt(minProtein) };
    }
    
    if (isVegan === 'true') {
      query['dietaryInfo.isVegan'] = true;
    }
    
    if (isGlutenFree === 'true') {
      query['dietaryInfo.isGlutenFree'] = true;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'ingredients.name': { $regex: search, $options: 'i' } }
      ];
    }
    
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    // Execute query with pagination
    const [recipes, total] = await Promise.all([
      Recipe.find(query)
        .sort({ 'ratings.average': -1, createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Recipe.countDocuments(query)
    ]);
    
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
    console.error('Get recipes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get recipes',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/recipes/recommendations
 * @desc    Get personalized recipe recommendations for logged-in user
 * @access  Private
 * @query   { limit }
 */
router.get('/recommendations', verifyToken, async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const user = req.user;
    const limitNum = parseInt(limit);
    
    // Get user's swipe history to understand preferences
    const likedSwipes = await SwipeAction.find({
      userId: req.userId,
      action: { $in: ['like', 'superlike'] }
    }).populate('recipeId', 'tags');
    
    // Extract preferred tags from liked recipes
    const likedRecipeIds = likedSwipes.map(s => s.recipeId?._id?.toString()).filter(Boolean);
    const tagCounts = {};
    likedSwipes.forEach(swipe => {
      (swipe.recipeId?.tags || []).forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    
    // Sort tags by preference
    const preferredTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([tag]) => tag);
    
    // Build recommendation query
    const query = { 
      isActive: true,
      _id: { $nin: likedRecipeIds } // Exclude already liked recipes
    };
    
    // Apply dietary restrictions
    if (user.profile?.dietaryRestrictions?.includes('vegan')) {
      query['dietaryInfo.isVegan'] = true;
    }
    if (user.profile?.dietaryRestrictions?.includes('gluten-free')) {
      query['dietaryInfo.isGlutenFree'] = true;
    }
    
    // Get recommendations - prioritize preferred tags
    let recipes = [];
    
    if (preferredTags.length > 0) {
      // First get recipes matching preferred tags
      recipes = await Recipe.find({
        ...query,
        tags: { $in: preferredTags }
      })
        .sort({ 'ratings.average': -1, 'swipeStats.likes': -1 })
        .limit(limitNum)
        .lean();
    }
    
    // Fill remaining slots with popular recipes
    if (recipes.length < limitNum) {
      const existingIds = recipes.map(r => r._id.toString());
      const additionalRecipes = await Recipe.find({
        ...query,
        _id: { $nin: [...likedRecipeIds, ...existingIds] }
      })
        .sort({ 'ratings.average': -1, 'swipeStats.likes': -1 })
        .limit(limitNum - recipes.length)
        .lean();
      
      recipes = [...recipes, ...additionalRecipes];
    }
    
    // If still not enough, get random recipes
    if (recipes.length < limitNum) {
      const existingIds = recipes.map(r => r._id.toString());
      const randomRecipes = await Recipe.aggregate([
        { 
          $match: { 
            isActive: true,
            _id: { $nin: [...likedRecipeIds.map(id => new mongoose.Types.ObjectId(id)), ...existingIds.map(id => new mongoose.Types.ObjectId(id))] }
          } 
        },
        { $sample: { size: limitNum - recipes.length } }
      ]);
      recipes = [...recipes, ...randomRecipes];
    }
    
    res.json({
      success: true,
      data: { 
        recipes,
        preferences: preferredTags
      }
    });
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get recommendations',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/recipes/:id
 * @desc    Get single recipe by ID
 * @access  Public (optional auth)
 * @params  { id }
 */
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }
    
    res.json({
      success: true,
      data: { recipe }
    });
  } catch (error) {
    console.error('Get recipe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get recipe',
      error: error.message
    });
  }
});

/**
 * @route   POST /api/recipes
 * @desc    Create new recipe (Admin only)
 * @access  Private (Admin)
 * @body    Recipe object
 */
router.post('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const recipeData = req.body;
    
    // Validate required fields
    if (!recipeData.title || !recipeData.description || !recipeData.ingredients || !recipeData.instructions) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, ingredients, and instructions are required'
      });
    }
    
    if (!recipeData.nutrition || !recipeData.nutrition.calories) {
      return res.status(400).json({
        success: false,
        message: 'Nutrition information is required'
      });
    }
    
    recipeData.createdBy = req.userId;
    
    const recipe = new Recipe(recipeData);
    await recipe.save();
    
    res.status(201).json({
      success: true,
      message: 'Recipe created successfully',
      data: { recipe }
    });
  } catch (error) {
    console.error('Create recipe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create recipe',
      error: error.message
    });
  }
});

/**
 * @route   PUT /api/recipes/:id
 * @desc    Update recipe (Admin only)
 * @access  Private (Admin)
 * @params  { id }
 * @body    Recipe fields to update
 */
router.put('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Remove fields that shouldn't be updated directly
    delete updates._id;
    delete updates.createdBy;
    delete updates.createdAt;
    
    const recipe = await Recipe.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Recipe updated successfully',
      data: { recipe }
    });
  } catch (error) {
    console.error('Update recipe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update recipe',
      error: error.message
    });
  }
});

/**
 * @route   DELETE /api/recipes/:id
 * @desc    Delete recipe (Admin only) - Soft delete by setting isActive to false
 * @access  Private (Admin)
 * @params  { id }
 */
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    const recipe = await Recipe.findByIdAndUpdate(
      id,
      { $set: { isActive: false } },
      { new: true }
    );
    
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Recipe deleted successfully',
      data: { recipe }
    });
  } catch (error) {
    console.error('Delete recipe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete recipe',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/recipes/swipe/queue
 * @desc    Get recipes for swipe interface (legacy endpoint)
 * @access  Private
 * @query   { limit }
 */
router.get('/swipe/queue', verifyToken, async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const user = req.user;
    
    // Build query based on dietary preferences
    const query = { isActive: true };
    
    if (user.profile?.dietaryRestrictions?.includes('vegan')) {
      query['dietaryInfo.isVegan'] = true;
    }
    if (user.profile?.dietaryRestrictions?.includes('gluten-free')) {
      query['dietaryInfo.isGlutenFree'] = true;
    }
    
    // Get random recipes
    const recipes = await Recipe.aggregate([
      { $match: query },
      { $sample: { size: parseInt(limit) } }
    ]);
    
    res.json({
      success: true,
      data: { recipes }
    });
  } catch (error) {
    console.error('Get swipe queue error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get swipe queue',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/recipes/meta/tags
 * @desc    Get all available recipe tags
 * @access  Public
 */
router.get('/meta/tags', async (req, res) => {
  try {
    const tags = await Recipe.distinct('tags');
    res.json({
      success: true,
      data: { tags: tags.sort() }
    });
  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get tags',
      error: error.message
    });
  }
});

module.exports = router;