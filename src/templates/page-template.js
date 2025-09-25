// Simple JavaScript-based templating system for Kiaalap dashboard pages

export function createPageTemplate({
  pageTitle = 'Page',
  pageDescription = '',
  page = 'default',
  breadcrumbs = [],
  additionalCSS = [],
  pageSpecificStyles = '',
  content = '',
  additionalModals = '',
  pageSpecificJS = '',
}) {
  const sidebarHTML = getSidebarHTML(page);
  const headerHTML = getHeaderHTML(pageTitle, breadcrumbs);

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Kiaalap - ${pageTitle}">
    <meta name="keywords" content="education, dashboard, university, management, admin">
    <meta name="author" content="Kiaalap">

    <!-- Preconnect to external domains -->
    <link rel="preconnect" href="https://images.unsplash.com" crossorigin>
    <link rel="preconnect" href="https://ui-avatars.com" crossorigin>
    <link rel="dns-prefetch" href="https://flagcdn.com">

    <title>${pageTitle} - Kiaalap Dashboard</title>

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">

    <!-- Load stylesheets -->
    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="node_modules/bootstrap-icons/font/bootstrap-icons.css">
    <link rel="stylesheet" href="src/css/dashboard.css">
    ${additionalCSS.map((css) => `<link rel="stylesheet" href="${css}">`).join('\n    ')}

    ${
      pageSpecificStyles
        ? `
    <!-- Page-specific styles -->
    <style>
        ${pageSpecificStyles}
    </style>`
        : ''
    }
</head>
<body>
    <!-- Skip to main content for accessibility -->
    <a href="#main-content" class="visually-hidden-focusable">Skip to main content</a>

    <!-- Required DOM elements for dashboard.js -->
    <div class="search-backdrop" id="searchBackdrop"></div>
    <div class="sidebar-overlay" id="sidebarOverlay"></div>

    ${sidebarHTML}

    <!-- Main Content Wrapper -->
    <div class="main-wrapper" id="mainWrapper">
        ${headerHTML}

        <!-- Main Content -->
        <main class="dashboard-content" id="main-content">
            <div class="container-fluid">
                <!-- Page Header -->
                <div class="page-header mb-4">
                    <h1 class="h3 mb-2">${pageTitle}</h1>
                    ${pageDescription ? `<p class="text-muted">${pageDescription}</p>` : ''}
                </div>

                ${content}
            </div>
        </main>

        <!-- Footer -->
        <footer class="dashboard-footer">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-6">
                        <p class="mb-0">&copy; 2025 Kiaalap. All rights reserved.</p>
                    </div>
                    <div class="col-md-6 text-md-end">
                        <p class="mb-0">Built with <i class="bi bi-heart-fill text-danger"></i> for education</p>
                    </div>
                </div>
            </div>
        </footer>
    </div>

    ${additionalModals}

    <!-- Load JavaScript -->
    <script src="node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script src="src/js/dashboard.js"></script>

    ${
      pageSpecificJS
        ? `
    <script>
        ${pageSpecificJS}
    </script>`
        : ''
    }
</body>
</html>`;
}

function getSidebarHTML(currentPage) {
  const menuItems = [
    {
      section: 'Main',
      items: [
        {
          title: 'Dashboard',
          icon: 'bi-speedometer2',
          id: 'dashboard',
          submenu: [
            { title: 'Dashboard v.1', href: 'index.html', page: 'index' },
            { title: 'Dashboard v.2', href: 'index-1.html', page: 'index-1' },
            { title: 'Dashboard v.3', href: 'index-2.html', page: 'index-2' },
            { title: 'Analytics', href: 'analytics.html', page: 'analytics' },
            { title: 'Widgets', href: 'widgets.html', page: 'widgets' },
          ],
        },
        { title: 'Events', href: 'events.html', icon: 'bi-calendar-event', page: 'events' },
      ],
    },
    {
      section: 'Academic',
      items: [
        {
          title: 'Professors',
          icon: 'bi-person-badge',
          id: 'professors',
          submenu: [
            { title: 'All Professors', href: 'all-professors.html', page: 'all-professors' },
            { title: 'Add Professor', href: 'add-professor.html', page: 'add-professor' },
            { title: 'Edit Professor', href: 'edit-professor.html', page: 'edit-professor' },
            {
              title: 'Professor Profile',
              href: 'professor-profile.html',
              page: 'professor-profile',
            },
          ],
        },
        {
          title: 'Students',
          icon: 'bi-people',
          id: 'students',
          submenu: [
            { title: 'All Students', href: 'all-students.html', page: 'all-students' },
            { title: 'Add Student', href: 'add-student.html', page: 'add-student' },
            { title: 'Edit Student', href: 'edit-student.html', page: 'edit-student' },
            { title: 'Student Profile', href: 'student-profile.html', page: 'student-profile' },
          ],
        },
        {
          title: 'Courses',
          icon: 'bi-book',
          id: 'courses',
          submenu: [
            { title: 'All Courses', href: 'all-courses.html', page: 'all-courses' },
            { title: 'Add Course', href: 'add-course.html', page: 'add-course' },
            { title: 'Edit Course', href: 'edit-course.html', page: 'edit-course' },
            { title: 'Course Info', href: 'course-info.html', page: 'course-info' },
            { title: 'Course Payment', href: 'course-payment.html', page: 'course-payment' },
          ],
        },
        {
          title: 'Library',
          icon: 'bi-journal-bookmark',
          id: 'library',
          submenu: [
            { title: 'Library Assets', href: 'library-assets.html', page: 'library-assets' },
            {
              title: 'Add Library Asset',
              href: 'add-library-assets.html',
              page: 'add-library-assets',
            },
            {
              title: 'Edit Library Asset',
              href: 'edit-library-assets.html',
              page: 'edit-library-assets',
            },
          ],
        },
        {
          title: 'Departments',
          icon: 'bi-building',
          id: 'departments',
          submenu: [
            { title: 'Departments List', href: 'departments.html', page: 'departments' },
            { title: 'Add Department', href: 'add-department.html', page: 'add-department' },
            { title: 'Edit Department', href: 'edit-department.html', page: 'edit-department' },
          ],
        },
      ],
    },
    {
      section: 'Communication',
      items: [
        {
          title: 'Mailbox',
          icon: 'bi-envelope',
          id: 'mailbox',
          submenu: [
            { title: 'Inbox', href: 'mailbox.html', page: 'mailbox' },
            { title: 'Compose', href: 'mailbox-compose.html', page: 'mailbox-compose' },
            { title: 'View Message', href: 'mailbox-view.html', page: 'mailbox-view' },
          ],
        },
      ],
    },
    {
      section: 'Interface',
      items: [
        {
          title: 'Components',
          icon: 'bi-layout-wtf',
          id: 'components',
          submenu: [
            { title: 'Buttons', href: 'buttons.html', page: 'buttons' },
            { title: 'Alerts', href: 'alerts.html', page: 'alerts' },
            { title: 'Modals', href: 'modals.html', page: 'modals' },
            { title: 'Tabs', href: 'tabs.html', page: 'tabs' },
            { title: 'Accordion', href: 'accordion.html', page: 'accordion' },
          ],
        },
        {
          title: 'Forms',
          icon: 'bi-card-list',
          id: 'forms',
          submenu: [
            { title: 'Basic Forms', href: 'basic-form-element.html', page: 'basic-form-element' },
            {
              title: 'Advanced Forms',
              href: 'advance-form-element.html',
              page: 'advance-form-element',
            },
            { title: 'Password Meter', href: 'password-meter.html', page: 'password-meter' },
            { title: 'File Upload', href: 'multi-upload.html', page: 'multi-upload' },
          ],
        },
        {
          title: 'Charts',
          icon: 'bi-bar-chart',
          id: 'charts',
          submenu: [
            { title: 'Line Charts', href: 'line-charts.html', page: 'line-charts' },
            { title: 'Area Charts', href: 'area-charts.html', page: 'area-charts' },
            { title: 'Bar Charts', href: 'bar-charts.html', page: 'bar-charts' },
            { title: 'C3 Charts', href: 'c3.html', page: 'c3' },
            { title: 'Peity Charts', href: 'peity.html', page: 'peity' },
          ],
        },
        {
          title: 'Tables',
          icon: 'bi-table',
          id: 'tables',
          submenu: [
            { title: 'Static Tables', href: 'static-table.html', page: 'static-table' },
            { title: 'Data Tables', href: 'data-table.html', page: 'data-table' },
          ],
        },
      ],
    },
    {
      section: 'Pages',
      items: [
        {
          title: 'Authentication',
          icon: 'bi-shield-lock',
          id: 'authentication',
          submenu: [
            { title: 'Login', href: 'login.html', page: 'login' },
            { title: 'Register', href: 'register.html', page: 'register' },
            { title: 'Lock Screen', href: 'lock.html', page: 'lock' },
            { title: 'Forgot Password', href: 'password-recovery.html', page: 'password-recovery' },
          ],
        },
        {
          title: 'Error Pages',
          icon: 'bi-exclamation-triangle',
          id: 'errors',
          submenu: [
            { title: '404 Error', href: '404.html', page: '404' },
            { title: '500 Error', href: '500.html', page: '500' },
          ],
        },
      ],
    },
  ];

  function isInSubmenu(page, submenu) {
    return submenu && submenu.some((item) => item.page === page);
  }

  function shouldExpandSubmenu(page, submenu) {
    return isInSubmenu(page, submenu);
  }

  let html = `
    <!-- Sidebar -->
    <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <div class="sidebar-brand">
                <h5>
                    <i class="bi bi-mortarboard-fill"></i>
                    Kiaalap
                </h5>
                <button class="sidebar-close" id="sidebarClose">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>
        </div>

        <nav class="sidebar-nav">`;

  menuItems.forEach((section) => {
    html += `
            <div class="menu-section">
                <div class="menu-section-title">${section.section}</div>
                <ul class="nav flex-column">`;

    section.items.forEach((item) => {
      if (item.submenu) {
        const isExpanded = shouldExpandSubmenu(currentPage, item.submenu);
        const hasActiveItem = isInSubmenu(currentPage, item.submenu);

        html += `
                    <li class="nav-item">
                        <a class="nav-link has-submenu ${hasActiveItem ? 'active' : ''}" href="#${item.id}" data-bs-target="#${item.id}Submenu" aria-expanded="${isExpanded}">
                            <i class="bi ${item.icon}"></i>
                            <span>${item.title}</span>
                        </a>
                        <ul id="${item.id}Submenu" class="submenu collapse ${isExpanded ? 'show' : ''} list-unstyled">`;

        item.submenu.forEach((subitem) => {
          const isActive = subitem.page === currentPage ? 'active' : '';
          html += `
                            <li><a class="nav-link ${isActive}" href="${subitem.href}">${subitem.title}</a></li>`;
        });

        html += `
                        </ul>
                    </li>`;
      } else {
        const isActive = item.page === currentPage ? 'active' : '';
        html += `
                    <li class="nav-item">
                        <a class="nav-link ${isActive}" href="${item.href}">
                            <i class="bi ${item.icon}"></i>
                            <span>${item.title}</span>
                        </a>
                    </li>`;
      }
    });

    html += `
                </ul>
            </div>`;
  });

  html += `
        </nav>
    </aside>`;

  return html;
}

function getHeaderHTML(pageTitle, breadcrumbs = []) {
  let breadcrumbHTML = `
        <nav aria-label="breadcrumb" class="d-none d-lg-block ms-3">
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item"><a href="index.html">Home</a></li>`;

  breadcrumbs.forEach((crumb, index) => {
    if (index === breadcrumbs.length - 1) {
      breadcrumbHTML += `<li class="breadcrumb-item active">${crumb.title}</li>`;
    } else {
      breadcrumbHTML += `<li class="breadcrumb-item"><a href="${crumb.url || '#'}">${crumb.title}</a></li>`;
    }
  });

  breadcrumbHTML += `
            </ol>
        </nav>`;

  return `
    <!-- Header -->
    <nav class="navbar top-navbar">
        <div class="container-fluid d-flex align-items-center h-100">
            <!-- Hamburger Menu -->
            <button class="hamburger-menu" id="sidebarToggle">
                <i class="bi bi-list"></i>
            </button>

            ${breadcrumbHTML}

            <!-- Logo for mobile -->
            <div class="navbar-brand d-lg-none fw-bold me-auto">Kiaalap</div>

            <!-- Spacer for desktop -->
            <div class="flex-grow-1 d-none d-lg-block"></div>

            <!-- Right Actions -->
            <div class="d-flex align-items-center gap-2">
                <!-- Search -->
                <div class="search-container">
                    <button class="btn btn-light btn-icon" id="searchToggle">
                        <i class="bi bi-search"></i>
                    </button>

                    <form class="search-form" id="searchForm">
                        <i class="bi bi-search search-icon"></i>
                        <input type="text"
                               class="form-control"
                               id="searchInput"
                               placeholder="Search..."
                               data-bs-toggle="dropdown">
                        <button type="button" class="close-search" id="closeSearch">
                            <i class="bi bi-x-lg"></i>
                        </button>

                        <ul class="dropdown-menu w-100 mt-2">
                            <li><a class="dropdown-item" href="#">Student Registration</a></li>
                            <li><a class="dropdown-item" href="#">Course Schedule</a></li>
                            <li><a class="dropdown-item" href="#">Grade Reports</a></li>
                        </ul>
                    </form>
                </div>

                <!-- Quick Actions -->
                <button class="btn btn-primary btn-sm hide-mobile">
                    <i class="bi bi-plus-circle me-1"></i> New
                </button>

                <!-- Messages -->
                <div class="dropdown">
                    <button class="btn btn-light btn-icon position-relative"
                            data-bs-toggle="dropdown">
                        <i class="bi bi-chat-dots"></i>
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                              style="font-size: 0.625rem;">5</span>
                    </button>
                    <div class="dropdown-menu dropdown-menu-end">
                        <div class="px-3 py-2 border-bottom">
                            <h6 class="mb-0">Messages</h6>
                        </div>
                        <div class="p-2" style="max-height: 300px; overflow-y: auto;">
                            <a href="#" class="notification-item">
                                <img src="https://ui-avatars.com/api/?name=Sarah+Johnson&background=10b981&color=fff"
                                     class="rounded-circle"
                                     width="36"
                                     height="36"
                                     alt="Sarah">
                                <div class="flex-grow-1">
                                    <div class="fw-semibold small">Sarah Johnson</div>
                                    <div class="text-muted small">Can you review my thesis?</div>
                                    <div class="text-muted" style="font-size: 0.7rem;">2 min ago</div>
                                </div>
                            </a>
                            <a href="#" class="notification-item">
                                <img src="https://ui-avatars.com/api/?name=Mike+Chen&background=6366f1&color=fff"
                                     class="rounded-circle"
                                     width="36"
                                     height="36"
                                     alt="Mike">
                                <div class="flex-grow-1">
                                    <div class="fw-semibold small">Mike Chen</div>
                                    <div class="text-muted small">Meeting at 3 PM today</div>
                                    <div class="text-muted" style="font-size: 0.7rem;">1 hour ago</div>
                                </div>
                            </a>
                        </div>
                        <div class="border-top p-2 text-center">
                            <a href="#" class="text-primary small">View All Messages</a>
                        </div>
                    </div>
                </div>

                <!-- Notifications -->
                <div class="dropdown">
                    <button class="btn btn-light btn-icon position-relative"
                            data-bs-toggle="dropdown">
                        <i class="bi bi-bell"></i>
                        <span class="notification-dot"></span>
                    </button>
                    <div class="dropdown-menu dropdown-menu-end">
                        <div class="px-3 py-2 border-bottom">
                            <h6 class="mb-0">Notifications</h6>
                        </div>
                        <div class="p-2" style="max-height: 350px; overflow-y: auto;">
                            <a href="#" class="notification-item">
                                <div class="notification-icon bg-primary bg-opacity-10 text-primary">
                                    <i class="bi bi-calendar-check"></i>
                                </div>
                                <div class="flex-grow-1">
                                    <div class="fw-semibold small">New Event</div>
                                    <div class="text-muted small">Science Fair on March 15</div>
                                    <div class="text-muted" style="font-size: 0.7rem;">5 minutes ago</div>
                                </div>
                            </a>
                            <a href="#" class="notification-item">
                                <div class="notification-icon bg-success bg-opacity-10 text-success">
                                    <i class="bi bi-check-circle"></i>
                                </div>
                                <div class="flex-grow-1">
                                    <div class="fw-semibold small">Assignment Submitted</div>
                                    <div class="text-muted small">John submitted his project</div>
                                    <div class="text-muted" style="font-size: 0.7rem;">2 hours ago</div>
                                </div>
                            </a>
                            <a href="#" class="notification-item">
                                <div class="notification-icon bg-warning bg-opacity-10 text-warning">
                                    <i class="bi bi-exclamation-triangle"></i>
                                </div>
                                <div class="flex-grow-1">
                                    <div class="fw-semibold small">System Alert</div>
                                    <div class="text-muted small">Database backup completed</div>
                                    <div class="text-muted" style="font-size: 0.7rem;">Yesterday</div>
                                </div>
                            </a>
                        </div>
                        <div class="border-top p-2 text-center">
                            <a href="#" class="text-primary small">View All Notifications</a>
                        </div>
                    </div>
                </div>

                <!-- User Menu -->
                <div class="dropdown">
                    <button class="btn btn-light d-flex align-items-center px-2 btn-icon"
                            data-bs-toggle="dropdown">
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
                             alt="User"
                             class="user-avatar"
                             loading="lazy"
                             width="32"
                             height="32">
                        <span class="hide-mobile ms-2" style="font-size: 0.875rem;">Sarah Johnson</span>
                        <i class="bi bi-chevron-down hide-mobile ms-1" style="font-size: 0.75rem;"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li class="px-3 py-2 border-bottom">
                            <div class="d-flex align-items-center">
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
                                     alt="User"
                                     width="48"
                                     height="48"
                                     class="rounded-circle">
                                <div class="ms-3">
                                    <div class="fw-semibold">Sarah Johnson</div>
                                    <div class="text-muted small">sarah.johnson@kiaalap.edu</div>
                                </div>
                            </div>
                        </li>
                        <li><a class="dropdown-item" href="#"><i class="bi bi-person me-2"></i> Profile</a></li>
                        <li><a class="dropdown-item" href="#"><i class="bi bi-gear me-2"></i> Settings</a></li>
                        <li><a class="dropdown-item" href="#"><i class="bi bi-bell me-2"></i> Preferences</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#"><i class="bi bi-box-arrow-right me-2"></i> Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>`;
}
