import { OCCASION_PARTICLES } from '../js/ui/effects/svg-particles.js';

console.log("=== OCCASION PARTICLE VARIANT AUDIT ===");
const materials = new Set();
const tiers = new Set();
const rarities = new Set();

let totalVariants = 0;

for (const [occ, variants] of Object.entries(OCCASION_PARTICLES)) {
    console.log(`\nOccasion [${occ}]: ${variants.length} variants`);
    totalVariants += variants.length;
    variants.forEach((v, idx) => {
        materials.add(v.material);
        tiers.add(v.tier);
        rarities.add(v.rarity);
        console.log(`  [${idx}] id: ${v.id}, name: "${v.name}", tier: ${v.tier}, material: ${v.material}, rarity: ${v.rarity}, scale: [${v.minScale} - ${v.maxScale}], opacity: [${v.minOpacity} - ${v.maxOpacity}]`);
    });
}

console.log("\nAll unique materials:", Array.from(materials));
console.log("All unique tiers:", Array.from(tiers));
console.log("All unique rarities:", Array.from(rarities));
console.log("Total variants:", totalVariants);
