const fs = require('fs');
const path = require('path');

const src = 'G:\\yudaconcrete-preview';
const dst = 'D:\\.openclaw\\workspace\\搅拌站出口项目\\yudaconcrete-site';

const files = [
  // English new/modified pages
  'products\\concrete-mixer.html',
  'products\\js750-concrete-mixer.html',
  'products\\js1000-concrete-mixer.html',
  'products\\js1500-concrete-mixer.html',
  'products\\js2000-concrete-mixer.html',
  'products\\js4500-concrete-mixer.html',
  'products\\mobile-concrete-batching-plant.html',
  'products\\trailer-mobile-concrete-plant.html',
  
  // Russian new/modified pages
  'ru\\products\\concrete-mixer.html',
  'ru\\products\\js750-concrete-mixer.html',
  'ru\\products\\js1000-concrete-mixer.html',
  'ru\\products\\js1500-concrete-mixer.html',
  'ru\\products\\js2000-concrete-mixer.html',
  'ru\\products\\js3000-concrete-mixer.html',
  'ru\\products\\js4500-concrete-mixer.html',
];

let count = 0;
for (const f of files) {
  const srcPath = path.join(src, f);
  const dstPath = path.join(dst, f);
  if (fs.existsSync(srcPath)) {
    fs.mkdirSync(path.dirname(dstPath), { recursive: true });
    fs.copyFileSync(srcPath, dstPath);
    const sizeKB = Math.round(fs.statSync(srcPath).size / 1024);
    console.log('  ' + f + ' (' + sizeKB + 'KB)');
    count++;
  } else {
    console.log('  MISSING: ' + f);
  }
}
console.log('\n' + count + ' files synced to new site.');
