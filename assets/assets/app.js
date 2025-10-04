/* Heaven & Beauty — App JS (Bottom Navigation) */

// ปีปัจจุบันในฟุตเตอร์
(() => {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();

// ไฮไลต์เมนูอัตโนมัติทั้งเมนูบน (เดสก์ท็อป) และเมนูล่าง (มือถือ)
(() => {
  const highlight = (menuEl) => {
    if (!menuEl) return;
    const links = [...menuEl.querySelectorAll('a')];
    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const toFile = (href) => {
      try { const u = new URL(href, location.origin); return (u.pathname.split('/').pop() || 'index.html').toLowerCase(); }
      catch { return href; }
    };
    links.forEach(a=>{
      const f = toFile(a.getAttribute('href'));
      const isIndex = (f === '' || f === '#' || f === 'index.html');
      const active = (isIndex && (path === '' || path === 'index.html')) || f === path;
      a.classList.toggle('active', !!active);
    });
  };

  highlight(document.getElementById('navMenuTop'));   // เมนูบน (เดสก์ท็อป)
  highlight(document.getElementById('bottomNav'));    // เมนูล่าง (มือถือ)
})();
