const fs = require('fs');
const path = require('path');

const root = __dirname;

function findHtml(dir, base = '') {
  let results = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    if (item.name.startsWith('_') || item.name === 'node_modules' || item.name === 'assets') continue;
    const full = path.join(dir, item.name);
    const rel = base ? base + '/' + item.name : item.name;
    if (item.isDirectory()) {
      results = results.concat(findHtml(full, rel));
    } else if (item.name.endsWith('.html') && !item.name.startsWith('_')) {
      results.push({ full, rel });
    }
  }
  return results;
}

const files = findHtml(root);
console.log('SEO Audit: ' + files.length + ' files');
let issues = [];

for (const f of files) {
  const content = fs.readFileSync(f.full, 'utf8');
  
  // Title
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  if (!titleMatch) { issues.push(f.rel + ': MISSING title'); continue; }
  
  // Meta description
  const descMatch = content.match(/<meta name="description" content="([^"]+)"/i);
  if (!descMatch) { issues.push(f.rel + ': MISSING meta description'); }
  
  // Check if description is too short or generic
  if (descMatch && descMatch[1].length < 20) {
    issues.push(f.rel + ': TOO SHORT meta description (' + descMatch[1].length + ' chars)');
  }
  
  // Check hreflang
  const hasHreflang = content.includes('hreflang');
  if (!hasHreflang && !f.rel.includes('404')) {
    issues.push(f.rel + ': MISSING hreflang tags');
  }
  
  // Check lang
  const langMatch = content.match(/<html lang="([^"]+)"/i);
  if (!langMatch) { issues.push(f.rel + ': MISSING html lang attribute'); }
}

if (issues.length === 0) {
  console.log('\n\u2705 No SEO issues found!');
} else {
  for (const issue of issues) console.log('\u274c ' + issue);
}
