import { createPageTemplate } from '../src/templates/page-template.js';
import fs from 'fs';

const modalsContent = `
<!-- Basic Modal Examples -->
<div class="card mb-4">
    <div class="card-header">
        <h5 class="card-title mb-0">Basic Modal Examples</h5>
    </div>
    <div class="card-body">
        <div class="row g-3">
            <div class="col-md-3">
                <button type="button" class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#basicModal">
                    <i class="bi bi-info-circle me-2"></i>Basic Modal
                </button>
            </div>
            <div class="col-md-3">
                <button type="button" class="btn btn-success w-100" data-bs-toggle="modal" data-bs-target="#scrollableModal">
                    <i class="bi bi-scroll me-2"></i>Scrollable Modal
                </button>
            </div>
            <div class="col-md-3">
                <button type="button" class="btn btn-warning w-100" data-bs-toggle="modal" data-bs-target="#centeredModal">
                    <i class="bi bi-arrows-fullscreen me-2"></i>Centered Modal
                </button>
            </div>
            <div class="col-md-3">
                <button type="button" class="btn btn-info w-100" data-bs-toggle="modal" data-bs-target="#fullscreenModal">
                    <i class="bi bi-fullscreen me-2"></i>Fullscreen Modal
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Modal Sizes -->
<div class="card mb-4">
    <div class="card-header">
        <h5 class="card-title mb-0">Modal Sizes</h5>
    </div>
    <div class="card-body">
        <div class="row g-3">
            <div class="col-md-3">
                <button type="button" class="btn btn-outline-primary w-100" data-bs-toggle="modal" data-bs-target="#smallModal">
                    <i class="bi bi-arrows-collapse me-2"></i>Small Modal
                </button>
            </div>
            <div class="col-md-3">
                <button type="button" class="btn btn-outline-success w-100" data-bs-toggle="modal" data-bs-target="#defaultModal">
                    <i class="bi bi-window me-2"></i>Default Modal
                </button>
            </div>
            <div class="col-md-3">
                <button type="button" class="btn btn-outline-warning w-100" data-bs-toggle="modal" data-bs-target="#largeModal">
                    <i class="bi bi-arrows-expand me-2"></i>Large Modal
                </button>
            </div>
            <div class="col-md-3">
                <button type="button" class="btn btn-outline-danger w-100" data-bs-toggle="modal" data-bs-target="#extraLargeModal">
                    <i class="bi bi-display me-2"></i>Extra Large Modal
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Academic Use Cases -->
<div class="card mb-4">
    <div class="card-header">
        <h5 class="card-title mb-0">Academic Use Cases</h5>
    </div>
    <div class="card-body">
        <div class="row g-3 mb-4">
            <div class="col-md-4">
                <button type="button" class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#addStudentModal">
                    <i class="bi bi-person-plus me-2"></i>Add Student
                </button>
            </div>
            <div class="col-md-4">
                <button type="button" class="btn btn-success w-100" data-bs-toggle="modal" data-bs-target="#gradeSubmissionModal">
                    <i class="bi bi-clipboard-check me-2"></i>Submit Grades
                </button>
            </div>
            <div class="col-md-4">
                <button type="button" class="btn btn-warning w-100" data-bs-toggle="modal" data-bs-target="#courseScheduleModal">
                    <i class="bi bi-calendar-event me-2"></i>View Schedule
                </button>
            </div>
        </div>

        <!-- Student List for Demo -->
        <h6 class="mb-3">Student Management</h6>
        <div class="row">
            <div class="col-md-6">
                <div class="student-card d-flex align-items-center" onclick="showStudentDetails('Sarah Johnson', 'Computer Science', '2024001')">
                    <img src="https://ui-avatars.com/api/?name=Sarah+Johnson&background=4361ee&color=fff" alt="Student" class="student-avatar me-3">
                    <div class="student-info flex-grow-1">
                        <h6>Sarah Johnson</h6>
                        <p>Computer Science • ID: 2024001</p>
                    </div>
                    <span class="status-badge bg-success text-white">Active</span>
                </div>
            </div>
            <div class="col-md-6">
                <div class="student-card d-flex align-items-center" onclick="showStudentDetails('Michael Brown', 'Mathematics', '2024002')">
                    <img src="https://ui-avatars.com/api/?name=Michael+Brown&background=dc3545&color=fff" alt="Student" class="student-avatar me-3">
                    <div class="student-info flex-grow-1">
                        <h6>Michael Brown</h6>
                        <p>Mathematics • ID: 2024002</p>
                    </div>
                    <span class="status-badge bg-warning text-dark">Pending</span>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Interactive Modal Builder -->
<div class="card mb-4">
    <div class="card-header">
        <h5 class="card-title mb-0">Interactive Modal Builder</h5>
    </div>
    <div class="card-body">
        <div class="demo-section">
            <h6>Create Custom Modal</h6>
            <p class="text-muted mb-4">Build your own modal with custom title, content, and buttons</p>
            <div class="row g-3 mb-3">
                <div class="col-md-4">
                    <input type="text" class="form-control" id="modalTitle" placeholder="Modal Title">
                </div>
                <div class="col-md-4">
                    <select class="form-select" id="modalSize">
                        <option value="">Default Size</option>
                        <option value="modal-sm">Small</option>
                        <option value="modal-lg">Large</option>
                        <option value="modal-xl">Extra Large</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <select class="form-select" id="modalTheme">
                        <option value="primary">Primary</option>
                        <option value="success">Success</option>
                        <option value="warning">Warning</option>
                        <option value="danger">Danger</option>
                        <option value="info">Info</option>
                    </select>
                </div>
            </div>
            <div class="mb-3">
                <textarea class="form-control" id="modalContent" rows="3" placeholder="Enter modal content..."></textarea>
            </div>
            <div class="row g-2">
                <div class="col-md-4">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="modalCentered">
                        <label class="form-check-label" for="modalCentered">Centered</label>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="modalScrollable">
                        <label class="form-check-label" for="modalScrollable">Scrollable</label>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="modalBackdrop" checked>
                        <label class="form-check-label" for="modalBackdrop">Backdrop</label>
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <button class="btn btn-primary" onclick="buildModal()">
                    <i class="bi bi-magic me-2"></i>Create Modal
                </button>
                <button class="btn btn-outline-secondary ms-2" onclick="clearBuilder()">
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