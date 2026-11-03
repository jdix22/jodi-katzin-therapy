/* Jodi Katzin Therapy — small, dependency-free site script.
 *
 * FACTS (source: jodikatzintherapy.com, Nov 2026). Every mention on the pages and in JSON-LD uses these.
 *   Name:        Jodi Katzin Therapy — Jodi Katzin, Occupational Therapist (COTO, in good standing)
 *   Offers:      Psychotherapy-based support for women in midlife
 *   Where:       Virtual, or in person in Vaughan, Ontario (no street address published)
 *   Email:       jodikatzin@yahoo.com (replies within 1–2 business days)
 *   Instagram:   @jodikatzintherapy
 *   Free consult: 15 minutes
 *   Sessions:    50 minutes, $150, weekly or biweekly; OT receipt for extended health
 *   Training:    ACT (Psychwire, Russ Harris), IFS Unburdened Eating Spring Intensive (IFS Institute),
 *                Eating Psychology / Mind Body Eating Coach (Institute for the Psychology of Eating)
 */
(function () {
  document.documentElement.classList.remove('no-js');

  // Optional: paste a form service URL (Formspree, Basin, etc.) to send the consult form without opening an email app.
  var FORM_ENDPOINT = '';
  // Instagram: create a free JSON feed at behold.so connected to @jodikatzintherapy and paste its feed ID here.
  // The four saved posts in the page show only if the feed can't be reached.
  var BEHOLD_FEED_ID = 'YEK180S54YRMfsbW0GL6';
  var EMAIL = 'jodikatzin@yahoo.com';

  // header shadow + mobile menu
  var head = document.querySelector('.site-head');
  var onScroll = function () { head && head.classList.toggle('scrolled', window.scrollY > 8); };
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  var mb = document.querySelector('.menu-btn'), nav = document.getElementById('nav');
  if (mb && nav) {
    mb.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      mb.setAttribute('aria-expanded', open);
      mb.textContent = open ? 'Close' : 'Menu';
    });
  }

  // reveal on scroll
  var rv = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    rv.forEach(function (el) { io.observe(el); });
  } else rv.forEach(function (el) { el.classList.add('in'); });

  // "What are you carrying?" picker on the home page
  var carry = document.querySelector('.carry');
  if (carry) {
    var out = document.querySelector('.carry-out'), msg = out.querySelector('p'), go = out.querySelector('a');
    var base = go.getAttribute('href');
    // A different note for each count, so the message grows with what the visitor names
    var notes = [
      '',
      'You named one thing. That is a good place to start a conversation.',
      'Two things at once can feel like a lot. You don’t have to sort them out on your own.',
      'Three things pulling at you at once. No wonder it feels like everything is shifting beneath your feet.',
      'Four things is a lot to carry. We can start wherever feels most pressing.',
      'Five things at once. It makes sense that you are feeling stretched thin.',
      'All six. Midlife really is a lot all at once, and you don’t have to carry it alone.'
    ];
    var update = function () {
      var on = [].slice.call(carry.querySelectorAll('[aria-pressed=true]'));
      var n = on.length;
      out.dataset.n = n;
      if (!n) { msg.textContent = 'Tap anything that sounds familiar. Nothing is saved or sent.'; go.setAttribute('href', base); go.lastChild.textContent = ' Book a free consultation'; return; }
      msg.textContent = notes[n];
      go.setAttribute('href', base + '?topics=' + on.map(function (b) { return b.dataset.topic; }).join(','));
      go.lastChild.textContent = ' Bring these to a free consultation';
    };
    carry.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true');
      update();
    });
    update();
  }

  // IFS parts diagram on My Approach
  var parts = document.querySelector('.parts');
  if (parts) {
    var cap = document.querySelector('.parts-cap');
    var btns = document.querySelectorAll('.parts-legend button');
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.dataset.part, was = b.getAttribute('aria-pressed') === 'true';
        btns.forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
        parts.querySelectorAll('.p').forEach(function (p) { p.style.opacity = ''; });
        if (was) { cap.textContent = cap.dataset.default; return; }
        b.setAttribute('aria-pressed', 'true');
        parts.querySelectorAll('.p').forEach(function (p) { if (p.dataset.part !== k) p.style.opacity = '.25'; });
        cap.textContent = b.dataset.cap;
      });
    });
  }

  // Consultation request form on Connect
  var form = document.querySelector('form.ask');
  if (form) {
    var q = new URLSearchParams(location.search).get('topics');
    if (q) q.split(',').forEach(function (t) {
      var box = form.querySelector('input[name=topic][value="' + t.replace(/"/g, '') + '"]'); if (box) box.checked = true;
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = new FormData(form);
      var topics = f.getAll('topic').map(function (v) {
        var l = form.querySelector('input[name=topic][value="' + v + '"]'); return l ? l.dataset.label : v;
      });
      var lines = [
        'Hi Jodi,', '',
        'I would like to book a free 15-minute consultation.', '',
        'Name: ' + (f.get('name') || ''),
        'Email: ' + (f.get('email') || ''),
        f.get('phone') ? 'Phone: ' + f.get('phone') : null,
        'Prefer: ' + (f.get('format') || 'Not sure yet'),
        topics.length ? 'What I’m navigating: ' + topics.join('; ') : null,
        f.get('times') ? 'Good times for a call: ' + f.get('times') : null,
        f.get('message') ? '\n' + f.get('message') : null
      ].filter(function (l) { return l !== null; }).join('\n');
      var done = form.querySelector('.form-done');
      if (FORM_ENDPOINT) {
        fetch(FORM_ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: f })
          .then(function (r) { if (!r.ok) throw 0; done.textContent = 'Thank you. I will get back to you within 1–2 business days.'; done.classList.add('show'); form.reset(); })
          .catch(function () { location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Free consultation request') + '&body=' + encodeURIComponent(lines); });
        return;
      }
      location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Free consultation request') + '&body=' + encodeURIComponent(lines);
      done.classList.add('show');
    });
  }

  // Instagram: swap the saved posts for her latest four once a Behold feed is connected
  var ig = document.querySelector('[data-ig]');
  if (ig && BEHOLD_FEED_ID) {
    fetch('https://feeds.behold.so/' + BEHOLD_FEED_ID, { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw r.status; return r.json(); })
      .then(function (d) {
        var posts = (Array.isArray(d) ? d : (d && d.posts) || []).slice(0, 4);
        if (!posts.length) return;
        ig.textContent = '';
        posts.forEach(function (p) {
          var s = p.sizes || {};
          var src = (s.medium && s.medium.mediaUrl) || (s.small && s.small.mediaUrl) || (p.mediaType === 'VIDEO' ? p.thumbnailUrl : p.mediaUrl);
          if (!src) return;
          var cap = (p.prunedCaption || p.caption || '').trim();
          var a = document.createElement('a');
          a.className = 'ig-tile'; a.href = p.permalink || 'https://www.instagram.com/jodikatzintherapy/';
          a.target = '_blank'; a.rel = 'noopener';
          a.setAttribute('aria-label', (cap ? 'Instagram post: ' + cap.slice(0, 80) : 'Instagram post') + ', opens Instagram');
          var img = document.createElement('img');
          img.src = src; img.alt = ''; img.loading = 'lazy'; img.width = 480; img.height = 600;
          a.appendChild(img);
          if (p.mediaType === 'VIDEO') a.insertAdjacentHTML('beforeend', '<svg class="ig-kind" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg>');
          ig.appendChild(a);
        });
      })
      .catch(function () { /* keep the saved posts */ });
  }

  var y = document.getElementById('yr'); if (y) y.textContent = new Date().getFullYear();
})();
