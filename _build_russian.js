const fs = require('fs');
const path = require('path');
const root = 'G:\\yudaconcrete-preview';

// Russian navigation
const ruNav = `    <ul class="nav-links">
      <li><a href="/ru/">Главная</a></li>
      <li><a href="/ru/products/concrete-batching-plant.html">Продукция</a></li>
      <li><a href="/ru/products/hzs-concrete-batching-plant.html">Серия HZS</a></li>
      <li><a href="/ru/products/mobile-concrete-batching-plant.html">Мобильные</a></li>
      <li><a href="/ru/about.html">О нас</a></li>
      <li><a href="/ru/contact.html" class="nav-cta">Связаться</a></li>
    </ul>`;

const ruFooter = `<footer class="footer"><div class="container"><div class="footer-grid">
  <div class="footer-brand"><h3>YudaHualong Concrete</h3><p>Производитель бетонных заводов. Прямые поставки из Чжэнчжоу, Китай.</p><p style="margin-top:12px;">Тел: +86 18638788818</p></div>
  <div><h4>Продукция</h4><ul><li><a href="/ru/products/hzs-concrete-batching-plant.html">Серия HZS</a></li><li><a href="/ru/products/mobile-concrete-batching-plant.html">Мобильные</a></li><li><a href="/ru/products/concrete-mixer.html">Бетоносмесители</a></li><li><a href="/ru/products/concrete-batching-plant.html">Вся продукция</a></li></ul></div>
  <div><h4>Компания</h4><ul><li><a href="/ru/about.html">О YudaHualong</a></li><li><a href="/ru/company/factory.html">Завод</a></li><li><a href="/ru/company/certificates.html">Сертификаты</a></li><li><a href="/ru/company/customer-visits.html">Визиты клиентов</a></li></ul></div>
  <div><h4>Поддержка</h4><ul><li><a href="/ru/contact.html">Контакты</a></li><li><a href="/ru/faq.html">FAQ</a></li></ul></div>
</div><div class="footer-bottom">&copy; 2026 YudaHualong Concrete. Все права защищены. | Чжэнчжоу, Хэнань, Китай</div></div></footer>`;

// Language switcher HTML to inject into nav
const langSwitcher = `      <li class="nav-lang"><a href="javascript:void(0)" onclick="toggleLang()">🌐 Language ▼</a>
        <ul class="lang-dropdown">
          <li><a href="/">🇬🇧 English</a></li>
          <li><a href="/ru/">🇷🇺 Русский</a></li>
        </ul>
      </li>`;

const langSwitcherCSS = `
<style>
.nav-lang { position: relative; }
.lang-dropdown { display: none; position: absolute; top: 100%; right: 0; background: white; box-shadow: 0 2px 12px rgba(0,0,0,0.15); border-radius: 8px; min-width: 160px; z-index: 1000; padding: 8px 0; list-style: none; }
.lang-dropdown li { padding: 0; }
.lang-dropdown a { display: block; padding: 8px 16px; color: var(--text); text-decoration: none; font-size: 14px; white-space: nowrap; }
.lang-dropdown a:hover { background: var(--bg-light); }
.nav-lang:hover .lang-dropdown { display: block; }
</style>`;

// Create directories
['ru', 'ru/products', 'ru/company', 'ru/countries'].forEach(d => {
  const dp = path.join(root, d);
  if (!fs.existsSync(dp)) fs.mkdirSync(dp, { recursive: true });
  console.log(`Created: ${d}/`);
});

// Read Russian catalog for content
const russianContent = fs.readFileSync('G:\\搅拌站出海\\产品介绍\\多语言\\russian_catalog.txt', 'utf8');
const ruCatalog = russianContent;

// Function to convert an English page to Russian
function createRuPage(enPath, ruPath, extraReplaces = {}) {
  if (!fs.existsSync(enPath)) { console.log(`  Source missing: ${enPath}`); return; }
  
  let html = fs.readFileSync(enPath, 'utf8');
  
  // Replace nav
  html = html.replace(/<ul class="nav-links">[\s\S]*?<\/ul>/, ruNav);
  
  // Replace footer
  html = html.replace(/<footer class="footer">[\s\S]*?<\/footer>/, ruFooter);
  
  // Replace language in title (keep some English)
  html = html.replace(/<title>([^<]*)<\/title>/, (m, t) => {
    return `<title>${t.replace('YudaHualong Concrete', 'YudaHualong Бетонные Заводы')}</title>`;
  });
  
  // Add lang switcher CSS
  html = html.replace('</head>', langSwitcherCSS + '\n</head>');
  
  // Add lang switcher to nav
  html = html.replace('</ul>', langSwitcher + '\n    </ul>');
  
  // Add lang toggle script
  html = html.replace('</body>', `<script>
function toggleLang() { document.querySelector('.lang-dropdown').classList.toggle('show'); }
document.addEventListener('click', function(e) { if(!e.target.closest('.nav-lang')) document.querySelector('.lang-dropdown')?.classList.remove('show'); });
</script>\n</body>`);
  
  // Apply extra replaces
  for (const [from, to] of Object.entries(extraReplaces)) {
    html = html.split(from).join(to);
  }
  
  // Add html lang="ru"
  html = html.replace('<html lang="en">', '<html lang="ru">');
  
  fs.writeFileSync(ruPath, html, 'utf8');
  console.log(`  Created: ${path.relative(root, ruPath)}`);
}

// === Create Russian pages ===

console.log('\n=== Creating Russian core pages ===\n');

// ru/index.html
createRuPage(path.join(root, 'index.html'), path.join(root, 'ru', 'index.html'), {
  'Concrete Batching Plant Manufacturer | 25-480m³/h': 'Производитель бетонных заводов | 25-480 м³/ч',
  'YUDA Concrete - Concrete Batching Plant Manufacturer': 'YUDA - Производитель бетонных заводов',
  '<h1>YudaHualong Concrete<br>Batching Plant <span>Manufacturer</span></h1>': '<h1>YudaHualong<br>Бетонные <span>Заводы</span></h1>',
  '<section class="section" id="faq">': '<section class="section" id="faq" style="display:none;">',
  'Ready to Start Your Project?': 'Готовы начать проект?',
  'Tell us your requirements for a tailored solution within 24 hours.': 'Расскажите о своих требованиях — получите индивидуальное решение в течение 24 часов.',
  'Get Factory Quote': 'Получить предложение',
  'View Products': 'Вся продукция',
  'Call: +86 18638788818': 'Тел: +86 18638788818',
  '25-480 m&sup3;/h &bull; CE Certified &bull; Factory Direct': '25-480 м³/ч • CE Сертификат • Прямые поставки',
});

// ru/about.html
createRuPage(path.join(root, 'about.html'), path.join(root, 'ru', 'about.html'), {
  'About YudaHualong Concrete | Factory Tour & Certifications': 'О компании YudaHualong | Экскурсия по заводу и сертификаты',
  '<h1>About YudaHualong Concrete</h1>': '<h1>О компании YudaHualong</h1>',
  "25+ years of concrete equipment manufacturing excellence. Factory direct, globally trusted.": '25+ лет производства бетонного оборудования. Прямые поставки, мировое доверие.',
  'About Our Company': 'О нашей компании',
});

// ru/contact.html
createRuPage(path.join(root, 'contact.html'), path.join(root, 'ru', 'contact.html'), {
  'Contact Us | YUDA Concrete Batching Plant Manufacturer': 'Контакты | YUDA Производитель бетонных заводов',
  '<h1>Contact Us</h1>': '<h1>Контакты</h1>',
  "Get in touch with YudaHualong Concrete for factory direct pricing and customized solutions.": 'Свяжитесь с YudaHualong для получения цены и индивидуального решения.',
});

// ru/faq.html
createRuPage(path.join(root, 'faq.html'), path.join(root, 'ru', 'faq.html'), {
  'Frequently Asked Questions': 'Часто задаваемые вопросы',
  '<h1>FAQ</h1>': '<h1>Часто задаваемые вопросы</h1>',
});

// ru/products/concrete-batching-plant.html  
createRuPage(path.join(root, 'products', 'concrete-batching-plant.html'), path.join(root, 'ru', 'products', 'concrete-batching-plant.html'), {
  'All Products': 'Вся продукция',
  '<h1>Concrete Batching Plants</h1>': '<h1>Бетонные заводы</h1>',
});

// ru/products/hzs-concrete-batching-plant.html
createRuPage(path.join(root, 'products', 'hzs-concrete-batching-plant.html'), path.join(root, 'ru', 'products', 'hzs-concrete-batching-plant.html'), {
  'HZS Series': 'Серия HZS',
  '<h1>HZS Concrete Batching Plants</h1>': '<h1>Бетонные заводы серии HZS</h1>',
});

// ru/products/concrete-mixer.html
createRuPage(path.join(root, 'products', 'concrete-mixer.html'), path.join(root, 'ru', 'products', 'concrete-mixer.html'), {
  'JS Twin Shaft Concrete Mixer': 'Двухвальный бетоносмеситель JS',
  '<h1>JS Twin-Shaft Concrete Mixers</h1>': '<h1>Двухвальные бетоносмесители JS</h1>',
});

// ru/products/mobile-concrete-batching-plant.html
createRuPage(path.join(root, 'products', 'mobile-concrete-batching-plant.html'), path.join(root, 'ru', 'products', 'mobile-concrete-batching-plant.html'), {
  'Mobile Concrete': 'Мобильный бетонный',
  '<h1>Mobile Concrete Batching Plant</h1>': '<h1>Мобильный бетонный завод</h1>',
});

// ru/company/factory.html
createRuPage(path.join(root, 'company', 'factory.html'), path.join(root, 'ru', 'company', 'factory.html'), {
  '<h1>Our Factory</h1>': '<h1>Наш завод</h1>',
  'YudaHualong Factory Overview': 'Обзор завода YudaHualong',
});

// ru/company/certificates.html  
createRuPage(path.join(root, 'company', 'certificates.html'), path.join(root, 'ru', 'company', 'certificates.html'), {
  '<h1>Certifications & Qualifications</h1>': '<h1>Сертификаты и лицензии</h1>',
});

// ru/company/customer-visits.html
createRuPage(path.join(root, 'company', 'customer-visits.html'), path.join(root, 'ru', 'company', 'customer-visits.html'), {
  '<h1>Customer Visits</h1>': '<h1>Визиты клиентов</h1>',
});

console.log('\n=== Now add language switcher to English pages ===\n');

// Add language switcher to all English HTML files  
function addLangToEnglish(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  entries.forEach(e => {
    const p = path.join(dir, e.name);
    if (e.isDirectory() && !e.name.startsWith('.') && e.name !== 'node_modules' && e.name !== 'ru') addLangToEnglish(p);
    else if (e.name.endsWith('.html')) {
      let html = fs.readFileSync(p, 'utf8');
      if (html.includes('lang-switcher-added')) return;
      
      // Add CSS
      if (!html.includes('lang-dropdown')) {
        html = html.replace('</head>', langSwitcherCSS + '\n</head>');
      }
      
      // Add language switcher to nav
      if (!html.includes('nav-lang')) {
        html = html.replace('</ul>', langSwitcher + '\n    </ul>');
      }
      
      // Add script
      if (!html.includes('toggleLang')) {
        html = html.replace('</body>', `<script>
function toggleLang() { document.querySelector('.lang-dropdown').classList.toggle('show'); }
document.addEventListener('click', function(e) { if(!e.target.closest('.nav-lang')) document.querySelector('.lang-dropdown')?.classList.remove('show'); });
</script>\n</body>`);
      }
      
      // Mark as processed
      html = html.replace('</head>', '<!-- lang-switcher-added -->\n</head>');
      
      fs.writeFileSync(p, html, 'utf8');
      console.log(`  EN: ${path.relative(root, p)}`);
    }
  });
}

addLangToEnglish(root);

console.log('\n=== Done! Russian site skeleton created ===');
