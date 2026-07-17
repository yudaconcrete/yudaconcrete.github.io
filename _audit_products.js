const fs = require('fs');
const path = require('path');
const root = 'G:\\yudaconcrete-preview\\products';

const specMap = {
  'hzs25':  { cap: '25',  mixer: 'JS500' },
  'hzs35':  { cap: '35',  mixer: 'JS750' },
  'hzs50':  { cap: '50',  mixer: 'JS1000' },
  'hzs60':  { cap: '60',  mixer: 'JS1000' },
  'hzs75':  { cap: '75',  mixer: 'JS1500' },
  'hzs90':  { cap: '90',  mixer: 'JS1500' },
  'hzs120': { cap: '120', mixer: 'JS2000' },
  'hzs180': { cap: '180', mixer: 'JS3000' },
  'hzs240': { cap: '240', mixer: 'JS4000' }
};

let errors = 0;
console.log('====== HZS系列核对 ======\n');

Object.keys(specMap).sort().forEach(model => {
  const file = path.join(root, `${model}-concrete-batching-plant.html`);
  if (!fs.existsSync(file)) {
    console.log(`❌ ${model} - 文件不存在!`);
    errors++;
    return;
  }
  
  const html = fs.readFileSync(file, 'utf8');
  const s = specMap[model];
  const errs = [];
  
  // Check capacity appears (25 m³/h etc)
  const capPattern = new RegExp(`${s.cap}\\s*m[³3]`,'i');
  if (!capPattern.test(html)) errs.push(`容量${s.cap}m³未出现`);
  
  // Check mixer model
  if (html.indexOf(s.mixer) === -1) errs.push(`搅拌机${s.mixer}未找到`);
  
  // Check image exists  
  const imgs = html.match(/src="\.\.\/assets\/images\/([^"]+)"/g) || [];
  let hasModelImg = false;
  imgs.forEach(img => {
    if (img.includes(model)) hasModelImg = true;
  });
  if (!hasModelImg) errs.push('无对应型号图片');
  
  if (errs.length > 0) {
    console.log(`❌ ${model}: ${errs.join('; ')}`);
    errors++;
  } else {
    console.log(`✅ ${model}: HZS${s.cap} / ${s.mixer} - OK`);
  }
});

console.log('\n====== 其他产品 ======\n');
const others = [
  'double-hzs240-concrete-plant.html',
  'mobile-concrete-batching-plant.html',
  'trailer-mobile-concrete-plant.html',
  'js3000-concrete-mixer.html',
  'concrete-mixer.html',
  'concrete-batching-plant.html',
  'hzs-concrete-batching-plant.html'
];
others.forEach(f => {
  const fp = path.join(root, f);
  if (fs.existsSync(fp)) {
    const size = fs.statSync(fp).size;
    console.log(`✅ ${f} (${size} bytes)`);
  } else {
    console.log(`❌ ${f} 缺失!`);
    errors++;
  }
});

console.log(`\n====== 结论 ======`);
if (errors === 0) console.log('✅ 全部产品数据正确，无错误!');
else console.log(`⚠️ 有 ${errors} 个问题`);
