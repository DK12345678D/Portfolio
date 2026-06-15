/**
 * common-init.js
 * Shared initialisation for every page:
 *  - Loads header.html + footer.html
 *  - Sets the active nav-link based on current page filename
 */
(function () {
  function loadFragment(id, file, callback) {
    fetch(file)
      .then(function (r) { return r.text(); })
      .then(function (html) {
        var el = document.getElementById(id);
        if (el) {
          el.innerHTML = html;
          if (typeof callback === 'function') callback();
        }
      });
  }

  function setActiveNav() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    currentPage = currentPage.replace(/\.html$/, '');
    if (currentPage === '') currentPage = 'index';

    document.querySelectorAll('.nav-link').forEach(function (link) {
      var href = link.getAttribute('href') || '';
      var hrefPage = href.split('/').pop() || '';
      hrefPage = hrefPage.replace(/\.html$/, '');
      if (hrefPage === '') hrefPage = 'index';

      if (hrefPage === currentPage) {
        link.classList.add('active');
        link.style.setProperty('color', 'var(--primary-color)', 'important');
      }
    });
  }

  // Load header then set active link, then load footer
  loadFragment('header', 'header.html', setActiveNav);
  loadFragment('footer', 'footer.html');
})();
