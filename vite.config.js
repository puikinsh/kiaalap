import { defineConfig } from 'vite';
import { resolve } from 'path';
import { glob } from 'glob';
import handlebars from 'vite-plugin-handlebars';
import { helpers } from './src/helpers/handlebars-helpers.js';

// Vite 8 resolves the config with `configLoader: 'native'`, where __dirname is
// unavailable. import.meta.dirname is the supported replacement.
const rootDir = import.meta.dirname;

// Which sidebar group each page belongs to.
//
// The keys below are the exact paths src/partials/sidebar.hbs tests with
// `{{#if ...}}` (e.g. `{{#if academic.students}}`), and the group object is
// spread into the template context at the top level so those tests resolve.
// Previously this lived under a `navigation` key that no partial ever read, so
// every group rendered collapsed regardless of the current page.
const NAV_GROUPS = {
  dashboard: ['index', 'index-1', 'index-2', 'analytics', 'widgets', 'events'],
  'academic.professors': ['all-professors', 'add-professor', 'edit-professor', 'professor-profile'],
  'academic.students': ['all-students', 'add-student', 'edit-student', 'student-profile'],
  'academic.courses': ['all-courses', 'add-course', 'edit-course', 'course-info', 'course-payment'],
  'academic.library': ['library-assets', 'add-library-assets', 'edit-library-assets'],
  'academic.departments': ['departments', 'add-department', 'edit-department'],
  'communication.mailbox': ['mailbox', 'mailbox-compose', 'mailbox-view'],
  'interface.components': ['buttons', 'alerts', 'modals', 'tabs', 'accordion'],
  'interface.forms': [
    'basic-form-element',
    'advance-form-element',
    'password-meter',
    'multi-upload',
    'images-cropper'
  ],
  'interface.charts': [
    'line-charts',
    'area-charts',
    'bar-charts',
    'c3',
    'peity',
    'rounded-chart',
    'sparkline'
  ],
  'interface.tables': ['static-table', 'data-table', 'code-editor'],
  'tools.ui': ['preloader', 'notifications', 'tree-view'],
  'tools.viewers': ['pdf-viewer'],
  'tools.maps': ['google-map', 'data-maps'],
  'pages.auth': ['login', 'register', 'lock', 'password-recovery'],
  'pages.errors': ['404', '500']
};

/** Build the nested booleans sidebar.hbs expects, e.g. { academic: { students: true } }. */
function getNavigationState(filename) {
  const state = {};

  for (const [groupPath, pages] of Object.entries(NAV_GROUPS)) {
    const isActive = pages.includes(filename);
    const segments = groupPath.split('.');

    let node = state;
    segments.forEach((segment, index) => {
      if (index === segments.length - 1) {
        // Only assign truthy leaves; an empty object would make `{{#if group}}`
        // pass, since Handlebars treats any object as truthy.
        if (isActive) node[segment] = true;
      } else {
        node[segment] = node[segment] || {};
        node = node[segment];
      }
    });
  }

  return state;
}

// Get page-specific context
function getPageContext(filename) {
  const navigation = getNavigationState(filename);

  // Page-specific configurations
  const pageConfigs = {
    'index': {
      title: 'Dashboard',
      pageTitle: 'Dashboard Overview',
      pageDescription: 'Welcome to your Kiaalap admin dashboard',
      showPageHeader: true,
      breadcrumb: [{ title: 'Dashboard', url: 'index.html' }],
      additionalCSS: ['src/css/charts-layout.css']
    },
    'index-1': {
      title: 'Dashboard Variant 1',
      pageTitle: 'Dashboard Overview',
      pageDescription: 'Alternative dashboard layout with comprehensive analytics',
      showPageHeader: true,
      breadcrumb: [{ title: 'Dashboard', url: 'index-1.html' }],
      additionalCSS: ['src/css/charts-layout.css']
    },
    'index-2': {
      title: 'Dashboard Variant 2',
      pageTitle: 'Dashboard Overview',
      pageDescription: 'Modern dashboard layout with enhanced visualization',
      showPageHeader: true,
      breadcrumb: [{ title: 'Dashboard', url: 'index-2.html' }],
      additionalCSS: ['src/css/charts-layout.css']
    },
    'analytics': {
      title: 'Analytics Dashboard',
      pageTitle: 'Analytics & Reports',
      pageDescription: 'Comprehensive analytics dashboard with detailed metrics',
      showPageHeader: true,
      breadcrumb: [{ title: 'Analytics', url: 'analytics.html' }],
      additionalCSS: ['src/css/charts-layout.css']
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
      additionalCSS: ['src/css/charts-layout.css']
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
      additionalCSS: ['src/css/charts-layout.css']
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
      additionalCSS: ['src/css/charts-layout.css']
    },
    'course-info': {
      title: 'Course Info',
      pageTitle: 'Course Information',
      pageDescription: 'Course details, attendance and grade breakdowns',
      showPageHeader: true,
      breadcrumb: [
        { title: 'Academic', url: '#' },
        { title: 'All Courses', url: 'all-courses.html' },
        { title: 'Course Info', url: 'course-info.html' }
      ],
      additionalCSS: ['src/css/charts-layout.css']
    },
    'professor-profile': {
      title: 'Professor Profile',
      pageTitle: 'Professor Profile',
      pageDescription: 'Faculty profile with performance and rating charts',
      showPageHeader: true,
      breadcrumb: [
        { title: 'Academic', url: '#' },
        { title: 'All Professors', url: 'all-professors.html' },
        { title: 'Professor Profile', url: 'professor-profile.html' }
      ],
      additionalCSS: ['src/css/charts-layout.css']
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
      additionalCSS: ['src/css/charts-layout.css']
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
      additionalCSS: ['src/css/charts-layout.css']
    },
    'sparkline': {
      title: 'Sparkline Charts',
      pageTitle: 'Sparkline Mini Charts',
      pageDescription: 'Inline mini charts for metrics',
      showPageHeader: true,
      breadcrumb: [
        { title: 'Charts', url: '#' },
        { title: 'Sparkline Charts', url: 'sparkline.html' }
      ],
      additionalCSS: ['src/css/charts-layout.css']
    },
    'rounded-chart': {
      title: 'Rounded Charts',
      pageTitle: 'Rounded Chart Examples',
      pageDescription: 'Circular progress and rounded charts',
      showPageHeader: true,
      breadcrumb: [
        { title: 'Charts', url: '#' },
        { title: 'Rounded Charts', url: 'rounded-chart.html' }
      ],
      additionalCSS: ['src/css/charts-layout.css']
    },
    'mailbox': {
      title: 'Mailbox',
      pageTitle: 'Mailbox',
      pageDescription: 'Manage your messages and communications',
      showPageHeader: true,
      breadcrumb: [
        { title: 'Communication', url: '#' },
        { title: 'Mailbox', url: 'mailbox.html' }
      ]
    },
    'mailbox-view': {
      title: 'View Message',
      pageTitle: 'Message Details',
      pageDescription: 'View message content and attachments',
      showPageHeader: true,
      breadcrumb: [
        { title: 'Communication', url: '#' },
        { title: 'Mailbox', url: 'mailbox.html' },
        { title: 'View Message', url: 'mailbox-view.html' }
      ]
    },
    'mailbox-compose': {
      title: 'Compose Message',
      pageTitle: 'Compose New Message',
      pageDescription: 'Write and send a new message',
      showPageHeader: true,
      breadcrumb: [
        { title: 'Communication', url: '#' },
        { title: 'Mailbox', url: 'mailbox.html' },
        { title: 'Compose', url: 'mailbox-compose.html' }
      ]
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
    // Spread at the top level: sidebar.hbs tests `{{#if academic.students}}`,
    // not `{{#if navigation.academic.students}}`.
    ...navigation,
    ...(pageConfigs[filename] || defaultConfig)
  };
}

export default defineConfig({
  root: './',
  base: './',
  plugins: [
    handlebars({
      partialDirectory: resolve(rootDir, 'src/partials'),
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
      input: Object.fromEntries(
        glob.sync('*.html')
          .filter(file => !file.includes('template') && !file.includes('-new'))
          .map(file => [
            file.replace(/\.html$/, ''),
            resolve(rootDir, file)
          ])
      )
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Resolve `@use 'bootstrap/scss/bootstrap'` etc. from node_modules.
        // Loading through a load path (rather than a relative ../../ path) is
        // what lets quietDeps recognise these as dependencies and silence the
        // Dart Sass deprecation warnings Bootstrap 5 still emits internally.
        loadPaths: ['node_modules'],
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
      '~bootstrap': resolve(rootDir, 'node_modules/bootstrap'),
      '@': resolve(rootDir, './src')
    }
  },
  optimizeDeps: {
    include: ['bootstrap', '@popperjs/core']
  }
});