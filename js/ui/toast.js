/**
 * Floating Toast Notification Component
 * Displays transient user feedback notifications.
 */

let toastNotification = null;
let toastMsg = null;
let toastIcon = null;
let toastTimer = null;

export function initToast() {
    toastNotification = document.getElementById('toast-notification');
    toastMsg = document.getElementById('toast-msg');
    toastIcon = document.getElementById('toast-icon');
}

export function showToast(message, icon = '✨', durationMs = 2800) {
    if (!toastNotification) {
        initToast();
    }
    if (!toastNotification) return;

    if (toastMsg) toastMsg.textContent = message;
    if (toastIcon) toastIcon.textContent = icon;

    toastNotification.hidden = false;
    toastNotification.style.display = 'inline-flex';

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        if (toastNotification) {
            toastNotification.hidden = true;
            toastNotification.style.display = 'none';
        }
    }, durationMs);
}
