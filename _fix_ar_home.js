const fs = require('fs');
const path = require('path');
const siteDir = __dirname;

// Fix Arabic homepage - copy EN body content
const enIdx = fs.readFileSync(path.join(siteDir, 'index.html'), 'utf8');
const arIdx = fs.readFileSync(path.join(siteDir, 'ar', 'index.html'), 'utf8');

// EN: extract body between </nav> and <footer
const enNavEnd = enIdx.indexOf('</nav>');
const enFooterStart = enIdx.indexOf('<footer');
const enBody = enIdx.substring(enNavEnd + 6, enFooterStart - 1);

// AR: extract head and nav and footer
const arHeadEnd = arIdx.indexOf('</head>');
const arNavEnd2 = arIdx.indexOf('</nav>');
const arFooterStart2 = arIdx.indexOf('<footer');

const arHead = arIdx.substring(0, arHeadEnd + 7);
const arNav = arIdx.substring(arHeadEnd + 7, arNavEnd2 + 6);
const arFooter = arIdx.substring(arFooterStart2);

// Reconstruct with EN body
const newArIdx = arHead + arNav + '\n' + enBody + '\n' + arFooter;

fs.writeFileSync(path.join(siteDir, 'ar', 'index.html'), newArIdx, 'utf8');

// Verify
const verify = fs.readFileSync(path.join(siteDir, 'ar', 'index.html'), 'utf8');
const totalRatio = Math.round(verify.length / enIdx.length * 100);
const bodyStart = verify.indexOf('</nav>');
const bodyEnd = verify.indexOf('<footer');
const bodyLen = bodyEnd - bodyStart;
const enBodyLen = enFooterStart - enNavEnd - 6;
const bodyRatio = Math.round(bodyLen / enBodyLen * 100);

console.log(`ar/index.html: ${verify.length}B (${totalRatio}% of EN), body ${bodyRatio}% of EN`);

// Check first 100 chars of body
const bodyText = verify.substring(bodyStart + 6, bodyStart + 200).replace(/<[^>]*>/g, '').trim();
console.log('Body starts with: ' + bodyText.substring(0, 100));

console.log('\nDONE');
