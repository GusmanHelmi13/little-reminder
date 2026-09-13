// ============================================================
//  PAGE-MOOD.JS — Pick Your Mood (page 5)
// ============================================================
import { moodResponses } from './data.js';

export function initMood() {
  const grid = document.getElementById('mood-grid');
  const responseArea = document.getElementById('mood-response');

  const moodKeys = Object.keys(moodResponses);

  moodKeys.forEach(key => {
    const mood = moodResponses[key];
    const btn = document.createElement('button');
    btn.className = 'mood-btn';
    btn.dataset.mood = key;
    btn.innerHTML = `<span>${mood.emoji}</span> ${mood.label}`;
    btn.style.setProperty('--mood-color', mood.color);

    btn.addEventListener('click', () => {
      // deselect all
      grid.querySelectorAll('.mood-btn').forEach(b => {
        b.classList.remove('selected');
        b.style.borderColor = 'transparent';
        b.style.background = 'var(--white)';
      });
      // select this
      btn.classList.add('selected');
      btn.style.borderColor = mood.color;
      btn.style.background = mood.color + '44';

      showMoodResponse(mood, responseArea);
    });

    grid.appendChild(btn);
  });
}

function showMoodResponse(mood, container) {
  container.innerHTML = '';

  const card = document.createElement('div');
  card.className = 'mood-response-card';
  card.style.background = mood.color + '33';
  card.style.border = `1.5px solid ${mood.color}`;

  mood.lines.forEach((line, i) => {
    const p = document.createElement('p');
    p.textContent = line;
    p.style.opacity = '0';
    p.style.transform = 'translateY(10px)';
    p.style.transition = `all 0.4s ease ${i * 0.12}s`;
    card.appendChild(p);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        p.style.opacity = '1';
        p.style.transform = 'translateY(0)';
      });
    });
  });

  container.appendChild(card);
}
