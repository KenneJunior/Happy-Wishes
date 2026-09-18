import puppeteer from 'puppeteer';

async function capture() {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });

        await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });

        // Dismiss preloader
        await page.evaluate(() => {
            const preloader = document.getElementById('app-preloader');
            if (preloader) preloader.click();
        });

        // Wait 1.5 seconds for card to reveal and particles to spawn
        await new Promise(r => setTimeout(r, 1500));

        // Take screenshot
        await page.screenshot({ path: 'screenshot.png' });
        console.log("Screenshot saved to screenshot.png");

        // Let's inspect the SVG elements inside #floating-hearts-container
        const svgInspection = await page.evaluate(() => {
            const container = document.getElementById('floating-hearts-container');
            const particles = Array.from(container ? container.querySelectorAll('.floating-particle') : []);
            return particles.map(p => {
                const svg = p.querySelector('svg');
                return {
                    classes: p.className,
                    svgHTML: svg ? svg.outerHTML : 'NO SVG',
                    style: p.getAttribute('style'),
                    bounds: p.getBoundingClientRect(),
                    svgBounds: svg ? svg.getBoundingClientRect() : null
                };
            });
        });

        console.log("Spawned SVG elements:", JSON.stringify(svgInspection, null, 2));

    } finally {
        await browser.close();
    }
}

capture().catch(console.error);
