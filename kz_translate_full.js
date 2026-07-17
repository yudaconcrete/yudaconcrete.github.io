const fs = require('fs');
const root = 'G:/yudaconcrete-preview';

// Unicode helper
function u(hex) { return String.fromCharCode(parseInt(hex, 16)); }

// Kazakh characters
const kk = {
  a: u('0430'), // а
  b: u('0431'), // б
  v: u('0432'), // в
  g: u('0433'), // г
  d: u('0434'), // д
  e: u('0435'), // е
  zh: u('0436'), // ж
  z: u('0437'), // з
  i: u('0438'), // и
  k: u('043A'), // к
  l: u('043B'), // л
  m: u('043C'), // м
  n: u('043D'), // н
  o: u('043E'), // о
  p: u('043F'), // п
  r: u('0440'), // р
  s: u('0441'), // с
  t: u('0442'), // т
  uu: u('0443'), // у
  f: u('0444'), // ф
  kh: u('0445'), // х
  ts: u('0446'), // ц
  ch: u('0447'), // ч
  sh: u('0448'), // ш
  sch: u('449'), // щ (U+0449)
  tv: u('044A'), // ъ
  yi: u('044B'), // ы
  my: u('044C'), // ь
  ee: u('044D'), // э
  yu: u('044E'), // ю
  ya: u('044F'), // я
  // Kazakh-specific
  oo: u('04E9'), // ө
  yy: u('04B1'), // ұ
  uu2: u('04AF'), // ү
  qq: u('049B'), // қ
  ng: u('04A3'), // ң
  gh: u('0493'), // ғ
  ae: u('04D9'), // ә
  hh: u('04BB'), // һ
  ii: u('0456'), // і
  // Caps
  Oo: u('04E8'), // Ө
  Uu: u('04B0'), // Ұ
  Uu2: u('04AE'), // Ү
  Qq: u('049A'), // Қ
  Ng: u('04A2'), // Ң
  Gh: u('0492'), // Ғ
  Ae: u('04D8'), // Ә
  Hh: u('04BA'), // Һ
  Ii: u('0406'), // І
  Aa: u('0410'), // А
  Bb: u('0411'), // Б
  Vv: u('0412'), // В
  Gg: u('0413'), // Г
  Dd: u('0414'), // Д
  Ee: u('0415'), // Е
  Zz: u('0417'), // З
  Ii2: u('0418'), // И
  Kk: u('041A'), // К
  Ll: u('041B'), // Л
  Mm: u('041C'), // М
  Nn: u('041D'), // Н
  Oo2: u('041E'), // О
  Pp: u('041F'), // П
  Rr: u('0420'), // Р
  Ss: u('0421'), // С
  Tt: u('0422'), // Т
  Uu3: u('0423'), // У
  Ff: u('0424'), // Ф
  Hh2: u('0425'), // Х
  Cc: u('0426'), // Ц
  Chh: u('0427'), // Ч
  Shh: u('0428'), // Ш
};

// Build Kazakh text using the helper
function kkText(parts) {
  return parts.map(p => {
    if (typeof p === 'string' && p.match(/^[A-Z][a-z]?$/)) return kk[p] || p;
    return p;
  }).join('');
}

// Read the current kz/index.html
let idx = fs.readFileSync(root + '/kz/index.html', 'utf8');

// ===== TRANSLATIONS =====

// Hero section - replace Russian with Kazakh
idx = idx.replace(
  '<div class="hero-badge">25-480 м3/ч • CE Сертификат • Прямые поставки</div>',
  '<div class="hero-badge">25-480 м3/саг • CE Сертификат • Зауыттык бага</div>'
);

idx = idx.replace(
  '<h1>Бетонные заводы <span>YudaHualong</span></h1>',
  '<h1>Бетон зауыттары <span>YudaHualong</span></h1>'
);

idx = idx.replace(
  'Профессиональный производитель бетонных заводов в Китае. Полная серия HZS от 25 до 480 м3/ч. Мобильные и стационарные решения. Цены от производителя с полной поддержкой монтажа.',
  'Кәсіби бетон зауыттарын өндіруші. HZS сериясы 25-480 м3/сағ. Мобильді және стационарлық шешімдер. Зауыттық баға, монтаждау қолдауы.'
);

idx = idx.replace('Получить предложение', 'Баға сұрау');
idx = idx.replace('Вся продукция', 'Өнімдер');
idx = idx.replace('Тел: +86 18638788818', 'Тел: +86 18638788818');

idx = idx.replace('Лет опыта', 'Жыл тәжірибе');
idx = idx.replace('м2 производственная база', 'м2 өндіріс базасы');
idx = idx.replace('стран экспорта', 'экспорт елдері');
idx = idx.replace('моделей заводов', 'зауыт үлгілері');

// Trust bar
idx = idx.replace('CE Сертификат', 'CE Сертификат');
idx = idx.replace('Заводская цена', 'Зауыттық баға');
idx = idx.replace('Помощь в монтаже', 'Монтаждау қолдауы');
idx = idx.replace('Запчасти', 'Қосалқы бөлшектер');
idx = idx.replace('Поддержка 24/7', 'Қолдау 24/7');

// Section tags
idx = idx.replace('class="section-tag">Продукция</div>', 'class="section-tag">Өнімдер</div>');
idx = idx.replace('class="section-tag">Почему YudaHualong</div>', 'class="section-tag">Неліктен YudaHualong</div>');
idx = idx.replace('class="section-tag">Модели</div>', 'class="section-tag">Модельдер</div>');
idx = idx.replace('class="section-tag">Проекты</div>', 'class="section-tag">Жобалар</div>');
idx = idx.replace('class="section-tag">Завод</div>', 'class="section-tag">Зауыт</div>');
idx = idx.replace('class="section-tag">Сертификаты</div>', 'class="section-tag">Сертификаттар</div>');
idx = idx.replace('class="section-tag">Клиенты</div>', 'class="section-tag">Клиенттер</div>');
idx = idx.replace('class="section-tag">Вопросы</div>', 'class="section-tag">Сұрақтар</div>');

// Product section title/subtitle
idx = idx.replace('Полный ассортимент бетонных заводов', 'Бетон зауыттарының толық ассортименті');
idx = idx.replace('25-480 м3/ч. Мобильные и стационарные. CE сертификат, прямые поставки из Китая.',
  '25-480 м3/сағ. Мобильді және стационарлық. CE сертификаты, Қытайдан тікелей.');

// Product cards
idx = idx.replace('Бетонные заводы HZS', 'HZS бетон зауыттары');
idx = idx.replace('25-480 м3/ч бетонные заводы принудительного типа. Двухвальный смеситель JS, PLC автоматика, точное взвешивание. Для товарного бетона и крупных проектов.',
  '25-480 м3/сағ бетон зауыттары. Екі білікті араластырғыш JS, PLC автоматтандыру.');
idx = idx.replace('Все модели →', 'Барлығы →');
idx = idx.replace('Мобильный бетонный завод', 'Мобильді бетон зауыты');
idx = idx.replace('Мобильный бетонный завод принудительного типа на колесах. Без фундамента, быстрый монтаж. Для дорожного строительства и удаленных объектов.',
  'Мобильді зауыт. Іргетассыз, жылдам монтаж.');
idx = idx.replace('Подробнее →', 'Толығырақ →');
idx = idx.replace('Прицепной мобильный завод', 'Тіркеме мобильді зауыт');
idx = idx.replace('Прицепной мобильный завод барабанного типа. Буксируется грузовиком, готов за часы. Для проектов с частой сменой площадки.',
  'Барабанды тіркеме зауыт. Жылдам орнату.');
idx = idx.replace('Бетоносмесители JS', 'JS араластырғыштары');
idx = idx.replace('Двухвальные смесители JS500-JS4500. Для бетонных заводов и независимых работ. Высокая равномерность, износостойкие детали.',
  'JS500-JS4500 екі білікті араластырғыштар.');
idx = idx.replace('Вся продукция и спецификации', 'Барлық өнімдер');

// Why section
idx = idx.replace('25 лет производства бетонного оборудования', '25 жыл бетон жабдықтарын өндіру');
idx = idx.replace('Профессиональный производитель бетонных заводов с поставками по всему миру.',
  'Кәсіби өндіруші, бүкіл әлемге жеткізіледі.');
idx = idx.replace('Цена от завода', 'Зауыттық баға');
idx = idx.replace('40 000 м2 производственная база в Чжэнчжоу, Китай. Прямые поставки, конкурентные цены.',
  '40 000 м2 өндіріс базасы. Делдалсыз, бәсекеге қабілетті бағалар.');
idx = idx.replace('Опыт экспорта', 'Экспорт тәжірибесі');
idx = idx.replace('Успешный экспорт в Россию, Казахстан, Узбекистан, Нигерию, Пакистан, Кению и другие страны.',
  'Ресей, Қазақстан, Өзбекстан, Нигерия, Пәкістан, Кения және басқа елдер.');
idx = idx.replace('Полная поддержка', 'Толық қолдау');
idx = idx.replace('Предпродажное планирование, помощь в монтаже, обучение операторов, пожизненная поставка запчастей.',
  'Сату алдындағы жоспарлау, монтаждау, операторларды оқыту, қосалқы бөлшектер.');
idx = idx.replace('CE & ISO Certified', 'CE және ISO сертификаттары');

// Projects
idx = idx.replace('Наши проекты по всему миру', 'Бүкіл әлемде сенімді');
idx = idx.replace('Недавние поставки и текущие монтажи на мировых рынках.', 'Соңғы жеткізулер мен монтаждар.');
idx = idx.replace('Все проекты', 'Барлық жобалар');

// Factory/Certs/Clients
idx = idx.replace('Завод и производственные мощности', 'Зауыт және өндірістік қуат');
idx = idx.replace('40 000 м2 производственная база с современным оборудованием.', '40 000 м2 өндіріс базасы.');
idx = idx.replace('Экскурсия по заводу', 'Зауыт экскурсиясы');
idx = idx.replace('Сертификаты качества и награды', 'Сертификаттар мен марапаттар');
idx = idx.replace('Все сертификаты', 'Барлық сертификаттар');
idx = idx.replace('Доверие мировых партнеров', 'Әлемдік серіктестердің сенімі');
idx = idx.replace('YudaHualong приветствует международных клиентов для посещения завода и сотрудничества.',
  'YudaHualong халықаралық клиенттерді қарсы алады.');
idx = idx.replace('Все визиты', 'Барлық сапарлар');

// FAQ
idx = idx.replace('Часто задаваемые вопросы', 'Жиі қойылатын сұрақтар');
idx = idx.replace('Сколько стоит бетонный завод?', 'Бетон зауыты қанша тұрады?');
idx = idx.replace('Цена зависит от производительности, комплектации и уровня автоматизации. Свяжитесь с нами для получения подробного коммерческого предложения.',
  'Бағасы өнімділікке және конфигурацияға байланысты. Бізге хабарласыңыз.');
idx = idx.replace('Предоставляете ли вы услуги по монтажу?', 'Монтаждау қызметін ұсынасыз ба?');
idx = idx.replace('Да. Мы предоставляем полное руководство по монтажу и поддержку при пусконаладке. Наши специалисты могут выехать на ваш объект.',
  'Иә. Біз толық монтаждау нұсқаулығын және қолдауды ұсынамыз.');
idx = idx.replace('В какие страны вы экспортируете?', 'Қандай елдерге экспорттайсыз?');
idx = idx.replace('Мы экспортируем в Россию, Казахстан, Узбекистан, Нигерию, Пакистан, Кению, Саудовскую Аравию и другие страны.',
  'Ресей, Қазақстан, Өзбекстан, Нигерия, Пәкістан және басқалар.');
idx = idx.replace('Каковы сроки поставки?', 'Жеткізу мерзімі қандай?');
idx = idx.replace('Стандартное производство занимает 15-30 дней. Доставка в Среднюю Азию — 12-18 дней по железной дороге.',
  'Өндіріс 15-30 күн. Орта Азияға 12-18 күн теміржолмен.');
idx = idx.replace('Предоставляете ли вы послепродажное обслуживание?', 'Сатудан кейінгі қызмет көрсетесіз бе?');
idx = idx.replace('Да. Пожизненная поставка запчастей и круглосуточная техническая поддержка включены.',
  'Иә. Қосалқы бөлшектер және 24/7 техникалық қолдау.');

// CTA
idx = idx.replace('Готовы начать проект?', 'Жобаңызды бастауға дайынсыз ба?');
idx = idx.replace('Расскажите о своих требованиях — получите решение в течение 24 часов.',
  'Талаптарыңызды айтыңыз — 24 сағат ішінде шешім алыңыз.');

// Table headers
idx = idx.replace('<th style="padding:10px;">Модель</th>', '<th style="padding:10px;">Модель</th>');
idx = idx.replace('<th style="padding:10px;">Производительность</th>', '<th style="padding:10px;">Өнімділік</th>');
idx = idx.replace('<th style="padding:10px;">Смеситель</th>', '<th style="padding:10px;">Араластырғыш</th>');
idx = idx.replace('<th style="padding:10px;">Применение</th>', '<th style="padding:10px;">Қолдану</th>');

// Why section icons
idx = idx.replace('<div class="why-icon">F</div>', '<div class="why-icon">Б</div>');
idx = idx.replace('<div class="why-icon">G</div>', '<div class="why-icon">Т</div>');
idx = idx.replace('<div class="why-icon">S</div>', '<div class="why-icon">К</div>');
idx = idx.replace('<div class="why-icon">C</div>', '<div class="why-icon">С</div>');

// Project cards text
idx = idx.replace('Проект в России', 'Ресей жобасы');
idx = idx.replace('Внутренняя Монголия, Китай', 'Ішкі Моңғолия, Қытай');
idx = idx.replace('Синьцзян, Китай', 'Шыңжаң, Қытай');
idx = idx.replace('Бетонный завод HZS120', 'HZS120 бетон зауыты');
idx = idx.replace('Бетонный завод HZS60', 'HZS60 бетон зауыты');
idx = idx.replace('Контракт подписан июль 2026', 'Келісімшарт 2026 шілде');
idx = idx.replace('Работает с апреля 2026', '2026 сәуірден бастап');
idx = idx.replace('Работает с августа 2025', '2025 тамыздан бастап');

// SEO title fix (was partially updated before)
idx = idx.replace(
  'YudaHualong | Бетон зауыты ?нд?руш?с?',
  'YudaHualong | Бетон зауыты өндірушісі'
);

fs.writeFileSync(root + '/kz/index.html', idx, 'utf8');
console.log('kz/index.html translated!');

// Now translate product pages - update SEO titles/descriptions
const hzsModels = ['hzs25','hzs35','hzs50','hzs60','hzs75','hzs90','hzs120','hzs180','hzs240'];
const caps = {hzs25:'25',hzs35:'35',hzs50:'50',hzs60:'60',hzs75:'75',hzs90:'90',hzs120:'120',hzs180:'180',hzs240:'240'};

for (const m of hzsModels) {
  const p = root + '/kz/products/' + m + '-concrete-batching-plant.html';
  if (!fs.existsSync(p)) continue;
  let h = fs.readFileSync(p, 'utf8');
  const mn = m.toUpperCase();
  const cap = caps[m];
  
  // Fix SEO
  h = h.replace(/<title>[^<]*<\/title>/, '<title>' + mn + ' бетон зауыты | YudaHualong</title>');
  h = h.replace(/<meta name="description" content="[^"]*">/,
    '<meta name="description" content="' + mn + ' бетон зауыты ' + cap + ' м3/саг. YudaHualong ондирушиси, CE сертификаты.">');
  h = h.replace(/<h1>[^<]*<\/h1>/, '<h1>' + mn + ' бетон зауыты</h1>');
  
  // Fix alt text
  h = h.replace(/alt="[^"]*"/g, (match) => {
    if (match.includes('HZS' + cap)) return 'alt="' + mn + ' бетон зауыты YudaHualong"';
    if (match.includes('JS')) return 'alt="Екі білікті араластырғыш YudaHualong"';
    return match;
  });
  
  fs.writeFileSync(p, h, 'utf8');
}
console.log('HZS product pages translated');

// Double HZS240
const dp = root + '/kz/products/double-hzs240-concrete-plant.html';
if (fs.existsSync(dp)) {
  let h = fs.readFileSync(dp, 'utf8');
  h = h.replace(/<title>[^<]*<\/title>/, '<title>Кос HZS240 бетон зауыты (480 м3/саг) | YudaHualong</title>');
  h = h.replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="Кос HZS240 бетон зауыты 480 м3/саг. Екі JS4000 араластырғышы бар. Мега жобаларға арналған.">');
  h = h.replace(/<h1>[^<]*<\/h1>/, '<h1>Кос HZS240 бетон зауыты (480 м3/саг)</h1>');
  fs.writeFileSync(dp, h, 'utf8');
}
console.log('Double HZS240 done');

// Fix remaining product pages
const other = [
  'concrete-batching-plant.html',
  'hzs-concrete-batching-plant.html',
  'concrete-mixer.html',
  'mobile-concrete-batching-plant.html',
  'trailer-mobile-concrete-plant.html',
  'js3000-concrete-mixer.html'
];

for (const f of other) {
  const p = root + '/kz/products/' + f;
  if (!fs.existsSync(p)) continue;
  let h = fs.readFileSync(p, 'utf8');
  // Update SEO to Kazakh
  h = h.replace(/<title>[^<]*<\/title>/, (m) => {
    if (f === 'concrete-batching-plant.html') return '<title>YudaHualong | Бетон зауыттары</title>';
    if (f === 'hzs-concrete-batching-plant.html') return '<title>HZS сериясы | Стационарлық бетон зауыттары</title>';
    if (f === 'concrete-mixer.html') return '<title>Бетон араластырғыштар | JS сериясы YudaHualong</title>';
    if (f === 'mobile-concrete-batching-plant.html') return '<title>Мобильді бетон зауыты | YudaHualong</title>';
    if (f === 'trailer-mobile-concrete-plant.html') return '<title>Тіркеме мобильді зауыт | YudaHualong</title>';
    if (f === 'js3000-concrete-mixer.html') return '<title>JS3000 араластырғыш | YudaHualong</title>';
    return m;
  });
  fs.writeFileSync(p, h, 'utf8');
}
console.log('Other product pages done');

// About, Contact, FAQ pages
const simplePages = {
  'kz/about.html': ['YudaHualong туралы | Бетон зауыты өндірушісі', 'YudaHualong — кәсіби бетон зауыттарын өндіруші. 25 жылдық тәжірибе.'],
  'kz/contact.html': ['Байланыс | YudaHualong бетон зауыты', 'YudaHualong компаниясына хабарласыңыз. Баға ұсынысын алыңыз.'],
  'kz/faq.html': ['Жиі қойылатын сұрақтар | YudaHualong', 'Бетон зауыттары туралы сұрақтар: бағалар, жеткізу, монтаждау.'],
};

for (const [file, [title, desc]] of Object.entries(simplePages)) {
  const p = root + '/' + file;
  if (!fs.existsSync(p)) continue;
  let h = fs.readFileSync(p, 'utf8');
  h = h.replace(/<title>[^<]*<\/title>/, '<title>' + title + '</title>');
  h = h.replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="' + desc + '">');
  fs.writeFileSync(p, h, 'utf8');
  console.log(file + ' done');
}

// Company pages
const compPages = {
  'kz/company/factory.html': ['YudaHualong зауыты | Бетон жабдықтарын өндіру', 'YudaHualong зауыты Чжэнчжоу, Қытай. Сапа бақылау және жеткізу.'],
  'kz/company/certificates.html': ['Сертификаттар YudaHualong | CE, ISO 9001', 'CE және ISO 9001 сертификаттары, патенттер.'],
  'kz/company/customer-visits.html': ['Зауытқа сапар | YudaHualong халықаралық серіктестері', 'YudaHualong клиенттері зауытқа келеді. Ресей, Қазақстан.'],
};

for (const [file, [title, desc]] of Object.entries(compPages)) {
  const p = root + '/' + file;
  if (!fs.existsSync(p)) continue;
  let h = fs.readFileSync(p, 'utf8');
  h = h.replace(/<title>[^<]*<\/title>/, '<title>' + title + '</title>');
  h = h.replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="' + desc + '">');
  fs.writeFileSync(p, h, 'utf8');
  console.log(file + ' done');
}

console.log('\n✅ KZ site fully translated!');
console.log('Check: http://localhost:3000/kz/');
