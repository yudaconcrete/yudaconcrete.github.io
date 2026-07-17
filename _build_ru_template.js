const fs = require('fs');
const ru = 'G:/yudaconcrete-preview/ru';
if (!fs.existsSync(ru + '/products')) fs.mkdirSync(ru + '/products', { recursive: true });

const enPage = fs.readFileSync('G:/yudaconcrete-preview/products/hzs120-concrete-batching-plant.html', 'utf8');
let p = enPage;

// Replace nav
p = p.replace(/<ul class="nav-links">[\s\S]*?<\/ul>/, 
  '<ul class="nav-links">\n      <li><a href="/ru/">Главная</a></li>\n      <li><a href="/ru/products/concrete-batching-plant.html">Продукция</a></li>\n      <li><a href="/ru/products/hzs-concrete-batching-plant.html">Серия HZS</a></li>\n      <li><a href="/ru/products/mobile-concrete-batching-plant.html">Мобильные</a></li>\n      <li><a href="/ru/about.html">О нас</a></li>\n      <li><a href="/ru/contact.html" class="nav-cta">Связаться</a></li>\n    </ul>');

// Language switcher
p = p.replace('🌐 English ▼', '🌐 Русский ▼');
p = p.replace('<li class="nav-lang"><a href="javascript:void(0)" onclick="toggleLang()">🌐 Русский ▼</a>', 
  '<li class="nav-lang"><a href="javascript:void(0)" onclick="toggleLang()">🌐 Русский ▼</a>');

// Footer
p = p.replace(/<footer class="footer">[\s\S]*?<\/footer>/, 
  '<footer class="footer"><div class="container"><div class="footer-grid">\n  <div class="footer-brand"><h3>YudaHualong Concrete</h3><p>Производитель бетонных заводов. Прямые поставки из Чжэнчжоу, Китай.</p><p style="margin-top:12px;">Тел: +86 18638788818</p></div>\n  <div><h4>Продукция</h4><ul><li><a href="/ru/products/hzs-concrete-batching-plant.html">Серия HZS</a></li><li><a href="/ru/products/mobile-concrete-batching-plant.html">Мобильные</a></li><li><a href="/ru/products/concrete-mixer.html">Бетоносмесители</a></li><li><a href="/ru/products/concrete-batching-plant.html">Вся продукция</a></li></ul></div>\n  <div><h4>Компания</h4><ul><li><a href="/ru/about.html">О YudaHualong</a></li><li><a href="/ru/company/factory.html">Завод</a></li><li><a href="/ru/company/certificates.html">Сертификаты</a></li><li><a href="/ru/company/customer-visits.html">Визиты клиентов</a></li></ul></div>\n  <div><h4>Поддержка</h4><ul><li><a href="/ru/contact.html">Контакты</a></li><li><a href="/ru/faq.html">FAQ</a></li></ul></div>\n</div><div class="footer-bottom">&copy; 2026 YudaHualong Concrete. Все права защищены. | Чжэнчжоу, Хэнань, Китай</div></div></footer>');

// Fix internal links for RU
p = p.replace(/href="\.\.\//g, 'href="/ru/');
p = p.replace(/href="\.\.\/products\//g, 'href="/ru/products/');

// Translate text
const translations = {
  '<title>HZS120 Concrete Batching Plant | 120m&sup3;/h | YudaHualong Concrete</title>': '<title>Бетонный завод HZS120 | 120 м&sup3;/ч | YudaHualong</title>',
  '<h1>HZS120 Concrete Batching Plant</h1>': '<h1>Бетонный завод HZS120</h1>',
  '120m&sup3;/h forced-type concrete batching plant for large-scale commercial concrete production and infrastructure projects': 'Бетонный завод 120 м&sup3;/ч для крупных инфраструктурных проектов',
  'Product Description': 'Описание продукта',
  'The HZS120 concrete batching plant is a forced-type, high-efficiency batching plant with a theoretical productivity of 120m&sup3;/h.': 'Бетонный завод HZS120 принудительного типа, высокой эффективности, с производительностью 120 м&sup3;/ч.',
  'It uses a JS2000 twin-shaft forced mixer, PLC automatic control system, and precise electronic weighing, making it suitable for large-scale commercial concrete production, road and bridge construction, and various infrastructure projects.': 'Оснащен двухвальным смесителем JS2000, системой PLC и точным электронным взвешиванием для крупных проектов.',
  'Specifications': 'Технические характеристики',
  'Model': 'Модель',
  'Brand': 'Производитель',
  'YUDA': 'YUDA',
  'Theoretical Productivity': 'Производительность',
  'Mixer Model': 'Модель смесителя',
  'Discharge Height': 'Высота выгрузки',
  'Total Power': 'Общая мощность',
  'Weighing Accuracy': 'Точность взвешивания',
  'Aggregate': 'Заполнитель',
  'Cement': 'Цемент',
  'Water': 'Вода',
  'Control System': 'Система управления',
  'Application': 'Применение'
};

for (const [from, to] of Object.entries(translations)) {
  p = p.split(from).join(to);
}

p = p.replace('html lang="en"', 'html lang="ru"');
p = p.replace('Request Quote', 'Запросить цену');

fs.writeFileSync(ru + '/products/hzs120-concrete-batching-plant.html', p, 'utf8');
console.log('Done! ru/products/hzs120 created.');
