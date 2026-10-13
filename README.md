# Kiaalap - Free Bootstrap 5 Education Admin Dashboard Template

![Kiaalap Dashboard](public/images/kiaalap-dashboard-preview.jpg)

Kiaalap is a free, open-source Bootstrap 5 admin dashboard template designed specifically for educational institutions. Built with modern web technologies and featuring 63 ready-to-use pages, it provides everything needed to create a comprehensive education management system.

## 🎨 Demo

Check out the live demo: [Kiaalap Live Preview](https://colorlib.com/polygon/kiaalap/)

## ✨ Features

### Modern Technology Stack
- **Bootstrap 5.3.8** - Latest Bootstrap version with 100% jQuery-free architecture
- **Vite 8.3 Build System** - Lightning-fast development server and optimized production builds
- **Handlebars Templating** - Modular partials for maintainable code structure
- **Chart.js 4.5** - Beautiful, responsive charts replacing legacy Morris/C3/D3 libraries
- **Simple-DataTables 10.3** - Vanilla JavaScript data tables with no jQuery dependency
- **Bootstrap Icons 1.13.2** - 2,000+ icons loaded locally (no CDN dependencies)
- **Vanilla JavaScript** - Clean ES6+ code throughout the application
- **Zero third-party CDNs** - every script and stylesheet is served from your own origin
- **On-demand libraries** - heavy dependencies load only on the pages that use them

### Comprehensive Education Management
- **📊 Multiple Dashboard Layouts** - 3 unique dashboard designs for different use cases
- **👥 Student Management** - Complete student profiles, enrollment, and academic tracking
- **👨‍🏫 Professor Management** - Faculty profiles, course assignments, and schedules
- **📚 Course Management** - Course creation, scheduling, and curriculum management
- **📖 Library System** - Digital library asset management and tracking
- **🏢 Department Organization** - Department structure and administration
- **📧 Communication Tools** - Built-in messaging and notification system
- **📅 Event Calendar** - Academic calendar and event management
- **💰 Fee Management** - Student fees, payments, and financial tracking

### 63 Ready-to-Use Pages

#### Dashboards & Analytics
- Main Dashboard (3 variants)
- Analytics Dashboard
- Widget Collections

#### Academic Pages
- All Students / Student Profile / Add Student
- All Professors / Professor Profile / Add Professor
- All Courses / Course Info / Add Course
- All Departments / Department Details / Add Department
- Library Assets Management

#### UI Components
- Buttons, Alerts, Modals
- Tabs & Accordions
- Forms (Basic & Advanced)
- Tables (Static & Dynamic with DataTables)
- Charts (Bar, Line, Area, Pie, Sparklines)

#### Additional Features
- Authentication Pages (Login, Register, Lock Screen, Password Recovery)
- Error Pages (404, 500)
- Email/Mailbox System
- Maps Integration
- Invoice Templates
- Profile Pages

## 🚀 Quick Start

### Prerequisites

- Node.js 24.8+ (recommended), or Node.js 22.22+
- npm 10+ (the repository includes a package-lock.json)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/puikinsh/kiaalap.git
cd kiaalap
```

2. **Install dependencies**
```bash
npm ci
```

3. **Start development server**
```bash
npm run dev
```
The dashboard will open automatically at http://localhost:3000

4. **Build for production**
```bash
npm run build
```
Production files will be generated in the `dist/` directory

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint:html    # Validate HTML files
npm run lint:css     # Lint CSS, check SCSS formatting and compile Sass
npm run lint:js      # Lint JavaScript files
npm run format       # Format code with Prettier
npm run clean        # Clean build directory (cross-platform)
npm run page:new -- attendance  # Generate a page from starter.html
npm run check        # Lint, unit tests, build, rendered HTML and asset/size checks
npm test             # Unit tests
npm run test:browser # Browser regression tests (build first)
```

### Browser tests

After `npm run check`, install Chromium once and run the production browser suite:

```bash
npx playwright install chromium
npm run test:browser
```

To use an already installed Google Chrome instead, set `PLAYWRIGHT_CHANNEL=chrome`
when running the tests. External demo images and map tiles are stubbed in the suite;
the tests verify local scripts, charts, editors, calendar rendering, lazy library
styles and sidebar/form interactions. They do not test a backend.

### Dependency security

All retained direct dependencies use their latest stable npm release as checked on
2026-10-13, with one deliberate exception: Quill remains pinned to 2.0.2 because
2.0.3 has an unresolved [HTML export XSS advisory](https://github.com/advisories/GHSA-v3m3-f69x-jf25).
`npm audit` and `npm audit --omit=dev` both report zero vulnerabilities. Stylelint
and its unpatched `braces`/glob dependency chain have been removed.
Recheck advisories when updating packages. Sass belongs to development tooling;
`cssnano`, `terser` and `glob` have been removed in favor of built-in functionality.

### Stylesheet checks

`npm run lint:css` uses the [official ESLint CSS plugin](https://github.com/eslint/css)
to lint every file under `src/css`. It checks invalid properties and values,
empty blocks, at-rules, selectors, keyframes and font fallbacks. Bootstrap overrides
may use `!important`, vendor fallbacks are allowed, and custom properties may be
defined in another stylesheet. The icon font has a local text-font fallback exception.

SCSS files under `src/scss` are parsed and checked for formatting with Prettier.
Every SCSS entry point (a file not beginning with `_`) is compiled with Dart Sass;
imported partials are checked in their entry point’s context. This replaces
Stylelint’s SCSS-specific style rules with formatting and compilation checks.
File discovery uses Node’s filesystem APIs and explicit paths.

## 🏗️ Project Structure

```
kiaalap/
├── src/
│   ├── config/           # Shared site context and page/navigation metadata
│   ├── css/              # Custom stylesheets
│   ├── js/               # JavaScript modules
│   ├── partials/         # Handlebars partials (header, sidebar, footer)
│   ├── helpers/          # Handlebars helpers
│   └── scss/             # Sass source files
├── node_modules/         # Dependencies (all assets load locally)
├── *.html               # 63 HTML pages
├── vite.config.js       # Vite configuration
└── package.json         # Project dependencies
```

## 🎯 Key Features Explained

### 100% Modern Architecture
Completely rewritten from legacy Bootstrap 3/4 template to modern Bootstrap 5 with:
- Zero jQuery dependencies
- All assets from node_modules (no CDN dependencies)
- ES6+ JavaScript modules with tree-shaking
- Vite hot module replacement for instant updates
- Production builds use Vite’s native Oxc JavaScript and Lightning CSS minifiers
- `npm run check` validates JavaScript, SCSS, rendered HTML, local assets and a JavaScript size budget
- Browser regression tests cover all 63 pages plus key interactions

### On-Demand Libraries
Swiper, SimpleBar, Tom Select, CountUp, AOS and FullCalendar are **not** in the
main bundle. Each is fetched only when a page needs it. Chart.js is a separate
entry loaded automatically on pages with canvases or Chart.js demos; Day.js is
available through `Kiaalap.load('dayjs')`. The shared shell is about 27 kB gzipped
(previously 99 kB). Authentication pages use their own smaller scripts.

Either add the hook and let it auto-initialise:

| Hook | Library |
|------|---------|
| `.swiper` | Swiper |
| `[data-simplebar]` | SimpleBar |
| `.tom-select` | Tom Select |
| `.countup` with `data-count` | CountUp |
| `[data-aos]` | AOS |

…or load one yourself when you need the constructor:

```js
const Swiper = await Kiaalap.load('swiper');
new Swiper('#hero', { loop: true });

const { Calendar, plugins } = await Kiaalap.load('fullcalendar');

// For charts created later, such as inside a dialog:
const Chart = await Kiaalap.load('chart');

// Initialize hooks added dynamically; repeated calls skip initialized elements.
Kiaalap.initLazyLibraries(document.getElementById('main-content'));
```

### Handlebars Templating System
All dashboard pages use a consistent template structure with reusable partials:
- `{{> head}}` - Centralized meta tags, CSS imports from node_modules
- `{{> sidebar}}` - Navigation with automatic active state management
- `{{> header}}` - Top header with user menu and notifications
- `{{> footer}}` - Footer with current year and copyright
- `{{> scripts}}` - JavaScript module imports from node_modules

Customize shared metadata and the demo user in `src/config/site.js`. The header
uses local initials by default; set `user.avatar` to use your own image. Page titles,
breadcrumbs and expanded sidebar groups live in `src/config/pages.js`. Vite
automatically discovers HTML pages and includes Chart.js only where needed.

### Local Asset Management
All assets served from node_modules for:
- **Better Performance** - No external network requests
- **Reliability** - Works offline, no CDN downtime
- **Version Control** - Lock specific versions via package.json
- **Bundle Optimization** - Tree-shaking and code splitting

### Custom Grid System
Bootstrap 5 grid enhanced with custom dashboard-grid classes:
```css
.dashboard-grid.grid-cols-4  /* 4 columns → 1 on mobile */
.dashboard-row               /* 24px bottom margin */
```

### Responsive & Accessible
- Mobile-first responsive design
- ARIA labels and semantic HTML
- Keyboard navigation support
- Screen reader friendly

## 🛠️ Customization

### Changing Colors
Edit `src/scss/_theme.scss` to change Bootstrap’s primary color, font and border
radius. Extend the `with (...)` block in `src/scss/main.scss` for more Bootstrap
variables. Shell colors, sizes and spacing use CSS variables at the top of
`src/css/dashboard.css`.

### Adding New Pages
```bash
npm run page:new -- attendance
```

This copies `starter.html` to `attendance.html` and refuses to overwrite existing
pages. Edit the content, add a navigation link in `src/partials/sidebar.hbs`, and
optionally customize metadata in `src/config/pages.js`. Pages are discovered
automatically; restart the development server after adding a page. Names containing
`template` or `-new` are reserved by the build’s exclusion rules.

`starter.html` is also a minimal page you can preview directly. Chart pages keep
`window.Chart` for the existing inline demos. Custom modules should import Chart.js
or call `await Kiaalap.load('chart')`. `window.dayjs` and the Chart/Day.js exports
from `main.js` have been removed; import Day.js or use its lazy loader instead.

### Modifying Navigation
Edit `src/partials/sidebar.hbs` to customize the navigation menu structure.

## 📊 Built With

### Core Technologies
- [Bootstrap 5.3.8](https://getbootstrap.com/) - Modern CSS framework
- [Vite 8.3](https://vitejs.dev/) - Next generation build tool
- [Chart.js 4.5](https://www.chartjs.org/) - Flexible JavaScript charting
- [Handlebars](https://handlebarsjs.com/) - Semantic templating

### Key Libraries
- [Simple-DataTables 10.3](https://github.com/fiduswriter/Simple-DataTables) - Vanilla JS data tables
- [Bootstrap Icons 1.13.2](https://icons.getbootstrap.com/) - 2,000+ icon library
- [Quill 2.0.2](https://quilljs.com/) - Modern rich text editor
- [FullCalendar 7.1](https://fullcalendar.io/) - Event calendar
- [Leaflet 1.9](https://leafletjs.com/) - Interactive maps
- [Tom Select 2.6](https://tom-select.js.org/) - Modern select library
- [Cropper.js 2.3](https://fengyuanchen.github.io/cropperjs/) - Image cropping
- [CountUp.js 2.10](https://inorganik.github.io/countUp.js/) - Number animations
- [Prism 1.30](https://prismjs.com/) - Syntax highlighting

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Version History

- **v4.0.0** (2026) - Latest dependencies, smaller shell bundle, faster native builds, starter page generation, separate customization config, rendered HTML validation and browser regression tests
- **v3.0.0** (2026) - Security, performance & accessibility overhaul: all Dependabot alerts resolved, CDNs removed, on-demand library loading, zero HTML validation errors. **Contains breaking changes** — see [CHANGELOG.md](CHANGELOG.md)
- **v2.3.0** (2026) - Dependency updates, fixed dashboard screenshot, ESLint v10 flat config migration
- **v2.2.0** (2025) - All dependencies updated to latest versions, improved documentation
- **v2.1.0** (2025) - Mailbox system improvements, legacy asset cleanup, enhanced card styling
- **v2.0.0** (2025) - Complete modernization: Bootstrap 5, Vite build system, jQuery elimination
- **v1.0.0** (2018) - Original release with Bootstrap 3/4

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

## 📄 License

Kiaalap is licensed under The MIT License (MIT). Which means that you can use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the final products. But you always need to state that [Colorlib](https://colorlib.com/) is the original author of this template.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/puikinsh/kiaalap/issues).

## 💪 Support

If you find this template useful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 📢 Spreading the word
- 🤝 Contributing to the project

## 🏆 Credits

- Created by [Colorlib](https://colorlib.com/)
- Distributed by [DashboardPack.com](https://dashboardpack.com/)
- Original design and development by Aigars Silkalns

---

## About Colorlib

Colorlib is the #1 source for free & premium Bootstrap templates, WordPress themes, and UI kits. We create beautiful, easy-to-use templates and themes that help developers and designers build amazing websites.

- Website: [https://colorlib.com/](https://colorlib.com/)
- GitHub: [https://github.com/ColorlibHQ](https://github.com/ColorlibHQ)
- Twitter: [@colorlib](https://twitter.com/colorlib)

## About DashboardPack

[DashboardPack.com](https://dashboardpack.com/) is a marketplace for premium and free admin dashboard templates. We curate and distribute high-quality dashboard templates for various frameworks and use cases.

---

## 📚 Helpful Resources from Colorlib

Looking for more templates or web development resources? Check out these curated collections and articles from Colorlib:

### Admin Dashboard Collections
- [Best Free Bootstrap Admin Dashboard Templates](https://colorlib.com/wp/free-bootstrap-admin-dashboard-templates/) - Top free admin templates
- [Bootstrap Dashboard Templates](https://colorlib.com/wp/bootstrap-dashboard/) - Comprehensive list of dashboard templates
- [Free HTML5 Admin Dashboard Templates](https://colorlib.com/wp/free-html5-admin-dashboard-templates/) - HTML5-based admin panels
- [Angular Dashboard Templates](https://colorlib.com/wp/angular-dashboard-templates/) - For Angular developers
- [React Dashboard Templates](https://colorlib.com/wp/react-dashboard-templates/) - React-based admin panels
- [Vue Dashboard Templates](https://colorlib.com/wp/vue-dashboard-templates/) - Vue.js admin templates


### Bootstrap Resources
- [Bootstrap 5 Templates](https://colorlib.com/wp/bootstrap-5-templates/) - Latest Bootstrap 5 themes
- [Free Bootstrap Templates](https://colorlib.com/wp/free-bootstrap-templates/) - Comprehensive collection of free themes
- [Bootstrap Portfolio Templates](https://colorlib.com/wp/bootstrap-portfolio-templates/) - Portfolio and personal websites
- [Bootstrap Business Templates](https://colorlib.com/wp/bootstrap-business-templates/) - Business and corporate themes

### Web Development Tools & Resources
- [CSS Templates](https://colorlib.com/wp/css-templates/) - Pure CSS website templates
- [HTML Website Templates](https://colorlib.com/wp/html-website-templates/) - HTML5 website designs
- [JavaScript Templates](https://colorlib.com/wp/javascript-templates/) - JS-powered templates
- [WordPress Themes](https://colorlib.com/wp/wordpress-themes/) - Free WordPress themes

### Other Popular Admin Templates from Colorlib
- [Adminator](https://github.com/puikinsh/Adminator-admin-dashboard) - Responsive Admin Dashboard Template
- [AdminLTE](https://github.com/ColorlibHQ/AdminLTE) - Best open source admin dashboard & control panel theme
- [Gentelella](https://github.com/ColorlibHQ/gentelella) - Free Bootstrap 5 Admin Dashboard Template
- [Notika](https://colorlib.com/polygon/notika/) - Bootstrap 5 Admin Template
- [Nalika](https://colorlib.com/polygon/nalika/) - Bootstrap 5 Admin Template
- [Concept](https://colorlib.com/polygon/concept/) - Bootstrap 5 Admin Dashboard

### Colorlib Blog & Tutorials
- [Web Design Blog](https://colorlib.com/wp/) - Latest trends and tutorials in web design
- [Bootstrap Tutorials](https://colorlib.com/wp/cat/bootstrap/) - Learn Bootstrap development
- [Template Customization Guides](https://colorlib.com/wp/cat/tutorial/) - How-to guides for template customization

---

**Join the Colorlib Community:**
- 💬 [Support Forum](https://colorlibsupport.com) - Get help from the community
- 🐦 [Twitter](https://twitter.com/colorlib) - Follow for daily web design inspiration
- 📘 [Facebook](https://www.facebook.com/Colorlib) - Join our Facebook community
- 📺 [YouTube](https://www.youtube.com/c/Colorlib) - Video tutorials and showcases

Built with ❤️ by [Colorlib](https://colorlib.com/) and distributed by [DashboardPack](https://dashboardpack.com/)