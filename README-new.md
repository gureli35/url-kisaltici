# 🔗 URL Kısaltıcı

Modern ve kullanıcı dostu bir URL kısaltma uygulaması. Uzun URL'lerinizi saniyeler içinde kısaltın, tıklanma istatistiklerini takip edin.

![URL Shortener](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Express.js](https://img.shields.io/badge/Express.js-4.x-green?style=for-the-badge&logo=express)
![MySQL](https://img.shields.io/badge/MySQL-8.x-blue?style=for-the-badge&logo=mysql)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)

## ✨ Özellikler

- 🚀 **Anında Kısaltma** - URL'lerinizi saniyeler içinde kısaltın
- 📊 **Detaylı İstatistikler** - Tıklanma sayılarını ve performansı takip edin
- 🎯 **Tıklanma Takibi** - Her URL'nin detaylı analitikleri
- 📱 **Responsive Tasarım** - Mobile ve desktop'ta mükemmel görünüm
- 🌙 **Dark Mode** - Göz dostu karanlık tema desteği
- 📋 **Kolay Kopyalama** - Tek tıkla URL kopyalama
- ⚡ **Hızlı ve Güvenilir** - Modern teknolojilerle geliştirilmiş

## 🛠️ Teknolojiler

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL** - Veritabanı
- **nanoid** - Unique ID generation
- **CORS** - Cross-origin resource sharing
- **Helmet** - Güvenlik middleware

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn UI** - Modern UI components
- **Lucide React** - Icons
- **Axios** - HTTP client
- **Sonner** - Toast notifications

## 🚀 Kurulum

### Gereksinimler
- Node.js (v18 veya üzeri)
- MySQL (v8 veya üzeri)
- npm veya yarn

### 1. Repository'yi klonlayın
```bash
git clone https://github.com/[username]/url-shortener.git
cd url-shortener
```

### 2. Backend kurulumu
```bash
cd api
npm install
```

### 3. Frontend kurulumu
```bash
cd client
npm install
```

### 4. MySQL veritabanı kurulumu
```bash
# MySQL'i başlatın (macOS)
brew services start mysql

# MySQL'e bağlanın
mysql -u root -p

# Veritabanını oluşturun
CREATE DATABASE url_shortener;
```

### 5. Environment değişkenlerini ayarlayın

**API (.env)**
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_DATABASE=url_shortener
APP_URL=http://localhost:3000
CLIENT_URL=http://localhost:3001
```

**Client (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 🏃‍♂️ Çalıştırma

### Backend'i başlatın
```bash
cd api
npm start
```

### Frontend'i başlatın
```bash
cd client
npm run dev
```

Uygulama şu adreslerde çalışacak:
- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000

## 📝 API Endpoints

### URL Kısaltma
```http
POST /api/urls/shorten
Content-Type: application/json

{
  "originalUrl": "https://example.com/very-long-url"
}
```

**Response:**
```json
{
  "originalUrl": "https://example.com/very-long-url",
  "shortUrl": "http://localhost:3000/abc123",
  "shortCode": "abc123",
  "clickCount": 0,
  "createdAt": "2025-07-12T10:30:00.000Z"
}
```

### Tüm URL'leri Getir
```http
GET /api/urls/all
```

### URL Yönlendirme
```http
GET /:shortCode
```

## 🎨 Ekran Görüntüleri

### Ana Sayfa
- Modern ve temiz arayüz
- Gradient renkler ve animasyonlar
- Responsive tasarım

### İstatistikler
- Detaylı analitik kartları
- Tablo görünümü
- Real-time veriler

## 📊 Veritabanı Yapısı

### `urls` Tablosu
```sql
CREATE TABLE urls (
  id INT AUTO_INCREMENT PRIMARY KEY,
  original_url TEXT NOT NULL,
  short_code VARCHAR(6) UNIQUE NOT NULL,
  click_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### `url_logs` Tablosu
```sql
CREATE TABLE url_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  url_id INT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  referrer TEXT,
  accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (url_id) REFERENCES urls(id)
);
```

## 🔧 Geliştirme

### Kod Stili
- ESLint ve Prettier kullanılmaktadır
- TypeScript strict mode aktif
- Functional components tercih edilir

### Testing
```bash
# Frontend testleri
cd client
npm test

# Backend testleri
cd api
npm test
```

## 🤝 Katkıda Bulunma

1. Repository'yi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📈 Roadmap

- [ ] Kullanıcı kimlik doğrulama
- [ ] Özel kısa kodlar
- [ ] QR kod oluşturma
- [ ] Bulk URL kısaltma
- [ ] Analytics dashboard
- [ ] Rate limiting
- [ ] URL expiration

## 🐛 Bilinen Sorunlar

Herhangi bir sorun yaşarsanız [Issues](https://github.com/[username]/url-shortener/issues) bölümünden bildirin.

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim

Herhangi bir sorunuz varsa lütfen issue oluşturun veya bana ulaşın.

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
