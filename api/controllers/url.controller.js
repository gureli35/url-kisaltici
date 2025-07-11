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
    if (!shortCode || shortCode.length !== 6) {
      return res.status(400).json({ error: 'Geçersiz kısa kod' });
    }
    
    // URL'yi bul
    const urlData = await urlModel.getUrlByShortCode(shortCode);
    
    if (!urlData) {
      return res.status(404).json({ error: 'URL bulunamadı' });
    }
    
    // Log bilgilerini topla
    const logData = {
      ipAddress: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'],
      referrer: req.headers.referer || req.headers.referrer
    };
    
    // Tıklama sayısını artır (asenkron olarak yap, yanıtı bekletme)
    urlModel.incrementClickCount(urlData.id, logData)
      .catch(err => console.error('Tıklama sayısı artırma hatası:', err));
    
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

module.exports = {
  createShortUrl,
  redirectToOriginalUrl,
  getAllUrls,
  getUrlStats
};
