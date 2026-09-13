// ============================================================
//  PAGE-BOX.JS — Little Box reveal page (page 7)
//  Menampilkan 1 foto (photo2) ukuran sedang saat kotak dibuka
// ============================================================
import { launchConfetti } from './app.js';

let boxOpened = false;

const FEATURED_PHOTO = {
  src: 'assets/photos/photo2.jpeg',
  caption: 'still surviving, still iconic. 🌿',
};

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

      // box shake + ganti emoji
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
        renderFeaturedPhoto();
        launchConfetti();
      }, 600);
    }
  });
}

function renderFeaturedPhoto() {
  const container = document.getElementById('memory-cards');

  // Satu foto ukuran sedang, centered
  const wrapper = document.createElement('div');
  wrapper.className = 'featured-photo-wrap';
  wrapper.style.cssText = `
    opacity: 0;
    transform: scale(0.85) translateY(24px);
    transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    margin: 0 auto;
    text-align: center;
  `;

  wrapper.innerHTML = `
    <div class="featured-polaroid">
      <img
        src="${FEATURED_PHOTO.src}"
        alt="Bocil"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
      />
      <div class="photo-placeholder featured-placeholder" style="display:none;">🌸</div>
      <p class="featured-caption accent">${FEATURED_PHOTO.caption}</p>
    </div>
  `;

  container.appendChild(wrapper);

  // Animate in
  setTimeout(() => {
    wrapper.style.opacity = '1';
    wrapper.style.transform = 'scale(1) translateY(0)';
  }, 350);

  // Show closing message after photo appears
  setTimeout(() => {
    const msg = document.getElementById('closing-message');
    msg.style.opacity = '1';
    msg.style.transform = 'translateY(0)';
  }, 1100);
}
