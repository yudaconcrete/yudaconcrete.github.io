var fs=require('fs');
var ar=fs.readFileSync('G:/yudaconcrete-preview/ar/index.html','utf8');

// Add Schema structured data before </head>
var schema=`
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://yudaconcrete.github.io/#organization",
      "name": "YUDA HUALONG",
      "description": "\u0645\u0635\u0646\u0639 \u0645\u062D\u0637\u0627\u062A \u062E\u0644\u0637 \u0627\u0644\u062E\u0631\u0633\u0627\u0646\u0629 \u0641\u064A \u0627\u0644\u0635\u064A\u0646",
      "url": "https://yudaconcrete.github.io",
      "telephone": "+86-18638788818",
      "email": "18638788818@163.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "\u062A\u0634\u0646\u063A\u062A\u0634\u0648",
        "addressRegion": "\u062E\u0646\u0627\u0646",
        "addressCountry": "CN"
      },
      "contactPoint": [{
        "@type": "ContactPoint",
        "telephone": "+86-18638788818",
        "contactType": "sales",
        "availableLanguage": ["\u0627\u0644\u0639\u0631\u0628\u064A\u0629", "\u0627\u0644\u0625\u0646\u062C\u0644\u064A\u0632\u064A\u0629", "\u0627\u0644\u0635\u064A\u0646\u064A\u0629"]
      }],
      "areaServed": ["Russia", "Kazakhstan", "Nigeria", "Pakistan", "Saudi Arabia", "Kenya", "Uzbekistan"],
      "image": "https://yudaconcrete.github.io/assets/images/company/factory-01.jpg"
    },
    {
      "@type": "Product",
      "name": "\u0645\u062D\u0637\u0629 \u062E\u0644\u0637 \u062E\u0631\u0633\u0627\u0646\u0629 HZS",
      "description": "\u0645\u062C\u0645\u0648\u0639\u0629 \u0643\u0627\u0645\u0644\u0629 \u0645\u0646 \u0645\u062D\u0637\u0627\u062A \u062E\u0644\u0637 \u0627\u0644\u062E\u0631\u0633\u0627\u0646\u0629 \u0645\u0646 25 \u0625\u0644\u0649 480 \u0645\u0663/\u0633\u0627\u0639\u0629",
      "brand": { "@type": "Brand", "name": "YUDA" },
      "offers": { "@type": "AggregateOffer", "offerCount": "10" }
    }
  ]
}
</script>`;

ar=ar.replace('</head>', schema+'\n</head>');
fs.writeFileSync('G:/yudaconcrete-preview/ar/index.html',ar,'utf8');
console.log('Schema added to Arabic homepage');
