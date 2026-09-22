/* Home page only: swap the active nav item between Home and Publications as the
   reader scrolls past the publications heading. */
(function() {
  var navLinks = document.querySelectorAll('.top-nav a[href^="index.html"]');
  var homeLink = document.querySelector('.top-nav a[href="index.html"]');
  var pubLink = document.querySelector('.top-nav a[href="index.html#publications"]');
  if (!navLinks.length) return;

  window.addEventListener('scroll', function() {
    var pubSection = document.getElementById('publications');
    var past = pubSection && window.scrollY + 80 >= pubSection.offsetTop;
    navLinks.forEach(function(link) { link.classList.remove('active'); });
    var current = past ? pubLink : homeLink;
    if (current) current.classList.add('active');
  });
})();
