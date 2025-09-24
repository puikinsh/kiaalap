import { defineConfig } from 'vite';
import { resolve } from 'path';
import { glob } from 'glob';

// Find all HTML files
const htmlFiles = glob.sync('*.html').reduce((acc, file) => {
  const name = file.replace('.html', '');
  acc[name] = resolve(__dirname, file);
  return acc;
}, {});

export default defineConfig({
  root: './',
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...htmlFiles
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
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