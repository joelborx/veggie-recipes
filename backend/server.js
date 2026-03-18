/**
 * Veggie Recipes Backend Server
 * Express.js API with MongoDB/Mongoose
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth-routes');
const recipeRoutes = require('./routes/recipes');
const searchRoutes = require('./routes/search-routes');
const ratingsRoutes = require('./routes/ratings-routes');
const swipeRoutes = require('./routes/swipes');
const mealRoutes = require('./routes/meals');
const likedRoutes = require('./routes/liked-routes');
const profileRoutes = require('./routes/profile-routes');
const shoppingRoutes = require('./routes/shopping-routes');
const { recipeSharingRouter, publicSharingRouter } = require('./routes/sharing-routes');
const adminRoutes = require('./routes/admin-routes');
const mealplanRoutes = require('./routes/mealplan-routes');
const nutritionRoutes = require('./routes/nutrition-routes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: '*',
  credentials: true
}));

// Logging middleware
app.use(morgan('dev'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'Veggie Recipes API is running!' 
  });
});

// API Routes - ORDER MATTERS: More specific routes first!
app.use('/api/auth', authRoutes);
app.use('/api/recipes', searchRoutes); // Search FIRST (before /:id)
app.use('/api/recipes', ratingsRoutes); // Ratings SECOND
app.use('/api/recipes', recipeRoutes); // Generic recipe routes LAST (contains /:id)
app.use('/api/swipes', swipeRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/liked', likedRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/shopping', shoppingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/mealplan', mealplanRoutes);
app.use('/api/nutrition', nutritionRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Connect to MongoDB and start server
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/veggie_recipes', {
      // These options are no longer needed in Mongoose 6+, but kept for clarity
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Start server after DB connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

// Connect to database and start server
connectDB();

module.exports = app;
