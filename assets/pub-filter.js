/* Home page: open the publication list on the cards marked data-selected, with
   a Selected / All switch above it. Without this script every card stays
   visible, so the full list never depends on JavaScript. */
(function() {
  var heading = document.getElementById('publications');
  var cards = Array.prototype.slice.call(document.querySelectorAll('.pub-card'));
  if (!heading || !cards.some(function(c) { return c.hasAttribute('data-selected'); })) return;

  var sections = Array.prototype.slice.call(document.querySelectorAll('.pub-section'));
  var setShown = function(el, shown) { el.style.display = shown ? '' : 'none'; };
  var isShown = function(el) { return el.style.display !== 'none'; };

  var bar = document.createElement('div');
  bar.className = 'tag-filter pub-filter';
  var more = document.createElement('a');
  more.className = 'more-link';
  more.href = '#publications';
  more.textContent = 'All publications (' + cards.length + ') →';

  function show(mode) {
    Array.prototype.forEach.call(bar.children, function(btn) {
      btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
    });
    cards.forEach(function(card) {
      setShown(card, mode === 'all' || card.hasAttribute('data-selected'));
    });
    // A year divider stays only if a visible card follows it before the next one.
    document.querySelectorAll('.year-divider').forEach(function(divider) {
      var el = divider.nextElementSibling, any = false;
      while (el && !el.classList.contains('year-divider')) {
        if (el.classList.contains('pub-card') && isShown(el)) any = true;
        el = el.nextElementSibling;
      }
      setShown(divider, any);
    });
    // A section with nothing left hides with its heading and divider line.
    sections.forEach(function(section) {
      var any = section.querySelector('.pub-card:not([style*="none"])') !== null;
      setShown(section, any);
      var h = section.previousElementSibling;
      if (h && h.tagName === 'H2' && h !== heading) {
        setShown(h, any);
        var hr = h.previousElementSibling;
        if (hr && hr.tagName === 'HR') setShown(hr, any);
      }
    });
    setShown(more, mode === 'selected');
  }

  [['selected', 'Selected'], ['all', 'All (' + cards.length + ')']].forEach(function(m) {
    var btn = document.createElement('span');
    btn.className = 'tag';
    btn.setAttribute('data-mode', m[0]);
    btn.textContent = m[1];
    btn.addEventListener('click', function() { show(m[0]); });
    bar.appendChild(btn);
  });
  more.addEventListener('click', function(e) {
    e.preventDefault();
    show('all');
    heading.scrollIntoView();
  });

  heading.insertAdjacentElement('afterend', bar);
  sections[0].insertAdjacentElement('afterend', more);
  show('selected');
})();
