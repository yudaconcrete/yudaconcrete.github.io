const fs = require('fs');
const BASE = 'G:\\yudaconcrete-preview';
const L = 'ar';

// 阿拉伯语国家页翻译
var CT = {
  // 国家名称
  'Russia': 'روسيا',
  'Kazakhstan': 'كازاخستان', 
  'Uzbekistan': 'أوزبكستان',
  'Nigeria': 'نيجيريا',
  'Kenya': 'كينيا',
  'Pakistan': 'باكستان',
  'Saudi Arabia': 'المملكة العربية السعودية',
  'UAE': 'الإمارات العربية المتحدة',
  'India': 'الهند',
  'Egypt': 'مصر',
  'Qatar': 'قطر',
  'Indonesia': 'إندونيسيا',
  'Malaysia': 'ماليزيا',
  'Vietnam': 'فيتنام',
  'Bangladesh': 'بنغلاديش',
  'South Africa': 'جنوب أفريقيا',
  'Azerbaijan': 'أذربيجان',
  'Turkey': 'تركيا',
  'Mexico': 'المكسيك',
  'Brazil': 'البرازيل',
  'Philippines': 'الفلبين',
  'Thailand': 'تايلاند',
  'Kuwait': 'الكويت',
  
  // 通用标签
  'Market Overview': 'نظرة عامة على السوق',
  'Recommended Models': 'النماذج الموصى بها',
  'Application Scenarios': 'سيناريوهات التطبيق',
  'Why Choose YUDA': 'لماذا تختار YUDA',
  'Export & Logistics Support': 'دعم التصدير والخدمات اللوجستية',
  'Frequently Asked Questions': 'الأسئلة الشائعة',
  'Ready to Start Your Project': 'مستعد لبدء مشروعك',
  
  // 页面标题
  'YUDA HUALONG Concrete': 'YUDA HUALONG للخرسانة',
  'YUDA HUALONG concrete batching plant': 'محطة خلط الخرسانة YUDA HUALONG',
  'YUDA HUALONG concrete plants': 'محطات الخرسانة YUDA HUALONG',
  
  // 市场描述关键词
  'Cold climate': 'مناخ بارد',
  'cold climate': 'مناخ بارد',
  'cold-weather': 'طقس بارد',
  'hot climate': 'مناخ حار',
  'desert climate': 'مناخ صحراوي',
  'tropical climate': 'مناخ استوائي',
  'Construction market': 'سوق البناء',
  'Infrastructure development': 'تطوير البنية التحتية',
  'infrastructure projects': 'مشاريع البنية التحتية',
  'construction sector': 'قطاع البناء',
  'commercial concrete': 'الخرسانة التجارية',
  'road construction': 'بناء الطرق',
  'rail delivery': 'التسليم بالسكك الحديدية',
  'sea freight': 'الشحن البحري',
  'factory direct': 'مباشرة من المصنع',
  
  // 物流
  'Rail delivery via Alashankou': 'التسليم عبر السكك الحديدية عبر ألاشانكو',
  'Sea freight': 'الشحن البحري',
  'shipping time': 'وقت الشحن',
  'Delivery time': 'وقت التسليم',
  'Logistics': 'الخدمات اللوجستية',
  
  // 型号
  'Stationary Plant': 'محطة ثابتة',
  'Mobile Plant': 'محطة متنقلة',
  'HZS': 'HZS',
  'm³/h': 'م³/ساعة',
  
  // CTA
  'Contact Us': 'اتصل بنا',
  'Get Quote': 'طلب عرض سعر',
  'Inquire Now': 'استفسر الآن',
  'Learn More': 'اعرف المزيد',
  'View Details': 'عرض التفاصيل',
  'Download Brochure': 'تنزيل الكتيب',
  
  // 国家特有描述 - 这些需要逐页替换
  
  // Russia
  'One of the world\'s largest construction markets': 'واحدة من أكبر أسواق البناء في العالم',
  'Full cold-climate configuration': 'تكوين كامل للطقس البارد',
  
  // 能源  
  'Power': 'الطاقة',
  'Weight': 'الوزن',
  'Dimension': 'الأبعاد',
  
  // FAQ
  'What is the delivery time': 'ما هو وقت التسليم',
  'What is the price': 'ما هو السعر',
  'Do you provide installation': 'هل توفرون التركيب',
  'What payment terms': 'ما هي شروط الدفع',
  'What warranty': 'ما هو الضمان',
  
  // 公司相关
  'YUDA': 'YUDA',
  'YUDA HUALONG': 'YUDA HUALONG',
  'manufacturer': 'الشركة المصنعة',
  'Factory': 'المصنع',
  'factory': 'المصنع',
  'Zhengzhou': 'تشنغتشو',
  'China': 'الصين',
  'Chinese': 'صيني',
};

// 翻译函数
function trans(text) {
  if (CT[text] !== undefined) return CT[text];
  return text;
}

// 处理文件
var count = 0;
var dir = BASE + '\\' + L + '\\countries';
fs.readdirSync(dir).forEach(function(f) {
  if (!f.endsWith('.html')) return;
  var fp = dir + '\\' + f;
  var html = fs.readFileSync(fp, 'utf8');
  var fixed = html;
  
  // 按长度排序，优先替换长字符串
  var keys = Object.keys(CT).sort(function(a, b) { return b.length - a.length; });
  keys.forEach(function(k) {
    if (fixed.indexOf(k) > -1) {
      fixed = fixed.split(k).join(CT[k]);
    }
  });
  
  if (fixed !== html) {
    fs.writeFileSync(fp, fixed, 'utf8');
    count++;
  }
});

console.log(count + ' files translated for ' + L);
