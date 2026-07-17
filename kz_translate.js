// Pure ASCII build script for KZ site
// Uses Unicode escapes for Kazakh text - no encoding issues
const fs = require('fs');
const root = 'G:/yudaconcrete-preview';

// Helper: decode Unicode escapes in strings
function kz(raw) {
  return raw.replace(/\\u[\dA-Fa-f]{4}/g, function(m) {
    return String.fromCharCode(parseInt(m.replace('\\u', ''), 16));
  });
}

// ======== KAZAKH TEXT DATA ========

// Nav
const navHome = kz('<a href="/kz/">\\u0411\\u0430\\u0441\\u0442\\u044b \\u0431\\u0435\\u0442</a>');
const navProducts = kz('<a href="/kz/products/concrete-batching-plant.html">\\u04e8\\u043d\\u0456\\u043c\\u0434\\u0435\\u0440</a>');
const navHzs = kz('<a href="/kz/products/hzs-concrete-batching-plant.html">HZS \\u0441\\u0435\\u0440\\u0438\\u044f\\u0441\\u044b</a>');
const navMobile = kz('<a href="/kz/products/mobile-concrete-batching-plant.html">\\u041c\\u043e\\u0431\\u0438\\u043b\\u044c\\u0434\\u0456</a>');
const navAbout = kz('<a href="/kz/about.html">\\u0411\\u0456\\u0437 \\u0442\\u0443\\u0440\\u0430\\u043b\\u044b</a>');
const navQuote = kz('<a href="/kz/contact.html" class="nav-cta">\\u0411\\u0430\\u0493\\u0430 \\u0441\\u04b1\\u0440\\u0430\\u0443</a>');
const navLogoSub = kz('\\u0411\\u0435\\u0442\\u043e\\u043d \\u0437\\u0430\\u0443\\u044b\\u0442\\u044b \\u04e9\\u043d\\u0434\\u0456\\u0440\\u0443\\u0448\\u0456\\u0441\\u0456');

// Footer
const footerBrand = kz('\\u0411\\u0435\\u0442\\u043e\\u043d \\u0437\\u0430\\u0443\\u044b\\u0442\\u0442\\u0430\\u0440\\u044b\\u043d \\u04e9\\u043d\\u0434\\u0456\\u0440\\u0443\\u0448\\u0456. \\u0427\\u0436\\u044d\\u043d\\u0447\\u0436\\u043e\\u0443, \\u049a\\u044b\\u0442\\u0430\\u0439\\u0434\\u0430\\u043d \\u0442\\u0456\\u043a\\u0435\\u043b\\u0435\\u0439 \\u0436\\u0435\\u0442\\u043a\\u0456\\u0437\\u0443.');
const footerProd = kz('\\u04e8\\u043d\\u0456\\u043c\\u0434\\u0435\\u0440');
const footerHzs = kz('HZS \\u0441\\u0435\\u0440\\u0438\\u044f\\u0441\\u044b');
const footerMobile = kz('\\u041c\\u043e\\u0431\\u0438\\u043b\\u044c\\u0434\\u0456');
const footerMixer = kz('\\u0410\\u0440\\u0430\\u043b\\u0430\\u0441\\u0442\\u044b\\u0440\\u0493\\u044b\\u0448\\u0442\\u0430\\u0440');
const footerAll = kz('\\u0411\\u0430\\u0440\\u043b\\u044b\\u049b \\u04e9\\u043d\\u0456\\u043c\\u0434\\u0435\\u0440');
const footerComp = kz('\\u041a\\u043e\\u043c\\u043f\\u0430\\u043d\\u0438\\u044f');
const footerAbout = kz('YudaHualong \\u0442\\u0443\\u0440\\u0430\\u043b\\u044b');
const footerFactory = kz('\\u0417\\u0430\\u0443\\u044b\\u0442');
const footerCerts = kz('\\u0421\\u0435\\u0440\\u0442\\u0438\\u0444\\u0438\\u043a\\u0430\\u0442\\u0442\\u0430\\u0440');
const footerVisits = kz('\\u041a\\u043b\\u0438\\u0435\\u043d\\u0442 \\u0441\\u0430\\u043f\\u0430\\u0440\\u043b\\u0430\\u0440\\u044b');
const footerSupport = kz('\\u049a\\u043e\\u043b\\u0434\\u0430\\u0443');
const footerContact = kz('\\u0411\\u0430\\u0439\\u043b\\u0430\\u043d\\u044b\\u0441');
const footerRights = kz('\\u0411\\u0430\\u0440\\u043b\\u044b\\u049b \\u049b\\u04b1\\u049b\\u044b\\u049b\\u0442\\u0430\\u0440 \\u049b\\u043e\\u0440\\u0493\\u0430\\u043b\\u0493\\u0430\\u043d.');

// Build nav HTML
const kzNav = kz('<ul class="nav-links">\\n') +
  '      <li>' + navHome + '</li>\\n' +
  '      <li>' + navProducts + '</li>\\n' +
  '      <li>' + navHzs + '</li>\\n' +
  '      <li>' + navMobile + '</li>\\n' +
  '      <li>' + navAbout + '</li>\\n' +
  '      <li>' + navQuote + '</li>\\n' +
  '    </ul>';

// Build footer HTML
const kzFooter = '<footer class="footer"><div class="container"><div class="footer-grid">\\n' +
  '  <div class="footer-brand"><h3>YudaHualong Concrete</h3><p>' + footerBrand + '</p><p style="margin-top:12px;">Тел: +86 18638788818</p></div>\\n' +
  '  <div><h4>' + footerProd + '</h4><ul><li><a href="/kz/products/hzs-concrete-batching-plant.html">' + footerHzs + '</a></li><li><a href="/kz/products/mobile-concrete-batching-plant.html">' + footerMobile + '</a></li><li><a href="/kz/products/concrete-mixer.html">' + footerMixer + '</a></li><li><a href="/kz/products/concrete-batching-plant.html">' + footerAll + '</a></li></ul></div>\\n' +
  '  <div><h4>' + footerComp + '</h4><ul><li><a href="/kz/about.html">' + footerAbout + '</a></li><li><a href="/kz/company/factory.html">' + footerFactory + '</a></li><li><a href="/kz/company/certificates.html">' + footerCerts + '</a></li><li><a href="/kz/company/customer-visits.html">' + footerVisits + '</a></li></ul></div>\\n' +
  '  <div><h4>' + footerSupport + '</h4><ul><li><a href="/kz/contact.html">' + footerContact + '</a></li><li><a href="/kz/faq.html">FAQ</a></li></ul></div>\\n' +
  '</div><div class="footer-bottom">&copy; 2026 YudaHualong Concrete. ' + footerRights + ' | Чжэнчжоу, Хэнань, Қытай</div></div></footer>';

// Apply nav + footer to all KZ pages
function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = dir + '/' + e.name;
    if (e.isDirectory() && e.name !== 'countries') walkDir(p);
    else if (e.name.endsWith('.html')) {
      let html = fs.readFileSync(p, 'utf8');
      const orig = html;
      
      html = html.replace(/<ul class="nav-links">[\s\S]*?<\/ul>/, kzNav);
      html = html.replace(/<footer class="footer">[\s\S]*?<\/footer>/, kzFooter);
      html = html.replace(/Concrete Batching Plant Solutions/g, navLogoSub);
      
      if (html !== orig) fs.writeFileSync(p, html, 'utf8');
    }
  }
}
walkDir(root + '/kz');
console.log('Nav + Footer applied');

// Now translate index.html content
let idx = fs.readFileSync(root + '/kz/index.html', 'utf8');

idx = idx.replace(/<title>[^<]*<\/title>/, kz('<title>YudaHualong | \\u0411\\u0435\\u0442\\u043e\\u043d \\u0437\\u0430\\u0443\\u044b\\u0442\\u044b \\u04e9\\u043d\\u0434\\u0456\\u0440\\u0443\\u0448\\u0456\\u0441\\u0456</title>'));

// Skip the rest of index translations for now - focus on structural fixes first
fs.writeFileSync(root + '/kz/index.html', idx, 'utf8');
console.log('Title updated');

console.log('\\nKZ site initialization complete!');
console.log('Check: http://localhost:3000/kz/');
