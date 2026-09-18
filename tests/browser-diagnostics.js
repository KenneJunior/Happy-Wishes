import puppeteer from 'puppeteer';

async function run() {
    console.log("Launching Puppeteer...");
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });

        // Capture console messages from page
        page.on('console', async msg => {
            const args = await Promise.all(msg.args().map(arg => arg.jsonValue().catch(() => arg.toString())));
            console.log('PAGE LOG:', ...args);
        });
        page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

        console.log("Navigating to http://localhost:3000/...");
        await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0', timeout: 15000 });

        console.log("Page loaded. Checking preloader and container...");
        
        // Let's inspect container immediately
        const containerInfo = await page.evaluate(() => {
            const container = document.getElementById('floating-hearts-container');
            const preloader = document.getElementById('app-preloader');
            return {
                containerExists: Boolean(container),
                containerChildCount: container ? container.childElementCount : 0,
                containerStyle: container ? {
                    display: getComputedStyle(container).display,
                    visibility: getComputedStyle(container).visibility,
                    opacity: getComputedStyle(container).opacity,
                    zIndex: getComputedStyle(container).zIndex,
                    position: getComputedStyle(container).position,
                    width: getComputedStyle(container).width,
                    height: getComputedStyle(container).height,
                    rect: container.getBoundingClientRect()
                } : null,
                preloaderExists: Boolean(preloader),
                preloaderDisplay: preloader ? getComputedStyle(preloader).display : null,
                preloaderOpacity: preloader ? getComputedStyle(preloader).opacity : null
            };
        });
        console.log("Initial container info:", JSON.stringify(containerInfo, null, 2));

        // Fast forward preloader by clicking it or waiting
        console.log("Clicking preloader to fast-forward if present...");
        await page.evaluate(() => {
            const preloader = document.getElementById('app-preloader');
            if (preloader) preloader.click();
        });

        // Wait 2 seconds for preloader exit and particle spawner to start
        await new Promise(r => setTimeout(r, 2000));

        // Now inspect container and particles
        const particleDiagnostics = await page.evaluate(() => {
            const container = document.getElementById('floating-hearts-container');
            const particles = Array.from(container ? container.querySelectorAll('.floating-particle') : []);
            
            return {
                containerChildCount: container ? container.childElementCount : 0,
                particleCount: particles.length,
                particles: particles.map(el => {
                    const svg = el.querySelector('svg');
                    const comp = getComputedStyle(el);
                    const svgComp = svg ? getComputedStyle(svg) : null;
                    return {
                        className: el.className,
                        dataOccasion: el.getAttribute('data-particle-occasion'),
                        dataTheme: el.getAttribute('data-particle-theme'),
                        inlineStyle: el.getAttribute('style'),
                        computed: {
                            display: comp.display,
                            visibility: comp.visibility,
                            opacity: comp.opacity,
                            width: comp.width,
                            height: comp.height,
                            position: comp.position,
                            top: comp.top,
                            left: comp.left,
                            right: comp.right,
                            bottom: comp.bottom,
                            zIndex: comp.zIndex,
                            animationName: comp.animationName,
                            animationDuration: comp.animationDuration,
                            animationPlayState: comp.animationPlayState,
                            transform: comp.transform,
                            filter: comp.filter
                        },
                        rect: el.getBoundingClientRect(),
                        svgInfo: svg ? {
                            outerHTMLSample: svg.outerHTML.slice(0, 300),
                            rect: svg.getBoundingClientRect(),
                            computedDisplay: svgComp?.display,
                            computedVisibility: svgComp?.visibility,
                            computedOpacity: svgComp?.opacity,
                            computedWidth: svgComp?.width,
                            computedHeight: svgComp?.height,
                            computedFill: svgComp?.fill,
                            hasPaths: svg.querySelectorAll('path, circle, rect, polygon').length
                        } : null
                    };
                })
            };
        });

        console.log("Particle diagnostics after preloader:");
        console.log(JSON.stringify(particleDiagnostics, null, 2));

    } finally {
        await browser.close();
    }
}

run().catch(err => {
    console.error("Test failed:", err);
    process.exit(1);
});
