import { defineConfig } from 'vite';
import { resolve } from 'path';
import { glob } from 'glob';
import handlebars from 'vite-plugin-handlebars';
import { helpers } from './src/helpers/handlebars-helpers.js';

// The handlebars plugin will handle .hbs files automatically
// We just need to list them for the build process
const hbsFiles = glob.sync('*.hbs');

// Get page-specific context
function getPageContext(filename) {
  // Navigation state logic
  const navigation = {
    dashboard: { active: false, expanded: false },
    academic: { professors: false, students: false, courses: false, library: false, departments: false },
    communication: { mailbox: false },
    interface: { components: false, forms: false, charts: false, tables: false },
    pages: { auth: false, errors: false }
  };

  // Set navigation state based on page
  if (['index', 'index-1', 'index-2', 'analytics', 'widgets'].includes(filename)) {
    navigation.dashboard.active = true;
    navigation.dashboard.expanded = true;
  } else if (filename.includes('professor')) {
    navigation.academic.professors = true;
  } else if (filename.includes('student')) {
    navigation.academic.students = true;
  } else if (filename.includes('course')) {
    navigation.academic.courses = true;
  } else if (filename.includes('library')) {
    navigation.academic.library = true;
  } else if (filename.includes('department')) {
    navigation.academic.departments = true;
  } else if (filename.includes('mailbox')) {
    navigation.communication.mailbox = true;
  } else if (['buttons', 'alerts', 'modals', 'tabs', 'accordion'].includes(filename)) {
    navigation.interface.components = true;
  } else if (filename.includes('form') || filename.includes('password-meter') || filename.includes('upload')) {
    navigation.interface.forms = true;
  } else if (filename.includes('chart') || filename.includes('c3') || filename.includes('peity')) {
    navigation.interface.charts = true;
  } else if (filename.includes('table')) {
    navigation.interface.tables = true;
  } else if (['login', 'register', 'lock', 'password-recovery'].includes(filename)) {
    navigation.pages.auth = true;
  } else if (['404', '500'].includes(filename)) {
    navigation.pages.errors = true;
  }

  // Page-specific configurations
  const pageConfigs = {
    'index': {
      title: 'Dashboard',
      pageTitle: 'Dashboard Overview',
      pageDescription: 'Welcome to your Kiaalap admin dashboard',
      showPageHeader: true,
      breadcrumb: [{ title: 'Dashboard', url: 'index.html' }],
      additionalCSS: ['src/css/charts-layout.css'],
      additionalJS: ['node_modules/chart.js/dist/chart.umd.js', 'src/js/charts-responsive.js']
    },
    'index-1': {
      title: 'Dashboard Variant 1',
      pageTitle: 'Dashboard Overview',
      pageDescription: 'Alternative dashboard layout with comprehensive analytics',
      showPageHeader: true,
      breadcrumb: [{ title: 'Dashboard', url: 'index-1.html' }],
      additionalCSS: ['src/css/charts-layout.css'],
      additionalJS: ['node_modules/chart.js/dist/chart.umd.js', 'src/js/charts-responsive.js']
    },
    'index-2': {
      title: 'Dashboard Variant 2',
      pageTitle: 'Dashboard Overview',
      pageDescription: 'Modern dashboard layout with enhanced visualization',
      showPageHeader: true,
      breadcrumb: [{ title: 'Dashboard', url: 'index-2.html' }],
      additionalCSS: ['src/css/charts-layout.css'],
      additionalJS: ['node_modules/chart.js/dist/chart.umd.js', 'src/js/charts-responsive.js']
    },
    'analytics': {
      title: 'Analytics Dashboard',
      pageTitle: 'Analytics & Reports',
      pageDescription: 'Comprehensive analytics dashboard with detailed metrics',
      showPageHeader: true,
      breadcrumb: [{ title: 'Analytics', url: 'analytics.html' }],
      additionalCSS: ['src/css/charts-layout.css'],
      additionalJS: ['node_modules/chart.js/dist/chart.umd.js', 'src/js/charts-responsive.js']
    },
    'modals': {
      title: 'Modal Components',
      pageTitle: 'Modal Components',
      pageDescription: 'Bootstrap 5 modal examples for dialogs, forms, and confirmations',
      showPageHeader: true,
      breadcrumb: [
        { title: 'Interface', url: '#' },
        { title: 'Modal Components', url: 'modals.html' }
      ]
    },
    'buttons': {
      title: 'Button Components',
      pageTitle: 'Button Components',
      pageDescription: 'Bootstrap 5 button styles and variants',
      showPageHeader: true,
      breadcrumb: [
        { title: 'Interface', url: '#' },
        { title: 'Button Components', url: 'buttons.html' }
      ]
    },
    'alerts': {
      title: 'Alert Components',
      pageTitle: 'Alert Components',
      pageDescription: 'Bootstrap 5 alert components for notifications',
      showPageHeader: true,
      breadcrumb: [
        { title: 'Interface', url: '#' },
        { title: 'Alert Components', url: 'alerts.html' }
      ]
    },
    'bar-charts': {
      title: 'Bar Charts',
      pageTitle: 'Bar Chart Examples',
      pageDescription: 'Interactive bar charts with Chart.js',
      showPageHeader: true,
      breadcrumb: [
        { title: 'Charts', url: '#' },
        { title: 'Bar Charts', url: 'bar-charts.html' }
      ],
      additionalCSS: ['src/css/charts-layout.css'],
      additionalJS: ['node_modules/chart.js/dist/chart.umd.js', 'src/js/charts-responsive.js']
    },
    'line-charts': {
      title: 'Line Charts',
      pageTitle: 'Line Chart Examples',
      pageDescription: 'Interactive line charts with Chart.js',
      showPageHeader: true,
      breadcrumb: [
        { title: 'Charts', url: '#' },
        { title: 'Line Charts', url: 'line-charts.html' }
      ],
      additionalCSS: ['src/css/charts-layout.css'],
      additionalJS: ['node_modules/chart.js/dist/chart.umd.js', 'src/js/charts-responsive.js']
    },
    'area-charts': {
      title: 'Area Charts',
      pageTitle: 'Area Chart Examples',
      pageDescription: 'Interactive area charts with Chart.js',
      showPageHeader: true,
      breadcrumb: [
        { title: 'Charts', url: '#' },
        { title: 'Area Charts', url: 'area-charts.html' }
      ],
      additionalCSS: ['src/css/charts-layout.css'],
      additionalJS: ['node_modules/chart.js/dist/chart.umd.js', 'src/js/charts-responsive.js']
    },
    'library-assets': {
      title: 'Library Assets',
      pageTitle: 'Library Assets Management',
      pageDescription: 'Manage library books, journals, and digital resources',
      showPageHeader: true,
      breadcrumb: [
        { title: 'Academic', url: '#' },
        { title: 'Library Assets', url: 'library-assets.html' }
      ]
    },
    'add-library-assets': {
      title: 'Add Library Asset',
      pageTitle: 'Add New Library Asset',
      pageDescription: 'Register a new book, journal, or digital resource',
      showPageHeader: true,
      breadcrumb: [
        { title: 'Academic', url: '#' },
        { title: 'Library Assets', url: 'library-assets.html' },
        { title: 'Add Asset', url: 'add-library-assets.html' }
      ]
    },
    'edit-library-assets': {
      title: 'Edit Library Asset',
      pageTitle: 'Edit Library Asset',
      pageDescription: 'Update library asset information and details',
      showPageHeader: true,
      breadcrumb: [
        { title: 'Academic', url: '#' },
        { title: 'Library Assets', url: 'library-assets.html' },
        { title: 'Edit Asset', url: 'edit-library-assets.html' }
      ]
    },
    'c3': {
      title: 'C3 Charts',
      pageTitle: 'C3 Chart Examples',
      pageDescription: 'Interactive charts with Chart.js',
      showPageHeader: true,
      breadcrumb: [
        { title: 'Charts', url: '#' },
        { title: 'C3 Charts', url: 'c3.html' }
      ],
      additionalCSS: ['src/css/charts-layout.css'],
      additionalJS: ['node_modules/chart.js/dist/chart.umd.js', 'src/js/charts-responsive.js']
    },
    'peity': {
      title: 'Peity Charts',
      pageTitle: 'Peity Mini Charts',
      pageDescription: 'Mini charts for dashboards',
      showPageHeader: true,
      breadcrumb: [
        { title: 'Charts', url: '#' },
        { title: 'Peity Charts', url: 'peity.html' }
      ],
      additionalCSS: ['src/css/charts-layout.css'],
      additionalJS: ['node_modules/chart.js/dist/chart.umd.js', 'src/js/charts-responsive.js']
    }
  };

  // Default configuration
  const defaultConfig = {
    title: filename.charAt(0).toUpperCase() + filename.slice(1).replace(/-/g, ' '),
    pageTitle: filename.charAt(0).toUpperCase() + filename.slice(1).replace(/-/g, ' '),
    showPageHeader: true,
    breadcrumb: [{ title: filename.charAt(0).toUpperCase() + filename.slice(1).replace(/-/g, ' ') }]
  };

  return {
    page: filename,
    navigation,
    ...(pageConfigs[filename] || defaultConfig)
  };
}

export default defineConfig({
  root: './',
  base: './',
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      helpers: helpers,
      context: (pagePath) => {
        // Get the filename without path and extension
        const filename = pagePath.split('/').pop().replace('.html', '');

        // Base context for all pages
        const baseContext = {
          currentYear: new Date().getFullYear(),
          meta: {
            description: 'Kiaalap - Modern Education Management Dashboard for Universities',
            keywords: 'education, dashboard, university, management, admin',
            author: 'Kiaalap'
          },
          user: {
            name: 'Sarah Johnson',
            email: 'sarah.johnson@kiaalap.edu',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
            messageCount: 5,
            hasNotifications: true,
            messages: [
              {
                name: 'Sarah Johnson',
                message: 'Can you review my thesis?',
                time: '2 min ago',
                avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=10b981&color=fff'
              },
              {
                name: 'Mike Chen',
                message: 'Meeting at 3 PM today',
                time: '1 hour ago',
                avatar: 'https://ui-avatars.com/api/?name=Mike+Chen&background=6366f1&color=fff'
              }
            ],
            notifications: [
              {
                type: 'primary',
                icon: 'bi-calendar-check',
                title: 'New Event',
                message: 'Science Fair on March 15',
                time: '5 minutes ago'
              },
              {
                type: 'success',
                icon: 'bi-check-circle',
                title: 'Assignment Submitted',
                message: 'John submitted his project',
                time: '2 hours ago'
              },
              {
                type: 'warning',
                icon: 'bi-exclamation-triangle',
                title: 'System Alert',
                message: 'Database backup completed',
                time: 'Yesterday'
              }
            ]
          }
        };

        // Page-specific context
        const pageContext = getPageContext(filename);

        return { ...baseContext, ...pageContext };
      }
    })
  ],
  build: {
    outDir: 'dist',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        modals: resolve(__dirname, 'modals.html'),
        buttons: resolve(__dirname, 'buttons.html'),
        alerts: resolve(__dirname, 'alerts.html'),
        'library-assets': resolve(__dirname, 'library-assets.html'),
        'add-library-assets': resolve(__dirname, 'add-library-assets.html'),
        'edit-library-assets': resolve(__dirname, 'edit-library-assets.html')
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    alias: {
      '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
      '~@fortawesome': resolve(__dirname, 'node_modules/@fortawesome'),
      '@': resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    include: ['jquery', 'bootstrap', '@popperjs/core']
  }
});