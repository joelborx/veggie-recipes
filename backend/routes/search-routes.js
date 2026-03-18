/**
 * Search Routes
 * Handles advanced search, filtering, and autocomplete suggestions
 * Base path: /api/recipes
 */

const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const { optionalAuth } = require('../middleware/auth');

/**
 * @route   GET /api/recipes/search
 * @desc    Full-text search across recipes with optional filters
 * @access  Public (optional auth for personalization)
 * @query   { q, cuisine, time, difficulty, isVegan, isGlutenFree, page, limit, sort }
 */
router.get('/search', optionalAuth, async (req, res) => {
  try {
    const {
      q,
      cuisine,
      time,
      difficulty,
      isVegan,
      isGlutenFree,
      isDairyFree,
      isNutFree,
      spiceLevel,
      minCalories,
      maxCalories,
      minProtein,
      maxProtein,
      tags,
      page = 1,
      limit = 20,
      sort = 'relevance'
    } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build aggregation pipeline
    const pipeline = [];
    const matchStage = { isActive: true };

    // Full-text search using text index
    if (q && q.trim()) {
      const searchText = q.trim();
      pipeline.push({
        $match: {
          ...matchStage,
          $text: { $search: searchText }
        }
      });
      
      // Add text score for relevance sorting
      pipeline.push({
        $addFields: {
          textScore: { $meta: 'textScore' }
        }
      });
    } else {
      pipeline.push({ $match: matchStage });
      pipeline.push({
        $addFields: {
          textScore: 1
        }
      });
    }

    // Additional filters
    const filterStage = {};

    // Cuisine/Tags filter
    if (cuisine) {
      const cuisineList = cuisine.split(',').map(c => c.trim().toLowerCase()).filter(Boolean);
      if (cuisineList.length > 0) {
        filterStage.tags = { $in: cuisineList };
      }
    }

    // Time filter
    if (time) {
      const maxTime = parseInt(time);
      if (!isNaN(maxTime)) {
        filterStage['time.total'] = { $lte: maxTime };
      }
    }

    // Difficulty filter
    if (difficulty) {
      const validDifficulties = ['easy', 'medium', 'hard'];
      const difficultyList = difficulty.split(',').map(d => d.trim().toLowerCase()).filter(d => validDifficulties.includes(d));
      if (difficultyList.length > 0) {
        filterStage.difficulty = { $in: difficultyList };
      }
    }

    // Dietary filters
    if (isVegan === 'true') {
      filterStage['dietaryInfo.isVegan'] = true;
    }
    if (isGlutenFree === 'true') {
      filterStage['dietaryInfo.isGlutenFree'] = true;
    }
    if (isDairyFree === 'true') {
      filterStage['dietaryInfo.isDairyFree'] = true;
    }
    if (isNutFree === 'true') {
      filterStage['dietaryInfo.isNutFree'] = true;
    }
    if (spiceLevel) {
      const validSpiceLevels = ['none', 'mild', 'medium', 'hot', 'extra-hot'];
      const spiceList = spiceLevel.split(',').map(s => s.trim().toLowerCase()).filter(s => validSpiceLevels.includes(s));
      if (spiceList.length > 0) {
        filterStage['dietaryInfo.spiceLevel'] = { $in: spiceList };
      }
    }

    // Nutrition filters
    if (minCalories !== undefined || maxCalories !== undefined) {
      filterStage['nutrition.calories'] = {};
      if (minCalories !== undefined) filterStage['nutrition.calories'].$gte = parseInt(minCalories);
      if (maxCalories !== undefined) filterStage['nutrition.calories'].$lte = parseInt(maxCalories);
    }

    if (minProtein !== undefined || maxProtein !== undefined) {
      filterStage['nutrition.protein'] = {};
      if (minProtein !== undefined) filterStage['nutrition.protein'].$gte = parseInt(minProtein);
      if (maxProtein !== undefined) filterStage['nutrition.protein'].$lte = parseInt(maxProtein);
    }

    // Additional tags filter
    if (tags) {
      const tagList = tags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
      if (tagList.length > 0) {
        if (filterStage.tags) {
          // Merge with existing cuisine filter
          filterStage.tags = { $in: [...new Set([...filterStage.tags.$in, ...tagList])] };
        } else {
          filterStage.tags = { $in: tagList };
        }
      }
    }

    // Apply filters if any exist
    if (Object.keys(filterStage).length > 0) {
      pipeline.push({ $match: filterStage });
    }

    // Sorting
    let sortStage = {};
    switch (sort) {
      case 'relevance':
        sortStage = { textScore: -1, 'ratingStats.average': -1 };
        break;
      case 'rating':
        sortStage = { 'ratingStats.average': -1, textScore: -1 };
        break;
      case 'newest':
        sortStage = { createdAt: -1 };
        break;
      case 'time-asc':
        sortStage = { 'time.total': 1 };
        break;
      case 'time-desc':
        sortStage = { 'time.total': -1 };
        break;
      case 'calories-asc':
        sortStage = { 'nutrition.calories': 1 };
        break;
      case 'calories-desc':
        sortStage = { 'nutrition.calories': -1 };
        break;
      case 'popularity':
        sortStage = { 'swipeStats.likes': -1, 'ratingStats.average': -1 };
        break;
      default:
        sortStage = { textScore: -1, 'ratingStats.average': -1 };
    }
    pipeline.push({ $sort: sortStage });

    // Facet for pagination and total count
    pipeline.push({
      $facet: {
        recipes: [
          { $skip: skip },
          { $limit: limitNum }
        ],
        totalCount: [
          { $count: 'count' }
        ]
      }
    });

    // Execute aggregation
    const results = await Recipe.aggregate(pipeline);
    const recipes = results[0]?.recipes || [];
    const total = results[0]?.totalCount[0]?.count || 0;

    res.json({
      success: true,
      data: {
        recipes,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum)
        },
        query: {
          q: q || null,
          filters: {
            cuisine: cuisine || null,
            time: time || null,
            difficulty: difficulty || null,
            isVegan: isVegan || null,
            isGlutenFree: isGlutenFree || null
          }
        }
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to perform search',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/recipes/filter
 * @desc    Filter recipes by specific criteria (shortcut endpoint)
 * @access  Public
 * @query   { cuisine, time, difficulty, isVegan, isGlutenFree, tags, mealType, page, limit }
 */
router.get('/filter', optionalAuth, async (req, res) => {
  try {
    const {
      cuisine,
      time,
      difficulty,
      isVegan,
      isGlutenFree,
      isDairyFree,
      isNutFree,
      spiceLevel,
      tags,
      mealType,
      minCalories,
      maxCalories,
      minProtein,
      page = 1,
      limit = 20
    } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build query
    const query = { isActive: true };

    // Cuisine filter
    if (cuisine) {
      const cuisineList = cuisine.split(',').map(c => c.trim().toLowerCase()).filter(Boolean);
      if (cuisineList.length > 0) {
        query.tags = { $in: cuisineList };
      }
    }

    // Time filter
    if (time) {
      const timeValue = parseInt(time);
      if (!isNaN(timeValue)) {
        query['time.total'] = { $lte: timeValue };
      }
    }

    // Difficulty filter
    if (difficulty) {
      const validDifficulties = ['easy', 'medium', 'hard'];
      const difficultyList = difficulty.split(',').map(d => d.trim().toLowerCase()).filter(d => validDifficulties.includes(d));
      if (difficultyList.length > 0) {
        if (difficultyList.length === 1) {
          query.difficulty = difficultyList[0];
        } else {
          query.difficulty = { $in: difficultyList };
        }
      }
    }

    // Meal type filter (breakfast, lunch, dinner, snack, dessert)
    if (mealType) {
      const validMealTypes = ['breakfast', 'lunch', 'dinner', 'snack', 'dessert'];
      const mealList = mealType.split(',').map(m => m.trim().toLowerCase()).filter(m => validMealTypes.includes(m));
      if (mealList.length > 0) {
        if (query.tags) {
          query.tags.$in = [...new Set([...query.tags.$in, ...mealList])];
        } else {
          query.tags = { $in: mealList };
        }
      }
    }

    // Additional tags
    if (tags) {
      const tagList = tags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
      if (tagList.length > 0) {
        if (query.tags) {
          query.tags.$in = [...new Set([...query.tags.$in, ...tagList])];
        } else {
          query.tags = { $in: tagList };
        }
      }
    }

    // Dietary filters
    if (isVegan === 'true') {
      query['dietaryInfo.isVegan'] = true;
    }
    if (isGlutenFree === 'true') {
      query['dietaryInfo.isGlutenFree'] = true;
    }
    if (isDairyFree === 'true') {
      query['dietaryInfo.isDairyFree'] = true;
    }
    if (isNutFree === 'true') {
      query['dietaryInfo.isNutFree'] = true;
    }
    if (spiceLevel) {
      const validSpiceLevels = ['none', 'mild', 'medium', 'hot', 'extra-hot'];
      const spiceList = spiceLevel.split(',').map(s => s.trim().toLowerCase()).filter(s => validSpiceLevels.includes(s));
      if (spiceList.length > 0) {
        if (spiceList.length === 1) {
          query['dietaryInfo.spiceLevel'] = spiceList[0];
        } else {
          query['dietaryInfo.spiceLevel'] = { $in: spiceList };
        }
      }
    }

    // Nutrition filters
    if (minCalories !== undefined || maxCalories !== undefined) {
      query['nutrition.calories'] = {};
      if (minCalories !== undefined) query['nutrition.calories'].$gte = parseInt(minCalories);
      if (maxCalories !== undefined) query['nutrition.calories'].$lte = parseInt(maxCalories);
    }

    if (minProtein !== undefined) {
      query['nutrition.protein'] = { $gte: parseInt(minProtein) };
    }

    // Execute query
    const [recipes, total] = await Promise.all([
      Recipe.find(query)
        .sort({ 'ratingStats.average': -1, createdAt: -1 })
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
        },
        filters: {
          cuisine: cuisine || null,
          time: time || null,
          difficulty: difficulty || null,
          mealType: mealType || null,
          isVegan: isVegan || null,
          isGlutenFree: isGlutenFree || null
        }
      }
    });
  } catch (error) {
    console.error('Filter error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to filter recipes',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/recipes/suggestions
 * @desc    Get autocomplete suggestions based on partial query
 * @access  Public
 * @query   { q, limit, type }
 */
router.get('/suggestions', async (req, res) => {
  try {
    const {
      q,
      limit = 10,
      type = 'all' // 'all', 'recipes', 'ingredients', 'tags'
    } = req.query;

    if (!q || !q.trim()) {
      return res.json({
        success: true,
        data: {
          suggestions: [],
          popular: []
        }
      });
    }

    const searchText = q.trim();
    const limitNum = Math.min(parseInt(limit), 20);
    const suggestions = [];

    // Search recipes by title
    if (type === 'all' || type === 'recipes') {
      const recipeResults = await Recipe.find({
        isActive: true,
        $or: [
          { title: { $regex: searchText, $options: 'i' } },
          { $text: { $search: searchText } }
        ]
      })
        .select('title tags images ratingStats.average')
        .sort({ 'ratingStats.average': -1 })
        .limit(limitNum)
        .lean();

      recipeResults.forEach(recipe => {
        suggestions.push({
          type: 'recipe',
          value: recipe.title,
          id: recipe._id,
          image: recipe.images?.find(img => img.isPrimary)?.url || recipe.images?.[0]?.url,
          rating: recipe.ratingStats?.average,
          tags: recipe.tags?.slice(0, 3)
        });
      });
    }

    // Search ingredients
    if (type === 'all' || type === 'ingredients') {
      const ingredientResults = await Recipe.aggregate([
        { $match: { isActive: true } },
        { $unwind: '$ingredients' },
        {
          $match: {
            'ingredients.name': { $regex: searchText, $options: 'i' }
          }
        },
        {
          $group: {
            _id: '$ingredients.name',
            count: { $sum: 1 },
            sampleRecipe: { $first: '$$ROOT' }
          }
        },
        { $sort: { count: -1 } },
        { $limit: limitNum }
      ]);

      ingredientResults.forEach(result => {
        // Avoid duplicates from recipe titles
        if (!suggestions.find(s => s.type === 'ingredient' && s.value.toLowerCase() === result._id.toLowerCase())) {
          suggestions.push({
            type: 'ingredient',
            value: result._id,
            count: result.count,
            sampleRecipeId: result.sampleRecipe._id
          });
        }
      });
    }

    // Search tags
    if (type === 'all' || type === 'tags') {
      const tagResults = await Recipe.aggregate([
        { $match: { isActive: true, tags: { $exists: true, $ne: [] } } },
        { $unwind: '$tags' },
        {
          $match: {
            tags: { $regex: `^${searchText}`, $options: 'i' }
          }
        },
        {
          $group: {
            _id: '$tags',
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } },
        { $limit: limitNum }
      ]);

      tagResults.forEach(result => {
        // Avoid duplicates
        if (!suggestions.find(s => s.type === 'tag' && s.value.toLowerCase() === result._id.toLowerCase())) {
          suggestions.push({
            type: 'tag',
            value: result._id,
            count: result.count
          });
        }
      });
    }

    // Sort suggestions: recipes first, then tags, then ingredients
    suggestions.sort((a, b) => {
      const typeOrder = { recipe: 0, tag: 1, ingredient: 2 };
      return typeOrder[a.type] - typeOrder[b.type];
    });

    // Get popular suggestions (recipes with highest ratings)
    const popularRecipes = await Recipe.find({ isActive: true })
      .select('title ratingStats.average')
      .sort({ 'ratingStats.average': -1, 'swipeStats.likes': -1 })
      .limit(5)
      .lean();

    res.json({
      success: true,
      data: {
        query: searchText,
        suggestions: suggestions.slice(0, limitNum),
        popular: popularRecipes.map(r => ({
          type: 'popular',
          value: r.title,
          id: r._id,
          rating: r.ratingStats?.average
        }))
      }
    });
  } catch (error) {
    console.error('Suggestions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get suggestions',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/recipes/filters/metadata
 * @desc    Get available filter options (cuisines, tags, difficulties, etc.)
 * @access  Public
 */
router.get('/filters/metadata', async (req, res) => {
  try {
    const [cuisines, mealTypes, difficulties, tags, spiceLevels, maxTime] = await Promise.all([
      // Get unique cuisine tags
      Recipe.distinct('tags', {
        isActive: true,
        tags: { $in: ['italian', 'asian', 'mexican', 'mediterranean', 'indian', 'french', 'thai', 'chinese', 'japanese', 'greek', 'spanish'] }
      }),
      // Get meal type tags
      Recipe.distinct('tags', {
        isActive: true,
        tags: { $in: ['breakfast', 'lunch', 'dinner', 'snack', 'dessert'] }
      }),
      // Get difficulties
      Recipe.distinct('difficulty', { isActive: true }),
      // Get all other tags
      Recipe.aggregate([
        { $match: { isActive: true } },
        { $unwind: '$tags' },
        {
          $match: {
            tags: {
              $nin: ['italian', 'asian', 'mexican', 'mediterranean', 'indian', 'french', 'thai', 'chinese', 'japanese', 'greek', 'spanish', 'breakfast', 'lunch', 'dinner', 'snack', 'dessert']
            }
          }
        },
        { $group: { _id: '$tags', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 30 }
      ]),
      // Get spice levels
      Recipe.distinct('dietaryInfo.spiceLevel', { isActive: true }),
      // Get max cooking time
      Recipe.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: null, maxTime: { $max: '$time.total' } } }
      ])
    ]);

    res.json({
      success: true,
      data: {
        filters: {
          cuisines: cuisines.sort(),
          mealTypes: mealTypes.sort(),
          difficulties: difficulties.filter(d => d).sort(),
          tags: tags.map(t => ({ name: t._id, count: t.count })),
          spiceLevels: spiceLevels.filter(s => s).sort(),
          timeRange: {
            min: 5,
            max: maxTime[0]?.maxTime || 120,
            presets: [15, 30, 45, 60, 90, 120]
          },
          dietary: {
            options: [
              { key: 'isVegan', label: 'Vegan' },
              { key: 'isGlutenFree', label: 'Gluten-free' },
              { key: 'isDairyFree', label: 'Dairy-free' },
              { key: 'isNutFree', label: 'Nut-free' }
            ]
          }
        }
      }
    });
  } catch (error) {
    console.error('Filter metadata error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get filter metadata',
      error: error.message
    });
  }
});

module.exports = router;
