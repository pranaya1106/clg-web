// ── Programs: staggered fade-up reveal ────────────────────────────────
(function () {
  'use strict';

  var section = document.getElementById('programs');
  if (!section) return;

  var ugList = document.getElementById('ugList');
  var pgList = document.getElementById('pgList');
  if (!ugList || !pgList) return;

  var ugCards = Array.from(ugList.querySelectorAll('.prog-card'));
  var pgCards = Array.from(pgList.querySelectorAll('.prog-card'));

  var allCards = ugCards.concat(pgCards);
  if (!allCards.length) return;

  // Set initial hidden state
  allCards.forEach(function (card) {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(16px)';
    card.style.transition = 'opacity 0.38s ease, transform 0.38s ease';
  });

  function revealCards() {
    var maxLen = Math.max(ugCards.length, pgCards.length);
    for (var i = 0; i < maxLen; i++) {
      (function (idx) {
        var delay = idx * 38;
        if (ugCards[idx]) {
          setTimeout(function () {
            ugCards[idx].style.opacity   = '1';
            ugCards[idx].style.transform = 'translateY(0)';
          }, delay);
        }
        if (pgCards[idx]) {
          setTimeout(function () {
            pgCards[idx].style.opacity   = '1';
            pgCards[idx].style.transform = 'translateY(0)';
          }, delay + 12);
        }
      }(i));
    }
  }

  var observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      revealCards();
      observer.disconnect();
    }
  }, { threshold: 0.08 });

  observer.observe(section);

}());
