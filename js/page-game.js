// ============================================================
//  PAGE-GAME.JS — "Save Bocil's Energy" mini game (page 6)
// ============================================================
import { gameConfig } from './data.js';
import { randomPick, launchConfetti } from './app.js';

let gameRunning = false;
let score = 0;
let timeLeft = 0;
let spawnTimer = null;
let countdownTimer = null;
let moveLoopId = null;
let catcherX = 50; // percent

// Button hold state
const holding = { left: false, right: false };
const MOVE_SPEED = 1.8; // percent per frame

export function initGame() {
  const gameArea     = document.getElementById('game-area');
  const catcher      = document.getElementById('game-catcher');
  const scoreDisplay = document.getElementById('game-score-display');
  const timerDisplay = document.getElementById('game-timer-display');
  const splash       = document.getElementById('game-splash');
  const runningArea  = document.getElementById('game-running');
  const overScreen   = document.getElementById('game-over-screen');
  const startBtn     = document.getElementById('btn-start-game');
  const retryBtn     = document.getElementById('btn-retry-game');
  const btnLeft      = document.getElementById('btn-move-left');
  const btnRight     = document.getElementById('btn-move-right');

  // ── Start / Retry ──────────────────────────────────────────
  startBtn.addEventListener('click', startGame);
  retryBtn.addEventListener('click', startGame);

  // ── Mouse movement (desktop) ───────────────────────────────
  gameArea.addEventListener('mousemove', (e) => {
    if (!gameRunning) return;
    const rect = gameArea.getBoundingClientRect();
    catcherX = ((e.clientX - rect.left) / rect.width) * 100;
    clampAndUpdate(catcher);
  });

  // ── Touch drag on game area ────────────────────────────────
  gameArea.addEventListener('touchmove', (e) => {
    if (!gameRunning) return;
    // only handle drag if NOT pressing the control buttons
    if (holding.left || holding.right) return;
    e.preventDefault();
    const rect = gameArea.getBoundingClientRect();
    catcherX = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    clampAndUpdate(catcher);
  }, { passive: false });

  // ── D-Pad button controls ──────────────────────────────────
  // Helper to attach both mouse and touch events
  function holdButton(btn, direction) {
    const start = (e) => {
      e.preventDefault();
      holding[direction] = true;
    };
    const stop = (e) => {
      e.preventDefault();
      holding[direction] = false;
    };
    btn.addEventListener('mousedown',  start);
    btn.addEventListener('touchstart', start, { passive: false });
    btn.addEventListener('mouseup',    stop);
    btn.addEventListener('mouseleave', stop);
    btn.addEventListener('touchend',   stop);
    btn.addEventListener('touchcancel',stop);
  }

  holdButton(btnLeft,  'left');
  holdButton(btnRight, 'right');

  // ── Keyboard (bonus for desktop) ──────────────────────────
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft'  || e.key === 'a') holding.left  = true;
    if (e.key === 'ArrowRight' || e.key === 'd') holding.right = true;
  });
  document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft'  || e.key === 'a') holding.left  = false;
    if (e.key === 'ArrowRight' || e.key === 'd') holding.right = false;
  });

  // ── Move loop (runs every rAF while game is active) ────────
  function moveLoop() {
    if (gameRunning) {
      if (holding.left)  catcherX -= MOVE_SPEED;
      if (holding.right) catcherX += MOVE_SPEED;
      if (holding.left || holding.right) clampAndUpdate(catcher);
    }
    moveLoopId = requestAnimationFrame(moveLoop);
  }
  moveLoopId = requestAnimationFrame(moveLoop);

  // ── Start game ─────────────────────────────────────────────
  function startGame() {
    score = 0;
    timeLeft = gameConfig.duration;
    gameRunning = true;
    catcherX = 50;
    holding.left = holding.right = false;

    splash.style.display = 'none';
    overScreen.style.display = 'none';
    runningArea.style.display = 'block';
    document.getElementById('game-controls').style.display = 'flex';
    scoreDisplay.textContent = `⭐ ${score}`;
    timerDisplay.textContent = `⏱ ${timeLeft}s`;
    clampAndUpdate(catcher);

    gameArea.querySelectorAll('.falling-item').forEach(el => el.remove());

    clearInterval(spawnTimer);
    spawnTimer = setInterval(() => spawnItem(gameArea, scoreDisplay), gameConfig.spawnRate);

    clearInterval(countdownTimer);
    countdownTimer = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = `⏱ ${timeLeft}s`;
      if (timeLeft <= 0) endGame();
    }, 1000);
  }

  // ── End game ───────────────────────────────────────────────
  function endGame() {
    clearInterval(spawnTimer);
    clearInterval(countdownTimer);
    gameRunning = false;
    holding.left = holding.right = false;

    gameArea.querySelectorAll('.falling-item').forEach(el => el.remove());
    runningArea.style.display = 'none';
    document.getElementById('game-controls').style.display = 'none';

    const isHigh = score >= 80;
    const messages = isHigh ? gameConfig.highScoreMessages : gameConfig.lowScoreMessages;

    document.getElementById('result-score').textContent = score;
    document.getElementById('result-msg').textContent = randomPick(messages);
    overScreen.style.display = 'flex';

    if (isHigh) launchConfetti();
  }

} // end initGame

// ── Helpers ──────────────────────────────────────────────────
function clampAndUpdate(catcher) {
  catcherX = Math.max(5, Math.min(95, catcherX));
  catcher.style.left = catcherX + '%';
}

function spawnItem(gameArea, scoreDisplay) {
  if (!gameRunning) return;

  const allItems = [...gameConfig.goodItems, ...gameConfig.badItems];
  const item = randomPick(allItems);

  const el = document.createElement('div');
  el.className = 'falling-item';
  el.textContent = item.emoji;

  const leftPct = 5 + Math.random() * 90;
  el.style.left = leftPct + '%';
  el.style.animationDuration = `${gameConfig.itemFallSpeed + Math.random() * 1.5}s`;

  gameArea.appendChild(el);

  // Collision polling
  const checkInterval = setInterval(() => {
    if (!gameRunning) {
      clearInterval(checkInterval);
      if (el.parentNode) el.remove();
      return;
    }

    const rect      = el.getBoundingClientRect();
    const areaRect  = gameArea.getBoundingClientRect();
    const catcher   = document.getElementById('game-catcher');
    if (!catcher) { clearInterval(checkInterval); return; }
    const catchRect = catcher.getBoundingClientRect();

    // Off screen
    if (rect.top > areaRect.bottom) {
      clearInterval(checkInterval);
      if (el.parentNode) el.remove();
      return;
    }

    // Collision
    const hit =
      rect.bottom >= catchRect.top - 14 &&
      rect.top    <= catchRect.bottom   &&
      rect.right  >= catchRect.left     &&
      rect.left   <= catchRect.right;

    if (hit) {
      clearInterval(checkInterval);
      if (el.parentNode) el.remove();

      score = Math.max(0, score + item.points);
      scoreDisplay.textContent = `⭐ ${score}`;
      spawnScorePop(item.points, rect);
    }
  }, 50);
}

function spawnScorePop(points, rect) {
  const pop = document.createElement('div');
  pop.className = 'score-pop';
  pop.textContent = (points > 0 ? '+' : '') + points;
  pop.style.color = points > 0 ? '#6b9e61' : '#a05a38';
  pop.style.left  = rect.left + 'px';
  pop.style.top   = rect.top  + 'px';
  document.body.appendChild(pop);
  setTimeout(() => pop.remove(), 900);
}
