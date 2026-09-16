/**
 * Letter API Client Service
 * Encapsulates network communication with `/api/letter/generate`,
 * payload construction, response parsing, and client fallback generation.
 */

/**
 * Requests a freshly generated keepsake letter using Gemini AI tailored with:
 * recipient name, occasion, celebration type/title, and date.
 * 
 * @param {Object} params
 * @param {string} [params.recipientName] - Name or nickname
 * @param {string} [params.occasion] - Occasion identifier (e.g. 'christmas', 'birthday', 'custom')
 * @param {string} [params.eventType] - Event type (e.g. 'anniversary', 'milestone')
 * @param {string} [params.eventTitle] - Celebration title
 * @param {string} [params.selectedDate] - Date string (YYYY-MM-DD or formatted)
 * @param {string} [params.customNote] - Draft note if any
 * @param {string} [params.vibe='heartfelt'] - Tone
 * @returns {Promise<{ greeting: string, body: string, closing: string, letter: string, source: 'ai'|'curated', success: boolean }>}
 */
export async function generateKeepsakeLetter(params = {}) {
    const {
        recipientName = '',
        occasion = 'christmas',
        eventType = '',
        eventTitle = '',
        selectedDate = '',
        customNote = '',
        vibe = 'heartfelt'
    } = params;

    const payload = {
        recipientName,
        occasion,
        eventType,
        eventTitle,
        selectedDate,
        customNote,
        vibe
    };

    try {
        const resp = await fetch('/api/letter/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!resp.ok) {
            throw new Error(`Server returned status: ${resp.status}`);
        }

        const data = await resp.json();
        if (data && data.success && data.letter) {
            return {
                greeting: data.greeting || '',
                body: data.body || '',
                closing: data.closing || '',
                letter: data.letter.trim(),
                source: data.source || 'ai',
                success: true
            };
        }

        throw new Error('Invalid or empty letter payload received');
    } catch (_) {
        // Fall back gracefully to curated client keepsake letter

        const name = (recipientName && recipientName.trim()) ? recipientName.trim() : 'Someone Special';
        const when = (selectedDate && selectedDate.trim()) ? `on ${selectedDate.trim()}` : 'today and always';
        const displayOccasion = eventTitle || eventType || occasion;

        const body = `Celebrating ${displayOccasion} with you ${when} fills my heart with genuine gratitude. Thank you for bringing so much brightness, laughter, and warmth into every single day. Wishing you endless happiness, boundless joy, and sweetest memories!`;
        const letter = `Dearest ${name},\n\n${body}\n\nWith all my love and warmest wishes ❤️`;

        return {
            greeting: `Dearest ${name},`,
            body,
            closing: 'With all my love and warmest wishes ❤️',
            letter,
            source: 'curated',
            success: true
        };
    }
}
