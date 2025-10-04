/* Heaven & Beauty — App JS (เฉพาะเมนูมือถือ + ฟุตเตอร์ปี) */

// ปีในฟุตเตอร์
(() => {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();

// ไฮไลต์เมนูตามหน้า (เดสก์ท็อปยังทำงานปกติ)
(() => {
  const nav = document.getElementById('navMenu');
  if (!nav) return;
  const links = [...nav.querySelectorAll('a')];
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const toFile = href => {
    try { const u = new URL(href, location.origin); return (u.pathname.split('/').pop() || 'index.html').toLowerCase(); }
    catch { return href; }
  };
  links.forEach(a=>{
    const f = toFile(a.getAttribute('href'));
    const isIndex = (f === '' || f === '#' || f === 'index.html');
    const active = (isIndex && (path === '' || path === 'index.html')) || f === path;
    a.classList.toggle('active', !!active);
  });
})();

// เมนูมือถือแบบ Drawer ขวา
(() => {
  const burger = document.getElementById('hamburger');
  const menu   = document.getElementById('navMenu');
  const backdrop = document.getElementById('mobileBackdrop');
  if (!burger || !menu || !backdrop) return;

  const openMenu = () => {
    burger.classList.add('active');
    menu.classList.add('active');
    backdrop.classList.add('active');
    burger.setAttribute('aria-expanded','true');
    document.body.classList.add('menu-open');
  };

  const closeMenu = () => {
    burger.classList.remove('active');
    menu.classList.remove('active');
    backdrop.classList.remove('active');
    burger.setAttribute('aria-expanded','false');
    document.body.classList.remove('menu-open');
  };

  const toggleMenu = () => menu.classList.contains('active') ? closeMenu() : openMenu();

  // เปิด/ปิด
  burger.addEventListener('click', (e)=>{ e.stopPropagation(); toggleMenu(); });

  // ปิดเมื่อคลิก backdrop
  backdrop.addEventListener('click', closeMenu);

  // ปิดเมื่อคลิกลิงก์ในเมนู (เฉพาะจอเล็ก)
  menu.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=>{ if (window.matchMedia('(max-width:768px)').matches) closeMenu(); });
  });

  // ปิดด้วย ESC
  window.addEventListener('keydown', e=>{ if (e.key === 'Escape') closeMenu(); });

  // ปิดเมื่อขยายเป็นเดสก์ท็อป
  const mq = window.matchMedia('(min-width:769px)');
  if (mq.addEventListener) mq.addEventListener('change', e=>{ if (e.matches) closeMenu(); });
  else if (mq.addListener)   mq.addListener(e=>{ if (e.matches) closeMenu(); });

  // คลิกนอกเมนูให้ปิด (กันเผลอ)
  document.addEventListener('click', (e)=>{
    const within = menu.contains(e.target) || burger.contains(e.target);
    if (!within && menu.classList.contains('active')) closeMenu();
  }, true);
})();
