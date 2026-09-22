/* Blog index: build the tag filter from the data-tags on each post, so adding a
   post with a new tag needs no change here. */
(function() {
  var filterBox = document.getElementById('tag-filter');
  var list = document.getElementById('post-list');
  if (!filterBox || !list) return;

  var posts = Array.prototype.slice.call(list.querySelectorAll('li[data-tags]'));
  var tagsOf = function(post) {
    return post.getAttribute('data-tags').split(/\s+/).filter(Boolean);
  };

  var tags = [];
  posts.forEach(function(post) {
    tagsOf(post).forEach(function(t) {
      if (tags.indexOf(t) === -1) tags.push(t);
    });
  });
  tags.sort();

  function select(tag) {
    Array.prototype.forEach.call(filterBox.children, function(btn) {
      btn.classList.toggle('active', btn.getAttribute('data-tag') === tag);
    });
    posts.forEach(function(post) {
      var match = tag === 'all' || tagsOf(post).indexOf(tag) !== -1;
      post.style.display = match ? '' : 'none';
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
})();
