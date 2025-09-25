#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Cleanup configuration
const cleanup = {
  // Archive directories
  directories: {
    'archived-html': 'Original HTML files (replaced by .hbs templates)',
    'archived-scripts': 'Old JavaScript generation scripts',
    'archived-backups': 'Backup files from various operations',
    'archived-experimental': 'Experimental and test files',
    'archived-docs': 'Generated documentation and migration files'
  },

  // Files to move to archived-html
  htmlFiles: [
    // All .html files that have corresponding .hbs files
    // Will be determined dynamically
  ],

  // Files to move to archived-scripts
  scriptFiles: [
    'scripts/generate-modals.js',
    'apply-modern-layout.js',
    'migrate-bootstrap.js',
    'cleanup-outdated.js'
  ],

  // Files to move to archived-backups
  backupFiles: [
    '*.html.backup',
    '*.html.backup2',
    '*.html.bak',
    '*.backup'
  ],

  // Files to move to archived-experimental
  experimentalFiles: [
    'test-*.html',
    'temp-*.html',
    'index-bs5.html',
    'index-clean.html',
    'index-dashboard*.html',
    'index-header-*.html',
    'index-modern.html',
    'index-fixed.html',
    'index-final.html',
    'dashboard-*.html'
  ],

  // Files to move to archived-docs
  docFiles: [
    'AI-AGENT-INSTRUCTIONS.md',
    'AGENT-COMMANDS-BATCH2.md',
    'MIGRATION-*.md',
    'OPTIMIZATION-GUIDE.md',
    'SIDEBAR_HEADER_REWORK_PLAN.md',
    'START-MIGRATION-COMMAND.md'
  ],

  // Files to keep in root (essential files)
  keepInRoot: [
    'package.json',
    'package-lock.json',
    'vite.config.js',
    'postcss.config.js',
    '.eslintrc.js',
    '.prettierrc',
    '.browserslistrc',
    '.gitignore',
    'CLAUDE.md',
    'README.md'
  ]
};

// Utility functions
function createArchiveDirectories() {
  console.log('📁 Creating archive directories...');

  for (const [dirName, description] of Object.entries(cleanup.directories)) {
    const dirPath = path.join(projectRoot, dirName);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });

      // Create a README in each archive directory
      const readmePath = path.join(dirPath, 'README.md');
      const readmeContent = `# ${dirName.charAt(0).toUpperCase() + dirName.slice(1).replace('-', ' ')}\n\n${description}\n\n**Created:** ${new Date().toISOString()}\n**Purpose:** Archive directory created during project cleanup\n`;
      fs.writeFileSync(readmePath, readmeContent);
    }
    console.log(`✅ ${dirName}/ - ${description}`);
  }
}

function getHtmlFilesWithHbsCounterparts() {
  const hbsFiles = fs.readdirSync(projectRoot)
    .filter(file => file.endsWith('.hbs'))
    .map(file => file.replace('.hbs', '.html'));

  return hbsFiles.filter(htmlFile => fs.existsSync(path.join(projectRoot, htmlFile)));
}

function matchesPattern(filename, pattern) {
  if (pattern.includes('*')) {
    const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
    return regex.test(filename);
  }
  return filename === pattern;
}

function moveFiles(files, targetDir, description) {
  const moved = [];
  const targetPath = path.join(projectRoot, targetDir);

  for (const file of files) {
    const sourcePath = path.join(projectRoot, file);
    const destPath = path.join(targetPath, file);

    if (fs.existsSync(sourcePath)) {
      try {
        // Create subdirectories if needed
        const destDir = path.dirname(destPath);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }

        fs.renameSync(sourcePath, destPath);
        moved.push(file);
      } catch (error) {
        console.error(`❌ Error moving ${file}:`, error.message);
      }
    }
  }

  if (moved.length > 0) {
    console.log(`📦 Moved to ${targetDir}/ (${description}):`);
    moved.forEach(file => console.log(`   ${file}`));
    console.log();
  }

  return moved;
}

function findFilesByPatterns(patterns) {
  const allFiles = fs.readdirSync(projectRoot);
  const matchedFiles = [];

  for (const pattern of patterns) {
    const matches = allFiles.filter(file => matchesPattern(file, pattern));
    matchedFiles.push(...matches);
  }

  return [...new Set(matchedFiles)]; // Remove duplicates
}

function generateCleanupSummary(results) {
  const summaryPath = path.join(projectRoot, 'CLEANUP-SUMMARY.md');

  let summary = `# Project Cleanup Summary\n\n`;
  summary += `**Date:** ${new Date().toISOString()}\n`;
  summary += `**Purpose:** Organize project after Handlebars conversion\n\n`;

  summary += `## Archive Directories Created\n\n`;
  for (const [dirName, description] of Object.entries(cleanup.directories)) {
    summary += `- **${dirName}/**: ${description}\n`;
  }

  summary += `\n## Files Moved\n\n`;

  let totalMoved = 0;
  for (const [category, files] of Object.entries(results)) {
    if (files.length > 0) {
      summary += `### ${category}\n`;
      summary += `- **Count:** ${files.length} files\n`;
      summary += `- **Files:** ${files.slice(0, 10).join(', ')}${files.length > 10 ? `, ... and ${files.length - 10} more` : ''}\n\n`;
      totalMoved += files.length;
    }
  }

  summary += `## Summary\n\n`;
  summary += `- **Total files moved:** ${totalMoved}\n`;
  summary += `- **Active .hbs templates:** ${fs.readdirSync(projectRoot).filter(f => f.endsWith('.hbs')).length}\n`;
  summary += `- **Project structure:** Cleaned and organized\n\n`;

  summary += `## Current Project Structure\n\n`;
  summary += `\`\`\`\n`;
  summary += `kiaalap/\n`;
  summary += `├── src/                    # Source files (partials, layouts, helpers)\n`;
  summary += `├── *.hbs                   # Handlebars templates (active)\n`;
  summary += `├── archived-html/          # Original HTML files\n`;
  summary += `├── archived-scripts/       # Old generation scripts\n`;
  summary += `├── archived-backups/       # Backup files\n`;
  summary += `├── archived-experimental/  # Test and experimental files\n`;
  summary += `├── archived-docs/          # Migration documentation\n`;
  summary += `├── dist/                   # Build output\n`;
  summary += `└── node_modules/           # Dependencies\n`;
  summary += `\`\`\`\n`;

  fs.writeFileSync(summaryPath, summary);
  console.log(`📋 Cleanup summary created: CLEANUP-SUMMARY.md`);
}

async function cleanupProject() {
  console.log('🧹 Starting project cleanup...\n');

  // Create archive directories
  createArchiveDirectories();
  console.log();

  const results = {};

  // 1. Move HTML files that have .hbs counterparts
  console.log('1️⃣ Moving converted HTML files...');
  const htmlFilesToMove = getHtmlFilesWithHbsCounterparts();
  results['HTML Files (converted to .hbs)'] = moveFiles(htmlFilesToMove, 'archived-html', 'Converted to Handlebars templates');

  // 2. Move script files
  console.log('2️⃣ Moving old generation scripts...');
  const scriptFilesToMove = cleanup.scriptFiles.filter(file =>
    fs.existsSync(path.join(projectRoot, file)) && file !== 'scripts/convert-to-handlebars.js' && file !== 'scripts/cleanup-project.js'
  );
  results['Generation Scripts'] = moveFiles(scriptFilesToMove, 'archived-scripts', 'Old JavaScript generation scripts');

  // 3. Move backup files
  console.log('3️⃣ Moving backup files...');
  const backupFilesToMove = findFilesByPatterns(cleanup.backupFiles);
  results['Backup Files'] = moveFiles(backupFilesToMove, 'archived-backups', 'Backup files from operations');

  // 4. Move experimental files
  console.log('4️⃣ Moving experimental and test files...');
  const experimentalFilesToMove = findFilesByPatterns(cleanup.experimentalFiles);
  results['Experimental Files'] = moveFiles(experimentalFilesToMove, 'archived-experimental', 'Test and experimental files');

  // 5. Move documentation files
  console.log('5️⃣ Moving migration documentation...');
  const docFilesToMove = findFilesByPatterns(cleanup.docFiles);
  results['Documentation Files'] = moveFiles(docFilesToMove, 'archived-docs', 'Migration and development documentation');

  // 6. Move html-backups directory if it exists
  const htmlBackupsDir = path.join(projectRoot, 'html-backups');
  if (fs.existsSync(htmlBackupsDir)) {
    const targetDir = path.join(projectRoot, 'archived-backups', 'html-backups');
    fs.renameSync(htmlBackupsDir, targetDir);
    console.log('📦 Moved html-backups/ directory to archived-backups/html-backups/\n');
  }

  // Generate summary
  generateCleanupSummary(results);

  // Show final status
  console.log('🎉 Project cleanup completed!\n');

  const remainingFiles = fs.readdirSync(projectRoot).filter(file => {
    const stat = fs.statSync(path.join(projectRoot, file));
    return stat.isFile() && !file.startsWith('.');
  });

  const hbsFiles = remainingFiles.filter(f => f.endsWith('.hbs'));
  const htmlFiles = remainingFiles.filter(f => f.endsWith('.html'));

  console.log('📊 Current project status:');
  console.log(`   ✅ Active Handlebars templates: ${hbsFiles.length}`);
  console.log(`   ⚠️  Remaining HTML files: ${htmlFiles.length}`);
  console.log(`   📁 Archive directories: ${Object.keys(cleanup.directories).length}`);
  console.log(`   🗂️  Total files in root: ${remainingFiles.length}`);

  if (htmlFiles.length > 0) {
    console.log('\n📋 Remaining HTML files:');
    htmlFiles.forEach(file => console.log(`   ${file}`));
  }

  console.log('\n💡 Next steps:');
  console.log('   1. Test your .hbs templates with: npm run dev');
  console.log('   2. Build the project with: npm run build');
  console.log('   3. Review CLEANUP-SUMMARY.md for details');
  console.log('   4. Remove archive directories when no longer needed');
}

// Run cleanup
cleanupProject().catch(console.error);