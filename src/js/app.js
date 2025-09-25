// Kiaalap Admin Dashboard - Main JavaScript Module
import * as bootstrap from 'bootstrap';

// Dashboard App Module
class DashboardApp {
  constructor() {
    this.elements = {};
    this.config = {
      transitionSpeed: 300,
      breakpoints: {
        mobile: 768,
        tablet: 992,
        desktop: 1200,
      },
    };

    this.init();
  }

  init() {
    this.cacheElements();
    this.bindEvents();
    this.restoreState();
    this.initBootstrapComponents();
  }

  cacheElements() {
    // Use data attributes for better maintainability
    this.elements = {
      sidebar: document.querySelector('[data-sidebar]'),
      sidebarToggle: document.querySelector('[data-sidebar-toggle]'),
      sidebarOverlay: document.querySelector('[data-sidebar-overlay]'),
      sidebarClose: document.querySelector('[data-sidebar-close]'),
      mainWrapper: document.querySelector('[data-main-wrapper]'),

      searchToggle: document.querySelector('[data-search-toggle]'),
      searchForm: document.querySelector('[data-search-form]'),
      searchInput: document.querySelector('[data-search-input]'),
      searchClose: document.querySelector('[data-search-close]'),
      searchBackdrop: document.querySelector('[data-search-backdrop]'),
    };
  }

  bindEvents() {
    // Sidebar events
    this.elements.sidebarToggle?.addEventListener('click', () => this.toggleSidebar());
    this.elements.sidebarClose?.addEventListener('click', () => this.closeSidebar());
    this.elements.sidebarOverlay?.addEventListener('click', () => this.closeSidebar());

    // Search events
    this.elements.searchToggle?.addEventListener('click', (e) => this.openSearch(e));
    this.elements.searchClose?.addEventListener('click', (e) => this.closeSearch(e));
    this.elements.searchBackdrop?.addEventListener('click', () => this.closeSearch());
    this.elements.searchForm?.addEventListener('click', (e) => e.stopPropagation());

    // Search input events
    this.elements.searchInput?.addEventListener('input', (e) => this.handleSearchInput(e));

    // Global events
    document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    window.addEventListener('resize', () => this.handleResize());
  }

  // Sidebar methods
  toggleSidebar() {
    const isMobile = this.isMobile();

    if (isMobile) {
      this.elements.sidebar?.classList.add('active');
      this.elements.sidebarOverlay?.classList.add('active');
    } else {
      this.elements.sidebar?.classList.toggle('collapsed');
      this.elements.mainWrapper?.classList.toggle('full-width');
      this.saveSidebarState();
    }
  }

  closeSidebar() {
    this.elements.sidebar?.classList.remove('active');
    this.elements.sidebarOverlay?.classList.remove('active');
  }

  saveSidebarState() {
    const isCollapsed = this.elements.sidebar?.classList.contains('collapsed');
    localStorage.setItem('sidebarCollapsed', isCollapsed);
  }

  restoreState() {
    // Restore sidebar state
    if (localStorage.getItem('sidebarCollapsed') === 'true' && !this.isMobile()) {
      this.elements.sidebar?.classList.add('collapsed');
      this.elements.mainWrapper?.classList.add('full-width');
    }

    // Restore theme if implemented
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }

  // Search methods
  openSearch(e) {
    e?.stopPropagation();
    this.elements.searchForm?.classList.add('active');
    this.elements.searchBackdrop?.classList.add('active');
    this.elements.searchToggle.style.visibility = 'hidden';

    setTimeout(() => {
      this.elements.searchInput?.focus();
    }, this.config.transitionSpeed);
  }

  closeSearch(e) {
    e?.stopPropagation();
    this.elements.searchForm?.classList.remove('active');
    this.elements.searchBackdrop?.classList.remove('active');
    this.elements.searchToggle.style.visibility = 'visible';
    this.elements.searchInput.value = '';

    // Close dropdown if open
    const dropdown = bootstrap.Dropdown.getInstance(this.elements.searchInput);
    dropdown?.hide();
  }

  handleSearchInput(e) {
    if (e.target.value.length > 0) {
      const dropdown = new bootstrap.Dropdown(e.target);
      dropdown.show();
    }
  }

  // Utility methods
  handleKeyPress(e) {
    if (e.key === 'Escape') {
      if (this.elements.searchForm?.classList.contains('active')) {
        this.closeSearch();
      }
    }
  }

  handleResize() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      if (!this.isMobile()) {
        this.closeSidebar();
      } else {
        this.elements.sidebar?.classList.remove('collapsed');
        this.elements.mainWrapper?.classList.remove('full-width');
      }
    }, 250);
  }

  isMobile() {
    return window.innerWidth <= this.config.breakpoints.mobile;
  }

  // Initialize Bootstrap components
  initBootstrapComponents() {
    // Initialize tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

    // Initialize popovers
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    [...popoverTriggerList].map((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl));
  }

  // Public API methods
  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  showNotification(message, type = 'info') {
    // Implementation for toast notifications
    console.log(`${type}: ${message}`);
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.dashboardApp = new DashboardApp();
});

// Export for module usage
export default DashboardApp;
