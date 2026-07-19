const fs = require('fs');
const BASE = 'G:\\yudaconcrete-preview';
const LANGS = ['es', 'fr', 'pt', 'ar'];

// Fix index.html files - they have assets/ paths but need ../assets/ (depth 1)
LANGS.forEach(function(lang) {
  var filePath = BASE + '\\' + lang + '\\index.html';
  if (!fs.existsSync(filePath)) {
    console.log(lang + '/index.html not found');
    return;
  }
  
  var content = fs.readFileSync(filePath, 'utf8');
  var fixed = content;
  
  // Fix src=assets/ -> src=../assets/ (for images)
  fixed = fixed.replace(/src="assets\//g, 'src="../assets/');
  // Fix href=assets/ -> href=../assets/ (for CSS)
  fixed = fixed.replace(/href="assets\//g, 'href="../assets/');
  
  if (fixed !== content) {
    fs.writeFileSync(filePath, fixed, 'utf8');
    var imgChanges = (content.match(/src="assets\//g) || []).length;
    var cssChanges = (content.match(/href="assets\//g) || []).length;
    console.log(lang + '/index.html: fixed ' + (imgChanges + cssChanges) + ' paths (' + imgChanges + ' images, ' + cssChanges + ' CSS)');
  } else {
    console.log(lang + '/index.html: no changes needed');
  }
});

// Also fix about, contact, faq pages - they might still have ../assets/ instead of ../../assets/
LANGS.forEach(function(lang) {
  ['about.html', 'contact.html', 'faq.html'].forEach(function(page) {
    var filePath = BASE + '\\' + lang + '\\' + page;
    if (!fs.existsSync(filePath)) return;
    
    var content = fs.readFileSync(filePath, 'utf8');
    var fixed = content;
    
    // These files are at depth 1, so ../assets/ needs to be ../../assets/
    fixed = fixed.replace(/src="\.\.\/assets\//g, 'src="../../assets/');
    fixed = fixed.replace(/href="\.\.\/assets\//g, 'href="../../assets/');
    // Also handle plain assets/ (shouldn't exist but just in case)
    fixed = fixed.replace(/src="assets\//g, 'src="../../assets/');
    fixed = fixed.replace(/href="assets\//g, 'href="../../assets/');
    
    if (fixed !== content) {
      fs.writeFileSync(filePath, fixed, 'utf8');
      console.log(lang + '/' + page + ': fixed');
    } else {
      console.log(lang + '/' + page + ': OK');
    }
  });
});
