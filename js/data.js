// ============================================================
//  DATA.JS — Edit all content from here
//  quotes, photos, mood responses, game config, transitions
// ============================================================

// ── RANDOM QUOTES (shown on page refresh / header) ──────────
export const randomQuotes = [
  "Bocil, tugasnya emang banyak… tapi kamu nggak harus kuat 24/7 😭🤏",
  "One task at a time, okay? Kamu bukan robot.",
  "Capek boleh, nyerah jangan dulu. Rebahan 10 menit masih legal.",
  "Semester 3 emang lagi boss level, but look at you… masih bertahan.",
  "You're doing better than you think.",
  "Pelan-pelan aja, Bocil. Dunia nggak akan marah kalau kamu istirahat.",
  "Tugasnya banyak, tapi kamu lebih banyak kuatnya.",
  "Today's mission: survive, hydrate, dan jangan lupa napas.",
  "Bocil is tired, but Bocil is still iconic.",
  "It's okay to not be okay. Then get back up anyway.",
  "Semester 3 lagi nyoba ngetes kesabaran Bocil ya? Honestly, rude.",
  "You and your tiny remaining energy got this.",
  "Rest is not giving up. It's loading the next move.",
  "Kamu boleh nangis. Terus lanjut. Dua-duanya valid.",
  "Semester 3: brutal. Bocil: still standing. Math checks out.",
];

// ── PAGE TRANSITION MESSAGES ─────────────────────────────────
export const transitionMessages = [
  "Loading next level of Bocil's survival journey…",
  "Wait… taking Bocil to the next checkpoint ✨",
  "New page unlocked because Bocil is still surviving 😭🤏",
  "Satu langkah lagi. Bocil bisa.",
  "Hang on, preparing something for you…",
  "Almost there. Just like your deadlines. Almost. 😭",
  "Loading… sama kayak otak Bocil habis ngerjain tugas.",
  "Next stop: emotional support. Please stand by.",
  "Scanning for Bocil's energy levels… found: still going 💪",
];

// ── PHOTOS CONFIGURATION ─────────────────────────────────────
// Add/remove photos here. Place files in assets/photos/
// caption: short text shown on hover
// closingCaption: max 5 words for the box reveal (page 7)
export const photos = [
  {
    src: "assets/photos/photo1.jpeg",
    caption: "still cute while surviving.",
    closingCaption: "You've got this, Bocil.",
    rotation: -3,
  },
  {
    src: "assets/photos/photo2.jpeg",
    caption: "Bocil detected.",
    closingCaption: "Pelan-pelan juga tetap maju.",
    rotation: 2,
  },
  {
    src: "assets/photos/photo3.jpeg",
    caption: "proof of existence.",
    closingCaption: "Rest dulu, warrior kecil.",
    rotation: -2,
  },
  {
    src: "assets/photos/photo4.jpeg",
    caption: "semester 3 survivor.",
    closingCaption: "Masih kuat, jangan lupa.",
    rotation: 3,
  },
  {
    src: "assets/photos/photo5.jpeg",
    caption: "main character moment.",
    closingCaption: "One task at a time.",
    rotation: -1,
  },
  {
    src: "assets/photos/photo6.png",
    caption: "tired but iconic.",
    closingCaption: "Bocil never gives up.",
    rotation: 2,
  },
];

// ── MOOD RESPONSES ───────────────────────────────────────────
export const moodResponses = {
  tired: {
    emoji: "😩",
    label: "cape banget",
    lines: [
      "Bocil, istirahat itu bukan berarti kalah.",
      "Your body is asking for a break, not giving up.",
      "Rebahan 10 menit? Legal. Approved. Bahkan dianjurkan.",
      "You've been carrying a lot. It's okay to put it down for a sec.",
    ],
    color: "#f9c5d1",
  },
  brainrot: {
    emoji: "🫠",
    label: "otak udah bubar",
    lines: [
      "Silakan reboot dulu.",
      "Minum air. Tarik napas. Baru kita lawan semester 3 lagi 😭",
      "Otak bubar itu normal. Terutama di semester 3.",
      "Step 1: close all the tabs. Step 2: breathe. Step 3: you got this.",
    ],
    color: "#d4c5f9",
  },
  overwhelmed: {
    emoji: "😵",
    label: "tugas nggak habis-habis",
    lines: [
      "Tugas boleh banyak.",
      "Tapi kamu kerjainnya satu-satu. Jangan dimakan semua sekaligus 😭",
      "Pick ONE thing. Just one. The rest can wait.",
      "Semester 3 punya banyak tugas, tapi kamu juga punya banyak kemampuan.",
    ],
    color: "#ffd6a5",
  },
  giveup: {
    emoji: "🥹",
    label: "pengen nyerah dikit",
    lines: [
      "Gapapa nyerah 5 menit.",
      "Habis itu balik lagi jadi Bocil yang nyebelin tapi kuat.",
      "Mau nangis? Go ahead. Seriously, it helps.",
      "Nyerah sebentar bukan berarti berhenti. Itu namanya istirahat.",
    ],
    color: "#b5ead7",
  },
  needhype: {
    emoji: "😶",
    label: "cuma butuh semangat",
    lines: [
      "Here it is.",
      "You've got this, Bocil.",
      "Semester 3 threw everything at you and you're STILL here.",
      "That's not just surviving. That's winning.",
    ],
    color: "#ffc8dd",
  },
};

// ── GAME CONFIGURATION ────────────────────────────────────────
export const gameConfig = {
  duration: 30,        // seconds
  spawnRate: 1200,     // ms between spawns
  itemFallSpeed: 3,    // seconds to fall
  goodItems: [
    { emoji: "✨", label: "energi",       points: 10 },
    { emoji: "☕", label: "kopi",         points: 15 },
    { emoji: "🍪", label: "snack",        points: 12 },
    { emoji: "💗", label: "semangat",     points: 10 },
    { emoji: "⭐", label: "motivasi",     points: 10 },
    { emoji: "🫂", label: "virtual hug",  points: 20 },
  ],
  badItems: [
    { emoji: "📚", label: "tugas dadakan",   points: -15 },
    { emoji: "📅", label: "deadline",        points: -15 },
    { emoji: "😵", label: "overthinking",   points: -10 },
    { emoji: "⏰", label: "tugas jam 11 malam", points: -20 },
  ],
  highScoreMessages: [
    "ENERGY RESTORED! 🔋",
    "Bocil berhasil bertahan dari serangan semester 3.",
    "Look at you catching vibes and dodging deadlines. iconic.",
    "Full energy! Semester 3 doesn't stand a chance.",
  ],
  lowScoreMessages: [
    "It's okay 😭",
    "Apparently semester 3 punya cheat code.",
    "Tapi Bocil masih boleh coba lagi.",
    "Even the score is tired. We love that for us.",
  ],
};

// ── EASTER EGGS ───────────────────────────────────────────────
export const easterEggs = {
  star:   "+1 emotional support ⭐",
  cloud:  "Reminder: napas dulu ☁️",
  heart:  "Bocil unlocked: tiny happiness 💗",
  coffee: "caffeine = survival fuel ☕",
  book:   "knowledge hurts sometimes 📚",
};
