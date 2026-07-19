const fs = require('fs');
const path = require('path');
const siteDir = __dirname;

console.log('=== FIXING REMAINING THIN PAGES ===\n');

// 1. Fix es/projects/index.html - same treatment as fr/pt/ar
const enProj = fs.readFileSync(path.join(siteDir, 'projects', 'index.html'), 'utf8');
const esProj = fs.readFileSync(path.join(siteDir, 'es', 'projects', 'index.html'), 'utf8');

const enNavEnd = enProj.indexOf('</nav>');
const enFooterStart = enProj.indexOf('<footer');
const enBodyContent = enProj.substring(enNavEnd + 6, enFooterStart - 1);

const esHeadEnd = esProj.indexOf('</head>');
const esNavSection = esProj.substring(esHeadEnd + 7, esProj.indexOf('</nav>') + 6);
const esFooterSection = esProj.substring(esProj.indexOf('<footer'));
const esHeadSection = esProj.substring(0, esHeadEnd + 7);

const newEsProj = esHeadSection + esNavSection + '\n' + enBodyContent + '\n' + esFooterSection;
fs.writeFileSync(path.join(siteDir, 'es', 'projects', 'index.html'), newEsProj, 'utf8');

// Fix image paths in es/projects/index.html
let esProjFixed = fs.readFileSync(path.join(siteDir, 'es', 'projects', 'index.html'), 'utf8');
esProjFixed = esProjFixed
  .replace(/src="\.\.\/assets\//g, 'src="../../assets/')
  .replace(/href="\.\.\/assets\//g, 'href="../../assets/');
fs.writeFileSync(path.join(siteDir, 'es', 'projects', 'index.html'), esProjFixed, 'utf8');
console.log('es/projects/index.html: FIXED');

// 2. Check countries/index.html - these have their own structure
// Let me just check what they look like
console.log('\n--- countries/index.html ---');
const enCountries = fs.readFileSync(path.join(siteDir, 'countries', 'index.html'), 'utf8');
const enCountriesBody = enCountries.substring(enCountries.indexOf('</nav>') + 6, enCountries.indexOf('<footer') - 1);
console.log('EN body length: ' + enCountriesBody.length);

for (const lang of ['es', 'fr', 'pt', 'ar']) {
  let content = fs.readFileSync(path.join(siteDir, lang, 'countries', 'index.html'), 'utf8');
  const bodyStart = content.indexOf('</nav>');
  const bodyEnd = content.indexOf('<footer');
  const bodyContent = content.substring(bodyStart + 6, bodyEnd - 1);
  console.log(`${lang} body length: ${bodyContent.length} (${Math.round(bodyContent.length / enCountriesBody.length * 100)}%)`);
}

// 3. Check ar/index.html
console.log('\n--- ar/index.html ---');
const enIdx = fs.readFileSync(path.join(siteDir, 'index.html'), 'utf8');
const enIdxBody = enIdx.substring(enIdx.indexOf('</nav>') + 6, enIdx.indexOf('<footer') - 1);
console.log('EN body length: ' + enIdxBody.length);

const arIdx = fs.readFileSync(path.join(siteDir, 'ar', 'index.html'), 'utf8');
const arNavEnd = arIdx.indexOf('</nav>');
const arFooterStart = arIdx.indexOf('<footer');
if (arNavEnd >= 0 && arFooterStart > arNavEnd) {
  const arBodyContent = arIdx.substring(arNavEnd + 6, arFooterStart - 1);
  const ratio = Math.round(arBodyContent.length / enIdxBody.length * 100);
  console.log(`AR body length: ${arBodyContent.length} (${ratio}%)`);
  console.log('AR body first 200 chars: ' + arBodyContent.replace(/<[^>]*>/g, '').trim().substring(0, 200));
}

console.log('\n=== DONE ===');
