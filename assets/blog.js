/* Blog index: turn each .blog-panel into a tab (Tech, Thoughts, ...) and give
   every panel its own tag filter built from the data-tags on its posts, so
   adding a post or a tag needs no change here. The URL hash (#tech,
   #thoughts) picks the tab, so a post can link back to the panel it sits in.
   Without this script both panels simply show one after the other. */
(function() {
  var container = document.querySelector('.blog-container');
  var panels = Array.prototype.slice.call(document.querySelectorAll('.blog-panel'));
  if (!container || !panels.length) return;

  panels.forEach(function(panel) {
    var list = panel.querySelector('.post-list');
    var posts = Array.prototype.slice.call(list.querySelectorAll('li'));
    var empty = panel.querySelector('.blog-empty');
    if (empty) empty.hidden = posts.length > 0;

    var filterBox = panel.querySelector('.tag-filter');
    var tagsOf = function(post) {
      return (post.getAttribute('data-tags') || '').split(/\s+/).filter(Boolean);
    };
    var tags = [];
    posts.forEach(function(post) {
      tagsOf(post).forEach(function(t) { if (tags.indexOf(t) === -1) tags.push(t); });
    });
    if (!filterBox || !tags.length) return;
    tags.sort();

    function select(tag) {
      Array.prototype.forEach.call(filterBox.children, function(btn) {
        btn.classList.toggle('active', btn.getAttribute('data-tag') === tag);
      });
      posts.forEach(function(post) {
        post.style.display = tag === 'all' || tagsOf(post).indexOf(tag) !== -1 ? '' : 'none';
      });
    }
    function addButton(tag, label) {
      var btn = document.createElement('span');
      btn.className = 'tag';
      btn.setAttribute('data-tag', tag);
      btn.textContent = label;
      btn.addEventListener('click', function() { select(tag); });
      filterBox.appendChild(btn);
    }
    addButton('all', 'All');
    tags.forEach(function(t) { addButton(t, t); });
    select('all');
  });

  if (panels.length < 2) return;
  // data-panel, not id, names a panel: an id would make the browser jump past
  // the tab bar to the section when the page opens on #tech or #thoughts.
  var key = function(panel) { return panel.getAttribute('data-panel'); };

  var bar = document.createElement('div');
  bar.className = 'blog-tabs';
  bar.setAttribute('role', 'tablist');
  var buttons = panels.map(function(panel) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'blog-tab';
    btn.setAttribute('role', 'tab');
    btn.textContent = panel.getAttribute('data-tab') || key(panel);
    var count = document.createElement('span');
    count.className = 'blog-tab-count';
    count.textContent = panel.querySelectorAll('.post-list li').length;
    btn.appendChild(count);
    btn.addEventListener('click', function() {
      show(key(panel));
      if (history.replaceState) history.replaceState(null, '', '#' + key(panel));
    });
    bar.appendChild(btn);
    return btn;
  });

  function show(id) {
    var found = panels.some(function(p) { return key(p) === id; });
    if (!found) id = key(panels[0]);
    panels.forEach(function(panel, i) {
      var on = key(panel) === id;
      panel.style.display = on ? '' : 'none';
      buttons[i].classList.toggle('active', on);
      buttons[i].setAttribute('aria-selected', on ? 'true' : 'false');
    });
  }

  container.classList.add('has-tabs');
  panels[0].parentNode.insertBefore(bar, panels[0]);
  show(location.hash.slice(1));
  window.addEventListener('hashchange', function() { show(location.hash.slice(1)); });
})();
