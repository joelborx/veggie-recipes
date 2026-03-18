const { MongoClient } = require('mongodb');

async function checkDB() {
  const client = new MongoClient('mongodb://localhost:27017');
  try {
    await client.connect();
    const db = client.db('veggie_recipes');
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    const count = await db.collection('recipes').countDocuments();
    console.log('Recipe count:', count);
    
    const recipes = await db.collection('recipes').find({}).limit(2).toArray();
    console.log('Sample recipes:', recipes.map(r => r.title));
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await client.close();
  }
}

checkDB();
