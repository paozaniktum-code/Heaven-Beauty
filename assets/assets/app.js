/* Heaven & Beauty — App JS (Bottom Navigation, No Hamburger) */

// ปีปัจจุบันในฟุตเตอร์
(() => {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();

// ไฮไลต์เมนู active ทั้งบนและล่าง (อ้างอิงชื่อไฟล์ปัจจุบัน)
(() => {
  const setActive = (menuEl) => {
    if (!menuEl) return;
    const links = [...menuEl.querySelectorAll('a')];
    const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const toFile = (href) => {
      try { const u = new URL(href, location.origin); return (u.pathname.split('/').pop() || 'index.html').toLowerCase(); }
      catch { return href; }
    };
    links.forEach(a=>{
      const file = toFile(a.getAttribute('href'));
      const isIndex = (file===''||file==='#'||file==='index.html');
      const active = (isIndex && (current===''||current==='index.html')) || file===current;
      a.classList.toggle('active', !!active);
    });
  };
  setActive(document.getElementById('navMenuTop')); // desktop
  setActive(document.getElementById('bottomNav'));  // mobile bottom nav
})();
