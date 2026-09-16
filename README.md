# 💖 Be My Valentine & Seasonal Celebration Web App

An interactive, responsive single-page web application featuring modern glassmorphism, playful button physics, celebratory confetti bursts, seasonal themes, and zero-dependency Web Audio sound synthesis.

Deployed Live on GitHub Pages: [https://kennejunior.github.io/be-my-Valentine/](https://kennejunior.github.io/be-my-Valentine/)

---

## ✨ Features

- 💧 **Liquid Glass Droplet Preloader**:
  - Fullscreen morphing iridescent frosted glass droplet with organic border-radius fluid keyframes.
  - Concentric liquid ripple waves, specular light reflections, and pulsing glowing icon.
  - Guaranteed minimum 2.5-second runtime so animations play out smoothly, synchronized with `window.addEventListener('load')`.
  - Elegant fluid dissolve transition that scales the main glass UI card gracefully into view (`scale(0.92)` -> `scale(1.0)` with blur clearing).
- 🎶 **Birthday Celebration Soundtrack**:
  - Plays *Simi ft. Adekunle Gold & Deja - Happy Birthday* upon clicking the celebratory "Accept" birthday button.
  - Smooth volume fade-in ramp to prevent acoustic shock.
  - Interactive equalizer pill button in the celebration view allowing users to pause or resume playback anytime.
- 🐻 **Cute Seasonal Bear Visuals**: Dynamic SVG and animated graphics that automatically adapt to image aspect ratios in both portrait and landscape mobile screens.
- 🏃 **Playful Dodging "Deny" Button**: Moves away to a random safe coordinate whenever hovered or touched on touchscreen devices, cycling through humorous teasing phrases.
- 📈 **Gradual "Accept" Button Growth**:
  - Scales up progressively over **~16 gentle steps** (increasing by `+0.04` per dodge).
  - Capped at a well-balanced **1.65x maximum scale** to ensure it remains eye-catching and readable without overflowing the card or covering other elements.
  - Adds an ambient glowing drop-shadow that intensifies with each playful dodge.
- 🎊 **Celebratory Confetti & Particle Engine**:
  - Full-screen multi-color confetti cannon via `canvas-confetti` with an autonomous HTML5 canvas fallback.
  - Ambient floating particles (hearts, birthday cakes, snowflakes, or sparkling stars depending on the active theme).
- 🎵 **Interactive Web Audio Effects**:
  - Zero-dependency synthesizer using the browser's native Web Audio API.
  - Plays dynamic pop sound effects on dodges and a 4-note celebratory arpeggio upon clicking "Accept".
- 📱 **Mobile & Landscape Optimized**:
  - Dynamically recalculates container aspect ratios on orientation change and window resize.
  - Tailored compact layout for mobile landscape viewports (`max-height: 580px`).
- 🎨 **AOS & 3D Parallax Tilt**:
  - Gentle choreographed entrance transitions using Animate On Scroll (AOS).
  - Subtle 3D perspective tilt on desktop pointer hover using `vanilla-tilt.js`.
  - Accessible design respecting `prefers-reduced-motion: reduce`.

---

## 🕹️ How the App Functions

1. **Initial Load**:
   - The frosted glass card glides smoothly into the center of the viewport with an entrance animation.
   - The top badge, animated bear character, question, and response buttons ("Accept" & "Deny") appear in staggered succession.
   - Ambient orbs and floating seasonal particles drift in the background.

2. **Interacting with the "Deny" Button**:
   - When the cursor hovers or a finger taps on the "Deny" button, the button calculates safe viewport bounds within the screen.
   - It randomly teleports to a new coordinate within the visible window, safely distanced from the viewport edges.
   - A playful bubble pop audio effect plays, and the button cycles to teasing text (e.g., *"Are you sure? 👀"*, *"Think again! 😜"*, *"Too slow! 🏃‍♂️"*).
   - Simultaneously, the "Accept" button grows by a tiny increment (`+0.04`), encouraging the user to click it.

3. **Clicking "Accept"**:
   - The card transitions into the celebratory victory view (*"BEST DECISION EVER!"*).
   - A celebratory fanfare arpeggio chime plays through Web Audio.
   - Confetti bursts outward across the screen in two celebratory waves.
   - The bear switches to a dancing/happy celebration animation.
   - A *"Celebrate Again 🔄"* replay button allows resetting the card state smoothly.

---

## 🛠️ Why GitHub Pages Was Showing a Blank Screen & The Fix

### The Root Cause
When deploying to GitHub Pages under a project repository URL like `https://kennejunior.github.io/be-my-Valentine/`:
- The application resides in a subdirectory (`/be-my-Valentine/`).
- Previously, asset and script tags used **absolute root paths** (e.g., `/css/styles.css`, `/js/script.js`, `/assets/bear-birthday.svg`).
- Browsers requested those files from the root domain (`https://kennejunior.github.io/css/styles.css`), resulting in **404 Not Found** errors.
- Because the Animate On Scroll (AOS) stylesheet hides elements with `opacity: 0` until JavaScript initializes the animation, the missing `script.js` prevented `AOS.init()` from running. Consequently, the card remained at `opacity: 0` indefinitely, causing the page to look completely blank.

### How It Was Fixed
1. **Relative Paths**: Converted all asset, stylesheet, and script references to relative paths (`./css/styles.css`, `./js/script.js`, `./assets/...`) in `index.html` and `script.js`.
2. **Safety Fallback**: Added a CSS fallback keyframe animation in `styles.css` ensuring that even if external scripts or CDNs are delayed, all elements automatically reveal after a brief threshold.
3. **Multi-Route Support**: Created root-level `index.html` and `yes_page.html` so static hosts serve the entry point directly without requiring URL rewrites.

---

## 💻 Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)

### Running Locally
```bash
# 1. Clone the repository
git clone https://github.com/kennejunior/be-my-Valentine.git
cd be-my-Valentine

# 2. Install dependencies
npm install

# 3. Start the local server
npm start
```
Open your browser and navigate to:
```
http://localhost:3000
```

---

## 📂 Project Structure

```
├── index.html            # Main entry HTML file (with relative asset links for GitHub Pages)
├── pages/
│   └── yes_page.html      # Success celebration page
├── server.js              # Express static & AI API proxy server
├── css/
│   ├── styles.css         # Glassmorphism, animations, responsive layouts & themes
│   └── yes_style.css      # Styling for the standalone yes page
├── js/
│   ├── main.js            # Composition root & module bootstrapper
│   ├── config/            # Declarative static configurations
│   │   ├── occasions.js   # Occasion definitions, themes, and metadata
│   │   ├── emotions.js    # Mascot mood tiers and dialogue lines
│   │   └── wishes.js      # Curated seasonal wishes & minigame capsules
│   ├── core/              # Business logic & services
│   │   ├── state.js       # Centralized observable reactive state manager
│   │   ├── occasion-service.js # Easter algorithm & occasion date calculations
│   │   ├── sound.js       # Web Audio API synthesizer & celebration music
│   │   └── device.js      # Hardware capability detection & adaptive throttling
│   ├── services/          # External communications
│   │   └── wish-api.js    # Gemini AI wish crafting & resilient fallbacks
│   └── ui/                # UI components & effects
│       ├── bear.js        # Mascot reactions & aspect ratio adjustments
│       ├── countdown.js   # Target date countdown & banner management
│       ├── dodge.js       # Physics button dodge & progressive scaling
│       ├── keepsake.js    # 3D interactive keepsake card & scratchpad
│       ├── modal-personalize.js # Personalization modal & shareable link generation
│       ├── modal-wishjar.js # Wish Jar minigame modal
│       ├── success.js     # Acceptance celebration state coordinator
│       ├── theme.js       # Light/dark mode & theme switcher
│       ├── toast.js       # Micro-notification toasts
│       └── effects/       # Confetti, particles, 3D tilt, and preloader
├── assets/                # SVG vectors and seasonal bear animations
└── README.md              # Project documentation and architecture guide
```

---

## 📄 License
MIT License. Feel free to customize this for your own special someone or upcoming holiday celebration! 💖
