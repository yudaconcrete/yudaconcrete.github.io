const fs = require('fs');
const c = fs.readFileSync('G:\\yudaconcrete-preview\\products\\hzs-concrete-batching-plant.html','utf8');

// Extract the specs table - look for the section with power values
const tableStart = c.indexOf('<table');
const tableEnd = c.indexOf('</table>', tableStart);
const table = c.substring(tableStart, tableEnd + 8);

// Find all rows and extract power column info
const rows = table.match(/<tr[^>]*>[\s\S]*?<\/tr>/g);
let out = '';
if (rows) {
  rows.forEach((r, i) => {
    const cells = r.match(/<t[dh][^>]*>[\s\S]*?<\/t[dh]>/g);
    if (cells) {
      const vals = cells.map(c => c.replace(/<[^>]+>/g, '').trim());
      out += String(i) + ': ' + vals.join(' | ') + '\n';
    }
  });
}
fs.writeFileSync('D:\\.openclaw\\workspace\\_hzs_table.txt', out, 'utf8');
