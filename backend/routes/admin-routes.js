const express = require('express');
const mongoose = require('mongoose');
const { verifyToken } = require('../middleware/auth-jwt');
const User = require('../models/User');
const Recipe = require('../models/Recipe');

const router = express.Router();

// Admin middleware
const requireAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get admin stats
router.get('/stats', verifyToken, requireAdmin, async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const recipeCount = await Recipe.countDocuments();
    const activeUsers = await User.countDocuments({ lastLogin: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } });
    const newUsersToday = await User.countDocuments({ createdAt: { $gte: new Date().setHours(0, 0, 0, 0) } });
    
    res.json({
      success: true,
      stats: {
        users: { total: userCount, active: activeUsers, newToday: newUsersToday },
        recipes: { total: recipeCount },
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// List all users
router.get('/users', verifyToken, requireAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await User.countDocuments();
    
    res.json({
      success: true,
      users,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete user
router.delete('/users/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ success: true, message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// List all recipes with moderation status
router.get('/recipes', verifyToken, requireAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    const recipes = await Recipe.find()
      .populate('createdBy', 'username email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Recipe.countDocuments();
    
    res.json({
      success: true,
      recipes,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Moderate recipe (approve/reject)
router.put('/recipes/:id/moderate', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reason } = req.body; // status: 'approved', 'rejected', 'pending'
    
    const recipe = await Recipe.findByIdAndUpdate(
      id,
      { 
        moderationStatus: status,
        moderationReason: reason,
        moderatedAt: new Date(),
        moderatedBy: req.user._id
      },
      { new: true }
    );
    
    res.json({ success: true, message: `Recipe ${status}`, recipe });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
