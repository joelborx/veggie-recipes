const { MongoClient } = require('mongodb');

const recipes = [
  {
    title: "Pad Thai",
    description: "Thailändische Reisnudeln mit Tofu, Erdnüssen und Tamarindensauce.",
    images: [{url: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800", alt: "Pad Thai", isPrimary: true}],
    ingredients: [{name: "Reisnudeln", amount: "300g"}, {name: "Tofu", amount: "200g"}, {name: "Erdnüsse", amount: "50g"}],
    instructions: [{step: 1, description: "Nudeln einweichen", duration: 30}, {step: 2, description: "Anbraten", duration: 10}],
    nutrition: {calories: 450, protein: 18, carbohydrates: 65, fat: 16, fiber: 4, sugar: 12, sodium: 890, servingSize: "1 Portion"},
    tags: ["dinner", "asian", "thai", "stir-fry"],
    dietaryInfo: {isVegan: true, isGlutenFree: false, isDairyFree: true, isNutFree: false, spiceLevel: "medium"},
    time: {prep: 20, cook: 15, total: 65},
    difficulty: "medium",
    servings: 4,
    isActive: true
  },
  {
    title: "Vegetarische Sushi-Rollen",
    description: "Frische Sushi-Rollen mit Avocado, Gurke und Tamagoyaki.",
    images: [{url: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800", alt: "Sushi", isPrimary: true}],
    ingredients: [{name: "Sushi-Reis", amount: "300g"}, {name: "Nori-Blätter", amount: "10 Stück"}, {name: "Avocado", amount: "2 Stück"}],
    instructions: [{step: 1, description: "Reis kochen", duration: 20}, {step: 2, description: "Rollen formen", duration: 15}],
    nutrition: {calories: 320, protein: 8, carbohydrates: 58, fat: 8, fiber: 6, sugar: 4, sodium: 520, servingSize: "6 Stück"},
    tags: ["dinner", "asian", "japanese", "sushi"],
    dietaryInfo: {isVegan: false, isGlutenFree: true, isDairyFree: true, isNutFree: true, spiceLevel: "none"},
    time: {prep: 30, cook: 20, total: 50},
    difficulty: "medium",
    servings: 4,
    isActive: true
  },
  {
    title: "Vegetarische Dim Sum",
    description: "Gedämpfte Teigtaschen mit Gemüsefüllung.",
    images: [{url: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800", alt: "Dim Sum", isPrimary: true}],
    ingredients: [{name: "Dumpling-Teig", amount: "300g"}, {name: "Pak Choi", amount: "200g"}, {name: "Shiitake", amount: "100g"}],
    instructions: [{step: 1, description: "Füllung vorbereiten", duration: 15}, {step: 2, description: "Dämpfen", duration: 15}],
    nutrition: {calories: 280, protein: 10, carbohydrates: 45, fat: 8, fiber: 6, sugar: 4, sodium: 680, servingSize: "6 Stück"},
    tags: ["dinner", "asian", "chinese", "dimsum"],
    dietaryInfo: {isVegan: true, isGlutenFree: false, isDairyFree: true, isNutFree: true, spiceLevel: "mild"},
    time: {prep: 40, cook: 15, total: 55},
    difficulty: "medium",
    servings: 4,
    isActive: true
  },
  {
    title: "Koreanischer Tofu-Bulgogi",
    description: "Marinierter Tofu in süß-scharfer Sojasauce mit Sesam.",
    images: [{url: "https://images.unsplash.com/photo-1583224964978-2257b96070d3?w=800", alt: "Tofu Bulgogi", isPrimary: true}],
    ingredients: [{name: "Tofu", amount: "400g"}, {name: "Sojasauce", amount: "100ml"}, {name: "Sesam", amount: "2 EL"}],
    instructions: [{step: 1, description: "Tofu marinieren", duration: 30}, {step: 2, description: "Anbraten", duration: 10}],
    nutrition: {calories: 340, protein: 24, carbohydrates: 18, fat: 22, fiber: 4, sugar: 12, sodium: 1200, servingSize: "1 Portion"},
    tags: ["dinner", "asian", "korean", "high-protein"],
    dietaryInfo: {isVegan: true, isGlutenFree: false, isDairyFree: true, isNutFree: false, spiceLevel: "medium"},
    time: {prep: 35, cook: 15, total: 50},
    difficulty: "easy",
    servings: 4,
    isActive: true
  },
  {
    title: "Vietnamesische Pho Chay",
    description: "Aromatische Nudelsuppe mit Gemüsebrühe und Kräutern.",
    images: [{url: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc83?w=800", alt: "Pho", isPrimary: true}],
    ingredients: [{name: "Reisnudeln", amount: "300g"}, {name: "Gemüsebrühe", amount: "1.5L"}, {name: "Zimt", amount: "1 Stange"}],
    instructions: [{step: 1, description: "Brühe köcheln", duration: 60}, {step: 2, description: "Nudeln kochen", duration: 5}],
    nutrition: {calories: 280, protein: 8, carbohydrates: 52, fat: 4, fiber: 6, sugar: 6, sodium: 780, servingSize: "1 Schüssel"},
    tags: ["lunch", "dinner", "asian", "vietnamese", "soup"],
    dietaryInfo: {isVegan: true, isGlutenFree: true, isDairyFree: true, isNutFree: true, spiceLevel: "mild"},
    time: {prep: 20, cook: 65, total: 85},
    difficulty: "medium",
    servings: 4,
    isActive: true
  },
  {
    title: "Thai Grünes Curry",
    description: "Cremiges Kokoscurry mit Gemüse und Thai-Basilikum.",
    images: [{url: "https://images.unsplash.com/photo-1626804475297-411dbe6314c3?w=800", alt: "Grünes Curry", isPrimary: true}],
    ingredients: [{name: "Kokosmilch", amount: "400ml"}, {name: "Grüne Currypaste", amount: "2 EL"}, {name: "Thai-Auberginen", amount: "200g"}],
    instructions: [{step: 1, description: "Currypaste anbraten", duration: 3}, {step: 2, description: "Köcheln lassen", duration: 20}],
    nutrition: {calories: 380, protein: 10, carbohydrates: 18, fat: 28, fiber: 6, sugar: 8, sodium: 920, servingSize: "1 Portion"},
    tags: ["dinner", "asian", "thai", "curry"],
    dietaryInfo: {isVegan: true, isGlutenFree: true, isDairyFree: true, isNutFree: true, spiceLevel: "hot"},
    time: {prep: 15, cook: 25, total: 40},
    difficulty: "medium",
    servings: 4,
    isActive: true
  },
  {
    title: "Chinesisches Mapo Tofu",
    description: "Würziges Tofu-Gericht mit Sichuan-Pfeffer und Doubanjiang.",
    images: [{url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800", alt: "Mapo Tofu", isPrimary: true}],
    ingredients: [{name: "Seidentofu", amount: "400g"}, {name: "Doubanjiang", amount: "2 EL"}, {name: "Sichuan-Pfeffer", amount: "1 TL"}],
    instructions: [{step: 1, description: "Tofu würfeln", duration: 5}, {step: 2, description: "Mit Sauce köcheln", duration: 15}],
    nutrition: {calories: 240, protein: 18, carbohydrates: 8, fat: 16, fiber: 2, sugar: 4, sodium: 1100, servingSize: "1 Portion"},
    tags: ["dinner", "asian", "chinese", "spicy"],
    dietaryInfo: {isVegan: true, isGlutenFree: true, isDairyFree: true, isNutFree: true, spiceLevel: "extra-hot"},
    time: {prep: 10, cook: 20, total: 30},
    difficulty: "medium",
    servings: 4,
    isActive: true
  },
  {
    title: "Japanische Miso-Suppe",
    description: "Traditionelle Suppe mit Miso-Paste, Tofu und Wakame.",
    images: [{url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800", alt: "Miso-Suppe", isPrimary: true}],
    ingredients: [{name: "Miso-Paste", amount: "3 EL"}, {name: "Seidentofu", amount: "200g"}, {name: "Wakame", amount: "10g"}],
    instructions: [{step: 1, description: "Dashi zubereiten", duration: 10}, {step: 2, description: "Miso einrühren", duration: 5}],
    nutrition: {calories: 120, protein: 10, carbohydrates: 12, fat: 4, fiber: 2, sugar: 4, sodium: 890, servingSize: "1 Schüssel"},
    tags: ["breakfast", "lunch", "asian", "japanese", "soup"],
    dietaryInfo: {isVegan: true, isGlutenFree: true, isDairyFree: true, isNutFree: true, spiceLevel: "none"},
    time: {prep: 5, cook: 15, total: 20},
    difficulty: "easy",
    servings: 4,
    isActive: true
  },
  {
    title: "Indisches Chana Masala",
    description: "Würzige Kichererbsen in Tomaten-Zwiebel-Sauce.",
    images: [{url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800", alt: "Chana Masala", isPrimary: true}],
    ingredients: [{name: "Kichererbsen", amount: "2 Dosen"}, {name: "Tomaten", amount: "400g"}, {name: "Garam Masala", amount: "2 TL"}],
    instructions: [{step: 1, description: "Zwiegeln anbraten", duration: 10}, {step: 2, description: "Köcheln lassen", duration: 30}],
    nutrition: {calories: 320, protein: 14, carbohydrates: 52, fat: 8, fiber: 16, sugar: 12, sodium: 680, servingSize: "1 Portion"},
    tags: ["dinner", "indian", "curry", "high-protein"],
    dietaryInfo: {isVegan: true, isGlutenFree: true, isDairyFree: true, isNutFree: true, spiceLevel: "medium"},
    time: {prep: 15, cook: 40, total: 55},
    difficulty: "easy",
    servings: 4,
    isActive: true
  },
  {
    title: "Indisches Palak Paneer",
    description: "Spinat mit frischem Paneer in aromatischer Sauce.",
    images: [{url: "https://images.unsplash.com/photo-1606471191009-63994c822a3f?w=800", alt: "Palak Paneer", isPrimary: true}],
    ingredients: [{name: "Spinat", amount: "500g"}, {name: "Paneer", amount: "300g"}, {name: "Ingwer", amount: "2cm"}],
    instructions: [{step: 1, description: "Spinat blanchieren", duration: 5}, {step: 2, description: "Pürieren und köcheln", duration: 25}],
    nutrition: {calories: 380, protein: 20, carbohydrates: 16, fat: 26, fiber: 8, sugar: 8, sodium: 720, servingSize: "1 Portion"},
    tags: ["dinner", "indian", "curry", "high-protein"],
    dietaryInfo: {isVegan: false, isGlutenFree: true, isDairyFree: false, isNutFree: true, spiceLevel: "medium"},
    time: {prep: 20, cook: 30, total: 50},
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
    console.log(`✅ Inserted ${result.insertedCount} Asian recipes`);
    
    const count = await collection.countDocuments();
    console.log(`📊 Total recipes: ${count}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
  }
}

addRecipes();
