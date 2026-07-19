/**
 * 修复各语言站剩余英文小字
 */
const fs = require('fs');
const BASE = 'G:\\yudaconcrete-preview';

var FIXES = {
  es: {
    // Feature card h3 - fix partial translations
    'Directo de F\u00e1brica Pricing</h3><p>40,000m2 production base in Zhengzhou, China. No middlemen, competitive factory prices with direct manufacturer support.</p>': 'Directo de F\u00e1brica</h3><p>Base de producci\u00f3n de 40,000 m\u00b2 en Zhengzhou, China. Sin intermediarios, precios competitivos de f\u00e1brica con soporte directo del fabricante.</p>',
    'Global Export Experience</h3><p>Successfully exported to Russia, Nigeria, Pakistan, Kenya, Saudi Arabia, Vietnam, Kazakhstan, Uzbekistan, and more.</p>': 'Experiencia en Exportaci\u00f3n Global</h3><p>Exportado con \u00e9xito a Rusia, Nigeria, Pakist\u00e1n, Kenia, Arabia Saudita, Vietnam, Kazajist\u00e1n, Uzbekist\u00e1n y m\u00e1s.</p>',
    'Full Service Support</h3><p>Pre-sales planning, installation guidance, on-site commissioning, operator training, and lifetime spare parts supply.</p>': 'Soporte de Servicio Completo</h3><p>Planificaci\u00f3n previa a la venta, gu\u00eda de instalaci\u00f3n, puesta en marcha in situ, capacitaci\u00f3n de operadores y suministro de repuestos de por vida.</p>',
    'Certificado CE e ISO</h3><p>International quality standards. CE certification, ISO 9001 quality management system, 2 utility model patents.</p>': 'Certificado CE e ISO</h3><p>Est\u00e1ndares internacionales de calidad. Certificaci\u00f3n CE, sistema de gesti\u00f3n de calidad ISO 9001, 2 patentes de modelo de utilidad.</p>',
    
    // Product descriptions - translate remaining
    'Forced type mobile batching plant with wheel-mounted design. No foundation required, quick installation. Ideal for road construction and remote project sites.</p><span class="product-card-link">Learn More': 'Planta m\u00f3vil de tipo forzado con dise\u00f1o montado sobre ruedas. Sin necesidad de cimentaci\u00f3n, instalaci\u00f3n r\u00e1pida. Ideal para construcci\u00f3n de carreteras y proyectos remotos.</p><span class="product-card-link">M\u00e1s Informaci\u00f3n',
    'Drum type trailer mobile plant. Truck-towable design, operational within hours. Perfect for projects that move from site to site across Central Asia.</p><span class="product-card-link">Learn More': 'Planta m\u00f3vil tipo tambor sobre remolque. Dise\u00f1o remolcable por cami\u00f3n, operativa en horas. Perfecta para proyectos que se trasladan de un sitio a otro.</p><span class="product-card-link">M\u00e1s Informaci\u00f3n',
    '25-480 m&sup3;/h forced-type concrete batching plants. JS twin-shaft mixer, PLC auto control, precise weighing. Ideal for commercial concrete and large infrastructure projects.</p><span class="product-card-link">View Range': 'Plantas de hormig\u00f3n de tipo forzado de 25-480 m\u00b3/h. Mezcladora JS de doble eje, control PLC autom\u00e1tico, pesaje preciso. Ideal para hormig\u00f3n comercial y grandes proyectos de infraestructura.</p><span class="product-card-link">Ver Gama',
    'Twin-shaft forced mixers from JS500 to JS4500. For batching plant main units and independent mixing operations. High uniformity, durable wear parts.</p><span class="product-card-link">View Range': 'Mezcladoras forzadas de doble eje desde JS500 hasta JS4500. Para unidades principales de plantas y operaciones de mezclado independientes. Alta uniformidad, piezas de desgaste duraderas.</p><span class="product-card-link">Ver Gama',
    
    // Footer
    'Fabricante profesional de plantas de hormig\u00f3n. Directo de f\u00e1brica desde Zhengzhou, China.</p><p style="margin-top:12px;">Tel: +86 18638788818</p></div>': 'Fabricante profesional de plantas de hormig\u00f3n. Directo de f\u00e1brica desde Zhengzhou, China.</p><p style="margin-top:12px;">Tel: +86 18638788818</p></div>',
  },
  fr: {
    'Factory Direct Pricing': 'Prix Direct Usine',
    'Global Export Experience': 'Exp\u00e9rience d\'Exportation Mondiale',
    'Full Service Support': 'Support de Service Complet',
    '40,000sqm production base in Zhengzhou, China. No middlemen, competitive factory prices with direct manufacturer support.': 'Base de production de 40 000 m\u00b2 \u00e0 Zhengzhou, Chine. Sans interm\u00e9diaires, prix d\'usine comp\u00e9titifs avec support direct du fabricant.',
    'Successfully exported to Russia, Nigeria, Pakistan, Kenya, Saudi Arabia, Vietnam, Kazakhstan, Uzbekistan, and more.': 'Export\u00e9 avec succ\u00e8s en Russie, Nigeria, Pakistan, Kenya, Arabie Saoudite, Vietnam, Kazakhstan, Ouzb\u00e9kistan et plus.',
    'Pre-sales planning, installation guidance, on-site commissioning, operator training, and lifetime spare parts supply.': 'Planification avant-vente, guidance d\'installation, mise en service sur site, formation des op\u00e9rateurs et fourniture de pi\u00e8ces de rechange \u00e0 vie.',
    'International quality standards. CE certification, ISO 9001 quality management system, 2 utility model patents.': 'Normes de qualit\u00e9 internationales. Certification CE, syst\u00e8me de management qualit\u00e9 ISO 9001, 2 brevets de mod\u00e8le d\'utilit\u00e9.',
  },
  pt: {
    'Factory Direct Pricing': 'Pre\u00e7o Direto de F\u00e1brica',
    'Global Export Experience': 'Experi\u00eancia de Exporta\u00e7\u00e3o Global',
    'Full Service Support': 'Suporte de Servi\u00e7o Completo',
    '40,000sqm production base in Zhengzhou, China. No middlemen, competitive factory prices with direct manufacturer support.': 'Base de produ\u00e7\u00e3o de 40.000 m\u00b2 em Zhengzhou, China. Sem intermedi\u00e1rios, pre\u00e7os competitivos de f\u00e1brica com suporte direto do fabricante.',
    'Successfully exported to Russia, Nigeria, Pakistan, Kenya, Saudi Arabia, Vietnam, Kazakhstan, Uzbekistan, and more.': 'Exportado com sucesso para R\u00fassia, Nig\u00e9ria, Paquist\u00e3o, Qu\u00eania, Ar\u00e1bia Saudita, Vietn\u00e3, Cazaquist\u00e3o, Uzbequist\u00e3o e mais.',
    'Pre-sales planning, installation guidance, on-site commissioning, operator training, and lifetime spare parts supply.': 'Planejamento pr\u00e9-venda, orienta\u00e7\u00e3o de instala\u00e7\u00e3o, comissionamento no local, treinamento de operadores e fornecimento vital\u00edcio de pe\u00e7as de reposi\u00e7\u00e3o.',
    'International quality standards. CE certification, ISO 9001 quality management system, 2 utility model patents.': 'Padr\u00f5es internacionais de qualidade. Certifica\u00e7\u00e3o CE, sistema de gest\u00e3o de qualidade ISO 9001, 2 patentes de modelo de utilidade.',
  },
  ar: {
    'Factory Direct Pricing': '\u0623\u0633\u0639\u0627\u0631 \u0645\u0628\u0627\u0634\u0631\u0629 \u0645\u0646 \u0627\u0644\u0645\u0635\u0646\u0639',
  }
};

['es', 'fr', 'pt', 'ar'].forEach(function(lang) {
  var filePath = BASE + '\\' + lang + '\\index.html';
  if (!fs.existsSync(filePath)) return;
  
  var html = fs.readFileSync(filePath, 'utf8');
  var count = 0;
  
  var fixes = FIXES[lang];
  if (!fixes) return;
  
  Object.keys(fixes).forEach(function(en) {
    if (html.indexOf(en) > -1) {
      html = html.split(en).join(fixes[en]);
      count++;
    }
  });
  
  if (count > 0) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(lang + '/index.html: ' + count + ' fixes applied');
  } else {
    console.log(lang + '/index.html: no matches (may need different approach)');
  }
});

console.log('\n=== Final verification ===');
var phrases = ['View Range', 'Learn More', 'Factory Direct', 'Global Export', 'Full Service'];
['es', 'fr', 'pt', 'ar'].forEach(function(lang) {
  var html = fs.readFileSync(BASE + '\\' + lang + '\\index.html', 'utf8');
  var remaining = phrases.filter(function(p) { return html.indexOf(p) > -1; });
  if (remaining.length > 0) {
    console.log(lang + ': ' + remaining.join(', '));
  } else {
    console.log(lang + ': OK');
  }
});
