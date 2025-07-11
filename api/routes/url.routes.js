// URL Yönlendirme Dosyası
const express = require('express');
const router = express.Router();
const urlController = require('../controllers/url.controller');

// Kısa URL oluşturma (orijinal endpoint)
router.post('/shorten', urlController.createShortUrl);

// Yeni API endpoint'leri (Next.js uyumlu)
router.post('/urls/shorten', urlController.createUrl);
router.get('/urls/all', urlController.getUrls);

// Tüm URL'leri getirme (admin paneli için)
router.get('/all', urlController.getAllUrls);

// URL istatistiklerini getirme
router.get('/stats/:id', urlController.getUrlStats);

module.exports = router;
