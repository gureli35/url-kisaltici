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

// Çevre değişkenlerini yükle
dotenv.config();

// Express uygulamasını başlat
const app = express();

// Middleware'leri ayarla
app.use(helmet()); // Güvenlik başlıkları
app.use(morgan('dev')); // Loglama
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST'],
  credentials: true
})); // CORS ayarları
app.use(express.json()); // JSON body parser
app.use(express.urlencoded({ extended: true })); // URL encoded parser

// API rotalarını ayarla
app.use('/api/urls', urlRoutes);

// Kısa URL yönlendirme
app.get('/:shortCode', urlController.redirectToOriginalUrl);

// Ana sayfa
app.get('/api', (req, res) => {
  res.json({ 
    message: 'URL Kısaltıcı API',
    endpoints: {
      createShortUrl: 'POST /api/urls/shorten',
      getAllUrls: 'GET /api/urls/all',
      getUrlStats: 'GET /api/urls/stats/:id',
      redirect: 'GET /:shortCode'
    }
  });
});

// 404 hatası
app.use(notFoundHandler);

// Hata işleme middleware
app.use(errorHandler);

// Sunucuyu başlat
const startServer = async () => {
  try {
    // Veritabanı bağlantısını test et
    await testConnection();
    
    // Veritabanı tabloları oluştur
    await urlModel.initializeDatabase();
    
    // Sunucuyu başlat (sadece development modunda)
    if (process.env.NODE_ENV !== 'production') {
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
      });
    }
  } catch (err) {
    console.error('Sunucu başlatma hatası:', err);
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
};

// Development modunda sunucuyu başlat
if (process.env.NODE_ENV !== 'production') {
  startServer();
}

module.exports = app;
