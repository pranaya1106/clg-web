// ── Departments: scroll-driven horizontal cards ──────────────────────
(function () {
  var runway    = document.getElementById('deptRunway');
  var track     = document.getElementById('deptTrack');
  var watermark = document.getElementById('deptWatermark');
  if (!runway || !track) return;

  runway.style.height = '300vh';

  var maxTravel = 0;

  function measure() {
    maxTravel = Math.max(track.scrollWidth - window.innerWidth, 0);
  }
  measure();
  window.addEventListener('resize', measure);

  var target  = 0;
  var current = 0;
  var LERP    = 0.05;

  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  function easeInOut(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function computeTarget() {
    var scrolled    = -runway.getBoundingClientRect().top;
    var totalScroll = runway.offsetHeight - window.innerHeight;
    target = clamp01(scrolled / totalScroll);
  }

  function render() {
    var eased = easeInOut(current);
    track.style.transform = 'translateX(' + (-eased * maxTravel).toFixed(1) + 'px)';

    if (watermark) {
      var rot = current * 360;
      watermark.style.transform = 'translate(-50%, -50%) rotate(' + rot.toFixed(1) + 'deg)';
    }
  }

  var rafId = null;

  function tick() {
    computeTarget();
    var diff = target - current;
    if (Math.abs(diff) > 0.0003) {
      current += diff * LERP;
    } else {
      current = target;
    }
    render();
    rafId = requestAnimationFrame(tick);
  }

  rafId = requestAnimationFrame(tick);

  var obs = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      if (!rafId) rafId = requestAnimationFrame(tick);
    } else {
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    }
  }, { threshold: 0 });
  obs.observe(runway);
})();
