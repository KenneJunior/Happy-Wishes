import { OCCASION_PARTICLES, getNextSvgId } from '../js/ui/effects/svg-particles.js';

let issues = 0;

for (const [occ, variants] of Object.entries(OCCASION_PARTICLES)) {
    variants.forEach((v, idx) => {
        const id = getNextSvgId();
        const svgStr = v.svg(id);
        
        if (!svgStr.includes('<svg')) {
            console.error(`[${occ} #${idx}] Missing <svg> tag`);
            issues++;
        }
        if (!svgStr.includes('viewBox')) {
            console.error(`[${occ} #${idx}] Missing viewBox`);
            issues++;
        }
        if (!svgStr.includes('</svg>')) {
            console.error(`[${occ} #${idx}] Missing </svg> tag`);
            issues++;
        }
        // Check for broken IDs or undefined
        if (svgStr.includes('undefined') || svgStr.includes('NaN')) {
            console.error(`[${occ} #${idx}] Contains undefined or NaN: ${svgStr.slice(0, 100)}`);
            issues++;
        }
    });
}

console.log(`SVG validity check complete. Total issues found: ${issues}`);
