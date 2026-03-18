/**
 * Authentication Routes
 * Handles user registration, login, and profile management
 * Base path: /api/auth
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

// Email validation regex
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 * @body    { email, username, password, firstName, lastName }
 */
router.post('/register', async (req, res) => {
  try {
    const { email, username, password, firstName, lastName } = req.body;
    
    // Input validation
    if (!email || !username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email, username and password are required'
      });
    }
    
    // Email format validation
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }
    
    // Password strength validation
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }
    
    // Username validation
    if (username.length < 3 || username.length > 30) {
      return res.status(400).json({
        success: false,
        message: 'Username must be between 3 and 30 characters'
      });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }]
    });
    
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }
    
    // Create new user (password is hashed by pre-save hook in model)
    const user = new User({
      email: email.toLowerCase().trim(),
      username: username.toLowerCase().trim(),
      password,
      profile: {
        firstName: firstName?.trim() || '',
        lastName: lastName?.trim() || ''
      }
    });
    
    await user.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: user.toJSON(),
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Login user and return JWT token
 * @access  Public
 * @body    { email, password }
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Input validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }
    
    // Find user with password included
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Verify password using model method
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Update last login timestamp
    user.lastLogin = new Date();
    await user.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: user.toJSON(),
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/auth/me
 * @desc    Get current authenticated user
 * @access  Private
 */
router.get('/me', verifyToken, async (req, res) => {
  try {
    res.json({
      success: true,
      data: { user: req.user }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user profile'
    });
  }
});

/**
 * @route   PUT /api/auth/profile
 * @desc    Update user profile
 * @access  Private
 * @body    { firstName, lastName, calorieGoal, dietaryRestrictions, avatar }
 */
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { firstName, lastName, calorieGoal, dietaryRestrictions, avatar } = req.body;
    
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Update allowed fields
    if (firstName !== undefined) user.profile.firstName = firstName.trim();
    if (lastName !== undefined) user.profile.lastName = lastName.trim();
    if (avatar !== undefined) user.profile.avatar = avatar;
    if (calorieGoal !== undefined) {
      const goal = parseInt(calorieGoal);
      if (goal < 500 || goal > 5000) {
        return res.status(400).json({
          success: false,
          message: 'Calorie goal must be between 500 and 5000'
        });
      }
      user.profile.calorieGoal = goal;
    }
    if (dietaryRestrictions !== undefined) {
      const validRestrictions = ['gluten-free', 'dairy-free', 'nut-free', 'soy-free', 'vegan'];
      const invalid = dietaryRestrictions.filter(r => !validRestrictions.includes(r));
      if (invalid.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Invalid dietary restrictions: ${invalid.join(', ')}`
        });
      }
      user.profile.dietaryRestrictions = dietaryRestrictions;
    }
    
    await user.save();
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user: user.toJSON() }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  }
});

module.exports = router;