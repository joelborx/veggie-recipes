/**
 * Models Index
 * Central export for all models
 */

const User = require('./User');
const Recipe = require('./Recipe');
const SwipeAction = require('./SwipeAction');
const EatenMeal = require('./EatenMeal');

module.exports = {
  User,
  Recipe,
  SwipeAction,
  EatenMeal
};
