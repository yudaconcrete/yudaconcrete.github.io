const fs = require('fs');
const path = require('path');
const siteDir = __dirname;

const LANGUAGES = {
  es: { lang: 'es', h1_prefix: '' },
  fr: { lang: 'fr', h1_prefix: '' },
  pt: { lang: 'pt', h1_prefix: '' },
  ar: { lang: 'ar', h1_prefix: '' }
};

// Target pages to fix
const PAGES = ['about.html', 'contact.html', 'projects/index.html', 'countries/index.html'];

console.log('=== CONTENT FIXER ===\n');

for (const page of PAGES) {
  const enFile = path.join(siteDir, page);
  if (!fs.existsSync(enFile)) {
    console.log(`EN ${page} not found, skipping`);
    continue;
  }
  
  const enContent = fs.readFileSync(enFile, 'utf8');
  
  // Extract body content (everything between <nav> and <footer>)
  const navEnd = enContent.indexOf('</nav>');
  const footerStart = enContent.indexOf('<footer');
  
  if (navEnd < 0 || footerStart < 0) {
    console.log(`EN ${page}: Cannot find nav/footer structure, skipping`);
    continue;
  }
  
  // The body content from after </nav> to before <footer
  const bodyContent = enContent.substring(navEnd + 6, footerStart - 1);
  
  for (const [langKey, langInfo] of Object.entries(LANGUAGES)) {
    const langFile = path.join(siteDir, langKey, page);
    if (!fs.existsSync(langFile)) {
      console.log(`${langKey}/${page}: File missing, skipping`);
      continue;
    }
    
    let langContent = fs.readFileSync(langFile, 'utf8');
    
    // Get the lang page's nav and footer
    const langNavEnd = langContent.indexOf('</nav>');
    const langFooterStart = langContent.indexOf('<footer');
    
    if (langNavEnd < 0 || langFooterStart < 0) {
      console.log(`${langKey}/${page}: No nav/footer, skipping`);
      continue;
    }
    
    // Get lang page's head section (everything before </head>)
    const headEnd = langContent.indexOf('</head>');
    const headSection = langContent.substring(0, headEnd + 7);
    
    // Get lang page's nav
    const navSection = langContent.substring(headEnd + 7, langNavEnd + 6);
    
    // Get lang page's footer
    const footerSection = langContent.substring(langFooterStart);
    
    // Check current body size
    const currentBody = langContent.substring(langNavEnd + 6, langFooterStart - 1).trim();
    const currentBodyLen = currentBody.length;
    
    // Only fix if body is significantly smaller than EN (< 50%)
    const enBodyLen = bodyContent.trim().length;
    const ratio = currentBodyLen / enBodyLen;
    
    if (ratio > 0.5) {
      console.log(`${langKey}/${page}: Already ${Math.round(ratio*100)}% of EN, skipping`);
      continue;
    }
    
    // Reconstruct: head + nav + EN body + footer
    const newContent = headSection + navSection + '\n' + bodyContent + '\n' + footerSection;
    
    // Fix image paths: EN uses assets/images/ but multi-lang needs ../assets/images/
    // Actually let me check - the paths in EN about.html use "../assets/images/" and multi-lang pages also use "../assets/images/"
    // Wait, EN about is in root so "../assets/images/" goes up one level
    // ES about is in /es/about.html so "../assets/images/" goes up to root and then into assets/images/
    // Hmm, if the page is in /es/ directory then ../ is correct
    // If the page is in /es/about.html then ../ is correct for assets/images/
    // Let me check what the EN version uses
    // EN about.html: "../assets/images/..." - this is correct for root level
    // ES about.html: "../assets/images/..." - also correct since /es/ is one level deep
    
    // Check path for images
    if (page.includes('/')) {
      // Page is in a subdirectory like projects/index.html
      // EN: projects/index.html -> "../assets/images/..." is correct
      // ES: es/projects/index.html -> "../../assets/images/..." should be correct
      // Actually let me check the EN version
      const enDepth = (page.match(/\//g) || []).length; // e.g., projects/index.html has 1 slash
      // EN ref: ../assets/images/ (going up 1 from projects/)
      // ES needs: ../../assets/images/ (going up 2 from es/projects/)
      // But wait, the body content from EN uses ../assets/images/
      // In EN, ../ from projects/ goes to root, then assets/images/
      // In ES, ../../ from es/projects/ goes to root, then assets/images/
      // So I need to add an extra ../ for multi-lang
    }
    
    fs.writeFileSync(langFile, newContent, 'utf8');
    
    const newLen = newContent.length;
    const newRatio = Math.round(newContent.length / enContent.length * 100);
    console.log(`${langKey}/${page}: FIXED (${langContent.length}B -> ${newContent.length}B, ${newRatio}% of EN)`);
  }
}

console.log('\n=== Now fixing image paths ===\n');

// Fix image paths for subdirectory pages (projects/index.html, countries/index.html)
// EN uses ../assets/images/ which works for root pages
// For multi-lang pages in subdirectories like es/projects/index.html, they need ../../assets/images/
// For root pages like es/about.html, ../assets/images/ is correct

for (const [langKey] of Object.entries(LANGUAGES)) {
  for (const page of ['projects/index.html', 'countries/index.html']) {
    const langFile = path.join(siteDir, langKey, page);
    if (!fs.existsSync(langFile)) continue;
    
    let content = fs.readFileSync(langFile, 'utf8');
    
    // These are in /es/projects/ so paths need to go up 2 levels
    // Replace "src=\"../assets/" with "src=\"../../assets/"
    // Replace "href=\"../assets/" with "href=\"../../assets/"
    const newContent = content
      .replace(/src="\.\.\/assets\//g, 'src="../../assets/')
      .replace(/href="\.\.\/assets\//g, 'href="../../assets/');
    
    if (newContent !== content) {
      fs.writeFileSync(langFile, newContent, 'utf8');
      console.log(`${langKey}/${page}: Paths fixed`);
    }
  }
}

console.log('\n=== DONE ===');
