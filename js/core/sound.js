/**
 * Sound and Music Service
 * Zero-dependency procedural Web Audio API tone synthesizer
 * and background celebration audio player.
 */

import { appState } from './state.js';

class SoundService {
    constructor() {
        this.ctx = null;
        this.audioEl = null;
        this.musicToggleBtn = null;
        this.musicLabel = null;
        this.fadeTimer = null;
        this.defaultSongUrl = 'https://fhavur.vercel.app/Simi_ft_Adekunle_Gold_DeJa_-_Happy_Birthday.mp3';
        this.customSongUrl = null;
        this.customSongName = null;
        this.previewAudio = null;
    }

    /**
     * Lazy-initializes the Web Audio Context on first user interaction.
     */
    initContext() {
        if (!this.ctx && typeof window !== 'undefined') {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
        }
    }

    /**
     * Binds DOM audio and control elements.
     */
    initAudioElements(audioElementId = 'birthday-audio', toggleBtnId = 'music-toggle-btn', labelId = 'music-label') {
        if (typeof document === 'undefined') return;
        this.audioEl = document.getElementById(audioElementId);
        this.musicToggleBtn = document.getElementById(toggleBtnId);
        this.musicLabel = document.getElementById(labelId);

        // Sync initial custom song from persistent state if available
        const state = appState.getState();
        if (state && state.customSongUrl) {
            this.setCelebrationSong(state.customSongUrl, state.customSongName);
        }

        if (this.musicToggleBtn && this.audioEl) {
            this.musicToggleBtn.addEventListener('click', () => {
                const s = appState.getState();
                const activeName = s.customSongName || this.customSongName || (s.occasion ? s.occasion.toUpperCase() : 'Celebration');
                this.toggleCelebrationMusic(activeName);
            });
        }
    }

    /**
     * Sets or updates the celebration audio track URL and name.
     * @param {string} url - Direct audio URL or object URL
     * @param {string} [name=''] - Display title for track
     */
    setCelebrationSong(url, name = '') {
        this.customSongUrl = url ? url.trim() : null;
        this.customSongName = name ? name.trim() : null;
        if (this.audioEl) {
            const targetUrl = this.customSongUrl || this.defaultSongUrl;
            if (this.audioEl.src !== targetUrl) {
                this.audioEl.src = targetUrl;
                this.audioEl.load();
            }
        }
    }

    /**
     * Previews an audio URL or uploaded audio track.
     * @param {string} url
     * @param {Function} [onPlay]
     * @param {Function} [onPause]
     * @param {Function} [onError]
     */
    previewSong(url, onPlay, onPause, onError) {
        this.stopPreview();
        const targetUrl = (url && url.trim()) || this.customSongUrl || this.defaultSongUrl;
        if (!targetUrl) return;

        try {
            this.previewAudio = new Audio(targetUrl);
            this.previewAudio.volume = 0.65;
            this.previewAudio.onended = () => {
                this.previewAudio = null;
                if (onPause) onPause();
            };
            this.previewAudio.onerror = (err) => {
                this.previewAudio = null;
                if (onError) onError(err);
            };

            const p = this.previewAudio.play();
            if (p !== undefined) {
                p.then(() => {
                    if (onPlay) onPlay();
                }).catch((err) => {
                    this.previewAudio = null;
                    if (onError) onError(err);
                });
            }
        } catch (err) {
            this.previewAudio = null;
            if (onError) onError(err);
        }
    }

    /**
     * Stops any actively auditioning preview audio.
     */
    stopPreview() {
        if (this.previewAudio) {
            try {
                this.previewAudio.pause();
                this.previewAudio.currentTime = 0;
            } catch {}
            this.previewAudio = null;
        }
    }

    /**
     * Returns true if preview audio is actively playing.
     */
    isPlayingPreview() {
        return !!(this.previewAudio && !this.previewAudio.paused);
    }

    /**
     * Plays the cute pop sound when the deny button dodges.
     */
    playDodgePop() {
        try {
            this.initContext();
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(440, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.1);

            gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.12);
        } catch {
            // Optional enhancement
        }
    }

    /**
     * Plays ascending celebration chime notes.
     */
    playCelebrationChime() {
        try {
            this.initContext();
            if (!this.ctx) return;
            const notes = [523.25, 659.25, 783.99, 1046.50];
            notes.forEach((freq, index) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'triangle';
                osc.frequency.value = freq;

                const startTime = this.ctx.currentTime + index * 0.1;
                gain.gain.setValueAtTime(0, startTime);
                gain.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(startTime);
                osc.stop(startTime + 0.65);
            });
        } catch {
            // Optional enhancement
        }
    }

    /**
     * Plays sound effect when toggling dark/light theme mode.
     * @param {boolean} isDark
     */
    playThemeToggleSound(isDark) {
        try {
            this.initContext();
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const now = this.ctx.currentTime;

            osc.type = 'sine';
            if (isDark) {
                // Deep descending tone for dark mode
                osc.frequency.setValueAtTime(587.33, now); // D5
                osc.frequency.exponentialRampToValueAtTime(392.00, now + 0.18); // G4
            } else {
                // Bright ascending tone for daylight mode
                osc.frequency.setValueAtTime(392.00, now); // G4
                osc.frequency.exponentialRampToValueAtTime(587.33, now + 0.18); // D5
            }
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.23);
        } catch {
            // Optional enhancement
        }
    }

    /**
     * Plays a sparkling celebratory pop chime (used during keepsakes and acceptance).
     */
    playSparklePop() {
        try {
            this.initContext();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(659.25, now); // E5
            osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.12); // E6

            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.15);
        } catch {
            // Audio enhancement optional
        }
    }

    /**
     * Starts celebration background music with smooth volume fade-in.
     * Supports custom song URL or uploaded song with automatic fallback.
     * @param {string} [occasionName='Celebration']
     */
    playCelebrationMusic(occasionName = 'Celebration') {
        if (!this.audioEl) return;
        try {
            if (this.fadeTimer) clearInterval(this.fadeTimer);

            const state = appState.getState();
            const activeUrl = state.customSongUrl || this.customSongUrl || this.defaultSongUrl;
            const activeName = state.customSongName || this.customSongName || occasionName;

            if (this.audioEl.src !== activeUrl) {
                this.audioEl.src = activeUrl;
                this.audioEl.load();
            }

            this.audioEl.currentTime = 0;
            this.audioEl.volume = 0;
            const playPromise = this.audioEl.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    let vol = 0;
                    this.fadeTimer = setInterval(() => {
                        vol = Math.min(vol + 0.06, 0.75);
                        if (this.audioEl) this.audioEl.volume = parseFloat(vol.toFixed(2));
                        if (vol >= 0.75) {
                            clearInterval(this.fadeTimer);
                            this.fadeTimer = null;
                        }
                    }, 80);

                    if (this.musicToggleBtn) {
                        this.musicToggleBtn.classList.remove('is-paused');
                    }
                    if (this.musicLabel) {
                        this.musicLabel.textContent = `${activeName} Music: Playing 🎶`;
                    }
                }).catch((err) => {
                    console.warn('Playback failed, checking default fallback:', err);
                    // Fallback to default celebration song if custom song failed
                    if (activeUrl !== this.defaultSongUrl && this.audioEl) {
                        this.audioEl.src = this.defaultSongUrl;
                        this.audioEl.load();
                        this.audioEl.play().catch(() => {});
                    }
                    if (this.musicToggleBtn) {
                        this.musicToggleBtn.classList.add('is-paused');
                    }
                    if (this.musicLabel) {
                        this.musicLabel.textContent = `Tap to Play ${activeName} Music 🎶`;
                    }
                });
            }
        } catch (e) {
            console.error('Audio playback error:', e);
        }
    }

    /**
     * Toggles celebration audio pause/play state.
     * @param {string} [occasionName='Celebration']
     */
    toggleCelebrationMusic(occasionName = 'Celebration') {
        if (!this.audioEl) return;
        const state = appState.getState();
        const activeName = state.customSongName || this.customSongName || occasionName;

        if (this.audioEl.paused) {
            this.audioEl.play().then(() => {
                if (this.musicToggleBtn) this.musicToggleBtn.classList.remove('is-paused');
                if (this.musicLabel) this.musicLabel.textContent = `${activeName} Music: Playing 🎶`;
            }).catch(() => {});
        } else {
            this.audioEl.pause();
            if (this.musicToggleBtn) this.musicToggleBtn.classList.add('is-paused');
            if (this.musicLabel) this.musicLabel.textContent = `${activeName} Music: Paused ⏸️`;
        }
    }

    /**
     * Stops celebration music and resets playback position.
     */
    stopCelebrationMusic() {
        if (this.fadeTimer) clearInterval(this.fadeTimer);
        if (this.audioEl) {
            this.audioEl.pause();
            this.audioEl.currentTime = 0;
        }
        if (this.musicToggleBtn) {
            this.musicToggleBtn.classList.add('is-paused');
        }
    }
}

export const sound = new SoundService();
