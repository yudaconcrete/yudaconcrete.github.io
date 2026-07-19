const fs = require('fs');
const path = require('path');
const siteDir = __dirname;

// Compare en product pages with other language versions
// Check body content size (not just header/footer/nav)

const LANGUAGES = ['en', 'ru', 'ar', 'es', 'fr', 'pt', 'kz', 'kg', 'tj', 'tm', 'uz'];

// Check specific product pages
const KEY_PAGES = [
  'index.html',
  'about.html',
  'faq.html',
  'contact.html',
  'products/concrete-batching-plant.html',
  'products/hzs-concrete-batching-plant.html',
  'products/hzs120-concrete-batching-plant.html',
  'products/concrete-mixer.html',
  'products/js3000-concrete-mixer.html',
  'products/mobile-concrete-batching-plant.html',
  'products/double-hzs240-concrete-plant.html',
  'projects/index.html',
  'company/factory.html',
];

// Also check countries
const COUNTRY_PAGES = fs.readdirSync(path.join(siteDir, 'countries')).filter(f => f.endsWith('.html'));

console.log('=== LANGUAGE CONTENT COMPARISON ===\n');

function getBodyContentSize(content) {
  // Extract everything between <main> and </main> or between last nav/footer
  let body = '';
  
  // Try to get main content area (between header and footer)
  const mainMatch = content.match(/<main[\s\S]*?<\/main>/);
  if (mainMatch) {
    body = mainMatch[0];
  } else {
    // Fallback: try to get content between last </header> and first <footer
    const headerEnd = content.lastIndexOf('</header>');
    const footerStart = content.indexOf('<footer');
    if (headerEnd >= 0 && footerStart > headerEnd) {
      body = content.substring(headerEnd, footerStart);
    } else {
      body = content; // fallback
    }
  }
  
  // Strip HTML tags
  const text = body.replace(/<[^>]*>/g, '').trim();
  return {
    total: content.length,
    body: body.length,
    text: text.length,
    textWords: text.split(/\s+/).length,
    sample: text.substring(0, 200)
  };
}

// Get EN baseline
const enSizes = {};
console.log('EN baseline sizes:');
for (const page of KEY_PAGES) {
  const f = path.join(siteDir, page);
  if (fs.existsSync(f)) {
    const content = fs.readFileSync(f, 'utf8');
    const info = getBodyContentSize(content);
    enSizes[page] = info;
    console.log(`  ${page}: ${info.body} bytes body, ${info.textWords} words`);
  }
}

console.log('\n--- LANGUAGE COMPARISON ---\n');

for (const lang of LANGUAGES) {
  if (lang === 'en') continue;
  
  const langDir = path.join(siteDir, lang);
  if (!fs.existsSync(langDir)) {
    console.log(`${lang}: DIRECTORY MISSING`);
    continue;
  }
  
  let emptyPages = 0;
  let similarPages = 0;
  let tooSmallPages = 0;
  let totalPages = 0;
  
  for (const page of KEY_PAGES) {
    // Handle cross-language path mapping
    // en/about.html -> lang/about.html
    // en/products/hzs120.html -> lang/products/hzs120.html (but en doesn't have language prefix)
    const langPage = lang + '/' + page;
    const langFile = path.join(siteDir, langPage);
    
    if (!fs.existsSync(langFile)) {
      continue;
    }
    
    totalPages++;
    const enInfo = enSizes[page];
    if (!enInfo) continue;
    
    const content = fs.readFileSync(langFile, 'utf8');
    const langInfo = getBodyContentSize(content);
    
    // Check if body content is significantly smaller (less than 30% of EN body)
    const ratio = langInfo.body / enInfo.body;
    
    // Check if still has English placeholder text
    const hasEnglishBody = /Concrete Batching Plant|HZS|YUDA|YUDA HUALONG|YudaHualong/i.test(langInfo.sample);
    // For non-English languages, if it's mostly English body text that's bad
    // But for all languages, having < 30% size is clearly empty
    
    if (ratio < 0.3) {
      emptyPages++;
      console.log(`  ${lang}/${page}: EMPTY (${Math.round(ratio*100)}% of EN, ${langInfo.body}B vs ${enInfo.body}B)`);
      if (ratio < 0.1) {
        console.log(`    FIRST 200 chars: "${langInfo.sample.substring(0, 150)}..."`);
      }
    } else if (ratio < 0.7) {
      tooSmallPages++;
      console.log(`  ${lang}/${page}: THIN (${Math.round(ratio*100)}% of EN)`);
    } else {
      similarPages++;
    }
  }
  
  // Summary for this language
  if (totalPages > 0) {
    const pct = Math.round(emptyPages / totalPages * 100);
    console.log(`\n  === ${lang}: ${totalPages} pages checked, ${emptyPages} EMPTY (${pct}%), ${tooSmallPages} thin, ${similarPages} OK ===\n`);
  }
}

// Also check countries in other languages
console.log('\n--- COUNTRY PAGES CHECK ---\n');
const enCountryPages = COUNTRY_PAGES;
console.log(`EN has ${enCountryPages.length} country pages`);

for (const lang of ['ru', 'ar', 'es', 'fr', 'pt']) {
  const langCountriesDir = path.join(siteDir, lang, 'countries');
  if (!fs.existsSync(langCountriesDir)) {
    console.log(`${lang}: countries/ directory MISSING`);
    continue;
  }
  
  const langCountries = fs.readdirSync(langCountriesDir).filter(f => f.endsWith('.html'));
  console.log(`${lang}: ${langCountries.length} country pages`);
  
  // Check sizes
  let small = 0;
  for (const cp of langCountries) {
    const enF = path.join(siteDir, 'countries', cp);
    const langF = path.join(siteDir, lang, 'countries', cp);
    if (fs.existsSync(enF) && fs.existsSync(langF)) {
      const enContent = fs.readFileSync(enF, 'utf8');
      const langContent = fs.readFileSync(langF, 'utf8');
      const enInfo = getBodyContentSize(enContent);
      const langInfo = getBodyContentSize(langContent);
      const ratio = langInfo.body / enInfo.body;
      if (ratio < 0.3) {
        console.log(`  EMPTY: ${lang}/countries/${cp} (${Math.round(ratio*100)}% of EN)`);
        small++;
      }
    }
  }
  if (small > 0) {
    console.log(`  => ${small}/${langCountries.length} country pages are EMPTY in ${lang}\n`);
  } else {
    console.log(`  => All OK\n`);
  }
}
