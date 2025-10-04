// ปีในฟุตเตอร์
(() => {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();

// ไฮไลต์เมนูเดสก์ท็อปตามหน้า
(() => {
  const nav=document.getElementById('navMenuDesktop'); if(!nav) return;
  const links=[...nav.querySelectorAll('a')];
  const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const fileOf = href => {
    try { const u = new URL(href, location.origin); return (u.pathname.split('/').pop()||'index.html').toLowerCase(); }
    catch { return href; }
  };
  links.forEach(a=>{
    const f=fileOf(a.getAttribute('href'));
    const isIndex=(f===''||f==='#'||f==='index.html');
    const active=(isIndex&&(path===''||path==='index.html')) || f===path;
    a.classList.toggle('active', !!active);
  });
})();

// เมนูมือถือ: ปิด/เปิด + UX ครบ
(() => {
  const navMobile = document.getElementById('navMobile');
  const panel = document.getElementById('mobilePanel');
  const backdrop = document.getElementById('mobileBackdrop');
  if (!navMobile) return;

  const closeMenu = () => { navMobile.open = false; document.body.classList.remove('menu-open'); };
  const openMenu  = () => { navMobile.open = true;  document.body.classList.add('menu-open'); };

  // Toggle body lock เมื่อมีการเปิด/ปิด
  navMobile.addEventListener('toggle', () => {
    if (navMobile.open) document.body.classList.add('menu-open');
    else document.body.classList.remove('menu-open');
  });

  // คลิกลิงก์แล้วปิด
  panel?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => closeMenu());
  });

  // แตะฉากหลังเพื่อปิด
  backdrop?.addEventListener('click', () => closeMenu());

  // ปิดด้วย ESC
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  // ถ้าขยายจอเป็นเดสก์ท็อป ให้ปิด
  const mq = window.matchMedia('(min-width:769px)');
  if (mq.addEventListener) mq.addEventListener('change', e => { if (e.matches) closeMenu(); });
  else if (mq.addListener) mq.addListener(e => { if (e.matches) closeMenu(); });

  // โฟกัสแรกเข้าที่ลิงก์แรก
  navMobile.addEventListener('toggle', () => {
    if (navMobile.open) {
      const firstLink = panel?.querySelector('a');
      firstLink && firstLink.focus({preventScroll:true});
    }
  });

  // กัน scroll-jump iOS (optional)
  document.addEventListener('touchmove', (e) => {
    if (navMobile.open && !panel.contains(e.target)) e.preventDefault();
  }, { passive:false });
})();
