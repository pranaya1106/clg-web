// ═══════════════════════════════════════════════════════════════
// SECTION LOADER — Fail-safe dynamic section injection
// Sections live in /sections/*.html — NEVER in index.html
// ═══════════════════════════════════════════════════════════════

const loadSection = async (id, file, callback) => {
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`HTTP ${res.status} — Failed to load ${file}`);
    const html = await res.text();
    const container = document.getElementById(id);
    if (!container) throw new Error(`Container #${id} not found in DOM`);
    container.innerHTML = html;
    if (callback) callback();
  } catch (err) {
    console.error(`SECTION LOAD ERROR: ${id}`, err);
  }
};

// ── Why MLRIT init ──────────────────────────────────────────────
function initWhyMLRIT() {
  const section = document.getElementById('why-mlrit');
  const vid     = document.getElementById('whyVideo');
  const muteBtn = document.getElementById('whyMute');

  if (!section || !vid) return;

  // Scroll-based autoplay
  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      vid.play().catch(() => {});
      vid.classList.add('is-playing');
    } else {
      vid.pause();
      vid.classList.remove('is-playing');
    }
  }, { threshold: 0.4 });
  io.observe(section);

  // Mute toggle
  if (muteBtn) {
    const off = muteBtn.querySelector('.vid-mute-btn__off');
    const on  = muteBtn.querySelector('.vid-mute-btn__on');
    muteBtn.addEventListener('click', e => {
      e.stopPropagation();
      vid.muted = !vid.muted;
      if (off) off.style.display = vid.muted ? '' : 'none';
      if (on)  on.style.display  = vid.muted ? 'none' : '';
    });
  }
}

// ── Events init ─────────────────────────────────────────────────
function initEvents() {
  var section    = document.getElementById('events');
  var bgVideo    = document.getElementById('evBgVideo');
  var bgScrim    = document.querySelector('.ev-bg-scrim');
  var evText     = document.getElementById('evText');
  var evQuote    = document.getElementById('evQuote');
  var evName     = document.getElementById('evName');
  var evRole     = document.getElementById('evRole');
  var mainThumb  = document.getElementById('evMainThumb');
  var thumbVid   = document.getElementById('evThumbVid');
  var muteBtn    = document.getElementById('evMuteBtn');
  var miniThumbs = document.querySelectorAll('.ev-mini-thumb');

  if (!section || !bgVideo) return;

  var events = [
    { src: 'events/e1.mp4', quote: 'A celebration of technical brilliance and innovation that defines the spirit of MLRIT.', name: 'Zignasa',      role: 'Technical Fest'      },
    { src: 'events/e2.mp4', quote: 'Where bold ideas meet real-world challenges — students push boundaries and build solutions.', name: 'IC',       role: 'Innovation Challenge' },
    { src: 'events/e3.mp4', quote: 'The annual championship that brings out the best engineers, thinkers, and creators on campus.', name: 'Zenith', role: 'Technical Fest'      },
    { src: 'events/e4.mp4', quote: 'A vibrant cultural extravaganza that celebrates art, music, dance, and the soul of MLRIT.', name: 'Navrat Naveli', role: 'Cultural Fest'   }
  ];

  var current = 0;
  var isMuted = true;

  function goTo(idx) {
    current = ((idx % events.length) + events.length) % events.length;
    var ev = events[current];

    bgVideo.src = ev.src;
    bgVideo.muted = isMuted;
    bgVideo.load();
    bgVideo.play().catch(function () {});

    if (thumbVid) {
      thumbVid.src = ev.src;
      thumbVid.muted = isMuted;
      thumbVid.load();
      thumbVid.play().catch(function () {});
    }

    if (evQuote) evQuote.textContent = '\u201c' + ev.quote + '\u201d';
    if (evName)  evName.textContent  = ev.name;
    if (evRole)  evRole.textContent  = ev.role;

    miniThumbs.forEach(function (t, i) {
      t.classList.toggle('is-active', i === current);
      var v = t.querySelector('video');
      if (v) {
        if (i === current) v.play().catch(function () {});
        else v.pause();
      }
    });
  }

  // Main thumb hover — focus bg, blackout mini queue
  if (mainThumb) {
    mainThumb.addEventListener('mouseenter', function () {
      bgVideo.style.filter = 'brightness(0.85)';
      if (bgScrim) bgScrim.style.opacity = '0.2';
      if (evText)  evText.classList.add('is-hidden');
      miniThumbs.forEach(function (t) {
        var v = t.querySelector('video');
        if (v) { v.pause(); v.currentTime = 0; }
        t.classList.add('is-disabled');
      });
    });

    mainThumb.addEventListener('mouseleave', function () {
      bgVideo.style.filter = '';
      if (bgScrim) bgScrim.style.opacity = '';
      if (evText)  evText.classList.remove('is-hidden');
      miniThumbs.forEach(function (t) {
        t.classList.remove('is-disabled');
      });
      var active = document.querySelector('.ev-mini-thumb.is-active video');
      if (active) active.play().catch(function () {});
    });
  }

  // Mini thumb click only — no hover-play (only main video plays)
  miniThumbs.forEach(function (t, i) {
    t.addEventListener('click', function () { goTo(i); });
  });

  // Prev / Next
  var btnPrev = document.getElementById('evPrev');
  var btnNext = document.getElementById('evNext');
  if (btnPrev) btnPrev.addEventListener('click', function () { goTo(current - 1); });
  if (btnNext) btnNext.addEventListener('click', function () { goTo(current + 1); });

  // Touch swipe
  var touchX = 0;
  section.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  section.addEventListener('touchend',   function (e) {
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) goTo(dx < 0 ? current + 1 : current - 1);
  });

  // Mute toggle
  if (muteBtn) {
    muteBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      isMuted = !isMuted;
      bgVideo.muted = isMuted;
      if (thumbVid) thumbVid.muted = isMuted;
      var off = muteBtn.querySelector('.ev-mute-btn__off');
      var on  = muteBtn.querySelector('.ev-mute-btn__on');
      if (off) off.style.display = isMuted ? '' : 'none';
      if (on)  on.style.display  = isMuted ? 'none' : '';
    });
  }

  // Scroll parallax on centre explore prompt
  var explore = section.querySelector('.ev-explore');
  if (explore) {
    window.addEventListener('scroll', function () {
      var rect = section.getBoundingClientRect();
      var progress = -rect.top / window.innerHeight;
      explore.style.transform = 'translate(-50%, calc(-50% - ' + (progress * 28) + 'px))';
    }, { passive: true });
  }

  // Boot
  goTo(0);
}

// ── Boot ────────────────────────────────────────────────────────
const init = () => {
  loadSection('accreditations-slot', 'sections/accreditations.html');
  loadSection('why-mlrit-slot',      'sections/why-mlrit.html',      initWhyMLRIT);
  loadSection('events-slot',         'sections/events.html',         initEvents);
};

document.addEventListener('DOMContentLoaded', init);
