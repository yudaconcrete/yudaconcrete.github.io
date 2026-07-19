const fs = require('fs');
const path = require('path');

const root = __dirname;
const issues = [];

// Collect all HTML files
function findHtml(dir, base = '') {
  let results = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    if (item.name.startsWith('_') || item.name === 'node_modules') continue;
    const full = path.join(dir, item.name);
    const rel = base ? base + '/' + item.name : item.name;
    if (item.isDirectory()) {
      // Don't recurse into assets (images)
      if (item.name === 'assets') continue;
      results = results.concat(findHtml(full, rel));
    } else if (item.name.endsWith('.html')) {
      results.push({ full, rel });
    }
  }
  return results;
}

const files = findHtml(root);
console.log(`Found ${files.length} HTML files`);

// Check for broken nav links (relative paths instead of /ru/ prefixed)
for (const f of files) {
  const dir = path.dirname(f.full);
  const content = fs.readFileSync(f.full, 'utf8');
  
  // Check nav links
  const navLinks = content.match(/<a\s+href="([^"]+)"[^>]*>/gi);
  if (!navLinks) continue;
  
  for (const link of navLinks) {
    const hrefMatch = link.match(/href="([^"]+)"/i);
    if (!hrefMatch) continue;
    const href = hrefMatch[1];
    
    // Skip external, anchor-only, javascript, protocol-relative
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('javascript') || href.startsWith('//')) continue;
    // Skip mailto, tel
    if (href.startsWith('mailto:') || href.startsWith('tel:')) continue;
    // Skip image/asset links
    if (href.startsWith('assets/') || href.startsWith('../assets/')) continue;
    
    // Check if link target exists
    let targetPath;
    if (href.startsWith('/')) {
      // Absolute link - resolve from root
      targetPath = path.join(root, href.replace(/\/$/, '/index.html'));
      if (!href.endsWith('/') && !path.extname(href)) {
        targetPath = path.join(root, href, 'index.html');
      }
    } else if (href.startsWith('../')) {
      // Relative up
      targetPath = path.resolve(dir, href);
      if (!path.extname(targetPath)) {
        targetPath = path.join(targetPath, 'index.html');
      }
    } else {
      // Relative
      targetPath = path.resolve(dir, href);
      if (!path.extname(targetPath)) {
        targetPath = path.join(targetPath, 'index.html');
      }
    }
    
    if (!fs.existsSync(targetPath)) {
      issues.push({ file: f.rel, href, target: targetPath, issue: 'BROKEN LINK - target does not exist' });
    }
    
    // For RU pages: check if nav links should use /ru/ prefix
    if (f.rel.startsWith('ru/') || f.rel.startsWith('ru\\')) {
      // If it's a relative link (not /ru/ prefixed, not / prefixed), it might be wrong
      if (!href.startsWith('/') && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('javascript') && !href.startsWith('../') && !href.startsWith('mailto') && !href.startsWith('tel')) {
        // Relative links are fine IF they point to files in the same ru/ subdirectory
        // But if it's something like "countries/" it should be /ru/countries/
        if (!href.startsWith('assets/')) {
          // Let's just note it
        }
      }
    }
  }
}

// Check for specific known issues
const ruFiles = files.filter(f => f.rel.startsWith('ru/'));
for (const f of ruFiles) {
  const content = fs.readFileSync(f.full, 'utf8');
  // Check for countries/ without /ru/ prefix in nav (known issue)
  const countryLinks = content.match(/href="countries\/"/g);
  if (countryLinks) {
    issues.push({ file: f.rel, href: 'countries/', target: 'N/A', issue: `RELATIVE PATH - should be /ru/countries/ (${countryLinks.length} occurrences)` });
  }
  // Check for duplicate toggleLang
  const toggleCount = (content.match(/function toggleLang/g) || []).length;
  if (toggleCount > 1) {
    issues.push({ file: f.rel, href: 'N/A', target: 'N/A', issue: `DUPLICATE toggleLang() definition (${toggleCount} times)` });
  }
}

// Check English index.html for broken country links
const enIndex = files.find(f => f.rel === 'index.html');
if (enIndex) {
  const content = fs.readFileSync(enIndex.full, 'utf8');
  // Check countries/ directory index exists
  if (!fs.existsSync(path.join(root, 'countries', 'index.html'))) {
    issues.push({ file: 'index.html', href: 'countries/', target: 'countries/index.html', issue: 'MISSING - countries/index.html does not exist' });
  }
}

// Print results
console.log('\n=== AUDIT RESULTS ===\n');
if (issues.length === 0) {
  console.log('✅ No issues found!');
} else {
  for (const issue of issues) {
    console.log(`❌ ${issue.file}`);
    console.log(`   Link: ${issue.href}`);
    console.log(`   Issue: ${issue.issue}`);
    console.log(`   Target: ${issue.target}`);
    console.log('');
  }
}
console.log(`\nTotal: ${issues.length} issues found`);
