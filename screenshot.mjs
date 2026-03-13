import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotDir = path.join(__dirname, 'temporary screenshots');

// Create directory if it doesn't exist
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Get the next screenshot number
    const files = fs.readdirSync(screenshotDir);
    let maxNum = 0;
    files.forEach(file => {
      const match = file.match(/screenshot-(\d+)/);
      if (match) {
        maxNum = Math.max(maxNum, parseInt(match[1]));
      }
    });

    const nextNum = maxNum + 1;
    const filename = label ? `screenshot-${nextNum}-${label}.png` : `screenshot-${nextNum}.png`;
    const filepath = path.join(screenshotDir, filename);

    await page.screenshot({ path: filepath, fullPage: true });
    console.log(`Screenshot saved: ${filename}`);

    await browser.close();
  } catch (error) {
    console.error('Screenshot error:', error.message);
    process.exit(1);
  }
})();
