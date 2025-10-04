(function(){
  const safe = fn => { try{ fn(); } catch(e){ /* console.warn(e); */ } };

  // ปีปัจจุบัน
  safe(() => {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  });

  // เลื่อนนุ่มนวลสำหรับลิงก์ # ภายในหน้าเดียวกัน
  safe(() => {
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click',e=>{
        const href=a.getAttribute('href');
        if(href && href.length>1){
          const t=document.querySelector(href);
          if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth',block:'start'}); }
        }
      });
    });
  });

  // ไฮไลต์เมนูตามหน้า
  safe(() => {
    const nav=document.getElementById('navMenu'); if(!nav) return;
    const links=[...nav.querySelectorAll('a')];
    const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
    const fileOf = href=>{
      try{ const u=new URL(href, location.origin); return (u.pathname.split('/').pop()||'index.html').toLowerCase(); }
      catch{ return href; }
    };
    links.forEach(a=>{
      const f=fileOf(a.getAttribute('href'));
      const isIndex=(f===''||f==='#'||f==='index.html');
      const active=(isIndex&&(path===''||path==='index.html')) || f===path;
      a.classList.toggle('active', !!active);
    });
  });

  // เมนูมือถือ
  document.addEventListener('DOMContentLoaded', function(){
    const burger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if(!burger || !navMenu) return;

    const openMenu = ()=>{
      burger.classList.add('active');
      navMenu.classList.add('active');
      document.body.classList.add('menu-open');
      burger.setAttribute('aria-expanded','true');
    };
    const closeMenu = ()=>{
      burger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
      burger.setAttribute('aria-expanded','false');
    };
    const toggleMenu = ()=> navMenu.classList.contains('active') ? closeMenu() : openMenu();

    burger.addEventListener('click', toggleMenu);

    // ปิดเมื่อคลิกลิงก์ (เฉพาะมือถือ)
    navMenu.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click', ()=>{
        if (window.matchMedia('(max-width:768px)').matches) closeMenu();
      });
    });

    // ปิดเมื่อกด ESC
    window.addEventListener('keydown', e=>{ if (e.key==='Escape') closeMenu(); });

    // ปิดเมื่อคลิกนอกเมนู
    document.addEventListener('click', e=>{
      if (!navMenu.contains(e.target) && !burger.contains(e.target) && navMenu.classList.contains('active')){
        closeMenu();
      }
    });

    // ปิดเมื่อขยายเป็นเดสก์ท็อป
    const mq = window.matchMedia('(min-width:769px)');
    if (mq.addEventListener) mq.addEventListener('change', e=>{ if(e.matches) closeMenu(); });
    else if (mq.addListener) mq.addListener(e=>{ if(e.matches) closeMenu(); });

    // ปิดเมื่อเปลี่ยนแนวจอ
    window.addEventListener('orientationchange', () => closeMenu());
  });
})();
