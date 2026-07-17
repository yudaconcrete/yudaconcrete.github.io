const fs = require('fs');
const ru = 'G:/yudaconcrete-preview/ru';
const en = 'G:/yudaconcrete-preview/products';

// All HZS models and their specs
const models = [
  { file: 'hzs25', cap: '25', mixer: 'JS500' },
  { file: 'hzs35', cap: '35', mixer: 'JS750' },
  { file: 'hzs50', cap: '50', mixer: 'JS1000' },
  { file: 'hzs60', cap: '60', mixer: 'JS1000' },
  { file: 'hzs75', cap: '75', mixer: 'JS1500' },
  { file: 'hzs90', cap: '90', mixer: 'JS1500' },
  { file: 'hzs120', cap: '120', mixer: 'JS2000' },
  { file: 'hzs180', cap: '180', mixer: 'JS3000' },
  { file: 'hzs240', cap: '240', mixer: 'JS4000' },
];

const nav = '<ul class="nav-links">\n      <li><a href="/ru/">Главная</a></li>\n      <li><a href="/ru/products/concrete-batching-plant.html">Продукция</a></li>\n      <li><a href="/ru/products/hzs-concrete-batching-plant.html">Серия HZS</a></li>\n      <li><a href="/ru/products/mobile-concrete-batching-plant.html">Мобильные</a></li>\n      <li><a href="/ru/about.html">О нас</a></li>\n      <li><a href="/ru/contact.html" class="nav-cta">Связаться</a></li>\n    </ul>';

const footer = '<footer class="footer"><div class="container"><div class="footer-grid">\n  <div class="footer-brand"><h3>YudaHualong Concrete</h3><p>Производитель бетонных заводов. Прямые поставки из Чжэнчжоу, Китай.</p><p style="margin-top:12px;">Тел: +86 18638788818</p></div>\n  <div><h4>Продукция</h4><ul><li><a href="/ru/products/hzs-concrete-batching-plant.html">Серия HZS</a></li><li><a href="/ru/products/mobile-concrete-batching-plant.html">Мобильные</a></li><li><a href="/ru/products/concrete-mixer.html">Бетоносмесители</a></li><li><a href="/ru/products/concrete-batching-plant.html">Вся продукция</a></li></ul></div>\n  <div><h4>Компания</h4><ul><li><a href="/ru/about.html">О YudaHualong</a></li><li><a href="/ru/company/factory.html">Завод</a></li><li><a href="/ru/company/certificates.html">Сертификаты</a></li><li><a href="/ru/company/customer-visits.html">Визиты клиентов</a></li></ul></div>\n  <div><h4>Поддержка</h4><ul><li><a href="/ru/contact.html">Контакты</a></li><li><a href="/ru/faq.html">FAQ</a></li></ul></div>\n</div><div class="footer-bottom">&copy; 2026 YudaHualong Concrete. Все права защищены. | Чжэнчжоу, Хэнань, Китай</div></div></footer>';

models.forEach(m => {
  const enFile = `${en}/${m.file}-concrete-batching-plant.html`;
  if (!fs.existsSync(enFile)) { console.log(`  Skip ${m.file}: source missing`); return; }
  
  let p = fs.readFileSync(enFile, 'utf8');
  
  // Replace nav
  p = p.replace(/<ul class="nav-links">[\s\S]*?<\/ul>/, nav);
  // Footer
  p = p.replace(/<footer class="footer">[\s\S]*?<\/footer>/, footer);
  // Lang switcher
  p = p.replace('🌐 English ▼', '🌐 Русский ▼');
  
  // Fix internal links - already handled by the ru/ prefix
  p = p.replace(/href="\.\.\/contact\.html"/g, 'href="/ru/contact.html"');
  p = p.replace(/href="\.\.\/about\.html"/g, 'href="/ru/about.html"');
  p = p.replace(/href="\.\.\/company\//g, 'href="/ru/company/');
  p = p.replace(/href="\.\.\/products\//g, 'href="/ru/products/');
  p = p.replace(/href="\.\.\/faq\.html"/g, 'href="/ru/faq.html"');
  p = p.replace(/href="\.\.\/projects\//g, 'href="/ru/projects/"');
  p = p.replace(/href="\.\.\/countries\//g, 'href="/ru/countries/"');
  
  // Title
  const modelUpper = m.file.toUpperCase();
  p = p.replace(
    /<title>([^<]*)<\/title>/,
    `<title>Бетонный завод ${modelUpper} | ${m.cap} м&sup3;/ч | YudaHualong</title>`
  );
  
  // H1
  const h1Pattern = new RegExp(`<h1>${modelUpper} Concrete Batching Plant</h1>`);
  p = p.replace(h1Pattern, `<h1>Бетонный завод ${modelUpper}</h1>`);
  
  // Description line under H1
  const descPattern = new RegExp(`<p>${m.cap}m&sup3;/h forced-type concrete batching plant[^<]*</p>`);
  p = p.replace(descPattern, `<p>Бетонный завод ${m.cap} м&sup3;/ч для промышленного и коммерческого использования</p>`);
  
  // Product Description heading
  p = p.replace('Product Description', 'Описание продукта');
  p = p.replace('Specifications', 'Технические характеристики');
  p = p.replace('Request Quote', 'Запросить цену');
  
  // Translate spec table headers
  p = p.replace('Model', 'Модель');
  p = p.replace('Brand', 'Производитель');
  p = p.replace('Theoretical Productivity', 'Производительность');
  p = p.replace('Mixer Model', 'Модель смесителя');
  p = p.replace('Discharge Height', 'Высота выгрузки');
  p = p.replace('Total Power', 'Общая мощность');
  p = p.replace('Weighing Accuracy', 'Точность взвешивания');
  p = p.replace('Aggregate', 'Заполнитель');
  p = p.replace('Cement', 'Цемент');
  p = p.replace('Water', 'Вода');
  p = p.replace('Control System', 'Система управления');
  p = p.replace('Application', 'Применение');
  
  // Key descriptions
  p = p.replace(
    new RegExp(`The ${modelUpper} concrete batching plant is a forced-type[^.]+\\.`),
    `Бетонный завод ${modelUpper} — принудительного типа, высокой эффективности, с производительностью ${m.cap} м&sup3;/ч.`
  );
  
  // Translate mixer description
  p = p.replace(
    new RegExp(`It uses a ${m.mixer} twin-shaft forced mixer[^.]+\\.`),
    `Оснащен двухвальным смесителем ${m.mixer} и системой PLC.`
  );
  
  p = p.replace('html lang="en"', 'html lang="ru"');
  
  const ruFile = `${ru}/products/${m.file}-concrete-batching-plant.html`;
  fs.writeFileSync(ruFile, p, 'utf8');
  const size = fs.statSync(ruFile).size;
  console.log(`✅ ${modelUpper}: ${m.cap} м³/ч / ${m.mixer} (${size} bytes)`);
});

console.log('\nDone! All HZS Russian pages created.');
