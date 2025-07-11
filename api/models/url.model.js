// URL model dosyası
const { pool } = require('../config/db');
const { customAlphabet } = require('nanoid');

// Özel bir alfabe kullanarak kısa URL oluşturucu (URL-safe karakterler)
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);

// URL veritabanı tablolarını oluştur
const initializeDatabase = async () => {
  try {
    // urls tablosunu oluştur
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS urls (
        id INT AUTO_INCREMENT PRIMARY KEY,
        original_url TEXT NOT NULL,
        short_code VARCHAR(10) NOT NULL UNIQUE,
        click_count INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // url_logs tablosunu oluştur
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS url_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        url_id INT NOT NULL,
        ip_address VARCHAR(45),
        user_agent TEXT,
        referrer TEXT,
        accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (url_id) REFERENCES urls(id)
      )
    `);
    
    console.log('Veritabanı tabloları başarıyla oluşturuldu.');
  } catch (err) {
    console.error('Veritabanı tablo oluşturma hatası:', err);
  }
};

// Kısa URL oluşturma
const createShortUrl = async (originalUrl) => {
  try {
    // Aynı URL daha önce eklenmiş mi kontrol et
    const [checkRows] = await pool.execute(
      'SELECT * FROM urls WHERE original_url = ?',
      [originalUrl]
    );
    
    // Eğer URL zaten varsa, var olan kısa kodu döndür
    if (checkRows.length > 0) {
      return checkRows[0];
    }
    
    // Yoksa yeni bir kısa kod oluştur
    const shortCode = nanoid();
    
    // Veritabanına ekle
    const [result] = await pool.execute(
      'INSERT INTO urls (original_url, short_code) VALUES (?, ?)',
      [originalUrl, shortCode]
    );
    
    // Eklenen kaydı getir
    const [newRows] = await pool.execute(
      'SELECT * FROM urls WHERE id = ?',
      [result.insertId]
    );
    
    return newRows[0];
  } catch (err) {
    console.error('URL oluşturma hatası:', err);
    throw err;
  }
};

// Kısa koddan orijinal URL'yi bulma
const getUrlByShortCode = async (shortCode) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM urls WHERE short_code = ?',
      [shortCode]
    );
    
    if (rows.length === 0) {
      return null;
    }
    
    return rows[0];
  } catch (err) {
    console.error('URL bulma hatası:', err);
    throw err;
  }
};

// URL tıklama sayısını artırma
const incrementClickCount = async (shortCode) => {
  try {
    // Tıklama sayısını artır (shortCode ile)
    await pool.execute(
      'UPDATE urls SET click_count = click_count + 1 WHERE short_code = ?',
      [shortCode]
    );
    
    return true;
  } catch (err) {
    console.error('Tıklama artırma hatası:', err);
    throw err;
  }
};

// Tüm URL'leri getirme (admin paneli için)
const getAllUrls = async () => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM urls ORDER BY created_at DESC'
    );
    
    return rows;
  } catch (err) {
    console.error('Tüm URL\'leri getirme hatası:', err);
    throw err;
  }
};

// URL detaylarını getirme (istatistikler için)
const getUrlStats = async (urlId) => {
  try {
    // URL detaylarını getir
    const [urlRows] = await pool.execute(
      'SELECT * FROM urls WHERE id = ?',
      [urlId]
    );
    
    if (urlRows.length === 0) {
      return null;
    }
    
    // URL loglarını getir
    const [logRows] = await pool.execute(
      'SELECT * FROM url_logs WHERE url_id = ? ORDER BY accessed_at DESC LIMIT 100',
      [urlId]
    );
    
    return {
      url: urlRows[0],
      logs: logRows
    };
  } catch (err) {
    console.error('URL istatistiklerini getirme hatası:', err);
    throw err;
  }
};

module.exports = {
  initializeDatabase,
  createShortUrl,
  getUrlByShortCode,
  incrementClickCount,
  getAllUrls,
  getUrlStats,
  // Yeni API route'lar için ek fonksiyonlar
  create: async ({ originalUrl, shortCode }) => {
    try {
      const [result] = await pool.execute(
        'INSERT INTO urls (original_url, short_code) VALUES (?, ?)',
        [originalUrl, shortCode]
      );
      
      return {
        id: result.insertId,
        originalUrl,
        shortCode
      };
    } catch (err) {
      console.error('URL oluşturma hatası:', err);
      throw err;
    }
  },
  findByOriginalUrl: async (originalUrl) => {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM urls WHERE original_url = ?',
        [originalUrl]
      );
      
      return rows.length > 0 ? rows[0] : null;
    } catch (err) {
      console.error('URL bulma hatası:', err);
      throw err;
    }
  },
  findByShortCode: async (shortCode) => {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM urls WHERE short_code = ?',
        [shortCode]
      );
      
      return rows.length > 0 ? rows[0] : null;
    } catch (err) {
      console.error('URL bulma hatası:', err);
      throw err;
    }
  },
  findAll: async () => {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM urls ORDER BY created_at DESC'
      );
      
      return rows;
    } catch (err) {
      console.error('Tüm URL\'leri getirme hatası:', err);
      throw err;
    }
  }
};
