// Build all Central Asian country sites
// Pure ASCII - uses String.fromCharCode for non-ASCII
const fs = require('fs');
const root = 'G:/yudaconcrete-preview';

function s(c) { return String.fromCharCode(c); }

// === LANGUAGE DATA ===
// Keys: language code, values: [lang attr, hreflang, Home, Products, HZS Series, Mobile, About Us, Get Quote, company title, support title, Contact, Footer brand, Subtitle, Rights, All prods, Mixers, Factory, Certs, Visits, SEO title suffix]
// We use Latin chars where possible to avoid encoding issues

const langData = {
  // Uzbekistan - Latin O'zbek
  uz: ['uz', 'uz', 'Bosh sahifa', 'Mahsulotlar', 'HZS seriyasi', 'Mobil', 'Biz haqimizda', "Narx so'rash",
       'Kompaniya', "Qo'llab-quvvatlash", "Aloqa",
       "Beton zavodlari ishlab chiqaruvchisi. Zhengzhou, Xitoydan to'g'ridan-to'g'ri yetkazib berish.",
       'Beton zavodi ishlab chiqaruvchisi', "Barcha huquqlar himoyalangan.",
       "Barcha mahsulotlar", 'Aralashtirgichlar', 'Zavod', 'Sertifikatlar', 'Mijoz tashriflari',
       'Beton zavodi ishlab chiqaruvchisi'],

  // Kyrgyzstan - Cyrillic Kyrgyz
  kg: ['ky', 'ky', '\\u0411\\u0430\\u0448\\u043a\\u044b \\u0431\\u0435\\u0442',
       '\\u04e8\\u043d\\u04af\\u043c\\u0434\\u04e9\\u0440',
       'HZS \\u0441\\u0435\\u0440\\u0438\\u044f\\u0441\\u044b',
       '\\u041c\\u043e\\u0431\\u0438\\u043b\\u0434\\u04af',
       '\\u0411\\u0438\\u0437 \\u0436\\u04e9\\u043d\\u04af\\u043d\\u0434\\u04e9',
       '\\u0411\\u0430\\u0430 \\u0441\\u0443\\u0440\\u043e\\u043e',
       '\\u041a\\u043e\\u043c\\u043f\\u0430\\u043d\\u0438\\u044f',
       '\\u041a\\u043e\\u043b\\u0434\\u043e\\u043e',
       '\\u0411\\u0430\\u0439\\u043b\\u0430\\u043d\\u044b\\u0448',
       '\\u0411\\u0435\\u0442\\u043e\\u043d \\u0437\\u0430\\u0432\\u043e\\u0434\\u0434\\u043e\\u0440\\u0443\\u043d \\u04e9\\u043d\\u0434\\u04af\\u0440\\u04af\\u0448\\u04af. \\u0427\\u0436\\u044d\\u043d\\u0447\\u0436\\u043e\\u0443, \\u041a\\u044b\\u0442\\u0430\\u0439\\u0434\\u0430\\u043d \\u0442\\u04af\\u0437 \\u0436\\u0435\\u0442\\u043a\\u0438\\u0440\\u04af\\u04af.',
       '\\u0411\\u0435\\u0442\\u043e\\u043d \\u0437\\u0430\\u0432\\u043e\\u0434\\u0443 \\u04e9\\u043d\\u0434\\u04af\\u0440\\u04af\\u0448\\u04af\\u0441\\u04af',
       '\\u0411\\u0430\\u0440\\u0434\\u044b\\u043a \\u0443\\u043a\\u0443\\u043a\\u0442\\u0430\\u0440 \\u043a\\u043e\\u0440\\u0433\\u043e\\u043b\\u0433\\u043e\\u043d.',
       '\\u0411\\u0430\\u0440\\u0434\\u044b\\u043a \\u04e9\\u043d\\u04af\\u043c\\u0434\\u04e9\\u0440',
       '\\u0410\\u0440\\u0430\\u043b\\u0430\\u0448\\u0442\\u044b\\u0440\\u0433\\u044b\\u0447\\u0442\\u0430\\u0440',
       '\\u0417\\u0430\\u0432\\u043e\\u0434\\u0443\\u043d',
       '\\u0421\\u0435\\u0440\\u0442\\u0438\\u0444\\u0438\\u043a\\u0430\\u0442\\u0442\\u0430\\u0440',
       '\\u041a\\u044b\\u0442\\u043c\\u0430\\u043d \\u0441\\u0430\\u043f\\u0430\\u0440\\u043b\\u0430\\u0440\\u044b',
       '\\u0411\\u0435\\u0442\\u043e\\u043d \\u0437\\u0430\\u0432\\u043e\\u0434\\u0443 \\u04e9\\u043d\\u0434\\u04af\\u0440\\u04af\\u0448\\u04af\\u0441\\u04af'],

  // Tajikistan - Cyrillic Tajik
  tj: ['tg', 'tg', '\\u0421\\u0430\\u04b3\\u0438\\u0444\\u0430\\u0438 \\u0430\\u0441\\u043e\\u0441\\u04e3',
       '\\u041c\\u0430\\u04b3\\u0441\\u0443\\u043b\\u043e\\u0442\\u04b3\\u043e',
       'HZS \\u0441\\u0438\\u043b\\u0441\\u0438\\u043b\\u0430',
       '\\u041c\\u043e\\u0431\\u0438\\u043b\\u04e3',
       '\\u0414\\u0430\\u0440 \\u0431\\u043e\\u0440\\u0430\\u0438 \\u043c\\u043e',
       '\\u041d\\u0430\\u0440\\u0445 \\u043f\\u0443\\u0440\\u0441\\u0438\\u0434\\u0430\\u043d',
       '\\u0428\\u0438\\u0440\\u043a\\u0430\\u0442',
       '\\u0414\\u0430\\u0441\\u0442\\u0433\\u0438\\u0440\\u04e3',
       '\\u0422\\u0430\\u043c\\u043e\\u0441',
       '\\u0418\\u0441\\u0442\\u0435\\u04b3\\u0441\\u043e\\u043b\\u0438 \\u0431\\u0435\\u0442\\u043e\\u043d\\u04e3 \\u0438\\u0441\\u0442\\u0435\\u04b3\\u0441\\u043e\\u043b\\u043a\\u0443\\u043d\\u0430\\u043d\\u0434\\u0430. \\u0427\\u0436\\u044d\\u043d\\u0447\\u0436\\u043e\\u0443, \\u0427\\u0438\\u043d.',
       '\\u0411\\u0435\\u0442\\u043e\\u043d\\u04e3 \\u0438\\u0441\\u0442\\u0435\\u04b3\\u0441\\u043e\\u043b\\u043a\\u0443\\u043d\\u0430\\u043d\\u0434\\u0430',
       '\\u04b2\\u0430\\u043c\\u0430\\u0438 \\u04b3\\u0443\\u049b\\u0443\\u049b\\u04b3\\u043e \\u04b3\\u0438\\u0444\\u0437 \\u043a\\u0430\\u0440\\u0434\\u0430 \\u0448\\u0443\\u0434\\u0430\\u0430\\u0441\\u0442.',
       '\\u04b2\\u0430\\u043c\\u0430\\u0438 \\u043c\\u0430\\u04b3\\u0441\\u0443\\u043b\\u043e\\u0442\\u04b3\\u043e',
       '\\u041e\\u043c\\u0435\\u0445\\u0442\\u0430\\u0440\\u04b3\\u043e',
       '\\u0417\\u0430\\u0432\\u043e\\u0434',
       '\\u0428\\u0430\\u04b3\\u0430\\u0434\\u0430\\u0442\\u043d\\u043e\\u043c\\u0430\\u04b3\\u043e',
       '\\u0422\\u0430\\u0448\\u0440\\u0438\\u0444\\u0438 \\u043c\\u0443\\u0448\\u0442\\u0430\\u0440\\u0438\\u0451\\u043d',
       '\\u0411\\u0435\\u0442\\u043e\\u043d\\u04e3 \\u0438\\u0441\\u0442\\u0435\\u04b3\\u0441\\u043e\\u043b\\u043a\\u0443\\u043d\\u0430\\u043d\\u0434\\u0430'],

  // Turkmenistan - Latin Turkmen  
  tm: ['tk', 'tk', 'Ba\\u015f sahypa', '\\u00d6n\\u00fcmler', 'HZS seri\\u00fdasy', 'Mobile',
       'Biz barada', 'Bahasy sora\\u0148',
       'Kompani\\u00fda', 'Goldaw', 'Habarla\\u015fmak',
       'Beton zawody \\u00f6nd\\u00fcrijisi. Zhengzhou, Hyta\\u00fddan g\\u00f6ni \\u00fcnsi.',
       'Beton zawody \\u00f6nd\\u00fcrijisi', "\\u00c4hli hukuklar goragly.",
       '\\u00c4hli \\u00f6n\\u00fcmler', 'Gary\\u015fdyryjylar', 'Zawod', 'Sertifikatlar', 'M\\u00fc\\u015fderi saparlary',
       'Beton zawody \\u00f6nd\\u00fcrijisi'],
};

function decodeCyrillic(str) {
  // Decode \\uXXXX escape sequences
  return str.replace(/\\\\u[\\dA-Fa-f]{4}/g, function(m) {
    return String.fromCharCode(parseInt(m.replace('\\\\u', ''), 16));
  });
}

function decodeString(str) {
  // Handle both regular text and Unicode escapes
  return str.replace(/\\u[\\dA-Fa-f]{4}/g, function(m) {
    return String.fromCharCode(parseInt(m.replace('\\u', ''), 16));
  });
}

// Process each country
var countries = ['uz', 'kg', 'tj', 'tm'];

for (var c = 0; c < countries.length; c++) {
  var code = countries[c];
  var base = root + '/' + code;
  var data = langData[code];
  
  // Create directories
  ['', '/company', '/products'].forEach(function(d) {
    var p = base + d;
    if (!fs.existsSync(p)) fs.mkdirSync(p, {recursive: true});
  });
  
  // Copy all KZ files
  var kzDir = root + '/kz';
  var files = [];
  function scan(dir, prefix) {
    var entries = fs.readdirSync(dir, {withFileTypes: true});
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      if (e.isDirectory()) scan(dir + '/' + e.name, prefix + '/' + e.name);
      else if (e.name.endsWith('.html')) files.push([dir + '/' + e.name, prefix + '/' + e.name]);
    }
  }
  scan(kzDir, '');
  
  for (var i = 0; i < files.length; i++) {
    var src = files[i][0];
    var rel = files[i][1];
    // Remove leading slash from kz/ to get relative path
    rel = rel.replace(/^kz\//, '');
    var dest = base + (rel.startsWith('/') ? '' : '/') + rel;
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  }
  
  // Now update paths and language
  function walkDir(dir) {
    var entries = fs.readdirSync(dir, {withFileTypes: true});
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      var p = dir + '/' + e.name;
      if (e.isDirectory() && e.name !== 'countries') walkDir(p);
      else if (e.name.endsWith('.html')) {
        var h = fs.readFileSync(p, 'utf8');
        var orig = h;
        
        // Fix paths: /kz/ -> /code/
        h = h.replace(/href="\/kz\//g, 'href="/' + code + '/');
        
        // Fix lang attr
        h = h.replace('lang="kk"', 'lang="' + data[0] + '"');
        
        // Fix hreflang
        h = h.replace('hreflang="kk"', 'hreflang="' + data[1] + '"');
        h = h.replace('/kz/', '/' + code + '/');
        h = h.replace('/kz/', '/' + code + '/');
        
        // Fix URLs in alternates
        h = h.replace('/kz/', '/' + code + '/');
        
        if (h !== orig) fs.writeFileSync(p, h, 'utf8');
      }
    }
  }
  walkDir(base);
  
  console.log(code.toUpperCase() + ': structure done');
}

console.log('\\nAll Central Asian sites created!');
console.log('Check:');
console.log('  Uzbekistan: http://localhost:3000/uz/');
console.log('  Kyrgyzstan: http://localhost:3000/kg/');
console.log('  Tajikistan: http://localhost:3000/tj/');
console.log('  Turkmenistan: http://localhost:3000/tm/');
