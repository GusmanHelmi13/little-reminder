// ============================================================
//  PAGE-GALLERY.JS — Polaroid photo gallery (page 4)
// ============================================================
import { photos } from './data.js';

export function initGallery() {
  const grid = document.getElementById('gallery-grid');

  photos.forEach((photo, i) => {
    const polaroid = document.createElement('div');
    polaroid.className = 'polaroid';
    polaroid.style.transform = `rotate(${photo.rotation}deg)`;

    // Try to load image; show placeholder if missing
    const imgOrPlaceholder = buildImage(photo.src, i);

    polaroid.innerHTML = `
      ${imgOrPlaceholder}
      <span class="polaroid-caption">${photo.caption}</span>
    `;

    // Touch support
    polaroid.addEventListener('touchstart', () => {
      polaroid.classList.add('touch-active');
    }, { passive: true });
    polaroid.addEventListener('touchend', () => {
      setTimeout(() => polaroid.classList.remove('touch-active'), 600);
    }, { passive: true });

    grid.appendChild(polaroid);
  });
}

function buildImage(src, idx) {
  const placeholderEmojis = ['📸', '🌸', '✨', '💫', '🌟', '🎀'];
  // We render the img tag; if it errors it'll show placeholder via onerror
  return `
    <img
      src="${src}"
      alt="Bocil photo ${idx + 1}"
      onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
    />
    <div class="photo-placeholder" style="display:none;">${placeholderEmojis[idx % placeholderEmojis.length]}</div>
  `;
}
