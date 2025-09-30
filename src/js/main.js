// Import styles
import '../scss/main.scss';

// Import Bootstrap and dependencies
import * as bootstrap from 'bootstrap';
import $ from 'jquery';

// Import layout functionality
import layout from './layout';
import './dashboard.js';
import './charts.js';

// Make jQuery globally available for legacy plugins
window.$ = window.jQuery = $;
window.layout = layout;

// Import modern libraries
import AOS from 'aos';
import { CountUp } from 'countup.js';
import Chart from 'chart.js/auto';
import dayjs from 'dayjs';
import Swiper from 'swiper';
import SimpleBar from 'simplebar';
import TomSelect from 'tom-select';

// Import MetisMenu for sidebar
import MetisMenu from 'metismenu';

// Make libraries globally available
window.bootstrap = bootstrap;
window.Chart = Chart;
window.dayjs = dayjs;
window.Swiper = Swiper;
window.SimpleBar = SimpleBar;
window.TomSelect = TomSelect;
window.CountUp = CountUp;

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  once: true,
});

// Initialize Bootstrap tooltips and popovers
document.addEventListener('DOMContentLoaded', function () {
  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Initialize popovers
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });

  // Initialize MetisMenu for sidebar
  const sideMenu = document.querySelector('#side-menu');
  if (sideMenu) {
    new MetisMenu('#side-menu');
  }

  // Initialize SimpleBar for custom scrollbars
  const scrollElements = document.querySelectorAll('[data-simplebar]');
  scrollElements.forEach((el) => {
    new SimpleBar(el);
  });

  // Initialize Tom Select for enhanced dropdowns
  const selectElements = document.querySelectorAll('.tom-select');
  selectElements.forEach((el) => {
    new TomSelect(el, {
      plugins: ['remove_button'],
      persist: false,
      createOnBlur: true,
      create: false,
    });
  });

  // Sidebar toggle for mobile
  const sidebarToggle = document.querySelector('#sidebarToggle');
  const sidebar = document.querySelector('.sidebar');

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function () {
      sidebar.classList.toggle('show');
    });
  }

  // Initialize CountUp for number animations
  const countupElements = document.querySelectorAll('.countup');
  countupElements.forEach((el) => {
    const endVal = parseFloat(el.getAttribute('data-count'));
    const countUp = new CountUp(el, endVal);
    if (!countUp.error) {
      countUp.start();
    }
  });
});

// Export functions for use in other scripts
export { Chart, dayjs, Swiper, SimpleBar, TomSelect, CountUp };
