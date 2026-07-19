const fs = require('fs');

const script = `const fs = require('fs');
const path = require('path');
const root = 'G:\\\\yudaconcrete-preview';

const KZ = {
  nav: \`<ul class="nav-links">\\n\` +
    \`      <li><a href="/kz/">\\u0411\\u0430\\u0441\\u0442\\u044b \\u0431\\u0435\\u0442</a></li>\\n\` +
    \`      <li><a href="/kz/products/concrete-batching-plant.html">\\u04e8\\u043d\\u0456\\u043c\\u0434\\u0435\\u0440</a></li>\\n\` +
    \`      <li><a href="/kz/products/hzs-concrete-batching-plant.html">HZS \\u0441\\u0435\\u0440\\u0438\\u044f\\u0441\\u044b</a></li>\\n\` +
    \`      <li><a href="/kz/products/mobile-concrete-batching-plant.html">\\u041c\\u043e\\u0431\\u0438\\u043b\\u044c\\u0434\\u0456</a></li>\\n\` +
    \`      <li><a href="/kz/about.html">\\u0411\\u0456\\u0437 \\u0442\\u0443\\u0440\\u0430\\u043b\\u044b</a></li>\\n\` +
    \`      <li><a href="/kz/contact.html" class="nav-cta">\\u0411\\u0430\\u0493\\u0430 \\u0441\\u04b1\\u0440\\u0430\\u0443</a></li>\\n\` +
    \`    </ul>\`,
  footer: \`<footer class="footer"><div class="container"><div class="footer-grid">\\n\` +
    \`  <div class="footer-brand"><h3>YudaHualong Concrete</h3><p>\\u0411\\u0435\\u0442\\u043e\\u043d \\u0437\\u0430\\u0443\\u044b\\u0442\\u0442\\u0430\\u0440\\u044b\\u043d \\u04e9\\u043d\\u0434\\u0456\\u0440\\u0443\\u0448\\u0456. \\u0427\\u0436\\u044d\\u043d\\u0447\\u0436\\u043e\\u0443, \\u049a\\u044b\\u0442\\u0430\\u0439\\u0434\\u0430\\u043d \\u0442\\u0456\\u043a\\u0435\\u043b\\u0435\\u0439 \\u0436\\u0435\\u0442\\u043a\\u0456\\u0437\\u0443.</p><p style="margin-top:12px;">\\u0422\\u0435\\u043b: +86 18638788818</p></div>\\n\` +
    \`  <div><h4>\\u04e8\\u043d\\u0456\\u043c\\u0434\\u0435\\u0440</h4><ul><li><a href="/kz/products/hzs-concrete-batching-plant.html">HZS \\u0441\\u0435\\u0440\\u0438\\u044f\\u0441\\u044b</a></li><li><a href="/kz/products/mobile-concrete-batching-plant.html">\\u041c\\u043e\\u0431\\u0438\\u043b\\u044c\\u0434\\u0456</a></li><li><a href="/kz/products/concrete-mixer.html">\\u0410\\u0440\\u0430\\u043b\\u0430\\u0441\\u0442\\u044b\\u0440\\u0493\\u044b\\u0448\\u0442\\u0430\\u0440</a></li><li><a href="/kz/products/concrete-batching-plant.html">\\u0411\\u0430\\u0440\\u043b\\u044b\\u049b \\u04e9\\u043d\\u0456\\u043c\\u0434\\u0435\\u0440</a></li></ul></div>\\n\` +
    \`  <div><h4>\\u041a\\u043e\\u043c\\u043f\\u0430\\u043d\\u0438\\u044f</h4><ul><li><a href="/kz/about.html">YudaHualong \\u0442\\u0443\\u0440\\u0430\\u043b\\u044b</a></li><li><a href="/kz/company/factory.html">\\u0417\\u0430\\u0443\\u044b\\u0442</a></li><li><a href="/kz/company/certificates.html">\\u0421\\u0435\\u0440\\u0442\\u0438\\u0444\\u0438\\u043a\\u0430\\u0442\\u0442\\u0430\\u0440</a></li><li><a href="/kz/company/customer-visits.html">\\u041a\\u043b\\u0438\\u0435\\u043d\\u0442 \\u0441\\u0430\\u043f\\u0430\\u0440\\u043b\\u0430\\u0440\\u044b</a></li></ul></div>\\n\` +
    \`  <div><h4>\\u049a\\u043e\\u043b\\u0434\\u0430\\u0443</h4><ul><li><a href="/kz/contact.html">\\u0411\\u0430\\u0439\\u043b\\u0430\\u043d\\u044b\\u0441</a></li><li><a href="/kz/faq.html">FAQ</a></li></ul></div>\\n\` +
    \`</div><div class="footer-bottom">&copy; 2026 YudaHualong Concrete. \\u0411\\u0430\\u0440\\u043b\\u044b\\u049b \\u049b\\u04b1\\u049b\\u044b\\u049b\\u0442\\u0430\\u0440 \\u049b\\u043e\\u0440\\u0493\\u0430\\u043b\\u0493\\u0430\\u043d. | \\u0427\\u0436\\u044d\\u043d\\u0447\\u0436\\u043e\\u0443, \\u0425\\u044d\\u043d\\u0430\\u043d\\u044c, \\u049a\\u044b\\u0442\\u0430\\u0439</div></div></footer>\`,
};

console.log(KZ.nav);
console.log('Script template ready');
`;

fs.writeFileSync('G:/yudaconcrete-preview/_build_kz.js', script, 'utf8');
console.log('Written successfully');
