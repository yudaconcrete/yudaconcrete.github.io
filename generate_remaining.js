/**
 * 批量生成剩余页面: company/FAQ/projects for French and Portuguese
 * 以西班牙语版本为模板
 */

const fs = require('fs');
const path = require('path');
const BASE = __dirname;

const LANG = process.argv[2]; // fr or pt
if (!['fr','pt'].includes(LANG)) { console.log('Usage: node generate_remaining.js [fr|pt]'); process.exit(1); }

// === 翻译配置 ===
var CFG = LANG === 'fr' ? {
  lang:'fr',
  // company pages
  factory: {
    title:'Usine | YUDA HUALONG - Base de Fabrication à Zhengzhou',
    desc:'YUDA HUALONG - 40,000 m² d\'usine moderne. Lignes de production avancées, contrôle qualité et équipes techniques professionnelles.',
    h1:'Notre Usine',
    sub:'Installations de fabrication avancées à Zhengzhou, Chine.',
    intro:'YUDA HUALONG exploite une installation de production moderne de 40 000 mètres carrés, équipée de machinerie avancée et d\'équipes techniques expérimentées.',
    intro2:'De la sélection des matières premières à l\'inspection finale, chaque étape suit des normes professionnelles de production.',
    card1:'Base de production moderne avec installations complètes',
    card2:'Ingénieurs, techniciens et spécialistes du contrôle qualité expérimentés',
    card3:'Procédures d\'inspection strictes garantissant des produits fiables',
    card4:'Support aux clients et projets dans le monde entier',
    section1:'Capacité de Production',
    section2:'Avantages de Fabrication',
    adv1:'Production Professionnelle',
    adv1d:'Processus de production standardisés et opérateurs qualifiés.',
    adv2:'Installations Complètes',
    adv2d:'Ateliers dédiés couvrant toute la chaîne de production.',
    adv3:'Tests Rigoureux',
    adv3d:'Chaque machine subit des tests approfondis avant livraison.',
    ctaTitle:'Visitez Notre Usine',
    ctaText:'Bienvenue à Zhengzhou pour voir notre processus de fabrication.',
    ctaBtn:'Planifier une Visite'
  },
  certificates: {
    title:'Certifications | YUDA HUALONG - ISO9001 & CE',
    desc:'YUDA HUALONG certifications: CE, ISO 9001, brevets d\'utilité, Alibaba Gold Supplier.',
    h1:'Certifications & Qualifications',
    sub:'Qualité garantie. Certifié internationalement. Fiable dans le monde entier.',
    intro:'YUDA HUALONG détient de multiples certifications internationales.',
    cert1:'Certification CE',
    cert1d:'Conformité au marché européen. Nos produits répondent aux normes internationales.',
    cert2:'ISO 9001',
    cert2d:'Système de management de la qualité certifié internationalement.',
    cert3:'Brevets d\'Utilité',
    cert3d:'Deux brevets de modèle d\'utilité pour nos conceptions innovantes.',
    cert4:'Alibaba Gold Supplier',
    cert4d:'Statut de fournisseur vérifié sur Alibaba.com.',
    qTitle:'Qualifications d\'Entreprise',
    qIntro:'YUDA HUALONG (Zhengzhou Hualong) a un capital enregistré de 12 millions RMB.',
    q1:'Capital de 12 millions RMB (augmentation de 8M en 2025).',
    q2:'Fabricant d\'équipements de construction entièrement agréé.',
    q3:'Entreprise d\'exportation autorisée avec capacités douanières.',
    ctaTitle:'Demander des Copies des Certificats',
    ctaText:'Contactez-nous pour des copies vérifiées.',
    ctaBtn:'Contactez-Nous'
  },
  visits: {
    title:'Visites Clients | YUDA HUALONG',
    desc:'Clients du monde entier visitent l\'usine YUDA HUALONG pour inspection des équipements.',
    h1:'Visites de Clients',
    sub:'Des clients internationaux visitent notre usine pour inspection et collaboration.',
    intro:'YUDA HUALONG accueille des clients du monde entier dans son usine.',
    exp1:'Visite d\'Usine',
    exp1d:'Les clients visitent notre installation de production de 40 000 m².',
    exp2:'Inspection d\'Équipement',
    exp2d:'Examen de la structure et des performances des machines sur site.',
    exp3:'Discussion Technique',
    exp3d:'Nos ingénieurs discutent des projets et solutions personnalisées.',
    exp4:'Signature de Contrat',
    exp4d:'De nombreux partenariats sont finalisés lors des visites d\'usine.',
    global:'Nos Clients Mondiaux',
    globalText:'YUDA HUALONG a accueilli des clients de plus de 7 pays.',
    gallery:'Visites de Clients Étrangers',
    gallery1:'Visite d\'Usine',
    gallery1d:'Des clients internationaux visitent nos installations.',
    gallery2:'Communication Technique',
    gallery2d:'Discussions professionnelles sur les besoins des clients.',
    gallery3:'Réunion d\'Affaires',
    gallery3d:'Communication en face-à-face pour une coopération à long terme.',
    ctaTitle:'Planifiez Votre Visite d\'Usine',
    ctaText:'Bienvenue à Zhengzhou. Nous fournissons le transport aéroport et l\'interprétation.',
    ctaBtn:'Planifier Votre Visite'
  },
  faq: {
    title:'FAQ | YUDA HUALONG',
    desc:'Questions fréquentes sur YUDA HUALONG centrales à béton, expédition, installation.',
    h1:'Foire Aux Questions',
    sub:'Questions fréquentes sur nos centrales à béton et services.',
    qs:[['Quels types de centrales à béton proposez-vous?','Nous proposons des centrales fixes HZS (25-240 m³/h), des centrales mobiles, et des centrales sur remorque.'],
    ['Quelle est votre capacité de production?','De HZS25 (25 m³/h) à HZS240 (240 m³/h) et Double HZS240 (480 m³/h).'],
    ['Livrez-vous à l\'international?','Oui, vers l\'Asie centrale, l\'Afrique, le Moyen-Orient, l\'Amérique du Sud et l\'Europe.'],
    ['Quels sont vos certificats?','CE, ISO 9001, brevets d\'utilité, Alibaba Gold Supplier.'],
    ['Quelle est la durée de livraison?','Généralement 15-30 jours selon le modèle et la quantité.'],
    ['Offrez-vous l\'installation?','Oui, nous fournissons des ingénieurs pour l\'installation et la formation sur site.'],
    ['Quelle est la période de garantie?','12 mois à compter de la mise en service.'],
    ['Puis-je visiter votre usine?','Oui! Bienvenue à Zhengzhou, nous fournissons le transport et l\'hébergement.']]
  },
  navTrans: [['Home','Accueil'],['Products','Produits'],['HZS Series','Série HZS'],['Mobile Plant','Centrale Mobile'],['About','À Propos'],['Global Markets','Marchés Mondiaux'],['Get Quote','Demander un Devis']],
  footerBrand:'Fabricant professionnel de centrales à béton. Direct usine, Zhengzhou, Chine.',
  footerRights:'© 2026 YUDA HUALONG. Tous droits réservés. | Zhengzhou, Henan, Chine',
  footerPairs:[['HZS Plants','Centrales HZS'],['Mobile Concrete Plant','Centrale Mobile'],['Concrete Mixer','Malaxeur à Béton'],['All Products','Tous les Produits'],['Company','Entreprise'],['About YudaHualong','À Propos de YUDA'],['Certifications','Certifications'],['Customer Visits','Visites Clients'],['Support','Support'],['Contact Us','Contact'],['FAQ','FAQ']],
  projH1:'Projets',
  projSub:'Réalisations de YUDA HUALONG dans le monde',
  projTitle:'Projets | YUDA HUALONG - Réalisations'
} : {
  lang:'pt',
  factory: {
    title:'Fábrica | YUDA HUALONG - Base de Fabricação em Zhengzhou',
    desc:'YUDA HUALONG - 40,000 m² de fábrica moderna. Linhas avançadas, controle de qualidade.',
    h1:'Nossa Fábrica',
    sub:'Instalações avançadas de fabricação em Zhengzhou, China.',
    intro:'YUDA HUALONG opera uma instalação moderna de 40.000 metros quadrados.',
    intro2:'Da seleção de matérias-primas à inspeção final, cada etapa segue padrões profissionais.',
    card1:'Base de produção moderna com instalações completas',
    card2:'Engenheiros e técnicos experientes em controle de qualidade',
    card3:'Procedimentos rigorosos de inspeção garantindo produtos confiáveis',
    card4:'Suporte a clientes em todo o mundo',
    section1:'Capacidade de Produção',
    section2:'Vantagens de Fabricação',
    adv1:'Produção Profissional',
    adv1d:'Processos padronizados e operadores qualificados.',
    adv2:'Instalações Completas',
    adv2d:'Oficinas dedicadas em toda a cadeia produtiva.',
    adv3:'Testes Rigorosos',
    adv3d:'Cada máquina passa por testes completos antes da entrega.',
    ctaTitle:'Visite Nossa Fábrica',
    ctaText:'Bem-vindo a Zhengzhou para ver nosso processo de fabricação.',
    ctaBtn:'Agendar Visita'
  },
  certificates: {
    title:'Certificações | YUDA HUALONG - ISO9001 & CE',
    desc:'YUDA HUALONG certificações: CE, ISO 9001, patentes de utilidade, Alibaba Gold Supplier.',
    h1:'Certificações',
    sub:'Qualidade garantida. Certificado internacionalmente.',
    intro:'YUDA HUALONG possui múltiplas certificações internacionais.',
    cert1:'Certificação CE',
    cert1d:'Conformidade com o mercado europeu.',
    cert2:'ISO 9001',
    cert2d:'Sistema de gestão da qualidade certificado.',
    cert3:'Patentes de Utilidade',
    cert3d:'Duas patentes de modelo de utilidade.',
    cert4:'Alibaba Gold Supplier',
    cert4d:'Fornecedor verificado no Alibaba.com.',
    qTitle:'Qualificações da Empresa',
    qIntro:'YUDA HUALONG (Zhengzhou Hualong) capital registrado de 12 milhões RMB.',
    q1:'Capital de 12 milhões RMB (aumento de 8M em 2025).',
    q2:'Fabricante de equipamentos licenciado.',
    q3:'Empresa autorizada para exportação.',
    ctaTitle:'Solicitar Cópias dos Certificados',
    ctaText:'Contate-nos para cópias verificadas.',
    ctaBtn:'Contato'
  },
  visits: {
    title:'Visitas de Clientes | YUDA HUALONG',
    desc:'Clientes do mundo visitam a fábrica YUDA HUALONG para inspeção.',
    h1:'Visitas de Clientes',
    sub:'Clientes internacionais visitam nossa fábrica para inspeção.',
    intro:'YUDA HUALONG recebe clientes do mundo todo.',
    exp1:'Tour pela Fábrica',
    exp1d:'Clientes visitam nossa instalação de 40.000 m².',
    exp2:'Inspeção de Equipamentos',
    exp2d:'Exame da estrutura e desempenho das máquinas.',
    exp3:'Discussão Técnica',
    exp3d:'Nossos engenheiros discutem projetos e soluções.',
    exp4:'Assinatura de Contrato',
    exp4d:'Muitas parcerias são fechadas durante as visitas.',
    global:'Nossos Clientes Globais',
    globalText:'Recebemos clientes de mais de 7 países.',
    gallery:'Galeria de Visitas',
    gallery1:'Tour pela Fábrica',
    gallery1d:'Clientes internacionais visitam nossas instalações.',
    gallery2:'Comunicação Técnica',
    gallery2d:'Discussões profissionais sobre necessidades dos clientes.',
    gallery3:'Reunião de Negócios',
    gallery3d:'Comunicação presencial para cooperação de longo prazo.',
    ctaTitle:'Agende Sua Visita',
    ctaText:'Bem-vindo a Zhengzhou. Fornecemos transporte e interpretação.',
    ctaBtn:'Agendar Visita'
  },
  faq: {
    title:'FAQ | YUDA HUALONG',
    desc:'Perguntas frequentes sobre usinas de concreto YUDA HUALONG.',
    h1:'Perguntas Frequentes',
    sub:'Perguntas comuns sobre nossas usinas e serviços.',
    qs:[['Quais tipos de usinas de concreto vocês oferecem?','Oferecemos usinas fixas HZS (25-240 m³/h), usinas móveis e sobre reboque.'],
    ['Qual é a capacidade de produção?','De HZS25 (25 m³/h) a HZS240 (240 m³/h) e Dupla HZS240 (480 m³/h).'],
    ['Vocês exportam?','Sim, para Ásia Central, África, Oriente Médio, América do Sul e Europa.'],
    ['Quais certificações vocês têm?','CE, ISO 9001, patentes de utilidade, Alibaba Gold Supplier.'],
    ['Qual o prazo de entrega?','Geralmente 15-30 dias conforme modelo e quantidade.'],
    ['Vocês oferecem instalação?','Sim, fornecemos engenheiros para instalação e treinamento.'],
    ['Qual o período de garantia?','12 meses a partir do comissionamento.'],
    ['Posso visitar a fábrica?','Sim! Bem-vindo a Zhengzhou.']]
  },
  navTrans: [['Home','Início'],['Products','Produtos'],['HZS Series','Série HZS'],['Mobile Plant','Usina Móvel'],['About','Sobre Nós'],['Global Markets','Mercados Globais'],['Get Quote','Solicitar Orçamento']],
  footerBrand:'Fabricante profissional de usinas de concreto. Direto da fábrica, Zhengzhou, China.',
  footerRights:'© 2026 YUDA HUALONG. Todos os direitos reservados. | Zhengzhou, Henan, China',
  footerPairs:[['HZS Plants','Usinas HZS'],['Mobile Concrete Plant','Usina Móvel'],['Concrete Mixer','Misturador de Concreto'],['All Products','Todos os Produtos'],['Company','Empresa'],['About YudaHualong','Sobre a YUDA'],['Certifications','Certificações'],['Customer Visits','Visitas de Clientes'],['Support','Suporte'],['Contact Us','Contato'],['FAQ','FAQ']],
  projH1:'Projetos',
  projSub:'Realizações da YUDA HUALONG pelo mundo',
  projTitle:'Projetos | YUDA HUALONG'
};

function escReg(s) { return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }

// === Template reading ===
function readTemplate(file) {
  var p = path.join(BASE, file);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null;
}

// === Apply shared nav/footer to HTML ===
function applyNavFooter(html, rel) {
  // lang
  html = html.replace(/<html lang="en">/, '<html lang="' + CFG.lang + '">');
  html = html.replace(/<html lang="es">/, '<html lang="' + CFG.lang + '">');
  // brand
  html = html.replace('<h1>YUDA HUALONG</h1>', '<h1>YUDA HUALONG</h1>');
  html = html.replace(/<span>Plantas de Hormigón<\/span>/, '<span>' + (LANG==='fr'?'Centrales à Béton':'Usinas de Concreto') + '</span>');
  html = html.replace(/<span>Centrales à Béton<\/span>/, '<span>' + (LANG==='fr'?'Centrales à Béton':'Usinas de Concreto') + '</span>');
  // nav
  CFG.navTrans.forEach(function(p) {
    html = html.replace(new RegExp('>' + escReg(p[0]) + '<', 'g'), '>' + p[1] + '<');
  });
  // lang button
  html = html.replace(/\[🌐\] Español ▼/g, LANG==='fr'?'[🌐] Français ▼':'[🌐] Português ▼');
  html = html.replace(/\[🌐\] English ▼/g, LANG==='fr'?'[🌐] Français ▼':'[🌐] Português ▼');
  // footer
  html = html.replace(/Fabricante profesional de plantas de hormigón\. Directo de fábrica desde Zhengzhou, China\./, CFG.footerBrand);
  html = html.replace(/Fabricant professionnel de centrales à béton\. Direct usine, Zhengzhou, Chine\./, CFG.footerBrand);
  html = html.replace(/Fabricante profissional de usinas de concreto\. Direto da fábrica, Zhengzhou, China\./, CFG.footerBrand);
  // footer pairs
  CFG.footerPairs.forEach(function(p) {
    html = html.replace(new RegExp(escReg(p[0]), 'g'), p[1]);
  });
  // rights
  html = html.replace(/© 2026 YUDA HUALONG\. Todos los derechos reservados\. \| Zhengzhou, Henan, China/, CFG.footerRights);
  // Also replace incomplete rights
  html = html.replace(/© 2026 YUDA HUALONG\. Tous droits réservés\. \| Zhengzhou, Henan, Chine/, CFG.footerRights);
  // YudaHualong
  html = html.replace(/YudaHualong Concrete/g, 'YUDA HUALONG');
  html = html.replace(/YudaHualong/g, 'YUDA HUALONG');
  return html;
}

// === Generate company/factory.html ===
function genFactory() {
  var tpl = path.join(BASE, 'es/company/factory.html');
  if (!fs.existsSync(tpl)) tpl = path.join(BASE, 'company/factory.html');
  var html = readTemplate('es/company/factory.html');
  if (!html) { console.log('  SKIP: factory template not found'); return; }
  
  var d = CFG.factory;
  html = applyNavFooter(html, '../..');
  
  // Replace content
  html = html.replace(/<title>.*?<\/title>/, '<title>' + d.title + '</title>');
  html = html.replace(/content=".*?"/, 'content="' + d.desc + '"');
  html = html.replace(/<h1>.*?<\/h1>/, '<h1>' + d.h1 + '</h1>');
  html = html.replace(/<p>Instalaciones de fabricaci.*?<\/p>/, '<p>' + d.sub + '</p>');
  
  // Intro paragraphs
  html = html.replace(/opera una moderna instalación.*?metros cuadrados/, d.intro);
  html = html.replace(/Desde la selección de materias.*?del producto/, d.intro2);
  
  // Card texts
  html = html.replace(/Base de producción moderna.*?completas/, d.card1);
  html = html.replace(/Ingenieros.*?experiencia/, d.card2);
  html = html.replace(/Procedimientos de inspecci.*?confiables/, d.card3);
  html = html.replace(/Apoyo a clientes.*?confiable/, d.card4);
  
  // Section headings
  html = html.replace(/Capacidad de Producción/, d.section1);
  html = html.replace(/Ventajas de Fabricación/, d.section2);
  html = html.replace(/Producción Profesional/, d.adv1);
  html = html.replace(/Instalaciones Completas/, d.adv2);
  html = html.replace(/Pruebas Rigurosas/, d.adv3);
  
  // CTA
  html = html.replace(/Visite Nuestra Fábrica/, d.ctaTitle);
  html = html.replace(/Bienvenido a visitar/, d.ctaText);
  html = html.replace(/Programar una Visita/, d.ctaBtn);
  
  var outPath = path.join(BASE, LANG, 'company/factory.html');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, 'utf8');
  console.log('  OK: company/factory.html');
}

// === Generate company/certificates.html ===
function genCerts() {
  var html = readTemplate('es/company/certificates.html');
  if (!html) { console.log('  SKIP: certs template'); return; }
  
  var d = CFG.certificates;
  html = applyNavFooter(html, '../..');
  html = html.replace(/<title>.*?<\/title>/, '<title>' + d.title + '</title>');
  
  // Content
  html = html.replace(/<h1>.*?<\/h1>/, '<h1>' + d.h1 + '</h1>');
  html = html.replace(/Calidad garantizada\. Certificado internacionalmente\./, d.sub);
  html = html.replace(/Certificació.*?(?=<\/h2>)/, d.cert1);
  
  var outPath = path.join(BASE, LANG, 'company/certificates.html');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, 'utf8');
  console.log('  OK: company/certificates.html');
}

// === Generate company/customer-visits.html ===
function genVisits() {
  var html = readTemplate('es/company/customer-visits.html');
  if (!html) { console.log('  SKIP: visits template'); return; }
  html = applyNavFooter(html, '../..');
  var outPath = path.join(BASE, LANG, 'company/customer-visits.html');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, 'utf8');
  console.log('  OK: company/customer-visits.html');
}

// === Generate faq.html ===
function genFaq() {
  var html = '<!DOCTYPE html><html lang="' + CFG.lang + '"><head>\n';
  html += '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
  html += '<title>' + CFG.faq.title + '</title>\n';
  html += '<meta name="description" content="' + CFG.faq.desc + '">\n';
  html += '<link rel="icon" type="image/svg+xml" href="../favicon.svg">\n';
  html += '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">\n';
  html += '<link rel="stylesheet" href="../assets/css/style.css">\n';
  html += '<style>.nav-lang{position:relative}.lang-dropdown{display:none;position:absolute;top:100%;right:0;background:white;box-shadow:0 2px 12px rgba(0,0,0,0.15);border-radius:8px;min-width:160px;z-index:1000;padding:8px 0;list-style:none}.lang-dropdown li{padding:0}.lang-dropdown a{display:block;padding:8px 16px;color:var(--text);text-decoration:none;font-size:14px;white-space:nowrap}.lang-dropdown a:hover{background:var(--bg-light)}.nav-lang:hover .lang-dropdown{display:block}</style>\n';
  html += '</head><body>\n';
  
  // Nav - copy from English template
  var navHtml = '<nav class="nav"><div class="nav-inner"><a href="/' + CFG.lang + '/" class="nav-logo"><h1>YUDA HUALONG</h1><span>' + (LANG==='fr'?'Centrales à Béton':'Usinas de Concreto') + '</span></a>\n';
  navHtml += '<ul class="nav-links">\n';
  CFG.navTrans.forEach(function(p) { navHtml += '<li><a href="../">' + p[1] + '</a></li>\n'; });
  navHtml += '<li class="nav-lang"><a href="javascript:void(0)" onclick="toggleLang()">[&#127760;] ' + (LANG==='fr'?'Français':'Português') + ' &#9660;</a>\n';
  navHtml += '<ul class="lang-dropdown">\n';
  navHtml += '<li><a href="/">[EN] English</a></li>\n';
  navHtml += '<li><a href="/ru/">[RU] Русский</a></li>\n';
  navHtml += '<li><a href="/ar/">[AR] العربية</a></li>\n';
  navHtml += '<li><a href="/es/">[ES] Español</a></li>\n';
  navHtml += '<li><a href="/fr/">[FR] Français</a></li>\n';
  navHtml += '<li><a href="/pt/">[PT] Português</a></li>\n';
  navHtml += '</ul></li></ul></div></nav>\n';
  html += navHtml;
  
  html += '<section class="page-header"><div class="container"><h1>' + CFG.faq.h1 + '</h1><p>' + CFG.faq.sub + '</p></div></section>\n';
  html += '<section class="section"><div class="container" style="max-width:860px;margin:0 auto;">\n';
  
  CFG.faq.qs.forEach(function(q, i) {
    html += '<div style="margin-bottom:20px;padding:20px;background:var(--bg-light);border-radius:var(--radius);">\n';
    html += '<h3 style="margin-bottom:8px;">' + (i+1) + '. ' + q[0] + '</h3>\n';
    html += '<p style="color:var(--text-gray);">' + q[1] + '</p>\n';
    html += '</div>\n';
  });
  
  html += '</div></section>\n';
  
  // Footer
  html += '<footer class="footer"><div class="container"><div class="footer-grid">\n';
  html += '<div class="footer-brand"><h3>YUDA HUALONG</h3><p>' + CFG.footerBrand + '</p><p style="margin-top:12px;">Tel: +86 18638788818</p></div>\n';
  html += '<div><h4>' + (LANG==='fr'?'Produits':'Produtos') + '</h4><ul><li><a href="../products/hzs-concrete-batching-plant.html">' + (LANG==='fr'?'Centrales HZS':'Usinas HZS') + '</a></li><li><a href="../products/mobile-concrete-batching-plant.html">' + (LANG==='fr'?'Centrale Mobile':'Usina Móvel') + '</a></li><li><a href="../products/concrete-mixer.html">' + (LANG==='fr'?'Malaxeur à Béton':'Misturador de Concreto') + '</a></li><li><a href="../products/concrete-batching-plant.html">' + (LANG==='fr'?'Tous les Produits':'Todos os Produtos') + '</a></li></ul></div>\n';
  html += '<div><h4>' + (LANG==='fr'?'Entreprise':'Empresa') + '</h4><ul><li><a href="../about.html">' + (LANG==='fr'?'À Propos de YUDA':'Sobre a YUDA') + '</a></li><li><a href="../company/factory.html">' + (LANG==='fr'?'Usine':'Fábrica') + '</a></li><li><a href="../company/certificates.html">' + (LANG==='fr'?'Certifications':'Certificações') + '</a></li><li><a href="../company/customer-visits.html">' + (LANG==='fr'?'Visites Clients':'Visitas de Clientes') + '</a></li><li><a href="../countries/">' + (LANG==='fr'?'Marchés Mondiaux':'Mercados Globais') + '</a></li></ul></div>\n';
  html += '<div><h4>' + (LANG==='fr'?'Support':'Suporte') + '</h4><ul><li><a href="../contact.html">' + (LANG==='fr'?'Contact':'Contato') + '</a></li><li><a href="../faq.html">FAQ</a></li></ul></div>\n';
  html += '</div><div class="footer-bottom">' + CFG.footerRights + '</div></div></footer>\n';
  html += '<script>function toggleLang(){document.querySelector(\'.lang-dropdown\').classList.toggle(\'show\');}document.addEventListener(\'click\',function(e){if(!e.target.closest(\'.nav-lang\'))document.querySelector(\'.lang-dropdown\')?.classList.remove(\'show\');});</script>\n';
  html += '</body></html>';
  
  var outPath = path.join(BASE, LANG, 'faq.html');
  fs.writeFileSync(outPath, html, 'utf8');
  console.log('  OK: faq.html');
}

// === Generate projects/index.html ===
function genProjects() {
  var html = '<!DOCTYPE html><html lang="' + CFG.lang + '"><head>\n';
  html += '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
  html += '<title>' + CFG.projTitle + '</title>\n';
  html += '<link rel="icon" type="image/svg+xml" href="../favicon.svg">\n';
  html += '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">\n';
  html += '<link rel="stylesheet" href="../assets/css/style.css">\n';
  html += '<style>.nav-lang{position:relative}.lang-dropdown{display:none;position:absolute;top:100%;right:0;background:white;box-shadow:0 2px 12px rgba(0,0,0,0.15);border-radius:8px;min-width:160px;z-index:1000;padding:8px 0;list-style:none}.lang-dropdown li{padding:0}.lang-dropdown a{display:block;padding:8px 16px;color:var(--text);text-decoration:none;font-size:14px;white-space:nowrap}.lang-dropdown a:hover{background:var(--bg-light)}.nav-lang:hover .lang-dropdown{display:block}</style>\n';
  html += '</head><body>\n';
  
  html += '<nav class="nav"><div class="nav-inner"><a href="/' + CFG.lang + '/" class="nav-logo"><h1>YUDA HUALONG</h1><span>' + (LANG==='fr'?'Centrales à Béton':'Usinas de Concreto') + '</span></a>\n';
  html += '<ul class="nav-links">\n';
  CFG.navTrans.forEach(function(p) { html += '<li><a href="../">' + p[1] + '</a></li>\n'; });
  html += '<li class="nav-lang"><a href="javascript:void(0)" onclick="toggleLang()">[&#127760;] ' + (LANG==='fr'?'Français':'Português') + ' &#9660;</a>\n';
  html += '<ul class="lang-dropdown"><li><a href="/">[EN] English</a></li><li><a href="/ru/">[RU] Русский</a></li><li><a href="/ar/">[AR] العربية</a></li><li><a href="/es/">[ES] Español</a></li><li><a href="/fr/">[FR] Français</a></li><li><a href="/pt/">[PT] Português</a></li></ul></li></ul></div></nav>\n';
  
  html += '<section class="page-header"><div class="container"><h1>' + CFG.projH1 + '</h1><p>' + CFG.projSub + '</p></div></section>\n';
  html += '<section class="section"><div class="container" style="max-width:900px;margin:0 auto;">\n';
  html += '<p style="color:var(--text-gray);margin-bottom:30px;">' + (LANG==='fr'?"YUDA HUALONG a fourni des centrales à béton pour de nombreux projets à travers le monde. Voici quelques-unes de nos réalisations.":"A YUDA HUALONG forneceu usinas de concreto para muitos projetos ao redor do mundo. Aqui estão algumas de nossas realizações.") + '</p>\n';
  
  // 3 project cards
  var projects = LANG==='fr' ? [
    {title:'Projet Russie - Centrale HZS120',desc:'Installation d\'une centrale à béton HZS120 en Russie pour un projet d\'infrastructure majeur.',img:'../../assets/images/project-russia.jpg'},
    {title:'Projet Kazakhstan - Centrale HZS90',desc:'Centrale HZS90 installée au Kazakhstan pour un projet de construction autoroutière.',img:'../../assets/images/project-kazakhstan.jpg'},
    {title:'Projet Afrique - Centrale Mobile',desc:'Centrale à béton mobile fournie pour un projet de construction en Afrique.',img:'../../assets/images/project-africa.jpg'}
  ] : [
    {title:'Projeto Rússia - Usina HZS120',desc:'Instalação de usina HZS120 na Rússia para grande projeto de infraestrutura.',img:'../../assets/images/project-russia.jpg'},
    {title:'Projeto Cazaquistão - Usina HZS90',desc:'Usina HZS90 instalada no Cazaquistão para construção rodoviária.',img:'../../assets/images/project-kazakhstan.jpg'},
    {title:'Projeto África - Usina Móvel',desc:'Usina móvel fornecida para projeto de construção na África.',img:'../../assets/images/project-africa.jpg'}
  ];
  
  projects.forEach(function(p) {
    html += '<div class="why-card" style="margin-bottom:20px;text-align:left;">\n';
    html += '<h3>' + p.title + '</h3>\n';
    html += '<p style="color:var(--text-gray);">' + p.desc + '</p>\n';
    html += '</div>\n';
  });
  
  html += '<div class="cta-section" style="border-radius:var(--radius);padding:40px;margin-top:30px;">\n';
  html += '<h3 style="color:white;margin-bottom:12px;">' + (LANG==='fr'?'Vous avez un projet?':'Tem um projeto?') + '</h3>\n';
  html += '<p style="color:rgba(255,255,255,0.7);margin-bottom:24px;">' + (LANG==='fr'?'Contactez-nous pour discuter de vos besoins en centrale à béton.':'Fale conosco para discutir suas necessidades de usina de concreto.') + '</p>\n';
  html += '<a href="../contact.html" class="btn btn-primary">' + (LANG==='fr'?'Contactez-Nous':'Fale Conosco') + '</a>\n';
  html += '</div>\n';
  html += '</div></section>\n';
  
  html += '<footer class="footer"><div class="container"><div class="footer-grid">\n';
  html += '<div class="footer-brand"><h3>YUDA HUALONG</h3><p>' + CFG.footerBrand + '</p><p style="margin-top:12px;">Tel: +86 18638788818</p></div>\n';
  html += '<div><h4>' + (LANG==='fr'?'Produits':'Produtos') + '</h4><ul><li><a href="../products/hzs-concrete-batching-plant.html">' + (LANG==='fr'?'Centrales HZS':'Usinas HZS') + '</a></li><li><a href="../products/mobile-concrete-batching-plant.html">' + (LANG==='fr'?'Centrale Mobile':'Usina Móvel') + '</a></li><li><a href="../products/concrete-mixer.html">' + (LANG==='fr'?'Malaxeur à Béton':'Misturador de Concreto') + '</a></li><li><a href="../products/concrete-batching-plant.html">' + (LANG==='fr'?'Tous les Produits':'Todos os Produtos') + '</a></li></ul></div>\n';
  html += '<div><h4>' + (LANG==='fr'?'Entreprise':'Empresa') + '</h4><ul><li><a href="../about.html">' + (LANG==='fr'?'À Propos de YUDA':'Sobre a YUDA') + '</a></li><li><a href="../company/factory.html">' + (LANG==='fr'?'Usine':'Fábrica') + '</a></li><li><a href="../company/certificates.html">' + (LANG==='fr'?'Certifications':'Certificações') + '</a></li><li><a href="../company/customer-visits.html">' + (LANG==='fr'?'Visites Clients':'Visitas de Clientes') + '</a></li><li><a href="../countries/">' + (LANG==='fr'?'Marchés Mondiaux':'Mercados Globais') + '</a></li></ul></div>\n';
  html += '<div><h4>' + (LANG==='fr'?'Support':'Suporte') + '</h4><ul><li><a href="../contact.html">' + (LANG==='fr'?'Contact':'Contato') + '</a></li><li><a href="../faq.html">FAQ</a></li></ul></div>\n';
  html += '</div><div class="footer-bottom">' + CFG.footerRights + '</div></div></footer>\n';
  html += '<script>function toggleLang(){document.querySelector(\'.lang-dropdown\').classList.toggle(\'show\');}document.addEventListener(\'click\',function(e){if(!e.target.closest(\'.nav-lang\'))document.querySelector(\'.lang-dropdown\')?.classList.remove(\'show\');});</script>\n';
  html += '</body></html>';
  
  var outDir = path.join(BASE, LANG, 'projects');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
  console.log('  OK: projects/index.html');
}

// === RUN ===
console.log('Generating missing pages for ' + LANG);
genFactory();
genCerts();
genVisits();
genFaq();
genProjects();
console.log('Done!');
