/*
 * giscus comments for blog posts.
 *
 * Usage: add this near the end of a post's <body>:
 *   <script src="comments.js"></script>
 *
 * The widget is inserted just above the "Back to Blog" link and follows the
 * site's dark mode toggle.
 */
(function() {
  var REPO = 'kwk2696/kwk2696.github.io';
  var REPO_ID = 'R_kgDOM581TA';
  var CATEGORY = 'Announcements';
  var CATEGORY_ID = '';   // fill in from giscus.app

  // Until the category is configured, render nothing rather than a broken widget.
  if (!CATEGORY_ID) return;

  var container = document.querySelector('.post-content');
  if (!container) return;

  var section = document.createElement('div');
  section.className = 'comments-section';

  var heading = document.createElement('h2');
  heading.textContent = 'Comments';
  section.appendChild(heading);

  var mount = document.createElement('div');
  mount.className = 'giscus';
  section.appendChild(mount);

  var backLink = container.querySelector('a.back-link');
  if (backLink) {
    container.insertBefore(section, backLink);
  } else {
    container.appendChild(section);
  }

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark'
      ? 'dark' : 'light';
  }

  var script = document.createElement('script');
  script.src = 'https://giscus.app/client.js';
  script.setAttribute('data-repo', REPO);
  script.setAttribute('data-repo-id', REPO_ID);
  script.setAttribute('data-category', CATEGORY);
  script.setAttribute('data-category-id', CATEGORY_ID);
  script.setAttribute('data-mapping', 'pathname');
  script.setAttribute('data-strict', '1');
  script.setAttribute('data-reactions-enabled', '1');
  script.setAttribute('data-emit-metadata', '0');
  script.setAttribute('data-input-position', 'top');
  script.setAttribute('data-theme', currentTheme());
  script.setAttribute('data-lang', 'ko');
  script.setAttribute('crossorigin', 'anonymous');
  script.async = true;
  mount.appendChild(script);

  // Keep the widget in sync with the site's theme toggle.
  new MutationObserver(function() {
    var frame = document.querySelector('iframe.giscus-frame');
    if (!frame) return;
    frame.contentWindow.postMessage(
      { giscus: { setConfig: { theme: currentTheme() } } },
      'https://giscus.app');
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
})();
