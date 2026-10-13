/* Kiaalap - on-demand library loading.
 *
 * These libraries used to be imported eagerly by main.js and pushed onto
 * `window`, which cost ~49 kB gzipped on every page whether or not the page
 * used them. Each one is now fetched only when the page actually contains its
 * hook, as a separate chunk Vite code-splits out of the main bundle.
 *
 * Two ways to use a lazy library:
 *
 *   1. Put its hook in the markup (see HOOKS below) and it auto-initialises
 *      with sensible defaults. This covers the common case.
 *
 *   2. Call the loader yourself when you need the constructor:
 *
 *        const Swiper = await Kiaalap.load('swiper');
 *        new Swiper('#myCarousel', { loop: true });
 *
 * `Kiaalap.load()` caches, so repeat calls share one network request and one
 * module instance.
 */

// Each entry resolves to the constructor/namespace the caller expects.
const LOADERS = {
  chart: async () => (await import('./chart-runtime.js')).Chart,
  dayjs: async () => (await import('dayjs')).default,
  swiper: async () => {
    const [{ default: Swiper }] = await Promise.all([import('swiper'), import('swiper/css')]);
    return Swiper;
  },
  simplebar: async () => {
    const [{ default: SimpleBar }] = await Promise.all([
      import('simplebar'),
      import('simplebar/dist/simplebar.css'),
    ]);
    return SimpleBar;
  },
  tomselect: async () => {
    const [{ default: TomSelect }] = await Promise.all([
      import('tom-select'),
      import('tom-select/dist/css/tom-select.bootstrap5.css'),
    ]);
    return TomSelect;
  },
  countup: async () => (await import('countup.js')).CountUp,
  aos: async () => {
    const [{ default: AOS }] = await Promise.all([import('aos'), import('aos/dist/aos.css')]);
    return AOS;
  },
  // Only the three plugins the events page needs — `fullcalendar/all` would
  // drag in timeGrid and multiMonth for no benefit.
  fullcalendar: async () => {
    const [{ Calendar }, dayGrid, list, interaction] = await Promise.all([
      import('fullcalendar'),
      import('fullcalendar/daygrid'),
      import('fullcalendar/list'),
      import('fullcalendar/interaction'),
      import('fullcalendar/skeleton.css'),
      import('fullcalendar/themes/classic/theme.css'),
    ]);
    return {
      Calendar,
      plugins: [dayGrid.default, list.default, interaction.default],
    };
  },
};

const cache = new Map();

/** Load a lazy library by name. Returns a promise for its export. */
export function load(name) {
  const key = String(name).toLowerCase();
  const loader = LOADERS[key];
  if (!Object.hasOwn(LOADERS, key)) {
    return Promise.reject(new Error(`Unknown lazy library "${name}"`));
  }
  if (!cache.has(key)) {
    // Cache the promise, not the result, so concurrent callers share one fetch.
    cache.set(
      key,
      loader().catch((err) => {
        cache.delete(key);
        throw err;
      })
    );
  }
  return cache.get(key);
}

/* Auto-initialisation ---------------------------------------------------- */

// selector -> what to do once the library has arrived.
const initialized = new WeakSet();

const HOOKS = [
  {
    selector: '.swiper',
    lib: 'swiper',
    init: (Swiper, elements) =>
      elements.forEach((el) => {
        if (el.swiper) return;
        new Swiper(el, {
          slidesPerView: Number(el.dataset.slidesPerView) || 1,
          spaceBetween: Number(el.dataset.spaceBetween) || 0,
          loop: el.hasAttribute('data-loop'),
        });
      }),
  },
  {
    selector: '[data-simplebar]',
    lib: 'simplebar',
    init: (SimpleBar, elements) =>
      elements.forEach((el) => {
        if (!SimpleBar.instances.has(el)) new SimpleBar(el);
      }),
  },
  {
    selector: '.tom-select',
    lib: 'tomselect',
    init: (TomSelect, elements) =>
      elements.forEach((el) => {
        if (el.tomselect) return;
        new TomSelect(el, {
          plugins: ['remove_button'],
          persist: false,
          createOnBlur: true,
          create: false,
        });
      }),
  },
  {
    selector: '.countup',
    lib: 'countup',
    init: (CountUp, elements) =>
      elements.forEach((el) => {
        const endVal = parseFloat(el.dataset.count);
        if (Number.isNaN(endVal)) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          el.textContent = endVal.toLocaleString();
          return;
        }
        const counter = new CountUp(el, endVal);
        if (!counter.error) counter.start();
      }),
  },
  {
    selector: '[data-aos]',
    lib: 'aos',
    // AOS scans the document itself, so it takes no element list.
    init: (AOS) =>
      AOS.init({
        duration: 800,
        once: true,
        disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      }),
  },
];

/** Load and initialise any lazy library whose hook is present in the DOM. */
export function initLazyLibraries(root = document) {
  HOOKS.forEach(({ selector, lib, init }) => {
    const elements = [...root.querySelectorAll(selector)].filter((el) => !initialized.has(el));
    if (!elements.length) return;

    elements.forEach((el) => initialized.add(el));
    load(lib)
      .then((mod) => init(mod, elements))
      .catch((err) => {
        elements.forEach((el) => initialized.delete(el));
        console.error(`Failed to load "${lib}" for ${selector}:`, err);
      });
  });
}

export default { load, initLazyLibraries };
