// API yardımcı araçları
const isProduction = process.env.NODE_ENV === 'production';

// Hata işleyici
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  const statusCode = err.statusCode || 500;
  const errorMessage = isProduction ? 'Sunucu hatası oluştu' : err.message;
  
  res.status(statusCode).json({
    error: errorMessage,
    ...(isProduction ? {} : { stack: err.stack })
  });
};

// 404 İşleyici
const notFoundHandler = (req, res) => {
  res.status(404).json({ error: 'Sayfa bulunamadı' });
};

module.exports = {
  errorHandler,
  notFoundHandler
};
