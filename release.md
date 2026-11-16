# Kiaalap v4.0.1 — Bootstrap 5.3.9, Dependency Refresh, Mobile Layout Fix

Maintenance release. Bootstrap 5 remains the UI foundation.

## Fixes

- **Mobile layout:** 36 pages carried an inline critical-CSS rule that kept a 260px left margin on phones, overriding the stylesheet and pushing content off-screen. The margin now applies only from 769px up.
- **Leaflet maps:** default marker icons and shadows 404ed in the production build; they are now bundled.
- Tab list items use `role="none"` (html-validate 11.21 `presentation-role-style`).

## Dependencies

- Bootstrap 5.3.8 to **5.3.9**
- Chart.js 4.6.1, FullCalendar 7.1.5, Swiper 14.4, Tom Select 2.7, Cropper.js 2.3.1, Vite 8.3.8, Sass 1.108, ESLint 10.15, Prettier 3.10, html-validate 11.21, Playwright 1.65
- Quill stays at 2.0.2 (2.0.3 is flagged by GHSA-v3m3-f69x-jf25)
- `npm audit`: zero vulnerabilities
