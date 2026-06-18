/* ============================================================
   Vishal Thakur — site behavior
   - Light / dark theme toggle (remembers your choice)
   - Subtle fade-up on scroll (purely decorative; content is
     always visible even if animations are disabled)
   You normally don't need to edit this file.
   ============================================================ */

(function () {
  // ---- Theme toggle ----
  var root = document.documentElement;
  var toggle = document.querySelector('.theme-toggle');
  var saved = null;
  try { saved = localStorage.getItem('vt-theme'); } catch (e) {}
  if (saved === 'dark') setTheme('dark');

  function setTheme(mode) {
    if (mode === 'dark') {
      root.setAttribute('data-theme', 'dark');
      if (toggle) toggle.textContent = '\u2600';      // sun
    } else {
      root.removeAttribute('data-theme');
      if (toggle) toggle.textContent = '\u263E';      // moon
    }
    try { localStorage.setItem('vt-theme', mode); } catch (e) {}
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var isDark = root.getAttribute('data-theme') === 'dark';
      setTheme(isDark ? 'light' : 'dark');
    });
  }

  // ---- Scroll reveal (transform only, never hides content) ----
  var nodes = [].slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window && nodes.length && nodes[0].animate) {
    var play = function (el) {
      try {
        el.animate(
          [{ transform: 'translateY(20px)' }, { transform: 'none' }],
          { duration: 650, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'none' }
        );
      } catch (e) {}
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { play(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

    var vh = window.innerHeight || 800;
    nodes.forEach(function (n) {
      if (n.getBoundingClientRect().top < vh * 0.92) play(n);
      else io.observe(n);
    });
  }
})();
