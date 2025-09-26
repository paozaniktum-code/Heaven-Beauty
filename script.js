// Year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Product filtering
const categoryBtns = document.querySelectorAll('.category-btn');
const productCards = document.querySelectorAll('.product-card');
categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.getAttribute('data-category');
    productCards.forEach(card => {
      const show = (cat === 'all' || card.getAttribute('data-category') === cat);
      card.classList.toggle('hidden', !show);
    });
  });
});

// Social icons via CDN (version pinned)
const ICON_SRC = {
  facebook: 'https://cdn.jsdelivr.net/npm/simple-icons@11.21.0/icons/facebook.svg',
  instagram: 'https://cdn.jsdelivr.net/npm/simple-icons@11.21.0/icons/instagram.svg',
  line: 'https://cdn.jsdelivr.net/npm/simple-icons@11.21.0/icons/line.svg',
  tiktok: 'https://cdn.jsdelivr.net/npm/simple-icons@11.21.0/icons/tiktok.svg',
  email: 'https://cdn.jsdelivr.net/npm/simple-icons@11.21.0/icons/minutemailer.svg'
};
const PNG_OVERRIDE = []; // e.g., ['instagram']

document.querySelectorAll('.social-links .social-link').forEach(a => {
  const key = (a.getAttribute('title') || '').toLowerCase();
  const img = a.querySelector('img.icon');
  if (!img || !ICON_SRC[key]) return;
  let src = ICON_SRC[key];
  if (PNG_OVERRIDE.includes(key)) src = src.replace(/\.svg(\?|$)/, '.png$1');
  img.src = src;
});

// ================= I18N =================
const I18N = {
  th: {
    brand: 'Heaven & Beauty',
    'nav.home': 'หน้าแรก','nav.products': 'ผลิตภัณฑ์','nav.about': 'เกี่ยวกับเรา','nav.wellness':'Wellness','nav.contact': 'ติดต่อ',
    'lang.label': 'ภาษา:',
    'hero.title': 'ยินดีต้อนรับสู่ Heaven and Beauty',
    'hero.desc': 'เราคัดสรรส่วนผสมที่ดีที่สุดจากธรรมชาติ เพื่อสร้างสรรค์ผลิตภัณฑ์ออร์แกนิคที่ปลอดภัยและอ่อนโยนต่อผิวคุณ ดูแลสุขภาพและความงามอย่างธรรมชาติ',
    'hero.cta': 'สำรวจผลิตภัณฑ์',
    'products.title':'ผลิตภัณฑ์ของเรา','products.cat_all':'ทั้งหมด','products.cat_skincare':'ดูแลผิว','products.cat_wellness':'เวลเนส','products.cat_aroma':'อโรมาเธอราปี',
    'p1.name':'เซรั่มบำรุงผิวหน้า','p1.desc':'เซรั่มจากสารสกัดธรรมชาติ ช่วยให้ผิวเปล่งปลั่งและชุ่มชื้น',
    'p2.name':'ครีมบำรุงผิวกาย','p2.desc':'อโลเวร่าและน้ำมันธรรมชาติ เพื่อผิวนุ่มเนียน',
    'p3.name':'อาหารเสริมคอลลาเจน','p3.desc':'คอลลาเจนจากธรรมชาติ ช่วยบำรุงผิวจากภายใน',
    'btn.buy':'สั่งซื้อ','btn.line':'สั่งซื้อ/แชทไลน์',
    'about.title':'เกี่ยวกับเรา','about.subtitle':'Heaven and Beauty','about.body':'เราเป็นแบรนด์ความงามและสุขภาพที่มุ่งมั่นในการนำเสนอผลิตภัณฑ์ออร์แกนิคคุณภาพสูง ด้วยความเชื่อมั่นว่าความงามที่แท้จริงต้องเริ่มต้นจากภายใน เราคัดสรรส่วนผสมจากธรรมชาติที่ดีที่สุดจากทั่วโลก เพื่อสร้างสรรค์ผลิตภัณฑ์ที่ปลอดภัย อ่อนโยน และมีประสิทธิภาพ',
    'about.stat1':'ปีแห่งประสบการณ์','about.stat2':'ลูกค้าที่ไว้วางใจ','about.stat3':'ส่วนผสมธรรมชาติ',
    'values.title':'ค่านิยมของเรา','wellness.title':'ความงามและสุขภาพแบบองค์รวม','wellness.f1t':'100% ออร์แกนิค','wellness.f1d':'ส่วนผสมจากธรรมชาติล้วนๆ ปลอดสารเคมีที่เป็นอันตราย','wellness.f2t':'ผ่อนคลายจิตใจ','wellness.f2d':'รู้สึกสงบ ผ่อนคลาย และเติมพลัง','wellness.f3t':'เปล่งปลั่งธรรมชาติ','wellness.f3d':'เผยผิวที่สดใส สุขภาพดี ด้วยพลังธรรมชาติ',
    'contact.title':'ติดต่อเรา','contact.subtitle':'เราพร้อมให้คำปรึกษาและดูแลความงามของคุณด้วยใจ
ติดตามข่าวสารและเคล็ดลับความงามเฉพาะจากเรา','contact.branch':'สาขาหลัก','contact.addr':'เซ็นทรัลเวิลด์ ชั้น 3
999/9 เพลินจิต กรุงเทพฯ 10330','contact.phone':'โทรศัพท์','contact.phone_detail':'02-123-4567
หรือ 089-123-4567
เปิดทุกวัน 10:00–22:00 น.','contact.email':'อีเมล','contact.sla':'ตอบกลับภายใน 24 ชั่วโมง','footer':'ดูแลความงามและสุขภาพด้วยใจ'
  },
  en: {
    brand:'Heaven & Beauty',
    'nav.home':'Home','nav.products':'Products','nav.about':'About','nav.wellness':'Wellness','nav.contact':'Contact',
    'lang.label':'Language:',
    'hero.title':'Welcome to Heaven and Beauty',
    'hero.desc':'We carefully select the best natural ingredients to craft safe, gentle organic products. Nurture your health and beauty the natural way.',
    'hero.cta':'Browse Products',
    'products.title':'Our Products','products.cat_all':'All','products.cat_skincare':'Skincare','products.cat_wellness':'Wellness','products.cat_aroma':'Aromatherapy',
    'p1.name':'Brightening Facial Serum','p1.desc':'Natural-extract serum for radiant, hydrated skin.',
    'p2.name':'Nourishing Body Cream','p2.desc':'Aloe vera & natural oils for silky smooth skin.',
    'p3.name':'Collagen Supplement','p3.desc':'Natural collagen to support beauty from within.',
    'btn.buy':'Order','btn.line':'Order / Chat LINE',
    'about.title':'About Us','about.subtitle':'Heaven and Beauty','about.body':'We are a wellness & beauty brand committed to premium organic products. True beauty starts from within—so we use the finest nature-derived ingredients to create safe, gentle and effective formulas.',
    'about.stat1':'Years of Experience','about.stat2':'Happy Customers','about.stat3':'Natural Ingredients',
    'values.title':'Our Values','wellness.title':'Holistic Beauty & Wellness','wellness.f1t':'100% Organic','wellness.f1d':'No harsh chemicals—only safe, natural ingredients.','wellness.f2t':'Relax Your Mind','wellness.f2d':'Feel calm, relaxed and recharged.','wellness.f3t':'Naturally Radiant','wellness.f3d':'Reveal brighter, healthier skin with nature‑powered formulas.',
    'contact.title':'Contact Us','contact.subtitle':'We are here to help you feel your best.
Follow us for exclusive tips & updates.','contact.branch':'Flagship Store','contact.addr':'CentralWorld, 3rd Floor
999/9 Phloen Chit, Bangkok 10330','contact.phone':'Phone','contact.phone_detail':'02‑123‑4567
or 089‑123‑4567
Open daily 10:00–22:00','contact.email':'Email','contact.sla':'Response within 24 hours','footer':'Caring for your beauty & wellness'
  },
  zh: {
    brand:'Heaven & Beauty',
    'nav.home':'首页','nav.products':'产品','nav.about':'关于我们','nav.wellness':'健康护理','nav.contact':'联系我们',
    'lang.label':'语言：',
    'hero.title':'欢迎来到 Heaven and Beauty',
    'hero.desc':'甄选天然成分，打造安全温和的有机产品，让健康与美丽源于自然。',
    'hero.cta':'浏览产品',
    'products.title':'我们的产品','products.cat_all':'全部','products.cat_skincare':'护肤','products.cat_wellness':'健康','products.cat_aroma':'芳香疗法',
    'p1.name':'焕亮保湿精华','p1.desc':'天然萃取，令肌肤水润透亮。',
    'p2.name':'舒润身体霜','p2.desc':'芦荟与植物油，肌肤柔滑细腻。',
    'p3.name':'胶原蛋白补充剂','p3.desc':'由内而外滋养美丽。',
    'btn.buy':'下单','btn.line':'下单 / LINE聊天',
    'about.title':'关于我们','about.subtitle':'Heaven and Beauty','about.body':'我们专注于高品质有机美容与健康产品，坚信真正的美由内而生。精选全球天然成分，安全温和且有效。',
    'about.stat1':'年经验','about.stat2':'位满意客户','about.stat3':'天然成分',
    'values.title':'核心价值','wellness.title':'全方位美与健康','wellness.f1t':'100% 有机','wellness.f1d':'无刺激化学成分，健康发光。','wellness.f2t':'放松身心','wellness.f2d':'帮助平静、放松，恢复能量。','wellness.f3t':'自然焕亮','wellness.f3d':'以自然之力焕活肌肤。',
    'contact.title':'联系我们','contact.subtitle':'我们用心守护你的美丽。
关注我们，获取独家资讯与技巧。','contact.branch':'旗舰店','contact.addr':'CentralWorld 三层
999/9 Phloen Chit, Bangkok 10330','contact.phone':'电话','contact.phone_detail':'02‑123‑4567
或 089‑123‑4567
每日 10:00–22:00','contact.email':'邮箱','contact.sla':'24 小时内回复','footer':'守护你的美与健康'
  },
  ja: {
    brand:'Heaven & Beauty',
    'nav.home':'ホーム','nav.products':'製品','nav.about':'私たちについて','nav.wellness':'ウェルネス','nav.contact':'お問い合わせ',
    'lang.label':'言語:',
    'hero.title':'Heaven and Beauty へようこそ',
    'hero.desc':'厳選した天然成分で安全かつやさしいオーガニック製品を。自然の力で美と健康を育みます。',
    'hero.cta':'製品を見る',
    'products.title':'私たちの製品','products.cat_all':'すべて','products.cat_skincare':'スキンケア','products.cat_wellness':'ウェルネス','products.cat_aroma':'アロマ',
    'p1.name':'ブライトニング美容液','p1.desc':'天然エキスで艶と潤いを。',
    'p2.name':'ボディクリーム','p2.desc':'アロエと植物オイルでなめらか肌へ。',
    'p3.name':'コラーゲンサプリ','p3.desc':'内側から美しさをサポート。',
    'btn.buy':'注文','btn.line':'注文 / LINEチャット',
    'about.title':'私たちについて','about.subtitle':'Heaven and Beauty','about.body':'プレミアムなオーガニック製品にこだわる美容・健康ブランド。真の美は内側から—厳選した天然成分で安全・やさしく・効果的。',
    'about.stat1':'年の実績','about.stat2':'人以上の顧客','about.stat3':'天然成分',
    'values.title':'価値観','wellness.title':'ホリスティックな美と健康','wellness.f1t':'100% オーガニック','wellness.f1d':'有害な化学物質は不使用。','wellness.f2t':'心を整える','wellness.f2d':'心身を穏やかにリラックス。','wellness.f3t':'自然なツヤ','wellness.f3d':'自然の力で健やかな肌へ。',
    'contact.title':'お問い合わせ','contact.subtitle':'あなたの美しさを心を込めてサポート。
最新情報やヒントも配信中。','contact.branch':'旗艦店','contact.addr':'CentralWorld 3階
999/9 Phloen Chit, Bangkok 10330','contact.phone':'電話','contact.phone_detail':'02‑123‑4567
または 089‑123‑4567
毎日 10:00–22:00','contact.email':'メール','contact.sla':'24時間以内に返信','footer':'美と健康を大切に'
  },
  ko: {
    brand:'Heaven & Beauty',
    'nav.home':'홈','nav.products':'제품','nav.about':'회사 소개','nav.wellness':'웰니스','nav.contact':'문의하기',
    'lang.label':'언어:',
    'hero.title':'Heaven and Beauty에 오신 것을 환영합니다',
    'hero.desc':'자연에서 온 최상의 성분으로 안전하고 순한 유기농 제품을 만듭니다. 자연스럽게 건강과 아름다움을 돌보세요.',
    'hero.cta':'제품 보기',
    'products.title':'제품 소개','products.cat_all':'전체','products.cat_skincare':'스킨케어','products.cat_wellness':'웰니스','products.cat_aroma':'아로마',
    'p1.name':'브라이트닝 세럼','p1.desc':'천연 추출물로 빛나는 보습.',
    'p2.name':'바디 크림','p2.desc':'알로에와 천연 오일로 부드러운 피부.',
    'p3.name':'콜라겐 보충제','p3.desc':'내면부터 아름다움을 채우다.',
    'btn.buy':'주문','btn.line':'주문 / LINE 채팅',
    'about.title':'회사 소개','about.subtitle':'Heaven and Beauty','about.body':'프리미엄 유기농 미용·건강 브랜드로, 진정한 아름다움은 내면에서 시작된다고 믿습니다. 전 세계에서 엄선한 자연 유래 성분으로 안전하고 순하며 효과적인 제품을 만듭니다.',
    'about.stat1':'년 경력','about.stat2':'명의 고객','about.stat3':'자연 유래',
    'values.title':'핵심 가치','wellness.title':'홀리스틱 뷰티 & 웰니스','wellness.f1t':'100% 유기농','wellness.f1d':'유해 화학물질 무첨가.','wellness.f2t':'마음의 안정을','wellness.f2d':'몸과 마음의 균형 회복.','wellness.f3t':'자연스러운 광채','wellness.f3d':'자연의 힘으로 건강한 피부.',
    'contact.title':'문의하기','contact.subtitle':'당신의 아름다움을 정성껏 케어합니다.
소식과 팁을 받아보세요.','contact.branch':'플래그십 스토어','contact.addr':'CentralWorld 3층
999/9 Phloen Chit, Bangkok 10330','contact.phone':'전화','contact.phone_detail':'02‑123‑4567
또는 089‑123‑4567
매일 10:00–22:00','contact.email':'이메일','contact.sla':'24시간 이내 응답','footer':'아름다움과 건강을 소중히'
  }
};

function setLang(lang){
  const dict = I18N[lang] || I18N.th;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    const text = dict[key];
    if (typeof text === 'string') {
      el.innerHTML = text.replace(/
/g,'<br>');
    }
  });
  document.documentElement.setAttribute('lang', lang);
  localStorage.setItem('lang', lang);
}

// Init language
const langSelect = document.getElementById('lang');
const initialLang = localStorage.getItem('lang') || (navigator.language || 'th').slice(0,2);
langSelect.value = I18N[initialLang] ? initialLang : 'th';
setLang(langSelect.value);
langSelect.addEventListener('change', e => setLang(e.target.value));
