/* V2 interactivity: theme switch, scroll-spy navigation, project disclosure, contact form.
   Revised from V0 against the passages retrieved in techniques/t2_rag/retrieval_record.json. */
(function () {
  var root = document.documentElement;

  /* ---- theme ---- */
  var toggle = document.getElementById('themeToggle');
  var stored = null;
  try { stored = window.localStorage.getItem('theme'); } catch (e) { stored = null; }
  if (stored === 'dark' || stored === 'light') {
    root.setAttribute('data-theme', stored);
  }
  toggle.textContent = root.getAttribute('data-theme') === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';

  toggle.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    toggle.textContent = next === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
    try { window.localStorage.setItem('theme', next); } catch (e) {}
  });

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

  /* ---- project disclosure (SC 2.1.1): native button carries the state ---- */
  document.querySelectorAll('.card-toggle').forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
      btn.textContent = open ? 'Show details' : 'Hide details';
    });
  });

  /* ---- contact form (SC 3.3.1, SC 4.1.3) ---- */
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');

  function setError(input, message) {
    var hint = document.getElementById(input.id + '-error');
    if (message) {
      input.setAttribute('aria-invalid', 'true');
      hint.textContent = message;
      hint.hidden = false;
    } else {
      input.removeAttribute('aria-invalid');
      hint.textContent = '';
      hint.hidden = true;
    }
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var name = form.elements.name;
    var email = form.elements.email;
    var message = form.elements.message;
    var firstBad = null;

    [name, email, message].forEach(function (f) { setError(f, ''); });
    status.textContent = '';

    if (!name.value.trim()) {
      setError(name, 'Enter your name so I know who is writing.');
      firstBad = firstBad || name;
    }
    if (!email.value.trim()) {
      setError(email, 'Enter an email address I can reply to.');
      firstBad = firstBad || email;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
      setError(email, 'Enter an email address in the format name@example.com.');
      firstBad = firstBad || email;
    }
    if (!message.value.trim()) {
      setError(message, 'Enter a message.');
      firstBad = firstBad || message;
    }

    if (firstBad) {
      status.textContent = 'Your message was not prepared: the highlighted fields need attention.';
      firstBad.focus();
      return;
    }

    var subject = 'Website enquiry from ' + name.value.trim();
    var body = message.value.trim() + '\n\nReply to: ' + email.value.trim();
    status.textContent = 'Message prepared. Your mail client should open now.';
    window.location.href = 'mailto:marcus.chan@example.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
})();
