const express = require('express');
const mongoose = require('mongoose');
const { verifyToken } = require('../middleware/auth-jwt');
const Recipe = require('../models/Recipe');
const User = require('../models/User');

const router = express.Router();

// Get shopping list for user
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('shoppingList.recipe');
    res.json({
      success: true,
      shoppingList: user.shoppingList || []
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add recipe ingredients to shopping list
router.post('/add-recipe/:recipeId', verifyToken, async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { servings = 1 } = req.body;
    
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found' });
    }
    
    // Calculate ingredients for servings
    const multiplier = servings / (recipe.servings || 1);
    const ingredients = recipe.ingredients.map(ing => ({
      name: ing.name,
      amount: ing.amount ? ing.amount * multiplier : null,
      unit: ing.unit,
      category: ing.category || 'other',
      checked: false
    }));
    
    // Add to user's shopping list
    await User.findByIdAndUpdate(
      req.user._id,
      { 
        $push: { 
          shoppingList: {
            recipe: recipeId,
            servings,
            ingredients,
            addedAt: new Date()
          }
        }
      }
    );
    
    res.json({ 
      success: true, 
      message: 'Recipe added to shopping list',
      ingredientsAdded: ingredients.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update ingredient checked status
router.put('/ingredient/:index', verifyToken, async (req, res) => {
  try {
    const { index } = req.params;
    const { checked } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user.shoppingList || !user.shoppingList[index]) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    
    // Update specific ingredient
    const updatePath = `shoppingList.${index}.ingredients`;
    await User.findByIdAndUpdate(req.user._id, {
      $set: { [`${updatePath}.$[ing].checked`]: checked }
    }, {
      arrayFilters: [{ 'ing._id': { $exists: true } }]
    });
    
    res.json({ success: true, message: 'Item updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Clear shopping list
router.delete('/clear', verifyToken, async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      { $set: { shoppingList: [] } }
    );
    res.json({ success: true, message: 'Shopping list cleared' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Remove specific recipe from shopping list
router.delete('/recipe/:recipeId', verifyToken, async (req, res) => {
  try {
    const { recipeId } = req.params;
    
    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { shoppingList: { recipe: recipeId } } }
    );
    
    res.json({ success: true, message: 'Recipe removed from shopping list' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
