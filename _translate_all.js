/**
 * 终极翻译脚本 - 翻译所有语言站的全部页面正文
 * 覆盖: es/fr/pt/ar 的产品页、国家页、公司页、项目页
 * 
 * 用法: node _translate_all.js
 * 输出日志: _translate_log.txt
 */

const fs = require('fs');
const BASE = 'G:\\yudaconcrete-preview';
const LOG = BASE + '\\_translate_log.txt';

function log(msg) {
  fs.appendFileSync(LOG, msg + '\n', 'utf8');
}

log('=== 多语言站全面翻译 ===');
log(new Date().toISOString());

// ====== 各语言产品名称翻译 ======
var PROD = {
  es: {
    'Concrete Batching Plant': 'Planta de Hormigón',
    'Concrete Mixer': 'Mezcladora de Hormigón',
    'Mobile Concrete Plant': 'Planta de Hormigón Móvil',
    'Mobile Concrete Batching Plant': 'Planta de Hormigón Móvil',
    'Trailer Mobile Concrete Plant': 'Planta Móvil sobre Remolque',
    'HZS Series': 'Serie HZS',
    'JS Series Twin-Shaft Concrete Mixer': 'Mezcladora JS de Doble Eje',
    'HZS Concrete Batching Plant': 'Planta de Hormigón HZS',
    'HZS Overview': 'Visión General de HZS',
    'Product Center': 'Centro de Productos',
    'All Products': 'Todos los Productos',
    'Specifications': 'Especificaciones',
    'Features': 'Características',
    'Applications': 'Aplicaciones',
    'Technical Specifications': 'Especificaciones Técnicas',
    'Model': 'Modelo',
    'Capacity': 'Capacidad',
    'Mixer Model': 'Modelo de Mezcladora',
    'Total Power': 'Potencia Total',
    'Weighing Accuracy': 'Precisión de Pesaje',
    'Application': 'Aplicación',
    'Why Choose': 'Por Qué Elegir',
    'Get a Quote': 'Solicitar Presupuesto',
    'Contact Us Today': 'Contáctenos Hoy',
    'Product Overview': 'Visión General del Producto',
    'Recommended Model': 'Modelo Recomendado',
    'Common Configuration': 'Configuración Común',
    'Learn More →': 'Más Información →',
    'View Range →': 'Ver Gama →',
    'Inquire Now': 'Consultar Ahora',
    'Get Price': 'Obtener Precio',
    'Request Quote': 'Solicitar Presupuesto',
  },
  fr: {
    'Concrete Batching Plant': 'Centrale à Béton',
    'Concrete Mixer': 'Malaxeur à Béton',
    'Mobile Concrete Plant': 'Centrale à Béton Mobile',
    'Trailer Mobile Concrete Plant': 'Centrale Mobile sur Remorque',
    'HZS Series': 'Série HZS',
    'JS Series Twin-Shaft Concrete Mixer': 'Malaxeur JS à Double Arbre',
    'HZS Concrete Batching Plant': 'Centrale à Béton HZS',
    'Specifications': 'Spécifications',
    'Features': 'Caractéristiques',
    'Applications': 'Applications',
    'Technical Specifications': 'Spécifications Techniques',
    'Model': 'Modèle',
    'Capacity': 'Capacité',
    'Mixer Model': 'Modèle de Malaxeur',
    'Total Power': 'Puissance Totale',
    'Weighing Accuracy': 'Précision de Pesage',
    'Why Choose': 'Pourquoi Choisir',
    'Get a Quote': 'Demander un Devis',
    'Contact Us Today': 'Contactez-Nous',
    'Product Overview': 'Aperçu du Produit',
    'Learn More →': 'En Savoir Plus →',
    'View Range →': 'Voir la Gamme →',
    'Inquire Now': 'S\'enquérir Maintenant',
    'Get Price': 'Obtenir le Prix',
    'Request Quote': 'Demander un Devis',
  },
  pt: {
    'Concrete Batching Plant': 'Usina de Concreto',
    'Concrete Mixer': 'Misturador de Concreto',
    'Mobile Concrete Plant': 'Usina de Concreto Móvel',
    'Trailer Mobile Concrete Plant': 'Usina Móvel sobre Reboque',
    'HZS Series': 'Série HZS',
    'JS Series Twin-Shaft Concrete Mixer': 'Misturador JS de Duplo Eixo',
    'HZS Concrete Batching Plant': 'Usina de Concreto HZS',
    'Specifications': 'Especificações',
    'Features': 'Características',
    'Applications': 'Aplicações',
    'Technical Specifications': 'Especificações Técnicas',
    'Model': 'Modelo',
    'Capacity': 'Capacidade',
    'Mixer Model': 'Modelo do Misturador',
    'Total Power': 'Potência Total',
    'Weighing Accuracy': 'Precisão de Pesagem',
    'Why Choose': 'Por que Escolher',
    'Get a Quote': 'Solicitar Orçamento',
    'Contact Us Today': 'Fale Conosco Hoje',
    'Product Overview': 'Visão Geral do Produto',
    'Learn More →': 'Saiba Mais →',
    'View Range →': 'Ver Gama →',
    'Inquire Now': 'Consultar Agora',
    'Get Price': 'Obter Preço',
    'Request Quote': 'Solicitar Orçamento',
  },
  ar: {
    'Concrete Batching Plant': 'محطة خلط الخرسانة',
    'Concrete Mixer': 'خلاطة الخرسانة',
    'Mobile Concrete Plant': 'محطة خرسانة متنقلة',
    'Trailer Mobile Concrete Plant': 'محطة متنقلة على مقطورة',
    'HZS Series': 'سلسلة HZS',
    'JS Series Twin-Shaft Concrete Mixer': 'خلاطة JS مزدوجة العمود',
    'HZS Concrete Batching Plant': 'محطة خلط خرسانة HZS',
    'Specifications': 'المواصفات',
    'Features': 'الميزات',
    'Applications': 'التطبيقات',
    'Technical Specifications': 'المواصفات الفنية',
    'Model': 'الموديل',
    'Capacity': 'السعة',
    'Mixer Model': 'موديل الخلاطة',
    'Total Power': 'الطاقة الكلية',
    'Weighing Accuracy': 'دقة الوزن',
    'Why Choose': 'لماذا تختار',
    'Get a Quote': 'طلب عرض سعر',
    'Contact Us Today': 'اتصل بنا اليوم',
    'Product Overview': 'نظرة عامة على المنتج',
    'Learn More →': 'اعرف المزيد ←',
    'View Range →': 'عرض المجموعة ←',
    'Inquire Now': 'استفسر الآن',
    'Get Price': 'احصل على السعر',
    'Request Quote': 'طلب عرض سعر',
  }
};

// ====== 国家翻译 ======
var COUNTRY = {
  es: {
    'Market Overview': 'Resumen del Mercado', 'Recommended Model': 'Modelo Recomendado',
    'Application Scenarios': 'Escenarios de Aplicación', 'Why Choose YUDA': 'Por Qué Elegir YUDA',
    'Export & Logistics Support': 'Apoyo de Exportación y Logística',
    'Frequently Asked Questions': 'Preguntas Frecuentes',
    'Russia': 'Rusia', 'Kazakhstan': 'Kazajistán', 'Nigeria': 'Nigeria',
    'Kenya': 'Kenia', 'Pakistan': 'Pakistán', 'Saudi Arabia': 'Arabia Saudita',
    'UAE': 'EAU', 'India': 'India', 'Egypt': 'Egipto',
    'Qatar': 'Catar', 'Indonesia': 'Indonesia', 'Malaysia': 'Malasia',
    'Vietnam': 'Vietnam', 'Bangladesh': 'Bangladesh', 'South Africa': 'Sudáfrica',
    'Azerbaijan': 'Azerbaiyán', 'Turkey': 'Turquía', 'Mexico': 'México',
    'Brazil': 'Brasil', 'Philippines': 'Filipinas', 'Thailand': 'Tailandia',
    'Uzbekistan': 'Uzbekistán', 'Kuwait': 'Kuwait',
    'Cold climate': 'Clima frío', 'hot climate': 'Clima cálido',
    'desert climate': 'Clima desértico', 'tropical climate': 'Clima tropical',
  },
  fr: {
    'Market Overview': 'Aperçu du Marché', 'Recommended Model': 'Modèle Recommandé',
    'Application Scenarios': 'Scénarios d\'Application', 'Why Choose YUDA': 'Pourquoi Choisir YUDA',
    'Export & Logistics Support': 'Support Export et Logistique',
    'Frequently Asked Questions': 'Questions Fréquentes',
    'Russia': 'Russie', 'Kazakhstan': 'Kazakhstan', 'Nigeria': 'Nigéria',
    'Kenya': 'Kenya', 'Pakistan': 'Pakistan', 'Saudi Arabia': 'Arabie Saoudite',
    'UAE': 'EAU', 'India': 'Inde', 'Egypt': 'Égypte',
    'Qatar': 'Qatar', 'Indonesia': 'Indonésie', 'Malaysia': 'Malaisie',
    'Vietnam': 'Viêt Nam', 'Bangladesh': 'Bangladesh', 'South Africa': 'Afrique du Sud',
    'Azerbaijan': 'Azerbaïdjan', 'Turkey': 'Turquie', 'Mexico': 'Mexique',
    'Brazil': 'Brésil', 'Philippines': 'Philippines', 'Thailand': 'Thaïlande',
    'Uzbekistan': 'Ouzbékistan', 'Kuwait': 'Koweït',
  },
  pt: {
    'Market Overview': 'Visão Geral do Mercado', 'Recommended Model': 'Modelo Recomendado',
    'Application Scenarios': 'Cenários de Aplicação', 'Why Choose YUDA': 'Por que Escolher YUDA',
    'Export & Logistics Support': 'Suporte de Exportação e Logística',
    'Frequently Asked Questions': 'Perguntas Frequentes',
    'Russia': 'Rússia', 'Kazakhstan': 'Cazaquistão', 'Nigeria': 'Nigéria',
    'Kenya': 'Quênia', 'Pakistan': 'Paquistão', 'Saudi Arabia': 'Arábia Saudita',
    'UAE': 'EAU', 'India': 'Índia', 'Egypt': 'Egito',
    'Qatar': 'Catar', 'Indonesia': 'Indonésia', 'Malaysia': 'Malásia',
    'Vietnam': 'Vietnã', 'Bangladesh': 'Bangladesh', 'South Africa': 'África do Sul',
    'Azerbaijan': 'Azerbaijão', 'Turkey': 'Turquia', 'Mexico': 'México',
    'Brazil': 'Brasil', 'Philippines': 'Filipinas', 'Thailand': 'Tailândia',
    'Uzbekistan': 'Uzbequistão', 'Kuwait': 'Kuwait',
  }
};

// ====== 执行翻译 ======
function translateFile(filePath, dict) {
  if (!fs.existsSync(filePath)) return 0;
  var html = fs.readFileSync(filePath, 'utf8');
  var fixed = html;
  var count = 0;
  
  var keys = Object.keys(dict).sort(function(a, b) { return b.length - a.length; });
  keys.forEach(function(k) {
    if (fixed.indexOf(k) > -1) {
      fixed = fixed.split(k).join(dict[k]);
      count++;
    }
  });
  
  if (fixed !== html) {
    fs.writeFileSync(filePath, fixed, 'utf8');
  }
  return count;
}

// 处理所有语言
['es', 'fr', 'pt', 'ar'].forEach(function(lang) {
  log('\n--- ' + lang + ' ---');
  
  // 产品页
  var prodDict = PROD[lang];
  var prodDir = BASE + '\\' + lang + '\\products';
  if (fs.existsSync(prodDir)) {
    var files = fs.readdirSync(prodDir).filter(function(f) { return f.endsWith('.html'); });
    files.forEach(function(f) {
      var c = translateFile(prodDir + '\\' + f, prodDict);
      if (c > 0) log('  P ' + f + ': ' + c);
    });
  }
  
  // 国家页
  var ctyDict = COUNTRY[lang] || {};
  var ctyDir = BASE + '\\' + lang + '\\countries';
  if (fs.existsSync(ctyDir)) {
    var ctyFiles = fs.readdirSync(ctyDir).filter(function(f) { return f.endsWith('.html'); });
    ctyFiles.forEach(function(f) {
      var c = translateFile(ctyDir + '\\' + f, ctyDict);
      if (c > 0) log('  C ' + f + ': ' + c);
    });
  }
  
  // 公司页
  var coDir = BASE + '\\' + lang + '\\company';
  if (fs.existsSync(coDir)) {
    var coFiles = fs.readdirSync(coDir).filter(function(f) { return f.endsWith('.html'); });
    coFiles.forEach(function(f) {
      var c = translateFile(coDir + '\\' + f, prodDict);
      if (c > 0) log('  CO ' + f + ': ' + c);
    });
  }
  
  // 项目页
  var prPath = BASE + '\\' + lang + '\\projects\\index.html';
  var c = translateFile(prPath, prodDict);
  if (c > 0) log('  PR projects/index: ' + c);
});

log('\nDone!');
