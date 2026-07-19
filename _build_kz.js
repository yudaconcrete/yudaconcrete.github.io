const fs = require('fs');
const path = require('path');
const root = 'G:\\yudaconcrete-preview';

// === Step 1: Create KZ directory structure ===
const kzDirs = ['kz', 'kz/company', 'kz/products'];
for (const d of kzDirs) {
  const p = path.join(root, d);
  if (!fs.existsSync(p)) { fs.mkdirSync(p, { recursive: true }); console.log('Created: ' + d); }
}

// === Step 2: Copy English files to /kz/ ===
const copyMap = {
  'index.html': 'kz/index.html',
  'about.html': 'kz/about.html',
  'contact.html': 'kz/contact.html',
  'faq.html': 'kz/faq.html',
  'company/factory.html': 'kz/company/factory.html',
  'company/certificates.html': 'kz/company/certificates.html',
  'company/customer-visits.html': 'kz/company/customer-visits.html',
  'products/concrete-batching-plant.html': 'kz/products/concrete-batching-plant.html',
  'products/concrete-mixer.html': 'kz/products/concrete-mixer.html',
  'products/hzs-concrete-batching-plant.html': 'kz/products/hzs-concrete-batching-plant.html',
  'products/hzs25-concrete-batching-plant.html': 'kz/products/hzs25-concrete-batching-plant.html',
  'products/hzs35-concrete-batching-plant.html': 'kz/products/hzs35-concrete-batching-plant.html',
  'products/hzs50-concrete-batching-plant.html': 'kz/products/hzs50-concrete-batching-plant.html',
  'products/hzs60-concrete-batching-plant.html': 'kz/products/hzs60-concrete-batching-plant.html',
  'products/hzs75-concrete-batching-plant.html': 'kz/products/hzs75-concrete-batching-plant.html',
  'products/hzs90-concrete-batching-plant.html': 'kz/products/hzs90-concrete-batching-plant.html',
  'products/hzs120-concrete-batching-plant.html': 'kz/products/hzs120-concrete-batching-plant.html',
  'products/hzs180-concrete-batching-plant.html': 'kz/products/hzs180-concrete-batching-plant.html',
  'products/hzs240-concrete-batching-plant.html': 'kz/products/hzs240-concrete-batching-plant.html',
  'products/double-hzs240-concrete-plant.html': 'kz/products/double-hzs240-concrete-plant.html',
  'products/js3000-concrete-mixer.html': 'kz/products/js3000-concrete-mixer.html',
  'products/mobile-concrete-batching-plant.html': 'kz/products/mobile-concrete-batching-plant.html',
  'products/trailer-mobile-concrete-plant.html': 'kz/products/trailer-mobile-concrete-plant.html',
};

for (const [src, dest] of Object.entries(copyMap)) {
  const srcPath = path.join(root, src);
  const destPath = path.join(root, dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log('Copied: ' + dest);
  }
}

// === Step 3: Fix paths & translate ===
const kzNav = `<ul class="nav-links">
      <li><a href="/kz/">Басты бет</a></li>
      <li><a href="/kz/products/concrete-batching-plant.html">Өнімдер</a></li>
      <li><a href="/kz/products/hzs-concrete-batching-plant.html">HZS сериясы</a></li>
      <li><a href="/kz/products/mobile-concrete-batching-plant.html">Мобильді</a></li>
      <li><a href="/kz/about.html">Біз туралы</a></li>
      <li><a href="/kz/contact.html" class="nav-cta">Баға сұрау</a></li>
    </ul>`;

const kzFooter = `<footer class="footer"><div class="container"><div class="footer-grid">
  <div class="footer-brand"><h3>YudaHualong Concrete</h3><p>Бетон зауыттарын өндіруші. Чжэнчжоу, Қытайдан тікелей жеткізу.</p><p style="margin-top:12px;">Тел: +86 18638788818</p></div>
  <div><h4>Өнімдер</h4><ul><li><a href="/kz/products/hzs-concrete-batching-plant.html">HZS сериясы</a></li><li><a href="/kz/products/mobile-concrete-batching-plant.html">Мобильді</a></li><li><a href="/kz/products/concrete-mixer.html">Араластырғыштар</a></li><li><a href="/kz/products/concrete-batching-plant.html">Барлық өнімдер</a></li></ul></div>
  <div><h4>Компания</h4><ul><li><a href="/kz/about.html">YudaHualong туралы</a></li><li><a href="/kz/company/factory.html">Зауыт</a></li><li><a href="/kz/company/certificates.html">Сертификаттар</a></li><li><a href="/kz/company/customer-visits.html">Клиент сапарлары</a></li></ul></div>
  <div><h4>Қолдау</h4><ul><li><a href="/kz/contact.html">Байланыс</a></li><li><a href="/kz/faq.html">FAQ</a></li></ul></div>
</div><div class="footer-bottom">&copy; 2026 YudaHualong Concrete. Барлық құқықтар қорғалған. | Чжэнчжоу, Хэнань, Қытай</div></div></footer>`;

const langSwitcher = `      <li class="nav-lang"><a href="javascript:void(0)" onclick="toggleLang()">🌐 Қазақша ▼</a>
        <ul class="lang-dropdown">
          <li><a href="/">🇬🇧 English</a></li>
          <li><a href="/ru/">🇷🇺 Русский</a></li>
          <li><a href="/kz/">🇰🇿 Қазақша</a></li>
        </ul>
      </li>`;

const baseUrl = 'https://yudaconcrete.github.io';

function processKzFile(relPath, depth) {
  const fullPath = path.join(root, relPath);
  if (!fs.existsSync(fullPath)) { console.log('  MISSING: ' + relPath); return; }
  
  let html = fs.readFileSync(fullPath, 'utf8');
  
  // Step 3a: Fix CSS/asset paths
  // Root-level pages need ../ prefix
  if (depth === 1) {
    html = html.replace('href="assets/css/style.css"', 'href="../assets/css/style.css"');
    html = html.replace('src="assets/images/', 'src="../assets/images/');
    html = html.replace('href="favicon.svg"', 'href="../favicon.svg"');
  } else if (depth === 2) {
    html = html.replace(/href="\.\.\/assets\/css\/style\.css"/g, 'href="../../assets/css/style.css"');
    html = html.replace(/src="\.\.\/assets\/images\//g, 'src="../../assets/images/');
    html = html.replace(/href="\.\.\/favicon\.svg"/g, 'href="../../favicon.svg"');
    html = html.replace(/href="\.\.\/assets\/(?!css|images\/company\/certificate)/g, 'href="../../assets/');
  }
  
  // Step 3b: Replace nav
  html = html.replace(/<ul class="nav-links">[\s\S]*?<\/ul>/, kzNav);
  
  // Step 3c: Replace footer
  html = html.replace(/<footer class="footer">[\s\S]*?<\/footer>/, kzFooter);
  
  // Step 3d: Add lang switcher
  const lscss = `<style>.nav-lang { position: relative; }.lang-dropdown { display: none; position: absolute; top: 100%; right: 0; background: white; box-shadow: 0 2px 12px rgba(0,0,0,0.15); border-radius: 8px; min-width: 160px; z-index: 1000; padding: 8px 0; list-style: none; }.lang-dropdown li { padding: 0; }.lang-dropdown a { display: block; padding: 8px 16px; color: var(--text); text-decoration: none; font-size: 14px; white-space: nowrap; }.lang-dropdown a:hover { background: var(--bg-light); }.nav-lang:hover .lang-dropdown { display: block; }</style>`;
  
  if (!html.includes('lang-dropdown')) {
    html = html.replace('</head>', lscss + '\n</head>');
  }
  
  // Add lang switcher item
  if (!html.includes('nav-lang')) {
    html = html.replace('</ul>', langSwitcher + '\n    </ul>');
  }
  
  // Step 3e: hreflang
  if (!html.includes('hreflang="kz"')) {
    // Determine the English equivalent path
    let enPath = '/' + relPath.replace('kz/', '').replace(/\\/g, '/');
    if (enPath === '/index.html') enPath = '/';
    
    const hl = '\n<link rel="alternate" hreflang="en" href="' + baseUrl + enPath + '">\n' +
               '<link rel="alternate" hreflang="ru" href="' + baseUrl + '/' + relPath.replace(/\\/g, '/').replace('kz/', 'ru/') + '">\n' +
               '<link rel="alternate" hreflang="kk" href="' + baseUrl + '/' + relPath.replace(/\\/g, '/') + '">\n' +
               '<link rel="alternate" hreflang="x-default" href="' + baseUrl + '/">';
    html = html.replace('</head>', hl + '\n</head>');
  }
  
  // Step 3f: Add kz.js toggle script
  if (!html.includes('toggleLang')) {
    const toggleScript = `<script>
function toggleLang() { document.querySelector('.lang-dropdown').classList.toggle('show'); }
document.addEventListener('click', function(e) { if(!e.target.closest('.nav-lang')) document.querySelector('.lang-dropdown')?.classList.remove('show'); });
</script>`;
    html = html.replace('</body>', toggleScript + '\n</body>');
  }
  
  // Step 3g: lang="kk" attribute
  html = html.replace('<html lang="en">', '<html lang="kk">');
  
  // Step 3h: Nav logo subtitle
  html = html.replace('<span>Concrete Batching Plant Solutions</span>', '<span>Бетон зауыты өндірушісі</span>');
  
  fs.writeFileSync(fullPath, html, 'utf8');
  console.log('  Initialized: ' + relPath);
}

// Process all files
const kzFiles = [
  'kz/index.html', 'kz/about.html', 'kz/contact.html', 'kz/faq.html',
  'kz/company/factory.html', 'kz/company/certificates.html', 'kz/company/customer-visits.html',
  'kz/products/concrete-batching-plant.html', 'kz/products/concrete-mixer.html',
  'kz/products/hzs-concrete-batching-plant.html',
  'kz/products/hzs25-concrete-batching-plant.html', 'kz/products/hzs35-concrete-batching-plant.html',
  'kz/products/hzs50-concrete-batching-plant.html', 'kz/products/hzs60-concrete-batching-plant.html',
  'kz/products/hzs75-concrete-batching-plant.html', 'kz/products/hzs90-concrete-batching-plant.html',
  'kz/products/hzs120-concrete-batching-plant.html', 'kz/products/hzs180-concrete-batching-plant.html',
  'kz/products/hzs240-concrete-batching-plant.html', 'kz/products/double-hzs240-concrete-plant.html',
  'kz/products/js3000-concrete-mixer.html', 'kz/products/mobile-concrete-batching-plant.html',
  'kz/products/trailer-mobile-concrete-plant.html',
];

console.log('\n=== Processing KZ files ===');
for (const f of kzFiles) {
  const depth = f.split('/').length - 1; // kz = 1, kz/company = 2, kz/products = 2
  processKzFile(f, depth);
}

console.log('\n=== Now translating homepage content ===');

// === Step 4: Translate key pages ===

// kz/index.html - full translation
let idxPath = path.join(root, 'kz/index.html');
let idx = fs.readFileSync(idxPath, 'utf8');

// Title & Description
idx = idx.replace(/<title>[^<]*<\/title>/, '<title>YudaHualong | Бетон зауыты өндірушісі</title>');
idx = idx.replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="YudaHualong бетон зауыттарын өндіреді. HZS25-HZS240 сериялары, зауыттық баға, CE сертификаты және монтаждау қолдауы.">');

// Nav logo
idx = idx.replace('<h1>YudaHualong</h1><span>Бетон зауыты өндірушісі</span>', '<h1>YudaHualong</h1><span>Бетон зауыты өндірушісі</span>');

// Hero
idx = idx.replace('25-480 m&sup3;/h &bull; CE Certified &bull; Factory Direct', '25-480 м³/сағ • CE Сертификат • Зауыттық баға');
idx = idx.replace('<h1>YudaHualong Concrete<br>Batching Plant <span>Manufacturer</span></h1>', '<h1>Бетон зауыттары <span>YudaHualong</span></h1>');
idx = idx.replace('Professional concrete batching plant manufacturer in China. Complete HZS series from 25 to 480 m&sup3;/h. Mobile and stationary solutions for global construction projects. Factory direct pricing with full installation support.', 'Кәсіби бетон зауыттарын өндіруші. HZS сериясы 25-480 м³/сағ. Мобильді және стационарлық шешімдер. Зауыттық баға, монтаждау қолдауы.');
idx = idx.replace('Get Factory Quote', 'Баға сұрау');
idx = idx.replace('Call: +86 18638788818', 'Тел: +86 18638788818');
idx = idx.replace('View Products', 'Өнімдер');
idx = idx.replace('Years Industry Experience', 'Жыл тәжірибе');
idx = idx.replace('sqm Production Base', 'м² өндіріс базасы');
idx = idx.replace('Export Countries', 'экспорт елдері');
idx = idx.replace('Plant Models Available', 'зауыт үлгілері');

// Trust bar
idx = idx.replace('CE Certified', 'CE Сертификат');
idx = idx.replace('ISO 9001', 'ISO 9001');
idx = idx.replace('Factory Direct Price', 'Зауыттық баға');
idx = idx.replace('Installation Support', 'Монтаждау қолдауы');
idx = idx.replace('Spare Parts Supply', 'Қосалқы бөлшектер');
idx = idx.replace('24/7 After-Sales', 'Қолдау 24/7');

// Product section
idx = idx.replace('Complete Range of Concrete Batching Plants', 'Бетон зауыттарының толық ассортименті');
idx = idx.replace('25 to 480 m&sup3;/h capacity. Mobile or stationary. CE certified, factory direct from China.', '25-480 м³/сағ. Мобильді және стационарлық. CE сертификаты, Қытайдан тікелей.');
idx = idx.replace('View All Products & Specs', 'Барлық өнімдер');

// Model table
idx = idx.replace('Full HZS Series Range', 'HZS сериясы');
idx = idx.replace('From small to mega capacity.', 'Кішіден мега-қуатқа дейін.');
idx = idx.replace('Small construction projects', 'Шағын құрылыс');
idx = idx.replace('Small-medium projects', 'Шағын-орта жобалар');
idx = idx.replace('Medium projects, precast', 'Орта жобалар');
idx = idx.replace('Commercial construction', 'Коммерциялық құрылыс');
idx = idx.replace('Medium-large projects', 'Орта-үлкен жобалар');
idx = idx.replace('Medium-large, commercial concrete', 'Орта-үлкен, тауарлы бетон');
idx = idx.replace('Roads, bridges, ready-mix supply', 'Жолдар, көпірлер, тауарлы бетон');
idx = idx.replace('Large infrastructure projects', 'Үлкен инфрақұрылымдық жобалар');
idx = idx.replace('Large-scale commercial concrete', 'Ірі тауарлы бетон');
idx = idx.replace('Mega infrastructure projects', 'Мега инфрақұрылымдық жобалар');

// Why section
idx = idx.replace('25 Years of Concrete Equipment Excellence', '25 жыл бетон жабдықтарын өндіру');
idx = idx.replace('Professional manufacturer delivering complete concrete production solutions worldwide.', 'Кәсіби өндіруші, бүкіл әлемге жеткізіледі.');
idx = idx.replace('Factory Direct Pricing', 'Зауыттық баға');
idx = idx.replace('Global Export Experience', 'Экспорт тәжірибесі');
idx = idx.replace('Full Service Support', 'Толық қолдау');
idx = idx.replace('CE &amp; ISO Certified', 'CE және ISO сертификаттары');
idx = idx.replace('40,000sqm production base in Zhengzhou, China. No middlemen, competitive factory prices with direct manufacturer support.', '40 000 м² өндіріс базасы. Делдалсыз, бәсекеге қабілетті бағалар.');
idx = idx.replace('Successfully exported to Russia, Kazakhstan, Uzbekistan, Nigeria, Pakistan, Kenya, Saudi Arabia, Vietnam, and more.', 'Ресей, Қазақстан, Өзбекстан, Нигерия, Пәкістан, Кения және басқа елдерге экспорт.');
idx = idx.replace('Pre-sales planning, installation guidance, on-site commissioning, operator training, and lifetime spare parts supply.', 'Сату алдындағы жоспарлау, монтаждау, операторларды оқыту, қосалқы бөлшектер.');
idx = idx.replace('International quality standards. CE certification, ISO 9001 quality management system, 2 utility model patents.', 'CE, ISO 9001, 2 патент.');

// Trusted Worldwide
idx = idx.replace('Trusted Worldwide', 'Бүкіл әлемде сенімді');
idx = idx.replace('Recent deliveries and ongoing installations across global markets.', 'Соңғы жеткізулер мен монтаждар.');
idx = idx.replace('View All Projects', 'Барлық жобалар');

// Factory
idx = idx.replace('Factory Strength &amp; Manufacturing Capability', 'Зауыт және өндірістік қуат');
idx = idx.replace('View Full Factory Tour', 'Зауыт экскурсиясы');

// Certs
idx = idx.replace('Quality Certifications &amp; Awards', 'Сертификаттар мен марапаттар');
idx = idx.replace('Certified quality management system and international business recognition. CE, ISO 9001, utility patents, and Alibaba Gold Supplier verified.', 'CE, ISO 9001, патенттер.');
idx = idx.replace('View All Certifications', 'Барлық сертификаттар');

// Customers
idx = idx.replace('Trusted By Global Partners', 'Әлемдік серіктестердің сенімі');
idx = idx.replace('YudaHualong welcomes global customers for factory visits, technical exchange, and partnership building.', 'YudaHualong халықаралық клиенттерді зауытқа шақырады.');
idx = idx.replace('View All Customer Visits', 'Барлық сапарлар');

// FAQ
idx = idx.replace('<h2>Frequently Asked Questions</h2>', '<h2>Жиі қойылатын сұрақтар</h2>');
idx = idx.replace('How much does a concrete batching plant cost?', 'Бетон зауыты қанша тұрады?');
idx = idx.replace('Price depends on capacity, configuration, and automation level. Contact us with your project requirements for a detailed factory-direct quotation.', 'Бағасы өнімділікке және конфигурацияға байланысты. Бізге хабарласыңыз.');
idx = idx.replace('Do you provide installation service?', 'Монтаждау қызметін ұсынасыз ба?');
idx = idx.replace('Yes. We offer full installation guidance and on-site commissioning support. Our technical team can travel to your project site for smooth setup and operation.', 'Иә. Біз толық монтаждау нұсқаулығын және қолдауды ұсынамыз.');
idx = idx.replace('What countries do you export to?', 'Қандай елдерге экспорттайсыз?');
idx = idx.replace('We export to Russia, Kazakhstan, Uzbekistan, Nigeria, Pakistan, Kenya, Saudi Arabia, Vietnam, and more. We handle international logistics, customs clearance, and documentation.', 'Ресей, Қазақстан, Өзбекстан, Нигерия, Пәкістан және басқалар.');
idx = idx.replace('What is the delivery time?', 'Жеткізу мерзімі қандай?');
idx = idx.replace('Standard production takes 15-30 days depending on the model. Shipping to Central Asia typically takes 12-18 days by rail. Sea freight to Africa and Middle East available.', 'Өндіріс 15-30 күн. Орта Азияға 12-18 күн теміржолмен.');
idx = idx.replace('Do you offer after-sales support?', 'Сатудан кейінгі қызмет көрсетесіз бе?');
idx = idx.replace('Yes. Lifetime spare parts supply and 24/7 remote technical support are included. Available by phone and email for urgent inquiries.', 'Иә. Қосалқы бөлшектер және 24/7 техникалық қолдау.');

// CTA
idx = idx.replace('<h2>Ready to Start Your Project?</h2>', '<h2>Жобаңызды бастауға дайынсыз ба?</h2>');
idx = idx.replace('Tell us your requirements for a tailored solution within 24 hours.', 'Талаптарыңызды айтыңыз — 24 сағат ішінде шешім алыңыз.');
idx = idx.replace('Get Factory Quote', 'Баға сұрау');

// Section tags
idx = idx.replace(/class="section-tag">Products</div>/g, 'class="section-tag">Өнімдер</div>');
idx = idx.replace(/class="section-tag">Why YudaHualong</div>/g, 'class="section-tag">Неліктен YudaHualong</div>');
idx = idx.replace(/class="section-tag">Models</div>/g, 'class="section-tag">Модельдер</div>');
idx = idx.replace(/class="section-tag">Projects</div>/g, 'class="section-tag">Жобалар</div>');
idx = idx.replace(/class="section-tag">Factory Strength</div>/g, 'class="section-tag">Зауыт</div>');
idx = idx.replace(/class="section-tag">Certifications</div>/g, 'class="section-tag">Сертификаттар</div>');
idx = idx.replace(/class="section-tag">Global Customers</div>/g, 'class="section-tag">Клиенттер</div>');
idx = idx.replace(/class="section-tag">FAQ</div>/g, 'class="section-tag">Сұрақтар</div>');

// Table headers
idx = idx.replace('<th style="padding:10px;">Модель</th>',  '<th style="padding:10px;">Модель</th>');
idx = idx.replace('<th style="padding:10px;">Capacity</th>', '<th style="padding:10px;">Өнімділік</th>');
idx = idx.replace('<th style="padding:10px;">Mixer</th>', '<th style="padding:10px;">Араластырғыш</th>');
idx = idx.replace('<th style="padding:10px;">Application</th>', '<th style="padding:10px;">Қолдану</th>');

// Product cards
idx = idx.replace('><h3>HZS Plants</h3>', '><h3>HZS бетон зауыттары</h3>');
idx = idx.replace('><h3>Mobile Concrete Plant</h3>', '><h3>Мобильді бетон зауыты</h3>');
idx = idx.replace('><h3>Trailer Mobile Plant</h3>', '><h3>Тіркеме мобильді зауыт</h3>');
idx = idx.replace('><h3>JS Concrete Mixers</h3>', '><h3>JS араластырғыштары</h3>');
idx = idx.replace('View Range →', 'Барлығы →');
idx = idx.replace('Learn More →', 'Толығырақ →');

// Project cards
idx = idx.replace('Russia Project', 'Ресей жобасы');
idx = idx.replace('Inner Mongolia, China', 'Ішкі Моңғолия, Қытай');
idx = idx.replace('Xinjiang, China', 'Шыңжаң, Қытай');
idx = idx.replace('Contract signed July 2026', 'Келісімшарт 2026 шілде');
idx = idx.replace('Operational since April 2026', '2026 сәуірден бастап');
idx = idx.replace('Operational since August 2025', '2025 тамыздан бастап');

// Alt texts
idx = idx.replace(/alt="[^"]*HZS[^"]*Concrete[^"]*"/g, (m) => m.replace(/HZS(\d+)/, 'HZS$1 бетон зауыты YudaHualong').replace('Concrete Batching Plant', ''));

// Hide FAQ
idx = idx.replace('id="faq"', 'id="faq" style="display:none;"');

// Why section icons
idx = idx.replace('<div class="why-icon">F</div>', '<div class="why-icon">Б</div>');
idx = idx.replace('<div class="why-icon">G</div>', '<div class="why-icon">Т</div>');
idx = idx.replace('<div class="why-icon">S</div>', '<div class="why-icon">К</div>');
idx = idx.replace('<div class="why-icon">C</div>', '<div class="why-icon">С</div>');

fs.writeFileSync(idxPath, idx, 'utf8');
console.log('✅ kz/index.html fully translated');

// === Step 5: About page ===
let aboutPath = path.join(root, 'kz/about.html');
let about = fs.readFileSync(aboutPath, 'utf8');
about = about.replace(/<title>[^<]*<\/title>/, '<title>YudaHualong туралы | Бетон зауыты өндірушісі</title>');
about = about.replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="YudaHualong — кәсіби бетон зауыттарын өндіруші. 25 жылдық тәжірибе, CE және ISO сертификаттары.">');
fs.writeFileSync(aboutPath, about, 'utf8');
console.log('✅ kz/about.html SEO done');

// === Step 6: Contact page ===
let contactPath = path.join(root, 'kz/contact.html');
let contact = fs.readFileSync(contactPath, 'utf8');
contact = contact.replace(/<title>[^<]*<\/title>/, '<title>Байланыс YudaHualong | Бетон зауыты өндірушісі</title>');
contact = contact.replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="YudaHualong компаниясына хабарласыңыз. Бетон зауыттары бойынша баға ұсынысын алыңыз.">');
fs.writeFileSync(contactPath, contact, 'utf8');
console.log('✅ kz/contact.html SEO done');

// === Step 7: FAQ page ===
let faqPath = path.join(root, 'kz/faq.html');
let faq = fs.readFileSync(faqPath, 'utf8');
faq = faq.replace(/<title>[^<]*<\/title>/, '<title>Жиі қойылатын сұрақтар | YudaHualong бетон зауыттары</title>');
faq = faq.replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="Бетон зауыттары туралы жиі қойылатын сұрақтар: бағалар, жеткізу, монтаждау және қызмет көрсету.">');
fs.writeFileSync(faqPath, faq, 'utf8');
console.log('✅ kz/faq.html SEO done');

// === Step 8: Company pages ===
['factory.html', 'certificates.html', 'customer-visits.html'].forEach(f => {
  const p = path.join(root, 'kz/company', f);
  if (!fs.existsSync(p)) return;
  let html = fs.readFileSync(p, 'utf8');
  
  const titles = {
    'factory.html': 'YudaHualong зауыты | Бетон жабдықтарын өндіру',
    'certificates.html': 'YudaHualong сертификаттары | CE, ISO 9001',
    'customer-visits.html': 'YudaHualong зауытына сапар | Халықаралық серіктестер'
  };
  const descs = {
    'factory.html': 'YudaHualong зауыты Чжэнчжоу, Қытай. Бетон зауыттарын өндіру, сапа бақылау.',
    'certificates.html': 'CE және ISO 9001 сертификаттары, патенттер. Халықаралық сапа стандарттары.',
    'customer-visits.html': 'YudaHualong халықаралық клиенттерді қарсы алады. Ресей, Қазақстан және басқа елдер.'
  };
  
  if (titles[f]) {
    html = html.replace(/<title>[^<]*<\/title>/, '<title>' + titles[f] + '</title>');
    html = html.replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="' + descs[f] + '">');
    fs.writeFileSync(p, html, 'utf8');
    console.log('✅ kz/company/' + f + ' SEO done');
  }
});

// === Step 9: Product pages SEO ===
const hzsData = [
  ['hzs25', '25', 'JS500'], ['hzs35', '35', 'JS750'], ['hzs50', '50', 'JS1000'],
  ['hzs60', '60', 'JS1000'], ['hzs75', '75', 'JS1500'], ['hzs90', '90', 'JS1500'],
  ['hzs120', '120', 'JS2000'], ['hzs180', '180', 'JS3000'], ['hzs240', '240', 'JS4000'],
];

for (const [model, cap, mixer] of hzsData) {
  const pH = path.join(root, 'kz/products', model + '-concrete-batching-plant.html');
  if (!fs.existsSync(pH)) continue;
  let h = fs.readFileSync(pH, 'utf8');
  
  const modelName = 'HZS' + (model === 'double-hzs240' ? '240' : model.replace('hzs', '').toUpperCase());
  h = h.replace(/<title>[^<]*<\/title>/, '<title>' + modelName + ' бетон зауыты | YudaHualong</title>');
  h = h.replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="' + modelName + ' бетон зауыты ' + cap + ' м³/сағ. YudaHualong өндірушісі, CE сертификаты.">');
  h = h.replace(/<h1>[^<]*<\/h1>/, '<h1>' + modelName + ' бетон зауыты</h1>');
  
  // Fix alt text
  h = h.replace(/alt="HZS\d+ Concrete Batching Plant[^"]*"/g, 'alt="' + modelName + ' бетон зауыты YudaHualong"');
  
  fs.writeFileSync(pH, h, 'utf8');
}

// Double HZS240
const dPath = path.join(root, 'kz/products/double-hzs240-concrete-plant.html');
if (fs.existsSync(dPath)) {
  let h = fs.readFileSync(dPath, 'utf8');
  h = h.replace(/<title>[^<]*<\/title>/, '<title>Қос HZS240 бетон зауыты (480 м³/сағ) | YudaHualong</title>');
  h = h.replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="Қос HZS240 бетон зауыты 480 м³/сағ. Екі JS4000 араластырғышы бар. Мега жобаларға арналған.">');
  h = h.replace(/<h1>[^<]*<\/h1>/, '<h1>Қос HZS240 бетон зауыты (480 м³/сағ)</h1>');
  h = h.replace(/alt="Double HZS240[^"]*"/g, 'alt="Қос HZS240 бетон зауыты YudaHualong"');
  fs.writeFileSync(dPath, h, 'utf8');
}

// Other product pages
const other = {
  'concrete-batching-plant.html': { title: 'YudaHualong өнімдері | Бетон зауыттары', desc: 'YudaHualong бетон зауыттары: HZS сериясы (25-480 м³/сағ), мобильді зауыттар және араластырғыштар.' },
  'hzs-concrete-batching-plant.html': { title: 'HZS сериясы | Стационарлық бетон зауыттары | YudaHualong', desc: 'HZS сериясы 25-480 м³/сағ. Екі білікті араластырғыштар, PLC автоматтандыру.' },
  'concrete-mixer.html': { title: 'Бетон араластырғыштар YudaHualong | JS сериясы', desc: 'JS500-JS4500 екі білікті араластырғыштар. Біркелкі араластыру.' },
  'mobile-concrete-batching-plant.html': { title: 'Мобильді бетон зауыты | YudaHualong', desc: 'Мобильді бетон зауыты. Жылдам монтаж, іргетассыз. Жол құрылысына арналған.' },
  'trailer-mobile-concrete-plant.html': { title: 'Тіркеме мобильді бетон зауыты | YudaHualong', desc: 'Барабанды тіркеме мобильді зауыт. Жылдам орнату.' },
  'js3000-concrete-mixer.html': { title: 'Бетон араластырғыш JS3000 | YudaHualong', desc: 'JS3000 екі білікті араластырғыш. HZS180 зауыттарына арналған.' },
};

for (const [file, data] of Object.entries(other)) {
  const p = path.join(root, 'kz/products', file);
  if (!fs.existsSync(p)) continue;
  let h = fs.readFileSync(p, 'utf8');
  h = h.replace(/<title>[^<]*<\/title>/, '<title>' + data.title + '</title>');
  h = h.replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="' + data.desc + '">');
  fs.writeFileSync(p, h, 'utf8');
}

console.log('✅ All product pages SEO done');

// === Step 10: Fix remaining English on index page ===
idx = fs.readFileSync(idxPath, 'utf8');
const moreFixes = [
  ['HZS HZS Concrete Batching Plant', 'HZS бетон зауыты YudaHualong'],
  ['Mobile Concrete Batching Plant', 'Мобильді бетон зауыты YudaHualong'],
  ['Trailer Mobile Concrete Plant', 'Тіркеме мобильді зауыт YudaHualong'],
  ['JS Twin Shaft Concrete Mixer', 'JS екі білікті араластырғыш YudaHualong'],
  ['YUDA Concrete -', 'YudaHualong -'],
  ['YUDA Concrete', 'YudaHualong'],
  ['HZS120 Concrete Plant', 'HZS120 бетон зауыты'],
  ['HZS60 Concrete Plant', 'HZS60 бетон зауыты'],
  ['Concrete Batching Plant Solutions', 'Бетон зауыты өндірушісі'],
  ['40,000sqm production base', '40 000 м² өндіріс базасы'],
  ['CE &amp; ISO Certified', 'CE және ISO сертификаттары'],
  ['Double HZS240', 'Қос HZS240'],
];
for (const [from, to] of moreFixes) {
  idx = idx.split(from).join(to);
}
idx = idx.replace('Show All Products & Specs', 'Барлық өнімдер');
fs.writeFileSync(idxPath, idx, 'utf8');

console.log('\n========================================');
console.log('🇰🇿 KAZAKHSTAN STATION BUILD COMPLETE!');
console.log('========================================');
