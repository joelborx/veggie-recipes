const { MongoClient } = require('mongodb');

async function fixRecipes() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    const db = client.db('veggie_recipes');
    
    // Set isActive to true for all recipes
    const result = await db.collection('recipes').updateMany(
      {},
      { $set: { isActive: true } }
    );
    
    console.log(`✅ Updated ${result.modifiedCount} recipes`);
    
    // Verify
    const count = await db.collection('recipes').countDocuments({ isActive: true });
    console.log(`✅ Active recipes: ${count}`);
    
  } catch (e) {
    console.error('❌ Error:', e.message);
  } finally {
    await client.close();
  }
}

fixRecipes();
