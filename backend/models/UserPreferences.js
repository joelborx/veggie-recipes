/**
 * UserPreferences Model
 * Stores user preferences for personalized recipe recommendations
 */

const mongoose = require('mongoose');

const userPreferencesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
    unique: true // One preference doc per user
  },
  
  // Cuisine preferences (1-5 scale)
  cuisinePreferences: {
    italian: { type: Number, min: 1, max: 5, default: 3 },
    asian: { type: Number, min: 1, max: 5, default: 3 },
    mexican: { type: Number, min: 1, max: 5, default: 3 },
    mediterranean: { type: Number, min: 1, max: 5, default: 3 },
    indian: { type: Number, min: 1, max: 5, default: 3 }
  },
  
  // Recipe type preferences
  recipeTypePreferences: {
    breakfast: { type: Number, min: 1, max: 5, default: 3 },
    lunch: { type: Number, min: 1, max: 5, default: 3 },
    dinner: { type: Number, min: 1, max: 5, default: 3 },
    snack: { type: Number, min: 1, max: 5, default: 3 },
    dessert: { type: Number, min: 1, max: 5, default: 3 }
  },
  
  // Dietary preferences
  dietaryPreferences: {
    preferVegan: { type: Boolean, default: false },
    preferGlutenFree: { type: Boolean, default: false },
    preferLowCarb: { type: Boolean, default: false },
    preferHighProtein: { type: Boolean, default: false },
    maxPrepTime: { type: Number, default: 60, min: 5, max: 180 }, // in minutes
    difficultyPreference: {
      type: String,
      enum: ['any', 'easy', 'medium', 'easy-medium'],
      default: 'any'
    }
  },
  
  // Ingredient preferences
  favoriteIngredients: [{
    type: String,
    trim: true,
    maxlength: [50, 'Ingredient name too long']
  }],
  dislikedIngredients: [{
    type: String,
    trim: true,
    maxlength: [50, 'Ingredient name too long']
  }],
  
  // Taste profile
  tasteProfile: {
    spiceTolerance: {
      type: String,
      enum: ['none', 'mild', 'medium', 'hot', 'extra-hot'],
      default: 'mild'
    },
    sweetnessPreference: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    savoryPreference: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    }
  },
  
  // Nutritional targets (daily goals)
  nutritionTargets: {
    calories: { type: Number, default: 2000, min: 500, max: 5000 },
    protein: { type: Number, default: 50, min: 10, max: 300 }, // grams
    carbohydrates: { type: Number, default: 250, min: 20, max: 500 }, // grams
    fat: { type: Number, default: 65, min: 10, max: 200 } // grams
  },
  
  // Auto-generated from swipe history (updated by recommendation engine)
  learnedPreferences: {
    preferredTags: [{ type: String }],
    avoidedTags: [{ type: String }],
    preferredDifficulty: [{
      type: String,
      enum: ['easy', 'medium', 'hard']
    }],
    averagePrepTime: { type: Number, default: 30 },
    lastCalculated: { type: Date, default: null }
  },
  
  // Recommendation settings
  recommendationSettings: {
    showNewRecipes: { type: Boolean, default: true }, // Show recipes user hasn't seen
    showLikedCuisines: { type: Boolean, default: true },
    showSimilarToFavorites: { type: Boolean, default: true },
    excludeDislikedIngredients: { type: Boolean, default: true },
    varietyBoost: { type: Boolean, default: true } // Prioritize variety over pure preference match
  }
}, {
  timestamps: true
});

// Index for faster lookups
userPreferencesSchema.index({ user: 1 });

// Static method to get or create preferences
userPreferencesSchema.statics.getOrCreate = async function(userId) {
  let prefs = await this.findOne({ user: userId });
  
  if (!prefs) {
    prefs = await this.create({ user: userId });
  }
  
  return prefs;
};

// Method to calculate learned preferences from swipe history
userPreferencesSchema.methods.calculateLearnedPreferences = async function() {
  const SwipeAction = mongoose.model('SwipeAction');
  const Recipe = mongoose.model('Recipe');
  
  // Get user's positive swipes
  const positiveSwipes = await SwipeAction.find({
    user: this.user,
    action: { $in: ['like', 'superlike'] }
  }).populate('recipe');
  
  // Get user's negative swipes
  const negativeSwipes = await SwipeAction.find({
    user: this.user,
    action: 'dislike'
  }).populate('recipe');
  
  // Analyze tags from liked recipes
  const tagFrequency = {};
  let totalPrepTime = 0;
  const difficultyCount = {};
  
  positiveSwipes.forEach(swipe => {
    if (swipe.recipe) {
      // Count tags
      swipe.recipe.tags.forEach(tag => {
        tagFrequency[tag] = (tagFrequency[tag] || 0) + (swipe.action === 'superlike' ? 2 : 1);
      });
      
      // Track prep time
      totalPrepTime += swipe.recipe.time.total || 30;
      
      // Count difficulty
      const diff = swipe.recipe.difficulty;
      difficultyCount[diff] = (difficultyCount[diff] || 0) + 1;
    }
  });
  
  // Sort tags by frequency
  const sortedTags = Object.entries(tagFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tag]) => tag);
  
  // Get top difficulty preferences
  const sortedDifficulties = Object.entries(difficultyCount)
    .sort((a, b) => b[1] - a[1])
    .map(([diff]) => diff);
  
  // Calculate average prep time
  const avgPrepTime = positiveSwipes.length > 0 
    ? Math.round(totalPrepTime / positiveSwipes.length) 
    : 30;
  
  // Update learned preferences
  this.learnedPreferences.preferredTags = sortedTags;
  this.learnedPreferences.preferredDifficulty = sortedDifficulties;
  this.learnedPreferences.averagePrepTime = avgPrepTime;
  this.learnedPreferences.lastCalculated = new Date();
  
  await this.save();
  return this.learnedPreferences;
};

module.exports = mongoose.model('UserPreferences', userPreferencesSchema);
