import puppeteer from 'puppeteer';

const OCCASIONS = ['valentine', 'birthday', 'christmas', 'graduation', 'anniversary', 'newyear', 'easter', 'custom'];

async function testAllOccasions() {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });

        page.on('console', msg => console.log('PAGE:', msg.text()));

        await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });

        // Dismiss preloader
        await page.evaluate(() => {
            const preloader = document.getElementById('app-preloader');
            if (preloader) preloader.click();
        });
        await new Promise(r => setTimeout(r, 1000));

        const results = {};

        for (const occ of OCCASIONS) {
            console.log(`\n=== Testing Occasion: ${occ} ===`);
            
            // Switch occasion via appState or spawn directly
            const res = await page.evaluate(async (occasionKey) => {
                // Import modules directly in browser context
                const { appState } = await import('./js/core/state.js');
                const { spawnFloatingParticle, OCCASION_SVG_COLLECTIONS } = await import('./js/ui/effects/particles.js');
                
                appState.setState({ occasion: occasionKey });
                
                const container = document.getElementById('floating-hearts-container');
                container.innerHTML = ''; // clear old
                
                // Spawn one of EACH variant in the occasion's collection
                const collection = OCCASION_SVG_COLLECTIONS[occasionKey] || [];
                const variantsInfo = [];
                
                for (let i = 0; i < collection.length; i++) {
                    spawnFloatingParticle({ occasion: occasionKey, initialYPercent: 50 });
                }
                
                const particles = Array.from(container.querySelectorAll('.floating-particle'));
                
                return {
                    collectionLength: collection.length,
                    spawnedCount: particles.length,
                    particles: particles.map(p => {
                        const comp = window.getComputedStyle(p);
                        const svg = p.querySelector('svg');
                        const svgComp = svg ? window.getComputedStyle(svg) : null;
                        return {
                            classes: p.className,
                            width: comp.width,
                            height: comp.height,
                            opacity: comp.opacity,
                            display: comp.display,
                            visibility: comp.visibility,
                            zIndex: comp.zIndex,
                            top: comp.top,
                            transform: comp.transform,
                            animationName: comp.animationName,
                            animationDuration: comp.animationDuration,
                            hasSvg: Boolean(svg),
                            svgWidth: svgComp ? svgComp.width : null,
                            svgHeight: svgComp ? svgComp.height : null,
                            svgViewBox: svg ? svg.getAttribute('viewBox') : null,
                            svgPathsCount: svg ? svg.querySelectorAll('path, circle, rect, polygon, ellipse, line').length : 0
                        };
                    })
                };
            }, occ);

            console.log(`Occasion ${occ}: collection length = ${res.collectionLength}, spawned = ${res.spawnedCount}`);
            res.particles.forEach((p, idx) => {
                console.log(`  Particle ${idx}: ${p.classes}`);
                console.log(`     size: ${p.width} x ${p.height}, opacity: ${p.opacity}, display: ${p.display}, vis: ${p.visibility}, anim: ${p.animationName} (${p.animationDuration})`);
                console.log(`     svg: has=${p.hasSvg}, size=${p.svgWidth} x ${p.svgHeight}, elements=${p.svgPathsCount}`);
            });

            results[occ] = res;
        }

    } finally {
        await browser.close();
    }
}

testAllOccasions().catch(console.error);
