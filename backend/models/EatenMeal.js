/**
 * EatenMeal Model
 * Tracks meals eaten by users
 */

const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbohydrates: { type: Number, required: true },
  fat: { type: Number, required: true },
  fiber: { type: Number, default: 0 }
}, { _id: false });

const eatenMealSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true
  },
  date: {
    type: Date,
    required: true,
    index: true
  },
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
    required: true
  },
  servings: {
    type: Number,
    required: true,
    min: 0.5,
    default: 1
  },
  nutrition: {
    type: nutritionSchema,
    required: true
  },
  syncedToYazio: {
    type: Boolean,
    default: false
  },
  yazioLogId: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Index for efficient date range queries
eatenMealSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('EatenMeal', eatenMealSchema);
