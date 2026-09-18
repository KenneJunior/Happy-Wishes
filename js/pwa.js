/**
 * PWA Controller for Be My Valentine
 * Handles Service Worker registration, offline detection, and cross-platform installation
 * (including iOS Safari Add to Home Screen walkthrough).
 */

(function () {
    'use strict';

    let deferredPrompt = null;
    const isIOS = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase()) && !window.MSStream;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

    // 1. Service Worker Registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js', { scope: '/' })
                .then((registration) => {
                    console.log('[PWA] Service Worker registered with scope:', registration.scope);

                    // Handle updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        if (!newWorker) return;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                console.log('[PWA] New version available; will activate on next refresh.');
                            }
                        });
                    });
                })
                .catch((err) => {
                    console.warn('[PWA] Service Worker registration failed:', err);
                });
        });
    }

    // 2. Install UI & Promotion
    function setupInstallUI() {
        const installBtn = document.getElementById('pwa-install-btn');
        const iosModal = document.getElementById('ios-install-modal');
        const closeIosBtn = document.getElementById('close-ios-install-btn');
        const dismissIosBtn = document.getElementById('dismiss-ios-install-btn');

        if (!installBtn) return;

        // Don't show install button if app is already running in standalone PWA mode
        if (isStandalone) {
            installBtn.style.display = 'none';
            return;
        }

        // On iOS devices, display the install button to show the Safari "Add to Home Screen" instructions
        if (isIOS) {
            installBtn.style.display = 'inline-flex';
            installBtn.addEventListener('click', () => {
                if (iosModal) {
                    iosModal.hidden = false;
                    iosModal.setAttribute('aria-hidden', 'false');
                    iosModal.classList.add('active');
                }
            });
        }

        // On Chromium / Android / Desktop: handle native beforeinstallprompt
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            installBtn.style.display = 'inline-flex';
        });

        installBtn.addEventListener('click', async () => {
            if (!deferredPrompt) {
                if (isIOS && iosModal) {
                    iosModal.hidden = false;
                    iosModal.setAttribute('aria-hidden', 'false');
                    iosModal.classList.add('active');
                }
                return;
            }

            try {
                installBtn.disabled = true;
                deferredPrompt.prompt();
                const choiceResult = await deferredPrompt.userChoice;
                if (choiceResult.outcome === 'accepted') {
                    console.log('[PWA] User accepted the install prompt');
                    installBtn.style.display = 'none';
                } else {
                    console.log('[PWA] User dismissed the install prompt');
                }
            } catch (err) {
                console.error('[PWA] Error during prompt():', err);
            } finally {
                deferredPrompt = null;
                installBtn.disabled = false;
            }
        });

        window.addEventListener('appinstalled', () => {
            console.log('[PWA] Application successfully installed.');
            installBtn.style.display = 'none';
            deferredPrompt = null;
        });

        // Close handlers for iOS Modal
        function closeIosModal() {
            if (iosModal) {
                iosModal.classList.remove('active');
                setTimeout(() => {
                    iosModal.hidden = true;
                    iosModal.setAttribute('aria-hidden', 'true');
                }, 250);
            }
        }

        if (closeIosBtn) closeIosBtn.addEventListener('click', closeIosModal);
        if (dismissIosBtn) dismissIosBtn.addEventListener('click', closeIosModal);
        if (iosModal) {
            iosModal.addEventListener('click', (e) => {
                if (e.target === iosModal) closeIosModal();
            });
        }
    }

    // 3. Network Status Handling
    function setupNetworkIndicator() {
        const indicator = document.getElementById('pwa-offline-indicator');
        if (!indicator) return;

        function updateStatus() {
            if (!navigator.onLine) {
                indicator.hidden = false;
                indicator.classList.add('visible');
            } else {
                indicator.classList.remove('visible');
                setTimeout(() => {
                    if (navigator.onLine) indicator.hidden = true;
                }, 400);
            }
        }

        window.addEventListener('online', updateStatus);
        window.addEventListener('offline', updateStatus);
        if (!navigator.onLine) {
            updateStatus();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setupInstallUI();
            setupNetworkIndicator();
        });
    } else {
        setupInstallUI();
        setupNetworkIndicator();
    }
})();
