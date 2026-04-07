// ═══════════════════════════════════════════════════════════════
// ALUMNI (TESTIMONIALS) — Dual sweep animation + hover polish
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  const cards = document.querySelectorAll('.testimonial-card');

  cards.forEach((card) => {
    const video = card.querySelector('.testimonial-card__video');
    const sweep = card.querySelector('.testimonial-card__sweep');

    if (!video || !sweep) return;

    // Hover: play video + trigger sweep
    card.addEventListener('mouseenter', () => {
      video.currentTime = 0;
      video.play().catch(() => {});

      // Trigger dual sweep animation
      sweep.classList.remove('is-sweeping');
      void sweep.offsetWidth; // Force reflow
      sweep.classList.add('is-sweeping');
    });

    // Leave: pause video
    card.addEventListener('mouseleave', () => {
      video.pause();
    });
  });
})();
