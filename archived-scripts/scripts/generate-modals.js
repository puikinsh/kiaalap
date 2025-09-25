import { createPageTemplate } from '../src/templates/page-template.js';
import fs from 'fs';

const modalsContent = `
<!-- Modal Examples Grid -->
<div class="dashboard-row">
    <div class="dashboard-grid grid-cols-2">
        <!-- Basic Modal Examples -->
        <div class="dashboard-card">
            <div class="dashboard-card-header">
                <h5 class="dashboard-card-title">Basic Modal Examples</h5>
            </div>
            <div class="dashboard-card-body">
                <div class="dashboard-grid grid-cols-2" style="gap: 12px;">
                    <button type="button" class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#basicModal">
                        <i class="bi bi-info-circle me-2"></i>Basic Modal
                    </button>
                    <button type="button" class="btn btn-success w-100" data-bs-toggle="modal" data-bs-target="#scrollableModal">
                        <i class="bi bi-scroll me-2"></i>Scrollable Modal
                    </button>
                    <button type="button" class="btn btn-warning w-100" data-bs-toggle="modal" data-bs-target="#centeredModal">
                        <i class="bi bi-arrows-fullscreen me-2"></i>Centered Modal
                    </button>
                    <button type="button" class="btn btn-info w-100" data-bs-toggle="modal" data-bs-target="#fullscreenModal">
                        <i class="bi bi-fullscreen me-2"></i>Fullscreen Modal
                    </button>
                </div>
            </div>
        </div>

        <!-- Modal Sizes -->
        <div class="dashboard-card">
            <div class="dashboard-card-header">
                <h5 class="dashboard-card-title">Modal Sizes</h5>
            </div>
            <div class="dashboard-card-body">
                <div class="dashboard-grid grid-cols-2" style="gap: 12px;">
                    <button type="button" class="btn btn-outline-primary w-100" data-bs-toggle="modal" data-bs-target="#smallModal">
                        <i class="bi bi-arrows-collapse me-2"></i>Small Modal
                    </button>
                    <button type="button" class="btn btn-outline-success w-100" data-bs-toggle="modal" data-bs-target="#defaultModal">
                        <i class="bi bi-window me-2"></i>Default Modal
                    </button>
                    <button type="button" class="btn btn-outline-warning w-100" data-bs-toggle="modal" data-bs-target="#largeModal">
                        <i class="bi bi-arrows-expand me-2"></i>Large Modal
                    </button>
                    <button type="button" class="btn btn-outline-danger w-100" data-bs-toggle="modal" data-bs-target="#extraLargeModal">
                        <i class="bi bi-display me-2"></i>Extra Large Modal
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Academic Use Cases -->
<div class="dashboard-row">
    <div class="dashboard-card">
        <div class="dashboard-card-header">
            <h5 class="dashboard-card-title">Academic Use Cases</h5>
        </div>
        <div class="dashboard-card-body">
            <div class="dashboard-grid grid-cols-3" style="gap: 12px; margin-bottom: 24px;">
                <button type="button" class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#addStudentModal">
                    <i class="bi bi-person-plus me-2"></i>Add Student
                </button>
                <button type="button" class="btn btn-success w-100" data-bs-toggle="modal" data-bs-target="#gradeSubmissionModal">
                    <i class="bi bi-clipboard-check me-2"></i>Submit Grades
                </button>
                <button type="button" class="btn btn-warning w-100" data-bs-toggle="modal" data-bs-target="#courseScheduleModal">
                    <i class="bi bi-calendar-event me-2"></i>View Schedule
                </button>
            </div>

            <!-- Student List for Demo -->
            <h6 class="mb-3">Student Management</h6>
            <div class="dashboard-grid grid-cols-2" style="gap: 16px;">
                <div class="stats-card" style="cursor: pointer; transition: transform 0.2s;" onclick="showStudentDetails('Sarah Johnson', 'Computer Science', '2024001')">
                    <div class="d-flex align-items-center">
                        <img src="https://ui-avatars.com/api/?name=Sarah+Johnson&background=4361ee&color=fff" alt="Student" width="40" height="40" class="rounded-circle me-3">
                        <div class="flex-grow-1">
                            <div class="stats-card-label">Student Profile</div>
                            <div style="font-size: 16px; font-weight: 600; color: #1f2937;">Sarah Johnson</div>
                            <div style="font-size: 12px; color: #6b7280;">Computer Science • ID: 2024001</div>
                        </div>
                        <span class="stats-card-change positive">Active</span>
                    </div>
                </div>
                <div class="stats-card" style="cursor: pointer; transition: transform 0.2s;" onclick="showStudentDetails('Michael Brown', 'Mathematics', '2024002')">
                    <div class="d-flex align-items-center">
                        <img src="https://ui-avatars.com/api/?name=Michael+Brown&background=dc3545&color=fff" alt="Student" width="40" height="40" class="rounded-circle me-3">
                        <div class="flex-grow-1">
                            <div class="stats-card-label">Student Profile</div>
                            <div style="font-size: 16px; font-weight: 600; color: #1f2937;">Michael Brown</div>
                            <div style="font-size: 12px; color: #6b7280;">Mathematics • ID: 2024002</div>
                        </div>
                        <span class="stats-card-change" style="background: #fef3c7; color: #92400e;">Pending</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Interactive Modal Builder -->
<div class="dashboard-row">
    <div class="dashboard-card">
        <div class="dashboard-card-header">
            <h5 class="dashboard-card-title">Interactive Modal Builder</h5>
        </div>
        <div class="dashboard-card-body">
            <div class="demo-section">
                <p class="text-muted mb-4">Build your own modal with custom title, content, and buttons</p>
                <div class="dashboard-grid grid-cols-3" style="gap: 12px; margin-bottom: 16px;">
                    <input type="text" class="form-control" id="modalTitle" placeholder="Modal Title">
                    <select class="form-select" id="modalSize">
                        <option value="">Default Size</option>
                        <option value="modal-sm">Small</option>
                        <option value="modal-lg">Large</option>
                        <option value="modal-xl">Extra Large</option>
                    </select>
                    <select class="form-select" id="modalTheme">
                        <option value="primary">Primary</option>
                        <option value="success">Success</option>
                        <option value="warning">Warning</option>
                        <option value="danger">Danger</option>
                        <option value="info">Info</option>
                    </select>
                </div>
                <div class="mb-3">
                    <textarea class="form-control" id="modalContent" rows="3" placeholder="Enter modal content..."></textarea>
                </div>
                <div class="d-flex flex-wrap gap-4 mb-3">
                    <div class="form-check d-flex align-items-center">
                        <input class="form-check-input me-2" type="checkbox" id="modalCentered">
                        <label class="form-check-label mb-0" for="modalCentered">Centered</label>
                    </div>
                    <div class="form-check d-flex align-items-center">
                        <input class="form-check-input me-2" type="checkbox" id="modalScrollable">
                        <label class="form-check-label mb-0" for="modalScrollable">Scrollable</label>
                    </div>
                    <div class="form-check d-flex align-items-center">
                        <input class="form-check-input me-2" type="checkbox" id="modalBackdrop" checked>
                        <label class="form-check-label mb-0" for="modalBackdrop">Backdrop</label>
                    </div>
                </div>
                <div class="d-flex gap-2">
                    <button class="btn btn-primary" onclick="buildModal()">
                        <i class="bi bi-magic me-2"></i>Create Modal
                    </button>
                    <button class="btn btn-outline-secondary" onclick="clearBuilder()">
                        <i class="bi bi-eraser me-2"></i>Clear
                    </button>
                </div>
        </div>
    </div>
</div>
`;

const modalsHTML = `
<!-- Basic Modal -->
<div class="modal fade" id="basicModal" tabindex="-1" aria-labelledby="basicModalLabel">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="basicModalLabel">
                    <i class="bi bi-info-circle text-primary me-2"></i>Academic Information
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>This is a basic modal example for displaying academic information. Modals are perfect for showing detailed information, forms, or confirmations without navigating away from the current page.</p>
                <div class="alert alert-info" role="alert">
                    <i class="bi bi-lightbulb me-2"></i>
                    <strong>Tip:</strong> Use modals to enhance user experience by keeping them focused on their current task.
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Understood</button>
            </div>
        </div>
    </div>
</div>

<!-- Add Student Modal -->
<div class="modal fade" id="addStudentModal" tabindex="-1" aria-labelledby="addStudentModalLabel">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addStudentModalLabel">Add New Student</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">First Name</label>
                                <input type="text" class="form-control" placeholder="Enter first name">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">Last Name</label>
                                <input type="text" class="form-control" placeholder="Enter last name">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">Email Address</label>
                                <input type="email" class="form-control" placeholder="Enter email address">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">Student ID</label>
                                <input type="text" class="form-control" placeholder="Auto-generated" disabled>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">Department</label>
                                <select class="form-select">
                                    <option>Computer Science</option>
                                    <option>Mathematics</option>
                                    <option>Physics</option>
                                    <option>Engineering</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">Enrollment Date</label>
                                <input type="date" class="form-control">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary">Add Student</button>
            </div>
        </div>
    </div>
</div>

<!-- Small Modal -->
<div class="modal fade" id="smallModal" tabindex="-1" aria-labelledby="smallModalLabel">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="smallModalLabel">Small Modal</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>This is a small modal example. Perfect for quick confirmations or simple alerts.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Confirm</button>
            </div>
        </div>
    </div>
</div>

<!-- Default Modal -->
<div class="modal fade" id="defaultModal" tabindex="-1" aria-labelledby="defaultModalLabel">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="defaultModalLabel">Default Modal</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>This is a default sized modal. Most versatile for various content types.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save</button>
            </div>
        </div>
    </div>
</div>

<!-- Large Modal -->
<div class="modal fade" id="largeModal" tabindex="-1" aria-labelledby="largeModalLabel">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="largeModalLabel">Large Modal</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>This is a large modal example. Great for detailed forms or comprehensive information display.</p>
                <div class="row">
                    <div class="col-md-6">
                        <h6>Feature 1</h6>
                        <p>Additional content space allows for more detailed explanations.</p>
                    </div>
                    <div class="col-md-6">
                        <h6>Feature 2</h6>
                        <p>Perfect for complex forms or data presentations.</p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary">Apply</button>
            </div>
        </div>
    </div>
</div>

<!-- Extra Large Modal -->
<div class="modal fade" id="extraLargeModal" tabindex="-1" aria-labelledby="extraLargeModalLabel">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="extraLargeModalLabel">Extra Large Modal</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>This is an extra large modal example. Ideal for complex dashboards or detailed data views.</p>
                <div class="row">
                    <div class="col-md-4">
                        <h6>Statistics</h6>
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Data Overview</h5>
                                <p>Maximum screen real estate utilization.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <h6>Charts</h6>
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Visual Data</h5>
                                <p>Perfect for comprehensive analytics.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <h6>Reports</h6>
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Detailed Reports</h5>
                                <p>Extensive information display capabilities.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Process</button>
            </div>
        </div>
    </div>
</div>

<!-- Scrollable Modal -->
<div class="modal fade" id="scrollableModal" tabindex="-1" aria-labelledby="scrollableModalLabel">
    <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="scrollableModalLabel">Scrollable Modal</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>This modal has scrollable content. Perfect for long forms or extensive information.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
                <p>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
                <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.</p>
                <p>Nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Continue</button>
            </div>
        </div>
    </div>
</div>

<!-- Centered Modal -->
<div class="modal fade" id="centeredModal" tabindex="-1" aria-labelledby="centeredModalLabel">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="centeredModalLabel">Vertically Centered Modal</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>This modal is vertically centered on the screen for better visual balance.</p>
                <div class="alert alert-success">
                    <i class="bi bi-check-circle me-2"></i>
                    Perfect for important notifications or confirmations.
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Dismiss</button>
                <button type="button" class="btn btn-primary">Acknowledge</button>
            </div>
        </div>
    </div>
</div>

<!-- Fullscreen Modal -->
<div class="modal fade" id="fullscreenModal" tabindex="-1" aria-labelledby="fullscreenModalLabel">
    <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="fullscreenModalLabel">Fullscreen Modal</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <h3>Fullscreen Experience</h3>
                    <p>This modal takes up the entire screen, perfect for immersive experiences or complex applications.</p>
                    <div class="row mt-4">
                        <div class="col-md-8">
                            <h5>Main Content Area</h5>
                            <p>Use this space for primary content, forms, or interactive elements.</p>
                            <div class="card">
                                <div class="card-header">
                                    <h6>Example Content</h6>
                                </div>
                                <div class="card-body">
                                    <p>Full screen modals are excellent for:</p>
                                    <ul>
                                        <li>Complex forms and data entry</li>
                                        <li>Image galleries or media viewers</li>
                                        <li>Interactive dashboards</li>
                                        <li>Educational content</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <h5>Sidebar Content</h5>
                            <p>Additional information or controls can be placed here.</p>
                            <div class="list-group">
                                <a href="#" class="list-group-item list-group-item-action">Option 1</a>
                                <a href="#" class="list-group-item list-group-item-action">Option 2</a>
                                <a href="#" class="list-group-item list-group-item-action">Option 3</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Exit Fullscreen</button>
                <button type="button" class="btn btn-primary">Save Changes</button>
            </div>
        </div>
    </div>
</div>

<!-- Grade Submission Modal -->
<div class="modal fade" id="gradeSubmissionModal" tabindex="-1" aria-labelledby="gradeSubmissionModalLabel">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="gradeSubmissionModalLabel">
                    <i class="bi bi-clipboard-check text-success me-2"></i>Submit Grades
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label class="form-label">Course</label>
                            <select class="form-select">
                                <option>CS 101 - Introduction to Programming</option>
                                <option>MATH 201 - Calculus II</option>
                                <option>PHYS 101 - General Physics</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Assessment Type</label>
                            <select class="form-select">
                                <option>Final Exam</option>
                                <option>Midterm Exam</option>
                                <option>Assignment</option>
                                <option>Project</option>
                            </select>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Student ID</th>
                                    <th>Name</th>
                                    <th>Grade</th>
                                    <th>Comments</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2024001</td>
                                    <td>Sarah Johnson</td>
                                    <td><input type="text" class="form-control form-control-sm" placeholder="A+"></td>
                                    <td><input type="text" class="form-control form-control-sm" placeholder="Excellent work"></td>
                                </tr>
                                <tr>
                                    <td>2024002</td>
                                    <td>Michael Brown</td>
                                    <td><input type="text" class="form-control form-control-sm" placeholder="B+"></td>
                                    <td><input type="text" class="form-control form-control-sm" placeholder="Good effort"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-success">Submit Grades</button>
            </div>
        </div>
    </div>
</div>

<!-- Course Schedule Modal -->
<div class="modal fade" id="courseScheduleModal" tabindex="-1" aria-labelledby="courseScheduleModalLabel">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="courseScheduleModalLabel">
                    <i class="bi bi-calendar-event text-warning me-2"></i>Course Schedule
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row mb-3">
                    <div class="col-md-6">
                        <label class="form-label">Academic Year</label>
                        <select class="form-select">
                            <option>2024-2025</option>
                            <option>2023-2024</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Semester</label>
                        <select class="form-select">
                            <option>Fall 2024</option>
                            <option>Spring 2025</option>
                            <option>Summer 2025</option>
                        </select>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Monday</th>
                                <th>Tuesday</th>
                                <th>Wednesday</th>
                                <th>Thursday</th>
                                <th>Friday</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>9:00 AM</strong></td>
                                <td><span class="badge bg-primary">CS 101</span><br><small>Room A-101</small></td>
                                <td>-</td>
                                <td><span class="badge bg-primary">CS 101</span><br><small>Room A-101</small></td>
                                <td>-</td>
                                <td><span class="badge bg-success">Lab</span><br><small>Room B-201</small></td>
                            </tr>
                            <tr>
                                <td><strong>11:00 AM</strong></td>
                                <td><span class="badge bg-warning">MATH 201</span><br><small>Room C-301</small></td>
                                <td><span class="badge bg-warning">MATH 201</span><br><small>Room C-301</small></td>
                                <td>-</td>
                                <td><span class="badge bg-warning">MATH 201</span><br><small>Room C-301</small></td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td><strong>2:00 PM</strong></td>
                                <td>-</td>
                                <td><span class="badge bg-info">PHYS 101</span><br><small>Room D-401</small></td>
                                <td>-</td>
                                <td><span class="badge bg-info">PHYS 101</span><br><small>Room D-401</small></td>
                                <td>-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Export Schedule</button>
            </div>
        </div>
    </div>
</div>

<!-- Dynamic Modal Container -->
<div id="dynamicModalContainer"></div>
`;

const pageSpecificJS = `
// Show Student Details Modal
function showStudentDetails(name, department, id) {
    const modalContent = \`
        <div class="text-center mb-4">
            <img src="https://ui-avatars.com/api/?name=\${encodeURIComponent(name)}&background=4361ee&color=fff&size=80" alt="Student" class="rounded-circle mb-3">
            <h5>\${name}</h5>
            <p class="text-muted">\${department} • ID: \${id}</p>
        </div>
        <div class="row">
            <div class="col-6">
                <strong>GPA:</strong> 3.85
            </div>
            <div class="col-6">
                <strong>Credits:</strong> 45/120
            </div>
            <div class="col-6 mt-2">
                <strong>Status:</strong> <span class="badge bg-success">Active</span>
            </div>
            <div class="col-6 mt-2">
                <strong>Year:</strong> Sophomore
            </div>
        </div>
        <hr>
        <h6>Current Courses</h6>
        <ul class="list-unstyled">
            <li><i class="bi bi-book me-2 text-primary"></i>Advanced Mathematics</li>
            <li><i class="bi bi-book me-2 text-primary"></i>Data Structures</li>
            <li><i class="bi bi-book me-2 text-primary"></i>Computer Graphics</li>
        </ul>
    \`;

    const modalHTML = \`
        <div class="modal fade" id="studentDetailsModal" tabindex="-1" aria-labelledby="studentDetailsTitle">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="studentDetailsTitle">\${name}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        \${modalContent}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Edit Student</button>
                    </div>
                </div>
            </div>
        </div>
    \`;

    const existingModal = document.getElementById('studentDetailsModal');
    if (existingModal) {
        existingModal.remove();
    }

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    new bootstrap.Modal(document.getElementById('studentDetailsModal')).show();
}

// Modal Builder
function buildModal() {
    const title = document.getElementById('modalTitle').value || 'Custom Modal';
    const content = document.getElementById('modalContent').value || 'This is a custom modal created with the modal builder.';
    const size = document.getElementById('modalSize').value;
    const theme = document.getElementById('modalTheme').value;
    const centered = document.getElementById('modalCentered').checked;
    const scrollable = document.getElementById('modalScrollable').checked;
    const backdrop = document.getElementById('modalBackdrop').checked;

    const modalId = 'customModal_' + Date.now();
    const sizeClass = size ? \` \${size}\` : '';
    const centeredClass = centered ? ' modal-dialog-centered' : '';
    const scrollableClass = scrollable ? ' modal-dialog-scrollable' : '';
    const backdropAttr = backdrop ? '' : ' data-bs-backdrop="static"';

    const modalHTML = \`
        <div class="modal fade" id="\${modalId}" tabindex="-1" aria-labelledby="\${modalId}Label"\${backdropAttr}>
            <div class="modal-dialog\${sizeClass}\${centeredClass}\${scrollableClass}">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-\${theme}" id="\${modalId}Label">\${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        \${content}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-\${theme}">Action</button>
                    </div>
                </div>
            </div>
        </div>
    \`;

    document.getElementById('dynamicModalContainer').innerHTML = modalHTML;
    new bootstrap.Modal(document.getElementById(modalId)).show();
}

// Clear Modal Builder
function clearBuilder() {
    document.getElementById('modalTitle').value = '';
    document.getElementById('modalContent').value = '';
    document.getElementById('modalSize').value = '';
    document.getElementById('modalTheme').value = 'primary';
    document.getElementById('modalCentered').checked = false;
    document.getElementById('modalScrollable').checked = false;
    document.getElementById('modalBackdrop').checked = true;
}
`;

const pageSpecificStyles = `
/* Modal Examples Styling */
.demo-section {
    background: #f8f9fa;
    border: 2px dashed #dee2e6;
    border-radius: 8px;
    padding: 2rem;
    text-align: center;
    margin: 1.5rem 0;
}

.student-card {
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    transition: all 0.2s ease;
    cursor: pointer;
}

.student-card:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    transform: translateY(-2px);
}

.student-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
}

.status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 500;
}
`;

// Generate the complete HTML
const html = createPageTemplate({
    pageTitle: 'Modal Components',
    pageDescription: 'Bootstrap 5 modal examples for dialogs, forms, and confirmations',
    page: 'modals',
    breadcrumbs: [
        { title: 'Interface', url: '#' },
        { title: 'Modal Components' }
    ],
    content: modalsContent,
    additionalModals: modalsHTML,
    pageSpecificJS: pageSpecificJS,
    pageSpecificStyles: pageSpecificStyles
});

// Write to file
fs.writeFileSync('modals-generated.html', html);
console.log('✅ Generated modals-generated.html successfully!');