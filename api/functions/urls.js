const urlModel = require('../models/url.model');
const { nanoid } = require('nanoid');
const validator = require('validator');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Initialize database
    await urlModel.initializeDatabase();

    if (req.method === 'POST') {
      const { originalUrl } = req.body;

      if (!originalUrl) {
        return res.status(400).json({ 
          success: false, 
          error: 'Original URL is required' 
        });
      }

      if (!validator.isURL(originalUrl)) {
        return res.status(400).json({ 
          success: false, 
          error: 'Please provide a valid URL' 
        });
      }

      // Check if URL already exists
      const existingUrl = await urlModel.findByOriginalUrl(originalUrl);
      if (existingUrl) {
        return res.status(200).json({
          success: true,
          data: {
            id: existingUrl.id,
            originalUrl: existingUrl.original_url,
            shortCode: existingUrl.short_code,
            shortUrl: `${req.headers.host || 'localhost:3000'}/${existingUrl.short_code}`,
            clickCount: existingUrl.click_count,
            createdAt: existingUrl.created_at
          }
        });
      }

      // Generate short code
      const shortCode = nanoid(8);
      
      // Create new URL
      const urlData = await urlModel.create({
        originalUrl,
        shortCode
      });

      res.status(201).json({
        success: true,
        data: {
          id: urlData.id,
          originalUrl: urlData.originalUrl,
          shortCode: urlData.shortCode,
          shortUrl: `${req.headers.host || 'localhost:3000'}/${urlData.shortCode}`,
          clickCount: 0,
          createdAt: new Date().toISOString()
        }
      });

    } else if (req.method === 'GET') {
      const urls = await urlModel.findAll();
      const baseUrl = req.headers.host || 'localhost:3000';
      
      const formattedUrls = urls.map(url => ({
        id: url.id,
        originalUrl: url.original_url,
        shortCode: url.short_code,
        shortUrl: `${baseUrl}/${url.short_code}`,
        clickCount: url.click_count,
        createdAt: url.created_at
      }));

      res.status(200).json({
        success: true,
        data: formattedUrls
      });

    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};
