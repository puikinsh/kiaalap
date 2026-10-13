# Kiaalap v4.0.0 — Faster Builds, Smaller Shared JavaScript, Easier Customization

Released 2026-10-13. Bootstrap 5 remains the UI foundation. This release updates the tooling and libraries, reduces unnecessary JavaScript, adds a starter workflow, and resolves both production and development dependency audit findings.

## Highlights

- Shared JavaScript is about **27 kB gzipped**, down from **99 kB** (about 72% smaller). Chart.js is loaded automatically only on chart pages; Day.js is available on demand. These figures describe the shared shell, not the complete page including CSS, fonts, images or page-specific libraries.
- Local production builds took **2.1–2.5 seconds**, compared with 4.57 seconds before the update, using Vite’s native Oxc and Lightning CSS minifiers. Timings vary with machine and cache.
- **63 pages**, including a minimal `starter.html`. Run `npm run page:new -- attendance` to create a page safely.
- Site metadata/demo user, page/navigation context and Sass customization each have a documented configuration file.
- Full `npm audit` and `npm audit --omit=dev`: **zero vulnerabilities** at release verification.
- **10 unit tests**, **2 built artifact tests** and **68 browser tests** pass. External images/map tiles are stubbed in browser tests; backend operations remain demos.

## Dependency updates

### Runtime packages

| Package | v3.0.0 requirement | v4.0.0 requirement |
| --- | --- | --- |
| `bootstrap-icons` | `^1.13.1` | `^1.13.2` |
| `cropperjs` | `^2.1.1` | `^2.3.0` |
| `dayjs` | `^1.11.21` | `^1.11.23` |
| `fullcalendar` | `^7.0.2` | `^7.1.2` |
| `swiper` | `^14.1.0` | `^14.3.0` |

### Development packages

| Package | v3.0.0 requirement | v4.0.0 requirement |
| --- | --- | --- |
| `@eslint/css` | `Added` | `^2.0.0` |
| `@playwright/test` | `Added` | `^1.64.0` |
| `autoprefixer` | `^10.5.4` | `^10.6.1` |
| `eslint` | `^10.8.0` | `^10.12.0` |
| `globals` | `^17.9.0` | `^17.13.0` |
| `html-validate` | `^11.6.2` | `^11.16.2` |
| `postcss` | `^8.5.26` | `^8.5.30` |
| `prettier` | `^3.9.6` | `^3.9.10` |
| `sass` | `^1.102.0` | `^1.105.1` |
| `vite` | `^8.2.1` | `^8.3.4` |

Unchanged runtime packages were checked against npm’s current stable releases. Quill remains pinned to **2.0.2** because 2.0.3 has an unresolved [HTML export XSS advisory](https://github.com/advisories/GHSA-v3m3-f69x-jf25). No audit findings are suppressed.

Removed development packages: `stylelint`, `stylelint-config-standard-scss`, `cssnano`, `terser` and `glob`. Removing Stylelint’s unpatched `braces`/glob chain eliminated the remaining 10 findings. Sass moved to `devDependencies`. CSS is checked with ESLint’s official CSS plugin; SCSS uses Prettier syntax/formatting checks and Sass compilation. This replaces Stylelint-specific SCSS rules rather than claiming identical rule coverage.

## Customization and page workflow

| Change | Location or command |
| --- | --- |
| Shared metadata and demo user | `src/config/site.js` |
| Titles, breadcrumbs and expanded sidebar groups | `src/config/pages.js` |
| Bootstrap primary color, font and border radius | `src/scss/_theme.scss` |
| Additional Bootstrap configuration | `src/scss/main.scss` |
| Shell CSS variables | `src/css/dashboard.css` |
| Add a page without overwriting an existing file | `npm run page:new -- attendance` |
| Full validation | `npm run check` |
| Browser regression tests | `npm run test:browser` after building |

The build automatically discovers root HTML pages. New page names containing `template` or `-new` are excluded. Restart the development server after adding a page. `npm run clean` now uses Node’s filesystem API and works across platforms. Development dependency scanning includes module entries hidden by Handlebars partials, avoiding additional optimization reloads.

## Runtime, accessibility and bug fixes

- Chart.js has a separate entry, preserving `window.Chart` before `DOMContentLoaded` on chart demo pages.
- Lazy SimpleBar and Tom Select also load their styles. Repeated hook initialization skips initialized elements, and failed downloads can be retried.
- `Kiaalap.initLazyLibraries(root)` supports dynamically inserted hooks; the loader rejects inherited property names.
- Shared avatars use local initials by default; set `user.avatar` to provide an image.
- Shared controls have accessible labels and explicit button types. Navigation landmarks and duplicate search IDs are corrected.
- Rendered page-local styles are moved into `<head>` while script examples are preserved. Rendered HTML and local asset references are checked.
- Reduced motion is respected by shell transitions, charts and counters. Counters use requestAnimationFrame; no-op timer/resize handlers were removed.
- Department template, preview and success dialogs have been restored. User input in previews remains escaped.
- Cropper.js export is checked using a real image/canvas operation.

## Migration from v3.0.0

1. Use **Node.js 24.8+** (recommended) or **22.22+**, with npm 10+. `.nvmrc` selects Node 24.
2. Run `npm ci` with the updated lockfile.
3. Replace custom reads of `window.dayjs` or Chart/Day.js imports from `src/js/main.js` with direct package imports or `await Kiaalap.load("dayjs")` / `await Kiaalap.load("chart")`.
4. `window.Chart` is available only on pages detected as containing canvas markup or Chart.js demos. Load it explicitly for charts added later.
5. Move custom page context edits from `vite.config.js` to `src/config/pages.js`, and shared user/metadata edits to `src/config/site.js`.
6. Replace any custom Stylelint workflow with the new stylesheet checks, or configure additional SCSS rules in your own project if needed.

## Validation and deployment

```bash
nvm use
npm ci
npm run check
npx playwright install chromium
npm run test:browser
npm audit
npm audit --omit=dev
```

Build first and deploy the complete `dist/` directory. Relative asset URLs support a site root or subdirectory; no SPA fallback or production Node process is needed. HTML should revalidate while hashed assets can use long-lived caching. Authentication, payment and submission screens are frontend demos and need a backend for real operations.

See [CHANGELOG.md](CHANGELOG.md), [README.md](README.md) and [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for the full implementation notes, usage and hosting guidance.
