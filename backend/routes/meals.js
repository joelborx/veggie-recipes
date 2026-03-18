/**
 * Meal Routes
 * Tracks eaten meals, nutrition history, and meal statistics
 * Base path: /api/meals
 */

const express = require('express');
const router = express.Router();
const EatenMeal = require('../models/EatenMeal');
const Recipe = require('../models/Recipe');
const SwipeAction = require('../models/SwipeAction');
const { verifyToken } = require('../middleware/auth');

// Valid meal types
const VALID_MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snack'];

/**
 * @route   POST /api/meals
 * @desc    Record a meal as eaten
 * @access  Private
 * @body    { recipeId, date, mealType, servings }
 */
router.post('/', verifyToken, async (req, res) => {
  try {
    const { recipeId, date, mealType, servings = 1 } = req.body;
    
    // Input validation
    if (!recipeId || !date || !mealType) {
      return res.status(400).json({
        success: false,
        message: 'Recipe ID, date, and meal type are required'
      });
    }
    
    // Validate meal type
    if (!VALID_MEAL_TYPES.includes(mealType)) {
      return res.status(400).json({
        success: false,
        message: `Meal type must be one of: ${VALID_MEAL_TYPES.join(', ')}`
      });
    }
    
    // Validate servings
    const servingsNum = parseFloat(servings);
    if (isNaN(servingsNum) || servingsNum < 0.5) {
      return res.status(400).json({
        success: false,
        message: 'Servings must be at least 0.5'
      });
    }
    
    // Get recipe for nutrition calculation
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }
    
    // Calculate nutrition for this meal based on servings
    const nutrition = {
      calories: Math.round(recipe.nutrition.calories * servingsNum),
      protein: Math.round(recipe.nutrition.protein * servingsNum * 10) / 10,
      carbohydrates: Math.round(recipe.nutrition.carbohydrates * servingsNum * 10) / 10,
      fat: Math.round(recipe.nutrition.fat * servingsNum * 10) / 10,
      fiber: Math.round((recipe.nutrition.fiber || 0) * servingsNum * 10) / 10
    };
    
    const meal = new EatenMeal({
      userId: req.userId,
      recipeId,
      date: new Date(date),
      mealType,
      servings: servingsNum,
      nutrition,
      syncedToYazio: false
    });
    
    await meal.save();
    
    // Populate recipe info for response
    await meal.populate('recipeId', 'title images');
    
    res.status(201).json({
      success: true,
      message: 'Meal logged successfully',
      data: { meal }
    });
  } catch (error) {
    console.error('Log meal error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to log meal',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/meals
 * @desc    Get user's eating history with optional date range
 * @access  Private
 * @query   { startDate, endDate, page, limit }
 */
router.get('/', verifyToken, async (req, res) => {
  try {
    const { startDate, endDate, page = 1, limit = 50 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    const query = { userId: req.userId };
    
    // Apply date range filter
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    } else if (startDate) {
      query.date = { $gte: new Date(startDate) };
    } else if (endDate) {
      query.date = { $lte: new Date(endDate) };
    }
    
    const [meals, total] = await Promise.all([
      EatenMeal.find(query)
        .populate('recipeId', 'title images nutrition')
        .sort({ date: -1, createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      EatenMeal.countDocuments(query)
    ]);
    
    // Calculate daily totals
    const dailyTotals = {};
    meals.forEach(meal => {
      const dateKey = new Date(meal.date).toISOString().split('T')[0];
      if (!dailyTotals[dateKey]) {
        dailyTotals[dateKey] = {
          calories: 0,
          protein: 0,
          carbohydrates: 0,
          fat: 0,
          fiber: 0,
          mealCount: 0
        };
      }
      dailyTotals[dateKey].calories += meal.nutrition.calories;
      dailyTotals[dateKey].protein += meal.nutrition.protein;
      dailyTotals[dateKey].carbohydrates += meal.nutrition.carbohydrates;
      dailyTotals[dateKey].fat += meal.nutrition.fat;
      dailyTotals[dateKey].fiber += meal.nutrition.fiber || 0;
      dailyTotals[dateKey].mealCount += 1;
    });
    
    res.json({
      success: true,
      data: {
        meals,
        dailyTotals,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum)
        }
      }
    });
  } catch (error) {
    console.error('Get meals error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get meals',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/meals/stats
 * @desc    Get nutrition statistics for a period
 * @access  Private
 * @query   { startDate, endDate }
 */
router.get('/stats', verifyToken, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    // Default to last 7 days if no dates provided
    const end = endDate ? new Date(endDate) : new Date();
    const start = startDate ? new Date(startDate) : new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Set end to end of day
    end.setHours(23, 59, 59, 999);
    // Set start to beginning of day
    start.setHours(0, 0, 0, 0);
    
    const meals = await EatenMeal.find({
      userId: req.userId,
      date: { $gte: start, $lte: end }
    }).lean();
    
    if (meals.length === 0) {
      return res.json({
        success: true,
        data: {
          period: { start, end },
          totalMeals: 0,
          averages: {
            calories: 0,
            protein: 0,
            carbohydrates: 0,
            fat: 0
          },
          totals: {
            calories: 0,
            protein: 0,
            carbohydrates: 0,
            fat: 0
          },
          byMealType: {}
        }
      });
    }
    
    // Calculate totals
    const totals = meals.reduce((acc, meal) => ({
      calories: acc.calories + meal.nutrition.calories,
      protein: acc.protein + meal.nutrition.protein,
      carbohydrates: acc.carbohydrates + meal.nutrition.carbohydrates,
      fat: acc.fat + meal.nutrition.fat,
      fiber: acc.fiber + (meal.nutrition.fiber || 0)
    }), { calories: 0, protein: 0, carbohydrates: 0, fat: 0, fiber: 0 });
    
    // Calculate unique days
    const uniqueDays = new Set(meals.map(m => new Date(m.date).toISOString().split('T')[0])).size;
    
    // Calculate averages per day
    const averages = {
      calories: Math.round(totals.calories / uniqueDays),
      protein: Math.round((totals.protein / uniqueDays) * 10) / 10,
      carbohydrates: Math.round((totals.carbohydrates / uniqueDays) * 10) / 10,
      fat: Math.round((totals.fat / uniqueDays) * 10) / 10,
      fiber: Math.round((totals.fiber / uniqueDays) * 10) / 10
    };
    
    // Group by meal type
    const byMealType = {};
    meals.forEach(meal => {
      if (!byMealType[meal.mealType]) {
        byMealType[meal.mealType] = {
          count: 0,
          calories: 0,
          protein: 0
        };
      }
      byMealType[meal.mealType].count += 1;
      byMealType[meal.mealType].calories += meal.nutrition.calories;
      byMealType[meal.mealType].protein += meal.nutrition.protein;
    });
    
    // Calculate macro percentages
    const totalGrams = totals.protein + totals.carbohydrates + totals.fat;
    const macroPercentages = totalGrams > 0 ? {
      protein: Math.round((totals.protein / totalGrams) * 100),
      carbohydrates: Math.round((totals.carbohydrates / totalGrams) * 100),
      fat: Math.round((totals.fat / totalGrams) * 100)
    } : { protein: 0, carbohydrates: 0, fat: 0 };
    
    res.json({
      success: true,
      data: {
        period: { start, end },
        totalMeals: meals.length,
        uniqueDays,
        averages,
        totals,
        macroPercentages,
        byMealType
      }
    });
  } catch (error) {
    console.error('Get meal stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get meal statistics',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/meals/favorites
 * @desc    Get user's favorite recipes based on eating frequency
 * @access  Private
 * @query   { limit }
 */
router.get('/favorites', verifyToken, async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const limitNum = parseInt(limit);
    
    // Aggregate to find most eaten recipes
    const favoriteMeals = await EatenMeal.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: '$recipeId',
          count: { $sum: 1 },
          totalServings: { $sum: '$servings' },
          lastEaten: { $max: '$date' }
        }
      },
      { $sort: { count: -1, lastEaten: -1 } },
      { $limit: limitNum }
    ]);
    
    // Populate recipe details
    const recipeIds = favoriteMeals.map(f => f._id);
    const recipes = await Recipe.find({ _id: { $in: recipeIds } }).lean();
    
    // Merge stats with recipe data
    const favorites = favoriteMeals.map(fav => {
      const recipe = recipes.find(r => r._id.toString() === fav._id.toString());
      return {
        recipe: recipe || null,
        stats: {
          timesEaten: fav.count,
          totalServings: fav.totalServings,
          lastEaten: fav.lastEaten
        }
      };
    }).filter(f => f.recipe !== null);
    
    res.json({
      success: true,
      data: { favorites }
    });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get favorite recipes',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/meals/today
 * @desc    Get today's meals with nutrition totals
 * @access  Private
 */
router.get('/today', verifyToken, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const meals = await EatenMeal.find({
      userId: req.userId,
      date: { $gte: today, $lt: tomorrow }
    })
      .populate('recipeId', 'title images nutrition')
      .sort({ date: 1 })
      .lean();
    
    // Calculate totals
    const totals = meals.reduce((acc, meal) => ({
      calories: acc.calories + meal.nutrition.calories,
      protein: acc.protein + meal.nutrition.protein,
      carbohydrates: acc.carbohydrates + meal.nutrition.carbohydrates,
      fat: acc.fat + meal.nutrition.fat,
      fiber: acc.fiber + (meal.nutrition.fiber || 0)
    }), { calories: 0, protein: 0, carbohydrates: 0, fat: 0, fiber: 0 });
    
    // Group by meal type
    const byMealType = {};
    meals.forEach(meal => {
      if (!byMealType[meal.mealType]) {
        byMealType[meal.mealType] = [];
      }
      byMealType[meal.mealType].push(meal);
    });
    
    res.json({
      success: true,
      data: {
        meals,
        byMealType,
        totals,
        date: today.toISOString().split('T')[0]
      }
    });
  } catch (error) {
    console.error('Get today meals error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get today\'s meals',
      error: error.message
    });
  }
});

/**
 * @route   DELETE /api/meals/:id
 * @desc    Delete a logged meal
 * @access  Private
 * @params  { id }
 */
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const meal = await EatenMeal.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });
    
    if (!meal) {
      return res.status(404).json({
        success: false,
        message: 'Meal not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Meal deleted successfully'
    });
  } catch (error) {
    console.error('Delete meal error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete meal',
      error: error.message
    });
  }
});

/**
 * @route   PATCH /api/meals/:id/sync-yazio
 * @desc    Mark meal as synced to Yazio
 * @access  Private
 * @params  { id }
 * @body    { yazioLogId }
 */
router.patch('/:id/sync-yazio', verifyToken, async (req, res) => {
  try {
    const { yazioLogId } = req.body;
    
    const meal = await EatenMeal.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { syncedToYazio: true, yazioLogId },
      { new: true }
    ).populate('recipeId', 'title images');
    
    if (!meal) {
      return res.status(404).json({
        success: false,
        message: 'Meal not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Meal synced to Yazio',
      data: { meal }
    });
  } catch (error) {
    console.error('Sync meal error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to sync meal',
      error: error.message
    });
  }
});

module.exports = router;