/**
 * Batch language file generator v2
 * Usage: node generate_lang_v2.js [fr|pt]
 * Reads English product pages → generates translated versions
 */

const fs = require('fs');
const path = require('path');

const BASE = __dirname;
const EN_DIR = path.join(BASE, 'products');
const LANG = process.argv[2];

if (!['fr', 'pt'].includes(LANG)) {
  console.log('Usage: node generate_lang_v2.js [fr|pt]');
  process.exit(1);
}

function escReg(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// === Translations ===
const NAV_TRANS = LANG === 'fr' ? {
  lang:'fr', sub:'Centrales à Béton', btn:'[🌐] Français ▼',
  items: [['Home','Accueil'],['Products','Produits'],['HZS Series','Série HZS'],['Mobile Plant','Centrale Mobile'],['About','À Propos'],['Global Markets','Marchés Mondiaux'],['Get Quote','Demander un Devis']]
} : {
  lang:'pt', sub:'Usinas de Concreto', btn:'[🌐] Português ▼',
  items: [['Home','Início'],['Products','Produtos'],['HZS Series','Série HZS'],['Mobile Plant','Usina Móvel'],['About','Sobre Nós'],['Global Markets','Mercados Globais'],['Get Quote','Solicitar Orçamento']]
};

const FOOT_TRANS = LANG === 'fr' ? {
  brand:"Fabricant professionnel de centrales à béton. Direct usine, Zhengzhou, Chine.",
  rights:"© 2026 YUDA HUALONG. Tous droits réservés. | Zhengzhou, Henan, Chine",
  pairs:[['Products','Produits'],['HZS Plants','Centrales HZS'],['Mobile Concrete Plant','Centrale Mobile'],['Concrete Mixer','Malaxeur à Béton'],['All Products','Tous les Produits'],['Company','Entreprise'],['About YudaHualong','À Propos de YUDA'],['Factory','Usine'],['Certifications','Certifications'],['Customer Visits','Visites Clients'],['Support','Support'],['Contact Us','Contact'],['FAQ','FAQ'],['YUDA HUALONG','YUDA HUALONG']]
} : {
  brand:"Fabricante profissional de usinas de concreto. Direto da fábrica, Zhengzhou, China.",
  rights:"© 2026 YUDA HUALONG. Todos os direitos reservados. | Zhengzhou, Henan, China",
  pairs:[['Products','Produtos'],['HZS Plants','Usinas HZS'],['Mobile Concrete Plant','Usina Móvel'],['Concrete Mixer','Misturador de Concreto'],['All Products','Todos os Produtos'],['Company','Empresa'],['About YudaHualong','Sobre a YUDA'],['Factory','Fábrica'],['Certifications','Certificações'],['Customer Visits','Visitas de Clientes'],['Support','Suporte'],['Contact Us','Contato'],['FAQ','FAQ'],['YUDA HUALONG','YUDA HUALONG']]
};

// Product name patterns: longest first to avoid partial matches
const PROD_TRANS = LANG === 'fr' ? [
  ['Trailer Mobile Concrete Plant', 'Centrale à Béton Mobile sur Remorque'],
  ['Mobile Concrete Batching Plant', 'Centrale à Béton Mobile'],
  ['Mobile Concrete Plant', 'Centrale à Béton Mobile'],
  ['Concrete Batching Plant', 'Centrale à Béton'],
  ['concrete batching plant', 'centrale à béton'],
  ['Twin-Shaft Forced Mixer', 'Malaxeur Forcé à Double Arbre'],
  ['Forced Type', 'Type Forcé'],
  ['Concrete Mixer', 'Malaxeur à Béton'],
  ['concrete mixer', 'malaxeur à béton'],
  ['JS Series', 'Malaxeurs JS'],
  ['Double HZS240 Concrete Plant', 'Centrale Double HZS240'],
  ['double HZS240 concrete plant', 'centrale double HZS240']
] : [
  ['Trailer Mobile Concrete Plant', 'Usina Móvel sobre Reboque'],
  ['Mobile Concrete Batching Plant', 'Usina de Concreto Móvel'],
  ['Mobile Concrete Plant', 'Usina de Concreto Móvel'],
  ['Concrete Batching Plant', 'Usina de Concreto'],
  ['concrete batching plant', 'usina de concreto'],
  ['Twin-Shaft Forced Mixer', 'Misturador Forçado de Duplo Eixo'],
  ['Forced Type', 'Tipo Forçado'],
  ['Concrete Mixer', 'Misturador de Concreto'],
  ['concrete mixer', 'misturador de concreto'],
  ['JS Series', 'Misturadores JS'],
  ['Double HZS240 Concrete Plant', 'Usina Dupla HZS240'],
  ['double HZS240 concrete plant', 'usina dupla HZS240']
];

function genTitle(file) {
  var suf = ' | YUDA HUALONG';
  if (LANG === 'fr') {
    if (file.includes('mobile') && !file.includes('trailer')) return 'Centrale à Béton Mobile' + suf;
    if (file.includes('trailer')) return 'Centrale à Béton Mobile sur Remorque' + suf;
    if (file.includes('double')) return 'Centrale Double HZS240' + suf;
    if (file.includes('hzs')) return 'Centrale à Béton ' + file.replace('-concrete-batching-plant.html','').toUpperCase() + suf;
    if (file.includes('js')) return 'Malaxeur à Béton ' + file.replace('-concrete-mixer.html','').toUpperCase() + suf;
    if (file.includes('concrete-batching-plant') && !file.includes('hzs')) return 'Centrale à Béton' + suf;
    if (file.includes('concrete-mixer')) return 'Malaxeur à Béton' + suf;
    return 'Centrale à Béton' + suf;
  }
  if (file.includes('mobile') && !file.includes('trailer')) return 'Usina de Concreto Móvel' + suf;
  if (file.includes('trailer')) return 'Usina Móvel sobre Reboque' + suf;
  if (file.includes('double')) return 'Usina Dupla HZS240' + suf;
  if (file.includes('hzs')) return 'Usina de Concreto ' + file.replace('-concrete-batching-plant.html','').toUpperCase() + suf;
  if (file.includes('js')) return 'Misturador de Concreto ' + file.replace('-concrete-mixer.html','').toUpperCase() + suf;
  if (file.includes('concrete-batching-plant') && !file.includes('hzs')) return 'Usina de Concreto' + suf;
  if (file.includes('concrete-mixer')) return 'Misturador de Concreto' + suf;
  return 'Usina de Concreto' + suf;
}

function transDesc(desc) {
  var d = desc.replace(/YudaHualong Concrete/gi, 'YUDA HUALONG');
  d = d.replace(/YudaHualong/gi, 'YUDA HUALONG');
  if (LANG === 'fr') {
    d = d.replace(/Concrete Batching Plant/gi, 'Centrale à Béton');
    d = d.replace(/concrete batching plant/gi, 'centrale à béton');
    d = d.replace(/concrete mixer/gi, 'malaxeur à béton');
    d = d.replace(/twin-shaft forced mixer/gi, 'malaxeur forcé à double arbre');
    d = d.replace(/mobile concrete plant/gi, 'centrale à béton mobile');
    d = d.replace(/Factory direct/gi, 'Direct usine');
  } else {
    d = d.replace(/Concrete Batching Plant/gi, 'Usina de Concreto');
    d = d.replace(/concrete batching plant/gi, 'usina de concreto');
    d = d.replace(/concrete mixer/gi, 'misturador de concreto');
    d = d.replace(/twin-shaft forced mixer/gi, 'misturador forçado de duplo eixo');
    d = d.replace(/mobile concrete plant/gi, 'usina de concreto móvel');
    d = d.replace(/Factory direct/gi, 'Direto da fábrica');
  }
  return d;
}

// Section heading translations
var SEC_TRANS = {};
if (LANG === 'fr') {
  SEC_TRANS['Features'] = 'Caractéristiques';
  SEC_TRANS['Applications'] = 'Applications';
  SEC_TRANS['Technical Specifications'] = 'Spécifications Techniques';
  SEC_TRANS['Why Choose'] = 'Pourquoi Choisir';
  SEC_TRANS['Installation'] = 'Installation';
  SEC_TRANS['Contact Us Today'] = 'Contactez-Nous';
  SEC_TRANS['Get a Quote'] = 'Demander un Devis';
  SEC_TRANS['Request Quote'] = 'Demander un Devis';
} else {
  SEC_TRANS['Features'] = 'Características';
  SEC_TRANS['Applications'] = 'Aplicações';
  SEC_TRANS['Technical Specifications'] = 'Especificações Técnicas';
  SEC_TRANS['Why Choose'] = 'Por que Escolher';
  SEC_TRANS['Installation'] = 'Instalação';
  SEC_TRANS['Contact Us Today'] = 'Fale Conosco';
  SEC_TRANS['Get a Quote'] = 'Solicitar Orçamento';
  SEC_TRANS['Request Quote'] = 'Solicitar Orçamento';
}

// === Main processing ===
function processFiles() {
  var files = fs.readdirSync(EN_DIR).filter(function(f) { return f.endsWith('.html'); });
  console.log('Processing ' + files.length + ' files for ' + LANG);

  var outDir = path.join(BASE, LANG, 'products');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  var ok = 0, err = 0;

  files.forEach(function(file) {
    try {
      var html = fs.readFileSync(path.join(EN_DIR, file), 'utf8');

      // 1. lang attribute
      html = html.replace('<html lang="en">', '<html lang="' + NAV_TRANS.lang + '">');

      // 2. Fix paths (href/src)
      html = html.replace(/(href|src)="\.\.\//g, '$1="../../');

      // 3. Brand name
      html = html.replace('<h1>YudaHualong</h1>', '<h1>YUDA HUALONG</h1>');
      html = html.replace('<span>Concrete Batching Plant Solutions</span>', '<span>' + NAV_TRANS.sub + '</span>');

      // 4. Nav text
      NAV_TRANS.items.forEach(function(p) {
        html = html.replace(new RegExp('>' + escReg(p[0]) + '<', 'g'), '>' + p[1] + '<');
      });

      // 5. Lang button
      html = html.replace('[🌐] English ▼', NAV_TRANS.btn);

      // 6. Footer
      html = html.replace('Professional concrete batching plant manufacturer. Factory direct from Zhengzhou, China.', FOOT_TRANS.brand);
      FOOT_TRANS.pairs.forEach(function(p) {
        html = html.replace(new RegExp(escReg(p[0]), 'g'), p[1]);
      });
      html = html.replace(/© 2026 YudaHualong Concrete\. All rights reserved\. \| Zhengzhou, Henan, China/, FOOT_TRANS.rights);

      // 7. Title
      html = html.replace(/<title>.*?<\/title>/, '<title>' + genTitle(file) + '</title>');

      // 8. Description
      html = html.replace(/<meta name="description" content=".*?">/, function(m) {
        var d = m.match(/content="(.*?)"/);
        return d ? '<meta name="description" content="' + transDesc(d[1]) + '">' : m;
      });

      // 9. hreflang
      if (html.indexOf('hreflang="' + NAV_TRANS.lang + '"') === -1) {
        var ins = '\n<link rel="alternate" hreflang="' + NAV_TRANS.lang + '" href="https://yudaconcrete.github.io/' + NAV_TRANS.lang + '/products/' + file + '">';
        html = html.replace('</head>', ins + '\n</head>');
      }

      // 10. Product name patterns in H1/body
      PROD_TRANS.forEach(function(p) {
        html = html.replace(new RegExp(escReg(p[0]), 'g'), p[1]);
      });

      // 11. Section headings
      Object.keys(SEC_TRANS).forEach(function(k) {
        html = html.replace(new RegExp('>' + escReg(k) + '<', 'g'), '>' + SEC_TRANS[k] + '<');
      });

      // 12. Clean up YudaHualong
      html = html.replace(/YudaHualong Concrete/g, 'YUDA HUALONG');
      html = html.replace(/YudaHualong/g, 'YUDA HUALONG');

      fs.writeFileSync(path.join(outDir, file), html, 'utf8');
      console.log('  OK: ' + file);
      ok++;
    } catch(e) {
      console.log('  ERR: ' + file + ' - ' + e.message);
      err++;
    }
  });

  console.log('\nDone: ' + ok + ' OK, ' + err + ' errors');
}

processFiles();
