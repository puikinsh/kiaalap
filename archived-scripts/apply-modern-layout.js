#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');

async function updateHTMLFiles() {
    // Read the modern template
    const modernTemplate = await fs.readFile('index-modern.html', 'utf8');

    // Extract the new sidebar structure
    const sidebarMatch = modernTemplate.match(/<aside class="sidebar"[\s\S]*?<\/aside>/);
    const headerMatch = modernTemplate.match(/<header class="header"[\s\S]*?<\/header>/);
    const scriptsMatch = modernTemplate.match(/<script type="module"[\s\S]*?<\/script>/);

    if (!sidebarMatch || !headerMatch) {
        console.error('Could not extract sidebar or header from modern template');
        return;
    }

    const newSidebar = sidebarMatch[0];
    const newHeader = headerMatch[0];
    const modernScripts = scriptsMatch ? scriptsMatch[0] : '';

    // New CSS imports for Bootstrap 5.3.8
    const newCSSImports = `    <!-- Bootstrap 5.3.8 CSS -->
    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
    <!-- Font Awesome 6 -->
    <link rel="stylesheet" href="node_modules/@fortawesome/fontawesome-free/css/all.min.css">
    <!-- Modern Styles -->
    <link rel="stylesheet" href="src/scss/main.scss">`;

    // Get all HTML files except the modern template and specific exclusions
    const htmlFiles = glob.sync('*.html', {
        ignore: ['index-modern.html', 'password-recovery.html', 'register.html', '404.html', '500.html']
    });

    console.log(`Found ${htmlFiles.length} HTML files to update`);

    for (const file of htmlFiles) {
        try {
            let content = await fs.readFile(file, 'utf8');

            // Skip if already modernized
            if (content.includes('class="sidebar sidebar-dark')) {
                console.log(`Skipping ${file} - already modernized`);
                continue;
            }

            // Update CSS imports
            content = content.replace(
                /<link rel="stylesheet"[^>]*bootstrap[^>]*>[\s\S]*?<link rel="stylesheet"[^>]*style\.css[^>]*>/g,
                newCSSImports
            );

            // Remove old CSS links that are no longer needed
            content = content.replace(/<link rel="stylesheet" href="css\/[^"]*">/g, '');

            // Update body structure
            // Find the main content area
            const mainContentMatch = content.match(/<div class="all-content-wrapper">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/);
            let mainContent = '';

            if (mainContentMatch) {
                mainContent = mainContentMatch[1];
            } else {
                // Try to find any main content area
                const contentMatch = content.match(/<div class="(?:single-pro-review-area|analytics-sparkle-area|product-sales-area|traffic-analysis-area)"[\s\S]*?(?=<script|<\/body>)/);
                if (contentMatch) {
                    mainContent = contentMatch[0];
                }
            }

            // Build new body structure
            const newBody = `<body>
    <div class="wrapper">
        ${newSidebar}

        <div class="main-content">
            ${newHeader}

            <div class="content-wrapper">
                <div class="container-fluid p-4">
                    ${mainContent}
                </div>
            </div>
        </div>
    </div>

    <!-- jQuery -->
    <script src="node_modules/jquery/dist/jquery.min.js"></script>
    <!-- Bootstrap 5.3.8 Bundle -->
    <script src="node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Modern Scripts -->
    ${modernScripts}
</body>`;

            // Replace the entire body section
            content = content.replace(/<body[\s\S]*<\/body>/, newBody);

            // Update doctype and html tag if needed
            if (!content.startsWith('<!DOCTYPE html>')) {
                content = content.replace(/<!doctype html>/i, '<!DOCTYPE html>');
            }

            // Write the updated file
            await fs.writeFile(file, content);
            console.log(`✓ Updated ${file}`);

        } catch (error) {
            console.error(`Error updating ${file}:`, error.message);
        }
    }

    console.log('\nLayout migration complete!');
    console.log('Note: You may need to adjust page-specific content in each file.');
}

// Run the migration
updateHTMLFiles().catch(console.error);