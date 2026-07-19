// Step 2: Translate KZ site - use Unicode escapes for Kazakh text
const fs = require('fs');
const path = require('path');
const root = 'G:/yudaconcrete-preview';

// Helper: generate Kazakh text from Unicode escapes
function kz(str) {
  // Kazakh translation map for common phrases
  const kk = {
    'Home': '\\u0411\\u0430\\u0441\\u0442\\u044b \\u0431\\u0435\\u0442',
    'Products': '\\u04e8\\u043d\\u0456\\u043c\\u0434\\u0435\\u0440',
    'About Us': '\\u0411\\u0456\\u0437 \\u0442\\u0443\\u0440\\u0430\\u043b\\u044b',
    'Contact': '\\u0411\\u0430\\u0439\\u043b\\u0430\\u043d\\u044b\\u0441',
    'Get Quote': '\\u0411\\u0430\\u0493\\u0430 \\u0441\\u04b1\\u0440\\u0430\\u0443',
    'About Company': '\\u0411\\u0456\\u0437 \\u0442\\u0443\\u0440\\u0430\\u043b\\u044b',
    'Company': '\\u041a\\u043e\\u043c\\u043f\\u0430\\u043d\\u0438\\u044f',
    'Products Footer': '\\u04e8\\u043d\\u0456\\u043c\\u0434\\u0435\\u0440',
    'All Products': '\\u0411\\u0430\\u0440\\u043b\\u044b\\u049b \\u04e9\\u043d\\u0456\\u043c\\u0434\\u0435\\u0440',
    'Support': '\\u049a\\u043e\\u043b\\u0434\\u0430\\u0443',
    'Factory': '\\u0417\\u0430\\u0443\\u044b\\u0442',
    'Certificates': '\\u0421\\u0435\\u0440\\u0442\\u0438\\u0444\\u0438\\u043a\\u0430\\u0442\\u0442\\u0430\\u0440',
    'Customer Visits': '\\u041a\\u043b\\u0438\\u0435\\u043d\\u0442 \\u0441\\u0430\\u043f\\u0430\\u0440\\u043b\\u0430\\u0440\\u044b',
    'Subtitle': '\\u0411\\u0435\\u0442\\u043e\\u043d \\u0437\\u0430\\u0443\\u044b\\u0442\\u044b \\u04e9\\u043d\\u0434\\u0456\\u0440\\u0443\\u0448\\u0456\\u0441\\u0456',
    'Footer text': '\\u0411\\u0435\\u0442\\u043e\\u043d \\u0437\\u0430\\u0443\\u044b\\u0442\\u0442\\u0430\\u0440\\u044b\\u043d \\u04e9\\u043d\\u0434\\u0456\\u0440\\u0443\\u0448\\u0456. \\u0427\\u0436\\u044d\\u043d\\u0447\\u0436\\u043e\\u0443, \\u049a\\u044b\\u0442\\u0430\\u0439\\u0434\\u0430\\u043d \\u0442\\u0456\\u043a\\u0435\\u043b\\u0435\\u0439 \\u0436\\u0435\\u0442\\u043a\\u0456\\u0437\\u0443.',
    'Rights': '\\u0411\\u0430\\u0440\\u043b\\u044b\\u049b \\u049b\\u04b1\\u049b\\u044b\\u049b\\u0442\\u0430\\u0440 \\u049b\\u043e\\u0440\\u0493\\u0430\\u043b\\u0493\\u0430\\u043d.',
    'Mixers': '\\u0410\\u0440\\u0430\\u043b\\u0430\\u0441\\u0442\\u044b\\u0440\\u0493\\u044b\\u0448\\u0442\\u0430\\u0440',
    'HZS Series': 'HZS \\u0441\\u0435\\u0440\\u0438\\u044f\\u0441\\u044b',
    'Mobile': '\\u041c\\u043e\\u0431\\u0438\\u043b\\u044c\\u0434\\u0456',
    'About Yuda': 'YudaHualong \\u0442\\u0443\\u0440\\u0430\\u043b\\u044b',
    'Tel label': '\\u0422\\u0435\\u043b:',
  };
  return kk[str] || str;
}

const files = [];
function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = dir + '/' + e.name;
    if (e.isDirectory()) walkDir(p);
    else if (e.name.endsWith('.html')) files.push(p);
  }
}
walkDir(root + '/kz');

console.log('Processing ' + files.length + ' KZ files');

// Common replacements for ALL pages
for (const f of files) {
  let html = fs.readFileSync(f, 'utf8');
  const orig = html;
  
  // Replace Russian nav links with Kazakh
  html = html.replace(/\/ru\//g, '/kz/');
  
  // Fix lang attribute
  html = html.replace('lang="ru"', 'lang="kk"');
  html = html.replace('lang="kkk"', 'lang="kk"');
  
  if (html !== orig) fs.writeFileSync(f, html, 'utf8');
}

// Now process index.html specifically with Kazakh translations
const idxPath = root + '/kz/index.html';
let idx = fs.readFileSync(idxPath, 'utf8');

// Title
idx = idx.replace('<title>YudaHualong | Производитель бетонных заводов и оборудования</title>',
  '\\u003c\\u0074\\u0069\\u0074\\u006c\\u0065\\u003e\\u0059\\u0075\\u0064\\u0061\\u0048\\u0075\\u0061\\u006c\\u006f\\u006e\\u0067\\u0020\\u007c\\u0020\\u0411\\u0435\\u0442\\u043e\\u043d\\u0020\\u0437\\u0430\\u0443\\u044b\\u0442\\u044b\\u0020\\u04e9\\u043d\\u0434\\u0456\\u0440\\u0443\\u0448\\u0456\\u0441\\u0456\\u003c\\u002f\\u0074\\u0069\\u0074\\u006c\\u0065\\u003e');

fs.writeFileSync(idxPath, idx, 'utf8');
console.log('Done!');
