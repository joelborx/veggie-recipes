const express = require('express');
const mongoose = require('mongoose');
const { verifyToken } = require('../middleware/auth-jwt');
const Recipe = require('../models/Recipe');
const User = require('../models/User');

const router = express.Router();

// Get all liked recipes for user
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('likedRecipes');
    res.json({
      success: true,
      count: user.likedRecipes?.length || 0,
      recipes: user.likedRecipes || []
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add recipe to liked
router.post('/:recipeId', verifyToken, async (req, res) => {
  try {
    const { recipeId } = req.params;
    
    // Check if recipe exists
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found' });
    }
    
    // Add to user's liked recipes (avoid duplicates)
    await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { likedRecipes: recipeId } }
    );
    
    res.json({ success: true, message: 'Recipe liked' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Remove from liked
router.delete('/:recipeId', verifyToken, async (req, res) => {
  try {
    const { recipeId } = req.params;
    
    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { likedRecipes: recipeId } }
    );
    
    res.json({ success: true, message: 'Recipe unliked' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
