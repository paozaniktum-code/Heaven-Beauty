// ปีปัจจุบัน
(function(){ const el=document.getElementById('year'); if(el) el.textContent=new Date().getFullYear(); })();

// เลื่อนนุ่มนวลภายในเพจ (เฉพาะลิงก์ที่มี # และอยู่โดเมนเดียวกัน)
(function(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const href=a.getAttribute('href');
      if(href && href.length>1){ e.preventDefault(); const t=document.querySelector(href); t&&t.scrollIntoView({behavior:'smooth',block:'start'}); }
    });
  });
})();

// Hamburger toggle
(function(){
  const burger=document.getElementById('hamburger');
  const navMenu=document.getElementById('navMenu');
  if(!burger||!navMenu) return;
  burger.addEventListener('click',()=>{ burger.classList.toggle('active'); navMenu.classList.toggle('active'); });
  // ปิดเมนูหลังคลิกลิงก์ (เฉพาะหน้าจอเล็ก)
  navMenu.querySelectorAll('a').forEach(el=> el.addEventListener('click',()=>{ if(window.innerWidth<=768){ navMenu.classList.remove('active'); burger.classList.remove('active'); } }));
})();

// ตัวกรองสินค้า (เฉพาะหน้า index)
(function(){
  const categoryBtns=document.querySelectorAll('.category-btn');
  const productCards=document.querySelectorAll('.product-card');
  if(!categoryBtns.length||!productCards.length) return;
  // simple appear animation
  const style=document.createElement('style');
  style.innerHTML='@keyframes fadeInUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}';
  document.head.appendChild(style);

  categoryBtns.forEach(btn=>{
    btn.addEventListener('click',()=>{
      categoryBtns.forEach(b=>b.classList.remove('active')); btn.classList.add('active');
      const cat=btn.dataset.category;
      productCards.forEach(card=>{
        const show=(cat==='all'||card.dataset.category===cat);
        card.style.display=show?'block':'none';
        if(show){ card.style.animation='fadeInUp .5s ease forwards'; }
      });
    });
  });
})();
