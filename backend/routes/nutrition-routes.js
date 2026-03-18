const express = require('express');
const mongoose = require('mongoose');
const { verifyToken } = require('../middleware/auth-jwt');
const User = require('../models/User');

const router = express.Router();

// Get today's nutrition summary
router.get('/today', verifyToken, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const user = await User.findById(req.user._id);
    const todayLog = user.nutritionLog?.find(log => {
      const logDate = new Date(log.date);
      return logDate >= today;
    });
    
    const goals = user.nutritionGoals || { dailyCalories: 2000, dailyProtein: 50, dailyCarbs: 250, dailyFat: 70 };
    
    res.json({
      success: true,
      today: todayLog || { calories: 0, protein: 0, carbs: 0, fat: 0 },
      goals,
      remaining: {
        calories: goals.dailyCalories - (todayLog?.calories || 0),
        protein: goals.dailyProtein - (todayLog?.protein || 0),
        carbs: goals.dailyCarbs - (todayLog?.carbs || 0),
        fat: goals.dailyFat - (todayLog?.fat || 0)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Log a meal
router.post('/log', verifyToken, async (req, res) => {
  try {
    const { calories, protein, carbs, fat, meal } = req.body;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    await User.findOneAndUpdate(
      { _id: req.user._id, 'nutritionLog.date': { $lt: new Date(today.getTime() + 86400000), $gte: today } },
      { 
        $inc: { 
          'nutritionLog.$.calories': calories || 0,
          'nutritionLog.$.protein': protein || 0,
          'nutritionLog.$.carbs': carbs || 0,
          'nutritionLog.$.fat': fat || 0
        },
        $push: { 'nutritionLog.$.meals': meal }
      },
      { upsert: true }
    );
    
    res.json({ success: true, message: 'Meal logged' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get nutrition history
router.get('/history', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const history = (user.nutritionLog || []).slice(-7);
    
    res.json({ success: true, history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get nutrition goals
router.get('/goals', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ 
      success: true, 
      goals: user.nutritionGoals || { dailyCalories: 2000, dailyProtein: 50, dailyCarbs: 250, dailyFat: 70 }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update nutrition goals
router.put('/goals', verifyToken, async (req, res) => {
  try {
    const { dailyCalories, dailyProtein, dailyCarbs, dailyFat } = req.body;
    
    await User.findByIdAndUpdate(req.user._id, {
      $set: { 
        nutritionGoals: { dailyCalories, dailyProtein, dailyCarbs, dailyFat }
      }
    });
    
    res.json({ success: true, message: 'Goals updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
