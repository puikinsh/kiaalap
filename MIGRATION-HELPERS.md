# Migration Helper Scripts & Commands

## 🔧 Useful Commands for Migration

### Find Bootstrap 4 Classes in a File
```bash
# Find all data-toggle attributes
grep -n "data-toggle" filename.html

# Find all data-target attributes
grep -n "data-target" filename.html

# Find all ml-, mr-, pl-, pr- classes
grep -E "(ml-|mr-|pl-|pr-)[0-9]" filename.html

# Find all text-left/text-right
grep -E "(text-left|text-right)" filename.html

# Find all Bootstrap 4 specific patterns
grep -E "(data-toggle|data-target|data-dismiss|\.sr-only|\.pull-|\.text-left|\.text-right|\.ml-|\.mr-|\.pl-|\.pr-|\.badge-|\.close)" filename.html
```

### Batch Replace Commands
```bash
# Replace data attributes (use with caution, test first!)
sed -i '' 's/data-toggle/data-bs-toggle/g' filename.html
sed -i '' 's/data-target/data-bs-target/g' filename.html
sed -i '' 's/data-dismiss/data-bs-dismiss/g' filename.html

# Replace margin/padding utilities
sed -i '' 's/class="ml-/class="ms-/g' filename.html
sed -i '' 's/class="mr-/class="me-/g' filename.html
sed -i '' 's/class="pl-/class="ps-/g' filename.html
sed -i '' 's/class="pr-/class="pe-/g' filename.html

# Replace text alignment
sed -i '' 's/text-left/text-start/g' filename.html
sed -i '' 's/text-right/text-end/g' filename.html
```

## 📝 Common Migration Patterns

### Old Bootstrap 4 Modal
```html
<!-- OLD -->
<button type="button" data-toggle="modal" data-target="#myModal">
  Launch modal
</button>

<div class="modal" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal">
          <span>&times;</span>
        </button>
      </div>
    </div>
  </div>
</div>
```

### New Bootstrap 5 Modal
```html
<!-- NEW -->
<button type="button" data-bs-toggle="modal" data-bs-target="#myModal">
  Launch modal
</button>

<div class="modal" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
    </div>
  </div>
</div>
```

### Old Bootstrap 4 Dropdown
```html
<!-- OLD -->
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">
    Dropdown
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">Action</a>
  </div>
</div>
```

### New Bootstrap 5 Dropdown
```html
<!-- NEW -->
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
    Dropdown
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
  </ul>
</div>
```

### Old Bootstrap 4 Forms
```html
<!-- OLD -->
<div class="form-group">
  <label for="email">Email</label>
  <input type="email" class="form-control" id="email">
  <small class="form-text text-muted">Help text</small>
</div>

<div class="custom-control custom-checkbox">
  <input type="checkbox" class="custom-control-input" id="check1">
  <label class="custom-control-label" for="check1">Check me</label>
</div>
```

### New Bootstrap 5 Forms
```html
<!-- NEW -->
<div class="mb-3">
  <label for="email" class="form-label">Email</label>
  <input type="email" class="form-control" id="email">
  <div class="form-text">Help text</div>
</div>

<div class="form-check">
  <input class="form-check-input" type="checkbox" id="check1">
  <label class="form-check-label" for="check1">Check me</label>
</div>
```

## 🎯 Quick Check Script

Create this as `check-migration.sh`:

```bash
#!/bin/bash

# Check Bootstrap 4 remnants in a file
FILE=$1

echo "Checking $FILE for Bootstrap 4 patterns..."
echo "========================================="

echo -n "data-toggle occurrences: "
grep -c "data-toggle" $FILE || echo "0"

echo -n "data-target occurrences: "
grep -c "data-target" $FILE || echo "0"

echo -n "data-dismiss occurrences: "
grep -c "data-dismiss" $FILE || echo "0"

echo -n "ml-/mr- classes: "
grep -Eo "(ml-|mr-)[0-9]" $FILE | wc -l || echo "0"

echo -n "pl-/pr- classes: "
grep -Eo "(pl-|pr-)[0-9]" $FILE | wc -l || echo "0"

echo -n "text-left/right: "
grep -Eo "(text-left|text-right)" $FILE | wc -l || echo "0"

echo -n ".close class: "
grep -c "class=\"close\"" $FILE || echo "0"

echo -n ".sr-only class: "
grep -c "sr-only" $FILE || echo "0"

echo "========================================="
echo "If all values are 0, Bootstrap 4 patterns are cleared!"
```

## 📊 Migration Validation

### Lighthouse Performance Check
```javascript
// Run in browser console to check key metrics
console.log('Checking performance metrics...');

// Check for lazy loading images
const images = document.querySelectorAll('img');
const lazyImages = Array.from(images).filter(img => img.loading === 'lazy');
console.log(`Images: ${images.length}, Lazy loaded: ${lazyImages.length}`);

// Check for defer scripts
const scripts = document.querySelectorAll('script[src]');
const deferScripts = Array.from(scripts).filter(script => script.defer);
console.log(`Scripts: ${scripts.length}, Deferred: ${deferScripts.length}`);

// Check Bootstrap version
if (typeof bootstrap !== 'undefined') {
    console.log('Bootstrap version:', bootstrap.VERSION || 'Unknown');
}

// Check for Bootstrap 4 data attributes
const oldAttrs = document.querySelectorAll('[data-toggle], [data-target], [data-dismiss]');
console.log(`Bootstrap 4 attributes found: ${oldAttrs.length}`);
if (oldAttrs.length > 0) {
    console.warn('Found Bootstrap 4 attributes that need updating!');
    oldAttrs.forEach(el => console.log(el));
}
```

## 🔄 Bulk Migration Script Template

For migrating multiple similar files:

```javascript
// Node.js script for bulk replacements
const fs = require('fs');
const path = require('path');

function migrateFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Bootstrap 4 to 5 replacements
    content = content.replace(/data-toggle/g, 'data-bs-toggle');
    content = content.replace(/data-target/g, 'data-bs-target');
    content = content.replace(/data-dismiss/g, 'data-bs-dismiss');

    // Utility classes
    content = content.replace(/\bml-(\d+)/g, 'ms-$1');
    content = content.replace(/\bmr-(\d+)/g, 'me-$1');
    content = content.replace(/\bpl-(\d+)/g, 'ps-$1');
    content = content.replace(/\bpr-(\d+)/g, 'pe-$1');

    // Text alignment
    content = content.replace(/\btext-left\b/g, 'text-start');
    content = content.replace(/\btext-right\b/g, 'text-end');

    // Components
    content = content.replace(/\bsr-only\b/g, 'visually-hidden');
    content = content.replace(/\bsr-only-focusable\b/g, 'visually-hidden-focusable');
    content = content.replace(/class="close"/g, 'class="btn-close"');

    // Form groups
    content = content.replace(/\bform-group\b/g, 'mb-3');

    fs.writeFileSync(filePath, content);
    console.log(`✅ Migrated: ${filePath}`);
}

// Usage
// migrateFile('path/to/file.html');
```

## 💡 Tips for Faster Migration

1. **Use Find & Replace in IDE**:
   - Most IDEs support regex find/replace
   - Can preview changes before applying
   - Safer than command-line sed

2. **Create Snippets**:
   - Save common Bootstrap 5 patterns as snippets
   - Speeds up repetitive conversions

3. **Test One Section at a Time**:
   - Migrate header first, test
   - Then sidebar, test
   - Then main content, test
   - Finally footer and scripts

4. **Use Browser DevTools**:
   - Console will show Bootstrap version
   - Network tab shows loading performance
   - Elements tab helps identify old classes

5. **Version Control**:
   - Commit after each successful file migration
   - Easy to revert if issues arise

## 🚨 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Dropdowns not working | Check data-bs-toggle and data-bs-target |
| Modals not opening | Ensure data-bs-dismiss on close button |
| Forms look different | Update form-group to mb-3 |
| Spacing is off | Check margin/padding utility changes |
| Close button missing | Replace .close with .btn-close |
| Tooltips broken | Initialize with new Bootstrap 5 JS |

## 📞 Getting Help

If stuck on a migration:
1. Check the Bootstrap 5 migration guide
2. Compare with dashboard-final.html
3. Test in browser console
4. Check browser console for errors
5. Validate HTML with W3C validator

Remember: The goal is not just to make it work, but to make it performant and maintainable!