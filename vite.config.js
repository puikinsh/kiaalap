import { defineConfig } from 'vite';
import { resolve, basename } from 'node:path';
import { readdirSync, readFileSync } from 'node:fs';
import handlebars from 'vite-plugin-handlebars';
import { normalizeHtml } from './src/helpers/normalize-html.js';
import { helpers } from './src/helpers/handlebars-helpers.js';
import { getPageContext } from './src/config/pages.js';
import { siteContext } from './src/config/site.js';

const rootDir = import.meta.dirname;

export default defineConfig({
  root: rootDir,
  // Relative assets support deployment at / or under any subdirectory.
  base: './',
  plugins: [
    {
      name: 'kiaalap-page-styles',
      transformIndexHtml: { order: 'post', handler: normalizeHtml },
    },
    handlebars({
      partialDirectory: resolve(rootDir, 'src/partials'),
      helpers,
      context: (pagePath) => {
        const filename = basename(pagePath, '.html');
        const source = readFileSync(resolve(rootDir, basename(pagePath)), 'utf8');
        return {
          ...siteContext,
          ...getPageContext(filename),
          // A separate module entry preserves window.Chart before DOMContentLoaded
          // for existing inline demos, without shipping it on non-chart pages.
          needsCharts: /<canvas\b|\bnew Chart\s*\(/.test(source),
        };
      },
    }),
  ],
  build: {
    outDir: 'dist',
    // Use Vite's native Oxc JS / Lightning CSS minifiers.
    rolldownOptions: {
      input: Object.fromEntries(
        readdirSync(rootDir)
          .filter(
            (file) => file.endsWith('.html') && !file.includes('template') && !file.includes('-new')
          )
          .sort()
          .map((file) => [basename(file, '.html'), resolve(rootDir, file)])
      ),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [resolve(rootDir, 'node_modules')],
        quietDeps: true,
      },
    },
  },
  server: { port: 3000, open: true },
  resolve: {
    alias: {
      '~bootstrap': resolve(rootDir, 'node_modules/bootstrap'),
      '@': resolve(rootDir, 'src'),
    },
  },
  optimizeDeps: {
    // Handlebars hides module entries from Vite's initial HTML scan. Scan the
    // shared entries too, so the first chart/calendar visit does not trigger a reload.
    entries: ['*.html', 'src/js/main.js', 'src/js/chart-runtime.js'],
    include: ['bootstrap', '@popperjs/core'],
  },
});
