const fs = require('fs');
const path = require('path');
const root = 'G:\\yudaconcrete-preview';

const langLi = `      <li class="nav-lang"><a href="javascript:void(0)" onclick="toggleLang()">🌐 English ▼</a>
        <ul class="lang-dropdown">
          <li><a href="/">🇬🇧 English</a></li>
          <li><a href="/ru/">🇷🇺 Русский</a></li>
        </ul>
      </li>`;

function addLangToAll(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  entries.forEach(e => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!e.name.startsWith('.') && e.name !== 'node_modules' && e.name !== 'ru') addLangToAll(p);
    } else if (e.name.endsWith('.html')) {
      let html = fs.readFileSync(p, 'utf8');
      
      // Skip if already has nav-lang in nav
      if (html.includes('class="nav-lang"') && html.includes('class="nav-links"')) return;
      
      // Add lang switcher after Get Quote button
      const pattern = /class="nav-cta">[^<]+<\/a><\/li>\s*\n\s*<\/ul>/;
      if (pattern.test(html)) {
        html = html.replace(pattern, (m) => {
          return m.replace('</ul>', langLi + '\n    </ul>');
        });
        fs.writeFileSync(p, html, 'utf8');
        console.log(`  Added: ${path.relative(root, p)}`);
      }
    }
  });
}

console.log('Adding language switcher to all English pages...');
addLangToAll(root);
console.log('Done!');
