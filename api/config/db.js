// Database connection configuration
const mysql = require('mysql2/promise');
require('dotenv').config();

const config = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Veritabanı bağlantı havuzu oluşturma
const pool = mysql.createPool(config);

// Bağlantıyı test et
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL veritabanına bağlantı başarılı!');
    connection.release();
    return pool;
  } catch (err) {
    console.error('Veritabanı bağlantı hatası:', err);
    process.exit(1);
  }
};

module.exports = {
  pool,
  testConnection
};
