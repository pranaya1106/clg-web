// ═══════════════════════════════════════════════════════════════
// EVENTS — Main player hover interaction
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  const mainPlayer = document.getElementById('evPlayer');
  const mainVideo = document.getElementById('evMainVid');
  const ambientVideo = document.getElementById('evAmbVid');
  const ambient = document.getElementById('evAmbient');
  const bgInfo = document.getElementById('evBgInfo');

  if (!mainPlayer || !mainVideo || !ambientVideo || !ambient || !bgInfo) return;

  let isHovering = false;

  // Stop background video initially
  ambientVideo.pause();

  // Prevent main player from ever playing
  mainVideo.pause();
  mainVideo.addEventListener('play', (e) => {
    e.preventDefault();
    mainVideo.pause();
  });

  // Show video in background, hide text
  function activateBackgroundMode() {
    if (isHovering) return;
    isHovering = true;

    // Sync background with main player video
    const currentSrc = mainVideo.src;
    if (ambientVideo.src !== currentSrc) {
      ambientVideo.src = currentSrc;
      ambientVideo.load();
    }

    // Show and play background video
    ambient.classList.add('is-focused');
    ambientVideo.play().catch(() => {});

    // Hide event info text
    if (bgInfo) {
      bgInfo.classList.add('is-hidden');
    }
  }

  // Restore normal mode - hide background, show text
  function deactivateBackgroundMode() {
    if (!isHovering) return;
    isHovering = false;

    // Hide background video
    ambient.classList.remove('is-focused');
    ambientVideo.pause();

    // Show event info text
    if (bgInfo) {
      bgInfo.classList.remove('is-hidden');
    }
  }

  // Attach hover listeners to main player
  mainPlayer.addEventListener('mouseenter', activateBackgroundMode);
  mainPlayer.addEventListener('mouseleave', deactivateBackgroundMode);

  // Sync ambient video when main video changes (from thumbnail clicks)
  const observer = new MutationObserver(() => {
    const currentSrc = mainVideo.src;
    if (isHovering && ambientVideo.src !== currentSrc) {
      ambientVideo.src = currentSrc;
      ambientVideo.load();
      ambientVideo.play().catch(() => {});
    }
  });

  observer.observe(mainVideo, { attributes: true, attributeFilter: ['src'] });
})();
