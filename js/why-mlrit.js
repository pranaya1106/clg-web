// ═══════════════════════════════════════════════════════════════
// WHY MLRIT — Scroll-based video autoplay + fade-in
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  const section = document.getElementById('why-mlrit');
  const video = document.getElementById('whyVideo');

  if (!section || !video) return;

  // Scroll-based autoplay
  const playObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        video.play().catch(() => {});
        video.classList.add('is-playing');
      } else {
        video.pause();
        video.classList.remove('is-playing');
      }
    },
    { threshold: 0.5 }
  );

  playObserver.observe(section);

  // Fade-in on entry
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        section.classList.add('is-visible');
        fadeObserver.disconnect();
      }
    },
    { threshold: 0.2 }
  );

  fadeObserver.observe(section);
})();
