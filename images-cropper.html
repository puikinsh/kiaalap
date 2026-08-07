{{> head}}

<!-- Cropper.js v2 needs no external stylesheet: its elements style themselves via shadow DOM. -->

<style>
/* Critical CSS for immediate render */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f5f7fa; }
        .sidebar { position: fixed; left: 0; top: 0; width: 260px; height: 100vh; background: #1f2937; z-index: 1040; }
        .main-wrapper { margin-left: 260px; min-height: 100vh; transition: margin-left 0.3s ease; }
        .top-navbar { background: white; height: 60px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); padding: 0 1rem; }
        .dashboard-content { padding: 24px; }

        /* Loading animation */
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .loading { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; background: #e5e7eb; }
</style>

{{> sidebar}}

<!-- Main Content Wrapper -->
<div class="main-wrapper" id="mainWrapper">
    {{> header}}

    <!-- Main Content -->
    <main class="dashboard-content" id="main-content">
        <div class="container-fluid">
<!-- Page Header -->
            <div class="mb-3">
                <h1 class="h3 font-bold">Image Cropper</h1>
                <p class="text-muted text-sm">Advanced image cropping and editing tools</p>
            </div>

            <!-- Image Cropper Content -->
            <div class="dashboard-row">
                <!-- Image Upload and Basic Cropping -->
                <div class="dashboard-grid grid-cols-1">
                    <div class="dashboard-card">
                        <div class="dashboard-card-header">
                            <h5 class="dashboard-card-title mb-0">Image Upload &amp; Crop</h5>
                            <p class="text-muted small">Upload an image and crop it with various aspect ratios</p>
                        </div>
                        <div class="dashboard-card-body">
                            <div class="row">
                                <div class="col-md-8">
                                    <!-- Image Container -->
                                    <div class="text-center mb-3">
                                        <div class="crop-container" style="max-height: 400px; overflow: hidden;">
                                            <img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                                                 alt="Sample Image" id="cropperImage" class="img-fluid" loading="lazy" decoding="async">
                                        </div>
                                    </div>

                                    <!-- Upload New Image -->
                                    <div class="mb-3">
                                        <label for="imageUpload" class="form-label fw-semibold">Upload New Image</label>
                                        <input type="file" class="form-control" id="imageUpload" accept="image/*">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <!-- Crop Controls -->
                                    <div class="card">
                                        <div class="card-header">
                                            <h6 class="card-title mb-0">Crop Controls</h6>
                                        </div>
                                        <div class="card-body">
                                            <!-- Aspect Ratios -->
                                            <div class="mb-3">
                                                <label class="form-label fw-semibold">Aspect Ratio</label>
                                                <div class="btn-group-vertical w-100" role="group">
                                                    <button type="button" class="btn btn-outline-primary btn-sm" onclick="setAspectRatio(NaN)">Free</button>
                                                    <button type="button" class="btn btn-outline-primary btn-sm" onclick="setAspectRatio(1)">1:1 (Square)</button>
                                                    <button type="button" class="btn btn-outline-primary btn-sm" onclick="setAspectRatio(4/3)">4:3</button>
                                                    <button type="button" class="btn btn-outline-primary btn-sm" onclick="setAspectRatio(16/9)">16:9</button>
                                                    <button type="button" class="btn btn-outline-primary btn-sm" onclick="setAspectRatio(2/3)">2:3 (Portrait)</button>
                                                </div>
                                            </div>

                                            <!-- Crop Actions -->
                                            <div class="mb-3">
                                                <label class="form-label fw-semibold">Actions</label>
                                                <div class="d-grid gap-2">
                                                    <button type="button" class="btn btn-success btn-sm" onclick="getCroppedImage()">
                                                        <i class="bi bi-crop me-1"></i>Get Cropped
                                                    </button>
                                                    <button type="button" class="btn btn-info btn-sm" onclick="downloadCroppedImage()">
                                                        <i class="bi bi-download me-1"></i>Download
                                                    </button>
                                                    <button type="button" class="btn btn-warning btn-sm" onclick="resetCropper()">
                                                        <i class="bi bi-arrow-clockwise me-1"></i>Reset
                                                    </button>
                                                </div>
                                            </div>

                                            <!-- Transform Controls -->
                                            <div class="mb-3">
                                                <label class="form-label fw-semibold">Transform</label>
                                                <div class="btn-group w-100 mb-2" role="group">
                                                    <button type="button" class="btn btn-outline-secondary btn-sm" onclick="rotateCropper(-90)" title="Rotate Left" aria-label="Rotate Left">
                                                        <i aria-hidden="true" class="bi bi-arrow-counterclockwise"></i>
                                                    </button>
                                                    <button type="button" class="btn btn-outline-secondary btn-sm" onclick="rotateCropper(90)" title="Rotate Right" aria-label="Rotate Right">
                                                        <i aria-hidden="true" class="bi bi-arrow-clockwise"></i>
                                                    </button>
                                                    <button type="button" class="btn btn-outline-secondary btn-sm" onclick="flipCropper('horizontal')" title="Flip Horizontal" aria-label="Flip Horizontal">
                                                        <i aria-hidden="true" class="bi bi-arrows-expand"></i>
                                                    </button>
                                                    <button type="button" class="btn btn-outline-secondary btn-sm" onclick="flipCropper('vertical')" title="Flip Vertical" aria-label="Flip Vertical">
                                                        <i aria-hidden="true" class="bi bi-arrows-collapse"></i>
                                                    </button>
                                                </div>
                                            </div>

                                            <!-- Zoom Controls -->
                                            <div class="mb-3">
                                                <label class="form-label fw-semibold">Zoom</label>
                                                <div class="btn-group w-100" role="group">
                                                    <button type="button" class="btn btn-outline-secondary btn-sm" onclick="zoomCropper(-0.1)" title="Zoom Out" aria-label="Zoom Out">
                                                        <i aria-hidden="true" class="bi bi-zoom-out"></i>
                                                    </button>
                                                    <button type="button" class="btn btn-outline-secondary btn-sm" onclick="zoomCropper(0.1)" title="Zoom In" aria-label="Zoom In">
                                                        <i aria-hidden="true" class="bi bi-zoom-in"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Second Row -->
            <div class="dashboard-row">
                <div class="dashboard-grid grid-cols-2">
                    <!-- Cropped Result Preview -->
                    <div class="dashboard-card">
                        <div class="dashboard-card-header">
                            <h5 class="dashboard-card-title mb-0">Cropped Result</h5>
                            <p class="text-muted small">Preview of your cropped image</p>
                        </div>
                        <div class="dashboard-card-body text-center">
                            <div id="croppedResult" class="border rounded p-3 bg-light" style="min-height: 200px;">
                                <p class="text-muted mb-0">
                                    <i class="bi bi-image" style="font-size: 3rem;"></i><br>
                                    Cropped image will appear here
                                </p>
                            </div>
                            <div class="mt-3">
                                <small class="text-muted" id="cropInfo">No crop applied yet</small>
                            </div>
                        </div>
                    </div>

                    <!-- Preset Crops -->
                    <div class="dashboard-card">
                        <div class="dashboard-card-header">
                            <h5 class="dashboard-card-title mb-0">Preset Crops</h5>
                            <p class="text-muted small">Quick crop presets for common use cases</p>
                        </div>
                        <div class="dashboard-card-body">
                            <div class="row g-2">
                                <div class="col-6">
                                    <button type="button" class="btn btn-outline-primary w-100" onclick="applyCropPreset('avatar')">
                                        <i class="bi bi-person-circle me-2"></i>Avatar<br>
                                        <small>200x200</small>
                                    </button>
                                </div>
                                <div class="col-6">
                                    <button type="button" class="btn btn-outline-primary w-100" onclick="applyCropPreset('cover')">
                                        <i class="bi bi-image me-2"></i>Cover<br>
                                        <small>1200x630</small>
                                    </button>
                                </div>
                                <div class="col-6">
                                    <button type="button" class="btn btn-outline-primary w-100" onclick="applyCropPreset('thumbnail')">
                                        <i class="bi bi-grid-3x3 me-2"></i>Thumbnail<br>
                                        <small>300x200</small>
                                    </button>
                                </div>
                                <div class="col-6">
                                    <button type="button" class="btn btn-outline-primary w-100" onclick="applyCropPreset('banner')">
                                        <i class="bi bi-rectangle me-2"></i>Banner<br>
                                        <small>1920x400</small>
                                    </button>
                                </div>
                            </div>

                            <hr>

                            <div class="alert alert-info">
                                <i class="bi bi-info-circle me-2"></i>
                                <strong>Tips:</strong><br>
                                • Drag to move the crop area<br>
                                • Drag corners/edges to resize<br>
                                • Use mouse wheel to zoom<br>
                                • Double-click to reset zoom
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Export Options -->
            <div class="dashboard-row">
                <div class="dashboard-grid grid-cols-1">
                    <div class="dashboard-card">
                        <div class="dashboard-card-header">
                            <h5 class="dashboard-card-title mb-0">Export Options</h5>
                            <p class="text-muted small">Export your cropped image in different formats and qualities</p>
                        </div>
                        <div class="dashboard-card-body">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group mb-3">
                                        <label class="form-label fw-semibold">Output Format</label>
                                        <select class="form-select" id="exportFormat">
                                            <option value="image/png">PNG (Best Quality)</option>
                                            <option value="image/jpeg" selected>JPEG (Smaller Size)</option>
                                            <option value="image/webp">WebP (Modern Format)</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group mb-3">
                                        <label class="form-label fw-semibold">Quality (JPEG/WebP)</label>
                                        <input type="range" class="form-range" id="exportQuality" min="0.1" max="1" step="0.1" value="0.9">
                                        <div class="d-flex justify-content-between">
                                            <small class="text-muted">Low</small>
                                            <small class="text-muted" id="qualityValue">90%</small>
                                            <small class="text-muted">High</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group mb-3">
                                        <label class="form-label fw-semibold">Output Size</label>
                                        <select class="form-select" id="exportSize">
                                            <option value="original">Original Size</option>
                                            <option value="small">Small (25%)</option>
                                            <option value="medium">Medium (50%)</option>
                                            <option value="large">Large (75%)</option>
                                            <option value="custom">Custom Size</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="row" id="customSizeInputs" style="display: none;">
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label class="form-label fw-semibold">Width (px)</label>
                                        <input type="number" class="form-control" id="customWidth" min="1" placeholder="Width">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label class="form-label fw-semibold">Height (px)</label>
                                        <input type="number" class="form-control" id="customHeight" min="1" placeholder="Height">
                                    </div>
                                </div>
                            </div>

                            <div class="text-center">
                                <button type="button" class="btn btn-success" onclick="exportWithOptions()">
                                    <i class="bi bi-download me-2"></i>Export with Options
                                </button>
                                <button type="button" class="btn btn-outline-info ms-2" onclick="exportMultiple()">
                                    <i class="bi bi-files me-2"></i>Export Multiple Formats
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>        </div>
    </main>

    {{> footer}}
</div>

<!-- Cropper.js v2 (web components; the v1 `new Cropper(img, options)` API is gone) -->
<script type="module">
    // Imported as a module so Vite bundles it; a plain <script src="node_modules/...">
    // tag cannot be bundled and would 404 in a dist/ build.
    import CropperClass from 'cropperjs';

    let cropper = null;
    let cropperImage = null;
    let cropperSelection = null;

    // v2 builds its UI from a template of custom elements rather than options.
    const CROPPER_TEMPLATE = `
        <cropper-canvas background style="height: 400px;">
            <cropper-image rotatable scalable skewable translatable></cropper-image>
            <cropper-shade hidden></cropper-shade>
            <cropper-handle action="move" plain></cropper-handle>
            <cropper-selection initial-coverage="0.8" movable resizable outlined>
                <cropper-grid role="grid" bordered covered></cropper-grid>
                <cropper-crosshair centered></cropper-crosshair>
                <cropper-handle action="move" theme-color="rgba(255, 255, 255, 0.35)"></cropper-handle>
                <cropper-handle action="n-resize"></cropper-handle>
                <cropper-handle action="e-resize"></cropper-handle>
                <cropper-handle action="s-resize"></cropper-handle>
                <cropper-handle action="w-resize"></cropper-handle>
                <cropper-handle action="ne-resize"></cropper-handle>
                <cropper-handle action="nw-resize"></cropper-handle>
                <cropper-handle action="se-resize"></cropper-handle>
                <cropper-handle action="sw-resize"></cropper-handle>
            </cropper-selection>
        </cropper-canvas>
    `;

    document.addEventListener('DOMContentLoaded', function () {
        initializeCropper();
        setupEventListeners();
    });

    function initializeCropper() {
        const image = document.getElementById('cropperImage');
        if (!image) return;

        cropper = new CropperClass(image, { template: CROPPER_TEMPLATE });
        cropperImage = cropper.getCropperImage();
        cropperSelection = cropper.getCropperSelection();
    }

    function setAspectRatio(ratio) {
        if (!cropperSelection) return;
        // NaN clears the constraint (free-form) in v2.
        cropperSelection.aspectRatio = ratio;
        cropperSelection.$render();
    }

    // v2's $toCanvas() is async, unlike v1's synchronous getCroppedCanvas().
    async function getCroppedCanvas(options) {
        if (!cropperSelection) return null;
        return cropperSelection.$toCanvas(options);
    }

    async function getCroppedImage() {
        const canvas = await getCroppedCanvas({ width: 400, height: 300 });
        if (!canvas) return;

        const croppedResult = document.getElementById('croppedResult');
        croppedResult.innerHTML = '';
        canvas.classList.add('img-fluid', 'rounded');
        croppedResult.appendChild(canvas);

        document.getElementById('cropInfo').textContent =
            `Dimensions: ${Math.round(cropperSelection.width)}x${Math.round(cropperSelection.height)}px`;
    }

    function downloadCanvas(canvas, filename, format, quality) {
        canvas.toBlob(
            function (blob) {
                if (!blob) return;
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                a.click();
                URL.revokeObjectURL(url);
            },
            format,
            quality
        );
    }

    async function downloadCroppedImage() {
        const canvas = await getCroppedCanvas();
        if (canvas) downloadCanvas(canvas, 'cropped-image.png');
    }

    function resetCropper() {
        cropperImage?.$resetTransform();
        cropperImage?.$center('contain');
        cropperSelection?.$reset();

        document.getElementById('croppedResult').innerHTML =
            '<p class="text-muted mb-0"><i class="bi bi-image" style="font-size: 3rem;"></i><br>Cropped image will appear here</p>';
        document.getElementById('cropInfo').textContent = 'No crop applied yet';
    }

    function rotateCropper(degrees) {
        cropperImage?.$rotate(`${degrees}deg`);
    }

    function flipCropper(direction) {
        if (!cropperImage) return;
        if (direction === 'horizontal') {
            cropperImage.$scale(-1, 1);
        } else {
            cropperImage.$scale(1, -1);
        }
    }

    function zoomCropper(ratio) {
        cropperImage?.$zoom(ratio);
    }

    async function applyCropPreset(preset) {
        const presets = {
            avatar: 1,
            cover: 1200 / 630,
            thumbnail: 300 / 200,
            banner: 1920 / 400
        };

        const ratio = presets[preset];
        if (!ratio) return;

        setAspectRatio(ratio);
        await getCroppedImage();
    }

    async function exportWithOptions() {
        if (!cropperSelection) return;

        const format = document.getElementById('exportFormat').value;
        const quality = parseFloat(document.getElementById('exportQuality').value);
        const sizeOption = document.getElementById('exportSize').value;

        let options;
        if (sizeOption === 'custom') {
            const width = parseInt(document.getElementById('customWidth').value, 10) || undefined;
            const height = parseInt(document.getElementById('customHeight').value, 10) || undefined;
            options = { width, height };
        } else {
            const multipliers = { small: 0.25, medium: 0.5, large: 0.75, original: 1 };
            const multiplier = multipliers[sizeOption] || 1;
            options = {
                width: Math.round(cropperSelection.width * multiplier),
                height: Math.round(cropperSelection.height * multiplier)
            };
        }

        const canvas = await getCroppedCanvas(options);
        if (!canvas) return;

        const extension = format.split('/')[1];
        downloadCanvas(canvas, `cropped-image.${extension}`, format, quality);
    }

    async function exportMultiple() {
        const formats = ['image/png', 'image/jpeg', 'image/webp'];

        for (const format of formats) {
            const canvas = await getCroppedCanvas();
            if (!canvas) return;
            const extension = format.split('/')[1];
            downloadCanvas(
                canvas,
                `cropped-image.${extension}`,
                format,
                format === 'image/jpeg' ? 0.9 : 1
            );
        }
    }

    // The markup drives these through inline onclick="" attributes, which look
    // them up on window. Module scope is not global, so expose them explicitly.
    Object.assign(window, {
        setAspectRatio,
        getCroppedImage,
        downloadCroppedImage,
        resetCropper,
        rotateCropper,
        flipCropper,
        zoomCropper,
        applyCropPreset,
        exportWithOptions,
        exportMultiple
    });

    function setupEventListeners() {
        // Image upload handler — v2 swaps the source on <cropper-image> instead
        // of destroying and re-creating the instance.
        document.getElementById('imageUpload')?.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function (event) {
                const src = event.target.result;
                document.getElementById('cropperImage').src = src;

                if (cropperImage) {
                    cropperImage.src = src;
                    cropperImage.$ready(() => {
                        cropperImage.$center('contain');
                        cropperSelection?.$reset();
                    });
                } else {
                    initializeCropper();
                }
            };
            reader.readAsDataURL(file);
        });

        // Export quality slider
        document.getElementById('exportQuality')?.addEventListener('input', function () {
            document.getElementById('qualityValue').textContent =
                Math.round(this.value * 100) + '%';
        });

        // Export size selector
        document.getElementById('exportSize')?.addEventListener('change', function () {
            const customInputs = document.getElementById('customSizeInputs');
            customInputs.style.display = this.value === 'custom' ? 'block' : 'none';
        });
    }
</script>

{{> scripts}}
