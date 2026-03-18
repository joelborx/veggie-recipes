const express = require('express');
const mongoose = require('mongoose');
const { verifyToken } = require('../middleware/auth-jwt');
const User = require('../models/User');
const Recipe = require('../models/Recipe');

const router = express.Router();

// Get current week's meal plan
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('mealPlan.recipe');
    res.json({
      success: true,
      mealPlan: user.mealPlan || []
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add recipe to specific day
router.post('/:day', verifyToken, async (req, res) => {
  try {
    const { day } = req.params;
    const { recipeId, mealType } = req.body;
    
    const validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    if (!validDays.includes(day)) {
      return res.status(400).json({ success: false, message: 'Invalid day' });
    }
    
    await User.findByIdAndUpdate(req.user._id, {
      $push: { mealPlan: { day, recipe: recipeId, mealType: mealType || 'dinner' } }
    });
    
    res.json({ success: true, message: 'Recipe added to meal plan' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Remove from day
router.delete('/:day', verifyToken, async (req, res) => {
  try {
    const { day } = req.params;
    const { recipeId } = req.query;
    
    const update = { $pull: { mealPlan: { day } } };
    if (recipeId) {
      update.$pull.mealPlan.recipe = recipeId;
    }
    
    await User.findByIdAndUpdate(req.user._id, update);
    res.json({ success: true, message: 'Recipe removed from meal plan' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Auto-generate meal plan
router.get('/generate', verifyToken, async (req, res) => {
  try {
    const recipes = await Recipe.find({ isActive: true }).limit(7);
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    const mealPlan = days.map((day, index) => ({
      day,
      recipe: recipes[index % recipes.length]._id,
      mealType: 'dinner'
    }));
    
    await User.findByIdAndUpdate(req.user._id, { $set: { mealPlan } });
    
    res.json({ success: true, message: 'Meal plan generated', mealPlan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
