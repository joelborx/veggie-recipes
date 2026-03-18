/**
 * SharedRecipe Model
 * Stores shareable links for recipes
 */

const mongoose = require('mongoose');

const sharedRecipeSchema = new mongoose.Schema({
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: [true, 'Recipe reference is required']
  },
  token: {
    type: String,
    required: [true, 'Share token is required'],
    unique: true,
    index: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Creator is required']
  },
  expiresAt: {
    type: Date,
    required: [true, 'Expiration date is required']
  }
}, {
  timestamps: true
});

// Index for efficient token lookup
sharedRecipeSchema.index({ token: 1 });

// Index for finding shares by recipe
sharedRecipeSchema.index({ recipe: 1 });

// Index for finding shares by user
sharedRecipeSchema.index({ createdBy: 1 });

// Index for expiration cleanup
sharedRecipeSchema.index({ expiresAt: 1 });

// Check if share is expired
sharedRecipeSchema.methods.isExpired = function() {
  return new Date() > this.expiresAt;
};

// Generate a unique share token
sharedRecipeSchema.statics.generateToken = function() {
  // Generate a random alphanumeric token (16 characters)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 16; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
};

module.exports = mongoose.model('SharedRecipe', sharedRecipeSchema);
