/**
 * SwipeAction Model
 * Tracks user swipe actions on recipes
 */

const mongoose = require('mongoose');

const swipeActionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true,
    index: true
  },
  action: {
    type: String,
    enum: ['like', 'dislike', 'superlike'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate swipes
swipeActionSchema.index({ userId: 1, recipeId: 1 }, { unique: true });

module.exports = mongoose.model('SwipeAction', swipeActionSchema);
