const fs = require('fs');
const BASE = 'G:\\yudaconcrete-preview';

function getText(html) {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/g, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[^;]+;/g, ' ')
    .replace(/[\s]+/g, ' ')
    .trim();
}

// Check specific pages
var pages = [
  'ar/products/hzs90-concrete-batching-plant.html',
  'ar/products/concrete-mixer.html',
  'ar/products/mobile-concrete-batching-plant.html',
  'ar/products/concrete-batching-plant.html',
  'ar/company/factory.html',
  'ar/company/certificates.html',
  'ar/countries/russia.html',
  'ar/countries/kazakhstan.html',
  'ar/countries/saudi-arabia.html',
  'ar/projects/index.html'
];

pages.forEach(function(p) {
  var html = fs.readFileSync(BASE + '\\' + p, 'utf8');
  var text = getText(html);
  var words = text.match(/[a-zA-Z]{3,}/g) || [];
  
  var ignore = ['the','and','for','are','has','its','not','was','but','all','can','any','per','set','use','may','out','key','now','see','get','via','www','com','hzs','js','ce','iso','sqm','mport','html','href','class','span','div','img','nav','min','max','avg','var','rgb','px','rem','ems'];
  
  var unique = [];
  words.forEach(function(w) {
    w = w.toLowerCase().replace(/[^a-z]/g, '');
    if (w.length > 4 && ignore.indexOf(w) === -1 && unique.indexOf(w) === -1) {
      unique.push(w);
    }
  });
  
  console.log('\n' + p + ' - ' + unique.length + ' English words:');
  console.log('  ' + unique.join(', '));
});
