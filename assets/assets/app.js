// assets/app.js

(function(){
  // ปีใน footer
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // ฟังก์ชันตั้ง active ให้ลิงก์เมนู ตามไฟล์ที่เปิด
  const setActive = (selector) => {
    const nav = document.querySelector(selector);
    if (!nav) return;
    const links = nav.querySelectorAll('a[href]');
    if (!links.length) return;

    // ไฟล์ปัจจุบัน (รองรับ index.html)
    const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

    // Helper: คืนชื่อไฟล์จาก href (รองรับลิงก์สัมพัทธ์)
    const normalize = (href) => {
      try{
        const u = new URL(href, location.origin);
        const f = (u.pathname.split('/').pop() || 'index.html').toLowerCase();
        return f || 'index.html';
      }catch{
        return href.toLowerCase();
      }
    };

    let matched = false;
    links.forEach(a=>{
      const file = normalize(a.getAttribute('href') || '');
      const isIndexLink = (file==='' || file==='#' || file==='index.html');

      const active =
        (isIndexLink && (current==='' || current==='index.html')) ||
        (file === current);

      a.classList.toggle('active', !!active);
      if (active) matched = true;
    });

    // ถ้าไม่มีลิงก์ไหนแมตช์เลย: ไม่ทำอะไร ปล่อยตาม HTML เดิม
  };

  // ตั้ง active ให้ทั้ง header และ bottom-nav
  document.addEventListener('DOMContentLoaded', ()=>{
    setActive('header .nav-menu');
    setActive('.bottom-nav');
  });
})();
