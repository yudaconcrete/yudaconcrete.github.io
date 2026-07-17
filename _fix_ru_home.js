const fs = require('fs');
let p = fs.readFileSync('G:/yudaconcrete-preview/ru/index.html', 'utf8');

// Fix hero - fully Russian
p = p.replace(
  'Professional concrete batching plant manufacturer in China. ',
  'Профессиональный производитель бетонных заводов в Китае. '
);

// Fix m3 -> m³
p = p.replace(/м3\//g, 'м³/');
p = p.replace(/m3\//g, 'm³/');

// Why icons: F G S C -> Russian letters
p = p.replace('<div class="why-icon">F</div>', '<div class="why-icon">Ц</div>');
p = p.replace('<div class="why-icon">G</div>', '<div class="why-icon">О</div>');
p = p.replace('<div class="why-icon">S</div>', '<div class="why-icon">П</div>');
p = p.replace('<div class="why-icon">C</div>', '<div class="why-icon">С</div>');

// English headings
p = p.replace('Quality Certifications &amp; Awards', 'Сертификаты качества и награды');
p = p.replace(
  'Certified quality management system and international business recognition. CE, ISO 9001, utility patents, and Alibaba Gold Supplier verified.',
  'Сертифицированная система менеджмента качества. CE, ISO 9001, патенты, Alibaba Gold Supplier.'
);

// Stats (lowercase)
p = p.replace('м2 производственная база', 'м² производственная база');
p = p.replace('7+ Стран экспорта', '7+ стран экспорта');
p = p.replace('10 Моделей заводов', '10 моделей заводов');

// Replace bad bullet chars
p = p.replace(/\? /g, '• ');

// Hero title fix
p = p.replace(
  '<h1>YudaHualong<br>Бетонные <span>Заводы</span></h1>',
  '<h1>YudaHualong<br>Бетонные <span>Заводы</span></h1>'
);

fs.writeFileSync('G:/yudaconcrete-preview/ru/index.html', p, 'utf8');
console.log('Fixed!');
