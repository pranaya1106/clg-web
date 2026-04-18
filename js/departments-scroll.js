// ── Departments: stagger reveal on scroll ─────────────────────────────
(function () {
  var section = document.getElementById('departments');
  if (!section) return;

  var tiles = section.querySelectorAll('.dept-tile');

  var obs = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      tiles.forEach(function (tile, i) {
        setTimeout(function () {
          tile.style.opacity = '1';
          tile.style.transform = 'translateY(0)';
        }, i * 50);
      });
      obs.disconnect();
    }
  }, { threshold: 0.1 });

  // Set initial hidden state
  tiles.forEach(function (tile) {
    tile.style.opacity = '0';
    tile.style.transform = 'translateY(12px)';
    tile.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  });

  obs.observe(section);
})();
