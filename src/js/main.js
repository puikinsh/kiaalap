// Styles are loaded by the <link> tag in src/partials/head.hbs so they are
// render-blocking in <head> and survive a JS failure. Importing main.scss here
// as well would compile and emit the entire stylesheet a second time.

// Import Bootstrap and dependencies
import * as bootstrap from 'bootstrap';

// Eagerly bundled: needed by the shell (Bootstrap) or by dashboard charts on
// load (Chart.js, dayjs). Everything else loads on demand — see ./lazy.js.
import Chart from 'chart.js/auto';
import dayjs from 'dayjs';

// Make libraries globally available for the inline <script> blocks that most
// pages use. Module code should import these directly instead.
window.bootstrap = bootstrap;
window.Chart = Chart;
window.dayjs = dayjs;

// Layout/sidebar behaviour lives in ./layout.js (imperative API) and
// ./dashboard.js (the single set of DOM event listeners). Do not add sidebar,
// tooltip or popover initialisation here — dashboard.js owns it.
import layout from './layout.js';
import './dashboard.js';
import './charts.js';
import { load, initLazyLibraries } from './lazy.js';

window.layout = layout;

// Public entry point for on-demand libraries:
//   const Swiper = await Kiaalap.load('swiper');
// Swiper, SimpleBar, Tom Select, CountUp, AOS and FullCalendar are NOT on
// `window` any more — they are fetched only when used.
window.Kiaalap = { load };

document.addEventListener('DOMContentLoaded', function () {
  // Fetches a library only if this page actually contains its hook.
  initLazyLibraries();
});

// Export for use in other modules
export { Chart, dayjs, load };
