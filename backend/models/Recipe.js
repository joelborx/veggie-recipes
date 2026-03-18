/**
 * Recipe Model
 * Stores recipe information with nutrition facts and metadata
 */

const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
  calories: { type: Number, required: true, min: 0 },
  protein: { type: Number, required: true, min: 0 }, // in grams
  carbohydrates: { type: Number, required: true, min: 0 }, // in grams
  fat: { type: Number, required: true, min: 0 }, // in grams
  fiber: { type: Number, default: 0, min: 0 }, // in grams
  sugar: { type: Number, default: 0, min: 0 }, // in grams
  sodium: { type: Number, default: 0, min: 0 }, // in mg
  cholesterol: { type: Number, default: 0, min: 0 }, // in mg
  servingSize: { type: String, default: '1 serving' } // e.g., "1 cup", "2 pieces"
}, { _id: false });

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  amount: { type: String, required: true }, // e.g., "2 cups", "3 tbsp"
  optional: { type: Boolean, default: false }
}, { _id: true });

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Recipe title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  images: [{
    url: { type: String, required: true },
    alt: { type: String, default: '' },
    isPrimary: { type: Boolean, default: false }
  }],
  ingredients: [ingredientSchema],
  instructions: [{
    step: { type: Number, required: true },
    description: { type: String, required: true },
    duration: { type: Number, default: 0 } // in minutes
  }],
  nutrition: {
    type: nutritionSchema,
    required: true
  },
  tags: [{
    type: String,
    enum: [
      'breakfast', 'lunch', 'dinner', 'snack', 'dessert',
      'italian', 'asian', 'mexican', 'mediterranean', 'indian',
      'quick', 'easy', 'gourmet', 'budget-friendly',
      'high-protein', 'low-carb', 'gluten-free', 'vegan',
      'soup', 'salad', 'pasta', 'curry', 'stir-fry', 'baked'
    ]
  }],
  dietaryInfo: {
    isVegan: { type: Boolean, default: false },
    isGlutenFree: { type: Boolean, default: false },
    isDairyFree: { type: Boolean, default: true }, // most vegetarian recipes are dairy-free
    isNutFree: { type: Boolean, default: false },
    spiceLevel: {
      type: String,
      enum: ['none', 'mild', 'medium', 'hot', 'extra-hot'],
      default: 'mild'
    }
  },
  time: {
    prep: { type: Number, default: 0, min: 0 }, // in minutes
    cook: { type: Number, default: 0, min: 0 }, // in minutes
    total: { type: Number, default: 0, min: 0 }
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy'
  },
  servings: {
    type: Number,
    required: true,
    min: 1,
    default: 2
  },
  ratings: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, trim: true, maxlength: 2000 },
    date: { type: Date, default: Date.now }
  }],
  ratingStats: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0, min: 0 }
  },
  swipeStats: {
    likes: { type: Number, default: 0, min: 0 },
    dislikes: { type: Number, default: 0, min: 0 },
    superLikes: { type: Number, default: 0, min: 0 }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null // null for system recipes
  }
}, {
  timestamps: true
});

// Indexes for efficient querying
recipeSchema.index({ tags: 1 });
recipeSchema.index({ 'dietaryInfo.isVegan': 1 });
recipeSchema.index({ 'dietaryInfo.isGlutenFree': 1 });
recipeSchema.index({ difficulty: 1 });
recipeSchema.index({ 'time.total': 1 });
recipeSchema.index({ 'ratingStats.average': -1 });

// Calculate total time before saving
recipeSchema.pre('save', function(next) {
  this.time.total = this.time.prep + this.time.cook;
  next();
});

// Virtual for popularity score (used in recommendations)
recipeSchema.virtual('popularityScore').get(function() {
  const totalSwipes = this.swipeStats.likes + this.swipeStats.dislikes + this.swipeStats.superLikes;
  if (totalSwipes === 0) return 0;
  const engagementRate = (this.swipeStats.likes + this.swipeStats.superLikes * 2) / totalSwipes;
  return (this.ratingStats.average * 0.3) + (engagementRate * 0.7);
});

module.exports = mongoose.model('Recipe', recipeSchema);
