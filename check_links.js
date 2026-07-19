/**
 * 检查其他资源路径（CSS、favicon等）
 */
const fs = require('fs');
const BASE = 'G:\\yudaconcrete-preview';
const LANGS = ['es', 'fr', 'pt', 'ar', 'ru'];

LANGS.forEach(function(lang) {
  var issues = [];
  var langDir = BASE + '\\' + lang;
  
  function walk(dir) {
    var entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch(e) { return; }
    
    entries.forEach(function(entry) {
      var fullPath = dir + '\\' + entry.name;
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.html')) {
        var content = fs.readFileSync(fullPath, 'utf8');
        var relativePath = fullPath.substring(BASE.length + 1);
        var depth = relativePath.split('\\').length - 2; // depth from lang root
        
        // Find all href for CSS
        var cssRe = /href="([^"]*\.css)"/g;
        var m;
        while ((m = cssRe.exec(content)) !== null) {
          var p = m[1];
          if (p.startsWith('assets/') && depth > 0) {
            issues.push(relativePath + ': CSS "' + p + '" needs ../'.repeat(depth) + p);
          }
        }
        
        // Find favicon
        var favRe = /href="([^"]*favicon[^"]*)"/g;
        while ((m = favRe.exec(content)) !== null) {
          var p = m[1];
          if (p.startsWith('assets/') && depth > 0) {
            issues.push(relativePath + ': favicon "' + p + '" needs ../');
          } else if (p.startsWith('../') && depth === 0) {
            issues.push(relativePath + ': favicon "' + p + '" from root seems wrong');
          }
        }
        
        // Find any remaining ../assets/ paths that might be wrong
        var assetRe = /(src|href)="\.\.\/assets\//g;
        while ((m = assetRe.exec(content)) !== null) {
          // ../assets/ from depth 0 (root) is correct
          // ../assets/ from depth 1 is wrong (should be ../../assets/)
          // ../assets/ from depth 2 is even more wrong
          if (depth >= 1) {
            var corrected = '../'.repeat(depth + 1) + 'assets/';
            var fullMatch = m[0].substring(0, m[0].lastIndexOf('=') + 2);
            issues.push(relativePath + ': "' + m[0] + '" should be "' + fullMatch + corrected + '..."');
          }
        }
      }
    });
  }
  
  walk(langDir);
  
  if (issues.length > 0) {
    console.log(lang + ': ' + issues.length + ' issues');
    issues.slice(0, 5).forEach(function(i) { console.log('  ' + i); });
  } else {
    console.log(lang + ': OK');
  }
});
