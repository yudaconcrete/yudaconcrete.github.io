// Fix nav/footer for all Stans - using simple Latin replacements where possible
const fs = require('fs');
const root = 'G:/yudaconcrete-preview';

// Country nav data [langCode, HomeLabel, ProductsLabel, HZSLabel, MobileLabel, AboutLabel, QuoteLabel]
const navData = {
  uz: ['uz', 'Bosh sahifa', 'Mahsulotlar', 'HZS seriyasi', 'Mobil', 'Biz haqimizda', "Narx so'rash"],
  kg: ['ky', 'Bashky bet', 'Onumdor', 'HZS seriyasy', 'Mobildu', 'Biz jonundo', 'Baa suroo'],
  tj: ['tg', 'Sahifai asosi', 'Mahsulotho', 'HZS silsila', 'Mobile', 'Dar borai mo', 'Narx pursidan'],
  tm: ['tk', 'Bas sahypa', 'Onumler', 'HZS seriyasy', 'Mobile', 'Biz barada', 'Bahasy sora'],
};

function makeNav(code, home, prods, hzs, mob, about, quote) {
  return '<ul class="nav-links">\n' +
    '      <li><a href="/' + code + '/">' + home + '</a></li>\n' +
    '      <li><a href="/' + code + '/products/concrete-batching-plant.html">' + prods + '</a></li>\n' +
    '      <li><a href="/' + code + '/products/hzs-concrete-batching-plant.html">' + hzs + '</a></li>\n' +
    '      <li><a href="/' + code + '/products/mobile-concrete-batching-plant.html">' + mob + '</a></li>\n' +
    '      <li><a href="/' + code + '/about.html">' + about + '</a></li>\n' +
    '      <li><a href="/' + code + '/contact.html" class="nav-cta">' + quote + '</a></li>\n' +
    '    </ul>';
}

// Process all files in each country
for (var c = 0; c < Object.keys(navData).length; c++) {
  var code = Object.keys(navData)[c];
  var nd = navData[code];
  var newNav = makeNav(code, nd[1], nd[2], nd[3], nd[4], nd[5], nd[6]);
  
  var dir = root + '/' + code;
  var entries = [];
  
  // Collect all HTML files recursively
  function walk(d) {
    var items = fs.readdirSync(d, {withFileTypes: true});
    for (var i = 0; i < items.length; i++) {
      var p = d + '/' + items[i].name;
      if (items[i].isDirectory() && items[i].name !== 'countries') walk(p);
      else if (items[i].name.endsWith('.html')) entries.push(p);
    }
  }
  walk(dir);
  
  for (var i = 0; i < entries.length; i++) {
    var html = fs.readFileSync(entries[i], 'utf8');
    var orig = html;
    
    // Replace nav
    html = html.replace(/<ul class="nav-links">[\s\S]*?<\/ul>/, newNav);
    
    if (html !== orig) {
      fs.writeFileSync(entries[i], html, 'utf8');
    }
  }
  
  console.log(code.toUpperCase() + ' nav fixed: ' + entries.length + ' files');
}

console.log('ALL STANS NAV FIXED!');
