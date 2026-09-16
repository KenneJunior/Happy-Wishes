/**
 * Real Asset Loading & Critical Readiness Engine
 * 
 * CORE PRINCIPLES:
 * 1. Semantic Asset States: Explicit differentiation between PENDING, LOADING,
 *    READY, FAILED, TIMED_OUT, and OPTIONAL_PENDING.
 * 2. Critical vs. Optional Isolation: Preloader progress communicates critical
 *    application readiness (0% to 100%). Optional assets (such as celebration audio
 *    or secondary celebratory artwork) load quietly in the background without holding
 *    the user back.
 * 3. Timeouts Represent Abandonment: A timeout explicitly means "we stopped waiting
 *    for this resource", NOT "the resource successfully loaded".
 * 4. Realistic Audio Semantics: Audio only requires `canplay` or `loadedmetadata`
 *    to be marked ready for playback; it never blocks on full `canplaythrough` buffer.
 * 5. Bounded Lifecycles: Comprehensive event cleanup to prevent memory leaks and
 *    lingering timers.
 */

export const ASSET_STATUS = Object.freeze({
    PENDING: 'PENDING',
    LOADING: 'LOADING',
    READY: 'READY',
    FAILED: 'FAILED',
    TIMED_OUT: 'TIMED_OUT',
    OPTIONAL_PENDING: 'OPTIONAL_PENDING'
});

export class AssetLoader {
    constructor() {
        this.assets = new Map();
        this.listeners = {
            progress: new Set(),
            criticalReady: new Set(),
            complete: new Set()
        };
        this.isStarted = false;
        this.criticalReadyFired = false;
        this.allCompleteFired = false;
        this.globalTimeoutId = null;
        this.maxGlobalWaitMs = 3600; // Hard safety ceiling to guarantee application never hangs
    }

    /**
     * Registers an asset resource to track.
     * @param {string} id - Unique identifier
     * @param {Object} options
     * @param {'image'|'audio'|'task'} options.type
     * @param {string} [options.url] - URL for image or audio
     * @param {HTMLMediaElement} [options.element] - Existing DOM media element
     * @param {string} [options.labelKey] - i18n translation key for task name
     * @param {boolean} [options.critical=true] - If true, required before app becomes interactive
     * @param {number} [options.weight=1] - Relative weight in progress calculation
     * @param {number} [options.timeout=2500] - Per-asset fallback timeout in milliseconds
     */
    register(id, options = {}) {
        if (this.assets.has(id)) return;

        const isCritical = options.critical !== false;
        const initialStatus = isCritical ? ASSET_STATUS.PENDING : ASSET_STATUS.OPTIONAL_PENDING;

        const asset = {
            id,
            type: options.type || 'task',
            url: options.url || null,
            element: options.element || null,
            labelKey: options.labelKey || 'taskAppInit',
            critical: isCritical,
            weight: typeof options.weight === 'number' && options.weight > 0 ? options.weight : 1,
            timeout: typeof options.timeout === 'number' ? options.timeout : 2500,
            progress: 0,
            status: initialStatus,
            error: null,
            timeoutTimer: null,
            cleanupFns: []
        };

        this.assets.set(id, asset);

        // If registration occurs after start() has already run, load immediately
        if (this.isStarted) {
            this._loadAsset(asset);
        }
    }

    /**
     * Subscribes a listener to loader events.
     * @param {'progress'|'criticalReady'|'complete'} event
     * @param {Function} callback
     */
    on(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event].add(callback);
        }
    }

    /**
     * Unsubscribes a listener.
     * @param {'progress'|'criticalReady'|'complete'} event
     * @param {Function} callback
     */
    off(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event].delete(callback);
        }
    }

    /**
     * Starts loading and tracking all registered assets.
     */
    start() {
        if (this.isStarted) return;
        this.isStarted = true;

        // Global safeguard: guarantees preloader exits even on catastrophic network stalls
        this.globalTimeoutId = setTimeout(() => {
            this._handleGlobalTimeout();
        }, this.maxGlobalWaitMs);

        for (const asset of this.assets.values()) {
            this._loadAsset(asset);
        }

        // Emit initial progress state
        this._notifyProgress();
    }

    /**
     * Programmatically updates a task asset's progress.
     * @param {string} id
     * @param {number} progress - 0.0 to 1.0
     * @param {string} [status]
     */
    updateTask(id, progress, status = ASSET_STATUS.LOADING) {
        const asset = this.assets.get(id);
        if (!asset) return;

        asset.progress = Math.max(0, Math.min(1, progress));
        asset.status = asset.progress >= 1 ? ASSET_STATUS.READY : status;

        this._checkState();
    }

    /**
     * Marks a task asset as complete.
     * @param {string} id
     */
    completeTask(id) {
        this.updateTask(id, 1, ASSET_STATUS.READY);
    }

    /**
     * Calculates separate critical and optional readiness states.
     * The primary ratio & percent represent CRITICAL readiness for the preloader UI.
     */
    getProgress() {
        let critTotalWeight = 0;
        let critEarnedWeight = 0;
        let critCount = 0;
        let critResolvedCount = 0;
        let critReadyCount = 0;
        let critFailedCount = 0;
        let critTimedOutCount = 0;
        let critActiveTaskKey = 'taskAppInit';

        let optTotalWeight = 0;
        let optEarnedWeight = 0;
        let optCount = 0;
        let optResolvedCount = 0;
        let optReadyCount = 0;
        let optFailedCount = 0;
        let optTimedOutCount = 0;

        for (const asset of this.assets.values()) {
            if (asset.critical) {
                critCount++;
                critTotalWeight += asset.weight;

                if (asset.status === ASSET_STATUS.READY) {
                    critEarnedWeight += asset.weight;
                    critResolvedCount++;
                    critReadyCount++;
                } else if (asset.status === ASSET_STATUS.FAILED) {
                    // Resource resolved via failure/fallback - we stopped waiting
                    critResolvedCount++;
                    critFailedCount++;
                } else if (asset.status === ASSET_STATUS.TIMED_OUT) {
                    // Resource resolved via timeout - we stopped waiting
                    critResolvedCount++;
                    critTimedOutCount++;
                } else {
                    // PENDING or LOADING
                    critEarnedWeight += (asset.progress * asset.weight);
                    critActiveTaskKey = asset.labelKey;
                }
            } else {
                optCount++;
                optTotalWeight += asset.weight;

                if (asset.status === ASSET_STATUS.READY) {
                    optEarnedWeight += asset.weight;
                    optResolvedCount++;
                    optReadyCount++;
                } else if (asset.status === ASSET_STATUS.FAILED) {
                    optResolvedCount++;
                    optFailedCount++;
                } else if (asset.status === ASSET_STATUS.TIMED_OUT) {
                    optResolvedCount++;
                    optTimedOutCount++;
                } else {
                    optEarnedWeight += (asset.progress * asset.weight);
                }
            }
        }

        const isCriticalReady = critCount === 0 || critResolvedCount >= critCount;

        // Progress ratio represents critical readiness
        let criticalRatio = critTotalWeight > 0 ? (critEarnedWeight / critTotalWeight) : 1;
        criticalRatio = Math.max(0, Math.min(1, criticalRatio));

        // When critical state is satisfied, lock critical ratio to 100%
        if (isCriticalReady) {
            criticalRatio = 1;
            critActiveTaskKey = 'preloaderReady';
        }

        const criticalPercent = Math.round(criticalRatio * 100);

        // Optional layer calculation
        const optionalRatio = optTotalWeight > 0 ? Math.max(0, Math.min(1, optEarnedWeight / optTotalWeight)) : 1;
        const optionalPercent = Math.round(optionalRatio * 100);
        const isOptionalReady = optCount === 0 || optResolvedCount >= optCount;
        const isAllComplete = isCriticalReady && isOptionalReady;

        return {
            // Main preloader UI progress: explicitly drives critical application readiness
            ratio: criticalRatio,
            percent: criticalPercent,
            isCriticalReady,
            isAllComplete,
            activeTaskKey: critActiveTaskKey,

            // Granular decoupled state inspection
            criticalProgress: {
                ratio: criticalRatio,
                percent: criticalPercent,
                isReady: isCriticalReady,
                totalCount: critCount,
                readyCount: critReadyCount,
                failedCount: critFailedCount,
                timedOutCount: critTimedOutCount,
                activeTaskKey: critActiveTaskKey
            },
            optionalProgress: {
                ratio: optionalRatio,
                percent: optionalPercent,
                isReady: isOptionalReady,
                totalCount: optCount,
                readyCount: optReadyCount,
                failedCount: optFailedCount,
                timedOutCount: optTimedOutCount
            }
        };
    }

    /**
     * Checks if all critical assets have resolved (ready, failed, or timed out).
     * @returns {boolean}
     */
    areCriticalAssetsReady() {
        for (const asset of this.assets.values()) {
            if (asset.critical) {
                const isTerminal = [ASSET_STATUS.READY, ASSET_STATUS.FAILED, ASSET_STATUS.TIMED_OUT].includes(asset.status);
                if (!isTerminal) return false;
            }
        }
        return true;
    }

    /**
     * Internal: Begins loading a registered asset.
     * @private
     */
    _loadAsset(asset) {
        if (asset.type === 'task') {
            asset.status = asset.progress >= 1 ? ASSET_STATUS.READY : ASSET_STATUS.LOADING;
            return;
        }

        asset.status = ASSET_STATUS.LOADING;

        // Bounded per-asset timer: if network stalls, we stop waiting
        if (asset.timeout > 0) {
            asset.timeoutTimer = setTimeout(() => {
                this._handleAssetTimeout(asset);
            }, asset.timeout);
        }

        if (asset.type === 'image') {
            this._loadImage(asset);
        } else if (asset.type === 'audio') {
            this._loadAudio(asset);
        }
    }

    /**
     * Internal: Loads image via browser Image constructor.
     * @private
     */
    _loadImage(asset) {
        if (!asset.url) {
            this._markAssetComplete(asset, ASSET_STATUS.READY, 1);
            return;
        }

        const img = new Image();

        const onLoad = () => {
            this._markAssetComplete(asset, ASSET_STATUS.READY, 1);
        };

        const onError = (err) => {
            // Graceful failure: image failed, we log and mark FAILED (not ready)
            // Critical readiness can still proceed because fallback graphic applies
            console.warn(`[AssetLoader] Image failed to load (${asset.id}):`, asset.url, err);
            asset.error = err;
            this._markAssetComplete(asset, ASSET_STATUS.FAILED, 0);
        };

        img.onload = onLoad;
        img.onerror = onError;
        img.src = asset.url;

        // Instant completion for browser cache hits
        if (img.complete && img.naturalWidth > 0) {
            this._markAssetComplete(asset, ASSET_STATUS.READY, 1);
            return;
        }

        asset.cleanupFns.push(() => {
            img.onload = null;
            img.onerror = null;
        });
    }

    /**
     * Internal: Monitors celebration audio element.
     * Audio is usable once metadata or canplay is available. It does NOT
     * require full `canplaythrough` buffering to satisfy startup readiness.
     * @private
     */
    _loadAudio(asset) {
        let audio = asset.element;
        if (!audio && asset.url) {
            audio = new Audio();
            audio.preload = 'auto';
            audio.src = asset.url;
            asset.element = audio;
        }

        if (!audio) {
            this._markAssetComplete(asset, ASSET_STATUS.READY, 1);
            return;
        }

        const checkAudioProgress = () => {
            if (audio.error) {
                console.warn(`[AssetLoader] Audio encountered error (${asset.id}):`, audio.error);
                asset.error = audio.error;
                this._markAssetComplete(asset, ASSET_STATUS.FAILED, 0);
                return;
            }

            // readyState >= 2 (HAVE_CURRENT_DATA / HAVE_FUTURE_DATA) means playable
            if (audio.readyState >= 2) {
                this._markAssetComplete(asset, ASSET_STATUS.READY, 1);
                return;
            }

            // readyState 1 (HAVE_METADATA): track metadata received
            if (audio.readyState >= 1 && asset.status === ASSET_STATUS.LOADING) {
                asset.progress = 0.5;
                this._checkState();
            }
        };

        // Check if already ready in browser cache
        checkAudioProgress();

        if (asset.status === ASSET_STATUS.READY || asset.status === ASSET_STATUS.FAILED) {
            return;
        }

        const onMetadata = () => {
            if (asset.status === ASSET_STATUS.LOADING) {
                asset.progress = 0.5;
                this._checkState();
            }
        };

        const onCanPlay = () => {
            this._markAssetComplete(asset, ASSET_STATUS.READY, 1);
        };

        const onError = (e) => {
            console.warn(`[AssetLoader] Audio loading failed (${asset.id}):`, e);
            asset.error = e;
            this._markAssetComplete(asset, ASSET_STATUS.FAILED, 0);
        };

        audio.addEventListener('loadedmetadata', onMetadata);
        audio.addEventListener('canplay', onCanPlay);
        audio.addEventListener('error', onError);

        asset.cleanupFns.push(() => {
            audio.removeEventListener('loadedmetadata', onMetadata);
            audio.removeEventListener('canplay', onCanPlay);
            audio.removeEventListener('error', onError);
        });

        // Trigger load if not initiated
        if (audio.networkState === 0 /* NETWORK_EMPTY */) {
            try {
                audio.load();
            } catch (_) {}
        }
    }

    /**
     * Internal: Marks an asset complete with its final semantic status.
     * @private
     */
    _markAssetComplete(asset, status, progress) {
        if (asset.timeoutTimer) {
            clearTimeout(asset.timeoutTimer);
            asset.timeoutTimer = null;
        }

        asset.status = status;
        asset.progress = progress;

        this._checkState();
    }

    /**
     * Internal: Handles asset timeout without blocking application startup.
     * A timeout means: "We stopped waiting for this resource."
     * @private
     */
    _handleAssetTimeout(asset) {
        if (asset.status === ASSET_STATUS.READY || asset.status === ASSET_STATUS.FAILED) {
            return;
        }

        console.info(`[AssetLoader] Asset timed out (${asset.id}). Stopped waiting for resource.`);
        asset.status = ASSET_STATUS.TIMED_OUT;
        // Notice: progress is NOT artificially set to 1!

        this._checkState();
    }

    /**
     * Internal: Global timeout fallback for safety.
     * @private
     */
    _handleGlobalTimeout() {
        for (const asset of this.assets.values()) {
            if (asset.status === ASSET_STATUS.LOADING || asset.status === ASSET_STATUS.PENDING || asset.status === ASSET_STATUS.OPTIONAL_PENDING) {
                asset.status = ASSET_STATUS.TIMED_OUT;
            }
        }
        this._checkState();
    }

    /**
     * Internal: Evaluates progress and fires listeners.
     * @private
     */
    _checkState() {
        const state = this.getProgress();

        this._notifyProgress(state);

        if (state.isCriticalReady && !this.criticalReadyFired) {
            this.criticalReadyFired = true;
            for (const cb of this.listeners.criticalReady) {
                try { cb(state); } catch (e) { console.error(e); }
            }
        }

        if (state.isAllComplete && !this.allCompleteFired) {
            this.allCompleteFired = true;
            if (this.globalTimeoutId) {
                clearTimeout(this.globalTimeoutId);
                this.globalTimeoutId = null;
            }
            this._cleanupAssetHandlers();
            for (const cb of this.listeners.complete) {
                try { cb(state); } catch (e) { console.error(e); }
            }
        }
    }

    /**
     * Internal: Broadcasts progress to subscribers.
     * @private
     */
    _notifyProgress(state = this.getProgress()) {
        for (const cb of this.listeners.progress) {
            try { cb(state); } catch (e) { console.error(e); }
        }
    }

    /**
     * Cleans up asset handlers and timers without wiping state.
     * @private
     */
    _cleanupAssetHandlers() {
        for (const asset of this.assets.values()) {
            if (asset.timeoutTimer) {
                clearTimeout(asset.timeoutTimer);
                asset.timeoutTimer = null;
            }
            while (asset.cleanupFns.length > 0) {
                const fn = asset.cleanupFns.pop();
                try { fn(); } catch (_) {}
            }
        }
    }

    /**
     * Complete lifecycle disposal: cleans up all timers and listeners.
     */
    destroy() {
        if (this.globalTimeoutId) {
            clearTimeout(this.globalTimeoutId);
            this.globalTimeoutId = null;
        }
        this._cleanupAssetHandlers();
        this.listeners.progress.clear();
        this.listeners.criticalReady.clear();
        this.listeners.complete.clear();
        this.assets.clear();
    }
}

// Global shared singleton instance
export const assetLoader = new AssetLoader();
