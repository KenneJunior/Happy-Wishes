import puppeteer from 'puppeteer';

async function diagnoseVisibility() {
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
        await new Promise(r => setTimeout(r, 1200));

        // Let's spawn 1 particle of each tier and check their rendering and visibility
        const report = await page.evaluate(async () => {
            const { spawnFloatingParticle, OCCASION_SVG_COLLECTIONS } = await import('./js/ui/effects/particles.js');
            const container = document.getElementById('floating-hearts-container');
            container.innerHTML = '';

            // Spawn 5 particles with different initial Y
            for (let i = 0; i < 5; i++) {
                spawnFloatingParticle({ occasion: 'valentine', initialYPercent: 20 + i * 15 });
            }

            const particles = Array.from(container.querySelectorAll('.floating-particle'));
            return particles.map(p => {
                const comp = window.getComputedStyle(p);
                const svg = p.querySelector('svg');
                const svgComp = svg ? window.getComputedStyle(svg) : null;
                const rect = p.getBoundingClientRect();
                const svgRect = svg ? svg.getBoundingClientRect() : null;
                
                // Also check if element is at point
                const centerX = rect.x + rect.width / 2;
                const centerY = rect.y + rect.height / 2;
                const elemAtPoint = document.elementFromPoint(centerX, centerY);

                return {
                    class: p.className,
                    width: comp.width,
                    height: comp.height,
                    opacity: comp.opacity,
                    display: comp.display,
                    visibility: comp.visibility,
                    zIndex: comp.zIndex,
                    filter: comp.filter,
                    transform: comp.transform,
                    rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
                    svgRect: svgRect ? { x: svgRect.x, y: svgRect.y, width: svgRect.width, height: svgRect.height } : null,
                    svgFill: svgComp ? svgComp.fill : null,
                    svgStroke: svgComp ? svgComp.stroke : null,
                    elementFromPointTag: elemAtPoint ? elemAtPoint.tagName : null,
                    elementFromPointClass: elemAtPoint ? elemAtPoint.className : null,
                    isTopElement: elemAtPoint === p || (svg && elemAtPoint === svg)
                };
            });
        });

        console.log("Visibility Report:", JSON.stringify(report, null, 2));

    } finally {
        await browser.close();
    }
}

diagnoseVisibility().catch(console.error);
