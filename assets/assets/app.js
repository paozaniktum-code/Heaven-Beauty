/* ===========================
   Heaven & Beauty — app.js
   เวอร์ชันสมบูรณ์พร้อมใช้งาน
   =========================== */

// ---------- Utils: lock/unlock body scroll (กันจอกระตุก & จดจำตำแหน่ง) ----------
const HB = (() => {
  let scrollYStore = 0;
  let locked = false;

  const lockBody = () => {
    if (locked) return;
    locked = true;
    scrollYStore = window.scrollY || window.pageYOffset;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollYStore}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.classList.add('menu-open');
  };

  const unlockBody = () => {
    if (!locked) return;
    locked = false;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.body.classList.remove('menu-open');
    window.scrollTo(0, scrollYStore);
  };

  return { lockBody, unlockBody };
})();

// ---------- ปีปัจจุบันใน footer ----------
(() => {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();

// ---------- เลื่อนนุ่มนวล (เฉพาะลิงก์ # ภายในหน้าเดียวกัน) ----------
(() => {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href') || '';
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
})();

// ---------- ใส่ active ให้เมนูอัตโนมัติ ตามไฟล์ที่แสดง ----------
(() => {
  const nav = document.getElementById('navMenu');
  if (!nav) return;

  const links = [...nav.querySelectorAll('a')];
  const currentFile = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  const normalize = (href) => {
    try {
      const url = new URL(href, location.origin);
      const file = (url.pathname.split('/').pop() || 'index.html').toLowerCase();
      return file || 'index.html';
    } catch {
      return href.toLowerCase();
    }
  };

  let matched = false;
  links.forEach(a => {
    const file = normalize(a.getAttribute('href') || '');
    const isIndex = (file === '' || file === '#' || file === 'index.html');
    const active = (isIndex && (currentFile === '' || currentFile === 'index.html')) || file === currentFile;
    if (active) {
      a.classList.add('active');
      matched = true;
    } else {
      a.classList.remove('active');
    }
  });

  // ถ้าไม่มีลิงก์ไหนแมตช์ ปล่อย active จาก HTML เดิม
})();

// ---------- เมนูมือถือ: เปิด/ปิด + เคสต่าง ๆ ครบ ----------
(() => {
  const burger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  if (!burger || !navMenu) return;

  const openMenu = () => {
    burger.classList.add('active');
    navMenu.classList.add('active');
    burger.setAttribute('aria-expanded', 'true');
    HB.lockBody();
  };

  const closeMenu = () => {
    burger.classList.remove('active');
    navMenu.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
    HB.unlockBody();
  };

  const toggleMenu = () => (navMenu.classList.contains('active') ? closeMenu() : openMenu());

  // กดปุ่ม burger
  burger.addEventListener('click', toggleMenu);

  // คลิกลิงก์เมนูแล้วปิด (เฉพาะหน้าจอเล็ก)
  navMenu.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 768px)').matches) closeMenu();
    })
  );

  // ปิดเมื่อกด ESC
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  // ปิดเมื่อคลิกนอกเมนู/ปุ่ม
  document.addEventListener('click', (e) => {
    const withinMenu = navMenu.contains(e.target) || burger.contains(e.target);
    if (!withinMenu && navMenu.classList.contains('active')) closeMenu();
  });

  // ปิดเมื่อขยายจอเป็น Desktop
  const mq = window.matchMedia('(min-width: 769px)');
  if (mq.addEventListener) {
    mq.addEventListener('change', (e) => { if (e.matches) closeMenu(); });
  } else if (mq.addListener) {
    // Safari เก่า
    mq.addListener((e) => { if (e.matches) closeMenu(); });
  }

  // ปิดเมื่อเปลี่ยนแนวจอในมือถือ
  window.addEventListener('orientationchange', () => { if (window.matchMedia('(max-width: 768px)').matches) closeMenu(); });
})();

// ---------- ตัวกรองสินค้า (ใช้ได้กับหน้า index/products ที่มี .category-btn/.product-card) ----------
(() => {
  const categoryBtns = document.querySelectorAll('.category-btn');
  const productCards = document.querySelectorAll('.product-card');
  if (!categoryBtns.length || !productCards.length) return;

  // inject keyframes สำหรับอนิเมชันโผล่
  const style = document.createElement('style');
  style.innerHTML = '@keyframes fadeInUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}';
  document.head.appendChild(style);

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.category;
      productCards.forEach(card => {
        const show = (cat === 'all' || card.dataset.category === cat);
        card.style.display = show ? 'block' : 'none';
        if (show) card.style.animation = 'fadeInUp .5s ease forwards';
      });
    });
  });
})();
