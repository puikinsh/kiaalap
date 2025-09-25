#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Bootstrap 4 to 5 migration mappings
const classReplacements = {
  // Grid and spacing
  'ml-': 'ms-',
  'mr-': 'me-',
  'pl-': 'ps-',
  'pr-': 'pe-',
  'float-left': 'float-start',
  'float-right': 'float-end',
  'text-left': 'text-start',
  'text-right': 'text-end',

  // Forms
  'form-group': '',  // Removed in BS5, use margin utilities
  'form-row': 'row',
  'form-inline': 'd-inline-flex',
  'custom-control': 'form-check',
  'custom-control-input': 'form-check-input',
  'custom-control-label': 'form-check-label',
  'custom-select': 'form-select',
  'custom-file': 'd-none', // File input completely redesigned
  'custom-file-input': 'form-control',
  'custom-file-label': 'd-none',
  'custom-range': 'form-range',
  'custom-switch': 'form-switch',
  'custom-checkbox': 'form-check',
  'custom-radio': 'form-check',

  // Input groups
  'input-group-append': '', // Removed, structure changed
  'input-group-prepend': '', // Removed, structure changed

  // Badges and labels
  'badge-pill': 'rounded-pill',
  'badge-primary': 'bg-primary',
  'badge-secondary': 'bg-secondary',
  'badge-success': 'bg-success',
  'badge-danger': 'bg-danger',
  'badge-warning': 'bg-warning text-dark',
  'badge-info': 'bg-info text-dark',
  'badge-light': 'bg-light text-dark',
  'badge-dark': 'bg-dark',

  // Utilities
  'sr-only': 'visually-hidden',
  'sr-only-focusable': 'visually-hidden-focusable',
  'font-weight-bold': 'fw-bold',
  'font-weight-bolder': 'fw-bolder',
  'font-weight-normal': 'fw-normal',
  'font-weight-light': 'fw-light',
  'font-weight-lighter': 'fw-lighter',
  'font-italic': 'fst-italic',

  // Components
  'close': 'btn-close',
  'modal-close': 'btn-close',
  'embed-responsive': 'ratio',
  'embed-responsive-16by9': 'ratio-16x9',
  'embed-responsive-4by3': 'ratio-4x3',
  'embed-responsive-1by1': 'ratio-1x1',
  'embed-responsive-item': '',

  // Dropdowns
  'dropdown-menu-right': 'dropdown-menu-end',
  'dropdown-menu-left': 'dropdown-menu-start',
  'dropleft': 'dropstart',
  'dropright': 'dropend',

  // List groups
  'list-group-item-action': 'list-group-item-action',

  // Carousel
  'carousel-item-next': 'carousel-item-next',
  'carousel-item-prev': 'carousel-item-prev',
  'carousel-item-left': 'carousel-item-start',
  'carousel-item-right': 'carousel-item-end',

  // Jumbotron (removed in BS5)
  'jumbotron': 'p-5 mb-4 bg-light rounded-3',
  'jumbotron-fluid': 'p-5 mb-4 bg-light',

  // Media object (removed in BS5, use flex utilities)
  'media': 'd-flex',
  'media-body': 'flex-grow-1 ms-3',

  // Borders
  'border-left': 'border-start',
  'border-right': 'border-end',
  'rounded-left': 'rounded-start',
  'rounded-right': 'rounded-end',

  // No gutters -> g-0
  'no-gutters': 'g-0'
};

// Data attribute replacements
const dataAttributeReplacements = {
  'data-toggle': 'data-bs-toggle',
  'data-target': 'data-bs-target',
  'data-dismiss': 'data-bs-dismiss',
  'data-placement': 'data-bs-placement',
  'data-content': 'data-bs-content',
  'data-trigger': 'data-bs-trigger',
  'data-offset': 'data-bs-offset',
  'data-method': 'data-bs-method',
  'data-ride': 'data-bs-ride',
  'data-slide': 'data-bs-slide',
  'data-slide-to': 'data-bs-slide-to',
  'data-parent': 'data-bs-parent',
  'data-interval': 'data-bs-interval',
  'data-pause': 'data-bs-pause',
  'data-wrap': 'data-bs-wrap',
  'data-keyboard': 'data-bs-keyboard',
  'data-backdrop': 'data-bs-backdrop',
  'data-focus': 'data-bs-focus',
  'data-show': 'data-bs-show',
  'data-spy': 'data-bs-spy'
};

// Icon replacements (Font Awesome 4 to 6)
const iconReplacements = {
  'fa fa-': 'fas fa-',
  'fa-close': 'fa-xmark',
  'fa-remove': 'fa-xmark',
  'fa-navicon': 'fa-bars',
  'fa-reorder': 'fa-bars',
  'fa-dashboard': 'fa-gauge',
  'fa-tachometer': 'fa-gauge',
  'fa-bank': 'fa-building-columns',
  'fa-institution': 'fa-building-columns',
  'fa-university': 'fa-building-columns',
  'fa-mortar-board': 'fa-graduation-cap',
  'fa-pencil': 'fa-pencil-alt',
  'fa-calendar-o': 'fa-calendar',
  'fa-envelope-o': 'fa-envelope',
  'fa-star-o': 'fa-star',
  'fa-trash-o': 'fa-trash',
  'fa-file-o': 'fa-file',
  'fa-clock-o': 'fa-clock',
  'fa-arrow-circle-o-down': 'fa-circle-arrow-down',
  'fa-arrow-circle-o-up': 'fa-circle-arrow-up',
  'fa-play-circle-o': 'fa-circle-play',
  'fa-repeat': 'fa-arrows-rotate',
  'fa-refresh': 'fa-arrows-rotate',
  'fa-list-alt': 'fa-rectangle-list',
  'fa-dedent': 'fa-outdent',
  'fa-video-camera': 'fa-video',
  'fa-picture-o': 'fa-image',
  'fa-photo': 'fa-image',
  'fa-pencil-square-o': 'fa-pen-to-square',
  'fa-edit': 'fa-pen-to-square',
  'fa-share-square-o': 'fa-share-from-square',
  'fa-check-square-o': 'fa-square-check',
  'fa-arrows': 'fa-arrows-up-down-left-right',
  'fa-times-circle-o': 'fa-circle-xmark',
  'fa-check-circle-o': 'fa-circle-check',
  'fa-mail-forward': 'fa-share',
  'fa-eye-slash': 'fa-eye-slash',
  'fa-warning': 'fa-triangle-exclamation',
  'fa-calendar': 'fa-calendar-days',
  'fa-arrows-h': 'fa-arrows-left-right',
  'fa-arrows-v': 'fa-arrows-up-down',
  'fa-bar-chart': 'fa-chart-column',
  'fa-bar-chart-o': 'fa-chart-column',
  'fa-facebook-square': 'fa-brands fa-facebook',
  'fa-twitter-square': 'fa-brands fa-twitter',
  'fa-google-plus-square': 'fa-brands fa-google-plus',
  'fa-linkedin-square': 'fa-brands fa-linkedin'
};

function migrateFile(filePath) {
  console.log(`Processing: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace classes
  for (const [oldClass, newClass] of Object.entries(classReplacements)) {
    // Match whole class names in class attributes
    const classRegex = new RegExp(`(class="[^"]*\\b)${oldClass.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}(\\S*\\b[^"]*)`, 'g');
    content = content.replace(classRegex, (match, before, after) => {
      if (newClass) {
        return `${before}${newClass}${after}`;
      } else {
        // If newClass is empty, remove the old class
        return `${before}${after}`.replace(/\s+/g, ' ');
      }
    });
  }

  // Replace data attributes
  for (const [oldAttr, newAttr] of Object.entries(dataAttributeReplacements)) {
    const attrRegex = new RegExp(`\\b${oldAttr}\\b`, 'g');
    content = content.replace(attrRegex, newAttr);
  }

  // Replace Font Awesome icons
  for (const [oldIcon, newIcon] of Object.entries(iconReplacements)) {
    const iconRegex = new RegExp(`(class="[^"]*\\b)${oldIcon.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}`, 'g');
    content = content.replace(iconRegex, `$1${newIcon}`);
  }

  // Update Bootstrap CDN links
  content = content.replace(
    /https:\/\/maxcdn\.bootstrapcdn\.com\/bootstrap\/4\.\d+\.\d+\/css\/bootstrap\.min\.css/g,
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
  );

  content = content.replace(
    /https:\/\/maxcdn\.bootstrapcdn\.com\/bootstrap\/4\.\d+\.\d+\/js\/bootstrap\.min\.js/g,
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js'
  );

  // Update local Bootstrap references
  content = content.replace(
    /css\/bootstrap\.min\.css/g,
    'node_modules/bootstrap/dist/css/bootstrap.min.css'
  );

  content = content.replace(
    /js\/bootstrap\.min\.js/g,
    'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
  );

  // Update jQuery if needed (though BS5 doesn't require it)
  content = content.replace(
    /jquery-1\.12\.4\.min\.js/g,
    'jquery-3.7.1.min.js'
  );

  // Update Font Awesome references
  content = content.replace(
    /font-awesome\.min\.css/g,
    'node_modules/@fortawesome/fontawesome-free/css/all.min.css'
  );

  if (content !== originalContent) {
    // Create backup
    const backupPath = filePath + '.backup';
    if (!fs.existsSync(backupPath)) {
      fs.writeFileSync(backupPath, originalContent);
      console.log(`  Created backup: ${backupPath}`);
    }

    // Write migrated content
    fs.writeFileSync(filePath, content);
    console.log(`  ✓ Migrated successfully`);
    return true;
  } else {
    console.log(`  No changes needed`);
    return false;
  }
}

function main() {
  const args = process.argv.slice(2);
  const pattern = args[0] || '*.html';

  console.log('Bootstrap 4 to 5 Migration Tool');
  console.log('================================\n');
  console.log(`Looking for files matching: ${pattern}\n`);

  const files = glob.sync(pattern);

  if (files.length === 0) {
    console.log('No files found matching the pattern.');
    return;
  }

  console.log(`Found ${files.length} file(s) to process:\n`);

  let migratedCount = 0;
  for (const file of files) {
    if (migrateFile(file)) {
      migratedCount++;
    }
  }

  console.log(`\n================================`);
  console.log(`Migration complete!`);
  console.log(`Files migrated: ${migratedCount}/${files.length}`);
  console.log(`\nBackup files have been created with .backup extension`);
  console.log(`\nIMPORTANT: Please review the changes and test thoroughly!`);
  console.log(`Some manual adjustments may be required for:`);
  console.log(`- Complex form layouts`);
  console.log(`- Custom JavaScript initializations`);
  console.log(`- Input groups structure`);
  console.log(`- Removed components (jumbotron, media object)`);
}

main();