/* V0 interactivity: theme switch, scroll-spy navigation, project disclosure, contact form. */
(function () {
  var root = document.documentElement;

  /* ---- theme ---- */
  var toggle = document.getElementById('themeToggle');
  var stored = null;
  try { stored = window.localStorage.getItem('theme'); } catch (e) { stored = null; }
  if (stored === 'dark' || stored === 'light') {
    root.setAttribute('data-theme', stored);
  }
  syncToggle();

  toggle.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    toggle.textContent = next === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
    try { window.localStorage.setItem('theme', next); } catch (e) {}
  });

  function syncToggle() {
    toggle.textContent = root.getAttribute('data-theme') === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
  }

  /* ---- scroll spy ---- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });

  window.addEventListener('scroll', function () {
    var y = window.scrollY + 120;
    var current = 0;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i] && sections[i].offsetTop <= y) current = i;
    }
    links.forEach(function (a, i) { a.classList.toggle('is-active', i === current); });
  }, { passive: true });

  /* ---- project disclosure ---- */
  document.querySelectorAll('.card-toggle').forEach(function (el) {
    el.addEventListener('click', function () {
      var target = document.getElementById(el.getAttribute('data-target'));
      if (!target) return;
      var open = target.classList.toggle('is-open');
      el.textContent = open ? 'Hide details' : 'Show details';
    });
  });

  /* ---- contact form ---- */
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var name = form.elements.name.value.trim();
    var email = form.elements.email.value.trim();
    var message = form.elements.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = 'Please fill in all three fields.';
      return;
    }
    if (email.indexOf('@') < 1 || email.indexOf('.') < 0) {
      status.textContent = 'That email address does not look right.';
      return;
    }

    var subject = 'Website enquiry from ' + name;
    var body = message + '\n\nReply to: ' + email;
    var href = 'mailto:marcus.chan@example.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    status.textContent = 'Opening your mail client…';
    window.location.href = href;
  });
})();
