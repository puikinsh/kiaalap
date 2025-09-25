#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Configuration
const config = {
  sourceDir: projectRoot,
  outputDir: projectRoot,
  backupDir: path.join(projectRoot, 'html-backups'),
  htmlPattern: '*.html',
  excludeFiles: [
    'modals.html', // Already converted
    'index-bs5.html',
    'index-clean.html',
    'index-dashboard.html',
    'index-dashboard-clean.html',
    'dashboard-final.html',
    'dashboard-optimized.html',
    'index-final.html',
    'index-fixed.html',
    'index-header-*.html',
    'index-modern.html',
    'temp-add.html',
    'test-*.html'
  ]
};

// Page metadata and configuration
const pageMetadata = {
  // Dashboard pages
  'index': {
    title: 'Dashboard',
    pageTitle: 'Dashboard Overview',
    pageDescription: 'Welcome to your Kiaalap admin dashboard',
    showPageHeader: true,
    breadcrumb: [{ title: 'Dashboard', url: 'index.html' }]
  },
  'index-1': {
    title: 'Dashboard v2',
    pageTitle: 'Dashboard v2',
    pageDescription: 'Advanced dashboard with enhanced metrics',
    showPageHeader: true,
    breadcrumb: [{ title: 'Dashboard v2', url: 'index-1.html' }]
  },
  'index-2': {
    title: 'Dashboard v3',
    pageTitle: 'Dashboard v3',
    pageDescription: 'Modern dashboard with latest features',
    showPageHeader: true,
    breadcrumb: [{ title: 'Dashboard v3', url: 'index-2.html' }]
  },
  'analytics': {
    title: 'Analytics',
    pageTitle: 'Analytics Dashboard',
    pageDescription: 'Comprehensive analytics and reporting',
    showPageHeader: true,
    breadcrumb: [{ title: 'Analytics', url: 'analytics.html' }]
  },
  'widgets': {
    title: 'Widgets',
    pageTitle: 'Dashboard Widgets',
    pageDescription: 'Interactive dashboard widgets and components',
    showPageHeader: true,
    breadcrumb: [{ title: 'Widgets', url: 'widgets.html' }]
  },

  // Academic pages
  'all-students': {
    title: 'All Students',
    pageTitle: 'Student Management',
    pageDescription: 'View and manage all students',
    showPageHeader: true,
    breadcrumb: [
      { title: 'Academic', url: '#' },
      { title: 'Students', url: '#' },
      { title: 'All Students', url: 'all-students.html' }
    ]
  },
  'add-student': {
    title: 'Add Student',
    pageTitle: 'Add New Student',
    pageDescription: 'Register a new student in the system',
    showPageHeader: true,
    breadcrumb: [
      { title: 'Academic', url: '#' },
      { title: 'Students', url: '#' },
      { title: 'Add Student', url: 'add-student.html' }
    ]
  },
  'edit-student': {
    title: 'Edit Student',
    pageTitle: 'Edit Student Information',
    pageDescription: 'Modify student details and academic records',
    showPageHeader: true,
    breadcrumb: [
      { title: 'Academic', url: '#' },
      { title: 'Students', url: '#' },
      { title: 'Edit Student', url: 'edit-student.html' }
    ]
  },
  'student-profile': {
    title: 'Student Profile',
    pageTitle: 'Student Profile',
    pageDescription: 'View detailed student information and academic progress',
    showPageHeader: true,
    breadcrumb: [
      { title: 'Academic', url: '#' },
      { title: 'Students', url: '#' },
      { title: 'Student Profile', url: 'student-profile.html' }
    ]
  },

  // Interface components
  'buttons': {
    title: 'Button Components',
    pageTitle: 'Button Components',
    pageDescription: 'Bootstrap 5 button styles and variants',
    showPageHeader: true,
    breadcrumb: [
      { title: 'Interface', url: '#' },
      { title: 'Components', url: '#' },
      { title: 'Buttons', url: 'buttons.html' }
    ]
  },
  'alerts': {
    title: 'Alert Components',
    pageTitle: 'Alert Components',
    pageDescription: 'Bootstrap 5 alert components for notifications',
    showPageHeader: true,
    breadcrumb: [
      { title: 'Interface', url: '#' },
      { title: 'Components', url: '#' },
      { title: 'Alerts', url: 'alerts.html' }
    ]
  },
  'accordion': {
    title: 'Accordion Components',
    pageTitle: 'Accordion Components',
    pageDescription: 'Collapsible accordion panels',
    showPageHeader: true,
    breadcrumb: [
      { title: 'Interface', url: '#' },
      { title: 'Components', url: '#' },
      { title: 'Accordion', url: 'accordion.html' }
    ]
  },
  'tabs': {
    title: 'Tab Components',
    pageTitle: 'Tab Components',
    pageDescription: 'Tabbed content panels and navigation',
    showPageHeader: true,
    breadcrumb: [
      { title: 'Interface', url: '#' },
      { title: 'Components', url: '#' },
      { title: 'Tabs', url: 'tabs.html' }
    ]
  },

  // Form pages
  'basic-form-element': {
    title: 'Basic Forms',
    pageTitle: 'Basic Form Elements',
    pageDescription: 'Standard form inputs and controls',
    showPageHeader: true,
    breadcrumb: [
      { title: 'Interface', url: '#' },
      { title: 'Forms', url: '#' },
      { title: 'Basic Forms', url: 'basic-form-element.html' }
    ]
  },
  'advance-form-element': {
    title: 'Advanced Forms',
    pageTitle: 'Advanced Form Elements',
    pageDescription: 'Enhanced form controls and validation',
    showPageHeader: true,
    breadcrumb: [
      { title: 'Interface', url: '#' },
      { title: 'Forms', url: '#' },
      { title: 'Advanced Forms', url: 'advance-form-element.html' }
    ]
  },

  // Chart pages
  'line-charts': {
    title: 'Line Charts',
    pageTitle: 'Line Chart Components',
    pageDescription: 'Interactive line charts and graphs',
    showPageHeader: true,
    breadcrumb: [
      { title: 'Interface', url: '#' },
      { title: 'Charts', url: '#' },
      { title: 'Line Charts', url: 'line-charts.html' }
    ]
  },
  'bar-charts': {
    title: 'Bar Charts',
    pageTitle: 'Bar Chart Components',
    pageDescription: 'Interactive bar charts and histograms',
    showPageHeader: true,
    breadcrumb: [
      { title: 'Interface', url: '#' },
      { title: 'Charts', url: '#' },
      { title: 'Bar Charts', url: 'bar-charts.html' }
    ]
  },
  'area-charts': {
    title: 'Area Charts',
    pageTitle: 'Area Chart Components',
    pageDescription: 'Filled area charts and stacked graphs',
    showPageHeader: true,
    breadcrumb: [
      { title: 'Interface', url: '#' },
      { title: 'Charts', url: '#' },
      { title: 'Area Charts', url: 'area-charts.html' }
    ]
  },

  // Authentication pages
  'login': {
    title: 'Login',
    pageTitle: 'Login',
    pageDescription: 'Sign in to your account',
    showPageHeader: false
  },
  'register': {
    title: 'Register',
    pageTitle: 'Create Account',
    pageDescription: 'Register for a new account',
    showPageHeader: false
  },
  'lock': {
    title: 'Lock Screen',
    pageTitle: 'Lock Screen',
    pageDescription: 'Enter your password to unlock',
    showPageHeader: false
  },
  'password-recovery': {
    title: 'Password Recovery',
    pageTitle: 'Forgot Password',
    pageDescription: 'Reset your password',
    showPageHeader: false
  },

  // Error pages
  '404': {
    title: '404 - Page Not Found',
    pageTitle: 'Page Not Found',
    pageDescription: 'The page you are looking for does not exist',
    showPageHeader: true
  },
  '500': {
    title: '500 - Server Error',
    pageTitle: 'Internal Server Error',
    pageDescription: 'Something went wrong on our end',
    showPageHeader: true
  }
};

// Utility functions
function shouldExcludeFile(filename) {
  return config.excludeFiles.some(pattern => {
    if (pattern.includes('*')) {
      const regex = new RegExp(pattern.replace(/\*/g, '.*'));
      return regex.test(filename);
    }
    return filename === pattern;
  });
}

function extractContentBetweenTags(html, startTag, endTag) {
  const startIndex = html.indexOf(startTag);
  const endIndex = html.indexOf(endTag);

  if (startIndex === -1 || endIndex === -1) {
    return null;
  }

  return html.substring(startIndex + startTag.length, endIndex).trim();
}

function extractPageSpecificStyles(html) {
  const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/);
  if (styleMatch) {
    return styleMatch[1].trim();
  }
  return null;
}

function extractPageSpecificScripts(html) {
  const scripts = [];
  const scriptRegex = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/g;
  let match;

  while ((match = scriptRegex.exec(html)) !== null) {
    if (match[1].trim()) {
      scripts.push(match[1].trim());
    }
  }

  return scripts.length > 0 ? scripts.join('\n\n') : null;
}

function extractMainContent(html) {
  // Try different content extraction patterns
  const patterns = [
    // Dashboard content pattern
    /<main[^>]*class="dashboard-content"[^>]*>[\s\S]*?<div[^>]*class="container-fluid"[^>]*>([\s\S]*?)<\/div>[\s\S]*?<\/main>/,
    // General main content
    /<main[^>]*>([\s\S]*?)<\/main>/,
    // Content after header, before footer
    /<\/nav>[\s\S]*?<main[^>]*>([\s\S]*?)<\/main>[\s\S]*?<footer/,
    // Fallback: content between main wrapper start and footer
    /<div[^>]*class="main-wrapper"[^>]*>[\s\S]*?<main[^>]*>([\s\S]*?)<\/main>[\s\S]*?<footer/
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) {
      let content = match[1].trim();

      // Remove page header if it exists (will be handled by layout)
      content = content.replace(/<div[^>]*class="page-header"[^>]*>[\s\S]*?<\/div>/, '').trim();

      return content;
    }
  }

  // If no pattern matches, extract everything between body tags as fallback
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  if (bodyMatch) {
    return bodyMatch[1].trim();
  }

  return html;
}

function createHandlebarsTemplate(filename, html) {
  const pageName = filename.replace('.html', '');
  const metadata = pageMetadata[pageName] || {
    title: pageName.charAt(0).toUpperCase() + pageName.slice(1).replace(/-/g, ' '),
    pageTitle: pageName.charAt(0).toUpperCase() + pageName.slice(1).replace(/-/g, ' '),
    showPageHeader: true,
    breadcrumb: [{ title: pageName.charAt(0).toUpperCase() + pageName.slice(1).replace(/-/g, ' ') }]
  };

  // Extract page-specific content
  const pageSpecificStyles = extractPageSpecificStyles(html);
  const pageSpecificJS = extractPageSpecificScripts(html);
  const mainContent = extractMainContent(html);

  // Build frontmatter
  const frontmatter = {
    layout: 'base',
    ...metadata
  };

  if (pageSpecificStyles) {
    frontmatter.pageSpecificStyles = pageSpecificStyles;
  }

  if (pageSpecificJS) {
    frontmatter.pageSpecificJS = pageSpecificJS;
  }

  // Create Handlebars template
  let template = '---\n';

  // Add frontmatter
  for (const [key, value] of Object.entries(frontmatter)) {
    if (typeof value === 'string' && (value.includes('\n') || value.includes('|'))) {
      template += `${key}: |\n`;
      const lines = value.split('\n');
      for (const line of lines) {
        template += `  ${line}\n`;
      }
    } else if (Array.isArray(value)) {
      template += `${key}:\n`;
      for (const item of value) {
        if (typeof item === 'object') {
          template += `  - title: "${item.title}"\n`;
          if (item.url) {
            template += `    url: "${item.url}"\n`;
          }
        } else {
          template += `  - ${item}\n`;
        }
      }
    } else if (typeof value === 'object') {
      template += `${key}:\n`;
      for (const [subKey, subValue] of Object.entries(value)) {
        template += `  ${subKey}: "${subValue}"\n`;
      }
    } else {
      template += `${key}: ${typeof value === 'string' ? `"${value}"` : value}\n`;
    }
  }

  template += '---\n\n';
  template += mainContent;

  return template;
}

async function convertHtmlToHandlebars() {
  console.log('🔄 Starting HTML to Handlebars conversion...');

  // Create backup directory
  if (!fs.existsSync(config.backupDir)) {
    fs.mkdirSync(config.backupDir, { recursive: true });
    console.log(`📁 Created backup directory: ${config.backupDir}`);
  }

  // Find all HTML files
  const htmlFiles = glob.sync(path.join(config.sourceDir, config.htmlPattern));
  console.log(`📄 Found ${htmlFiles.length} HTML files`);

  let converted = 0;
  let skipped = 0;

  for (const htmlFile of htmlFiles) {
    const filename = path.basename(htmlFile);
    const pageName = filename.replace('.html', '');

    // Skip excluded files
    if (shouldExcludeFile(filename)) {
      console.log(`⏭️  Skipped: ${filename} (excluded)`);
      skipped++;
      continue;
    }

    try {
      // Read HTML file
      const htmlContent = fs.readFileSync(htmlFile, 'utf8');

      // Check if it's already using Bootstrap (has our CSS)
      if (!htmlContent.includes('node_modules/bootstrap/dist/css/bootstrap.min.css')) {
        console.log(`⏭️  Skipped: ${filename} (not using Bootstrap)`);
        skipped++;
        continue;
      }

      // Backup original file
      const backupPath = path.join(config.backupDir, filename);
      fs.writeFileSync(backupPath, htmlContent);

      // Convert to Handlebars template
      const handlebarsContent = createHandlebarsTemplate(filename, htmlContent);
      const hbsPath = path.join(config.outputDir, `${pageName}.hbs`);

      // Write Handlebars template
      fs.writeFileSync(hbsPath, handlebarsContent);

      console.log(`✅ Converted: ${filename} → ${pageName}.hbs`);
      converted++;

    } catch (error) {
      console.error(`❌ Error converting ${filename}:`, error.message);
    }
  }

  console.log(`\n🎉 Conversion complete!`);
  console.log(`✅ Converted: ${converted} files`);
  console.log(`⏭️  Skipped: ${skipped} files`);
  console.log(`📁 Backups stored in: ${config.backupDir}`);

  if (converted > 0) {
    console.log(`\n💡 Next steps:`);
    console.log(`   1. Test the converted pages with 'npm run dev'`);
    console.log(`   2. Build with 'npm run build' to generate final HTML`);
    console.log(`   3. Review and adjust any page-specific configurations`);
  }
}

// Run the conversion
convertHtmlToHandlebars().catch(console.error);