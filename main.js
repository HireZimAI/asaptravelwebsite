(function () {
  'use strict';

  /* ---------- Sticky nav ---------- */
  var nav = document.getElementById('asap-nav');
  var logoDark = document.getElementById('logo-dark');
  var logoLight = document.getElementById('logo-light');
  function onScroll() {
    var s = window.scrollY > 40;
    if (nav) {
      nav.style.background = s ? 'rgba(255,255,255,0.94)' : 'transparent';
      nav.style.backdropFilter = s ? 'blur(12px)' : 'none';
      nav.style.webkitBackdropFilter = s ? 'blur(12px)' : 'none';
      nav.style.borderBottom = s ? '1px solid #ECEAE7' : '1px solid transparent';
      nav.style.boxShadow = s ? '0 1px 24px -14px rgba(0,0,0,0.35)' : 'none';
    }
    if (logoDark) logoDark.style.opacity = s ? '1' : '0';
    if (logoLight) logoLight.style.opacity = s ? '0' : '1';
    var links = document.querySelectorAll('[data-navlink]');
    for (var i = 0; i < links.length; i++) links[i].style.color = s ? '#1F1E1E' : '#FFFFFF';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Hero video montage ---------- */
  var CLIPS = [
    'https://videos.pexels.com/video-files/855538/855538-hd_1920_1080_25fps.mp4',
    'https://videos.pexels.com/video-files/5607553/5607553-hd_1920_1080_24fps.mp4',
    'https://videos.pexels.com/video-files/5214167/5214167-hd_1920_1080_25fps.mp4'
  ];
  var clipIdx = 0, showingA = true, playing = true;
  var vidA = document.getElementById('hero-video');
  var vidB = document.getElementById('hero-video-b');
  var toggleBtn = document.getElementById('video-toggle');
  if (vidA) { vidA.muted = true; var p = vidA.play(); if (p && p.catch) p.catch(function () {}); }
  setInterval(function () {
    if (!playing || !vidA || !vidB) return;
    clipIdx = (clipIdx + 1) % CLIPS.length;
    var next = showingA ? vidB : vidA;
    var cur = showingA ? vidA : vidB;
    next.src = CLIPS[clipIdx];
    next.muted = true;
    var swap = function () {
      next.style.opacity = '1';
      cur.style.opacity = '0';
      showingA = !showingA;
      setTimeout(function () { try { cur.pause(); } catch (e) {} }, 1300);
    };
    var p2 = next.play();
    if (p2 && p2.then) p2.then(swap).catch(function () {}); else swap();
  }, 9000);
  if (toggleBtn) toggleBtn.addEventListener('click', function () {
    var cur = (!showingA && vidB && vidB.src) ? vidB : vidA;
    if (!cur) return;
    if (cur.paused) { cur.play(); playing = true; toggleBtn.innerHTML = '&#10074;&#10074; Pause film'; }
    else { cur.pause(); playing = false; toggleBtn.innerHTML = '&#9654; Play film'; }
  });

  /* ---------- Fleet tabs ---------- */
  var CARS = [
    { id: 'lc', name: 'Toyota Land Cruiser GX', cat: 'Safari 4x4', tabs: ['safari'], price: '$180', seats: 7, trans: 'Automatic', drive: '4x4', badge: 'Safari-ready', gradient: 'linear-gradient(135deg,#3A1512,#6B2C1A)', img: 'https://images.pexels.com/photos/20584984/pexels-photo-20584984.jpeg?auto=compress&cs=tinysrgb&w=900', photo: 'Photo: white Land Cruiser on red-dirt track' },
    { id: 'fortuner', name: 'Toyota Fortuner 4x4', cat: 'Safari 4x4', tabs: ['safari'], price: '$120', seats: 7, trans: 'Automatic', drive: '4x4', badge: 'Most popular', gradient: 'linear-gradient(135deg,#2A2828,#4A4746)', img: 'https://images.pexels.com/photos/11143602/pexels-photo-11143602.jpeg?auto=compress&cs=tinysrgb&w=900', photo: 'Photo: Fortuner at a park gate, morning light' },
    { id: 'hilux', name: 'Toyota Hilux Double Cab', cat: 'Safari 4x4', tabs: ['safari'], price: '$110', seats: 5, trans: 'Manual / Auto', drive: '4x4', badge: 'Rough roads', gradient: 'linear-gradient(135deg,#141313,#3A1512)', img: 'https://images.pexels.com/photos/18240251/pexels-photo-18240251.jpeg?auto=compress&cs=tinysrgb&w=900', photo: 'Photo: Hilux crossing a bush river' },
    { id: 'fit', name: 'Honda Fit', cat: 'Individual', tabs: ['city'], price: '$40', seats: 5, trans: 'Automatic', drive: 'City', badge: 'Best value', gradient: 'linear-gradient(135deg,#2A2828,#4A4746)', photo: 'Photo: Honda Fit, city street' },
    { id: 'aqua', name: 'Toyota Aqua Hybrid', cat: 'Individual', tabs: ['city'], price: '$45', seats: 5, trans: 'Automatic', drive: 'Hybrid', badge: 'Fuel saver', gradient: 'linear-gradient(135deg,#233A2E,#3E5E48)', photo: 'Photo: Aqua at a fuel station, dusk' },
    { id: 'xtrail', name: 'Nissan X-Trail', cat: 'Individual', tabs: ['city', 'safari'], price: '$70', seats: 5, trans: 'Automatic', drive: 'AWD', badge: 'City + trips', gradient: 'linear-gradient(135deg,#2A2828,#141313)', img: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=900&auto=format&fit=crop', photo: 'Photo: X-Trail on a scenic lookout' },
    { id: 'quantum', name: 'Toyota Quantum', cat: 'Group', tabs: ['group'], price: '$100', seats: 14, trans: 'Manual', drive: 'Groups', badge: 'Tour groups', gradient: 'linear-gradient(135deg,#141313,#2A2828)', img: 'https://images.pexels.com/photos/19548262/pexels-photo-19548262.jpeg?auto=compress&cs=tinysrgb&w=900', photo: 'Photo: Quantum loading luggage at arrivals' },
    { id: 'starex', name: 'Hyundai Grand Starex', cat: 'Group', tabs: ['group'], price: '$110', seats: 11, trans: 'Automatic', drive: 'Groups', badge: 'Family trips', gradient: 'linear-gradient(135deg,#2A2828,#4A4746)', photo: 'Photo: Starex at a lodge entrance' },
    { id: 'prado', name: 'Land Cruiser Prado TX-L', cat: 'Executive', tabs: ['executive', 'safari'], price: '$150', seats: 5, trans: 'Automatic', drive: '4x4', badge: 'Executive', gradient: 'linear-gradient(135deg,#141313,#3A1512)', img: 'https://images.pexels.com/photos/15223039/pexels-photo-15223039.jpeg?auto=compress&cs=tinysrgb&w=900', photo: 'Photo: Prado on granite outcrop at dusk' },
    { id: 'merc', name: 'Mercedes-Benz E-Class', cat: 'Executive', tabs: ['executive'], price: '$160', seats: 5, trans: 'Automatic', drive: 'Chauffeur opt.', badge: 'Arrive in style', gradient: 'linear-gradient(135deg,#2A2828,#1F1E1E)', img: 'https://images.pexels.com/photos/6152812/pexels-photo-6152812.jpeg?auto=compress&cs=tinysrgb&w=900', photo: 'Photo: E-Class under hotel portico' },
    { id: 'vclass', name: 'Mercedes-Benz V-Class', cat: 'Executive', tabs: ['executive', 'group'], price: '$220', seats: 6, trans: 'Automatic', drive: 'Chauffeur opt.', badge: 'VIP groups', gradient: 'linear-gradient(135deg,#1F1E1E,#4A4746)', photo: 'Photo: V-Class, evening city lights' }
  ];
  var TABS = [
    { key: 'safari', label: 'Safari & 4x4' },
    { key: 'city', label: 'City & Individual' },
    { key: 'group', label: 'Group & Vans' },
    { key: 'executive', label: 'Executive' }
  ];
  var activeTab = 'safari';
  var tabsEl = document.getElementById('fleet-tabs');
  var gridEl = document.getElementById('fleet-grid');

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  function carCard(c) {
    var bg = c.img ? "#141313 url('" + c.img + "') center / cover" : c.gradient;
    var cap = c.img ? '' : '<span style="position:absolute;bottom:12px;left:12px;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.55);background:rgba(0,0,0,.28);padding:5px 9px;border-radius:6px;">' + esc(c.photo) + '</span>';
    return '<div class="fleet-card" style="border:1px solid #ECEAE7;border-radius:24px;overflow:hidden;background:#fff;transition:all .35s cubic-bezier(.4,0,.2,1);">' +
      '<div style="position:relative;aspect-ratio:16/10;background:' + bg + ';overflow:hidden;">' + cap +
      '<span style="position:absolute;top:14px;left:14px;background:#fff;color:#1F1E1E;font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;padding:6px 12px;border-radius:9999px;">' + esc(c.cat) + '</span>' +
      '<span style="position:absolute;top:14px;right:14px;background:rgba(227,0,14,.92);color:#fff;font-size:11px;font-weight:600;letter-spacing:.06em;padding:6px 12px;border-radius:9999px;">' + esc(c.badge) + '</span>' +
      '</div><div style="padding:24px;">' +
      '<div style="display:flex;align-items:baseline;justify-content:space-between;gap:12px;">' +
      '<h3 style="font-family:\'Space Grotesk\',sans-serif;font-weight:600;font-size:21px;letter-spacing:-.02em;color:#1F1E1E;margin:0;">' + esc(c.name) + '</h3>' +
      '<p style="font-family:\'Space Grotesk\',sans-serif;font-weight:700;font-size:20px;color:#E3000E;margin:0;white-space:nowrap;">' + esc(c.price) + '<span style="font-size:13px;color:#6E6A66;font-weight:500;">/day</span></p></div>' +
      '<div style="display:flex;gap:16px;margin:12px 0 18px;font-size:13.5px;color:#6E6A66;">' +
      '<span>' + c.seats + ' seats</span><span>&middot;</span><span>' + esc(c.trans) + '</span><span>&middot;</span><span>' + esc(c.drive) + '</span></div>' +
      '<a href="#book" class="link-arrow" style="display:inline-flex;align-items:center;gap:7px;color:#1F1E1E;font-weight:600;font-size:15px;border-bottom:2px solid #E3000E;padding-bottom:3px;transition:gap .2s,color .2s;">Book this &rarr;</a>' +
      '</div></div>';
  }

  function render() {
    if (tabsEl) {
      tabsEl.innerHTML = '';
      TABS.forEach(function (t) {
        var b = document.createElement('button');
        b.className = 'tab-btn' + (t.key === activeTab ? ' active' : '');
        b.textContent = t.label;
        b.addEventListener('click', function () { activeTab = t.key; render(); });
        tabsEl.appendChild(b);
      });
    }
    if (gridEl) {
      gridEl.innerHTML = CARS.filter(function (c) { return c.tabs.indexOf(activeTab) !== -1; }).map(carCard).join('');
    }
  }
  render();

  /* ---------- Destinations arrows ---------- */
  var track = document.getElementById('dest-track');
  var prev = document.getElementById('dest-prev');
  var next = document.getElementById('dest-next');
  if (prev && track) prev.addEventListener('click', function () { track.scrollBy({ left: -382 }); });
  if (next && track) next.addEventListener('click', function () { track.scrollBy({ left: 382 }); });

  /* ---------- Booking form ---------- */
  var form = document.getElementById('asap-booking-request');
  var success = document.getElementById('booking-success');
  var reset = document.getElementById('booking-reset');
  if (form && success) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.style.display = 'none';
      success.style.display = 'block';
      try {
        var book = document.getElementById('book');
        window.scrollTo({ top: book.offsetTop - 90, behavior: 'smooth' });
      } catch (err) {}
    });
    if (reset) reset.addEventListener('click', function () {
      form.reset();
      form.style.display = 'grid';
      success.style.display = 'none';
    });
  }
})();
