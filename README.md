# API Bot - Vercel Cron Job

Bu proje, Vercel'de çalışan bir API bot'udur. Dakikada bir kez belirtilen API endpoint'ini otomatik olarak tetikler.

## Özellikler

- ✅ Dakikada bir otomatik tetikleme (Vercel Cron Jobs)
- ✅ Retry mekanizması (3 deneme)
- ✅ Kapsamlı hata yönetimi
- ✅ Detaylı loglama
- ✅ Timeout koruması (30 saniye)

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. (Opsiyonel) API URL'ini environment variable olarak ayarlayın:
```bash
# .env dosyası oluşturun
API_URL=https://assetapi.onrender.com/api/cache/status
```

## Vercel'e Deploy

1. Projeyi GitHub'a push edin
2. Vercel dashboard'a gidin
3. Yeni proje oluşturun ve GitHub repo'nuzu bağlayın
4. Vercel otomatik olarak `vercel.json` dosyasındaki cron job'ı algılayacak

## Cron Job Yapılandırması

Cron job `vercel.json` dosyasında tanımlanmıştır:
- **Path**: `/api/cache-status`
- **Schedule**: `* * * * *` (her dakika)

## API Endpoint

Varsayılan olarak şu endpoint tetiklenir:
- `https://assetapi.onrender.com/api/cache/status`

Eğer endpoint farklıysa, `API_URL` environment variable'ını ayarlayabilirsiniz.

## Hata Yönetimi

- 3 kez otomatik retry
- Her retry arasında artan bekleme süresi (1s, 2s, 3s)
- Tüm hatalar loglanır
- Cron job hata durumunda bile devam eder

## Loglama

Tüm istekler ve hatalar Vercel'in log sisteminde görüntülenebilir:
- Başarılı istekler: `[SUCCESS]` prefix'i ile
- Hatalar: `[ERROR]` prefix'i ile

## Sorun Giderme

Eğer endpoint çalışmıyorsa:

1. Vercel dashboard'dan logları kontrol edin
2. API URL'inin doğru olduğundan emin olun
3. `API_URL` environment variable'ını güncelleyin
4. Endpoint'in public olduğundan ve authentication gerektirmediğinden emin olun

## Lisans

MIT
