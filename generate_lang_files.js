/**
 * 批量生成法语/葡语产品页
 * 用法: node generate_lang_files.js [fr|pt]
 * 
 * 读取英文产品页 -> 翻译关键内容 -> 输出到目标语言目录
 */

const fs = require('fs');
const path = require('path');

const BASE = __dirname;
const EN_PRODUCTS = path.join(BASE, 'products');
const LANG = process.argv[2]; // 'fr' or 'pt'

if (!LANG || !['fr', 'pt'].includes(LANG)) {
  console.log('Usage: node generate_lang_files.js [fr|pt]');
  process.exit(1);
}

// === 翻译字典 ===
// 导航/页脚/UI公共部分
const NAV = {
  fr: {
    lang: 'fr',
    logoSub: 'Centrales à Béton',
    home: 'Accueil',
    products: 'Produits',
    hzsSeries: 'Série HZS',
    mobile: 'Centrales Mobiles',
    about: 'À Propos',
    global: 'Marchés Mondiaux',
    quote: 'Demander un Devis',
    langLabel: 'Français',
    langSwitch: '[🌐] Français ▼'
  },
  pt: {
    lang: 'pt',
    logoSub: 'Usinas de Concreto',
    home: 'Início',
    products: 'Produtos',
    hzsSeries: 'Série HZS',
    mobile: 'Usinas Móveis',
    about: 'Sobre Nós',
    global: 'Mercados Globais',
    quote: 'Solicitar Orçamento',
    langLabel: 'Português',
    langSwitch: '[🌐] Português ▼'
  }
};

const FOOTER = {
  fr: {
    brand: 'Fabricant professionnel de centrales à béton. Direct usine depuis Zhengzhou, Chine.',
    products: 'Produits',
    hzsPlants: 'Centrales HZS',
    mobilePlant: 'Centrale Mobile',
    mixer: 'Malaxeur',
    allProducts: 'Tous les Produits',
    company: 'Entreprise',
    aboutUs: 'À Propos de YUDA',
    factory: 'Usine',
    certs: 'Certifications',
    visits: 'Visites Clients',
    support: 'Support',
    contact: 'Contact',
    rights: '© 2026 YUDA HUALONG. Tous droits réservés. | Zhengzhou, Henan, Chine'
  },
  pt: {
    brand: 'Fabricante profissional de usinas de concreto. Direto da fábrica em Zhengzhou, China.',
    products: 'Produtos',
    hzsPlants: 'Usinas HZS',
    mobilePlant: 'Usina Móvel',
    mixer: 'Misturador',
    allProducts: 'Todos os Produtos',
    company: 'Empresa',
    aboutUs: 'Sobre a YUDA',
    factory: 'Fábrica',
    certs: 'Certificações',
    visits: 'Visitas de Clientes',
    support: 'Suporte',
    contact: 'Contato',
    rights: '© 2026 YUDA HUALONG. Todos os direitos reservados. | Zhengzhou, Henan, China'
  }
};

// === 产品页面翻译配置 ===
// 每个产品: { file, title, desc, h1, subtitle }
// 读取英文文件后提取内容并翻译
const DICT = LANG === 'fr' ? {
  lang: 'fr',
  name: 'Français',
  // 通用替换
  hzsPlant: 'Centrale à Béton HZS',
  concretePlant: 'Centrale à Béton',
  mobilePlant: 'Centrale à Béton Mobile',
  trailerPlant: 'Centrale Mobile sur Remorque',
  concreteMixer: 'Malaxeur à Béton',
  mixerSeries: 'Malaxeurs JS',
  forcedMixer: 'Malaxeur Forcé à Double Arbre',
  allProducts: 'Tous les Produits',
  productCenter: 'Centre de Produits',
  hzsOverview: 'Aperçu de la Série HZS'
} : {
  lang: 'pt',
  name: 'Português',
  hzsPlant: 'Usina de Concreto HZS',
  concretePlant: 'Usina de Concreto',
  mobilePlant: 'Usina de Concreto Móvel',
  trailerPlant: 'Usina Móvel sobre Reboque',
  concreteMixer: 'Misturador de Concreto',
  mixerSeries: 'Misturadores JS',
  forcedMixer: 'Misturador Forçado de Duplo Eixo',
  allProducts: 'Todos os Produtos',
  productCenter: 'Centro de Produtos',
  hzsOverview: 'Visão Geral da Série HZS'
};

const NAV_DATA = NAV[LANG];
const FOOTER_DATA = FOOTER[LANG];

// 读取英文文件
function readEnglishFile(filename) {
  const fullPath = path.join(EN_PRODUCTS, filename);
  if (!fs.existsSync(fullPath)) return null;
  return fs.readFileSync(fullPath, 'utf8');
}

// 替换导航栏
function replaceNav(html) {
  // lang attribute
  html = html.replace(/<html lang="en">/, `<html lang="${NAV_DATA.lang}">`);
  
  // nav links - Spanish style nav pattern (inline)
  html = html.replace(/<span>Concrete Batching Plant Solutions<\/span>/, `<span>${NAV_DATA.logoSub}</span>`);
  
  // Nav items - replace English text
  html = html.replace(/>Home</g, `>${NAV_DATA.home}<`);
  html = html.replace(/>Products</g, `>${NAV_DATA.products}<`);
  html = html.replace(/>HZS Series</g, `>${NAV_DATA.hzsSeries}<`);
  html = html.replace(/>Mobile Plant</g, `>${NAV_DATA.mobile}<`);
  html = html.replace(/>About</g, `>${NAV_DATA.about}<`);
  html = html.replace(/>Global Markets</g, `>${NAV_DATA.global}<`);
  html = html.replace(/>Get Quote</g, `>${NAV_DATA.quote}<`);
  html = html.replace(/\[🌐\] English ▼/g, NAV_DATA.langSwitch);
  
  return html;
}

// 替换页脚
function replaceFooter(html) {
  html = html.replace(/Professional concrete batching plant manufacturer\. Factory direct from Zhengzhou, China\./, FOOTER_DATA.brand);
  html = html.replace(/Products/g, FOOTER_DATA.products);
  html = html.replace(/HZS Plants/g, FOOTER_DATA.hzsPlants);
  html = html.replace(/Mobile Concrete Plant/g, FOOTER_DATA.mobilePlant);
  html = html.replace(/Concrete Mixer/g, FOOTER_DATA.mixer);
  html = html.replace(/All Products/g, FOOTER_DATA.allProducts);
  html = html.replace(/>Company</g, `>${FOOTER_DATA.company}<`);
  html = html.replace(/About YudaHualong/g, FOOTER_DATA.aboutUs);
  html = html.replace(/>Factory</g, `>${FOOTER_DATA.factory}<`);
  html = html.replace(/Certifications/g, FOOTER_DATA.certs);
  html = html.replace(/Customer Visits/g, FOOTER_DATA.visits);
  html = html.replace(/>Support</g, `>${FOOTER_DATA.support}<`);
  html = html.replace(/Contact Us/g, FOOTER_DATA.contact);
  html = html.replace(/© 2026 YudaHualong Concrete\. All rights reserved\. \| Zhengzhou, Henan, China/, FOOTER_DATA.rights);
  html = html.replace(/YudaHualong Concrete/g, 'YUDA HUALONG');
  
  return html;
}

// 通用翻译替换（针对产品页内容）
function translateContent(html, filename) {
  const d = DICT;
  
  // 产品类型相关的翻译
  html = html.replace(/Concrete Batching Plant/g, d.concretePlant);
  html = html.replace(/concrete batching plant/g, d.concretePlant.toLowerCase());
  html = html.replace(/Mobile Concrete Plant/g, d.mobilePlant);
  html = html.replace(/Trailer Mobile Concrete Plant/g, d.trailerPlant);
  html = html.replace(/Concrete Mixer/g, d.concreteMixer);
  html = html.replace(/concrete mixer/g, d.concreteMixer.toLowerCase());
  html = html.replace(/Twin-Shaft Forced Mixer/g, d.forcedMixer);
  html = html.replace(/JS Series/g, d.mixerSeries);
  
  // 通用短语
  html = html.replace(/Features/g, 'Caractéristiques');
  html = html.replace(/Applications/g, 'Applications');
  html = html.replace(/Technical Specifications/g, 'Spécifications Techniques');
  html = html.replace(/Why Choose/g, 'Pourquoi Choisir');
  html = html.replace(/Contact Us Today/g, 'Contactez-Nous');
  html = html.replace(/Get a Quote/g, 'Demander un Devis');
  html = html.replace(/Inquiry/g, 'Demande de Renseignement');
  html = html.replace(/Learn More/g, 'En Savoir Plus');
  html = html.replace(/Request Quote/g, 'Demander un Devis');
  html = html.replace(/View Product/g, 'Voir le Produit');
  html = html.replace(/Get Price/g, 'Obtenir le Prix');
  html = html.replace(/Download Specs/g, 'Télécharger les Spécifications');
  
  // CTA区
  html = html.replace(/Get Your Quote Today/g, 'Obtenez Votre Devis');
  html = html.replace(/Contact Our Team/g, 'Contactez Notre Équipe');
  html = html.replace(/Send Inquiry/g, 'Envoyer une Demande');
  
  return html;
}

// 葡萄牙语替换
function translateContentPT(html) {
  html = html.replace(/Concrete Batching Plant/g, 'Usina de Concreto');
  html = html.replace(/concrete batching plant/g, 'usina de concreto');
  html = html.replace(/Mobile Concrete Plant/g, 'Usina de Concreto Móvel');
  html = html.replace(/Trailer Mobile Concrete Plant/g, 'Usina Móvel sobre Reboque');
  html = html.replace(/Concrete Mixer/g, 'Misturador de Concreto');
  html = html.replace(/concrete mixer/g, 'misturador de concreto');
  html = html.replace(/Twin-Shaft Forced Mixer/g, 'Misturador Forçado de Duplo Eixo');
  html = html.replace(/JS Series/g, 'Misturadores JS');
  
  html = html.replace(/Features/g, 'Características');
  html = html.replace(/Applications/g, 'Aplicações');
  html = html.replace(/Technical Specifications/g, 'Especificações Técnicas');
  html = html.replace(/Why Choose/g, 'Por que Escolher');
  html = html.replace(/Contact Us Today/g, 'Fale Conosco');
  html = html.replace(/Get a Quote/g, 'Solicitar Orçamento');
  html = html.replace(/Inquiry/g, 'Consulta');
  html = html.replace(/Learn More/g, 'Saiba Mais');
  html = html.replace(/Request Quote/g, 'Solicitar Orçamento');
  html = html.replace(/View Product/g, 'Ver Produto');
  html = html.replace(/Get Price/g, 'Obter Preço');
  html = html.replace(/Download Specs/g, 'Baixar Especificações');
  html = html.replace(/Get Your Quote Today/g, 'Obtenha Seu Orçamento');
  html = html.replace(/Contact Our Team/g, 'Fale com Nossa Equipe');
  html = html.replace(/Send Inquiry/g, 'Enviar Consulta');
  
  return html;
}

// 主处理函数
function processFiles() {
  const files = fs.readdirSync(EN_PRODUCTS).filter(f => f.endsWith('.html'));
  console.log(`Found ${files.length} English product files`);
  
  const outDir = path.join(BASE, LANG, 'products');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  
  let success = 0;
  let errors = 0;
  
  files.forEach(file => {
    try {
      let html = readEnglishFile(file);
      if (!html) {
        console.log(`  SKIP: ${file} - not found`);
        return;
      }
      
      // Apply translations
      html = replaceNav(html);
      html = replaceFooter(html);
      
      if (LANG === 'fr') {
        html = translateContent(html, file);
      } else {
        html = translateContentPT(html);
      }
      
      // Update hreflang
      // Add the current language hreflang if not present
      if (!html.includes(`hreflang="${NAV_DATA.lang}"`)) {
        const hreflangInsert = `<link rel="alternate" hreflang="${NAV_DATA.lang}" href="https://yudaconcrete.github.io/${NAV_DATA.lang}/products/${file}">`;
        html = html.replace('</head>', `${hreflangInsert}\n</head>`);
      }
      
      // Fix image paths - ensure they use ../../ from the language products dir
      // English products use ../ for images, language products need ../../
      html = html.replace(/src="\.\.\/assets\//g, `src="../../assets/`);
      html = html.replace(/href="\.\.\/assets\//g, `href="../../assets/`);
      
      // Fix nav links - English products use ../, language products need ../../
      // For nav: href="../products/..." -> needs to stay as href="../../products/..."
      // Actually the nav already uses relative paths. Let me check...
      // English files: nav hrefs use "../" which goes from /products/ to root
      // Language files: nav from /LANG/products/ needs "../../" to go to root
      html = html.replace(/href="\.\.\//g, 'href="../../');
      
      // But fix the logo href specifically
      html = html.replace(/href="\.\.\/\/es\/"/g, 'href="/es/"');
      html = html.replace(/href="\.\.\/\/fr\/"/g, 'href="/fr/"');
      html = html.replace(/href="\.\.\/\/pt\/"/g, 'href="/pt/"');
      
      // Fix lang dropdown links (they use absolute paths, should be fine)
      
      // Write output
      const outPath = path.join(outDir, file);
      fs.writeFileSync(outPath, html, 'utf8');
      console.log(`  OK: ${file}`);
      success++;
    } catch(e) {
      console.log(`  ERR: ${file} - ${e.message}`);
      errors++;
    }
  });
  
  console.log(`\nDone: ${success} OK, ${errors} errors`);
}

processFiles();
