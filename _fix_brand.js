const fs = require('fs');
const path = require('path');

const root = 'G:\\yudaconcrete-preview';
const files = {
  'products/hzs-concrete-batching-plant.html': null,
  'products/hzs25-concrete-batching-plant.html': null,
  'products/hzs35-concrete-batching-plant.html': null,
  'products/trailer-mobile-concrete-plant.html': null
};

let count = 0;
Object.keys(files).forEach(rel => {
  const fp = path.join(root, rel);
  let c = fs.readFileSync(fp, 'utf8');
  let orig = c;

  // Footer brand: YUDA CONCRETE → YudaHualong Concrete
  c = c.replace(/<h3>YUDA CONCRETE<\/h3>/g, '<h3>YudaHualong Concrete</h3>');

  // Copyright: YUDA Concrete → YudaHualong Concrete
  c = c.replace(/&copy; 2026 YUDA Concrete\. All rights reserved\./g, '&copy; 2026 YudaHualong Concrete. All rights reserved.');

  // Title: | Yuda Concrete → | YudaHualong Concrete
  c = c.replace(/\| Yuda Concrete<\/title>/g, '| YudaHualong Concrete</title>');

  // Image ALT: - Yuda Concrete → - YudaHualong
  c = c.replace(/ - Yuda Concrete"/g, ' - YudaHualong"');

  // Brand table: YUDA (Yuda Concrete) → YUDA
  c = c.replace(/YUDA \(Yuda Concrete\)/g, 'YUDA');

  if (c !== orig) {
    fs.writeFileSync(fp, c);
    count++;
    console.log(`Fixed: ${rel}`);
  }
});
console.log(`\n${count} files updated.`);
