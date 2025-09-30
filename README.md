# Kiaalap - Free Bootstrap 5 Education Admin Dashboard Template

![Kiaalap Dashboard](https://colorlib.com/wp/wp-content/uploads/sites/2/kiaalap-free-bootstrap-admin-dashboard.jpg)

Kiaalap is a free, open-source Bootstrap 5 admin dashboard template designed specifically for educational institutions. Built with modern web technologies and featuring 65+ ready-to-use pages, it provides everything needed to create a comprehensive education management system.

## 🎨 Demo

Check out the live demo: [Kiaalap Live Preview](https://colorlib.com/polygon/kiaalap/)

## ✨ Features

### Modern Technology Stack
- **Bootstrap 5.3.8** - Latest Bootstrap version without jQuery dependency
- **Vite Build System** - Lightning-fast development and optimized production builds
- **Handlebars Templating** - Modular and maintainable code structure
- **Chart.js 4.5** - Beautiful, responsive charts and graphs
- **Vanilla JavaScript** - Clean, modern JavaScript without unnecessary dependencies

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

### 65+ Ready-to-Use Pages

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

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/puikinsh/kiaalap.git
cd kiaalap
```

2. **Install dependencies**
```bash
npm install
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
npm run lint:css     # Lint SCSS files
npm run lint:js      # Lint JavaScript files
npm run format       # Format code with Prettier
npm run clean        # Clean build directory
```

## 🏗️ Project Structure

```
kiaalap/
├── src/
│   ├── css/              # Custom stylesheets
│   ├── js/               # JavaScript modules
│   ├── partials/         # Handlebars partials (header, sidebar, footer)
│   ├── helpers/          # Handlebars helpers
│   └── scss/             # Sass source files
├── node_modules/         # Dependencies (all assets load locally)
├── *.html               # 65 HTML pages
├── vite.config.js       # Vite configuration
└── package.json         # Project dependencies
```

## 🎯 Key Features Explained

### No jQuery Dependency
Unlike many admin templates, Kiaalap uses vanilla JavaScript for most functionality, only including jQuery where absolutely necessary (DataTables).

### Handlebars Templating
All pages use a consistent template structure with reusable partials:
- `{{> head}}` - Meta tags and CSS
- `{{> sidebar}}` - Navigation sidebar
- `{{> header}}` - Top header bar
- `{{> footer}}` - Footer content
- `{{> scripts}}` - JavaScript files

### Local Dependencies
All assets are served from node_modules - no external CDN dependencies for better performance and reliability.

### Responsive Design
Mobile-first approach with custom grid system that adapts beautifully to all screen sizes.

## 🛠️ Customization

### Changing Colors
Edit the Sass variables in `src/scss/_variables.scss` to customize the color scheme.

### Adding New Pages
1. Create new HTML file using the Handlebars template structure
2. Add page context in `vite.config.js` if needed
3. Include custom CSS/JS as required

### Modifying Navigation
Edit `src/partials/sidebar.hbs` to customize the navigation menu structure.

## 📊 Built With

- [Bootstrap 5](https://getbootstrap.com/) - CSS Framework
- [Chart.js](https://www.chartjs.org/) - JavaScript Charting
- [Vite](https://vitejs.dev/) - Build Tool
- [Handlebars](https://handlebarsjs.com/) - Templating
- [DataTables](https://datatables.net/) - Advanced Tables
- [Quill](https://quilljs.com/) - Rich Text Editor
- [Bootstrap Icons](https://icons.getbootstrap.com/) - Icon Library

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

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