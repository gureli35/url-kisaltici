const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const { testConnection } = require('./config/db');
const urlModel = require('./models/url.model');
const urlRoutes = require('./routes/url.routes');
const urlController = require('./controllers/url.controller');
const { errorHandler, notFoundHandler } = require('./utils/errorHandlers');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Initialize database on startup
let dbInitialized = false;
const initializeDatabase = async () => {
  if (!dbInitialized) {
    try {
      await testConnection();
      await urlModel.initializeDatabase();
      dbInitialized = true;
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Database initialization failed:', error);
    }
  }
};

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database before handling requests
app.use(async (req, res, next) => {
  await initializeDatabase();
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/urls', urlRoutes);

// Short URL redirect
app.get('/:shortCode', urlController.redirectToOriginalUrl);

// API info endpoint
app.get('/api', (req, res) => {
  res.json({ 
    message: 'URL Kısaltıcı API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      createShortUrl: 'POST /api/urls/shorten',
      getAllUrls: 'GET /api/urls/all',
      redirect: 'GET /:shortCode'
    }
  });
});
// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
