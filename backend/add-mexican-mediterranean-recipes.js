const { MongoClient } = require('mongodb');

const recipes = [
  {
    title: "Mexikanische Veggie-Fajitas",
    description: "Bunte Gemüsestreifen mit Paprika, Zwiebeln und Avocado in Tortillas.",
    images: [{url: "https://images.unsplash.com/photo-1534352956036-cd81e27fed21?w=800", alt: "Veggie Fajitas", isPrimary: true}],
    ingredients: [{name: "Tortillas", amount: "8 Stück"}, {name: "Paprika", amount: "3 Stück"}, {name: "Avocado", amount: "2 Stück"}],
    instructions: [{step: 1, description: "Gemüse schneiden", duration: 10}, {step: 2, description: "Anbraten", duration: 10}],
    nutrition: {calories: 380, protein: 10, carbohydrates: 48, fat: 18, fiber: 12, sugar: 8, sodium: 620, servingSize: "2 Fajitas"},
    tags: ["dinner", "mexican", "quick"],
    dietaryInfo: {isVegan: true, isGlutenFree: false, isDairyFree: true, isNutFree: true, spiceLevel: "medium"},
    time: {prep: 15, cook: 15, total: 30},
    difficulty: "easy",
    servings: 4,
    isActive: true
  },
  {
    title: "Chiles Rellenos",
    description: "Gefüllte Paprikaschoten mit Käse und Tomatensauce.",
    images: [{url: "https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?w=800", alt: "Chiles Rellenos", isPrimary: true}],
    ingredients: [{name: "Poblano-Paprika", amount: "6 Stück"}, {name: "Käse", amount: "300g"}, {name: "Eier", amount: "3 Stück"}],
    instructions: [{step: 1, description: "Paprika rösten", duration: 15}, {step: 2, description: "Frittieren", duration: 10}],
    nutrition: {calories: 420, protein: 22, carbohydrates: 18, fat: 28, fiber: 6, sugar: 10, sodium: 780, servingSize: "2 Stück"},
    tags: ["dinner", "mexican", "baked"],
    dietaryInfo: {isVegan: false, isGlutenFree: false, isDairyFree: false, isNutFree: true, spiceLevel: "medium"},
    time: {prep: 30, cook: 45, total: 75},
    difficulty: "medium",
    servings: 4,
    isActive: true
  },
  {
    title: "Enchiladas Verdes",
    description: "Gefüllte Tortillas mit grüner Salsa und Käse überbacken.",
    images: [{url: "https://images.unsplash.com/photo-1534352956036-cd81e27fed21?w=800", alt: "Enchiladas", isPrimary: true}],
    ingredients: [{name: "Tortillas", amount: "12 Stück"}, {name: "Tomatillos", amount: "500g"}, {name: "Käse", amount: "400g"}],
    instructions: [{step: 1, description: "Salsa zubereiten", duration: 20}, {step: 2, description: "Im Ofen backen", duration: 25}],
    nutrition: {calories: 480, protein: 24, carbohydrates: 52, fat: 22, fiber: 8, sugar: 12, sodium: 920, servingSize: "3 Stück"},
    tags: ["dinner", "mexican", "baked"],
    dietaryInfo: {isVegan: false, isGlutenFree: false, isDairyFree: false, isNutFree: true, spiceLevel: "medium"},
    time: {prep: 35, cook: 35, total: 70},
    difficulty: "medium",
    servings: 4,
    isActive: true
  },
  {
    title: "Mexikanischer Street Corn",
    description: "Gegrillter Mais mit Mayo, Käse und Chili.",
    images: [{url: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800", alt: "Street Corn", isPrimary: true}],
    ingredients: [{name: "Mais", amount: "4 Kolben"}, {name: "Mayo", amount: "100g"}, {name: "Cotija-Käse", amount: "100g"}],
    instructions: [{step: 1, description: "Mais grillen", duration: 15}, {step: 2, description: "Mit Sauce bestreichen", duration: 5}],
    nutrition: {calories: 320, protein: 10, carbohydrates: 38, fat: 18, fiber: 6, sugar: 12, sodium: 580, servingSize: "1 Kolben"},
    tags: ["snack", "mexican", "streetfood"],
    dietaryInfo: {isVegan: false, isGlutenFree: true, isDairyFree: false, isNutFree: true, spiceLevel: "mild"},
    time: {prep: 10, cook: 15, total: 25},
    difficulty: "easy",
    servings: 4,
    isActive: true
  },
  {
    title: "Griechischer Salat",
    description: "Klassischer Salat mit Tomaten, Gurken, Oliven und Feta.",
    images: [{url: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800", alt: "Griechischer Salat", isPrimary: true}],
    ingredients: [{name: "Tomaten", amount: "400g"}, {name: "Gurke", amount: "2 Stück"}, {name: "Feta", amount: "200g"}],
    instructions: [{step: 1, description: "Gemüse schneiden", duration: 10}, {step: 2, description: "Mit Dressing mischen", duration: 5}],
    nutrition: {calories: 280, protein: 12, carbohydrates: 16, fat: 20, fiber: 4, sugar: 10, sodium: 680, servingSize: "1 Portion"},
    tags: ["lunch", "mediterranean", "salad"],
    dietaryInfo: {isVegan: false, isGlutenFree: true, isDairyFree: false, isNutFree: true, spiceLevel: "none"},
    time: {prep: 15, cook: 0, total: 15},
    difficulty: "easy",
    servings: 4,
    isActive: true
  },
  {
    title: "Hummus mit Pitabrot",
    description: "Cremiger Kichererbsen-Dip mit frischem Pitabrot.",
    images: [{url: "https://images.unsplash.com/photo-1637949385162-e416fb15b2ce?w=800", alt: "Hummus", isPrimary: true}],
    ingredients: [{name: "Kichererbsen", amount: "1 Dose"}, {name: "Tahini", amount: "3 EL"}, {name: "Zitrone", amount: "1 Stück"}],
    instructions: [{step: 1, description: "Kichererbsen pürieren", duration: 5}, {step: 2, description: "Mit Tahini vermischen", duration: 5}],
    nutrition: {calories: 320, protein: 12, carbohydrates: 38, fat: 16, fiber: 10, sugar: 6, sodium: 480, servingSize: "1 Portion"},
    tags: ["snack", "mediterranean", "quick"],
    dietaryInfo: {isVegan: true, isGlutenFree: false, isDairyFree: true, isNutFree: false, spiceLevel: "none"},
    time: {prep: 10, cook: 0, total: 10},
    difficulty: "easy",
    servings: 4,
    isActive: true
  },
  {
    title: "Ratatouille",
    description: "Französisches Gemüsegericht mit Zucchini, Auberginen und Paprika.",
    images: [{url: "https://images.unsplash.com/photo-1572453800999-e8d2d0f13f9c?w=800", alt: "Ratatouille", isPrimary: true}],
    ingredients: [{name: "Zucchini", amount: "2 Stück"}, {name: "Auberginen", amount: "1 Stück"}, {name: "Paprika", amount: "2 Stück"}],
    instructions: [{step: 1, description: "Gemüse schneiden", duration: 20}, {step: 2, description: "Schichten und backen", duration: 45}],
    nutrition: {calories: 180, protein: 6, carbohydrates: 28, fat: 8, fiber: 10, sugar: 14, sodium: 420, servingSize: "1 Portion"},
    tags: ["dinner", "mediterranean", "french", "baked"],
    dietaryInfo: {isVegan: true, isGlutenFree: true, isDairyFree: true, isNutFree: true, spiceLevel: "none"},
    time: {prep: 30, cook: 60, total: 90},
    difficulty: "medium",
    servings: 4,
    isActive: true
  },
  {
    title: "Falafel mit Tahini",
    description: "Kichererbsen-Bällchen mit Sesam-Sauce und Salat.",
    images: [{url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800", alt: "Falafel", isPrimary: true}],
    ingredients: [{name: "Kichererbsen", amount: "250g getrocknet"}, {name: "Koriander", amount: "1 Bund"}, {name: "Kreuzkümmel", amount: "1 TL"}],
    instructions: [{step: 1, description: "Kichererbsen einweichen", duration: 720}, {step: 2, description: "Frittieren", duration: 10}],
    nutrition: {calories: 340, protein: 14, carbohydrates: 42, fat: 16, fiber: 14, sugar: 8, sodium: 580, servingSize: "4 Stück"},
    tags: ["dinner", "mediterranean", "middle-eastern"],
    dietaryInfo: {isVegan: true, isGlutenFree: true, isDairyFree: true, isNutFree: true, spiceLevel: "mild"},
    time: {prep: 60, cook: 15, total: 795},
    difficulty: "medium",
    servings: 4,
    isActive: true
  }
];

async function addRecipes() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    const db = client.db('veggie_recipes');
    const collection = db.collection('recipes');
    
    const result = await collection.insertMany(recipes);
    console.log(`✅ Inserted ${result.insertedCount} Mexican & Mediterranean recipes`);
    
    const count = await collection.countDocuments();
    console.log(`📊 Total recipes: ${count}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
  }
}

addRecipes();
