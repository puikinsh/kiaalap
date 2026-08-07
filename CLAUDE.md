# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kiaalap is a Bootstrap 5 education-management dashboard: 62 static HTML pages composed from Handlebars partials at build/dev time by Vite. There is no application backend, router, or data layer — every page is hand-authored markup with page-local `<script>` blocks. It is fully jQuery-free (no jQuery in `package.json` or any source file).

## Commands

```bash
npm run dev          # Vite dev server on port 3000, auto-opens browser
npm run build        # Production build to dist/ (terser, drop_console)
npm run preview      # Serve the dist/ build
npm run lint:html    # html-validate on root *.html (config: .htmlvalidate.json)
npm run lint:css     # Stylelint on src/scss (config: .stylelintrc.json)
npm run lint:js      # ESLint on src/js/**/*.js
npm run format       # Prettier on src/**
npm run clean        # rm -rf dist
```

There is no test suite (`npm test` exits 1). All three linters and the build pass with zero errors and zero warnings — keep it that way.

## How a page is assembled

`vite-plugin-handlebars` renders every root `*.html` at request/build time. A page is a fragment that pulls in partials from `src/partials/`:

```html
{{> head}}      <!-- opens <!DOCTYPE html><html><head>…<body>, loads CSS -->
{{> sidebar}}
<div class="main-wrapper" id="mainWrapper">
    {{> header}}
    <main class="dashboard-content" id="main-content">…</main>
    {{> footer}}
</div>
<!-- page-local <script>/<link> tags go HERE, before the closing partial -->
{{> scripts}}   <!-- loads /src/js/main.js as a module, closes </body></html> -->
```

**`{{> scripts}}` must be the last thing in the file.** It emits `</body></html>`, so anything after it lands outside the document. Every page-local `<script>` or `<link>` belongs above it.

58 of 62 pages follow this. The four auth pages — [login.html](login.html), [register.html](register.html), [lock.html](lock.html), [password-recovery.html](password-recovery.html) — are standalone full documents with **no partials**; edits to `head.hbs`/`sidebar.hbs`/`header.hbs` do not reach them. [404.html](404.html) and [500.html](500.html) use `{{> head}}` and `{{> scripts}}` but deliberately render no sidebar.

Build inputs are globbed (`glob.sync('*.html')` minus `*template*` and `*-new*`), so a new root HTML file is included automatically.

## Loading model

1. **Bundled** — [src/partials/scripts.hbs](src/partials/scripts.hbs) loads `/src/js/main.js` as an ES module. `main.js` eagerly imports only what the shell and dashboard charts need on load — Bootstrap, Chart.js, dayjs — puts them on `window.*` for page-local inline scripts, and imports `layout.js`, `dashboard.js`, `charts.js`. Everything else is fetched on demand (see [On-demand libraries](#on-demand-libraries)).
2. **Page-local module scripts** — pages needing a library the bundle doesn't carry import it inside `<script type="module">`: Quill in [tinymc.html](tinymc.html), CropperJS in [images-cropper.html](images-cropper.html), Simple-DataTables in [data-table.html](data-table.html), Leaflet in the two map pages, Prism in [code-editor.html](code-editor.html). Vite bundles these into `dist/assets/`.

**No third-party script or stylesheet is loaded from a CDN.** Everything is served from the app's own origin, which is what lets the CSP in [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) stay strict. Adding a CDN `<script>` would break that — install the package and import it instead. The only remaining remote origins are demo image hosts and map tile servers.

Two rules follow from this:

- **Never add `<script src="node_modules/…">`.** A non-module script tag cannot be bundled, so it 404s in a `dist/` build. Use `<script type="module">` with a real `import`.
- **Chart.js is already global.** `window.Chart` is set by the bundle on every page. Page-local chart code just uses `new Chart(...)` inside a `DOMContentLoaded` handler — module scripts are deferred, so the global is set by the time that fires. Do not re-load Chart.js per page.

Inline `onclick="fn()"` attributes resolve against the global scope, which module scope is not part of. Pages that use them (`tinymc.html`, `images-cropper.html`) re-expose their handlers via `Object.assign(window, {...})`.

Leaflet and Prism still load from unpkg/cdnjs despite `leaflet` being an npm dependency.

## Handlebars context (vite.config.js)

`getPageContext(filename)` merges a base context (user, meta, currentYear) with a per-page entry from `pageConfigs`. Pages without an entry fall through to `defaultConfig`, which title-cases the filename.

Context keys that matter:

| Key | Consumed by | Purpose |
| --- | --- | --- |
| `page` | `sidebar.hbs` | `{{#if (eq page 'index')}}` marks the active link |
| nav group booleans | `sidebar.hbs` | `{{#if academic.students}}` expands the containing submenu |
| `breadcrumb` | `header.hbs` | array of `{title, url}` |
| `title`, `pageTitle`, `pageDescription`, `showPageHeader` | `head.hbs` / pages | |
| `additionalCSS` | `head.hbs` | extra `<link>` tags, paths relative to project root |
| `additionalJS` | `scripts.hbs` | extra `<script type="module">` tags |
| `criticalCSS`, `pageSpecificStyles`, `pageSpecificJS` | `head.hbs` / `scripts.hbs` | raw inline blocks |

**Navigation state** comes from `NAV_GROUPS` at the top of [vite.config.js](vite.config.js) — an explicit page-name → group map. `getNavigationState()` turns it into the nested booleans `sidebar.hbs` tests, and `getPageContext` spreads them at the **top level** of the context (the partial tests `{{#if academic.students}}`, not `{{#if navigation.academic.students}}`). Only truthy leaves are assigned: an empty `{}` would make `{{#if group}}` pass, since Handlebars treats every object as truthy. When adding a page to an existing sidebar section, add it to the relevant `NAV_GROUPS` array.

### Adding a page

1. Create `newpage.html` in the project root using the skeleton above, keeping `{{> scripts}}` last.
2. Add a `pageConfigs` entry for title/breadcrumb (optional — there is a default).
3. Add the page to the right `NAV_GROUPS` array, and add its link to [src/partials/sidebar.hbs](src/partials/sidebar.hbs) with an `{{#if (eq page 'newpage')}}active{{/if}}`.
4. Page-specific assets go in `additionalCSS`/`additionalJS`, or directly in the page above `{{> scripts}}`.

## JavaScript ownership

Each shell control has exactly one owner. This was previously not true — `dashboard.js`, `layout.js`, and `main.js` all attached a click handler to `#sidebarToggle`, and two of them toggled `.collapsed`, so desktop collapse cancelled itself out. Keep the split:

| File | Responsibility |
| --- | --- |
| [src/js/layout.js](src/js/layout.js) | Imperative sidebar helpers only (`toggleSidebar`, `setCollapsed`, `restoreSidebarState`, …). **No listeners.** Exposed as `window.layout`. |
| [src/js/dashboard.js](src/js/dashboard.js) | The only module that attaches shell listeners: sidebar toggle/close/overlay/resize, search bar, active-link highlighting, tooltip/popover init. |
| [src/js/main.js](src/js/main.js) | Library imports, `window.*` globals, AOS/SimpleBar/TomSelect/CountUp init. |
| [src/js/charts.js](src/js/charts.js) | Dashboard charts — `#earningsChart` and the three sparklines, all of which exist only on [index.html](index.html). Guards are id-based, so it no-ops elsewhere. |

Sidebar submenus use standard `data-bs-toggle="collapse"` markup and are driven by **Bootstrap's own delegated handler**. Do not add a manual collapse handler — it fires alongside Bootstrap's and cancels it.

Desktop collapse toggles `.collapsed` on `#sidebar` plus `.full-width` on `#mainWrapper`, persisted to `localStorage.sidebarCollapsed`. Mobile (≤768px) toggles `.active` on the sidebar and overlay, with no persistence.

## Styles

- [src/scss/main.scss](src/scss/main.scss) — the entry point. Uses `@use` (not `@import`) and resolves Bootstrap, Bootstrap Icons, and Font Awesome through the `loadPaths: ['node_modules']` Sass option set in `vite.config.js`. Loading via a load path rather than a relative `../../node_modules/` path is what lets `quietDeps` silence the deprecation warnings Bootstrap 5 still emits internally.
- Loaded **once**, by the `<link>` in [head.hbs](src/partials/head.hbs). Do not also import it from `main.js` — that compiles and ships the whole sheet twice.
- [src/css/dashboard.css](src/css/dashboard.css) — 799 lines of plain CSS; the real dashboard theme.
- [src/css/charts-layout.css](src/css/charts-layout.css) — chart sizing (`.chart-container`, `.chart-container-main`); attached per-page via `additionalCSS`.
- `head.hbs` carries an inline `<style>` block of `!important` sidebar-collapse overrides — CSS changes to `.sidebar.collapsed` in `dashboard.css` may be silently overridden there.

Bootstrap ships unconfigured: `main.scss` sets no variable overrides, so the palette is stock. To theme it, add a `with (...)` configuration to the `@use 'bootstrap/scss/bootstrap'` rule rather than redeclaring variables after it.

## Gotchas

- **CropperJS is v2**, a web-components rewrite. The v1 `new Cropper(img, options)` API is gone: build the UI from a `template` of `<cropper-canvas>`/`<cropper-image>`/`<cropper-selection>` elements, then drive it through `getCropperImage()` / `getCropperSelection()`. `$toCanvas()` is async (v1's `getCroppedCanvas()` was sync), and v2 ships no stylesheet — elements style themselves via shadow DOM.
- **Quill is pinned to 2.0.2**, not the 2.0.3 latest. 2.0.3 is the only version affected by GHSA-v3m3-f69x-jf25 (XSS via HTML export) and has no patched release. Re-check before bumping.
- **cssnano runs SVGO** over inline SVG data URIs and cannot parse Bootstrap's percent-encoded ones; `svgo` is disabled in [postcss.config.cjs](postcss.config.cjs) to keep builds quiet.
- Vite 8 resolves the config natively, where `__dirname` is unavailable — `vite.config.js` uses `import.meta.dirname` via the `rootDir` constant.

## Unused dependencies

`fullcalendar`, `filepond`, `metismenu`, and `animate.css` are in `package.json` but referenced nowhere. `swiper`, `simplebar`, `tom-select`, `countup.js`, and `aos` are imported and initialized by `main.js`, but no page contains their DOM hooks (`.swiper`, `[data-simplebar]`, `.tom-select`, `.countup`, `[data-aos]`) — their init loops currently match zero elements.

## Accessibility invariants

`lint:html` is clean and enforces these — don't regress them:

- Icon-only buttons and links carry an `aria-label`, and their `<i>`/`<span>` icon carries `aria-hidden="true"`.
- Every `<button>` has an explicit `type`. Outside a form the default is harmless, but being explicit is what the lint enforces.
- Bootstrap modals carry **no** static `aria-hidden="true"` — they are `display:none` when closed and Bootstrap sets the attribute itself on `hide()`. Adding it back marks every focusable child as `hidden-focusable`.
- Accordion panels use `role="region"` alongside `aria-labelledby`.
- Password inputs need an `autocomplete` value (`current-password` / `new-password`).
- A `<form>` needs a submit control. Where the action button lives in a `.modal-footer` outside the form, associate it with `form="<form-id>"` rather than dropping the `<form>`.
- Raw `&` in text must be `&amp;`; use `<div>`, not `<form>`, for pure layout wrappers.

Two rules are configured off in [.htmlvalidate.json](.htmlvalidate.json) because they fight deliberate Bootstrap patterns: `no-inline-style` (demo markup), and `prefer-native-element` for `progressbar`/`region` (Bootstrap's `.progress` and `.accordion-collapse` cannot be `<progress>`/`<section>`).

## On-demand libraries

[src/js/lazy.js](src/js/lazy.js) loads Swiper, SimpleBar, Tom Select, CountUp, AOS, and FullCalendar **only when a page needs them**. They are not in the main bundle and are not on `window`. This keeps `main.js` at ~97K gzipped instead of ~144K.

Two ways to use one:

1. **Put its hook in the markup** and it auto-initialises on `DOMContentLoaded`:

   | Hook | Library |
   | --- | --- |
   | `.swiper` (+ optional `data-slides-per-view`, `data-space-between`, `data-loop`) | Swiper |
   | `[data-simplebar]` | SimpleBar |
   | `.tom-select` | Tom Select |
   | `.countup` with `data-count` | CountUp |
   | `[data-aos]` | AOS |

2. **Call the loader** when you need the constructor itself:

   ```js
   const Swiper = await Kiaalap.load('swiper');
   new Swiper('#hero', { loop: true });

   const { Calendar, plugins } = await Kiaalap.load('fullcalendar');
   ```

   `Kiaalap.load()` caches its promise, so repeated calls share one fetch.

To add a library to the lazy set, add an entry to `LOADERS` (and a `HOOKS` entry if it should auto-init). Import its CSS inside the loader so the stylesheet is code-split with it.

[events.html](events.html) is the reference usage: the "Calendar View" button calls `Kiaalap.load('fullcalendar')` on first click, so the ~40K of calendar chunks never load for visitors who stay on the list view. It pulls only the `daygrid`, `list`, and `interaction` plugins — `fullcalendar/all` would also drag in timeGrid and multiMonth.

`filepond`, `metismenu`, and `animate.css` were removed — nothing referenced them.

## Conventions

Prettier: single quotes, semicolons, 2-space indent, 100 print width, es5 trailing commas. ESLint is flat-config with `js.configs.recommended` and browser globals; `no-console` only warns when `NODE_ENV=production`.
