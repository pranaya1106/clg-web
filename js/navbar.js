/* =============================================
   NAVBAR — glide indicator + dropdown positioning
   ============================================= */
(function () {
  const nav       = document.querySelector('.main-nav');
  const list      = document.getElementById('mainNavList');
  const indicator = document.getElementById('navIndicator');
  const items     = Array.from(document.querySelectorAll('.main-nav__item'));

  if (!nav || !list || !indicator) return;

  // ── Position all dropdowns/support-panel below the nav bar ──
  function positionPanels() {
    const navBottom = nav.getBoundingClientRect().bottom;
    document.querySelectorAll('.dropdown, .support-panel').forEach(panel => {
      panel.style.top = navBottom + 'px';
    });
  }

  positionPanels();
  window.addEventListener('resize', positionPanels);

  // ── Glide indicator ──
  function moveIndicator(item) {
    const link = item.querySelector('.main-nav__link');
    if (!link) return;
    const listRect = list.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    indicator.style.left    = (linkRect.left - listRect.left) + 'px';
    indicator.style.width   = linkRect.width + 'px';
    indicator.style.opacity = '1';
  }

  function hideIndicator() {
    indicator.style.opacity = '0';
  }

  items.forEach(item => {
    item.addEventListener('mouseenter', () => moveIndicator(item));
    item.addEventListener('mouseleave', hideIndicator);
    item.addEventListener('focusin',    () => moveIndicator(item));
    item.addEventListener('focusout',   e => {
      if (!item.contains(e.relatedTarget)) hideIndicator();
    });
  });

  // ── Keyboard: Enter/Space opens, Escape closes ──
  items.forEach(item => {
    const link     = item.querySelector('.main-nav__link');
    const dropdown = item.querySelector('.dropdown, .support-panel');
    if (!link || !dropdown) return;

<<<<<<< HEAD
    link.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const isOpen = item.classList.contains('is-open');
        closeAll();
        if (!isOpen) { item.classList.add('is-open'); positionPanels(); }
      }
      if (e.key === 'Escape') closeAll();
    });
  });

  function closeAll() {
    items.forEach(i => i.classList.remove('is-open'));
  }

  document.addEventListener('click', e => {
    if (!e.target.closest('.main-nav__item')) closeAll();
  });
})();
=======
document.addEventListener('click', e => {
  if (!e.target.closest('.main-nav__item')) closeAll();
});

document.querySelectorAll('.main-nav__link').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') {
      e.preventDefault();
    }
  });
});
>>>>>>> upstream/main
