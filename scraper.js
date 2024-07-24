const puppeteer = require('puppeteer');

const scrapeKaspi = async () => {
  const browserFetcher = puppeteer.createBrowserFetcher();
  const revisionInfo = await browserFetcher.download('126.0.6478.182');
  const browser = await puppeteer.launch({ 
    executablePath: revisionInfo.executablePath,
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']  
   }); // Set to true for headless mode
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
  
  // Go to the target URL
  await page.goto('https://kaspi.kz/shop/search/?text=Corsair%20CV550%20550W&q=%3AavailableInZones%3AMagnum_ZONE1&sort=relevance&filteredByCategory=false&sc=', {
    waitUntil: 'networkidle2'
  });

  // Wait for the required elements to load
  await page.waitForSelector('.item-card');

  // Extract data
  const items = await page.evaluate(() => {
    const itemCards = document.querySelectorAll('.item-card');
    const results = [];
    itemCards.forEach(item => {
      const title = item.querySelector('.item-card__name-link')?.textContent?.trim() || '';
      const price = item.querySelector('.item-card__prices-price')?.textContent?.trim() || '';
      if (title && price) {
        results.push({ title, price });
      }
    });
    return results;
  });

  // Output the data
  console.log(items);

  await browser.close();
};

scrapeKaspi();
