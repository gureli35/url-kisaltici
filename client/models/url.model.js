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

// Yeni URL oluşturma
const create = async ({ originalUrl, shortCode }) => {
  try {
    // Veritabanına ekle
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
};

// Orijinal URL'e göre arama
const findByOriginalUrl = async (originalUrl) => {
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
};

// Kısa koddan URL bulma
const findByShortCode = async (shortCode) => {
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
};

// Tüm URL'leri getirme
const findAll = async () => {
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

// Tıklama sayısını artırma
const incrementClickCount = async (shortCode) => {
  try {
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

module.exports = {
  initializeDatabase,
  create,
  findByOriginalUrl,
  findByShortCode,
  findAll,
  incrementClickCount
};
