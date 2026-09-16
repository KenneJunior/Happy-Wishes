/**
 * Wish API Client Service
 * Encapsulates network communication with `/api/wishes/generate`,
 * payload construction, response parsing, and client fallback generation.
 */

/**
 * Requests freshly generated or curated wishes for a given occasion/event.
 * @param {Object} params
 * @param {string} params.occasion - Occasion identifier (e.g. 'valentine', 'birthday')
 * @param {string} [params.eventType] - Event type identifier (e.g. 'graduation', 'milestone')
 * @param {string} [params.eventTitle] - Custom event title
 * @param {string} [params.recipientName] - Name of recipient
 * @param {string} [params.customNote] - Optional keepsake note
 * @param {string} [params.vibe='heartfelt'] - Vibe tone
 * @returns {Promise<{ wishes: string[], source: 'ai'|'curated', success: boolean }>}
 */
export async function generateWishes(params = {}) {
    const {
        occasion = 'christmas',
        eventType = '',
        eventTitle = '',
        recipientName = '',
        customNote = '',
        vibe = 'heartfelt'
    } = params;

    const payload = {
        occasion,
        eventType,
        eventTitle,
        recipientName,
        customNote,
        vibe
    };

    try {
        const resp = await fetch('/api/wishes/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!resp.ok) {
            throw new Error(`Server returned status: ${resp.status}`);
        }

        const data = await resp.json();
        if (data && data.success && Array.isArray(data.wishes) && data.wishes.length > 0) {
            const normalizedWishes = data.wishes.map(w => (typeof w === 'object' && w !== null && w.text) ? w.text : String(w));
            return {
                wishes: normalizedWishes,
                source: data.source || 'ai',
                success: true
            };
        }

        throw new Error('Invalid or empty wishes payload received');
    } catch (_) {
        // Fall back gracefully to curated client wish options

        const clientFallbacks = [
            recipientName 
                ? `May every step you take bring you closer to your deepest dreams, ${recipientName}! Keep shining brilliantly!`
                : `May every step you take bring you closer to your deepest dreams! Keep shining brilliantly!`,
            `Here's to laughing until your cheeks hurt, dreaming with courage, and cherishing every sweet memory.`,
            recipientName
                ? `Never doubt how deeply loved and appreciated you are, ${recipientName}!`
                : `Never doubt how deeply loved and appreciated you are!`,
            `Sending you infinite warmth, endless sparkle, and happiness that overflows today and always.`
        ];

        return {
            wishes: clientFallbacks,
            source: 'curated',
            success: true
        };
    }
}
