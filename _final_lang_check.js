const fs = require('fs');
const path = require('path');
const siteDir = __dirname;

const LANGUAGES = ['es', 'fr', 'pt', 'ar'];
const PAGES = [
  'index.html', 'about.html', 'contact.html', 'faq.html',
  'products/concrete-batching-plant.html',
  'products/hzs-concrete-batching-plant.html',
  'products/hzs120-concrete-batching-plant.html',
  'products/concrete-mixer.html',
  'products/mobile-concrete-batching-plant.html',
  'company/factory.html',
  'countries/index.html',
  'projects/index.html'
];

console.log('=== FINAL LANGUAGE CONTENT VERIFICATION ===\n');
console.log('Page'.padEnd(35) + 'EN'.padEnd(10) + 'ES'.padEnd(10) + 'FR'.padEnd(10) + 'PT'.padEnd(10) + 'AR'.padEnd(10) + '\n');
console.log('-'.repeat(75));

for (const page of PAGES) {
  const enFile = path.join(siteDir, page);
  if (!fs.existsSync(enFile)) continue;
  const enContent = fs.readFileSync(enFile, 'utf8');
  const enLen = enContent.length;
  
  let row = page.padEnd(30) + `${enLen}B`.padEnd(10);
  
  for (const lang of LANGUAGES) {
    const langFile = path.join(siteDir, lang, page);
    if (!fs.existsSync(langFile)) {
      row += 'MISSING'.padEnd(10);
      continue;
    }
    const langContent = fs.readFileSync(langFile, 'utf8');
    const ratio = Math.round(langContent.length / enLen * 100);
    const tag = ratio >= 85 ? 'OK' : ratio >= 60 ? 'THIN' : 'EMPTY';
    row += `${ratio}% ${tag}`.padEnd(10);
  }
  console.log(row);
}

console.log('\n--- SUMMARY ---');
console.log('OK: >= 85% of EN size');
console.log('THIN: 60-84%');
console.log('EMPTY: < 60%');
