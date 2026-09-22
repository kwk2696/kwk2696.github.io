/* Dark-mode toggle. The initial theme is applied inline in <head> so the page
   never flashes the wrong colours; this only handles clicks afterwards. */
(function() {
  var SUN = '☀️';
  var MOON = '🌙';
  var toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  toggle.textContent = isDark ? SUN : MOON;

  toggle.addEventListener('click', function() {
    isDark = !isDark;
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
    toggle.textContent = isDark ? SUN : MOON;
  });
})();
