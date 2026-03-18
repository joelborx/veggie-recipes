// Seed script for MongoDB
require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');

// Load all recipes
const allRecipes = require('./seedRecipesCombined.js');

// Valid tags from Recipe schema
const validTags = [
  'breakfast', 'lunch', 'dinner', 'snack', 'dessert',
  'italian', 'asian', 'mexican', 'mediterranean', 'indian',
  'quick', 'easy', 'gourmet', 'budget-friendly',
  'high-protein', 'low-carb', 'gluten-free', 'vegan',
  'soup', 'salad', 'pasta', 'curry', 'stir-fry', 'baked'
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/veggie_recipes';
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing recipes (optional - remove if you want to keep existing)
    console.log('Clearing existing recipes...');
    await Recipe.deleteMany({ createdBy: null });
    console.log('Cleared existing recipes');

    // Transform and insert recipes
    console.log(`Inserting ${allRecipes.length} recipes...`);
    
    const transformedRecipes = allRecipes.map(recipe => ({
      title: recipe.title,
      description: recipe.description,
      images: recipe.images || [{ url: recipe.imageUrl || '', alt: recipe.title, isPrimary: true }],
      ingredients: recipe.ingredients.map(ing => ({
        name: ing.name,
        amount: ing.amount,
        optional: ing.optional || false
      })),
      instructions: recipe.instructions.map((inst, idx) => ({
        step: inst.step || idx + 1,
        description: inst.description,
        duration: inst.duration || 0
      })),
      nutrition: {
        calories: recipe.nutrition?.calories || 0,
        protein: recipe.nutrition?.protein || 0,
        carbohydrates: recipe.nutrition?.carbohydrates || 0,
        fat: recipe.nutrition?.fat || 0,
        fiber: recipe.nutrition?.fiber || 0,
        sugar: recipe.nutrition?.sugar || 0,
        sodium: recipe.nutrition?.sodium || 0,
        cholesterol: recipe.nutrition?.cholesterol || 0,
        servingSize: recipe.nutrition?.servingSize || '1 serving'
      },
      tags: (recipe.tags || []).filter(tag => validTags.includes(tag)),
      dietaryInfo: {
        isVegan: recipe.dietaryInfo?.isVegan || false,
        isGlutenFree: recipe.dietaryInfo?.isGlutenFree || false,
        isDairyFree: recipe.dietaryInfo?.isDairyFree !== false,
        isNutFree: recipe.dietaryInfo?.isNutFree || false,
        spiceLevel: (() => {
          const level = recipe.dietaryInfo?.spiceLevel;
          if (typeof level === 'number' || /^\d+$/.test(level)) {
            const num = parseInt(level);
            if (num === 0) return 'none';
            if (num <= 2) return 'mild';
            if (num <= 3) return 'medium';
            if (num <= 4) return 'hot';
            return 'extra-hot';
          }
          return level || 'mild';
        })()
      },
      time: {
        prep: recipe.time?.prep || 0,
        cook: recipe.time?.cook || 0,
        total: (recipe.time?.prep || 0) + (recipe.time?.cook || 0)
      },
      difficulty: (() => {
        const diff = recipe.difficulty;
        if (diff === 'quick' || diff === 'easy') return 'easy';
        if (diff === 'elaborate' || diff === 'medium') return 'medium';
        if (diff === 'hard') return 'hard';
        return 'easy';
      })(),
      servings: recipe.servings || 2,
      ratings: {
        average: recipe.ratings?.average || 0,
        count: recipe.ratings?.count || 0
      },
      swipeStats: {
        likes: recipe.swipeStats?.likes || 0,
        dislikes: recipe.swipeStats?.dislikes || 0,
        superLikes: recipe.swipeStats?.superLikes || 0
      },
      isActive: true,
      createdBy: null
    }));

    const result = await Recipe.insertMany(transformedRecipes);
    console.log(`Successfully inserted ${result.length} recipes`);

    // Show breakdown by cuisine
    const cuisines = ['italian', 'mexican', 'mediterranean', 'indian'];
    for (const cuisine of cuisines) {
      const count = result.filter(r => r.tags.includes(cuisine)).length;
      console.log(`- ${cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}: ${count}`);
    }

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedDatabase();
