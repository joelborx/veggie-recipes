const express = require('express');
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth-jwt');

const router = express.Router();

// Get user profile
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update profile
router.put('/', verifyToken, async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password; // Prevent password update here
    delete updates.role; // Prevent role change
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');
    
    res.json({ success: true, message: 'Profile updated', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update preferences
router.put('/preferences', verifyToken, async (req, res) => {
  try {
    const { dietaryPreferences, allergies, targetCalories, targetProtein } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { 
        $set: { 
          dietaryPreferences,
          allergies,
          targetCalories,
          targetProtein
        }
      },
      { new: true }
    ).select('-password');
    
    res.json({ success: true, message: 'Preferences updated', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
