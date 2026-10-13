# Kiaalap Production Deployment Guide

Build the template locally or in CI and deploy the contents of `dist/` to any
static host. All 63 pages are discovered automatically; Handlebars partials are
rendered at build time. Node.js is needed to build, and the production host serves
ordinary HTML, CSS, JavaScript, fonts and images.

## Build and verify

Use Node.js 24.8+ (recommended) or 22.22+ and npm 10+:

```bash
nvm use
npm ci
npm run check
npx playwright install chromium
npm run test:browser
npm run preview
```

`npm run check` validates JavaScript/CSS, SCSS formatting and compilation, unit
tests, rendered HTML, local asset references and a JavaScript size budget. Preview uses Vite’s local preview server;
use your static host for production. Browser tests stub external demo imagery and
map requests. Test those integrations with the actual provider on your deployed site.

## Deploy static files

Upload everything inside `dist/` to the public directory, including `assets/`,
`images/`, favicon and every HTML page. Relative URLs (`base: './'`) support both a
site root and a subdirectory such as `/admin/`. Keep `.html` links working; this
is a multi-page template and needs no single-page-app fallback.

For an SFTP deployment, build first and upload the contents of `dist/`. For a
Git-based static host, use `npm ci && npm run build` as the build command and
`dist` as the publish directory. Retain existing hashed assets during a rolling
deployment until cached HTML has expired, or deploy atomically.

Forms, login, payments, uploads and data are demos. Connect your backend before
using them for real operations. Demo avatars, photographs and map tiles still
need network access; scripts, styles and icon fonts are hosted locally.

## Caching and compression

Enable gzip or Brotli in the host/CDN. Serve hashed files under `assets/` with
`Cache-Control: public, max-age=31536000, immutable`. Serve HTML with
`Cache-Control: no-cache` so a new deployment updates entry points promptly.
Non-hashed images should use shorter caching or versioned filenames.

For Nginx, a site-root deployment can use:

```nginx
root /var/www/kiaalap/dist;
index index.html;

location / {
    try_files $uri $uri/ =404;
}

location /assets/ {
    add_header Cache-Control "public, max-age=31536000, immutable";
}

location ~ \.html$ {
    add_header Cache-Control "no-cache";
}

error_page 404 /404.html;
```

Adapt paths for subdirectory deployment. When combining location-specific caching
with security headers, ensure those headers are also applied in the location blocks
according to your Nginx version/configuration’s header inheritance behavior.

### Security headers

All JavaScript and CSS is now served from your own origin — the template loads
no third-party scripts — so a strict Content-Security-Policy works without
allow-listing external hosts. The only remote origins are image hosts and the
map tile servers used by the demo map pages.

**Nginx:**

```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://ui-avatars.com https://images.unsplash.com https://flagcdn.com https://*.tile.openstreetmap.org https://server.arcgisonline.com; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
```

**Apache (`.htaccess`):**

```apache
Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://ui-avatars.com https://images.unsplash.com https://flagcdn.com https://*.tile.openstreetmap.org https://server.arcgisonline.com; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
```

`'unsafe-inline'` is required because most pages carry inline `<script>` and
`<style>` blocks. To drop it, move that page-local code into files under
`src/js/` and `src/css/`, or add a per-request nonce.

## Troubleshooting

- Unrendered `{{> ...}}` expressions mean source files were uploaded. Rebuild and
  upload `dist/` instead.
- A CSS/JavaScript 404 usually means `assets/` was omitted or HTML was deployed
  without its matching assets. Upload the complete build together.
- To add a page, run `npm run page:new -- attendance`, edit the page, add its
  navigation link, and rebuild. No Vite input entry is needed.
- Node engine errors mean tooling needs Node 24.8+ or 22.22+. Use `.nvmrc`.
- For upgrade security status, see README’s dependency security section and run
  both `npm audit --omit=dev` and `npm audit`.
