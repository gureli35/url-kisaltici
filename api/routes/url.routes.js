// URL Yönlendirme Dosyası
const express = require('express');
const router = express.Router();
const urlController = require('../controllers/url.controller');

// Kısa URL oluşturma
router.post('/shorten', urlController.createShortUrl);

// Tüm URL'leri getirme (admin paneli için)
router.get('/all', urlController.getAllUrls);

// URL istatistiklerini getirme
router.get('/stats/:id', urlController.getUrlStats);

module.exports = router;
