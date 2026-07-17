// Pure ASCII script - generates proper Kazakh text from Unicode code points
const fs = require('fs');

// Kazakh character codes
const K = {
  a: 0x0430, b: 0x0431, v: 0x0432, g: 0x0433, d: 0x0434, e: 0x0435,
  zh: 0x0436, z: 0x0437, ii: 0x0438, kk: 0x043A, ll: 0x043B, mm: 0x043C,
  nn: 0x043D, oo: 0x043E, pp: 0x043F, rr: 0x0440, ss: 0x0441, tt: 0x0442,
  uu: 0x0443, ff: 0x0444, hh: 0x0445, cc: 0x0446, ch: 0x0447, sh: 0x0448,
  yi: 0x044B, my: 0x044C, ee: 0x044D, yu: 0x044E, ya: 0x044F,
  // Kazakh-specific
  o: 0x04E9, u: 0x04B1, u2: 0x04AF, q: 0x049B, ng: 0x04A3, gh: 0x0493,
  ae: 0x04D9, h: 0x04BB, ii2: 0x0456,
  // Caps
  A: 0x0410, B: 0x0411, V: 0x0412, G: 0x0413, D: 0x0414, E: 0x0415,
  Z: 0x0417, I: 0x0418, K: 0x041A, L: 0x041B, M: 0x041C, N: 0x041D,
  O: 0x041E, P: 0x041F, R: 0x0420, S: 0x0421, T: 0x0422, U: 0x0423,
  F: 0x0424, H: 0x0425, C: 0x0426, CH: 0x0427, SH: 0x0428,
  Y: 0x042B, E2: 0x042D, YU: 0x042E, YA: 0x042F,
  // Kazakh caps
  Oo: 0x04E8, Uu: 0x04B0, U2: 0x04AE, Qq: 0x049A, Ng: 0x04A2,
  Gh: 0x0492, Ae: 0x04D8, Hh: 0x04BA, I2: 0x0406,
};

function s(code) { return String.fromCharCode(code); }

function txt(items) {
  return items.map(function(item) {
    if (typeof item === 'number') return s(item);
    return item;
  }).join('');
}

// Build the fix script using Unicode escapes
function escapeKz(text) {
  var result = '';
  for (var i = 0; i < text.length; i++) {
    var code = text.charCodeAt(i);
    if (code > 127) {
      result += '\\u' + code.toString(16).toUpperCase().padStart(4, '0');
    } else {
      result += text[i];
    }
  }
  return result;
}

// Read the current file
var filePath = 'G:/yudaconcrete-preview/kz/index.html';
var html = fs.readFileSync(filePath, 'utf8');

// Build proper Kazakh title
var title = 'YudaHualong | ' +
  s(K.B) + s(K.e) + s(K.tt) + s(K.oo) + s(K.nn) + ' ' +
  s(K.z) + s(K.a) + s(K.u) + s(K.yi) + s(K.tt) + s(K.yi) + ' ' +
  s(K.Oo) + s(K.nn) + s(K.d) + s(K.ii2) + s(K.r) + s(K.u) + s(K.sh) + s(K.ii2) + s(K.ss) + s(K.ii2);

// Fix the title
html = html.replace('<title>YudaHualong | Бетон зауыты ?нд?руш?с?</title>', '<title>' + title + '</title>');

// Build proper description
var desc = 'YudaHualong ' +
  s(K.b) + s(K.e) + s(K.tt) + s(K.oo) + s(K.nn) + ' ' +
  s(K.z) + s(K.a) + s(K.u) + s(K.yi) + s(K.tt) + s(K.tt) + s(K.a) + s(K.r) + s(K.yi) + s(K.nn) + ' ' +
  s(K.Oo) + s(K.nn) + s(K.d) + s(K.ii2) + s(K.r) + s(K.e) + s(K.d) + s(K.ii2) + '. ' +
  'HZS25-HZS240 ' +
  s(K.ss) + s(K.e) + s(K.r) + s(K.ii) + s(K.ya) + s(K.ll) + s(K.a) + s(K.r) + s(K.yi) + ', ' +
  s(K.z) + s(K.a) + s(K.u) + s(K.yi) + s(K.tt) + s(K.yi) + s(K.q) + ' ' +
  s(K.b) + s(K.a) + s(K.gh) + s(K.a) + '.';

// Fix description
html = html.replace('<meta name="description" content="YudaHualong — производитель бетонных заводов HZS, мобильных бетонных заводов и бетоносмесителей. Более 25 лет опыта, поставки оборудования по всему миру.">',
  '<meta name="description" content="' + desc + '">');

fs.writeFileSync(filePath, html, 'utf8');
console.log('Fixed: title=' + title);

// Also fix all product pages' SEO
var hzs = ['25','35','50','60','75','90','120','180','240'];
for (var i = 0; i < hzs.length; i++) {
  var m = hzs[i];
  var pp = 'G:/yudaconcrete-preview/kz/products/hzs' + m + '-concrete-batching-plant.html';
  if (!fs.existsSync(pp)) continue;
  var h = fs.readFileSync(pp, 'utf8');
  
  var modelName = 'HZS' + m;
  var kzTitle = modelName + ' ' + s(K.b) + s(K.e) + s(K.tt) + s(K.oo) + s(K.nn) + ' ' +
    s(K.z) + s(K.a) + s(K.u) + s(K.yi) + s(K.tt) + s(K.yi) + ' | YudaHualong';
  
  h = h.replace(/<title>HZS\d+ бетон зауыты \| YudaHualong<\/title>/, '<title>' + kzTitle + '</title>');
  
  var parts = m + ' ' + s(K.m) + s(K.oo) + s(K.ii2) + s(K.r) + '/' + s(K.ss) + s(K.a) + s(K.gh) + '.';
  desc = modelName + ' ' + s(K.b) + s(K.e) + s(K.tt) + s(K.oo) + s(K.nn) + ' ' +
    s(K.z) + s(K.a) + s(K.u) + s(K.yi) + s(K.tt) + s(K.yi) + ' ' + parts;
  
  var oldDesc = h.match(/<meta name="description" content="[^"]*">/);
  if (oldDesc) {
    h = h.replace(oldDesc[0], '<meta name="description" content="' + desc + '">');
  }
  
  fs.writeFileSync(pp, h, 'utf8');
  console.log('Fixed HZS' + m);
}

console.log('\\nEncoding fixes complete!');
