/**
 * Romantic Visual & GIF Themes Configuration
 * Curated library of romantic themes, animated SVGs, and GIFs for the personal card.
 */

export const ROMANTIC_VISUAL_THEMES = [
    {
        id: 'default',
        name: 'Default Mascot',
        subtitle: 'Auto Occasion Bear',
        badge: 'Occasion',
        icon: '🐻',
        categories: ['all', 'romantic', 'animated'],
        thumbnail: './assets/bear-valentine.svg',
        normal: null,
        success: null,
        description: 'Dynamically matches the selected celebration mascot'
    },
    {
        id: 'sweetheart-bear',
        name: 'Sweetheart Teddy',
        subtitle: 'Beating Ruby Heart',
        badge: 'Animated',
        icon: '🧸',
        categories: ['all', 'animated', 'romantic'],
        thumbnail: './assets/bear-valentine.svg',
        normal: './assets/bear-valentine.svg',
        success: './assets/bear-valentine-success.svg',
        description: 'Plush sweetheart bear holding a pulsing glowing ruby heart'
    },
    {
        id: 'cupid-arrow',
        name: "Cupid's Golden Arrow",
        subtitle: 'Love Messenger',
        badge: 'Romantic',
        icon: '🏹',
        categories: ['all', 'romantic', 'animated'],
        thumbnail: './assets/romantic-cupid.svg',
        normal: './assets/romantic-cupid.svg',
        success: './assets/romantic-cupid-success.svg',
        description: 'Winged Cupid ready to strike with sweet arrows of affection'
    },
    {
        id: 'blooming-rose',
        name: 'Velvet Ruby Rose',
        subtitle: 'Enchanted Blossom',
        badge: 'Floral',
        icon: '🌹',
        categories: ['all', 'floral', 'romantic', 'animated'],
        thumbnail: './assets/romantic-rose.svg',
        normal: './assets/romantic-rose.svg',
        success: './assets/romantic-rose-success.svg',
        description: 'Blooming velvety crimson rose with drifting starlit petals'
    },
    {
        id: 'romantic-bouquet',
        name: 'Sweet Pastel Bouquet',
        subtitle: 'Lush Fresh Petals',
        badge: 'Floral',
        icon: '💐',
        categories: ['all', 'floral', 'romantic', 'animated'],
        thumbnail: './assets/romantic-bouquet.svg',
        normal: './assets/romantic-bouquet.svg',
        success: './assets/romantic-bouquet-success.svg',
        description: 'Handcrafted floral arrangement with blushing peonies and roses'
    },
    {
        id: 'love-letter',
        name: 'Fluttering Love Letter',
        subtitle: 'Wax-Sealed Note',
        badge: 'Keepsake',
        icon: '💌',
        categories: ['all', 'romantic', 'animated'],
        thumbnail: './assets/romantic-letter.svg',
        normal: './assets/romantic-letter.svg',
        success: './assets/romantic-letter-success.svg',
        description: 'Vintage love mail opening to reveal floating origami hearts'
    },
    {
        id: 'twilight-sunset',
        name: 'Moonlit Twilight Swans',
        subtitle: 'Serenade Lake',
        badge: 'Atmosphere',
        icon: '🦢',
        categories: ['all', 'romantic', 'animated'],
        thumbnail: './assets/romantic-sunset.svg',
        normal: './assets/romantic-sunset.svg',
        success: './assets/romantic-sunset-success.svg',
        description: 'Graceful swans forming a glowing heart under starlight'
    },
    {
        id: 'bouncing-hearts',
        name: 'Playful Bouncing Hearts',
        subtitle: 'Cheerful Romance',
        badge: 'GIF',
        icon: '💖',
        categories: ['all', 'animated', 'romantic'],
        thumbnail: './assets/img1.gif',
        normal: './assets/img1.gif',
        success: './assets/img3.gif',
        description: 'Bouncy, joyful cartoon hearts full of affectionate energy'
    },
    {
        id: 'heart-hug',
        name: 'Loving Heart Hug',
        subtitle: 'Tender Embrace',
        badge: 'GIF',
        icon: '🤗',
        categories: ['all', 'animated', 'romantic'],
        thumbnail: './assets/img3.gif',
        normal: './assets/img3.gif',
        success: './assets/img3.gif',
        description: 'Warm, cozy embrace celebrating love and shared happiness'
    },
    {
        id: 'golden-anniversary',
        name: 'Golden Milestone',
        subtitle: 'Eternal Rings',
        badge: 'Milestone',
        icon: '💍',
        categories: ['all', 'romantic', 'animated'],
        thumbnail: './assets/bear-anniversary.svg',
        normal: './assets/bear-anniversary.svg',
        success: './assets/bear-anniversary-success.svg',
        description: 'Shimmering intertwined golden rings for timeless celebrations'
    }
];

export const ROMANTIC_VISUAL_MAP = Object.fromEntries(
    ROMANTIC_VISUAL_THEMES.map(theme => [theme.id, theme])
);

/**
 * Resolves the visual asset URLs for normal and success states given the app state.
 * Priority order:
 * 1. Custom Image/GIF URL (if specified in state.customVisualUrl)
 * 2. Selected Romantic Theme from Library (if not 'default')
 * 3. Fallback to seasonal occasion mascot / celebration resolver
 *
 * @param {Object} state - The centralized application state
 * @param {Function} defaultOccasionResolver - Fallback function resolving seasonal bear
 * @returns {{ normal: string, success: string, isCustom: boolean, theme: Object }}
 */
export function resolveVisualAssetsForState(state, defaultOccasionResolver) {
    // 1. Custom Image/GIF URL
    if (state && state.customVisualUrl && state.customVisualUrl.trim()) {
        const cleanUrl = state.customVisualUrl.trim();
        return {
            normal: cleanUrl,
            success: cleanUrl,
            isCustom: true,
            theme: {
                id: 'custom-url',
                name: 'Custom Image/GIF',
                icon: '🖼️'
            }
        };
    }

    // 2. Selected Romantic Visual Theme
    const themeId = state ? state.visualTheme : 'default';
    if (themeId && themeId !== 'default' && ROMANTIC_VISUAL_MAP[themeId]) {
        const theme = ROMANTIC_VISUAL_MAP[themeId];
        return {
            normal: theme.normal || theme.thumbnail,
            success: theme.success || theme.normal || theme.thumbnail,
            isCustom: true,
            theme
        };
    }

    // 3. Fallback to Occasion Default
    const defaultAssets = defaultOccasionResolver ? defaultOccasionResolver(state) : {
        normal: './assets/bear-valentine.svg',
        success: './assets/bear-valentine-success.svg'
    };

    return {
        normal: defaultAssets.normal,
        success: defaultAssets.success,
        isCustom: false,
        theme: ROMANTIC_VISUAL_MAP.default
    };
}
