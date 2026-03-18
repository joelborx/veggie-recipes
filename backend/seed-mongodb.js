const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const uri = 'mongodb://localhost:27017/veggie_recipes';

async function seedDatabase() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('veggie_recipes');
    const collection = db.collection('recipes');
    
    // Clear existing
    await collection.deleteMany({});
    console.log('🗑️ Cleared existing recipes');
    
    // Add sample recipes
    const sampleRecipes = [
      {
        title: "Paneer Tikka Masala",
        description: "Grilled marinated paneer cubes in a rich, creamy tomato gravy.",
        images: [{url: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6eb?w=800", alt: "Paneer Tikka Masala", isPrimary: true}],
        ingredients: [{name: "paneer", amount: "400g"}, {name: "yogurt", amount: "1/2 cup"}],
        instructions: [{step: 1, description: "Marinate paneer", duration: 30}],
        nutrition: {calories: 485, protein: 22, carbohydrates: 0, fat: 36, fiber: 4, sugar: 10, sodium: 620, servingSize: "1 cup"},
        tags: ["dinner", "indian", "curry"],
        dietaryInfo: {isVegan: false, isGlutenFree: true, isDairyFree: false, isNutFree: false, spiceLevel: "medium"},
        time: {prep: 45, cook: 45, total: 90},
        difficulty: "medium",
        servings: 4
      },
      {
        title: "Quick Tadka Dal",
        description: "Yellow lentils tempered with mustard seeds and garlic.",
        images: [{url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", alt: "Tadka Dal", isPrimary: true}],
        ingredients: [{name: "toor dal", amount: "1 cup"}, {name: "turmeric", amount: "1/2 tsp"}],
        instructions: [{step: 1, description: "Pressure cook dal", duration: 20}],
        nutrition: {calories: 195, protein: 11, carbohydrates: 0, fat: 4, fiber: 7, sugar: 3, sodium: 260, servingSize: "1 cup"},
        tags: ["dinner", "indian", "quick"],
        dietaryInfo: {isVegan: true, isGlutenFree: true, isDairyFree: true, isNutFree: true, spiceLevel: "mild"},
        time: {prep: 5, cook: 25, total: 30},
        difficulty: "easy",
        servings: 4
      }
    ];
    
    const result = await collection.insertMany(sampleRecipes);
    console.log(`✅ Inserted ${result.insertedCount} recipes`);
    
    // Create indexes
    await collection.createIndex({ title: 'text', description: 'text' });
    await collection.createIndex({ tags: 1 });
    console.log('✅ Created indexes');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
    console.log('🔌 Disconnected');
  }
}

seedDatabase();
