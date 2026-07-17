const fs = require('fs');
const footer = '<footer class="footer"><div class="container"><div class="footer-grid">\n  <div class="footer-brand"><h3>YudaHualong Concrete</h3><p>Производитель бетонных заводов. Прямые поставки из Чжэнчжоу, Китай.</p><p style="margin-top:12px;">Тел: +86 18638788818</p></div>\n  <div><h4>Продукция</h4><ul><li><a href="/ru/products/hzs-concrete-batching-plant.html">Серия HZS</a></li><li><a href="/ru/products/mobile-concrete-batching-plant.html">Мобильные</a></li><li><a href="/ru/products/concrete-mixer.html">Бетоносмесители</a></li><li><a href="/ru/products/concrete-batching-plant.html">Вся продукция</a></li></ul></div>\n  <div><h4>Компания</h4><ul><li><a href="/ru/about.html">О YudaHualong</a></li><li><a href="/ru/company/factory.html">Завод</a></li><li><a href="/ru/company/certificates.html">Сертификаты</a></li><li><a href="/ru/company/customer-visits.html">Визиты клиентов</a></li></ul></div>\n  <div><h4>Поддержка</h4><ul><li><a href="/ru/contact.html">Контакты</a></li><li><a href="/ru/faq.html">FAQ</a></li></ul></div>\n</div><div class="footer-bottom">&copy; 2026 YudaHualong Concrete. Все права защищены. | Чжэнчжоу, Хэнань, Китай</div></div></footer>';

const nav = '<ul class="nav-links">\n      <li><a href="/ru/">Главная</a></li>\n      <li><a href="/ru/products/concrete-batching-plant.html">Продукция</a></li>\n      <li><a href="/ru/products/hzs-concrete-batching-plant.html">Серия HZS</a></li>\n      <li><a href="/ru/products/mobile-concrete-batching-plant.html">Мобильные</a></li>\n      <li><a href="/ru/about.html">О нас</a></li>\n      <li><a href="/ru/contact.html" class="nav-cta">Связаться</a></li>\n    </ul>';

let p = fs.readFileSync('G:/yudaconcrete-preview/products/trailer-mobile-concrete-plant.html', 'utf8');
p = p.replace(/<ul class="nav-links">[\s\S]*?<\/ul>/, nav);
p = p.replace(/<footer class="footer">[\s\S]*?<\/footer>/, footer);
p = p.replace('🌐 English ▼', '🌐 Русский ▼');
p = p.replace(/href="\.\.\/contact\.html"/g, 'href="/ru/contact.html"');
p = p.replace(/href="\.\.\/about\.html"/g, 'href="/ru/about.html"');
p = p.replace(/href="\.\.\/company\//g, 'href="/ru/company/');
p = p.replace(/href="\.\.\/products\//g, 'href="/ru/products/');
p = p.replace('html lang="en"', 'html lang="ru"');
p = p.replace('Request Quote', 'Запросить цену');
fs.writeFileSync('G:/yudaconcrete-preview/ru/products/trailer-mobile-concrete-plant.html', p, 'utf8');
console.log('Added: trailer-mobile-concrete-plant.html');
