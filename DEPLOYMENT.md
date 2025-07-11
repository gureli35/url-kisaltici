# 🚀 URL Kısaltıcı - Deployment Rehberi

Bu rehber, URL Kısaltıcı uygulamasını farklı platformlarda nasıl deploy edeceğinizi gösterir.

## 📋 Gereksinimler

- Node.js 18+ 
- MySQL Veritabanı
- GitHub hesabı

## 🔧 Vercel ile Deployment (Önerilen)

### 1. Vercel Hesabı Oluşturun
1. [Vercel.com](https://vercel.com) adresine gidin
2. GitHub hesabınızla giriş yapın

### 2. Proje Import Edin
1. Vercel dashboard'da "New Project" tıklayın
2. GitHub repository'nizi seçin: `gureli35/url-kisaltici`
3. Import tıklayın

### 3. Environment Variables Ayarlayın
Vercel dashboard'da aşağıdaki environment variables'ları ekleyin:

#### Backend (API) Environment Variables:
```
NODE_ENV=production
PORT=3000
DB_HOST=your-mysql-host
DB_PORT=3306
DB_USER=your-mysql-username
DB_PASSWORD=your-mysql-password
DB_DATABASE=url_shortener
APP_URL=https://your-app-name.vercel.app
CLIENT_URL=https://your-app-name.vercel.app
```

#### Frontend Environment Variables:
```
NEXT_PUBLIC_API_URL=https://your-app-name.vercel.app/api
```

### 4. MySQL Veritabanı Seçenekleri

#### Seçenek A: PlanetScale (Önerilen - Ücretsiz)
1. [PlanetScale.com](https://planetscale.com) hesabı oluşturun
2. Yeni veritabanı oluşturun
3. Connection string'i alın
4. Vercel'de environment variables'ları güncelleyin

#### Seçenek B: Railway
1. [Railway.app](https://railway.app) hesabı oluşturun
2. MySQL servis ekleyin
3. Connection bilgilerini alın

#### Seçenek C: Heroku ClearDB
1. Heroku hesabı oluşturun
2. ClearDB MySQL addon ekleyin

### 5. Deploy
1. Environment variables'ları ayarladıktan sonra
2. Vercel otomatik olarak deploy edecek
3. Build işlemi tamamlandığında uygulamanız hazır!

## 🛠️ Manuel Kurulum

### Lokal Geliştirme

1. **Repository'yi klonlayın:**
   ```bash
   git clone https://github.com/gureli35/url-kisaltici.git
   cd url-kisaltici
   ```

2. **Backend Kurulumu:**
   ```bash
   cd api
   npm install
   cp .env.example .env
   # .env dosyasını düzenleyin
   npm start
   ```

3. **Frontend Kurulumu:**
   ```bash
   cd ../client
   npm install
   cp .env.local.example .env.local
   # .env.local dosyasını düzenleyin
   npm run dev
   ```

4. **MySQL Veritabanı:**
   - MySQL kurulumu yapın
   - `url_shortener` veritabanı oluşturun
   - Uygulama otomatik olarak tabloları oluşturacak

## 🌐 Netlify ile Frontend Deployment

Sadece frontend deploy etmek için:

1. [Netlify.com](https://netlify.com) hesabı oluşturun
2. GitHub repository'nizi bağlayın
3. Build command: `cd client && npm run build`
4. Publish directory: `client/out`
5. Environment variables ekleyin

## 📊 Monitoring ve Logs

### Vercel
- Vercel dashboard'da "Functions" sekmesinde API logs
- "Analytics" sekmesinde performance metrics

### Hata Ayıklama
- Browser console'da frontend hataları
- Vercel functions logs'ta backend hataları
- Network sekmesinde API çağrıları

## 🔒 Güvenlik

- Environment variables'ları asla commit etmeyin
- HTTPS kullanın
- Database credentials'ları güvenli tutun
- CORS ayarlarını production'a göre düzenleyin

## 📞 Destek

Sorun yaşarsanız:
1. GitHub Issues açın
2. Vercel community forumlarını kontrol edin
3. Discord/Slack topluluklarından yardım alın

## 🚀 Başarılı Deployment Sonrası

Deployment tamamlandıktan sonra:
- ✅ URL kısaltma özelliği test edin
- ✅ İstatistikler sayfasını kontrol edin  
- ✅ Mobil uyumluluğu test edin
- ✅ Veritabanı bağlantısını doğrulayın

**🎉 Tebrikler! URL Kısaltıcınız artık online!**
