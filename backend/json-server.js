const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS für alle Origins
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());

// Lade Rezepte aus JSON
const recipesPath = path.join(__dirname, 'data', 'recipes.json');
let recipes = [];

try {
  const data = fs.readFileSync(recipesPath, 'utf8');
  recipes = JSON.parse(data);
  console.log(`✅ Loaded ${recipes.length} recipes from JSON`);
} catch (error) {
  console.log('⚠️ Could not load recipes.json, using empty array');
  recipes = [];
}

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'JSON API is running!', recipes: recipes.length });
});

// Get all recipes
app.get('/api/recipes', (req, res) => {
  res.json({
    success: true,
    data: { recipes }
  });
});

// Get single recipe
app.get('/api/recipes/:id', (req, res) => {
  const recipe = recipes.find(r => r._id === req.params.id);
  if (!recipe) {
    return res.status(404).json({ success: false, message: 'Recipe not found' });
  }
  res.json({ success: true, data: recipe });
});

// Auth endpoints (Mock)
app.post('/api/auth/register', (req, res) => {
  res.json({ success: true, message: 'User registered', token: 'mock-token' });
});

app.post('/api/auth/login', (req, res) => {
  res.json({ success: true, message: 'Logged in', token: 'mock-token' });
});

// Swipe endpoints (Mock)
app.post('/api/swipes', (req, res) => {
  res.json({ success: true, message: 'Swipe recorded' });
});

app.listen(PORT, () => {
  console.log(`🚀 JSON API Server running on port ${PORT}`);
  console.log(`📊 Serving ${recipes.length} recipes`);
});
