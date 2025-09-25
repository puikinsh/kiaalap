/* Kiaalap Dashboard - Main JavaScript */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
  // Get all elements
  const elements = {
    sidebar: document.getElementById('sidebar'),
    sidebarToggle: document.getElementById('sidebarToggle'),
    sidebarClose: document.getElementById('sidebarClose'),
    sidebarOverlay: document.getElementById('sidebarOverlay'),
    mainWrapper: document.getElementById('mainWrapper'),
    searchToggle: document.getElementById('searchToggle'),
    searchForm: document.getElementById('searchForm'),
    searchInput: document.getElementById('searchInput'),
    closeSearch: document.getElementById('closeSearch'),
    searchBackdrop: document.getElementById('searchBackdrop'),
  };

  // ========================================
  // SIDEBAR FUNCTIONALITY
  // ========================================

  // Sidebar toggle
  elements.sidebarToggle?.addEventListener('click', function () {
    if (window.innerWidth <= 768) {
      // Mobile: show sidebar with overlay
      elements.sidebar.classList.add('active');
      elements.sidebarOverlay.classList.add('active');
    } else {
      // Desktop: collapse sidebar
      elements.sidebar.classList.toggle('collapsed');
      elements.mainWrapper.classList.toggle('full-width');

      // Save state to localStorage
      const isCollapsed = elements.sidebar.classList.contains('collapsed');
      localStorage.setItem('sidebarCollapsed', isCollapsed);
    }
  });

  // Close sidebar on mobile
  elements.sidebarClose?.addEventListener('click', function () {
    elements.sidebar.classList.remove('active');
    elements.sidebarOverlay.classList.remove('active');
  });

  elements.sidebarOverlay?.addEventListener('click', function () {
    elements.sidebar.classList.remove('active');
    elements.sidebarOverlay.classList.remove('active');
  });

  // Restore sidebar state on desktop
  if (localStorage.getItem('sidebarCollapsed') === 'true' && window.innerWidth > 768) {
    elements.sidebar?.classList.add('collapsed');
    elements.mainWrapper?.classList.add('full-width');
  }

  // ========================================
  // SEARCH FUNCTIONALITY
  // ========================================

  // Open search
  elements.searchToggle?.addEventListener('click', function (e) {
    e.stopPropagation();
    elements.searchForm.classList.add('active');
    elements.searchBackdrop.classList.add('active');
    elements.searchToggle.style.visibility = 'hidden';

    // Focus input after animation
    setTimeout(() => elements.searchInput?.focus(), 300);
  });

  // Close search
  function closeSearchBar() {
    elements.searchForm?.classList.remove('active');
    elements.searchBackdrop?.classList.remove('active');
    if (elements.searchToggle) {
      elements.searchToggle.style.visibility = 'visible';
    }
    if (elements.searchInput) {
      elements.searchInput.value = '';
    }
  }

  elements.closeSearch?.addEventListener('click', function (e) {
    e.stopPropagation();
    closeSearchBar();
  });

  elements.searchBackdrop?.addEventListener('click', closeSearchBar);

  // Prevent search form from closing when clicking inside
  elements.searchForm?.addEventListener('click', function (e) {
    e.stopPropagation();
  });

  // ESC key to close search
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && elements.searchForm?.classList.contains('active')) {
      closeSearchBar();
    }
  });

  // ========================================
  // RESPONSIVE HANDLING
  // ========================================

  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth > 768) {
        // Desktop view: remove mobile classes
        elements.sidebar?.classList.remove('active');
        elements.sidebarOverlay?.classList.remove('active');
      } else {
        // Mobile view: remove desktop classes
        elements.sidebar?.classList.remove('collapsed');
        elements.mainWrapper?.classList.remove('full-width');
      }
    }, 250);
  });

  // ========================================
  // BOOTSTRAP COMPONENTS INITIALIZATION
  // ========================================

  // Initialize tooltips
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

  // Initialize popovers
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  [...popoverTriggerList].map((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl));

  // ========================================
  // SUBMENU FUNCTIONALITY
  // ========================================

  // Handle submenu toggle clicks
  const submenuToggles = document.querySelectorAll('.sidebar-nav .nav-link.has-submenu');

  submenuToggles.forEach((toggle) => {
    toggle.addEventListener('click', function (e) {
      // Prevent default link behavior
      e.preventDefault();
      e.stopPropagation();

      // Get the target submenu
      const targetId = this.getAttribute('data-bs-target');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Check if submenu is currently shown
        const isShown = targetElement.classList.contains('show');

        if (isShown) {
          // Collapse the submenu
          bootstrap.Collapse.getInstance(targetElement)?.hide();
          this.setAttribute('aria-expanded', 'false');
        } else {
          // Expand the submenu
          // First, get or create the collapse instance
          let bsCollapse = bootstrap.Collapse.getInstance(targetElement);
          if (!bsCollapse) {
            bsCollapse = new bootstrap.Collapse(targetElement, {
              toggle: false,
            });
          }
          bsCollapse.show();
          this.setAttribute('aria-expanded', 'true');
        }
      }
    });
  });

  // ========================================
  // ACTIVE MENU HIGHLIGHTING
  // ========================================

  // Get current page
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.sidebar-nav .nav-link:not(.has-submenu)');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && currentPath.endsWith(href.replace('#', ''))) {
      link.classList.add('active');

      // If this is a submenu item, also expand its parent
      const parentSubmenu = link.closest('.submenu');
      if (parentSubmenu) {
        parentSubmenu.classList.add('show');
        const parentToggle = document.querySelector(`[data-bs-target="#${parentSubmenu.id}"]`);
        if (parentToggle) {
          parentToggle.setAttribute('aria-expanded', 'true');
          parentToggle.classList.add('active');
        }
      }
    }
  });
});
