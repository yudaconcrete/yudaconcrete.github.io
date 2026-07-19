/**
 * 批量生成国家站
 * Usage: node gen_countries.js [es|fr|pt] [country1] [country2] ...
 */

const fs=require('fs'),path=require('path');
const BASE='D:\\.openclaw\\workspace\\搅拌站出口项目\\yudaconcrete-site';
const LANG=process.argv[2];
const COUNTRIES=process.argv.slice(3);

if(!LANG||!COUNTRIES.length){console.log('Usage: node gen_countries.js [es|fr|pt] [country1] [country2] ...');process.exit(1);}

function esc(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}

// 翻译字典
var CFG={
  es:{lang:'es',sub:'Plantas de Hormigón',btn:'[🌐] Español ▼',
    nav:[['Home','Inicio'],['Products','Productos'],['HZS Series','Serie HZS'],['Mobile Plant','Plantas Móviles'],['About','Sobre Nosotros'],['Global Markets','Mercados Globales'],['Get Quote','Solicitar Presupuesto']],
    footerB:'Fabricante profesional de plantas de hormigón. Directo de fábrica desde Zhengzhou, China.',
    footerR:'© 2026 YUDA HUALONG. Todos los derechos reservados. | Zhengzhou, Henan, China',
    footerP:[['HZS Plants','Serie HZS'],['Mobile Concrete Plant','Plantas Móviles'],['Concrete Mixer','Mezcladora'],['All Products','Todos los Productos'],['Company','Empresa'],['About YudaHualong','Sobre YUDA'],['Factory','Fábrica'],['Certifications','Certificaciones'],['Customer Visits','Visitas de Clientes'],['Support','Soporte'],['Contact Us','Contacto'],['FAQ','FAQ']],
    labelVer:'Ver Detalles',
    labelReq:'Solicitar Presupuesto'
  },
  fr:{lang:'fr',sub:'Centrales à Béton',btn:'[🌐] Français ▼',
    nav:[['Home','Accueil'],['Products','Produits'],['HZS Series','Série HZS'],['Mobile Plant','Centrale Mobile'],['About','À Propos'],['Global Markets','Marchés Mondiaux'],['Get Quote','Demander un Devis']],
    footerB:'Fabricant professionnel de centrales à béton. Direct usine, Zhengzhou, Chine.',
    footerR:'© 2026 YUDA HUALONG. Tous droits réservés. | Zhengzhou, Henan, Chine',
    footerP:[['HZS Plants','Centrales HZS'],['Mobile Concrete Plant','Centrale Mobile'],['Concrete Mixer','Malaxeur à Béton'],['All Products','Tous les Produits'],['Company','Entreprise'],['About YudaHualong','À Propos de YUDA'],['Factory','Usine'],['Certifications','Certifications'],['Customer Visits','Visites Clients'],['Support','Support'],['Contact Us','Contact'],['FAQ','FAQ']],
    labelVer:'Voir Détails',
    labelReq:'Demander un Devis'
  },
  pt:{lang:'pt',sub:'Usinas de Concreto',btn:'[🌐] Português ▼',
    nav:[['Home','Início'],['Products','Produtos'],['HZS Series','Série HZS'],['Mobile Plant','Usina Móvel'],['About','Sobre Nós'],['Global Markets','Mercados Globais'],['Get Quote','Solicitar Orçamento']],
    footerB:'Fabricante profissional de usinas de concreto. Direto da fábrica, Zhengzhou, China.',
    footerR:'© 2026 YUDA HUALONG. Todos os direitos reservados. | Zhengzhou, Henan, China',
    footerP:[['HZS Plants','Usinas HZS'],['Mobile Concrete Plant','Usina Móvel'],['Concrete Mixer','Misturador de Concreto'],['All Products','Todos os Produtos'],['Company','Empresa'],['About YudaHualong','Sobre a YUDA'],['Factory','Fábrica'],['Certifications','Certificações'],['Customer Visits','Visitas de Clientes'],['Support','Suporte'],['Contact Us','Contato'],['FAQ','FAQ']],
    labelVer:'Ver Detalhes',
    labelReq:'Solicitar Orçamento'
  }
}[LANG];

// Country name translations
var COUNTRY_NAMES={};
if(LANG==='es'){
  COUNTRY_NAMES={argentina:'Argentina',brazil:'Brasil',egypt:'Egipto',india:'India',indonesia:'Indonesia',kazakhstan:'Kazajistán',kenya:'Kenia',nigeria:'Nigeria',pakistan:'Pakistán',philippines:'Filipinas',qatar:'Qatar',russia:'Rusia',saudi:'Arabia Saudita','saudi-arabia':'Arabia Saudita','south-africa':'Sudáfrica',thailand:'Tailandia',turkey:'Turquía',uae:'EAU',uzbekistan:'Uzbekistán',vietnam:'Vietnam',azerbaijan:'Azerbaiyán',bangladesh:'Bangladesh',malaysia:'Malasia',mexico:'México'};
}else if(LANG==='fr'){
  COUNTRY_NAMES={argentina:'Argentine',brazil:'Brésil',egypt:'Égypte',india:'Inde',indonesia:'Indonésie',kazakhstan:'Kazakhstan',kenya:'Kenya',nigeria:'Nigéria',pakistan:'Pakistan',philippines:'Philippines',qatar:'Qatar',russia:'Russie',saudi:'Arabie Saoudite','saudi-arabia':'Arabie Saoudite','south-africa':'Afrique du Sud',thailand:'Thaïlande',turkey:'Turquie',uae:'EAU',uzbekistan:'Ouzbékistan',vietnam:'Vietnam',azerbaijan:'Azerbaïdjan',bangladesh:'Bangladesh',malaysia:'Malaisie',mexico:'Mexique'};
}else{
  COUNTRY_NAMES={argentina:'Argentina',brazil:'Brasil',egypt:'Egito',india:'Índia',indonesia:'Indonésia',kazakhstan:'Cazaquistão',kenya:'Quênia',nigeria:'Nigéria',pakistan:'Paquistão',philippines:'Filipinas',qatar:'Catar',russia:'Rússia',saudi:'Arábia Saudita','saudi-arabia':'Arábia Saudita','south-africa':'África do Sul',thailand:'Tailândia',turkey:'Turquia',uae:'EAU',uzbekistan:'Uzbequistão',vietnam:'Vietnã',azerbaijan:'Azerbaijão',bangladesh:'Bangladesh',malaysia:'Malásia',mexico:'México'};
}

// Find country template - try existing language version first, then English
function findTemplate(countryId){
  var paths=[
    path.join(BASE,LANG,'countries',countryId+'.html'),
    path.join(BASE,'es','countries',countryId+'.html'),
    path.join(BASE,'countries',countryId+'.html')
  ];
  for(var i=0;i<paths.length;i++){
    if(fs.existsSync(paths[i])) return fs.readFileSync(paths[i],'utf8');
  }
  return null;
}

function applyNavFooter(html){
  html=html.replace(/<html lang="(en|es|fr|pt)">/,'<html lang="'+CFG.lang+'">');
  html=html.replace(/<span>Concrete Batching Plant Solutions<\/span>/,'<span>'+CFG.sub+'</span>');
  html=html.replace(/<span>Plantas de Hormigón<\/span>/,'<span>'+CFG.sub+'</span>');
  html=html.replace(/<span>Centrales à Béton<\/span>/,'<span>'+CFG.sub+'</span>');
  html=html.replace(/<span>Usinas de Concreto<\/span>/,'<span>'+CFG.sub+'</span>');
  html=html.replace(/href="(?:\.\.\/)+(?!\/|assets)/g,'href="../');
  html=html.replace(/src="(?:\.\.\/)+(?!\/)/g,'src="../');
  CFG.nav.forEach(function(p){html=html.replace(new RegExp('>'+esc(p[0])+'<','g'),'>'+p[1]+'<');});
  html=html.replace(/\[🌐\].*?▼/,CFG.btn);
  html=html.replace('Professional concrete batching plant manufacturer. Factory direct from Zhengzhou, China.',CFG.footerB);
  html=html.replace('Fabricante profesional de plantas de hormigón. Directo de fábrica desde Zhengzhou, China.',CFG.footerB);
  html=html.replace('Fabricant professionnel de centrales à béton. Direct usine, Zhengzhou, Chine.',CFG.footerB);
  html=html.replace('Fabricante profissional de usinas de concreto. Direto da fábrica, Zhengzhou, China.',CFG.footerB);
  CFG.footerP.forEach(function(p){html=html.replace(new RegExp(esc(p[0]),'g'),p[1]);});
  html=html.replace(/© 2026 YUDA HUALONG\. Todos los derechos reservados\. \| Zhengzhou, Henan, China/,CFG.footerR);
  html=html.replace(/© 2026 YUDA HUALONG\. Tous droits réservés\. \| Zhengzhou, Henan, Chine/,CFG.footerR);
  html=html.replace(/© 2026 YUDA HUALONG\. Todos os direitos reservados\. \| Zhengzhou, Henan, China/,CFG.footerR);
  html=html.replace(/YudaHualong Concrete/g,'YUDA HUALONG');
  html=html.replace(/YudaHualong/g,'YUDA HUALONG');
  html=html.replace(/Ver Detalles/g,CFG.labelVer);
  html=html.replace(/Voir Détails/g,CFG.labelVer);
  html=html.replace(/Ver Detalhes/g,CFG.labelVer);
  html=html.replace(/Solicitar Presupuesto/g,CFG.labelReq);
  html=html.replace(/Demander un Devis/g,CFG.labelReq);
  html=html.replace(/Solicitar Orçamento/g,CFG.labelReq);
  return html;
}

function generate(countryId){
  var html=findTemplate(countryId);
  if(!html){console.log('  MISSING: '+countryId+' - no template found');return;}

  var cname=COUNTRY_NAMES[countryId]||countryId.charAt(0).toUpperCase()+countryId.slice(1).replace(/-/g,' ');
  
  // Apply nav/footer
  html=applyNavFooter(html);
  
  // Translate title
  var titleMatch=html.match(/<title>(.*?)<\/title>/);
  if(titleMatch){
    var t=titleMatch[1];
    t=t.replace(/for /g,'pour ');
    t=t.replace(/Concrete Plants for /g,LANG==='fr'?'Centrales à Béton pour ':(LANG==='pt'?'Usinas de Concreto para ':'Plantas de Hormigón para '));
    t=t.replace(/Concrete/g,LANG==='fr'?'Béton':(LANG==='pt'?'Concreto':'Hormigón'));
    t=t.replace(/YUDA HUALONG/g,'YUDA HUALONG');
    html=html.replace(titleMatch[0],'<title>'+t+'</title>');
  }
  
  // Translate H1
  html=html.replace(/<h1>.*?<\/h1>/,function(m){
    var h=m.replace(/for /g,'pour ').replace(/for /g,'para ');
    h=h.replace(/Concrete Plants for /g,LANG==='fr'?'Centrales à Béton pour ':(LANG==='pt'?'Usinas de Concreto para ':'Plantas de Hormigón para '));
    h=h.replace(/Concrete/g,LANG==='fr'?'Béton':(LANG==='pt'?'Concreto':'Hormigón'));
    return h;
  });
  
  // Update hreflang
  if(html.indexOf('hreflang="'+CFG.lang+'"')===-1){
    html=html.replace('</head>','\n<link rel="alternate" hreflang="'+CFG.lang+'" href="https://yudaconcrete.github.io/'+CFG.lang+'/countries/'+countryId+'.html">\n</head>');
  }
  
  // Fix the hreflang section to be clean
  html=html.replace(/<link rel="alternate"[^>]*>\s*<link rel="alternate"/g,'<link rel="alternate"');
  
  var outDir=path.join(BASE,LANG,'countries');
  if(!fs.existsSync(outDir)) fs.mkdirSync(outDir,{recursive:true});
  fs.writeFileSync(path.join(outDir,countryId+'.html'),html,'utf8');
  console.log('  OK: '+countryId+'.html');
}

COUNTRIES.forEach(generate);
console.log('Done! '+COUNTRIES.length+' countries for '+LANG);
