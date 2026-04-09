// ── Events: scroll-driven stacking cards ─────────────────────────────
//
// How it works:
//   - .ev-runway is a tall container (N * 100vh) that creates scroll distance.
//   - .ev-frame is position:sticky, locking a viewport-height panel in place.
//   - Cards are position:absolute stacked inside the frame.
//   - Card 0 is always at translateY(0). Cards 1-3 start at translateY(105%)
//     and slide to translateY(0) as the user scrolls through their segment.
//   - The card being covered scales down to 0.95 and dims for depth.
//   - A continuous rAF loop with lerp gives buttery smooth motion.
//
(function () {
  var runway = document.getElementById('evRunway');
  if (!runway) return;

  var cards = runway.querySelectorAll('.ev-card');
  var N     = cards.length;
  if (N < 2) return;

  // Scroll distance: (N-1) card transitions + 0.6 extra hold at end
  var SEGMENTS = N - 1;
  runway.style.height = ((SEGMENTS + 0.6) * 100) + 'vh';

  // State arrays: "progress" per card — 0 = offscreen below, 1 = fully in place
  var target  = new Float64Array(N);
  var current = new Float64Array(N);
  target[0]  = 1;
  current[0] = 1;

  var LERP = 0.08;

  function clamp01(v) {
    return v < 0 ? 0 : v > 1 ? 1 : v;
  }

  // ── Compute target progress from scroll position ──
  //
  // Card 0 is always progress=1 (always in place, first visible).
  // Card i (i>=1) transitions during scroll range [(i-1)*vh .. i*vh].
  //   At (i-1)*vh scrolled → progress=0 (offscreen below).
  //   At i*vh scrolled     → progress=1 (fully in place, covering card i-1).
  //
  function updateTargets() {
    var scrolled = -runway.getBoundingClientRect().top;
    var vh       = window.innerHeight;

    target[0] = 1;
    for (var i = 1; i < N; i++) {
      var segStart = (i - 1) * vh;
      var segEnd   = i * vh;
      target[i] = clamp01((scrolled - segStart) / (segEnd - segStart));
    }
  }

  // ── Apply transforms ──
  function render() {
    for (var i = 0; i < N; i++) {
      var p = current[i];
      var card = cards[i];

      // Z-index: later cards always on top of earlier ones
      card.style.zIndex = i + 1;

      if (i === 0) {
        // Card 0: always in place. Scale down + dim when card 1 comes over it.
        var coverP = N > 1 ? current[1] : 0;
        var sc = 1 - coverP * 0.05;
        var br = 1 - coverP * 0.4;
        card.style.transform = 'translateY(0) scale(' + sc.toFixed(4) + ')';
        card.style.filter    = coverP > 0.001
          ? 'brightness(' + br.toFixed(3) + ')'
          : '';
      } else if (p < 0.001) {
        // Fully offscreen below
        card.style.transform = 'translateY(105%)';
        card.style.filter    = '';
      } else if (p > 0.999) {
        // Fully in place. Check if the NEXT card is covering this one.
        var nextP = (i < N - 1) ? current[i + 1] : 0;
        if (nextP > 0.001) {
          var sc2 = 1 - nextP * 0.05;
          var br2 = 1 - nextP * 0.4;
          card.style.transform = 'translateY(0) scale(' + sc2.toFixed(4) + ')';
          card.style.filter    = 'brightness(' + br2.toFixed(3) + ')';
        } else {
          card.style.transform = 'translateY(0) scale(1)';
          card.style.filter    = '';
        }
      } else {
        // Mid-transition: slide up from 105% toward 0%
        var ty = (1 - p) * 105;
        card.style.transform = 'translateY(' + ty.toFixed(2) + '%)';
        card.style.filter    = '';
      }
    }
  }

  // ── Animation loop ──
  var rafId = null;

  function tick() {
    updateTargets();

    for (var i = 0; i < N; i++) {
      var diff = target[i] - current[i];
      if (Math.abs(diff) > 0.0004) {
        current[i] += diff * LERP;
      } else {
        current[i] = target[i];
      }
    }

    render();
    rafId = requestAnimationFrame(tick);
  }

  // Start
  rafId = requestAnimationFrame(tick);

  // Pause when section not visible to save CPU
  var obs = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      if (!rafId) rafId = requestAnimationFrame(tick);
    } else {
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    }
  }, { threshold: 0 });
  obs.observe(runway);
})();
