# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kiaalap is a Bootstrap 4-based admin dashboard template with 50+ HTML pages. It's a static HTML/CSS/JS template without a backend framework or build system.

## Architecture

This is a static admin dashboard template with:
- **HTML Pages**: 60+ standalone HTML files in the root directory (index.html, analytics.html, etc.)
- **Assets Structure**:
  - `css/`: Contains Bootstrap, custom styles, and plugin-specific CSS
  - `js/`: JavaScript libraries including jQuery, Bootstrap, and various chart/widget libraries
  - `img/`: Image assets
  - `fonts/`: Font files
  - `pdf/`: PDF documentation

## Key Components

The template uses these major libraries:
- Bootstrap 4 for layout and UI components
- jQuery for DOM manipulation
- Morris.js, C3/D3, Peity, Sparkline for charts
- MetisMenu for navigation menus
- Various form enhancement plugins (Chosen, DatePicker, ColorPicker, etc.)

## Common Tasks

### Serving the Template
Since this is a static template, use any local web server:
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if http-server is installed)
npx http-server
```

### File Naming Convention
- Main dashboard variants: `index.html`, `index-1.html`, `index-2.html`
- Form pages: `add-*.html`, `edit-*.html`
- List/table pages: `all-*.html`
- Chart pages: `*-charts.html`

### CSS/JS Loading Pattern
All pages follow a consistent pattern for loading assets:
1. Bootstrap and Font Awesome
2. Plugin-specific CSS
3. Custom theme CSS (`main.css`, `style.css`, `responsive.css`)
4. jQuery, then Bootstrap JS
5. Plugin-specific JS
6. Custom initialization scripts

## Important Notes

- No build process or package manager - edit files directly
- All dependencies are included locally or via CDN
- Pages are self-contained - each HTML file includes all necessary CSS/JS references
- The template uses responsive design with mobile menu support via MeanMenu