// ═══════════════════════════════════════════════════════════════
// SUCCESS STORIES — Scroll reveal with fade + upward motion
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  const section = document.querySelector('.ss-section');
  if (!section) return;

  // Reveal all cards (including aria-hidden duplicates) once section enters view
  // Using section-level observer — not per-card — avoids issues with
  // off-screen duplicates never intersecting
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        section.querySelectorAll('.ss-card').forEach((card) => {
          card.classList.add('is-revealed');
        });
        observer.disconnect();
      }
    },
    { threshold: 0.1 }
  );

  observer.observe(section);
})();
