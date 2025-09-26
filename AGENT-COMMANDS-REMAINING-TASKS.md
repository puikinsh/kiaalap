# Agent Commands for Remaining Tasks

## Critical Fixes Needed

### 1. Course Pages Group
```bash
# Check and restore course pages that may be truncated
# These pages likely have the same truncation issue as student pages
```

**Pages to check:**
- all-courses.html
- add-course.html
- edit-course.html
- course-info.html
- course-payment.html

**Agent Command:**
```
Check if all-courses.html, add-course.html, edit-course.html, course-info.html, and course-payment.html have complete content (should be 300+ lines each). If truncated (less than 100 lines), restore from archived-html/ or archived-backups/html-backups/. Then convert any Bootstrap grid classes (row g-3, col-lg-3, col-md-6) to dashboard grid system (dashboard-row, dashboard-grid, grid-cols-4). Ensure all pages use dashboard-card structure.
```

### 2. Professor Pages Group
```bash
# Check and restore professor pages
```

**Pages to check:**
- all-professors.html
- add-professor.html
- edit-professor.html
- professor-profile.html

**Agent Command:**
```
Check if all-professors.html, add-professor.html, edit-professor.html, and professor-profile.html have complete content. If any are truncated (less than 100 lines), restore from archived versions. Convert Bootstrap grid to dashboard grid system. Ensure professor cards use grid-cols-4 for consistent spacing.
```

### 3. Department Pages Group
```bash
# Check and restore department pages
```

**Pages to check:**
- departments.html
- add-department.html
- edit-department.html

**Agent Command:**
```
Check departments.html, add-department.html, and edit-department.html for content completeness. Restore from archives if truncated. Update to use dashboard grid system instead of Bootstrap grid classes.
```

### 4. Form Enhancement Pages
```bash
# Fix form pages that may still use Bootstrap grid
```

**Pages identified with Bootstrap grid:**
- accordion.html
- tabs.html
- modals-template.html
- register.html

**Agent Command:**
```
Update accordion.html, tabs.html, and register.html to use dashboard grid system. Replace all instances of "row g-3" with "dashboard-row", "col-lg-3 col-md-6" with appropriate grid-cols classes. Maintain form functionality while updating layout.
```

### 5. Error Pages Enhancement
```bash
# Error pages are minimal but may need content
```

**Pages:**
- 404.html (87 lines)
- 500.html (87 lines)

**Agent Command:**
```
Check if 404.html and 500.html need more content. These error pages might be intentionally minimal, but verify against archived versions. If they should have more content, restore from archives.
```

### 6. Mailbox Pages Group
```bash
# Check mailbox functionality pages
```

**Pages to check:**
- mailbox.html
- mailbox-compose.html
- mailbox-view.html

**Agent Command:**
```
Verify mailbox.html, mailbox-compose.html, and mailbox-view.html have complete content. Check for truncation and restore if needed. Ensure they use dashboard grid system for layout consistency.
```

### 7. Chart Pages Verification
```bash
# Verify all chart pages work with local Chart.js
```

**Pages:**
- bar-charts.html
- line-charts.html
- area-charts.html
- c3.html
- peity.html
- sparkline.html
- rounded-chart.html

**Agent Command:**
```
Verify that bar-charts.html, line-charts.html, area-charts.html, c3.html, peity.html, sparkline.html, and rounded-chart.html all work correctly with the local Chart.js installation. Check for any console errors and ensure charts render properly. Update any remaining CDN references to use local assets.
```

### 8. Data Pages Group
```bash
# Check data visualization pages
```

**Pages:**
- data-table.html
- data-maps.html
- static-table.html

**Agent Command:**
```
Check data-table.html, data-maps.html, and static-table.html for content completeness. Restore from archives if truncated. Ensure they use dashboard grid system and that any data visualization libraries are loaded from local assets, not CDN.
```

### 9. Authentication Pages
```bash
# Verify auth pages layout
```

**Pages:**
- login.html
- lock.html
- password-recovery.html

**Agent Command:**
```
Check login.html, lock.html, and password-recovery.html for proper layout. These might not need dashboard grid as they're typically full-screen auth pages, but verify they have complete content and proper styling.
```

### 10. Vite Configuration Updates
```bash
# Add all missing pages to Vite config
```

**Agent Command:**
```
Add all missing pages to vite.config.js including: course pages (all-courses, add-course, edit-course, course-info, course-payment), professor pages (all-professors, add-professor, edit-professor, professor-profile), department pages, mailbox pages, data pages, and auth pages. Each should have proper title, pageTitle, pageDescription, and breadcrumb configuration. Also add them to rollupOptions.input.
```

## Quick Check Commands

### Find all truncated files:
```bash
for file in *.html; do
  lines=$(wc -l < "$file")
  if [ $lines -lt 100 ]; then
    echo "$file: $lines lines"
  fi
done
```

### Find pages using Bootstrap grid:
```bash
grep -l "row g-3\|col-lg-3 col-md-6\|col-lg-4 col-md-6" *.html | grep -v ".backup"
```

### Check for CDN dependencies:
```bash
grep -h "cdn.jsdelivr\|unpkg.com\|cdnjs.cloudflare" *.html | sort -u
```

### Verify dashboard grid usage:
```bash
grep -l "dashboard-grid\|dashboard-row\|dashboard-card" *.html | wc -l
```

## Priority Order

1. **High Priority**: Course, Professor, Department pages (core functionality)
2. **Medium Priority**: Mailbox, Data visualization pages
3. **Low Priority**: Error pages, Authentication pages (may be intentionally minimal)

## Success Criteria

- [ ] All pages have complete content (300+ lines for feature pages)
- [ ] All pages use dashboard grid system consistently
- [ ] No CDN dependencies for core libraries
- [ ] All pages configured in vite.config.js
- [ ] Charts and visualizations work with local assets
- [ ] Forms maintain proper validation and functionality
- [ ] Consistent 20px spacing between cards/elements