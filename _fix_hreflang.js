const fs = require('fs');
const path = require('path');

const root = __dirname;

// Pages that need hreflang: English country pages, projects, Russian country index, Russian projects
const pages = [
  // English country pages
  { file: 'countries/index.html', en: '/countries/', ru: '/ru/countries/' },
  { file: 'countries/kazakhstan.html', en: '/countries/kazakhstan.html', ru: '/ru/countries/kazakhstan.html' },
  { file: 'countries/kenya.html', en: '/countries/kenya.html', ru: '/ru/countries/kenya.html' },
  { file: 'countries/nigeria.html', en: '/countries/nigeria.html', ru: '/ru/countries/nigeria.html' },
  { file: 'countries/pakistan.html', en: '/countries/pakistan.html', ru: '/ru/countries/pakistan.html' },
  { file: 'countries/russia.html', en: '/countries/russia.html', ru: '/ru/countries/russia.html' },
  { file: 'countries/saudi-arabia.html', en: '/countries/saudi-arabia.html', ru: '/ru/countries/saudi-arabia.html' },
  { file: 'countries/uzbekistan.html', en: '/countries/uzbekistan.html', ru: '/ru/countries/uzbekistan.html' },
  // Projects
  { file: 'projects/index.html', en: '/projects/', ru: '/ru/projects/' },
  // Russian country pages
  { file: 'ru/countries/index.html', en: '/countries/', ru: '/ru/countries/' },
  { file: 'ru/projects/index.html', en: '/projects/', ru: '/ru/projects/' },
];

const site = 'https://yudaconcrete.github.io';

for (const p of pages) {
  const fullPath = path.join(root, p.file);
  const content = fs.readFileSync(fullPath, 'utf8');
  
  // Check if hreflang already exists
  if (content.includes('hreflang')) {
    console.log('SKIP (already has hreflang): ' + p.file);
    continue;
  }
  
  // Insert hreflang before </head>
  const hreflangBlock = `
<link rel="alternate" hreflang="en" href="${site}${p.en}">
<link rel="alternate" hreflang="ru" href="${site}${p.ru}">
<link rel="alternate" hreflang="x-default" href="${site}/">
`;
  
  const newContent = content.replace('</head>', hreflangBlock + '</head>');
  fs.writeFileSync(fullPath, newContent, 'utf8');
  console.log('ADDED hreflang: ' + p.file);
}
