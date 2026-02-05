# API Bot - GitHub Actions Cron Job

Bu proje, **GitHub Actions** kullanarak ücretsiz bir şekilde çalışan bir API bot'udur. Dakikada bir kez belirtilen API endpoint'ini otomatik olarak tetikler.

## Özellikler

- ✅ **Tamamen ücretsiz** (GitHub Actions ücretsiz tier)
- ✅ Dakikada bir otomatik tetikleme
- ✅ Retry mekanizması (3 deneme)
- ✅ Kapsamlı hata yönetimi
- ✅ Detaylı loglama
- ✅ Timeout koruması (30 saniye)
- ✅ Manuel tetikleme desteği

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. (Opsiyonel) API URL'ini GitHub Secrets olarak ayarlayın:
   - GitHub repo'nuzda **Settings** > **Secrets and variables** > **Actions**
   - Yeni secret ekleyin: `API_URL` = `https://assetapi.onrender.com/api/cache/status`

## GitHub Actions ile Çalıştırma

1. Projeyi GitHub'a push edin
2. GitHub Actions otomatik olarak çalışmaya başlayacak
3. **Actions** sekmesinden workflow'ları görüntüleyebilirsiniz

## Cron Job Yapılandırması

Cron job `.github/workflows/cron-job.yml` dosyasında tanımlanmıştır:
- **Schedule**: `* * * * *` (her dakika, UTC zamanı)
- **Manuel tetikleme**: GitHub Actions sekmesinden "Run workflow" butonuna tıklayarak

## API Endpoint

Varsayılan olarak şu endpoint tetiklenir:
- `https://assetapi.onrender.com/api/cache/status`

Eğer endpoint farklıysa:
1. GitHub Secrets'da `API_URL` değişkenini ayarlayın
2. Veya `src/index.ts` dosyasındaki varsayılan URL'i değiştirin

## Hata Yönetimi

- 3 kez otomatik retry
- Her retry arasında artan bekleme süresi (1s, 2s, 3s)
- Tüm hatalar loglanır
- GitHub Actions'da hata durumları görüntülenebilir

## Loglama

Tüm istekler ve hatalar GitHub Actions loglarında görüntülenebilir:
- **Actions** sekmesine gidin
- Workflow run'ına tıklayın
- "Trigger API endpoint" adımının loglarını görüntüleyin
- Başarılı istekler: `[SUCCESS]` prefix'i ile
- Hatalar: `[ERROR]` prefix'i ile

## Manuel Test

Workflow'u manuel olarak test etmek için:
1. GitHub repo'nuzda **Actions** sekmesine gidin
2. "API Cache Status Cron Job" workflow'unu seçin
3. Sağ üstteki **"Run workflow"** butonuna tıklayın

## Sorun Giderme

Eğer endpoint çalışmıyorsa:

1. GitHub Actions loglarını kontrol edin
2. API URL'inin doğru olduğundan emin olun
3. `API_URL` secret'ını kontrol edin
4. Endpoint'in public olduğundan ve authentication gerektirmediğinden emin olun
5. GitHub Actions'ın dakikada bir çalıştığını doğrulayın (Actions sekmesinde)

## GitHub Actions Limitleri

- **Ücretsiz tier**: Sınırsız public repo için, private repo'lar için 2000 dakika/ay
- **Cron job sınırı**: En kısa 1 dakika (bizim kullanımımız için yeterli)
- **Timeout**: 5 dakika (workflow timeout)

## Alternatif: Vercel (Ücretli)

Eğer Vercel Pro plan'ınız varsa, `vercel.json` dosyasındaki cron job yapılandırmasını kullanabilirsiniz.

## Lisans

MIT
