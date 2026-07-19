const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const preDir = 'G:/yudaconcrete-preview';
const formalDir = 'D:/.openclaw/workspace/搅拌站出口项目/yudaconcrete-site';

// Languages and pages to restore
const LANGS = ['ar'];
const PAGES = ['index.html', 'about.html', 'contact.html', 'faq.html', 'projects/index.html', 'countries/index.html'];

// Files that existed in git d364a9f (Phase4 commit before my QA fixes)
// Central Asian langs (kz/kg/tj/tm/uz) were added in later commits
const GIT_COMMIT = 'd364a9f';

function gitShow(ref, file) {
  try {
    return execSync(`git -C "${formalDir}" show ${ref}:${file}`, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  } catch(e) { return null; }
}

// STEP 1: Restore from git
console.log('STEP 1: Restoring language pages from git history...');
let restored = 0;
let failed = 0;

for (const lang of LANGS) {
  for (const page of PAGES) {
    const gitFile = `${lang}/${page}`;
    const content = gitShow(GIT_COMMIT, gitFile);
    if (content) {
      const dst = path.join(preDir, lang, page);
      const dir = path.dirname(dst);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(dst, content, 'utf8');
      console.log(`  RESTORED: ${lang}/${page} (${content.length}B)`);
      restored++;
    } else {
      console.log(`  NOT FOUND in git: ${lang}/${page}`);
      failed++;
    }
  }
}

// STEP 2: Copy missing images from formal station assets
console.log('\nSTEP 2: Copying images...');
const formalImgs = path.join(formalDir, 'assets', 'images');
const preImgs = path.join(preDir, 'assets', 'images');

// Copy all image files (not subdirectories)
const imgFiles = fs.readdirSync(formalImgs, {withFileTypes: true});
let copied = 0;
for (const f of imgFiles) {
  if (f.isFile() && !f.name.startsWith('_')) {
    const src = path.join(formalImgs, f.name);
    const dst = path.join(preImgs, f.name);
    if (!fs.existsSync(dst)) {
      fs.copyFileSync(src, dst);
      copied++;
    }
  }
}
console.log(`  Copied ${copied} new images`);

// Copy company subdirectory images
const formalCompany = path.join(formalImgs, 'company');
const preCompany = path.join(preImgs, 'company');
if (fs.existsSync(formalCompany)) {
  if (!fs.existsSync(preCompany)) fs.mkdirSync(preCompany);
  const companyFiles = fs.readdirSync(formalCompany);
  let companyCopied = 0;
  for (const f of companyFiles) {
    const src = path.join(formalCompany, f);
    const dst = path.join(preCompany, f);
    if (!fs.existsSync(dst)) {
      fs.copyFileSync(src, dst);
      companyCopied++;
    }
  }
  console.log(`  Copied ${companyCopied} company images`);
}

// Verify image counts
const preImgCount = fs.readdirSync(preImgs).filter(f => f.includes('.')).length;
const formalImgCount = fs.readdirSync(formalImgs).filter(f => f.includes('.')).length;
console.log(`\n  Preview images: ${preImgCount}, Formal images: ${formalImgCount}`);

console.log('\nRESTORE COMPLETE');
