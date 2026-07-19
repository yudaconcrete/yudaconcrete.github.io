const fs = require('fs');
const path = require('path');
const siteDir = __dirname;

// Check what EN contact has that ES/Fr/Pt/Ar are missing
const langs = ['es', 'fr', 'pt', 'ar'];
const enContact = fs.readFileSync(path.join(siteDir, 'contact.html'), 'utf8');

// Extract EN contact body (after page-header section)
const enBody = enContact.match(/<section class="section">[\s\S]*?<footer/);
if (enBody) {
  const sections = enBody[0].match(/<section[^>]*>[\s\S]*?<\/section>/g) || [];
  console.log('EN contact sections:');
  sections.forEach((s, i) => {
    const h = s.match(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>/);
    const heading = h ? h[1] : '(no heading)';
    const len = s.length;
    console.log(`  Section ${i}: "${heading}" (${len} bytes)`);
  });
}

console.log('\n');

for (const lang of langs) {
  const f = path.join(siteDir, lang, 'contact.html');
  if (!fs.existsSync(f)) continue;
  const content = fs.readFileSync(f, 'utf8');
  const body = content.match(/<section class="section">[\s\S]*?<footer/);
  if (body) {
    const sections = body[0].match(/<section[^>]*>[\s\S]*?<\/section>/g) || [];
    console.log(`${lang} contact sections:`);
    sections.forEach((s, i) => {
      const h = s.match(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>/);
      const heading = h ? h[1] : '(no heading)';
      const len = s.length;
      console.log(`  Section ${i}: "${heading}" (${len} bytes)`);
    });
  }
  console.log('');
}
