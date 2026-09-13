// ============================================================
//  PAGE-REALITY.JS — Reality Check page (page 3)
// ============================================================
import { launchConfetti } from './app.js';

const items = [
  { icon: '☑️', text: 'tugas numpuk' },
  { icon: '☑️', text: 'deadline ngintip' },
  { icon: '☑️', text: 'semester 3 mulai brutal' },
  { icon: '☑️', text: 'energi tinggal sekian persen' },
  { icon: '✅', text: 'tapi Bocil masih bertahan', last: true },
];

export function initRealityCheck() {
  const list = document.getElementById('reality-list');

  items.forEach((item, idx) => {
    const li = document.createElement('li');
    li.className = 'check-item' + (item.last ? ' last-item' : '');
    li.innerHTML = `<span class="check-icon">${item.icon}</span><span>${item.text}</span>`;
    list.appendChild(li);
  });

  window.addEventListener('enter-reality', () => {
    const checkItems = list.querySelectorAll('.check-item');
    checkItems.forEach((item, i) => {
      item.classList.remove('show', 'pulse');
      setTimeout(() => {
        item.classList.add('show');
        if (i === checkItems.length - 1) {
          setTimeout(() => {
            item.classList.add('pulse');
            launchConfetti();
            // show the follow-up text
            document.getElementById('reality-followup').style.opacity = '1';
          }, 400);
        }
      }, 250 + i * 350);
    });
  });
}
