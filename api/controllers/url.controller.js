// URL Kontroller Dosyası
const urlModel = require('../models/url.model');
const validator = require('validator');

// URL doğrulama yardımcı fonksiyonu
const isValidUrl = (url) => {
  return validator.isURL(url, {
    protocols: ['http', 'https'],
    require_protocol: true,
    require_valid_protocol: true
  });
};

// Kısa URL oluşturma
const createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    
    // URL doğrulama
    if (!originalUrl) {
      return res.status(400).json({ error: 'URL gereklidir' });
    }
    
    if (!isValidUrl(originalUrl)) {
      return res.status(400).json({ error: 'Geçerli bir URL giriniz (http:// veya https:// ile başlamalı)' });
    }
    
    // URL oluştur
    const urlData = await urlModel.createShortUrl(originalUrl);
    
    // Yanıt oluştur
    const response = {
      originalUrl: urlData.original_url,
      shortUrl: `${process.env.APP_URL}/${urlData.short_code}`,
      shortCode: urlData.short_code,
      clickCount: urlData.click_count,
      createdAt: urlData.created_at
    };
    
    res.status(201).json(response);
  } catch (err) {
    console.error('URL oluşturma hatası:', err);
    res.status(500).json({ error: 'URL oluşturulurken bir hata oluştu' });
  }
};

// Kısa URL ile yönlendirme
const redirectToOriginalUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    
    // Kısa kodu doğrula
    if (!shortCode) {
      return res.status(400).json({ error: 'Geçersiz kısa kod' });
    }
    
    // URL'yi bul
    const urlData = await urlModel.findByShortCode(shortCode);
    
    if (!urlData) {
      return res.status(404).json({ error: 'URL bulunamadı' });
    }
    
    // Tıklama sayısını artır (shortCode ile)
    try {
      await urlModel.incrementClickCount(shortCode);
    } catch (err) {
      console.error('Tıklama sayısı artırma hatası:', err);
    }
    
    // Orijinal URL'ye yönlendir
    res.redirect(urlData.original_url);
  } catch (err) {
    console.error('Yönlendirme hatası:', err);
    res.status(500).json({ error: 'Yönlendirme sırasında bir hata oluştu' });
  }
};

// Tüm URL'leri getir (admin için)
const getAllUrls = async (req, res) => {
  try {
    const urls = await urlModel.getAllUrls();
    
    // URL'leri formatla
    const formattedUrls = urls.map(url => ({
      id: url.id,
      originalUrl: url.original_url,
      shortUrl: `${process.env.APP_URL}/${url.short_code}`,
      shortCode: url.short_code,
      clickCount: url.click_count,
      createdAt: url.created_at
    }));
    
    res.json(formattedUrls);
  } catch (err) {
    console.error('URL listesi getirme hatası:', err);
    res.status(500).json({ error: 'URL\'ler alınırken bir hata oluştu' });
  }
};

// URL istatistiklerini getir
const getUrlStats = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Geçerli bir URL ID\'si gereklidir' });
    }
    
    const stats = await urlModel.getUrlStats(parseInt(id));
    
    if (!stats) {
      return res.status(404).json({ error: 'URL bulunamadı' });
    }
    
    // İstatistikleri formatla
    const formattedStats = {
      url: {
        id: stats.url.id,
        originalUrl: stats.url.original_url,
        shortUrl: `${process.env.APP_URL}/${stats.url.short_code}`,
        shortCode: stats.url.short_code,
        clickCount: stats.url.click_count,
        createdAt: stats.url.created_at
      },
      logs: stats.logs.map(log => ({
        id: log.id,
        ipAddress: log.ip_address,
        userAgent: log.user_agent,
        referrer: log.referrer,
        accessedAt: log.accessed_at
      }))
    };
    
    res.json(formattedStats);
  } catch (err) {
    console.error('URL istatistikleri getirme hatası:', err);
    res.status(500).json({ error: 'İstatistikler alınırken bir hata oluştu' });
  }
};

// Yeni API route'lar için ek fonksiyonlar
const createUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    
    // URL doğrulama
    if (!originalUrl) {
      return res.status(400).json({ 
        success: false, 
        error: 'Original URL is required' 
      });
    }
    
    if (!isValidUrl(originalUrl)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide a valid URL' 
      });
    }

    // Mevcut URL'yi kontrol et
    const existingUrl = await urlModel.findByOriginalUrl(originalUrl);
    if (existingUrl) {
      const host = req.get('host') || 'localhost:3000';
      return res.status(200).json({
        success: true,
        data: {
          id: existingUrl.id,
          originalUrl: existingUrl.original_url,
          shortCode: existingUrl.short_code,
          shortUrl: `http://${host}/${existingUrl.short_code}`,
          clickCount: existingUrl.click_count,
          createdAt: existingUrl.created_at
        }
      });
    }

    // Yeni kısa kod oluştur
    const { nanoid } = require('nanoid');
    const shortCode = nanoid(8);
    
    // Yeni URL oluştur
    const urlData = await urlModel.create({
      originalUrl,
      shortCode
    });

    const host = req.get('host') || 'localhost:3000';
    
    res.status(201).json({
      success: true,
      data: {
        id: urlData.id,
        originalUrl: urlData.originalUrl,
        shortCode: urlData.shortCode,
        shortUrl: `http://${host}/${urlData.shortCode}`,
        clickCount: 0,
        createdAt: new Date().toISOString()
      }
    });

  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

const getUrls = async (req, res) => {
  try {
    const urls = await urlModel.findAll();
    const host = req.get('host') || 'localhost:3000';
    
    const formattedUrls = urls.map(url => ({
      id: url.id,
      originalUrl: url.original_url,
      shortCode: url.short_code,
      shortUrl: `http://${host}/${url.short_code}`,
      clickCount: url.click_count,
      createdAt: url.created_at
    }));

    res.status(200).json({
      success: true,
      data: formattedUrls
    });

  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

module.exports = {
  createShortUrl,
  redirectToOriginalUrl,
  getAllUrls,
  getUrlStats,
  createUrl,
  getUrls
};
