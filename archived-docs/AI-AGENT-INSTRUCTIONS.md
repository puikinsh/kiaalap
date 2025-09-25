# AI Agent Instructions for Kiaalap Migration

## 🤖 Purpose
This document provides standardized instructions for multiple AI agents working on the Kiaalap HTML migration project in parallel.

## 📚 Required Reading Before Starting
1. Read `dashboard-final.html` - This is the reference template
2. Read `MIGRATION-PLAN.md` - Check which files are assigned to you
3. Read `OPTIMIZATION-GUIDE.md` - Understand performance requirements

## 🎯 Migration Standards

### 1. HTML Structure Requirements
Every migrated HTML file MUST include:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Meta Tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="[Page specific description]">
    <meta name="keywords" content="education, dashboard, [page specific keywords]">
    <meta name="author" content="Kiaalap">

    <!-- Preconnect -->
    <link rel="preconnect" href="https://images.unsplash.com" crossorigin>
    <link rel="preconnect" href="https://ui-avatars.com" crossorigin>

    <title>Kiaalap - [Page Title]</title>

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">

    <!-- Critical CSS -->
    <style>
        /* Page-specific critical CSS */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    </style>

    <!-- Async CSS Loading -->
    <link rel="preload" href="node_modules/bootstrap/dist/css/bootstrap.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <link rel="preload" href="node_modules/bootstrap-icons/font/bootstrap-icons.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <link rel="preload" href="src/css/dashboard.css" as="style" onload="this.onload=null;this.rel='stylesheet'">

    <!-- Noscript Fallback -->
    <noscript>
        <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="node_modules/bootstrap-icons/font/bootstrap-icons.css">
        <link rel="stylesheet" href="src/css/dashboard.css">
    </noscript>
</head>
<body>
    <!-- Skip Link -->
    <a href="#main-content" class="visually-hidden-focusable">Skip to main content</a>

    <!-- Content -->

    <!-- Scripts with defer -->
    <script src="node_modules/bootstrap/dist/js/bootstrap.bundle.min.js" defer></script>
    <script src="src/js/dashboard.js" defer></script>
</body>
</html>
```

### 2. Bootstrap 5 Migration Checklist

#### ✅ Grid System Changes
- [ ] Replace `.col-xs-*` with `.col-*`
- [ ] Replace `.col-lg-*` with `.col-lg-*` (no change)
- [ ] Replace `.pull-left` with `.float-start`
- [ ] Replace `.pull-right` with `.float-end`
- [ ] Replace `.text-left` with `.text-start`
- [ ] Replace `.text-right` with `.text-end`

#### ✅ Component Changes
- [ ] Replace `data-toggle` with `data-bs-toggle`
- [ ] Replace `data-target` with `data-bs-target`
- [ ] Replace `data-dismiss` with `data-bs-dismiss`
- [ ] Replace `.badge-*` with `.bg-*`
- [ ] Replace `.close` with `.btn-close`
- [ ] Replace `.sr-only` with `.visually-hidden`
- [ ] Replace `.sr-only-focusable` with `.visually-hidden-focusable`

#### ✅ Form Changes
- [ ] Replace `.form-group` with `.mb-3`
- [ ] Replace `.form-control-file` with `.form-control`
- [ ] Replace `.form-check-input` positioning (now requires `.form-check` wrapper)
- [ ] Update `.custom-select` to `.form-select`
- [ ] Update `.custom-file` to standard file input
- [ ] Update `.custom-range` to `.form-range`

#### ✅ Utility Changes
- [ ] Replace `.ml-*` with `.ms-*` (start)
- [ ] Replace `.mr-*` with `.me-*` (end)
- [ ] Replace `.pl-*` with `.ps-*` (start)
- [ ] Replace `.pr-*` with `.pe-*` (end)
- [ ] Replace `.font-weight-*` with `.fw-*`
- [ ] Replace `.font-italic` with `.fst-italic`

### 3. Performance Optimizations

#### Required for ALL files:
```javascript
// 1. Image lazy loading
<img src="image.jpg" loading="lazy" width="100" height="100" alt="Description">

// 2. Script defer loading
<script src="script.js" defer></script>

// 3. CSS preload
<link rel="preload" href="style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">

// 4. Semantic HTML
<main> instead of <div class="main">
<nav> instead of <div class="navigation">
<aside> instead of <div class="sidebar">
```

### 4. Sidebar & Navigation Structure

Copy the exact sidebar structure from `dashboard-final.html`:

```html
<aside class="sidebar" id="sidebar">
    <div class="sidebar-header">
        <div class="sidebar-brand">
            <h5>
                <i class="bi bi-mortarboard-fill"></i>
                Kiaalap
            </h5>
            <button class="sidebar-close" id="sidebarClose">
                <i class="bi bi-x-lg"></i>
            </button>
        </div>
    </div>

    <nav class="sidebar-nav">
        <!-- Menu sections here -->
    </nav>
</aside>
```

### 5. File-Specific Requirements

#### For Dashboard Pages:
- Include Chart.js if charts are present
- Use `dashboard-grid` system for layout
- Implement stats cards with proper styling

#### For Form Pages:
- Use Bootstrap 5 form validation
- Include proper ARIA labels
- Implement client-side validation

#### For Table Pages:
- Use responsive table wrappers
- Implement sorting if needed
- Add pagination controls

#### For Authentication Pages:
- Center content vertically and horizontally
- Include form validation
- Add remember me functionality
- Link to other auth pages

### 6. Testing Checklist

Before marking a file as COMPLETED:

- [ ] Page loads without console errors
- [ ] All Bootstrap 4 classes replaced with Bootstrap 5
- [ ] Responsive design works (test at 320px, 768px, 1024px, 1440px)
- [ ] All interactive elements work (dropdowns, modals, tooltips)
- [ ] Forms submit correctly
- [ ] Images lazy load
- [ ] Page scores 90+ on Lighthouse
- [ ] Accessibility: keyboard navigation works
- [ ] All links are functional

### 7. Common Patterns

#### Stats Card:
```html
<div class="stats-card">
    <div class="stats-card-label">Label</div>
    <div class="stats-card-value">1,234</div>
    <span class="stats-card-change positive">+20%</span>
    <div class="progress-custom">
        <div class="progress-bar-custom bg-success" style="width: 20%"></div>
    </div>
</div>
```

#### Dashboard Card:
```html
<div class="dashboard-card">
    <div class="dashboard-card-header">
        <h5 class="dashboard-card-title">Title</h5>
    </div>
    <div class="dashboard-card-body">
        <!-- Content -->
    </div>
</div>
```

#### Grid Layout:
```html
<div class="dashboard-grid grid-cols-4">
    <!-- Items -->
</div>
```

### 8. Working Process

1. **Claim Your Files**:
   - Check MIGRATION-PLAN.md for your assigned files
   - Update status to "🚧 IN PROGRESS" when starting

2. **Migration Steps**:
   - Read the original HTML file
   - Identify all Bootstrap 4 components
   - Create new file with Bootstrap 5 structure
   - Test thoroughly
   - Update MIGRATION-PLAN.md status to "✅ COMPLETED"

3. **Communication**:
   - Leave comments in code for complex changes
   - Document any issues in MIGRATION-PLAN.md Notes column
   - Create new CSS classes in dashboard.css if needed

### 9. Avoid These Common Mistakes

❌ Don't:
- Leave Bootstrap 4 classes in the code
- Forget to add defer to scripts
- Use inline styles (move to CSS files)
- Forget alt text on images
- Leave console.log statements
- Hardcode URLs (use relative paths)
- Forget mobile responsiveness

✅ Do:
- Test on multiple screen sizes
- Use semantic HTML
- Add proper ARIA labels
- Implement lazy loading
- Use CSS Grid for layouts
- Follow the established patterns

### 10. File Naming Convention

When creating new versions:
- Keep original filename
- Don't create `-new` or `-v2` versions
- Directly replace the old file
- Old files are already backed up in git

### 11. CSS Organization

Add page-specific styles to appropriate files:
- `dashboard.css` - Main styles and components
- `charts-layout.css` - Chart-specific styles
- `widgets.css` - Widget components
- Create new CSS files only if absolutely necessary

### 12. Quick Reference

```bash
# Bootstrap 4 → Bootstrap 5 Quick Replacements
data-toggle → data-bs-toggle
data-target → data-bs-target
data-dismiss → data-bs-dismiss
.ml- → .ms-
.mr- → .me-
.pl- → .ps-
.pr- → .pe-
.text-left → .text-start
.text-right → .text-end
.badge-primary → .bg-primary
.close → .btn-close
.sr-only → .visually-hidden
```

### 13. Standard Spacing and Layout Patterns

**Consistent spacing patterns to use across all pages:**

**Form Sections:**
- Section headers: `mb-4` (larger bottom margin for separation)
- Form rows: `mb-3` (standard form row spacing)
- Individual form elements: `mb-3` (consistent field spacing)
- Last form element in section: `mb-3` (maintain consistency)

**Form Actions:**
```html
<!-- Form Actions - Use this exact pattern -->
<div class="row">
    <div class="col-12">
        <hr class="my-4">
        <div class="d-flex gap-3">
            <button type="submit" class="btn btn-primary">
                <i class="bi bi-check-lg me-2"></i>[Action Text]
            </button>
            <button type="button" class="btn btn-outline-secondary">
                <i class="bi bi-x-lg me-2"></i>Cancel
            </button>
            <button type="reset" class="btn btn-outline-warning">
                <i class="bi bi-arrow-clockwise me-2"></i>Reset Form
            </button>
        </div>
    </div>
</div>
```

**Footer - Use this exact footer on ALL pages:**
```html
<!-- Footer -->
<footer class="dashboard-footer">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6">
                <p class="mb-0">&copy; 2025 Kiaalap. All rights reserved.</p>
            </div>
            <div class="col-md-6 text-md-end">
                <p class="mb-0">Built with <i class="bi bi-heart-fill text-danger"></i> for education</p>
            </div>
        </div>
    </div>
</footer>
```

**Button Spacing:**
- Use `gap-3` for button groups
- Primary action first, then secondary actions
- Consistent icon placement with `me-2` spacing

**Card Spacing:**
- Cards: `mb-3` for consistent vertical rhythm
- Card sections within forms: `mb-3` or `mb-4` for section breaks

## 📋 Final Checklist

Before marking any file as complete:

- [ ] All Bootstrap 4 syntax replaced
- [ ] Performance optimizations applied
- [ ] Mobile responsive tested
- [ ] No console errors
- [ ] Accessibility features added
- [ ] Code is clean and commented
- [ ] MIGRATION-PLAN.md updated
- [ ] File tested in browser

## 🚀 Start Migration

1. Read this document completely
2. Check your assigned files in MIGRATION-PLAN.md
3. Start with highest priority files
4. Follow the standards strictly
5. Test thoroughly before marking complete

Good luck with your migration tasks! 🎯