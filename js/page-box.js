// ============================================================
//  PAGE-BOX.JS — Little Box reveal page (page 7)
// ============================================================
import { photos } from './data.js';
import { launchConfetti } from './app.js';

let boxOpened = false;

export function initBox() {
  window.addEventListener('enter-box', () => {
    if (boxOpened) return;

    const mysteryBox = document.getElementById('mystery-box');
    const boxReveal  = document.getElementById('box-reveal');
    const boxLabel   = document.querySelector('.box-label');

    mysteryBox.addEventListener('click', openBox);
    if (boxLabel) boxLabel.addEventListener('click', openBox);

    function openBox() {
      if (boxOpened) return;
      boxOpened = true;

      // box shake + change emoji
      mysteryBox.style.animation = 'none';
      mysteryBox.style.transform = 'scale(1.2) rotate(10deg)';
      setTimeout(() => {
        mysteryBox.textContent = '📭';
        mysteryBox.style.transform = '';
      }, 300);

      setTimeout(() => {
        mysteryBox.style.display = 'none';
        if (boxLabel) boxLabel.style.display = 'none';
        boxReveal.style.display = 'block';
        renderMemoryCards();
        launchConfetti();
      }, 600);
    }
  });
}

function renderMemoryCards() {
  const container = document.getElementById('memory-cards');
  const placeholderEmojis = ['🌸', '💫', '✨', '🎀', '⭐', '💗'];

  photos.forEach((photo, i) => {
    const card = document.createElement('div');
    card.className = 'memory-card';

    // Random small rotation
    const rot = (Math.random() * 6 - 3).toFixed(1);
    card.style.transform = `rotate(${rot}deg) scale(0.8) translateY(20px)`;

    card.innerHTML = `
      <img
        src="${photo.src}"
        alt="Memory ${i + 1}"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
      />
      <div class="photo-placeholder" style="display:none;">${placeholderEmojis[i % placeholderEmojis.length]}</div>
      <span class="memory-caption">${photo.closingCaption}</span>
    `;

    container.appendChild(card);

    // Staggered reveal
    setTimeout(() => {
      card.classList.add('show');
      card.style.transform = `rotate(${rot}deg)`;
    }, 300 + i * 280);
  });

  // Show closing message after all cards
  const closingDelay = 400 + photos.length * 280 + 400;
  setTimeout(() => {
    document.getElementById('closing-message').style.opacity = '1';
    document.getElementById('closing-message').style.transform = 'translateY(0)';
  }, closingDelay);
}
