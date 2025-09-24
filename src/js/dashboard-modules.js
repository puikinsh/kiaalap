/**
 * Kiaalap Dashboard Modules
 * Modular, performant JavaScript for dashboard functionality
 */

// Dashboard Module Pattern
const KiaalapDashboard = (() => {
    'use strict';

    // Configuration
    const config = {
        animationDuration: 300,
        debounceDelay: 250,
        lazyLoadOffset: 50,
        chartUpdateInterval: 30000, // 30 seconds
        cacheTimeout: 300000, // 5 minutes
    };

    // Cache for API responses
    const cache = new Map();

    // Utility functions
    const utils = {
        /**
         * Debounce function for performance
         */
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        /**
         * Throttle function for scroll events
         */
        throttle(func, limit) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        /**
         * Format numbers with proper localization
         */
        formatNumber(num) {
            return new Intl.NumberFormat('en-US').format(num);
        },

        /**
         * Format currency
         */
        formatCurrency(num) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(num);
        },

        /**
         * Animate counter
         */
        animateCounter(element, start, end, duration) {
            const range = end - start;
            const minTimer = 50;
            let stepTime = Math.abs(Math.floor(duration / range));
            stepTime = Math.max(stepTime, minTimer);
            const startTime = new Date().getTime();
            const endTime = startTime + duration;
            let timer;

            function run() {
                const now = new Date().getTime();
                const remaining = Math.max((endTime - now) / duration, 0);
                const value = Math.round(end - (remaining * range));
                element.textContent = utils.formatNumber(value);
                if (value === end) {
                    clearInterval(timer);
                }
            }

            timer = setInterval(run, stepTime);
            run();
        }
    };

    // Component modules
    const components = {
        /**
         * Search functionality
         */
        search: {
            init() {
                const searchToggle = document.getElementById('searchToggle');
                const searchForm = document.getElementById('searchForm');
                const searchInput = document.getElementById('searchInput');
                const closeSearch = document.getElementById('closeSearch');
                const searchBackdrop = document.getElementById('searchBackdrop');

                if (!searchToggle || !searchForm) return;

                searchToggle.addEventListener('click', () => this.toggle());
                closeSearch?.addEventListener('click', () => this.close());
                searchBackdrop?.addEventListener('click', () => this.close());

                // Debounced search
                searchInput?.addEventListener('input', utils.debounce((e) => {
                    this.performSearch(e.target.value);
                }, config.debounceDelay));

                // Keyboard shortcuts
                document.addEventListener('keydown', (e) => {
                    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                        e.preventDefault();
                        this.toggle();
                    }
                    if (e.key === 'Escape' && searchForm.classList.contains('show')) {
                        this.close();
                    }
                });
            },

            toggle() {
                const searchForm = document.getElementById('searchForm');
                const searchBackdrop = document.getElementById('searchBackdrop');
                const searchInput = document.getElementById('searchInput');

                searchForm?.classList.toggle('show');
                searchBackdrop?.classList.toggle('show');

                if (searchForm?.classList.contains('show')) {
                    searchInput?.focus();
                }
            },

            close() {
                document.getElementById('searchForm')?.classList.remove('show');
                document.getElementById('searchBackdrop')?.classList.remove('show');
                document.getElementById('searchInput').value = '';
            },

            async performSearch(query) {
                if (query.length < 2) return;

                // Check cache first
                const cacheKey = `search_${query}`;
                if (cache.has(cacheKey)) {
                    const { data, timestamp } = cache.get(cacheKey);
                    if (Date.now() - timestamp < config.cacheTimeout) {
                        this.displayResults(data);
                        return;
                    }
                }

                // Simulate API call (replace with actual API)
                try {
                    // const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                    // const data = await response.json();

                    // For demo purposes
                    const data = [
                        { title: 'Student Registration', url: '#registration' },
                        { title: 'Course Schedule', url: '#schedule' },
                        { title: 'Grade Reports', url: '#grades' },
                    ].filter(item =>
                        item.title.toLowerCase().includes(query.toLowerCase())
                    );

                    // Cache the results
                    cache.set(cacheKey, { data, timestamp: Date.now() });
                    this.displayResults(data);
                } catch (error) {
                    console.error('Search error:', error);
                }
            },

            displayResults(results) {
                // Implementation for displaying search results
                console.log('Search results:', results);
            }
        },

        /**
         * Notification system
         */
        notifications: {
            init() {
                // Initialize notification polling
                this.pollNotifications();
                setInterval(() => this.pollNotifications(), 60000); // Check every minute
            },

            async pollNotifications() {
                try {
                    // const response = await fetch('/api/notifications');
                    // const data = await response.json();
                    // this.updateNotificationBadge(data.count);
                } catch (error) {
                    console.error('Failed to fetch notifications:', error);
                }
            },

            updateNotificationBadge(count) {
                const badge = document.querySelector('.notification-dot');
                if (badge) {
                    badge.style.display = count > 0 ? 'block' : 'none';
                }
            }
        },

        /**
         * Sidebar management
         */
        sidebar: {
            init() {
                const sidebarToggle = document.getElementById('sidebarToggle');
                const sidebarClose = document.getElementById('sidebarClose');
                const sidebarOverlay = document.getElementById('sidebarOverlay');
                const submenus = document.querySelectorAll('.has-submenu');

                sidebarToggle?.addEventListener('click', () => this.toggle());
                sidebarClose?.addEventListener('click', () => this.close());
                sidebarOverlay?.addEventListener('click', () => this.close());

                // Handle submenu toggles
                submenus.forEach(menu => {
                    menu.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.toggleSubmenu(menu);
                    });
                });

                // Persist sidebar state
                this.restoreState();
            },

            toggle() {
                const sidebar = document.getElementById('sidebar');
                const mainWrapper = document.getElementById('mainWrapper');
                const overlay = document.getElementById('sidebarOverlay');

                sidebar?.classList.toggle('show');
                mainWrapper?.classList.toggle('sidebar-open');
                overlay?.classList.toggle('show');

                // Save state to localStorage
                const isOpen = sidebar?.classList.contains('show');
                localStorage.setItem('sidebarOpen', isOpen);
            },

            close() {
                document.getElementById('sidebar')?.classList.remove('show');
                document.getElementById('mainWrapper')?.classList.remove('sidebar-open');
                document.getElementById('sidebarOverlay')?.classList.remove('show');
                localStorage.setItem('sidebarOpen', false);
            },

            toggleSubmenu(menu) {
                const targetId = menu.getAttribute('data-bs-target');
                const submenu = document.querySelector(targetId);

                if (submenu) {
                    submenu.classList.toggle('show');
                    menu.setAttribute('aria-expanded',
                        submenu.classList.contains('show'));
                }
            },

            restoreState() {
                const isOpen = localStorage.getItem('sidebarOpen') === 'true';
                if (isOpen && window.innerWidth < 768) {
                    this.toggle();
                }
            }
        },

        /**
         * Dashboard widgets
         */
        widgets: {
            init() {
                this.initCounters();
                this.initProgressBars();
                this.loadDynamicContent();
            },

            initCounters() {
                const counters = document.querySelectorAll('[data-counter]');

                if ('IntersectionObserver' in window) {
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                const target = parseInt(entry.target.dataset.counter);
                                utils.animateCounter(entry.target, 0, target, 2000);
                                observer.unobserve(entry.target);
                            }
                        });
                    }, { threshold: 0.5 });

                    counters.forEach(counter => observer.observe(counter));
                } else {
                    // Fallback for older browsers
                    counters.forEach(counter => {
                        const target = parseInt(counter.dataset.counter);
                        utils.animateCounter(counter, 0, target, 2000);
                    });
                }
            },

            initProgressBars() {
                const progressBars = document.querySelectorAll('[data-progress]');

                progressBars.forEach(bar => {
                    const progress = bar.dataset.progress;
                    setTimeout(() => {
                        bar.style.width = `${progress}%`;
                    }, 100);
                });
            },

            async loadDynamicContent() {
                // Load dashboard content
                try {
                    const response = await fetch('dashboard-content.html');
                    const html = await response.text();
                    const contentArea = document.getElementById('dashboardContent');
                    if (contentArea) {
                        contentArea.innerHTML = html;
                        // Reinitialize components after content load
                        this.initCounters();
                        this.initProgressBars();
                    }
                } catch (error) {
                    console.error('Failed to load dashboard content:', error);
                    // Show fallback content
                    this.showFallbackContent();
                }
            },

            showFallbackContent() {
                const contentArea = document.getElementById('dashboardContent');
                if (contentArea) {
                    contentArea.innerHTML = '<div class="alert alert-warning">Unable to load dashboard content. Please refresh the page.</div>';
                }
            }
        }
    };

    // Public API
    return {
        init() {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.initialize());
            } else {
                this.initialize();
            }
        },

        initialize() {
            // Initialize all components
            components.search.init();
            components.notifications.init();
            components.sidebar.init();
            components.widgets.init();

            // Set up global error handler
            window.addEventListener('error', (e) => {
                console.error('Dashboard error:', e);
                // Could send to error tracking service
            });

            // Handle responsive behavior
            this.handleResponsive();
            window.addEventListener('resize', utils.throttle(() => {
                this.handleResponsive();
            }, 250));

            console.log('Kiaalap Dashboard initialized');
        },

        handleResponsive() {
            const isMobile = window.innerWidth < 768;
            const sidebar = document.getElementById('sidebar');
            const mainWrapper = document.getElementById('mainWrapper');

            if (isMobile && !sidebar?.classList.contains('show')) {
                mainWrapper?.classList.add('full-width');
            } else {
                mainWrapper?.classList.remove('full-width');
            }
        },

        // Expose utilities for external use
        utils,

        // Version info
        version: '1.0.0'
    };
})();

// Initialize the dashboard
KiaalapDashboard.init();

// Export for module systems
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = KiaalapDashboard;
}