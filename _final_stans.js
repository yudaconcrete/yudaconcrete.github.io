const f=require('fs');
const r='G:/yudaconcrete-preview';

const t={
  uz:{s:'Beton zavodi ishlab chiqaruvchisi',c:'Barcha huquqlar himoyalangan.',f:'Beton zavodlari ishlab chiqaruvchisi. Zhengzhou, Xitoydan togri togri yetkazib berish.',l:'uz',h:'uz'},
  kg:{s:'Beton zavodu ondurususu',c:'Bardyk ukuctar korgolgon.',f:'Beton zavoddorun ondurusu. Chzhenchzhou, Kytajdan tyz zhetkiruu.',l:'ky',h:'ky'},
  tj:{s:'Betonoi istemolikunanda',c:'Hamai huquqho hifz karda sudaast.',f:'Istehsoli betonoi istemolikunanda. Zhengzhou, Chin.',l:'tg',h:'tg'},
  tm:{s:'Beton zawody ondurijisi',c:'Ahli hukuklar goragly.',f:'Beton zawodlary ondurijisi. Zhengzhou, Hytaýdan göni ünsi.',l:'tk',h:'tk'},
};

for(const code of Object.keys(t)){
  const d=t[code];
  const dir=r+'/'+code;
  
  const files=[];
  function walk(p){
    const items=f.readdirSync(p,{withFileTypes:true});
    for(const e of items){
      const fp=p+'/'+e.name;
      if(e.isDirectory()&&e.name!=='countries')walk(fp);
      else if(e.name.endsWith('.html'))files.push(fp);
    }
  }
  walk(dir);
  
  for(const fp of files){
    let h=f.readFileSync(fp,'utf8');
    let o=h;
    
    h=h.replace(/href="\/kz\//g,'href="/'+code+'/');
    h=h.replace(/lang="kk"/g,'lang="'+d.l+'"');
    h=h.replace(/hreflang="kk"/g,'hreflang="'+d.h+'"');
    
    if(h!==o)f.writeFileSync(fp,h,'utf8');
  }
  
  // Fix index.html SEO
  const ip=r+'/'+code+'/index.html';
  if(f.existsSync(ip)){
    let h=f.readFileSync(ip,'utf8');
    h=h.replace(/<title>[^<]*<\/title>/,'<title>YudaHualong | '+d.s+'</title>');
    f.writeFileSync(ip,h,'utf8');
  }
}

const log='ALL_STANS_FINISHED: '+Object.keys(t).join(',');
f.writeFileSync(r+'/_done.txt',log,'utf8');
