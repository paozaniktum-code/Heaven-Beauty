/* assets/app.js — Heaven & Beauty */

// ===== Utils =====
const HB = (() => {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const debounce = (fn, wait = 120) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(null, args), wait);
    };
  };
  return { $, $$, clamp, debounce };
})();

// ===== Footer year =====
(() => {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();

// ===== Smooth scroll for in-page anchors (#...) =====
(() => {
  HB.$$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (!href || href.length <= 1) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

// ===== Active state for Header menu + Bottom Navigation =====
(() => {
  const getCurrentFile = () => {
    const path = window.location.pathname;
    let file = path.split('/').pop() || 'index.html';
    if (file === '' || file === '/') file = 'index.html';
    file = file.split('?')[0].split('#')[0];
    return file.toLowerCase();
  };

  const normalizeFileFromLink = (a) => {
    const data = a.getAttribute('data-page');
    const raw = (data && data.trim()) || a.getAttribute('href') || '';
    try {
      const url = new URL(raw, window.location.origin);
      const file = (url.pathname.split('/').pop() || 'index.html')
        .split('?')[0].split('#')[0];
      return (file || 'index.html').toLowerCase();
    } catch {
      if (raw.startsWith('#')) return getCurrentFile();
      const parts = raw.split('/').pop() || 'index.html';
      return parts.split('?')[0].split('#')[0].toLowerCase();
    }
  };

  const current = getCurrentFile();

  const headerLinks = HB.$$('#navMenuTop a');
  headerLinks.forEach(a => {
    const file = normalizeFileFromLink(a);
    if (file === current) a.classList.add('active');
    else a.classList.remove('active');
  });

  const bottomLinks = HB.$$('.bottom-nav a');
  bottomLinks.forEach(a => {
    const file = normalizeFileFromLink(a);
    if (file === current) a.classList.add('active');
    else a.classList.remove('active');
  });
})();

// ===== Hide/Show Bottom Nav on scroll (mobile UX) =====
(() => {
  const nav = document.querySelector('.bottom-nav');
  if (!nav) return;

  let lastY = window.scrollY;
  let acc = 0;
  const MAX_OFFSET = 56;

  const apply = () => {
    nav.style.transform = `translateY(${acc}px)`;
  };

  const onScroll = () => {
    const y = window.scrollY;
    const diff = HB.clamp(y - lastY, -12, 12);
    lastY = y;

    acc = HB.clamp(acc + diff, 0, MAX_OFFSET);
    if (diff < -8) acc = 0;

    apply();
  };

  const onResize = () => {
    acc = 0;
    apply();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', HB.debounce(onResize, 150));
})();

// ===== Product filter (index & products; safe if missing) =====
(() => {
  const btns = HB.$$('.category-btn');
  const cards = HB.$$('.product-card');
  if (!btns.length || !cards.length) return;

  const style = document.createElement('style');
  style.innerHTML = '@keyframes fadeInUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}';
  document.head.appendChild(style);

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.category;
      cards.forEach(c => {
        const show = (cat === 'all' || c.dataset.category === cat);
        c.style.display = show ? 'block' : 'none';
        if (show) c.style.animation = 'fadeInUp .5s ease forwards';
      });
    });
  });
})();
