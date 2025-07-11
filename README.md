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
- **validator** - URL doğrulama

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn UI** - Modern UI bileşenleri
- **Axios** - HTTP istekleri
- **React Hook Form + Zod** - Form yönetimi

## Kurulum

### Gereksinimler
- Node.js (v18 veya üzeri)
- MySQL (v8 veya üzeri)
- npm veya yarn

### Backend Kurulumu

1. API klasörüne gidin:
\`\`\`bash
cd api
\`\`\`

2. Gerekli paketleri kurun:
\`\`\`bash
npm install
\`\`\`

3. MySQL veritabanını oluşturun:
\`\`\`sql
CREATE DATABASE url_shortener;
\`\`\`

4. \`.env\` dosyasını düzenleyin:
\`\`\`env
# Server Config
PORT=3000

# Database Config
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_DATABASE=url_shortener

# App Config
APP_URL=http://localhost:3000
CLIENT_URL=http://localhost:3001
\`\`\`

5. API sunucusunu başlatın:
\`\`\`bash
npm run dev
\`\`\`

### Frontend Kurulumu

1. Client klasörüne gidin:
\`\`\`bash
cd client
\`\`\`

2. Gerekli paketleri kurun:
\`\`\`bash
npm install
\`\`\`

3. \`.env.local\` dosyasını oluşturun:
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
\`\`\`

4. Frontend sunucusunu başlatın:
\`\`\`bash
PORT=3001 npm run dev
\`\`\`

## API Endpoints

### URL Kısaltma
- **POST** \`/api/urls/shorten\`
  - Body: \`{ "originalUrl": "https://example.com" }\`
  - Response: \`{ "originalUrl", "shortUrl", "shortCode", "clickCount", "createdAt" }\`

### Tüm URL'leri Getirme
- **GET** \`/api/urls/all\`
  - Response: URL listesi

### URL İstatistikleri
- **GET** \`/api/urls/stats/:id\`
  - Response: URL detayları ve log kayıtları

### Yönlendirme
- **GET** \`/:shortCode\`
  - Kısa koda ait orijinal URL'ye yönlendirme

## Kullanım

1. Tarayıcınızda \`http://localhost:3001\` adresine gidin
2. "URL Kısalt" sekmesinde uzun URL'nizi girin
3. "URL'yi Kısalt" butonuna tıklayın
4. Oluşturulan kısa URL'yi kopyalayın ve paylaşın
5. "İstatistikler" sekmesinden tüm URL'lerin performansını görüntüleyin

## Veritabanı Yapısı

### urls tablosu
- \`id\` - Primary key
- \`original_url\` - Orijinal uzun URL
- \`short_code\` - 6 karakterlik benzersiz kod
- \`click_count\` - Tıklanma sayısı
- \`created_at\` - Oluşturulma tarihi

### url_logs tablosu
- \`id\` - Primary key
- \`url_id\` - urls tablosuna referans
- \`ip_address\` - Ziyaretçi IP adresi
- \`user_agent\` - Tarayıcı bilgisi
- \`referrer\` - Yönlendiren sayfa
- \`accessed_at\` - Erişim tarihi

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

Proje geliştiricisi: Zeynep Anılgan

---

**Not:** Bu uygulama eğitim amaçlı geliştirilmiştir. Üretim ortamında kullanmadan önce güvenlik önlemlerini gözden geçiriniz.
