# 🔗 URL Kısaltıcı Uygulaması

Yerel geliştirme ortamı için tasarlanmış, tam özellikli URL kısaltma uygulaması. Modern web teknolojileri kullanılarak geliştirilmiş, MySQL veritabanı destekli güçlü bir çözüm.

## ✨ Ana Özellikler

- ⚡ **Anlık URL Kısaltma** - Uzun bağlantıları saniyeler içinde kısa kodlara dönüştürün
- 📊 **Detaylı Analitik** - Gerçek zamanlı tıklanma istatistikleri ve trafik analizi
- 🎨 **Modern Arayüz** - Shadcn UI bileşenleri ile profesyonel tasarım
- 🔐 **Güvenlik Öncelikli** - CORS, Helmet ve kapsamlı validasyon
- 📱 **Her Cihaza Uygun** - Mobil-first responsive tasarım
- 💾 **Yerel Veritabanı** - MySQL ile güvenilir veri saklama
- 🔄 **API Desteği** - RESTful API ile genişletilebilir mimari

## 🏗️ Teknik Mimari

Bu uygulama, **yerel geliştirme için optimize edilmiş** full-stack bir web uygulamasıdır.

### 🔧 Backend Stack
- **Node.js** + **Express.js** - Hızlı ve ölçeklenebilir API
- **MySQL 8.0** - İlişkisel veritabanı yönetimi
- **Connection Pooling** - Performans optimizasyonu
- **nanoid** - Kripto-güvenli kısa ID üretimi
- **Helmet** - HTTP güvenlik başlıkları
- **CORS** - Cross-Origin Resource Sharing
- **Morgan** - HTTP request logger

### 🎨 Frontend Stack
- **Next.js 15** - React-based modern framework
- **TypeScript** - Type-safe geliştirme
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Kompozisyon tabanlı UI bileşenleri
- **React Hook Form** + **Zod** - Form yönetimi ve validasyon
- **Sonner** - Elegant toast bildirimleri
- **Lucide React** - Profesyonel SVG icon seti

## ⚙️ Sistem Gereksinimleri

Bu uygulama **yerel geliştirme ortamı** için tasarlanmıştır ve aşağıdaki gereksinimleri karşılamanız gerekmektedir:

- **Node.js** v18.0+ (LTS önerilen)
- **MySQL** v8.0+ 
- **npm** v9+ veya **yarn** v1.22+
- **Git** (klonlama için)
- **Modern tarayıcı** (Chrome, Firefox, Safari, Edge)

## 🚀 Kurulum ve Çalıştırma

### 1️⃣ Projeyi İndirin
```bash
git clone https://github.com/gureli35/url-kisaltici.git
cd url-kisaltici
```

### 2️⃣ MySQL Veritabanı Kurulumu

**macOS kullanıcıları (Homebrew):**
```bash
# MySQL'i kurun ve başlatın
brew install mysql
brew services start mysql

# Root kullanıcısı ile bağlanın
mysql -u root -p

# Uygulama veritabanını oluşturun
CREATE DATABASE url_shortener CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
SHOW DATABASES;
EXIT;
```

**Windows kullanıcıları:**
1. [MySQL Community Server](https://dev.mysql.com/downloads/mysql/) indirin
2. MySQL Installer ile kurulumu tamamlayın
3. MySQL Workbench veya Command Line Client kullanarak `url_shortener` veritabanını oluşturun

**Linux kullanıcıları (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo mysql_secure_installation
mysql -u root -p -e "CREATE DATABASE url_shortener;"
```

### 3️⃣ Backend API Kurulumu

```bash
# API klasörüne gidin
cd api

# Bağımlılıkları kurun
npm install

# Environment dosyasını oluşturun
cp .env.example .env
```

**api/.env** dosyasını MySQL bilgilerinizle güncelleyin:
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration  
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_DATABASE=url_shortener

# Application Configuration
APP_URL=http://localhost:3000
CLIENT_URL=http://localhost:3001
```

```bash
# API sunucusunu başlatın (development mode)
npm run dev

# Veya production mode için
npm start
```

**✅ Başarılı kurulum mesajları:**
```
✓ MySQL Connection Pool created successfully
✓ Database tables created/verified successfully  
✓ Server running on http://localhost:3000
✓ Health check available at http://localhost:3000/api/health
```

### 4️⃣ Frontend Uygulaması Kurulumu

**Yeni terminal penceresi açın:**
```bash
# Frontend dizinine geçin
cd client

# Dependencies kurulumu
npm install

# Environment dosyasını hazırlayın
cp .env.local.example .env.local
```

**client/.env.local** dosyasını kontrol edin:
```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Next.js Configuration
NEXT_PUBLIC_APP_NAME="URL Kısaltıcı"
NEXT_PUBLIC_APP_VERSION="1.0.0"
```

```bash
# Development server'ı başlatın
npm run dev

# Production build için
npm run build && npm start
```

**✅ Başarılı başlatma mesajları:**
```
✓ Ready in 2.1s
✓ Local: http://localhost:3001
✓ Network: http://192.168.1.xxx:3001
```

### 5️⃣ Uygulamayı Test Edin! 🎉

Tarayıcınızda aşağıdaki adresleri ziyaret edin:

| Service | URL | Açıklama |
|---------|-----|----------|
| 🌐 **Ana Uygulama** | http://localhost:3001 | React/Next.js frontend |
| 🔌 **API Endpoint** | http://localhost:3000/api | Backend REST API |
| ❤️ **Health Check** | http://localhost:3000/api/health | Sistem durumu |
| 📋 **API Docs** | http://localhost:3000/api/urls/all | Tüm URL listesi |

**🔍 Hızlı Test:**
```bash
# API'nin çalışıp çalışmadığını test edin
curl http://localhost:3000/api/health

# URL kısaltma testi
curl -X POST http://localhost:3000/api/urls/shorten \
  -H "Content-Type: application/json" \
  -d '{"originalUrl": "https://github.com/gureli35/url-kisaltici"}'
```

## 🔗 API Referansı

### 🟢 URL Kısaltma Endpoint'i
- **POST** `/api/urls/shorten`
  - **Body:** `{ "originalUrl": "https://example.com" }`
  - **Response:** Kısaltılmış URL bilgileri ve metadata
  - **Status Codes:** 200 (başarılı), 400 (geçersiz URL), 500 (server hatası)

### 📊 URL Listesi Endpoint'i
- **GET** `/api/urls/all`
  - **Response:** Tüm kısaltılmış URL'lerin listesi ve istatistikleri
  - **Status Codes:** 200 (başarılı), 500 (server hatası)

### 🔄 URL Yönlendirme Endpoint'i
- **GET** `/:shortCode`
  - **Parametre:** 6 karakterlik kısa kod (örn: `abc123`)
  - **Response:** HTTP 302 redirect orijinal URL'ye
  - **Status Codes:** 302 (redirect), 404 (bulunamadı), 500 (server hatası)

### ❤️ Sistem Durumu Endpoint'i
- **GET** `/api/health`
  - **Response:** API ve veritabanı durumu bilgileri
  - **Status Codes:** 200 (sistem sağlıklı), 500 (sistem hatası)

## 🎯 Kullanım Senaryoları

### 📱 Temel Kullanım
1. **Ana Sayfa:** `http://localhost:3001` adresini ziyaret edin
2. **URL Girişi:** "URL Kısalt" sekmesinde uzun URL'nizi yapıştırın
3. **Kısaltma:** "URL'yi Kısalt" butonuna tıklayın
4. **Kopyalama:** Oluşturulan kısa URL'yi tek tıkla kopyalayın
5. **İstatistikler:** "İstatistikler" sekmesinden performans verilerini inceleyin

### 🔧 API Kullanımı
```bash
# Yeni URL kısaltma
curl -X POST http://localhost:3000/api/urls/shorten \
  -H "Content-Type: application/json" \
  -d '{"originalUrl": "https://example.com/very/long/url"}'

# Tüm URL'leri listeleme
curl http://localhost:3000/api/urls/all

# Sistem durumu kontrolü
curl http://localhost:3000/api/health
```

### 📊 İstatistik Takibi
- **Gerçek zamanlı:** Her tıklamada anlık güncelleme
- **Detaylı log:** IP adresi, tarayıcı bilgisi, referrer kaydı
- **Görsel arayüz:** Modern tablolar ve grafiklerle analiz

## 🗄️ Veritabanı Şeması

Bu uygulama iki ana tablo ile çalışmaktadır:

### 📋 `urls` Tablosu
| Sütun | Tür | Açıklama |
|-------|-----|----------|
| `id` | INT AUTO_INCREMENT | Birincil anahtar |
| `original_url` | TEXT | Orijinal uzun URL (max 2048 karakter) |
| `short_code` | VARCHAR(10) | 6 karakterlik benzersiz kısa kod |
| `click_count` | INT DEFAULT 0 | Toplam tıklanma sayısı |
| `created_at` | TIMESTAMP | Kayıt oluşturulma tarihi |

### 📊 `url_logs` Tablosu  
| Sütun | Tür | Açıklama |
|-------|-----|----------|
| `id` | INT AUTO_INCREMENT | Birincil anahtar |
| `url_id` | INT | urls tablosuna foreign key |
| `ip_address` | VARCHAR(45) | Ziyaretçi IP adresi (IPv4/IPv6) |
| `user_agent` | TEXT | Tarayıcı ve işletim sistemi bilgisi |
| `referrer` | TEXT | Yönlendiren sayfa URL'si |
| `accessed_at` | TIMESTAMP | Erişim tarihi ve saati |

**🔗 İlişkiler:**
- `url_logs.url_id` → `urls.id` (ONE-TO-MANY)
- Her URL'nin birden fazla log kaydı olabilir
- Log kayıtları cascade delete ile silinir

## 📁 Proje Mimarisi

```
url-kisaltici/
├── 📄 README.md                    # Proje dokümantasyonu
├── 📄 .gitignore                   # Git ignore kuralları
│
├── 🔧 api/                         # Backend Express.js API
│   ├── 📄 server.js               # Ana server dosyası
│   ├── 📄 package.json            # Backend dependencies
│   ├── 📄 .env.example            # Environment şablonu
│   │
│   ├── ⚙️ config/
│   │   └── 📄 db.js               # MySQL bağlantı yapılandırması
│   │
│   ├── 🎮 controllers/
│   │   └── 📄 url.controller.js   # API endpoint logic
│   │
│   ├── 📊 models/
│   │   └── 📄 url.model.js        # Veritabanı modelleri
│   │
│   ├── 🛤️ routes/
│   │   └── 📄 url.routes.js       # API route tanımları
│   │
│   └── 🔧 utils/
│       └── 📄 errorHandlers.js    # Hata yönetimi middleware
│
└── 🎨 client/                      # Frontend Next.js uygulaması
    ├── 📄 package.json            # Frontend dependencies
    ├── 📄 next.config.js          # Next.js yapılandırması
    ├── 📄 tailwind.config.js      # Tailwind CSS ayarları
    ├── 📄 tsconfig.json           # TypeScript ayarları
    ├── 📄 .env.local.example      # Frontend environment şablonu
    │
    ├── 📱 app/                     # Next.js App Router
    │   ├── 📄 layout.tsx          # Root layout component
    │   ├── 📄 page.tsx            # Ana sayfa component
    │   └── 🎨 globals.css         # Global CSS stilleri
    │
    ├── 🧩 components/
    │   ├── 🎨 ui/                 # Shadcn UI bileşenleri
    │   │   ├── 📄 button.tsx      # Button component
    │   │   ├── 📄 card.tsx        # Card component
    │   │   ├── 📄 form.tsx        # Form components
    │   │   ├── 📄 input.tsx       # Input component
    │   │   ├── 📄 tabs.tsx        # Tabs component
    │   │   └── 📄 ...             # Diğer UI bileşenleri
    │   │
    │   └── 🔗 url-shortener/      # Ana uygulama bileşenleri
    │       ├── 📄 index.tsx       # Ana URL shortener component
    │       ├── 📄 url-shortener-form.tsx  # URL kısaltma formu
    │       └── 📄 url-statistics.tsx      # İstatistik görüntüleme
    │
    └── 🔧 lib/
        └── 📄 utils.ts            # Yardımcı fonksiyonlar
```

### 🏗️ Mimari Prensipler
- **Separation of Concerns:** Frontend ve backend tamamen ayrı
- **RESTful API:** Standart HTTP methodları ve status kodları
- **Component-Based:** Yeniden kullanılabilir React bileşenleri
- **Type Safety:** TypeScript ile tip güvenliği
- **Database Abstraction:** Model katmanı ile veri soyutlaması

## ✅ Mevcut Özellikler

### 🔧 Backend Özellikleri
- [x] **RESTful API** - Express.js tabanlı modern API mimarisi
- [x] **MySQL Integration** - Connection pooling ile veritabanı yönetimi
- [x] **URL Validation** - Güvenli URL doğrulama ve sanitizasyon
- [x] **Automatic Redirect** - Kısa kodlardan orijinal URL'lere yönlendirme
- [x] **Click Tracking** - Detaylı tıklanma analizi ve logging
- [x] **Error Handling** - Kapsamlı hata yönetimi ve logging
- [x] **CORS Support** - Cross-origin request desteği
- [x] **Security Headers** - Helmet ile güvenlik başlıkları

### 🎨 Frontend Özellikleri  
- [x] **Modern UI/UX** - Shadcn UI ile profesyonel tasarım
- [x] **Responsive Design** - Tüm cihazlarda mükemmel görünüm
- [x] **Form Validation** - React Hook Form + Zod ile tip güvenli validasyon
- [x] **Real-time Updates** - Anlık bildirimler ve durum güncellemeleri
- [x] **Copy to Clipboard** - Tek tıkla URL kopyalama özelliği
- [x] **Statistics Dashboard** - Detaylı analitik ve performans görüntüleme
- [x] **Toast Notifications** - Kullanıcı dostu bildirim sistemi
- [x] **Loading States** - Skeleton komponenleri ile yükleme durumları

### 🔒 Güvenlik Özellikleri
- [x] **Input Sanitization** - XSS ve injection saldırılarına karşı koruma
- [x] **URL Validation** - Zararlı URL'lerin filtrelenmesi  
- [x] **Rate Limiting Ready** - API rate limiting altyapısı
- [x] **Environment Variables** - Güvenli konfigürasyon yönetimi

## 🚀 Gelişmiş Özellikler

### 🔧 Geliştirici Araçları
- **Hot Reload** - Geliştirme sırasında anlık değişiklik görüntüleme
- **TypeScript** - Tip güvenliği ve IntelliSense desteği
- **ESLint** - Kod kalitesi ve standart denetimi
- **Prettier** - Otomatik kod formatlaması (önerilen)
- **MySQL Workbench** - Grafik veritabanı yönetimi

### 📊 Performans Optimizasyonları
- **Connection Pooling** - Veritabanı bağlantı havuzu
- **React Memoization** - Gereksiz render'ları önleme
- **Lazy Loading** - İhtiyaç duyulduğunda bileşen yükleme
- **Image Optimization** - Next.js otomatik görsel optimizasyonu

### 🔒 Güvenlik Katmanları
```javascript
// Örnek güvenlik middleware'i
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
```

## 🔮 Gelecek Roadmap

### v2.0 - Kullanıcı Sistemi 👥
- [ ] **User Authentication** - JWT tabanlı oturum yönetimi
- [ ] **Personal Dashboard** - Kişisel URL'ler ve istatistikler
- [ ] **User Profiles** - Profil yönetimi ve tercihler
- [ ] **Private URLs** - Sadece kullanıcının görebileceği URL'ler

### v2.1 - Gelişmiş Özellikler 🎯
- [ ] **Custom Short Codes** - Kullanıcı tanımlı kısa kodlar
- [ ] **QR Code Generation** - Otomatik QR kod oluşturma
- [ ] **Bulk URL Shortening** - Toplu URL işleme
- [ ] **URL Expiration** - Zaman sınırlı URL'ler

### v2.2 - Analitik & İstatistik 📈
- [ ] **Geographic Analytics** - Ülke/şehir bazlı analiz
- [ ] **Device Analytics** - Cihaz türü istatistikleri
- [ ] **Referrer Tracking** - Kaynak site analizi
- [ ] **Time-based Charts** - Zaman serisi grafikleri

### v3.0 - Enterprise Features 🏢
- [ ] **API Rate Limiting** - Kullanım sınırları
- [ ] **Team Management** - Takım yönetimi
- [ ] **Custom Domains** - Özel domain desteği
- [ ] **Advanced Security** - 2FA, IP filtering

## 🛠️ Geliştirme Notları

### 🔧 Kod Standartları
```typescript
// TypeScript interface örneği
interface UrlData {
  id: number;
  originalUrl: string;
  shortCode: string;
  clickCount: number;
  createdAt: Date;
}

// API response type
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

### 📱 Component Yapısı
```jsx
// Modern React component örneği
const UrlShortener: FC = () => {
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [loading, setLoading] = useState(false);
  
  // API call hook
  const { data, error, mutate } = useSWR('/api/urls/all', fetcher);
  
  return (
    <div className="container mx-auto p-4">
      {/* Component content */}
    </div>
  );
};
```

### 🗃️ Database Best Practices
```sql
-- Index optimizasyonları
CREATE INDEX idx_short_code ON urls(short_code);
CREATE INDEX idx_created_at ON urls(created_at);
CREATE INDEX idx_url_logs_url_id ON url_logs(url_id);

-- Performans için view oluşturma
CREATE VIEW url_stats AS
SELECT 
  u.id,
  u.original_url,
  u.short_code,
  u.click_count,
  COUNT(ul.id) as log_count,
  MAX(ul.accessed_at) as last_accessed
FROM urls u
LEFT JOIN url_logs ul ON u.id = ul.url_id
GROUP BY u.id;
```

## 🤝 Katkıda Bulunma

Bu proje **açık kaynak** bir eğitim projesidir ve katkıları memnuniyetle karşılarız!

### 🚀 Katkı Süreci
1. **Fork** - Projeyi kendi hesabınıza fork edin
2. **Clone** - Fork'u lokal makinenize klonlayın
3. **Branch** - Özellik dalı oluşturun (`git checkout -b feature/yeni-ozellik`)
4. **Develop** - Değişikliklerinizi yapın ve test edin
5. **Commit** - Açıklayıcı commit mesajları yazın
6. **Push** - Dalınızı GitHub'a gönderin
7. **PR** - Pull Request oluşturun

### 📝 Commit Konvansiyonları
```bash
feat: yeni özellik ekleme
fix: hata düzeltme
docs: dokümantasyon güncellemesi
style: kod formatlaması
refactor: kod yeniden yapılandırma
test: test ekleme/güncelleme
chore: build/config değişiklikleri
```

### 🐛 Issue Raporlama
Hata bildirimi yaparken lütfen aşağıdaki bilgileri ekleyin:
- **İşletim Sistemi** ve versiyon
- **Node.js** ve **MySQL** versiyonları
- **Hata mesajları** ve console logları
- **Yeniden üretme adımları**

## 📞 Destek & İletişim

### 🆘 Yardım Almak
- **GitHub Issues** - Hata raporları ve özellik istekleri
- **GitHub Discussions** - Genel sorular ve tartışmalar
- **README.md** - Detaylı kurulum ve kullanım kılavuzu

### 📧 İletişim Bilgileri
- **GitHub:** [@gureli35](https://github.com/gureli35)
- **Proje Repo:** [url-kisaltici](https://github.com/gureli35/url-kisaltici)

## 📄 Lisans

Bu proje **MIT Lisansı** altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakınız.

```
MIT License

Copyright (c) 2025 Furkan Güreli

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software")...
```

## 🏆 Teşekkürler

Bu projenin geliştirilmesinde katkıda bulunan teknolojiler:

- **[Next.js](https://nextjs.org/)** - React framework
- **[Tailwind CSS](https://tailwindcss.com/)** - CSS framework  
- **[Shadcn/ui](https://ui.shadcn.com/)** - UI component library
- **[Express.js](https://expressjs.com/)** - Node.js web framework
- **[MySQL](https://www.mysql.com/)** - İlişkisel veritabanı
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

---

<div align="center">

### 🌟 **Projeyi beğendiyseniz yıldız vermeyi unutmayın!** 🌟

**Made with ❤️ by [Furkan Güreli](https://github.com/gureli35)**

*Bu uygulama yerel geliştirme ve eğitim amaçlı tasarlanmıştır.*

</div>
