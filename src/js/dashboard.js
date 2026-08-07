/* Kiaalap Dashboard - DOM wiring for the dashboard shell.
 *
 * This is the ONLY module that attaches listeners to the shell controls
 * (#sidebarToggle, search bar, sidebar submenus). Keep it that way — adding a
 * second handler elsewhere for the same control reintroduces the double-toggle
 * bug this file was written to fix.
 */

import * as bootstrap from 'bootstrap';
import {
  isMobile,
  openMobileSidebar,
  closeMobileSidebar,
  restoreSidebarState,
  setMobileOpen,
  setCollapsed,
  toggleSidebar,
} from './layout.js';

function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebarClose = document.getElementById('sidebarClose');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const mainWrapper = document.getElementById('mainWrapper');

  if (!sidebar) return;

  restoreSidebarState();

  sidebarToggle?.addEventListener('click', function () {
    if (isMobile()) {
      openMobileSidebar();
    } else {
      toggleSidebar();
    }
  });

  sidebarClose?.addEventListener('click', closeMobileSidebar);
  sidebarOverlay?.addEventListener('click', closeMobileSidebar);

  // Close the mobile sidebar with Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
      closeMobileSidebar();
    }
  });

  // Drop whichever set of classes no longer applies when crossing the
  // breakpoint, so the two modes can't both be active at once.
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (isMobile()) {
        sidebar.classList.remove('collapsed');
        mainWrapper?.classList.remove('full-width');
      } else {
        setMobileOpen(false);
        // Re-apply the persisted desktop state rather than leaving the
        // sidebar expanded after a resize.
        restoreSidebarState();
      }
    }, 250);
  });
}

function initSearch() {
  const searchToggle = document.getElementById('searchToggle');
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const closeSearch = document.getElementById('closeSearch');
  const searchBackdrop = document.getElementById('searchBackdrop');

  if (!searchToggle || !searchForm) return;

  function closeSearchBar() {
    searchForm.classList.remove('active');
    searchBackdrop?.classList.remove('active');
    searchToggle.style.visibility = 'visible';
    if (searchInput) searchInput.value = '';
  }

  searchToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    searchForm.classList.add('active');
    searchBackdrop?.classList.add('active');
    searchToggle.style.visibility = 'hidden';
    setTimeout(() => searchInput?.focus(), 300);
  });

  closeSearch?.addEventListener('click', function (e) {
    e.stopPropagation();
    closeSearchBar();
  });

  searchBackdrop?.addEventListener('click', closeSearchBar);

  // Clicks inside the form must not bubble up to the document handler
  searchForm.addEventListener('click', (e) => e.stopPropagation());

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && searchForm.classList.contains('active')) {
      closeSearchBar();
    }
  });
}

function initActiveMenuHighlighting() {
  // Server-side rendering already marks the active link via the `page` context
  // in vite.config.js. This is the fallback for pages served without that
  // context (e.g. the standalone auth pages) and for deep links.
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.sidebar-nav .nav-link:not(.has-submenu)');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;

    if (href !== currentPage) return;

    link.classList.add('active');

    const parentSubmenu = link.closest('.submenu');
    if (!parentSubmenu) return;

    parentSubmenu.classList.add('show');
    const parentToggle = document.querySelector(`[data-bs-target="#${parentSubmenu.id}"]`);
    if (parentToggle) {
      parentToggle.setAttribute('aria-expanded', 'true');
      parentToggle.classList.add('active');
    }
  });
}

function initBootstrapComponents() {
  document
    .querySelectorAll('[data-bs-toggle="tooltip"]')
    .forEach((el) => new bootstrap.Tooltip(el));

  document
    .querySelectorAll('[data-bs-toggle="popover"]')
    .forEach((el) => new bootstrap.Popover(el));
}

// Sidebar submenus use standard `data-bs-toggle="collapse"` markup, so
// Bootstrap's own delegated handler drives them (and keeps aria-expanded in
// sync). Do not add a manual collapse handler here — it would fire alongside
// Bootstrap's and cancel it out.
document.addEventListener('DOMContentLoaded', function () {
  initSidebar();
  initSearch();
  initActiveMenuHighlighting();
  initBootstrapComponents();
});

export { setCollapsed };
