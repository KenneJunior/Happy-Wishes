import puppeteer from 'puppeteer';

async function checkBounds() {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });
        await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });

        await page.evaluate(() => {
            const preloader = document.getElementById('app-preloader');
            if (preloader) preloader.click();
        });
        await new Promise(r => setTimeout(r, 1500));

        const data = await page.evaluate(() => {
            const container = document.getElementById('floating-hearts-container');
            const particles = Array.from(container.querySelectorAll('.floating-particle'));
            return particles.map(p => {
                const r = p.getBoundingClientRect();
                const svg = p.querySelector('svg');
                const sr = svg ? svg.getBoundingClientRect() : null;
                const comp = window.getComputedStyle(p);
                return {
                    class: p.className,
                    rect: { x: r.x, y: r.y, width: r.width, height: r.height, top: r.top, bottom: r.bottom },
                    svgRect: sr ? { x: sr.x, y: sr.y, width: sr.width, height: sr.height } : null,
                    opacity: comp.opacity,
                    display: comp.display,
                    visibility: comp.visibility,
                    transform: comp.transform
                };
            });
        });

        console.log("Particle Bounds:", JSON.stringify(data, null, 2));
    } finally {
        await browser.close();
    }
}

checkBounds().catch(console.error);
