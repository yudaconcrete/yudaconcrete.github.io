const fs=require('fs'),path=require('path'),B='D:\\.openclaw\\workspace\\搅拌站出口项目\\yudaconcrete-site';
function e(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
function conv(f){
  var h=fs.readFileSync(path.join(B,'es/company',f+'.html'),'utf8');
  h=h.replace('<html lang="en">','<html lang="es">');
  h=h.replace(/<span>Concrete Batching Plant Solutions<\/span>/,'<span>Plantas de Hormigón</span>');
  h=h.replace(/href="(\.\.\/)(?!\/)/g,'href="../../');
  h=h.replace(/src="\.\.\//g,'src="../../');
  h=h.replace(/>Home</g,'>Inicio<');
  h=h.replace(/>Products</g,'>Productos<');
  h=h.replace(/>HZS Series</g,'>Serie HZS<');
  h=h.replace(/>Mobile Plant</g,'>Plantas Móviles<');
  h=h.replace(/>About</g,'>Sobre Nosotros<');
  h=h.replace(/>Global Markets</g,'>Mercados Globales<');
  h=h.replace(/>Get Quote</g,'>Solicitar Presupuesto<');
  h=h.replace(/\[🌐\] English ▼/,'[🌐] Español ▼');
  h=h.replace(/Professional concrete batching plant manufacturer\. Factory direct from Zhengzhou, China\./,'Fabricante profesional de plantas de hormigón. Directo de fábrica desde Zhengzhou, China.');
  h=h.replace(/© 2026 YudaHualong Concrete\. All rights reserved\. \| Zhengzhou, Henan, China/,'© 2026 YUDA HUALONG. Todos los derechos reservados. | Zhengzhou, Henan, China');
  h=h.replace(/YudaHualong Concrete/g,'YUDA HUALONG');
  h=h.replace(/YudaHualong/g,'YUDA HUALONG');
  fs.writeFileSync(path.join(B,'es/company',f+'.html'),h,'utf8');
  console.log('  OK: es/company/'+f+'.html');
}
['certificates','customer-visits'].forEach(conv);
console.log('Spanish company pages done!');
