#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Libraries to remove (outdated or included in Bootstrap 5/modern alternatives)
const librariesToRemove = {
  css: [
    // Normalize is included in Bootstrap 5's Reboot
    'css/normalize.css',

    // Owl Carousel - replaced with Swiper
    'css/owl.carousel.css',
    'css/owl.theme.css',
    'css/owl.transitions.css',

    // MeanMenu - can use Bootstrap's native responsive nav
    'css/meanmenu.min.css',

    // mCustomScrollbar - replaced with SimpleBar
    'css/scrollbar/jquery.mCustomScrollbar.min.css',

    // Morris charts - replaced with Chart.js
    'css/morrisjs/morris.css',

    // These are IE-specific or outdated
    'css/responsive.css' // Will be handled by modern CSS
  ],

  js: [
    // Modernizr - not needed for modern browsers
    'js/vendor/modernizr-2.8.3.min.js',
    'js/vendor/modernizr-custom.js',

    // jQuery plugins that are outdated or have modern alternatives
    'js/jquery-price-slider.js',
    'js/jquery.meanmenu.js',
    'js/owl.carousel.min.js',
    'js/jquery.sticky.js',
    'js/jquery.scrollUp.min.js',

    // Counter animations - replaced with CountUp.js
    'js/counterup/jquery.counterup.min.js',
    'js/counterup/waypoints.min.js',
    'js/counterup/counterup-active.js',

    // Scrollbar - replaced with SimpleBar
    'js/scrollbar/jquery.mCustomScrollbar.concat.min.js',
    'js/scrollbar/mCustomScrollbar-active.js',

    // Morris/Raphael - replaced with Chart.js
    'js/morrisjs/raphael-min.js',
    'js/morrisjs/morris.js',
    'js/morrisjs/morris-active.js',

    // Sparkline - can use Chart.js
    'js/sparkline/jquery.sparkline.min.js',
    'js/sparkline/jquery.charts-sparkline.js',
    'js/sparkline/sparkline-active.js',

    // WOW.js - replaced with AOS
    'js/wow.min.js',

    // Tawk chat - external service, should be loaded differently
    'js/tawk-chat.js'
  ]
};

// Patterns to remove from HTML files
const patternsToRemove = [
  {
    pattern: /<link[^>]*normalize\.css[^>]*>\n?/gi,
    replacement: ''
  },
  {
    pattern: /<link[^>]*owl\.(carousel|theme|transitions)\.css[^>]*>\n?/gi,
    replacement: ''
  },
  {
    pattern: /<link[^>]*meanmenu\.min\.css[^>]*>\n?/gi,
    replacement: ''
  },
  {
    pattern: /<link[^>]*jquery\.mCustomScrollbar[^>]*>\n?/gi,
    replacement: ''
  },
  {
    pattern: /<link[^>]*morris\.css[^>]*>\n?/gi,
    replacement: ''
  },
  {
    pattern: /<!--\s*modernizr JS[\s\S]*?<script[^>]*modernizr[^>]*><\/script>\n?/gi,
    replacement: ''
  },
  {
    pattern: /<script[^>]*modernizr[^>]*><\/script>\n?/gi,
    replacement: ''
  },
  {
    pattern: /<script[^>]*jquery-price-slider[^>]*><\/script>\n?/gi,
    replacement: ''
  },
  {
    pattern: /<script[^>]*jquery\.meanmenu[^>]*><\/script>\n?/gi,
    replacement: ''
  },
  {
    pattern: /<script[^>]*owl\.carousel[^>]*><\/script>\n?/gi,
    replacement: ''
  },
  {
    pattern: /<script[^>]*jquery\.sticky[^>]*><\/script>\n?/gi,
    replacement: ''
  },
  {
    pattern: /<script[^>]*jquery\.scrollUp[^>]*><\/script>\n?/gi,
    replacement: ''
  },
  {
    pattern: /<script[^>]*jquery\.counterup[^>]*><\/script>\n?/gi,
    replacement: ''
  },
  {
    pattern: /<script[^>]*waypoints[^>]*><\/script>\n?/gi,
    replacement: ''
  },
  {
    pattern: /<script[^>]*counterup-active[^>]*><\/script>\n?/gi,
    replacement: ''
  },
  {
    pattern: /<script[^>]*mCustomScrollbar[^>]*><\/script>\n?/gi,
    replacement: ''
  },
  {
    pattern: /<script[^>]*raphael-min[^>]*><\/script>\n?/gi,
    replacement: ''
  },
  {
    pattern: /<script[^>]*morris\.js[^>]*><\/script>\n?/gi,
    replacement: ''
  },
  {
    pattern: /<script[^>]*morris-active[^>]*><\/script>\n?/gi,
    replacement: ''
  },
  {
    pattern: /<script[^>]*jquery\.sparkline[^>]*><\/script>\n?/gi,
    replacement: ''
  },
  {
    pattern: /<script[^>]*jquery\.charts-sparkline[^>]*><\/script>\n?/gi,
    replacement: ''
  },
  {
    pattern: /<script[^>]*sparkline-active[^>]*><\/script>\n?/gi,
    replacement: ''
  },
  {
    pattern: /<script[^>]*wow\.min\.js[^>]*><\/script>\n?/gi,
    replacement: ''
  },
  {
    pattern: /<script[^>]*tawk-chat[^>]*><\/script>\n?/gi,
    replacement: ''
  },
  {
    // Remove IE conditional comments
    pattern: /<!--\[if[^\]]*\]>[\s\S]*?<!\[endif\]-->\n?/gi,
    replacement: ''
  },
  {
    // Remove meta tag for IE compatibility
    pattern: /<meta\s+http-equiv="x-ua-compatible"[^>]*>\n?/gi,
    replacement: ''
  },
  {
    // Clean up empty comment blocks
    pattern: /<!--\s*(normalize|modernizr|owl|meanmenu|scrollbar|morris|sparkline|wow|counterup|waypoints|sticky|scrollUp|price-slider)[^>]*-->\n?/gi,
    replacement: ''
  }
];

// Additional patterns for jQuery migration
const jqueryMigrationPatterns = [
  {
    // Replace jQuery document ready with vanilla JS
    oldPattern: /\$\(document\)\.ready\(function\(\)\s*{/g,
    newPattern: 'document.addEventListener("DOMContentLoaded", function() {'
  },
  {
    oldPattern: /\$\(function\(\)\s*{/g,
    newPattern: 'document.addEventListener("DOMContentLoaded", function() {'
  }
];

function cleanupHTMLFile(filePath) {
  console.log(`Processing: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Remove outdated library references
  patternsToRemove.forEach(({ pattern, replacement }) => {
    content = content.replace(pattern, replacement);
  });

  // Clean up multiple empty lines
  content = content.replace(/\n{3,}/g, '\n\n');

  // Clean up trailing whitespace
  content = content.replace(/[ \t]+$/gm, '');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`  ✓ Cleaned successfully`);
    return true;
  } else {
    console.log(`  No changes needed`);
    return false;
  }
}

function updatePackageJson() {
  console.log('\nUpdating package.json...');
  const packagePath = path.join(process.cwd(), 'package.json');

  if (!fs.existsSync(packagePath)) {
    console.log('  package.json not found');
    return;
  }

  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  // Add modern build scripts
  packageJson.scripts = {
    ...packageJson.scripts,
    'clean': 'rm -rf dist',
    'lint:html': 'html-validate "*.html"',
    'lint:css': 'stylelint "src/scss/**/*.scss"',
    'lint:js': 'eslint "src/js/**/*.js"',
    'format': 'prettier --write "src/**/*.{js,scss,html}"'
  };

  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
  console.log('  ✓ Updated package.json');
}

function createModernConfigFiles() {
  console.log('\nCreating modern config files...');

  // Create .browserslistrc for modern browser support only
  const browserslistContent = `# Supported browsers
last 2 versions
not dead
not ie 11
not op_mini all`;

  fs.writeFileSync('.browserslistrc', browserslistContent);
  console.log('  ✓ Created .browserslistrc');

  // Create postcss.config.js
  const postcssConfig = `module.exports = {
  plugins: {
    autoprefixer: {},
    cssnano: process.env.NODE_ENV === 'production' ? {} : false
  }
};`;

  fs.writeFileSync('postcss.config.js', postcssConfig);
  console.log('  ✓ Created postcss.config.js');

  // Create .prettierrc
  const prettierConfig = {
    "semi": true,
    "trailingComma": "es5",
    "singleQuote": true,
    "printWidth": 100,
    "tabWidth": 2
  };

  fs.writeFileSync('.prettierrc', JSON.stringify(prettierConfig, null, 2));
  console.log('  ✓ Created .prettierrc');

  // Create .eslintrc.js
  const eslintConfig = `module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};`;

  fs.writeFileSync('.eslintrc.js', eslintConfig);
  console.log('  ✓ Created .eslintrc.js');
}

function main() {
  console.log('Cleanup Tool - Removing Outdated Dependencies');
  console.log('=============================================\n');

  // Clean up HTML files
  const htmlFiles = glob.sync('*.html');
  console.log(`Found ${htmlFiles.length} HTML file(s) to process:\n`);

  let cleanedCount = 0;
  for (const file of htmlFiles) {
    if (cleanupHTMLFile(file)) {
      cleanedCount++;
    }
  }

  // Update package.json
  updatePackageJson();

  // Create modern config files
  createModernConfigFiles();

  console.log(`\n=============================================`);
  console.log(`Cleanup complete!`);
  console.log(`Files cleaned: ${cleanedCount}/${htmlFiles.length}`);

  console.log(`\nRemoved references to:`);
  console.log(`- normalize.css (Bootstrap 5 includes Reboot)`);
  console.log(`- modernizr (not needed for modern browsers)`);
  console.log(`- owl carousel (use Swiper instead)`);
  console.log(`- meanmenu (use Bootstrap 5 navbar)`);
  console.log(`- mCustomScrollbar (use SimpleBar)`);
  console.log(`- morris/raphael charts (use Chart.js)`);
  console.log(`- sparkline (use Chart.js)`);
  console.log(`- wow.js (use AOS)`);
  console.log(`- counterup/waypoints (use CountUp.js)`);
  console.log(`- jQuery plugins (use vanilla JS alternatives)`);
  console.log(`- IE-specific code and meta tags`);

  console.log(`\nNext steps:`);
  console.log(`1. Install dev dependencies: npm install --save-dev eslint prettier stylelint html-validate`);
  console.log(`2. Review and test all pages`);
  console.log(`3. Update JavaScript to use modern alternatives`);
  console.log(`4. Run: npm run build`);
}

main();