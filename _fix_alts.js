const fs = require('fs');

// Fix alt text in product pages
const hzsModels = ['25','35','50','60','75','90','120','180','240','double-hzs240'];
const replacements = {};

for (const model of hzsModels) {
  const modelName = model === 'double-hzs240' ? 'Double HZS240' : 'HZS' + model;
  const ruName = model === 'double-hzs240' ? 'Сдвоенный HZS240' : 'HZS' + model;
  const altText = 'alt="' + modelName + ' Concrete Batching Plant';
  const ruAlt = 'alt="Бетонный завод ' + ruName + ' YudaHualong"';
  replacements[altText + ' - YudaHualong Concrete"'] = ruAlt;
  replacements[altText + ' - YudaHualong"'] = ruAlt;
}

// Specific page fixes
replacements['JS3000 Concrete Mixer - YudaHualong Concrete'] = 'Бетоносмеситель JS3000 YudaHualong';
replacements['JS Twin Shaft Concrete Mixer'] = 'Двухвальный бетоносмеситель JS';
replacements['HZS series concrete batching plant'] = 'Бетонный завод серии HZS YudaHualong';

const files = [
  'G:/yudaconcrete-preview/ru/index.html',
  'G:/yudaconcrete-preview/ru/products/concrete-batching-plant.html',
  'G:/yudaconcrete-preview/ru/products/concrete-mixer.html',
  ...hzsModels.map(m => 'G:/yudaconcrete-preview/ru/products/' + m + '-concrete-batching-plant.html'),
  'G:/yudaconcrete-preview/ru/products/js3000-concrete-mixer.html',
  'G:/yudaconcrete-preview/ru/products/mobile-concrete-batching-plant.html',
  'G:/yudaconcrete-preview/ru/products/trailer-mobile-concrete-plant.html',
  'G:/yudaconcrete-preview/ru/products/hzs-concrete-batching-plant.html',
];

let total = 0;
for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, 'utf8');
  const orig = html;
  for (const [from, to] of Object.entries(replacements)) {
    html = html.split(from).join(to);
  }
  
  // Fix H2 on concrete-batching-plant page
  html = html.replace('Серия HZS Стационарные Concrete Batching Plants', 'Серия HZS — стационарные бетонные заводы');
  
  if (html !== orig) {
    fs.writeFileSync(file, html, 'utf8');
    total++;
  }
}
console.log('Fixed ' + total + ' pages');
