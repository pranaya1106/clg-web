// ── Success Stories: reveal cards on scroll ───────────────────────────
(function () {
  var section = document.querySelector('.ss-section');
  if (!section) return;

  var observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      section.querySelectorAll('.ss-card').forEach(function (card) {
        card.classList.add('is-revealed');
      });
      observer.disconnect();
    }
  }, { threshold: 0.1 });

  observer.observe(section);
})();
