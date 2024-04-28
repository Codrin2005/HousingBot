const puppeteer = require('puppeteer');

async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto('https://www.xior-booking.com/#');
    
    // Get the HTML content of the page
    const html = await page.content();
    
    console.log(html);
    
    await browser.close();
}

run();
