# URL Kısaltıcı Uygulaması

Bu proje, Node.js ve Express.js kullanılarak geliştirilmiş işlevsel bir URL Kısaltıcı Uygulamasıdır.

## Proje Açıklaması

URL Shortener, uzun web adreslerini daha kısa ve kolay paylaşılabilir hale getiren bir web uygulamasıdır. Kullanıcılar, uygulama üzerinden bir URL girdiklerinde, sistem bu URL için benzersiz ve kısa bir bağlantı oluşturur. Kısa bağlantıya tıklanıldığında, kullanıcı otomatik olarak orijinal uzun URL'ye yönlendirilir.

## Amaç

- Paylaşımı kolaylaştırmak
- Estetik görünüm sağlamak
- Tıklanma verisi tutarak istatistik sağlamak

## Uygulama Özellikleri

⚡ Uzun URL'yi kısa bağlantıya dönüştürme  
⚡ Kısa link üzerinden orijinal URL'ye yönlendirme  
⚡ MySQL veritabanı üzerinden veri saklama  
⚡ Tıklanma sayısını artırma ve loglama  
⚡ RESTful API ile modern backend mimarisi  
⚡ Shadcn UI ile modern, responsive frontend arayüz  
⚡ İstatistik görüntüleme ve yönetim paneli  

## Teknolojiler

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL** - Veritabanı
- **nanoid** - Kısa ID üretimi
- **CORS** - Cross-origin resource sharing
- **Helmet** - Güvenlik middleware

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **Axios** - HTTP client
- **Sonner** - Toast notifications

## Localhost Kurulumu

### Gereksinimler
- Node.js (v18 veya üzeri)
- MySQL (v8 veya üzeri)
- npm veya yarn

### 1. Projeyi klonlayın
```bash
git clone https://github.com/gureli35/url-kisaltici.git
cd url-kisaltici
```

### 2. MySQL Veritabanını Ayarlayın
```bash
# MySQL'i başlatın
brew services start mysql

# MySQL'e bağlanın
mysql -u root -p

# Veritabanı oluşturun
CREATE DATABASE url_shortener;
```

### 3. Backend'i kurun ve çalıştırın
```bash
cd api
npm install
cp .env.example .env
# .env dosyasını MySQL bilgilerinize göre düzenleyin
npm start
```

### 4. Frontend'i kurun ve çalıştırın
```bash
cd ../client
npm install
npm run dev
```

### 5. Uygulamayı kullanın
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000

## Environment Variables

### Backend (api/.env)
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_DATABASE=url_shortener
DB_PORT=3306
APP_URL=http://localhost:3000
CLIENT_URL=http://localhost:3001
PORT=3000
```

### Frontend (client/.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
## API Endpoints

### URL Kısaltma
- **POST** `/api/urls/shorten`
  - Body: `{ "originalUrl": "https://example.com" }`
  - Response: URL bilgileri

### Tüm URL'leri Getirme
- **GET** `/api/urls/all`
  - Response: URL listesi

### Yönlendirme
- **GET** `/:shortCode`
  - Kısa koda ait orijinal URL'ye yönlendirme

## Kullanım

1. Tarayıcınızda `http://localhost:3001` adresine gidin
2. "URL Kısalt" sekmesinde uzun URL'nizi girin
3. "URL'yi Kısalt" butonuna tıklayın
4. Oluşturulan kısa URL'yi kopyalayın ve paylaşın
5. "İstatistikler" sekmesinden tüm URL'lerin performansını görüntüleyin

## Veritabanı Yapısı

### urls tablosu
- `id` - Primary key
- `original_url` - Orijinal uzun URL
- `short_code` - 6 karakterlik benzersiz kod
- `click_count` - Tıklanma sayısı
- `created_at` - Oluşturulma tarihi

### url_logs tablosu
- `id` - Primary key
- `url_id` - urls tablosuna referans
- `ip_address` - Ziyaretçi IP adresi
- `user_agent` - Tarayıcı bilgisi
- `referrer` - Yönlendiren sayfa
- `accessed_at` - Erişim tarihi

## Proje Yapısı

```
url-kisaltici/
├── api/                 # Backend Express.js uygulaması
│   ├── config/         # Veritabanı konfigürasyonu
│   ├── controllers/    # API controller'ları
│   ├── models/         # Veritabanı modelleri
│   ├── routes/         # API route'ları
│   └── utils/          # Yardımcı fonksiyonlar
└── client/             # Frontend Next.js uygulaması
    ├── app/            # Next.js app router
    ├── components/     # React bileşenleri
    └── lib/            # Yardımcı fonksiyonlar
```

## Katkıda Bulunma

1. Bu repo'yu fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'ınızı push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
- \`accessed_at\` - Erişim tarihi

## Deployment (Dağıtım)

Bu uygulama Vercel platformunda kolayca dağıtılabilir. Detaylı dağıtım talimatları için `DEPLOYMENT.md` dosyasına bakın.

### Hızlı Vercel Dağıtımı

1. **GitHub Repository'yi Fork/Clone edin**
2. **Vercel hesabınıza giriş yapın**: [vercel.com](https://vercel.com)
3. **"New Project" butonuna tıklayın**
4. **Bu repository'yi seçin**
5. **Environment Variables'ları ekleyin**:
   - `DB_HOST` - MySQL veritabanı host adresi
   - `DB_USER` - MySQL kullanıcı adı
   - `DB_PASSWORD` - MySQL şifresi
   - `DB_DATABASE` - Veritabanı adı
   - `NEXT_PUBLIC_API_URL` - API URL'i (otomatik oluşturulur)
6. **Deploy butonuna tıklayın**

### Veritabanı Seçenekleri
- **PlanetScale** - MySQL uyumlu serverless veritabanı
- **Railway** - MySQL veritabanı hosting
- **AWS RDS** - Ölçeklenebilir MySQL çözümü

### Production URL
Dağıtım tamamlandığında, uygulamanız şu şekilde erişilebilir olacak:
- **Frontend**: `https://your-app-name.vercel.app`
- **API**: `https://your-app-name.vercel.app/api`

## Özellikler

### ✅ Tamamlanan Özellikler
- [x] URL kısaltma
- [x] Yönlendirme sistemi
- [x] Tıklanma sayısı takibi
- [x] Modern UI tasarımı
- [x] İstatistik görüntüleme
- [x] Responsive tasarım
- [x] Form validasyonu
- [x] Error handling
- [x] Toast bildirimleri
- [x] Production deployment yapılandırması
- [x] Vercel uyumlu serverless API

### 🚀 Gelecek Özellikler
- [ ] Kullanıcı hesap sistemi
- [ ] Özel kısa kodlar
- [ ] QR kod oluşturma
- [ ] Coğrafi analitik
- [ ] Toplu URL kısaltma
- [ ] URL sona erme tarihi

## Katkıda Bulunma

1. Bu repository'yi fork edin
2. Feature branch'i oluşturun (\`git checkout -b feature/amazing-feature\`)
3. Değişikliklerinizi commit edin (\`git commit -m 'Add some amazing feature'\`)
4. Branch'inizi push edin (\`git push origin feature/amazing-feature\`)
5. Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## İletişim

Proje geliştiricisi: Furkan Güreli

---

**Not:** Bu uygulama eğitim amaçlı geliştirilmiştir. Üretim ortamında kullanmadan önce güvenlik önlemlerini gözden geçiriniz.
