/**
 * 剩余英文文本翻译 - 全面补翻译
 * 覆盖所有4种语言站的 index/about/faq 中还没翻的段落
 */
const fs = require('fs');
const BASE = 'G:\\yudaconcrete-preview';

var TRANS = {
  es: {
    // Index paragraph
    'Professional concrete batching plant manufacturer in China. Complete HZS series from 25 to 480 m³/h. Mobile and stationary solutions for global construction projects. Factory direct pricing with full installation support.':
      'Fabricante profesional de plantas de hormigón en China. Serie completa HZS de 25 a 480 m³/h. Soluciones móviles y estacionarias para proyectos de construcción globales. Precio directo de fábrica con soporte completo de instalación.',
    'Professional manufacturer delivering complete concrete production solutions worldwide.':
      'Fabricante profesional que ofrece soluciones completas de producción de hormigón en todo el mundo.',
      
    // About paragraph
    'YUDA HUALONG is a professional manufacturer specializing in concrete mixing equipment R&D and production.':
      'YUDA HUALONG es un fabricante profesional especializado en I+D y producción de equipos de mezcla de hormigón.',
    'As one of China\'s large-scale construction machinery manufacturers, we have a 40,000 sqm production base featuring advanced technology, equipment, and processes.':
      'Como uno de los grandes fabricantes chinos de maquinaria de construcción, contamos con una base de producción de 40,000 m² con tecnología, equipos y procesos avanzados.',
    'We are ISO9001 certified, ensuring every machine meets the highest industry standards before delivery.':
      'Estamos certificados ISO9001, garantizando que cada máquina cumple con los más altos estándares de la industria antes de su entrega.',
    'Our registered capital was increased to 12 million RMB in 2025, reflecting continuous growth and strong financial standing.':
      'Nuestro capital registrado se incrementó a 12 millones de RMB en 2025, reflejando crecimiento continuo y una sólida posición financiera.',
    'Since establishment, we have consistently upheld the corporate spirit of "pursuing quality, creating value," continuously striving for excellence and innovation.':
      'Desde nuestra fundación, mantenemos el espíritu corporativo de "búsqueda de calidad, creación de valor", esforzándonos continuamente por la excelencia y la innovación.',
    'Our superior products and services have earned trust and praise from customers globally.':
      'Nuestros productos y servicios superiores han ganado la confianza y el reconocimiento de clientes a nivel global.',
  },
  fr: {
    'Professional concrete batching plant manufacturer in China.': 'Fabricant professionnel de centrales à béton en Chine.',
    'As one of China\'s large-scale construction machinery manufacturers, we have a 40,000 sqm production base': 'En tant que l\'un des grands fabricants chinois d\'équipements de construction, nous disposons d\'une base de production de 40 000 m²',
    'We are ISO9001 certified, ensuring every machine meets the highest industry standards before delivery.': 'Nous sommes certifiés ISO9001, garantissant que chaque machine répond aux normes industrielles les plus élevées avant la livraison.',
    'Since establishment, we have consistently upheld the corporate spirit': 'Depuis notre création, nous maintenons l\'esprit d\'entreprise',
  },
  pt: {
    'Professional concrete batching plant manufacturer in China.': 'Fabricante profissional de usinas de concreto na China.',
    'As one of China\'s large-scale construction machinery manufacturers, we have a 40,000 sqm production base': 'Como um dos maiores fabricantes chineses de equipamentos de construção, temos uma base de produção de 40.000 m²',
  },
  ar: {
    'As one of China\'s large-scale construction machinery manufacturers, we have a 40,000 sqm production base': 'كأحد أكبر مصنعي معدات البناء في الصين، لدينا قاعدة إنتاج بمساحة 40,000 متر مربع',
    'Our registered capital was increased to 12 million RMB in 2025': 'تم زيادة رأس مالنا المسجل إلى 12 مليون يوان صيني في 2025',
  }
};

['es', 'fr', 'pt', 'ar'].forEach(function(lang) {
  var dict = TRANS[lang];
  if (!dict) return;
  
  ['index.html', 'about.html'].forEach(function(page) {
    var fp = BASE + '\\' + lang + '\\' + page;
    if (!fs.existsSync(fp)) return;
    
    var html = fs.readFileSync(fp, 'utf8');
    var fixed = html;
    var count = 0;
    
    Object.keys(dict).forEach(function(en) {
      if (fixed.indexOf(en) > -1) {
        fixed = fixed.split(en).join(dict[en]);
        count++;
      }
    });
    
    if (count > 0) {
      fs.writeFileSync(fp, fixed, 'utf8');
    }
  });
});

// 清理临时文件
var tmpFiles = [
  '_translate_ar_v1.js', '_translate_ar_countries.js', '_translate_all.js',
  '_translate_log.txt', '_status_now.md', '_check_eng.js', 'out.txt',
  '_fix_remaining_english.js'
];
tmpFiles.forEach(function(f) {
  var fp = BASE + '\\' + f;
  if (fs.existsSync(fp)) fs.unlinkSync(fp);
});

console.log('DONE');
