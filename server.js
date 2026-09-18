import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient = null;
function getAIClient() {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Candidate models in order of priority: primary latest model, followed by high-throughput lite model
const CANDIDATE_MODELS = ['gemini-3.8-flash', 'gemini-3.1-flash-lite'];

async function executeGeminiWithFallback(ai, prompt, responseSchema) {
  for (const model of CANDIDATE_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema
        }
      });
      const responseText = response.text ? response.text.trim() : '';
      if (responseText) {
        const parsed = JSON.parse(responseText);
        if (parsed) return parsed;
      }
    } catch (_) {
      // Continue to candidate fallback model (e.g. gemini-3.1-flash-lite)
      continue;
    }
  }
  return null;
}
const CURATED_WISHES_BANK = {
  valentine: [
    { text: "Your smile has an effortless way of turning my most chaotic days into pure peace.", tag: "Reason to Love" },
    { text: "In a world of billions of souls, you are my favorite discovery and greatest adventure.", tag: "Deep Affection" },
    { text: "The way your eyes light up when you speak about things you love inspires me endlessly.", tag: "Pure Charm" },
    { text: "With you, even the quietest silence feels like the warmest, safest home.", tag: "Heart & Soul" },
    { text: "Your kindness isn't just something you do; it's the radiant heart of who you are.", tag: "Sweet Compliment" },
    { text: "Every song about love makes complete sense the second I think of you.", tag: "Romantic Melody" },
    { text: "Thank you for being my anchor in storms, my laughter on good days, and my favorite hello.", tag: "Forever Grateful" },
    { text: "Loving you is as natural and vital as drawing my next breath.", tag: "Unconditional" }
  ],
  christmas: [
    { text: "May your holidays be wrapped in sweet cocoa, soft firelight, and laughter that echoes for days.", tag: "Cozy Holiday" },
    { text: "You bring more sparkle and true warmth into my life than a thousand Christmas trees combined.", tag: "Holiday Magic" },
    { text: "Wishing you peaceful nights, gentle snowfalls, and a heart overflowing with gratitude.", tag: "Peace & Joy" },
    { text: "The greatest gift beneath any tree will always be the joy of celebrating with you.", tag: "True Treasure" },
    { text: "May the nostalgic wonder of this magical season recharge your soul for the year ahead.", tag: "Winter Blessing" },
    { text: "Here's to warm gingerbread, endless cozy blankets, and memories that last a lifetime.", tag: "Holiday Cheer" }
  ],
  newyear: [
    { text: "May this upcoming year open doors you never even knew existed and reward your courage.", tag: "Breakthrough" },
    { text: "Cheers to 365 fresh chances to pursue your passions, laugh louder, and dream without limits.", tag: "Fresh Horizon" },
    { text: "You have all the resilience and brilliance needed to make this chapter your most victorious yet.", tag: "Unstoppable" },
    { text: "May each morning greet you with clarity, energy, and reasons to be proud of who you are.", tag: "New Dawn" },
    { text: "To daring dreams, sudden breakthroughs, and celebrating every small victory along the way!", tag: "Midnight Toast" }
  ],
  easter: [
    { text: "May this season of renewal bloom with fresh hope, gentle peace, and bright sunny mornings.", tag: "Spring Renewal" },
    { text: "Just like springtime awakens nature, may new opportunities blossom beautifully in your life.", tag: "Blooms & Hope" },
    { text: "Wishing you a basket overflowing with sweet moments, colorful surprises, and heartfelt joy.", tag: "Spring Sunshine" },
    { text: "May your heart feel as light, free, and hopeful as a bird singing at the first light of dawn.", tag: "Gentle Peace" }
  ],
  birthday: [
    { text: "May this new orbit around the sun bring you vibrant health, wild adventures, and deep joy!", tag: "New Chapter" },
    { text: "The universe became infinitely more interesting, kinder, and funnier the day you arrived.", tag: "Birthday Star" },
    { text: "May every single wish you blow out today quietly conspire to come true this year.", tag: "Candle Wish" },
    { text: "You grow wiser, more radiant, and more inspiring with every passing year. Celebrate big!", tag: "Ever Radiant" },
    { text: "Here's to unlimited cake, laughter until your cheeks ache, and love surrounding you all day!", tag: "Party Time" }
  ],
  anniversary: [
    { text: "Every day spent walking side by side with you confirms that true love only grows deeper with time.", tag: "Timeless Bond" },
    { text: "Cheers to the shared laughter, the quiet victories, and the beautiful story we are writing together.", tag: "Our Journey" },
    { text: "You are still the one I look for in every room, and the one I choose today, tomorrow, and forever.", tag: "Endless Devotion" },
    { text: "Thank you for making ordinary days feel like poetry and our love feel like home.", tag: "Sweet Harmony" },
    { text: "Happy Anniversary! Here's to multiplying our sweetest memories year after year.", tag: "Milestone Celebration" }
  ],
  graduation: [
    { text: "Your hard work, late nights, and grit have brought you to this magnificent milestone! So proud!", tag: "Proud Moment" },
    { text: "The diploma is just the proof; your passion and determination are the true superpowers.", tag: "Future Leader" },
    { text: "Step boldly into the world—your potential is boundless and your future is shining bright.", tag: "Wings to Fly" },
    { text: "Never lose the curiosity that brought you here. The world is waiting for your brilliant ideas.", tag: "Commencement" }
  ],
  promotion: [
    { text: "Congratulations on your well-deserved promotion! Your dedication and talent made this inevitable.", tag: "Career Win" },
    { text: "Here's to rising to new heights, conquering big challenges, and leading with excellence!", tag: "Next Level" },
    { text: "Your perseverance inspires everyone around you. Cheers to the exciting journey ahead!", tag: "Victory" }
  ],
  newhome: [
    { text: "May the walls of your new home witness endless laughter, warm gatherings, and sweet peace.", tag: "Home Sweet Home" },
    { text: "Keys in hand, memories waiting to be made! Wishing you pure comfort in your new sanctuary.", tag: "Fresh Sanctuary" },
    { text: "Here's to cozy nights, morning sun through new windows, and planting roots in happiness.", tag: "Housewarming" }
  ],
  friendship: [
    { text: "Having you as my friend is like carrying around a pocket of permanent sunshine.", tag: "True Friend" },
    { text: "Thank you for listening without judgment, laughing at my worst jokes, and always having my back.", tag: "Invaluable Bond" },
    { text: "Friendships like ours are rare gems; grateful every single day for our shared adventures.", tag: "Bestie Love" }
  ],
  milestone: [
    { text: "Milestones like this remind us of how far you have traveled and how strong you truly are.", tag: "Strength & Honor" },
    { text: "Take a moment to pause and celebrate: you aimed high, worked hard, and made it happen!", tag: "Champion" },
    { text: "May this triumph be the foundation for an even more exhilarating next chapter.", tag: "Great Heights" }
  ],
  custom: [
    { text: "Celebrating this unforgettable milestone with you and cheering for all the beauty still ahead!", tag: "Special Tribute" },
    { text: "Today is proof that dreams backed by passion and dedication always find a way to reality.", tag: "Grand Triumph" },
    { text: "Wishing you a celebration that fills your heart to the brim with pride, love, and sweet memories.", tag: "Pure Joy" },
    { text: "Every step you took to get here was worth it. Bask in the glory of this wonderful occasion!", tag: "Radiant Day" }
  ]
};

// --------------------------------------------------------------------------
// API: Generate / Fetch Fresh Seasonal Compliments & Wishes
// --------------------------------------------------------------------------
app.post('/api/wishes/generate', async (req, res) => {
  const {
    occasion = 'valentine',
    eventType = '',
    eventTitle = '',
    recipientName = '',
    customNote = '',
    vibe = 'sweet'
  } = req.body || {};

  const nameToUse = (recipientName && recipientName.trim()) ? recipientName.trim() : 'Someone Special';
  const effectiveOccasion = (eventType && CURATED_WISHES_BANK[eventType]) ? eventType : occasion;

  // Try Gemini AI if API key is available
  const ai = getAIClient();
  if (ai) {
    const prompt = `You are a thoughtful, eloquent master of celebration greetings and compliments.
Create 6 to 8 fresh, diverse, deeply touching, and highly original seasonal wishes or sweet reasons/compliments.
Occasion: ${occasion}
Event Type / Theme: ${eventType || occasion}
Specific Celebration Title: ${eventTitle || occasion}
Recipient Name: ${nameToUse}
Personal Note context (if any): "${customNote}"
Vibe: ${vibe} (warm, uplifting, sincere, creative, non-generic)

Return a strictly valid JSON object matching this schema:
{
  "title": "A short engaging headline like 'Anniversary Reasons & Wishes 💍'",
  "tagPrefix": "A short tag prefix like 'Sweet Reason' or 'Milestone Wish'",
  "wishes": [
    {
      "text": "The full compliment or heartfelt wish (1-2 sentences)",
      "tag": "A creative 1-3 word pill tag like 'Endless Joy' or 'Proud Moment'"
    }
  ]
}`;

    const wishesSchema = {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        tagPrefix: { type: Type.STRING },
        wishes: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING },
              tag: { type: Type.STRING }
            },
            required: ['text', 'tag']
          }
        }
      },
      required: ['title', 'tagPrefix', 'wishes']
    };

    const parsed = await executeGeminiWithFallback(ai, prompt, wishesSchema);
    if (parsed && Array.isArray(parsed.wishes) && parsed.wishes.length > 0) {
      return res.json({
        success: true,
        source: 'ai',
        title: parsed.title || `${nameToUse}'s Special Wishes ✨`,
        tagPrefix: parsed.tagPrefix || 'Wish',
        wishes: parsed.wishes
      });
    }
  }

  // Curated Fallback with dynamic shuffling and name insertion
  const bank = CURATED_WISHES_BANK[effectiveOccasion] ||
               CURATED_WISHES_BANK[occasion] ||
               CURATED_WISHES_BANK.custom;

  // Shuffle and pick 6 items
  const shuffled = [...bank].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 6).map((item, idx) => {
    let personalizedText = item.text;
    if (nameToUse && nameToUse !== 'Someone Special' && idx === 0) {
      personalizedText = `${nameToUse}, ${personalizedText.charAt(0).toLowerCase()}${personalizedText.slice(1)}`;
    }
    return {
      text: personalizedText,
      tag: item.tag || `Wish #${idx + 1}`
    };
  });

  const celebrationLabel = eventTitle || (eventType ? eventType.charAt(0).toUpperCase() + eventType.slice(1) : occasion);

  return res.json({
    success: true,
    source: 'curated',
    title: `${celebrationLabel} Wishes & Compliments ✨`,
    tagPrefix: 'Curated Wish',
    wishes: selected
  });
});

// Also support GET for quick health/preview
app.get('/api/wishes/fresh', (req, res) => {
  const occasion = req.query.occasion || 'custom';
  const bank = CURATED_WISHES_BANK[occasion] || CURATED_WISHES_BANK.custom;
  res.json({
    success: true,
    source: 'curated',
    count: bank.length,
    wishes: bank
  });
});

// --------------------------------------------------------------------------
// API: Generate Heartfelt Keepsake Letter using Gemini AI
// --------------------------------------------------------------------------
const OCCASION_TITLES = {
  valentine: "Valentine's Day",
  christmas: "Christmas",
  newyear: "New Year",
  easter: "Easter",
  birthday: "Birthday",
  anniversary: "Anniversary",
  custom: "Special Celebration"
};

const CELEBRATION_TITLES = {
  birthday: "Birthday",
  anniversary: "Anniversary",
  graduation: "Graduation Day",
  promotion: "Job Promotion",
  newhome: "New Home",
  friendship: "Best Friends Day",
  milestone: "Major Milestone",
  love: "Our Love Story",
  other: "Special Celebration"
};

function generateCuratedLetter({ recipient, occasion, eventType, eventTitle, dateStr }) {
  const name = (recipient && recipient.trim()) ? recipient.trim() : 'Someone Special';
  const displayOccasion = eventTitle || CELEBRATION_TITLES[eventType] || OCCASION_TITLES[occasion] || 'Celebration';
  const when = (dateStr && dateStr.trim()) ? `on ${dateStr.trim()}` : 'today and always';

  if (occasion === 'valentine' || eventType === 'love') {
    const body = `As Valentine's Day arrives ${when}, my heart is filled with pure gratitude for you. Walking through life by your side makes every ordinary day feel like poetry and every dream feel within reach. Thank you for filling my world with so much warmth, laughter, and effortless magic.`;
    return {
      greeting: `Dearest ${name},`,
      body,
      closing: `With all my heart and endless love ❤️`,
      fullLetter: `Dearest ${name},\n\n${body}\n\nWith all my heart and endless love ❤️`
    };
  }

  if (occasion === 'birthday' || eventType === 'birthday') {
    const body = `Happy Birthday! Celebrating your wonderful presence ${when} is the easiest reason to smile. May your new orbit around the sun bring you vibrant health, daring adventures, and laughter that echoes every single day. The world is infinitely brighter because you are in it!`;
    return {
      greeting: `Dearest ${name},`,
      body,
      closing: `Wishing you the happiest birthday ever 🎂✨`,
      fullLetter: `Dearest ${name},\n\n${body}\n\nWishing you the happiest birthday ever 🎂✨`
    };
  }

  if (occasion === 'anniversary' || eventType === 'anniversary') {
    const body = `Happy Anniversary! Commemorating our journey ${when} reminds me how wondrous our love continues to be. Through every shared smile, quiet victory, and gentle chapter, my devotion to you only grows deeper, stronger, and more true. Here is to our sweetest memories and every milestone still ahead!`;
    return {
      greeting: `Dearest ${name},`,
      body,
      closing: `Forever and always yours 💍❤️`,
      fullLetter: `Dearest ${name},\n\n${body}\n\nForever and always yours 💍❤️`
    };
  }

  if (occasion === 'christmas') {
    const body = `Merry Christmas! As the holiday warmth and twinkling lights gather ${when}, I want to send you my deepest affection. May your home be wrapped in cozy firelight, peace, and sweet memories with the ones you love most. Thank you for being the brightest gift of all.`;
    return {
      greeting: `Dearest ${name},`,
      body,
      closing: `With all my warmest holiday love 🎄✨`,
      fullLetter: `Dearest ${name},\n\n${body}\n\nWith all my warmest holiday love 🎄✨`
    };
  }

  if (occasion === 'newyear') {
    const body = `Happy New Year! Greet this fresh chapter ${when} with fearless optimism and an open heart. You have all the resilience and brilliance needed to make this your most triumphant year yet. May every sunrise bring you bold dreams, good health, and abundant joy!`;
    return {
      greeting: `Dearest ${name},`,
      body,
      closing: `Cheers to our brightest year ahead 🎆🥂`,
      fullLetter: `Dearest ${name},\n\n${body}\n\nCheers to our brightest year ahead 🎆🥂`
    };
  }

  if (occasion === 'easter') {
    const body = `Happy Easter! As springtime blooms ${when}, may your heart feel as light, free, and hopeful as the morning sun. Wishing you fresh beginnings, sweet chocolate moments, and serene peace in everything you do. Thank you for sharing your gentle light with me.`;
    return {
      greeting: `Dearest ${name},`,
      body,
      closing: `Warm springtime love and hugs 🐣🌸`,
      fullLetter: `Dearest ${name},\n\n${body}\n\nWarm springtime love and hugs 🐣🌸`
    };
  }

  const body = `Celebrating ${displayOccasion} with you ${when} fills my heart with immense happiness. Every step you took to reach this moment is a testament to your spirit and perseverance. May this milestone be the launchpad for your most rewarding and joyful chapter yet!`;
  return {
    greeting: `Dearest ${name},`,
    body,
    closing: `With boundless admiration and warmest wishes ✨🥂`,
    fullLetter: `Dearest ${name},\n\n${body}\n\nWith boundless admiration and warmest wishes ✨🥂`
  };
}

app.post('/api/letter/generate', async (req, res) => {
  const {
    recipientName = '',
    occasion = 'christmas',
    eventType = '',
    eventTitle = '',
    selectedDate = '',
    customNote = '',
    vibe = 'heartfelt'
  } = req.body || {};

  const nameToUse = (recipientName && recipientName.trim()) ? recipientName.trim() : 'Someone Special';
  const occasionName = (eventTitle && eventTitle.trim())
    ? eventTitle.trim()
    : (eventType && CELEBRATION_TITLES[eventType])
      ? CELEBRATION_TITLES[eventType]
      : (OCCASION_TITLES[occasion] || occasion);

  // Format the date if provided
  let formattedDate = selectedDate;
  if (selectedDate && typeof selectedDate === 'string') {
    try {
      const parts = selectedDate.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        if (!isNaN(d.getTime())) {
          formattedDate = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        }
      } else {
        const d = new Date(selectedDate);
        if (!isNaN(d.getTime())) {
          formattedDate = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        }
      }
    } catch (_) {}
  }

  const ai = getAIClient();
  if (ai) {
    const prompt = `You are an eloquent writer of heartfelt keepsake letters and personal holiday / celebration notes.
Write an authentic, deeply touching, and memorable keepsake letter for a greeting card with the following details:
- Recipient Name: ${nameToUse}
- Occasion / Celebration: ${occasionName}
- Selected Date / Target Milestone Date: ${formattedDate || 'this special milestone'}
- Personal context / Draft note: "${customNote || ''}"
- Desired Vibe: ${vibe}, sincere, warm, poetic yet authentic, emotionally resonant

Requirements:
1. Write 2 to 3 concise, beautifully written paragraphs (total length around 280-450 characters / 50-80 words).
2. Directly reference the recipient (${nameToUse}), the celebration (${occasionName}), and the significance of the date (${formattedDate || 'this moment'}).
3. Do NOT use markdown symbols like asterisks (**) or bullet points, so it reads like genuine handwritten parchment.
4. Keep the greeting warm (e.g. "Dearest ${nameToUse}," or "Happy ${occasionName}, ${nameToUse}!") and closing sweet (e.g. "With all my love and warmest wishes ❤️").

Return a strictly valid JSON object matching this schema:
{
  "greeting": "Dearest ${nameToUse},",
  "body": "The heartfelt paragraphs...",
  "closing": "With all my love & heart ❤️",
  "letter": "Full combined letter ready to display"
}`;

    const letterSchema = {
      type: Type.OBJECT,
      properties: {
        greeting: { type: Type.STRING },
        body: { type: Type.STRING },
        closing: { type: Type.STRING },
        letter: { type: Type.STRING }
      },
      required: ['letter']
    };

    const parsed = await executeGeminiWithFallback(ai, prompt, letterSchema);
    if (parsed && parsed.letter && parsed.letter.trim().length > 0) {
      return res.json({
        success: true,
        source: 'ai',
        greeting: parsed.greeting || `Dearest ${nameToUse},`,
        body: parsed.body || parsed.letter,
        closing: parsed.closing || 'With all my love ❤️',
        letter: parsed.letter.trim()
      });
    }
  }

  // Curated Fallback Letter Generator (if API key missing or network failure)
  const fallbackLetter = generateCuratedLetter({
    recipient: nameToUse,
    occasion,
    eventType,
    eventTitle: occasionName,
    dateStr: formattedDate
  });

  return res.json({
    success: true,
    source: 'curated',
    greeting: fallbackLetter.greeting,
    body: fallbackLetter.body,
    closing: fallbackLetter.closing,
    letter: fallbackLetter.fullLetter
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', aiAvailable: Boolean(process.env.GEMINI_API_KEY) });
});

// Helper functions for flexible file resolution
const getIndexPath = () => {
  const rootIndex = path.join(__dirname, 'index.html');
  if (fs.existsSync(rootIndex)) return rootIndex;
  return path.join(__dirname, 'pages', 'index.html');
};

const getYesPagePath = () => {
  const pagesYes = path.join(__dirname, 'pages', 'yes_page.html');
  if (fs.existsSync(pagesYes)) return pagesYes;
  return path.join(__dirname, 'yes_page.html');
};

// Serve static files from organized directories
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));

// PWA explicit routes
app.get('/sw.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
  res.setHeader('Service-Worker-Allowed', '/');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.sendFile(path.join(__dirname, 'sw.js'));
});

app.get('/manifest.json', (req, res) => {
  res.setHeader('Content-Type', 'application/manifest+json; charset=UTF-8');
  res.sendFile(path.join(__dirname, 'manifest.json'));
});

// Direct static mounts for seamless fallback resolution
app.use(express.static(path.join(__dirname, 'pages'), { extensions: ['html'] }));
app.use(express.static(__dirname, { extensions: ['html'] }));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'js')));

// Route for root
app.get('/', (req, res) => {
  res.sendFile(getIndexPath());
});

// Route for yes_page
app.get('/yes_page', (req, res) => {
  res.sendFile(getYesPagePath());
});

// Fallback for any unknown route
app.get('*', (req, res) => {
  res.sendFile(getIndexPath());
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
