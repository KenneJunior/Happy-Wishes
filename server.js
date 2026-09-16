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

// --------------------------------------------------------------------------
// Rich Curated Structured Data Bank (Fallbacks and Offline Library)
// --------------------------------------------------------------------------
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
    try {
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

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
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
          }
        }
      });

      const responseText = response.text ? response.text.trim() : '';
      if (responseText) {
        const parsed = JSON.parse(responseText);
        if (Array.isArray(parsed.wishes) && parsed.wishes.length > 0) {
          return res.json({
            success: true,
            source: 'ai',
            title: parsed.title || `${nameToUse}'s Special Wishes ✨`,
            tagPrefix: parsed.tagPrefix || 'Wish',
            wishes: parsed.wishes
          });
        }
      }
    } catch (err) {
      console.warn('Gemini wish generation encountered issue, falling back to curated bank:', err.message);
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
