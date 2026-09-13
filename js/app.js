// ============================================================
//  APP.JS — Core navigation, transitions, progress, easter eggs
// ============================================================
import { randomQuotes, transitionMessages, easterEggs } from './data.js';
import { initGallery }    from './page-gallery.js';
import { initMood }       from './page-mood.js';
import { initGame }       from './page-game.js';
import { initBox }        from './page-box.js';
import { initRealityCheck } from './page-reality.js';

// ── STATE ─────────────────────────────────────────────────────
let currentPage = 0;
const TOTAL_PAGES = 7;
let musicPlaying = false;
let audio = null;

// Pages in order
const PAGE_IDS = [
  'page-welcome',
  'page-before',
  'page-reality',
  'page-gallery',
  'page-mood',
  'page-game',
  'page-box',
];

// ── DOM REFS (populated after DOMContentLoaded) ───────────────
let progressFill, progressLabel, transitionOverlay, transitionMsg;
let musicBtn, quoteTicker, easterToast;

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  progressFill      = document.getElementById('progress-fill');
  progressLabel     = document.getElementById('progress-label');
  transitionOverlay = document.getElementById('transition-overlay');
  transitionMsg     = document.getElementById('transition-msg');
  musicBtn          = document.getElementById('music-btn');
  quoteTicker       = document.getElementById('quote-ticker');
  easterToast       = document.getElementById('easter-toast');

  quoteTicker.style.transition = 'opacity 0.4s ease';

  showPage(0, false);
  rotateQuote();
  setInterval(rotateQuote, 12000);
  initPageListeners();
  initMusicBtn();
  initEasterEggs();
  initGallery();
  initMood();
  initGame();
  initBox();
  initRealityCheck();
});

// ── SHOW PAGE ─────────────────────────────────────────────────
export function showPage(index, animate = true) {
  if (animate) {
    doTransition(() => _activatePage(index));
  } else {
    _activatePage(index);
  }
}

function _activatePage(index) {
  // hide all
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // show target
  const target = document.getElementById(PAGE_IDS[index]);
  if (target) {
    target.classList.add('active');
    currentPage = index;
    updateProgress();
    window.scrollTo(0, 0);

    // trigger page-specific onEnter hooks
    if (index === 1) window.dispatchEvent(new Event('enter-before'));
    if (index === 2) window.dispatchEvent(new Event('enter-reality'));
    if (index === 3) window.dispatchEvent(new Event('enter-gallery'));
    if (index === 6) window.dispatchEvent(new Event('enter-box'));
  }
}

// ── TRANSITION ────────────────────────────────────────────────
function doTransition(callback) {
  const msg = randomPick(transitionMessages);
  transitionMsg.textContent = msg;
  transitionOverlay.classList.add('show');

  setTimeout(() => {
    callback();
    setTimeout(() => {
      transitionOverlay.classList.remove('show');
    }, 350);
  }, 1100);
}

// ── PROGRESS ─────────────────────────────────────────────────
function updateProgress() {
  const pct = Math.round((currentPage / (TOTAL_PAGES - 1)) * 100);
  progressFill.style.width = pct + '%';
  progressLabel.textContent = `Bocil's survival progress: ${pct}%`;
}

// ── QUOTE TICKER ──────────────────────────────────────────────
function rotateQuote() {
  const q = randomPick(randomQuotes);
  quoteTicker.style.opacity = '0';
  setTimeout(() => {
    quoteTicker.textContent = q;
    quoteTicker.style.opacity = '1';
  }, 400);
}

// ── PAGE BUTTON LISTENERS ─────────────────────────────────────
function initPageListeners() {
  // Page 1 → 2
  document.getElementById('btn-tired').addEventListener('click', () => {
    const reply = document.getElementById('welcome-reply');
    reply.classList.add('show');
    setTimeout(() => showPage(1), 1200);
  });

  // Page 2 → 3
  document.getElementById('btn-before-continue').addEventListener('click', () => showPage(2));

  // Page 3 → 4
  document.getElementById('btn-reality-next').addEventListener('click', () => showPage(3));

  // Page 4 → 5
  document.getElementById('btn-gallery-next').addEventListener('click', () => showPage(4));

  // Page 5 → 6
  document.getElementById('btn-mood-next').addEventListener('click', () => showPage(5));

  // Page 6 → 7
  document.getElementById('btn-game-next').addEventListener('click', () => showPage(6));

  // Page 7 final button
  document.getElementById('btn-final').addEventListener('click', () => {
    const reply = document.getElementById('final-reply');
    reply.classList.add('show');
    launchConfetti();
    setTimeout(() => {
      reply.innerHTML = 'Good choice.<br>Now go survive semester 3 😭🤏';
    }, 100);
  });

  // Trigger big-reveal when page 2 is shown
  window.addEventListener('enter-before', () => {
    const el = document.querySelector('#page-before .big-reveal');
    if (el) {
      el.classList.remove('show');
      setTimeout(() => el.classList.add('show'), 450);
    }
  });
}

// ── MUSIC ─────────────────────────────────────────────────────
function initMusicBtn() {
  musicBtn.addEventListener('click', toggleMusic);
}

function toggleMusic() {
  if (!audio) {
    // Use a gentle lofi beep pattern generated by Web Audio API
    playGenerativeMusic();
    return;
  }
  if (musicPlaying) {
    audio.pause();
    musicPlaying = false;
    musicBtn.innerHTML = '🎵 tiny background vibes';
  } else {
    audio.play();
    musicPlaying = true;
    musicBtn.innerHTML = '🔇 pause vibes';
  }
}

function playGenerativeMusic() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25]; // C D E G A C
    let i = 0;

    function playNote() {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = notes[i % notes.length];
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.2);
      i++;
    }

    let interval = setInterval(playNote, 1400);
    playNote();
    musicPlaying = true;
    musicBtn.innerHTML = '🔇 pause vibes';

    // Store a fake audio object to control
    audio = {
      pause: () => { clearInterval(interval); ctx.suspend(); },
      play: () => { ctx.resume(); interval = setInterval(playNote, 1400); },
    };
  } catch (e) {
    showToast('music tidak tersedia di browser ini 😢');
  }
}

// ── EASTER EGGS ───────────────────────────────────────────────
function initEasterEggs() {
  document.querySelectorAll('[data-easter]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const key = el.dataset.easter;
      const msg = easterEggs[key] || '+1 happiness';
      showToast(msg);
    });
  });
}

export function showToast(msg) {
  easterToast.textContent = msg;
  easterToast.classList.add('show');
  setTimeout(() => easterToast.classList.remove('show'), 2400);
}

// ── CONFETTI ──────────────────────────────────────────────────
export function launchConfetti() {
  const colors = ['#a8c5a0','#7fa8c9','#c97b5a','#f5e6a3','#e8c4b0','#c5dced','#d4e8d0','#e8b49a'];
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-particle';
    el.style.cssText = `
      left: ${Math.random() * 100}vw;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      width: ${6 + Math.random() * 8}px;
      height: ${6 + Math.random() * 8}px;
      animation-duration: ${1.5 + Math.random() * 2}s;
      animation-delay: ${Math.random() * 0.5}s;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }
}

// ── UTILS ─────────────────────────────────────────────────────
export function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
