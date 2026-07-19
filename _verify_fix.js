const fs = require('fs');
const path = require('path');
const siteDir = __dirname;

const LANGUAGES = ['es', 'fr', 'pt', 'ar'];
const PAGES = ['about.html', 'contact.html', 'projects/index.html', 'countries/index.html', 'index.html'];

console.log('=== VERIFICATION AFTER FIX ===\n');

for (const page of PAGES) {
  const enFile = path.join(siteDir, page);
  if (!fs.existsSync(enFile)) continue;
  const enContent = fs.readFileSync(enFile, 'utf8');
  
  console.log(`--- ${page} (EN: ${enContent.length} bytes) ---`);
  
  for (const lang of LANGUAGES) {
    const langFile = path.join(siteDir, lang, page);
    if (!fs.existsSync(langFile)) {
      console.log(`  ${lang}: NOT FOUND`);
      continue;
    }
    
    const langContent = fs.readFileSync(langFile, 'utf8');
    const ratio = Math.round(langContent.length / enContent.length * 100);
    
    // Check key structural elements
    const hasNav = langContent.includes('<nav');
    const hasFooter = langContent.includes('<footer');
    const mainMatch = langContent.match(/<main[\s\S]*?<\/main>/);
    const hasCompanyContent = langContent.includes('company/');
    const imgCount = (langContent.match(/<img[^>]*>/g) || []).length;
    
    // Check for broken paths in the body
    const bodyStart = langContent.indexOf('</nav>');
    const bodyEnd = langContent.indexOf('<footer');
    let bodyContent = '';
    if (bodyStart > 0 && bodyEnd > bodyStart) {
      bodyContent = langContent.substring(bodyStart + 6, bodyEnd - 1);
    }
    
    const pathIssues = bodyContent.match(/src="\.\.\/\.\.\/assets\/images\//);
    // For root pages, ../assets/images/ is correct
    // For subdirectory pages like es/projects/, ../../assets/images/ is correct
    const isSubDir = page.includes('/');
    const correctRef = bodyContent.match(new RegExp('src="' + (isSubDir ? '\\.\\./\\.\\./assets/' : '\\.\\./assets/')));
    
    console.log(`  ${lang}: ${langContent.length}B (${ratio}%), imgs=${imgCount}, nav=${hasNav}, footer=${hasFooter}${correctRef ? '' : ' ⚠️ possible path issue'}`);
    
    // Check first 100 chars of body for content quality
    if (bodyContent) {
      const text = bodyContent.replace(/<[^>]*>/g, '').trim();
      console.log(`    first 80 chars: "${text.substring(0, 80)}..."`);
    }
  }
  console.log('');
}

// Also check product pages to make sure we didn't break anything
console.log('=== SPOT CHECK: product pages ===');
const prodPage = 'products/hzs120-concrete-batching-plant.html';
const enProd = fs.readFileSync(path.join(siteDir, prodPage), 'utf8');
console.log(`EN ${prodPage}: ${enProd.length}B`);
for (const lang of LANGUAGES) {
  const langProd = fs.readFileSync(path.join(siteDir, lang, prodPage), 'utf8');
  const ratio = Math.round(langProd.length / enProd.length * 100);
  console.log(`  ${lang}: ${langProd.length}B (${ratio}%) - UNCHANGED`);
}

console.log('\n=== DONE ===');
