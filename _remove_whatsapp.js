const fs = require('fs');
const path = require('path');
const root = 'G:\\yudaconcrete-preview';

const htmlFiles = [];
function walk(dir) {
  fs.readdirSync(dir, {withFileTypes: true}).forEach(e => {
    const p = path.join(dir, e.name);
    if (e.isDirectory() && !e.name.startsWith('.') && e.name !== 'node_modules') walk(p);
    else if (e.name.endsWith('.html')) htmlFiles.push(p);
  });
}
walk(root);

const phone = '+86 18638788818';

let totalChanges = 0;
htmlFiles.forEach(fp => {
  let c = fs.readFileSync(fp, 'utf8');
  let orig = c;

  // Replace WhatsApp buttons with phone buttons
  c = c.replace(/<a href="https:\/\/wa\.me\/8618638788818" class="btn btn-whatsapp">WhatsApp: \+86 18638788818<\/a>/g,
    `<a href="tel:+8618638788818" class="btn btn-primary">Call: +86 18638788818</a>`);

  // Remove the WhatsApp float button (the 💬 icon)
  c = c.replace(/<a href="https:\/\/wa\.me\/8618638788818" class="whatsapp-float".*?<\/a>/g, '');

  // Footer: WhatsApp: +86 → Tel: +86
  c = c.replace(/<p style="margin-top:12px;">WhatsApp: \+86 18638788818<\/p>/g,
    `<p style="margin-top:12px;">Tel: +86 18638788818</p>`);

  // FAQ text
  c = c.replace(/Available via WhatsApp and email for urgent inquiries/g,
    'Available by phone and email for urgent inquiries');

  // General WhatsApp references in text content (not in URLs)
  c = c.replace(/WhatsApp: \+86 18638788818/g, `Tel: +86 18638788818`);

  if (c !== orig) {
    fs.writeFileSync(fp, c);
    const changes = orig.length - c.length;
    totalChanges += Math.abs(changes);
    console.log(`Updated: ${path.relative(root, fp)}`);
  }
});

console.log(`\nDone. All WhatsApp references removed.`);
