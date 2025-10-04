/* =========================
   Heaven & Beauty — Mobile Menu Fix
   ========================= */

// ปีในฟุตเตอร์ (เดิม)
(() => {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();

// เน้นเมนูเดสก์ท็อปตามหน้า (เดิม)
(() => {
  const nav = document.getElementById('navMenuDesktop') || document.getElementById('navMenu');
  if (!nav) return;
  const links = [...nav.querySelectorAll('a')];
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const toFile = href => {
    try { const u = new URL(href, location.origin); return (u.pathname.split('/').pop() || 'index.html').toLowerCase(); }
    catch { return href; }
  };
  links.forEach(a => {
    const f = toFile(a.getAttribute('href'));
    const isIndex = (f === '' || f === '#' || f === 'index.html');
    const active = (isIndex && (path === '' || path === 'index.html')) || f === path;
    a.classList.toggle('active', !!active);
  });
})();

/* ============ FIX MOBILE MENU ONLY ============ */
(() => {
  const burger = document.getElementById('hamburger');
  const menu   = document.getElementById('navMenu');
  if (!burger || !menu) return;

  // สร้าง backdrop ถ้ายังไม่มี
  let backdrop = document.getElementById('hb-menu-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'hb-menu-backdrop';
    document.body.appendChild(backdrop);
  }

  // ล็อก/ปลดล็อกสกอร์ล หลังเปิดเมนูบนมือถือ
  const lockBody = () => {
    document.documentElement.classList.add('hb-menu-open');
    document.body.classList.add('hb-menu-open');
  };
  const unlockBody = () => {
    document.documentElement.classList.remove('hb-menu-open');
    document.body.classList.remove('hb-menu-open');
  };

  const openMenu = () => {
    burger.classList.add('active');
    menu.classList.add('active');
    backdrop.classList.add('active');
    burger.setAttribute('aria-expanded', 'true');
    lockBody();
  };
  const closeMenu = () => {
    burger.classList.remove('active');
    menu.classList.remove('active');
    backdrop.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
    unlockBody();
  };
  const toggleMenu = () => {
    menu.classList.contains('active') ? closeMenu() : openMenu();
  };

  // เปิด/ปิด เมื่อกดปุ่ม
  burger.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });

  // ปิดเมื่อคลิก backdrop
  backdrop.addEventListener('click', closeMenu);

  // ปิดเมื่อคลิกลิงก์ในเมนู (เฉพาะจอเล็ก)
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 768px)').matches) closeMenu();
    });
  });

  // ปิดด้วย ESC
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  // ถ้ารีไซส์เป็นเดสก์ท็อป ให้ปิดเมนูอัตโนมัติ
  const mq = window.matchMedia('(min-width: 769px)');
  if (mq.addEventListener) mq.addEventListener('change', e => { if (e.matches) closeMenu(); });
  else if (mq.addListener) mq.addListener(e => { if (e.matches) closeMenu(); });

  // กันเมนูโดนคลิกนอกโดยไม่ตั้งใจ
  document.addEventListener('click', (e) => {
    const within = menu.contains(e.target) || burger.contains(e.target);
    if (!within && menu.classList.contains('active')) closeMenu();
  });
})();
