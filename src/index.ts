import axios from 'axios';

// Retry mekanizması için yardımcı fonksiyon
async function fetchWithRetry(
  url: string,
  maxRetries: number = 3,
  retryDelay: number = 1000
): Promise<any> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await axios.get(url, {
        timeout: 30000, // 30 saniye timeout
        headers: {
          'User-Agent': 'ApiBot/1.0',
          'Accept': 'application/json',
        },
      });

      return {
        success: true,
        status: response.status,
        statusText: response.statusText,
        timestamp: new Date().toISOString(),
        attempt,
      };
    } catch (error: any) {
      lastError = error;
      
      // Son deneme değilse bekle
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
      }
    }
  }

  // Tüm denemeler başarısız oldu
  throw lastError || new Error('Unknown error occurred');
}

async function main() {
  // API endpoint URL'i
  const apiUrl = process.env.API_URL || 'https://assetapi.onrender.com/api/cache/status';

  try {
    const result = await fetchWithRetry(apiUrl);
    
    // Başarılı log
    console.log(`[SUCCESS] ${result.timestamp} - Status: ${result.status} - Attempt: ${result.attempt}`);
    process.exit(0);
  } catch (error: any) {
    // Hata logu
    const errorMessage = error?.message || 'Bilinmeyen hata';
    const errorStatus = error?.response?.status || 'N/A';
    
    console.error(`[ERROR] ${new Date().toISOString()} - Status: ${errorStatus} - Error: ${errorMessage}`);
    process.exit(1);
  }
}

main();
