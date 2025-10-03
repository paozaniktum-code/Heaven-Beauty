// ===== HB utils: lock/unlock body scroll when menu open
const HB = (() => {
  let scrollY = 0;
  const lock = () => {
    scrollY = window.scrollY || window.pageYOffset || 0;
    document.body.classList.add('menu-open');
  };
  const unlock = () => {
    document.body.classList.remove('menu-open');
    window.scrollTo(0, scrollY);
  };
  return { lock, unlock };
})();

// ===== ปีปัจจุบันใน footer
(() => {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();

// ===== เลื่อนนุ่มนวลสำหรับลิงก์ # ภายในหน้า
(() => {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
})();

// ===== ตั้ง active เมนูตามหน้าอัตโนมัติ
(() => {
  const nav = document.getElementById('navMenu');
  if (!nav) return;
  const links = [...nav.querySelectorAll('a')];
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  const getFile = href => {
    try {
      const url = new URL(href, location.origin);
      return (url.pathname.split('/').pop() || 'index.html').toLowerCase();
    } catch { return href; }
  };

  links.forEach(a => {
    const file = getFile(a.getAttribute('href'));
    const isIndex = (file === '' || file === '#' || file === 'index.html');
    const active = (isIndex && (path === '' || path === 'index.html')) || file === path;
    a.classList.toggle('active', !!active);
  });
})();

// ===== เมนูมือถือ: toggle + ปิดเมื่อคลิกลิงก์/นอกเมนู/ESC/resize
(() => {
  const burger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  if (!burger || !navMenu) return;

  const openMenu = () => {
    burger.classList.add('active');
    navMenu.classList.add('active');
    burger.setAttribute('aria-expanded', 'true');
    HB.lock();
  };
  const closeMenu = () => {
    burger.classList.remove('active');
    navMenu.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
    HB.unlock();
  };
  const toggleMenu = () => (navMenu.classList.contains('active') ? closeMenu() : openMenu());

  burger.addEventListener('click', toggleMenu);

  // ปิดหลังคลิกลิงก์ (เฉพาะหน้าจอเล็ก)
  navMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      if (window.matchMedia('(max-width:768px)').matches) closeMenu();
    })
  );

  // ปิดเมื่อกด ESC
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  // ปิดเมื่อคลิกนอกเมนู
  document.addEventListener('click', e => {
    const inside = navMenu.contains(e.target) || burger.contains(e.target);
    if (!inside && navMenu.classList.contains('active')) closeMenu();
  });

  // ปิดเมื่อขยายเป็นเดสก์ท็อป
  const mq = window.matchMedia('(min-width:769px)');
  if (mq.addEventListener) {
    mq.addEventListener('change', ev => { if (ev.matches) closeMenu(); });
  } else if (mq.addListener) {
    mq.addListener(ev => { if (ev.matches) closeMenu(); });
  }

  // ปิดเมื่อเปลี่ยนแนวจอ
  window.addEventListener('orientationchange', () => {
    if (window.matchMedia('(max-width:768px)').matches) closeMenu();
  });
})();
