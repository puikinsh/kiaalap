#!/bin/bash

# Standard navigation template
STANDARD_NAV='        <nav class="sidebar-nav">
            <div class="menu-section">
                <div class="menu-section-title">Main</div>
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link has-submenu" href="#dashboard" data-bs-target="#dashboardSubmenu" aria-expanded="false">
                            <i class="bi bi-speedometer2"></i>
                            <span>Dashboard</span>
                        </a>
                        <ul id="dashboardSubmenu" class="submenu collapse list-unstyled">
                            <li><a class="nav-link" href="index.html">Dashboard v.1</a></li>
                            <li><a class="nav-link" href="index-1.html">Dashboard v.2</a></li>
                            <li><a class="nav-link" href="index-2.html">Dashboard v.3</a></li>
                            <li><a class="nav-link" href="analytics.html">Analytics</a></li>
                            <li><a class="nav-link" href="widgets.html">Widgets</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="events.html">
                            <i class="bi bi-calendar-event"></i>
                            <span>Events</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div class="menu-section">
                <div class="menu-section-title">Academic</div>
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link has-submenu" href="#professors" data-bs-target="#professorsSubmenu" aria-expanded="false">
                            <i class="bi bi-person-badge"></i>
                            <span>Professors</span>
                        </a>
                        <ul id="professorsSubmenu" class="submenu collapse list-unstyled">
                            <li><a class="nav-link" href="all-professors.html">All Professors</a></li>
                            <li><a class="nav-link" href="add-professor.html">Add Professor</a></li>
                            <li><a class="nav-link" href="edit-professor.html">Edit Professor</a></li>
                            <li><a class="nav-link" href="professor-profile.html">Professor Profile</a></li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link has-submenu" href="#students" data-bs-target="#studentsSubmenu" aria-expanded="false">
                            <i class="bi bi-people"></i>
                            <span>Students</span>
                        </a>
                        <ul id="studentsSubmenu" class="submenu collapse list-unstyled">
                            <li><a class="nav-link" href="all-students.html">All Students</a></li>
                            <li><a class="nav-link" href="add-student.html">Add Student</a></li>
                            <li><a class="nav-link" href="edit-student.html">Edit Student</a></li>
                            <li><a class="nav-link" href="student-profile.html">Student Profile</a></li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link has-submenu" href="#courses" data-bs-target="#coursesSubmenu" aria-expanded="false">
                            <i class="bi bi-book"></i>
                            <span>Courses</span>
                        </a>
                        <ul id="coursesSubmenu" class="submenu collapse list-unstyled">
                            <li><a class="nav-link" href="all-courses.html">All Courses</a></li>
                            <li><a class="nav-link" href="add-course.html">Add Course</a></li>
                            <li><a class="nav-link" href="edit-course.html">Edit Course</a></li>
                            <li><a class="nav-link" href="course-info.html">Course Info</a></li>
                            <li><a class="nav-link" href="course-payment.html">Course Payment</a></li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link has-submenu" href="#library" data-bs-target="#librarySubmenu" aria-expanded="false">
                            <i class="bi bi-journal-bookmark"></i>
                            <span>Library</span>
                        </a>
                        <ul id="librarySubmenu" class="submenu collapse list-unstyled">
                            <li><a class="nav-link" href="library-assets.html">Library Assets</a></li>
                            <li><a class="nav-link" href="add-library-assets.html">Add Asset</a></li>
                            <li><a class="nav-link" href="edit-library-assets.html">Edit Asset</a></li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link has-submenu" href="#departments" data-bs-target="#departmentsSubmenu" aria-expanded="false">
                            <i class="bi bi-building"></i>
                            <span>Departments</span>
                        </a>
                        <ul id="departmentsSubmenu" class="submenu collapse list-unstyled">
                            <li><a class="nav-link" href="departments.html">All Departments</a></li>
                            <li><a class="nav-link" href="add-department.html">Add Department</a></li>
                            <li><a class="nav-link" href="edit-department.html">Edit Department</a></li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div class="menu-section">
                <div class="menu-section-title">Communication</div>
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link has-submenu" href="#mailbox" data-bs-target="#mailboxSubmenu" aria-expanded="false">
                            <i class="bi bi-envelope"></i>
                            <span>Mailbox</span>
                        </a>
                        <ul id="mailboxSubmenu" class="submenu collapse list-unstyled">
                            <li><a class="nav-link" href="mailbox.html">Inbox</a></li>
                            <li><a class="nav-link" href="mailbox-compose.html">Compose</a></li>
                            <li><a class="nav-link" href="mailbox-view.html">View Mail</a></li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div class="menu-section">
                <div class="menu-section-title">Interface</div>
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link has-submenu" href="#interface" data-bs-target="#interfaceSubmenu" aria-expanded="false">
                            <i class="bi bi-palette"></i>
                            <span>Interface</span>
                        </a>
                        <ul id="interfaceSubmenu" class="submenu collapse list-unstyled">
                            <li><a class="nav-link" href="buttons.html">Buttons</a></li>
                            <li><a class="nav-link" href="alerts.html">Alerts</a></li>
                            <li><a class="nav-link" href="modals.html">Modals</a></li>
                            <li><a class="nav-link" href="tabs.html">Tabs</a></li>
                            <li><a class="nav-link" href="accordion.html">Accordion</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link has-submenu" href="#charts" data-bs-target="#chartsSubmenu" aria-expanded="false">
                            <i class="bi bi-graph-up"></i>
                            <span>Charts</span>
                        </a>
                        <ul id="chartsSubmenu" class="submenu collapse list-unstyled">
                            <li><a class="nav-link" href="bar-charts.html">Bar Charts</a></li>
                            <li><a class="nav-link" href="line-charts.html">Line Charts</a></li>
                            <li><a class="nav-link" href="area-charts.html">Area Charts</a></li>
                            <li><a class="nav-link" href="c3.html">C3 Charts</a></li>
                            <li><a class="nav-link" href="sparkline.html">Sparkline Charts</a></li>
                            <li><a class="nav-link" href="peity.html">Peity Charts</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link has-submenu" href="#data-tables" data-bs-target="#dataTablesSubmenu" aria-expanded="false">
                            <i class="bi bi-table"></i>
                            <span>Data Tables</span>
                        </a>
                        <ul id="dataTablesSubmenu" class="submenu collapse list-unstyled">
                            <li><a class="nav-link" href="static-table.html">Static Table</a></li>
                            <li><a class="nav-link" href="data-table.html">Data Table</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link has-submenu" href="#forms" data-bs-target="#formsSubmenu" aria-expanded="false">
                            <i class="bi bi-file-text"></i>
                            <span>Forms</span>
                        </a>
                        <ul id="formsSubmenu" class="submenu collapse list-unstyled">
                            <li><a class="nav-link" href="basic-form-element.html">Basic Form Elements</a></li>
                            <li><a class="nav-link" href="advance-form-element.html">Advanced Form Elements</a></li>
                            <li><a class="nav-link" href="password-meter.html">Password Meter</a></li>
                            <li><a class="nav-link" href="multi-upload.html">Multi Upload</a></li>
                            <li><a class="nav-link" href="tinymc.html">Text Editor</a></li>
                            <li><a class="nav-link" href="dual-list-box.html">Dual List Box</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link has-submenu" href="#app-views" data-bs-target="#appViewsSubmenu" aria-expanded="false">
                            <i class="bi bi-window-stack"></i>
                            <span>App Views</span>
                        </a>
                        <ul id="appViewsSubmenu" class="submenu collapse list-unstyled">
                            <li><a class="nav-link" href="notifications.html">Notifications</a></li>
                            <li><a class="nav-link" href="pdf-viewer.html">PDF Viewer</a></li>
                            <li><a class="nav-link" href="code-editor.html">Code Editor</a></li>
                            <li><a class="nav-link" href="tinymc.html">Rich Editor</a></li>
                            <li><a class="nav-link" href="tree-view.html">Tree View</a></li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div class="menu-section">
                <div class="menu-section-title">Pages</div>
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link has-submenu" href="#pages" data-bs-target="#pagesSubmenu" aria-expanded="false">
                            <i class="bi bi-file-earmark"></i>
                            <span>Pages</span>
                        </a>
                        <ul id="pagesSubmenu" class="submenu collapse list-unstyled">
                            <li><a class="nav-link" href="login.html">Login</a></li>
                            <li><a class="nav-link" href="register.html">Register</a></li>
                            <li><a class="nav-link" href="lock.html">Lock Screen</a></li>
                            <li><a class="nav-link" href="password-recovery.html">Password Recovery</a></li>
                            <li><a class="nav-link" href="404.html">404 Page</a></li>
                            <li><a class="nav-link" href="500.html">500 Page</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>'

# Files to process
FILES=(
    "c3.html"
    "peity.html"
    "sparkline.html"
    "rounded-chart.html"
    "buttons.html"
    "alerts.html"
    "modals.html"
    "tabs.html"
    "accordion.html"
    "basic-form-element.html"
    "advance-form-element.html"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "Processing $file..."

        # Extract the content before and after the sidebar-menu section
        BEFORE=$(sed -n '1,/sidebar-menu/p' "$file" | sed '$d')
        AFTER=$(sed -n '/main-content/,$p' "$file")

        # Create a backup
        cp "$file" "$file.nav-backup"

        # Write the new content
        {
            echo "$BEFORE"
            echo "$STANDARD_NAV"
            echo "    </aside>"
            echo ""
            echo "        <div class=\"main-content\">"
            echo "$AFTER" | tail -n +2
        } > "$file"

        echo "  - Updated $file successfully"
    else
        echo "File $file not found"
    fi
done

echo "Navigation update complete!"