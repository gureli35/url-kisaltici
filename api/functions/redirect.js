const urlModel = require('../models/url.model');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Initialize database
    await urlModel.initializeDatabase();

    const { shortCode } = req.query;

    if (!shortCode) {
      return res.status(400).json({ 
        success: false, 
        error: 'Short code is required' 
      });
    }

    const url = await urlModel.findByShortCode(shortCode);

    if (!url) {
      return res.status(404).json({ 
        success: false, 
        error: 'Short URL not found' 
      });
    }

    // Increment click count
    await urlModel.incrementClickCount(shortCode);

    // Redirect to original URL
    res.writeHead(302, { Location: url.original_url });
    res.end();

  } catch (error) {
    console.error('Redirect Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};
