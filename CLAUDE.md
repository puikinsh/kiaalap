# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kiaalap is a modern education management dashboard that has been fully modernized from a legacy Bootstrap 4 template to a Bootstrap 5 + Vite build system. It contains 65 HTML pages using Handlebars templating with a consistent, modular architecture.

## Build System & Commands

```bash
# Development server (port 3000, auto-opens browser)
npm run dev

# Production build (outputs to dist/)
npm run build

# Preview production build
npm run preview

# Linting
npm run lint:html    # HTML validation
npm run lint:css     # SCSS linting with Stylelint
npm run lint:js      # JavaScript linting with ESLint

# Code formatting
npm run format       # Prettier formatting for src/**/*.{js,scss,html}

# Clean build directory
npm run clean
```

## Architecture

### Core Technologies
- **Framework**: Bootstrap 5.3.8 (100% jQuery-free)
- **Build Tool**: Vite 7.1.7 with Handlebars templating
- **Charts**: Chart.js 4.5.0 (replaced legacy Morris.js/C3/D3)
- **Data Tables**: Simple-DataTables 9.x (vanilla JS, replaced jQuery DataTables)
- **Icons**: Bootstrap Icons 1.13.1 (replaced FontAwesome CDN)
- **CSS**: Sass preprocessor with PostCSS

### File Structure
```
kiaalap/
├── src/
│   ├── css/              # Custom stylesheets
│   ├── js/               # JavaScript modules
│   ├── partials/         # Handlebars partials (head, sidebar, header, footer, scripts)
│   ├── helpers/          # Handlebars helpers for templating
│   └── scss/             # Sass source files
├── node_modules/         # NPM packages (all assets load from here)
├── *.html               # 65 HTML pages using {{> partials}}
├── vite.config.js       # Vite configuration with page contexts
└── package.json         # Dependencies and scripts
```

### Handlebars Template System

All HTML pages use consistent Handlebars partials:
- `{{> head}}` - Meta tags, CSS imports from node_modules
- `{{> sidebar}}` - Navigation sidebar with active state management
- `{{> header}}` - Top header with user menu
- `{{> footer}}` - Footer content
- `{{> scripts}}` - JavaScript imports from node_modules

Page-specific context is managed in `vite.config.js` through the `getPageContext()` function, which handles:
- Navigation active states
- Page titles and breadcrumbs
- Additional CSS/JS requirements per page

### Key Modernization Changes

1. **Bootstrap 5 Migration**: All pages converted from Bootstrap 4 to Bootstrap 5
2. **jQuery Removal**: 100% jQuery-free! Vanilla JavaScript everywhere
3. **Local Dependencies**: All CDN references replaced with node_modules imports
4. **Consistent Grid System**: Custom dashboard-grid classes with responsive breakpoints
5. **Year Updates**: All dates updated to 2025/current year
6. **Spacing Standards**: 24px margin-bottom for dashboard cards

## Page Categories & Navigation States

Navigation states are automatically set based on filename patterns in `vite.config.js`:

- **Dashboard** (`dashboard.*`): index, index-1, index-2, analytics, widgets
- **Academic** (`academic.*`):
  - Professors: professor-profile, all-professors, add-professor
  - Students: all-students, student-profile, add-student
  - Courses: all-courses, course-info, add-course
  - Library: library-assets, add-library-assets
  - Departments: all-departments, add-department
- **Interface** (`interface.*`):
  - Components: buttons, alerts, modals, tabs, accordion
  - Forms: basic-form-element, advance-form-element, password-meter
  - Charts: bar-charts, line-charts, area-charts, c3, peity, sparkline
  - Tables: static-table, data-table
- **Communication**: mailbox-compose, mailbox-inbox
- **Authentication**: login, register, lock, password-recovery
- **Error Pages**: 404, 500

## Important Libraries & Their Usage

### Simple-DataTables (data-table.html)
- Vanilla JavaScript data tables with no jQuery dependency
- Installed via: `npm install simple-datatables`
- Initialized with: `new DataTable('#tableId', { options })`
- Features: sorting, searching, pagination, CSV export, print functionality
- Fully customizable with Bootstrap 5 styling

### Quill Editor (tinymc.html)
- Rich text editor loaded from node_modules/quill
- Multiple editor instances with different themes (snow, bubble)

### Chart.js (multiple pages)
- Replaces all legacy charting libraries
- Loaded from node_modules/chart.js/dist/chart.umd.min.js
- Used in: analytics, index variants, course-info, professor-profile, all chart pages

## Development Notes

- **Vite Dev Server**: Automatically handles Handlebars compilation and hot reload
- **Build Process**: Terser minification with console/debugger stripping in production
- **CSS Optimization**: PostCSS with autoprefixer and cssnano
- **Port**: Development server runs on port 3000
- **Auto-open**: Browser opens automatically on `npm run dev`

## Common Patterns

### Adding a New Page
1. Create the HTML file using Handlebars partials structure
2. Add page context in `vite.config.js` if needed (title, breadcrumbs, navigation state)
3. Include in build.rollupOptions.input if it needs separate bundling

### Dashboard Card Spacing
```css
.dashboard-card {
    margin-bottom: 24px;
}
```

### Grid System
```html
<div class="dashboard-grid grid-cols-2 gap-4">
    <!-- Responsive grid that becomes single column on mobile -->
</div>
```