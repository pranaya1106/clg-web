// ── Events: Premium horizontal video slider ─────────────────────────
//
// Features:
//   - Drag-to-scroll on desktop
//   - Arrow navigation with smooth scroll
//   - Progress bar tracks scroll position
//   - Videos pause when section leaves viewport
//
(function () {
  var track = document.getElementById('evTrack');
  if (!track) return;

  var prevBtn      = document.getElementById('evPrev');
  var nextBtn      = document.getElementById('evNext');
  var progressFill = document.getElementById('evProgressFill');
  var cards        = track.querySelectorAll('.ev-card');
  var N            = cards.length;
  if (N < 1) return;

  // ── Progress bar ──
  function updateProgress() {
    var maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0 || !progressFill) return;
    var ratio = track.scrollLeft / maxScroll;
    // Bar width: min 1/N, scales up to 100%
    var w = (1 / N) + ratio * (1 - 1 / N);
    progressFill.style.width = (w * 100).toFixed(1) + '%';
  }

  track.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // ── Arrow navigation ──
  function getStep() {
    var gap = parseFloat(getComputedStyle(track).gap) || 28;
    return (cards[0] ? cards[0].offsetWidth : 400) + gap;
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      track.scrollBy({ left: -getStep(), behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      track.scrollBy({ left: getStep(), behavior: 'smooth' });
    });
  }

  // ── Drag to scroll (desktop) ──
  var isDragging = false;
  var startX     = 0;
  var scrollLeft = 0;
  var hasDragged = false;

  track.addEventListener('mousedown', function (e) {
    // Ignore right-click and links
    if (e.button !== 0) return;
    isDragging = true;
    hasDragged = false;
    startX     = e.pageX;
    scrollLeft = track.scrollLeft;
    track.style.scrollSnapType = 'none';
    track.style.scrollBehavior = 'auto';
  });

  document.addEventListener('mousemove', function (e) {
    if (!isDragging) return;
    var dx = e.pageX - startX;
    if (Math.abs(dx) > 4) hasDragged = true;
    track.scrollLeft = scrollLeft - dx;
  });

  document.addEventListener('mouseup', function () {
    if (!isDragging) return;
    isDragging = false;
    track.style.scrollSnapType = 'x mandatory';
    track.style.scrollBehavior = '';
  });

  // Prevent click on cards after drag
  track.addEventListener('click', function (e) {
    if (hasDragged) {
      e.preventDefault();
      e.stopPropagation();
      hasDragged = false;
    }
  }, true);

  // ── Pause videos when section not visible ──
  var section = document.getElementById('events');
  if (section) {
    var obs = new IntersectionObserver(function (entries) {
      var videos = track.querySelectorAll('.ev-card__video');
      if (entries[0].isIntersecting) {
        videos.forEach(function (v) { v.play().catch(function () {}); });
      } else {
        videos.forEach(function (v) { v.pause(); });
      }
    }, { threshold: 0 });
    obs.observe(section);
  }
})();
