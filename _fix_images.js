const fs = require('fs');
const path = require('path');
const imgDir = 'G:\\yudaconcrete-preview\\assets\\images';

// Chinese-named files mapped to their English equivalents (confirmed by file size)
const cnToEn = {
  '俄罗斯客户到访签约.jpg': 'company/contract-signing-01.jpg',
  '俄罗斯移动站.jpg': 'company/project-russia.jpg',
  '公司厂貌.jpg': 'company/factory-banner.jpg',
  '公司获奖1.jpg': 'company/cert-06.jpg',
  '公司获奖2.jpg': 'company/cert-07.jpg',
  '公司获奖3.jpg': 'company/cert-08.jpg',
  '内蒙古站.jpg': 'company/project-mongolia.jpg',
  '办公区.jpg': 'company/factory-08.jpg',
  '发货.jpg': null, // no obvious match - keep
  '外商考察.jpg': 'company/contract-signing-01.jpg',
  '外商考察1.jpg': 'company/customer-visit-01.jpg',
  '外商考察2.jpg': 'company/customer-visit-02.jpg',
  '外商考察3.jpg': 'company/customer-visit-03.jpg',
  '外商考察4.jpg': 'company/visit-04.jpg',
  '外商考察5.jpg': 'company/visit-05.jpg',
  '外商考察6.jpg': 'company/visit-06.jpg',
  '外商考察7.jpg': 'company/visit-07.jpg',
  '外商考察8.jpg': 'company/visit-08.jpg',
  '展示区.jpg': 'company/factory-07.jpg',
  '新疆站.jpg': 'company/project-xinjiang.jpg',
  '滚筒式移动站.jpg': 'company/../trailer-plant.jpg',
  '生产区.jpg': 'company/factory-04.jpg',
  '生产车间1.jpg': 'company/factory-01.jpg',
  '生产车间2.jpg': 'company/factory-02.jpg',
  '生产车间3.jpg': 'company/factory-03.jpg',
  '生产车间4.jpg': 'company/factory-04.jpg',
  '生产车间5.jpg': 'company/factory-05.jpg',
  '研发中心.jpg': 'company/factory-06.jpg',
  '移动站2.jpg': 'company/../mobile-plant.jpg',
  '证书1.jpg': 'company/cert-01.jpg',
  '证书2.jpg': 'company/cert-02.jpg',
  '证书3.jpg': 'company/cert-03.jpg',
  '证书4.jpg': 'company/cert-04.jpg',
  '证书5.jpg': 'company/cert-05.jpg',
  '运输区.jpg': null // no obvious match - keep
};

let deleted = 0, kept = 0;
fs.readdirSync(imgDir).forEach(f => {
  if (cnToEn[f] === null) { kept++; return; } // no replacement
  if (cnToEn[f] !== undefined) {
    const target = path.join(imgDir, cnToEn[f]);
    // Check if they are duplicates by size
    try {
      const srcSize = fs.statSync(path.join(imgDir, f)).size;
      const tgtSize = fs.statSync(target).size;
      if (srcSize === tgtSize) {
        fs.unlinkSync(path.join(imgDir, f));
        console.log(`Deleted duplicate: ${f} (dup of ${cnToEn[f]})`);
        deleted++;
      } else {
        console.log(`Size mismatch - keeping both: ${f} (${srcSize}) vs ${cnToEn[f]} (${tgtSize})`);
        kept++;
      }
    } catch(e) {
      console.log(`Skipping: ${f} -> ${target} (${e.message})`);
      kept++;
    }
  }
});

console.log(`\nDone: ${deleted} deleted, ${kept} kept`);
console.log(`Total images remaining: ${fs.readdirSync(imgDir).filter(f => !f.startsWith('_') && fs.statSync(path.join(imgDir, f)).isFile()).length}`);
