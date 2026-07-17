const fs = require('fs');
const root = 'G:/yudaconcrete-preview/ru';

function walk(dir) {
  fs.readdirSync(dir, {withFileTypes: true}).forEach(e => {
    const p = dir + '/' + e.name;
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) {
      let c = fs.readFileSync(p, 'utf8');
      let orig = c;
      
      // Fix CSS path: from ru/ directory, need ../assets/css/style.css
      // Check current path
      c = c.replace(/href="assets\/css\/style\.css"/g, 'href="../assets/css/style.css"');
      c = c.replace(/href='assets\/css\/style\.css'/g, "href='../assets/css/style.css'");
      
      // Fix favicon
      c = c.replace(/href="\.\.\/favicon\.svg"/g, 'href="../favicon.svg"');
      c = c.replace(/href="favicon\.svg"/g, 'href="../favicon.svg"');
      
      // Fix any image paths that might be wrong
      c = c.replace(/src="\.\.\/assets\/images\//g, 'src="../assets/images/');
      
      if (c !== orig) {
        fs.writeFileSync(p, c, 'utf8');
        // Check what was fixed
        console.log('Fixed: ' + p.split('/ru/')[1]);
      }
    }
  });
}

walk(root);
console.log('Done - all CSS paths corrected');
