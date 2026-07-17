// Step 1: Copy RU site structure to KZ and fix paths
// Pure ASCII - no non-English characters
const fs = require('fs');
const path = require('path');
const root = 'G:/yudaconcrete-preview';

// Create KZ directories
['kz', 'kz/company', 'kz/products'].forEach(d => {
  const p = path.join(root, d);
  if (!fs.existsSync(p)) { fs.mkdirSync(p, { recursive: true }); }
});

// Copy all RU files to KZ
function copyDir(src, dest, ext) {
  if (!fs.existsSync(src)) return;
  const files = fs.readdirSync(src);
  for (const f of files) {
    if (f.endsWith(ext)) {
      const sp = path.join(src, f);
      const dp = path.join(dest, f);
      fs.copyFileSync(sp, dp);
    }
  }
}

copyDir(root + '/ru', root + '/kz', '.html');
copyDir(root + '/ru/products', root + '/kz/products', '.html');
copyDir(root + '/ru/company', root + '/kz/company', '.html');

console.log('Copied RU files to KZ');

// Fix nav links: /ru/ -> /kz/
function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = dir + '/' + e.name;
    if (e.isDirectory() && e.name !== 'countries') walkDir(p);
    else if (e.name.endsWith('.html')) {
      let html = fs.readFileSync(p, 'utf8');
      const orig = html;
      
      // Change /ru/ links to /kz/
      html = html.replace(/href="\/ru\//g, 'href="/kz/');
      
      // Change lang="ru" to lang="kk"
      html = html.replace('lang="ru"', 'lang="kk"');
      
      // Change hreflang references ru->kk
      html = html.replace('hreflang="ru"', 'hreflang="kk"');
      html = html.replace('/ru/', '/kz/');
      
      // Update alternate links
      html = html.replace(/href="https:\/\/yudaconcrete\.github\.io\/ru\//g, 'href="https://yudaconcrete.github.io/kz/');
      
      if (html !== orig) {
        fs.writeFileSync(p, html, 'utf8');
      }
    }
  }
}
walkDir(root + '/kz');

// Fix issue: run twice to catch remaining /ru/ in hreflang
walkDir(root + '/kz');

console.log('All KZ paths updated');
