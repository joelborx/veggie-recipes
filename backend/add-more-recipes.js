const { MongoClient } = require('mongodb');

const recipes = [
  {
    title: "Cremige Spinat-Ricotta-Gnocchi",
    description: "Hausgemachte Gnocchi in einer cremigen Spinat-Ricotta-Sauce. Ein italienischer Klassiker.",
    images: [{url: "https://images.unsplash.com/photo-1551183053-bf91a1d8116b?w=800", alt: "Spinat Gnocchi", isPrimary: true}],
    ingredients: [{name: "Gnocchi", amount: "500g"}, {name: "Spinat", amount: "300g"}, {name: "Ricotta", amount: "250g"}],
    instructions: [{step: 1, description: "Spinat blanchieren", duration: 5}, {step: 2, description: "Mit Ricotta vermischen", duration: 5}],
    nutrition: {calories: 580, protein: 24, carbohydrates: 68, fat: 22, fiber: 8, sugar: 6, sodium: 890, servingSize: "1 Portion"},
    tags: ["dinner", "italian", "pasta", "high-protein"],
    dietaryInfo: {isVegan: false, isGlutenFree: false, isDairyFree: false, isNutFree: true, spiceLevel: "none"},
    time: {prep: 15, cook: 25, total: 40},
    difficulty: "medium",
    servings: 4,
    isActive: true
  },
  {
    title: "Auberginen-Parmigiana",
    description: "Geschichtete Auberginen mit Tomatensauce, Mozzarella und Parmesan.",
    images: [{url: "https://images.unsplash.com/photo-1572453800999-e8d2d0f13f9c?w=800", alt: "Auberginen Parmigiana", isPrimary: true}],
    ingredients: [{name: "Auberginen", amount: "3 Stück"}, {name: "Mozzarella", amount: "300g"}, {name: "Parmesan", amount: "100g"}],
    instructions: [{step: 1, description: "Auberginen braten", duration: 20}, {step: 2, description: "Schichten und backen", duration: 40}],
    nutrition: {calories: 620, protein: 28, carbohydrates: 32, fat: 42, fiber: 12, sugar: 14, sodium: 1200, servingSize: "1 Portion"},
    tags: ["dinner", "italian", "baked", "high-protein"],
    dietaryInfo: {isVegan: false, isGlutenFree: true, isDairyFree: false, isNutFree: true, spiceLevel: "none"},
    time: {prep: 25, cook: 60, total: 85},
    difficulty: "medium",
    servings: 4,
    isActive: true
  },
  {
    title: "Pesto-Pasta mit Kirschtomaten",
    description: "Frische Pasta mit hausgemachtem Basilikum-Pesto und Kirschtomaten.",
    images: [{url: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800", alt: "Pesto Pasta", isPrimary: true}],
    ingredients: [{name: "Pasta", amount: "400g"}, {name: "Basilikum", amount: "2 Bund"}, {name: "Parmesan", amount: "80g"}],
    instructions: [{step: 1, description: "Pesto zubereiten", duration: 5}, {step: 2, description: "Pasta kochen", duration: 10}],
    nutrition: {calories: 680, protein: 22, carbohydrates: 78, fat: 34, fiber: 6, sugar: 8, sodium: 650, servingSize: "1 Portion"},
    tags: ["lunch", "dinner", "italian", "quick", "pasta"],
    dietaryInfo: {isVegan: false, isGlutenFree: false, isDairyFree: false, isNutFree: false, spiceLevel: "none"},
    time: {prep: 15, cook: 15, total: 30},
    difficulty: "easy",
    servings: 4,
    isActive: true
  },
  {
    title: "Risotto ai Funghi",
    description: "Cremiges Pilz-Risotto mit Steinpilzen und Parmesan.",
    images: [{url: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800", alt: "Pilz Risotto", isPrimary: true}],
    ingredients: [{name: "Risottoreis", amount: "300g"}, {name: "Steinpilze", amount: "300g"}, {name: "Weißwein", amount: "150ml"}],
    instructions: [{step: 1, description: "Zwiegeln anschwitzen", duration: 3}, {step: 2, description: "Reis dazugeben", duration: 25}],
    nutrition: {calories: 520, protein: 18, carbohydrates: 68, fat: 18, fiber: 4, sugar: 4, sodium: 780, servingSize: "1 Portion"},
    tags: ["dinner", "italian", "gourmet"],
    dietaryInfo: {isVegan: false, isGlutenFree: true, isDairyFree: false, isNutFree: true, spiceLevel: "none"},
    time: {prep: 15, cook: 45, total: 60},
    difficulty: "medium",
    servings: 4,
    isActive: true
  },
  {
    title: "Bruschetta mit Tomaten",
    description: "Knuspriges Ciabatta mit frischen Tomaten, Basilikum und Knoblauch.",
    images: [{url: "https://images.unsplash.com/photo-1572695157363-23e3e039525e?w=800", alt: "Bruschetta", isPrimary: true}],
    ingredients: [{name: "Ciabatta", amount: "1 Stück"}, {name: "Kirschtomaten", amount: "400g"}, {name: "Basilikum", amount: "1 Bund"}],
    instructions: [{step: 1, description: "Tomaten würfeln", duration: 5}, {step: 2, description: "Brot rösten", duration: 5}],
    nutrition: {calories: 280, protein: 8, carbohydrates: 38, fat: 12, fiber: 4, sugar: 6, sodium: 480, servingSize: "2 Stück"},
    tags: ["snack", "italian", "quick", "easy"],
    dietaryInfo: {isVegan: true, isGlutenFree: false, isDairyFree: true, isNutFree: true, spiceLevel: "none"},
    time: {prep: 10, cook: 8, total: 18},
    difficulty: "easy",
    servings: 4,
    isActive: true
  },
  {
    title: "Minestrone Suppe",
    description: "Herzhafte italienische Gemüsesuppe mit Pasta, Bohnen und frischen Kräutern.",
    images: [{url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800", alt: "Minestrone", isPrimary: true}],
    ingredients: [{name: "Zucchini", amount: "2 Stück"}, {name: "Karotten", amount: "3 Stück"}, {name: "Pasta", amount: "150g"}],
    instructions: [{step: 1, description: "Gemüse schneiden", duration: 15}, {step: 2, description: "Köcheln lassen", duration: 40}],
    nutrition: {calories: 320, protein: 14, carbohydrates: 52, fat: 6, fiber: 14, sugar: 12, sodium: 890, servingSize: "1 Schüssel"},
    tags: ["lunch", "dinner", "italian", "soup", "high-protein"],
    dietaryInfo: {isVegan: true, isGlutenFree: false, isDairyFree: true, isNutFree: true, spiceLevel: "none"},
    time: {prep: 20, cook: 40, total: 60},
    difficulty: "easy",
    servings: 6,
    isActive: true
  },
  {
    title: "Caprese Salat",
    description: "Klassischer italienischer Salat mit frischen Tomaten, Mozzarella und Basilikum.",
    images: [{url: "https://images.unsplash.com/photo-1529312266912-b33cf6227e24?w=800", alt: "Caprese", isPrimary: true}],
    ingredients: [{name: "Mozzarella", amount: "300g"}, {name: "Tomaten", amount: "400g"}, {name: "Basilikum", amount: "1 Bund"}],
    instructions: [{step: 1, description: "Mozzarella und Tomaten schneiden", duration: 5}, {step: 2, description: "Anrichten", duration: 3}],
    nutrition: {calories: 380, protein: 22, carbohydrates: 12, fat: 28, fiber: 3, sugar: 8, sodium: 520, servingSize: "1 Portion"},
    tags: ["lunch", "italian", "quick", "easy", "salad", "high-protein"],
    dietaryInfo: {isVegan: false, isGlutenFree: true, isDairyFree: false, isNutFree: true, spiceLevel: "none"},
    time: {prep: 12, cook: 0, total: 12},
    difficulty: "easy",
    servings: 4,
    isActive: true
  },
  {
    title: "Vegetarische Lasagne",
    description: "Schichtige Lasagne mit Spinat, Ricotta und Tomatensauce.",
    images: [{url: "https://images.unsplash.com/photo-1574868235872-1663edcb4569?w=800", alt: "Lasagne", isPrimary: true}],
    ingredients: [{name: "Lasagneblätter", amount: "12 Stück"}, {name: "Spinat", amount: "500g"}, {name: "Ricotta", amount: "400g"}],
    instructions: [{step: 1, description: "Spinat blanchieren", duration: 8}, {step: 2, description: "Im Ofen backen", duration: 40}],
    nutrition: {calories: 580, protein: 28, carbohydrates: 52, fat: 28, fiber: 8, sugar: 12, sodium: 1100, servingSize: "1 Portion"},
    tags: ["dinner", "italian", "baked", "high-protein"],
    dietaryInfo: {isVegan: false, isGlutenFree: false, isDairyFree: false, isNutFree: true, spiceLevel: "none"},
    time: {prep: 35, cook: 55, total: 90},
    difficulty: "medium",
    servings: 6,
    isActive: true
  },
  {
    title: "Focaccia mit Rosmarin",
    description: "Luftiges italienisches Fladenbrot mit Rosmarin und Meersalz.",
    images: [{url: "https://images.unsplash.com/photo-1600336153113-d62c1d4c1e7a?w=800", alt: "Focaccia", isPrimary: true}],
    ingredients: [{name: "Mehl", amount: "500g"}, {name: "Hefe", amount: "1 Päckchen"}, {name: "Rosmarin", amount: "3 Zweige"}],
    instructions: [{step: 1, description: "Teig kneten", duration: 10}, {step: 2, description: "Gehen lassen", duration: 60}],
    nutrition: {calories: 320, protein: 8, carbohydrates: 52, fat: 10, fiber: 3, sugar: 2, sodium: 580, servingSize: "1 Stück"},
    tags: ["snack", "italian", "baked"],
    dietaryInfo: {isVegan: true, isGlutenFree: false, isDairyFree: true, isNutFree: true, spiceLevel: "none"},
    time: {prep: 25, cook: 20, total: 105},
    difficulty: "medium",
    servings: 8,
    isActive: true
  },
  {
    title: "Tiramisu",
    description: "Klassisches italienisches Dessert mit Mascarpone, Espresso und Kakao.",
    images: [{url: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800", alt: "Tiramisu", isPrimary: true}],
    ingredients: [{name: "Mascarpone", amount: "500g"}, {name: "Eier", amount: "4 Stück"}, {name: "Espresso", amount: "300ml"}],
    instructions: [{step: 1, description: "Eigelb schlagen", duration: 5}, {step: 2, description: "Kühlen", duration: 240}],
    nutrition: {calories: 420, protein: 10, carbohydrates: 42, fat: 24, fiber: 2, sugar: 28, sodium: 180, servingSize: "1 Portion"},
    tags: ["dessert", "italian", "gourmet"],
    dietaryInfo: {isVegan: false, isGlutenFree: false, isDairyFree: false, isNutFree: true, spiceLevel: "none"},
    time: {prep: 30, cook: 0, total: 270},
    difficulty: "medium",
    servings: 8,
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
    console.log(`✅ Inserted ${result.insertedCount} recipes`);
    
    const count = await collection.countDocuments();
    console.log(`📊 Total recipes: ${count}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
  }
}

addRecipes();
