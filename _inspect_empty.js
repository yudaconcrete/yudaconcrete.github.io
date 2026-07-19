const fs = require('fs');
const path = require('path');
const siteDir = __dirname;

// Check what's actually in the "empty" pages
const targets = [
  { lang: 'es', page: 'about.html' },
  { lang: 'fr', page: 'about.html' },
  { lang: 'pt', page: 'about.html' },
  { lang: 'ar', page: 'about.html' },
  { lang: 'es', page: 'contact.html' },
  { lang: 'fr', page: 'contact.html' },
  { lang: 'pt', page: 'contact.html' },
  { lang: 'es', page: 'projects/index.html' },
  { lang: 'fr', page: 'projects/index.html' },
  { lang: 'pt', page: 'projects/index.html' },
  { lang: 'es', page: 'countries/index.html' },
  { lang: 'fr', page: 'countries/index.html' },
  { lang: 'pt', page: 'countries/index.html' },
];

for (const t of targets) {
  const filePath = path.join(siteDir, t.lang, t.page);
  if (!fs.existsSync(filePath)) {
    console.log(`\n${t.lang}/${t.page}: FILE MISSING`);
    continue;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const mainMatch = content.match(/<main[\s\S]*?<\/main>/);
  
  console.log(`\n=== ${t.lang}/${t.page} ===`);
  console.log(`Total file size: ${content.length} bytes`);
  
  if (mainMatch) {
    const bodyText = mainMatch[0].replace(/<[^>]*>/g, '').trim();
    console.log(`Body text: ${bodyText.length} chars, ${bodyText.split(/\s+/).length} words`);
    console.log(`First 300 chars: "${bodyText.substring(0, 300)}"`);
    
    // Check if it's essentially the English version or has translated content
    const isEnglishish = bodyText.match(/YudaHualong|YUDA|Concrete|batching plant|manufacturer|About Us/i);
    if (isEnglishish && t.lang !== 'en') {
      console.log(`⚠️ BODY STILL IN ENGLISH or has very little content`);
    }
    
    // Check what sections exist
    const sections = mainMatch[0].match(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>/g);
    if (sections) {
      console.log(`Sections/headings: ${sections.length}`);
      sections.slice(0, 8).forEach(s => console.log(`  ${s.replace(/<[^>]*>/g, '')}`));
    }
  } else {
    console.log('No <main> tag found!');
    // Check what's between header and footer
    const headerEnd = content.lastIndexOf('</header>');
    const footerStart = content.indexOf('<footer');
    if (headerEnd >= 0 && footerStart > headerEnd) {
      const between = content.substring(headerEnd + 9, footerStart).replace(/<[^>]*>/g, '').trim();
      console.log(`Content between header/footer: ${between.substring(0, 300)}`);
    }
  }
}

// Now compare EN about with ES about
console.log('\n\n=== EN vs ES about.html COMPARISON ===');
const enAbout = fs.readFileSync(path.join(siteDir, 'about.html'), 'utf8');
const enMain = enAbout.match(/<main[\s\S]*?<\/main>/);
if (enMain) {
  const enText = enMain[0];
  const enHeadings = enText.match(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>/g) || [];
  console.log('EN about headings:');
  enHeadings.forEach(h => console.log(`  ${h.replace(/<[^>]*>/g, '')}`));
  
  // EN about word count
  const enBodyText = enText.replace(/<[^>]*>/g, '').trim();
  console.log(`\nEN about body: ${enBodyText.length} chars, ${enBodyText.split(/\s+/).length} words`);
}

const esAbout = fs.readFileSync(path.join(siteDir, 'es/about.html'), 'utf8');
const esMain = esAbout.match(/<main[\s\S]*?<\/main>/);
if (esMain) {
  const esText = esMain[0];
  const esHeadings = esText.match(/<h[1-6][^>]*>([^<]+)<\/h[1-6>]/g) || [];
  console.log('\nES about headings:');
  esHeadings.forEach(h => console.log(`  ${h.replace(/<[^>]*>/g, '')}`));
  
  const esBodyText = esText.replace(/<[^>]*>/g, '').trim();
  console.log(`\nES about body: ${esBodyText.length} chars, ${esBodyText.split(/\s+/).length} words`);
}
