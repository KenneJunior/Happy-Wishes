/**
 * Service Worker for Be My Valentine PWA
 * Provides offline capabilities, static asset precaching, and smart runtime caching.
 */

const CACHE_NAME = 'valentine-pwa-v1';

// Core essential assets to precache on install
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/yes_page',
    '/pages/yes_page.html',
    '/css/styles.css',
    '/css/yes_style.css',
    '/js/main.js',
    '/js/yes_script.js',
    '/js/pwa.js',
    '/js/config/emotions.js',
    '/js/config/occasions.js',
    '/js/config/svg-particles.js',
    '/js/config/visual-themes.js',
    '/js/core/device.js',
    '/js/core/occasion-service.js',
    '/js/core/state.js',
    '/js/i18n/index.js',
    '/js/services/letter-api.js',
    '/js/ui/bear.js',
    '/js/ui/effects/confetti.js',
    '/js/ui/effects/particles.js',
    '/js/ui/modal-personalize.js',
    '/js/ui/sound.js',
    '/js/ui/toast.js',
    '/manifest.json',
    '/assets/pwa-icon.svg',
    '/assets/icons/apple-icon-180.png',
    '/assets/icons/favicon-196.png',
    '/assets/icons/manifest-icon-192.png',
    '/assets/icons/manifest-icon-192.maskable.png',
    '/assets/icons/manifest-icon-512.png',
    '/assets/icons/manifest-icon-512.maskable.png',
    '/assets/bear-valentine.svg',
    '/assets/bear-valentine-success.svg',
    '/assets/romantic-rose.svg',
    '/assets/romantic-rose-success.svg',
    '/assets/preloader.svg'
];

// Install Event: Precaches core files and triggers immediate activation
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            // Cache resiliently so failure of an optional asset doesn't abort installation
            await Promise.allSettled(
                PRECACHE_ASSETS.map((asset) =>
                    cache.add(asset).catch((err) => {
                        console.warn('[SW] Non-critical precache failed for:', asset, err);
                    })
                )
            );
        }).then(() => self.skipWaiting())
    );
});

// Activate Event: Cleans up obsolete caches and claims connected clients
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Event: Strategies tailored by request type
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Ignore non-HTTP/HTTPS requests (e.g. chrome-extension://, data:)
    if (!request.url.startsWith('http://') && !request.url.startsWith('https://')) {
        return;
    }

    // Pass non-GET requests directly to network
    if (request.method !== 'GET') {
        return;
    }

    const url = new URL(request.url);

    // API calls: Network-first with graceful offline fallback
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(
            fetch(request).catch(() => {
                return new Response(
                    JSON.stringify({
                        success: false,
                        offline: true,
                        message: 'Network offline. Using saved offline keepsake data.'
                    }),
                    {
                        status: 503,
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
            })
        );
        return;
    }

    // HTML Navigation requests: Network-first, fallback to cached HTML page
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((networkResponse) => {
                    if (networkResponse.ok) {
                        const copy = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
                    }
                    return networkResponse;
                })
                .catch(async () => {
                    const cached = await caches.match(request);
                    if (cached) return cached;
                    if (url.pathname.includes('yes_page')) {
                        return (await caches.match('/yes_page')) || (await caches.match('/pages/yes_page.html'));
                    }
                    return (await caches.match('/index.html')) || (await caches.match('/'));
                })
        );
        return;
    }

    // Static Assets (CSS, JS, Images, Fonts): Cache-first with network fallback and background revalidation
    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
                // Return cache immediately, fetch fresh copy in background
                fetch(request)
                    .then((networkResponse) => {
                        if (networkResponse && networkResponse.ok) {
                            caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
                        }
                    })
                    .catch(() => {/* Ignore background revalidation failure when offline */});
                return cachedResponse;
            }

            return fetch(request)
                .then((networkResponse) => {
                    if (networkResponse && networkResponse.ok && networkResponse.type === 'basic') {
                        const copy = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
                    }
                    return networkResponse;
                })
                .catch(() => {
                    // Fallback for missing images when offline
                    if (request.destination === 'image') {
                        return caches.match('/assets/pwa-icon.svg');
                    }
                });
        })
    );
});

// Support manual skipWaiting from client UI
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
