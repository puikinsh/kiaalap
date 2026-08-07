# Kiaalap v2.0 - Production Deployment Guide 🚀

## Overview

This guide explains how to deploy Kiaalap to your production server via SFTP.

---

## 📦 Deployment Options

### Option 1: Full Source Deployment (Recommended)

Deploy all source files with node_modules. The application will serve directly from source.

### Option 2: Build & Deploy Static Files

Build optimized static files and deploy only the output (limited to configured pages).

---

## 🎯 Option 1: Full Source Deployment (RECOMMENDED)

### Why This Option?
- ✅ All 65+ pages work immediately
- ✅ Handlebars templating works
- ✅ All node_modules dependencies available
- ✅ Easy to update and maintain
- ✅ No build step needed on server

### Step-by-Step Guide

#### 1. Prepare Files for Upload

```bash
# Clean up development files (optional)
npm run clean

# Remove unnecessary files
rm -rf .git
rm -rf .vscode
rm -rf node_modules/.cache
```

#### 2. Create Deployment Package

Create a `.deployignore` file to exclude unnecessary files:

```bash
# .deployignore
.git/
.vscode/
*.log
.DS_Store
.env
node_modules/.cache/
dist/
RELEASE_NOTES.md
DEPLOYMENT_GUIDE.md
```

#### 3. Files to Upload via SFTP

Upload these directories and files:

**Required:**
```
📁 Your Server Root
├── 📁 node_modules/          ⚠️ IMPORTANT: Required!
├── 📁 src/
│   ├── css/
│   ├── js/
│   ├── scss/
│   ├── partials/
│   └── helpers/
├── 📁 images/
├── 📁 img/
├── 📄 *.html (all HTML files)
├── 📄 package.json
└── 📄 package-lock.json
```

**Optional (for development):**
```
├── 📄 vite.config.js
├── 📄 .eslintrc.json
├── 📄 .prettierrc
└── 📄 README.md
```

#### 4. Upload via SFTP

**Using FileZilla:**
1. Connect to your server
2. Navigate to your web root (e.g., `/var/www/html` or `/public_html`)
3. Upload all files from the list above
4. Ensure `node_modules/` is fully uploaded (this takes time!)

**Using Command Line SFTP:**
```bash
# Connect
sftp user@your-server.com

# Upload
put -r node_modules/
put -r src/
put -r images/
put -r img/
put *.html
put package.json
put package-lock.json
```

**Using rsync (Faster):**
```bash
rsync -avz --exclude-from='.deployignore' \
  ./ user@your-server.com:/var/www/html/
```

#### 5. Server Configuration

**For Apache (.htaccess):**
```apache
# Ensure node_modules is accessible
<Directory "/var/www/html/node_modules">
    Options +FollowSymLinks
    AllowOverride None
    Require all granted
</Directory>

# Enable HTML5 routing (if needed)
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]
```

**For Nginx:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Serve node_modules
    location /node_modules {
        alias /var/www/html/node_modules;
    }

    # Enable gzip
    gzip on;
    gzip_types text/css application/javascript;
}
```

#### 6. Verify Deployment

Visit your site:
```
https://your-domain.com/index.html
```

Check these pages work:
- [x] index.html (Dashboard)
- [x] code-editor.html (Developer Tools)
- [x] data-table.html (Data Tables)
- [x] images-cropper.html (Image Cropper)
- [x] All navigation links work

---

## 🏗️ Option 2: Static Build Deployment (Advanced)

This option requires configuring all pages in `vite.config.js` first.

### Current Limitation
Only 11 pages are currently configured for building. To use this option, you need to add all 65+ pages to the Vite configuration.

### Steps (If You Configure All Pages)

#### 1. Build Production Files
```bash
npm run build
```

Output goes to `dist/` folder.

#### 2. Upload Only dist/ Folder
```bash
# Via SFTP
cd dist/
# Upload everything in dist/ to server root
```

#### 3. What Gets Built
- ✅ Minified HTML
- ✅ Minified CSS
- ✅ Minified JavaScript
- ✅ Optimized images
- ✅ Smaller file sizes (gzipped)

### Why This is NOT Recommended Currently
- ❌ Only 11 pages configured in build
- ❌ Need to manually add all pages to vite.config.js
- ❌ More complex to maintain
- ❌ Build time increases with more pages

---

## 📊 Upload Size Estimates

### Option 1 (Full Source)
```
node_modules/    : ~150 MB (compressed: ~40 MB)
src/            :   ~2 MB
images/         :   ~5 MB
img/            :   ~3 MB
HTML files      :   ~8 MB
Total           : ~168 MB (~50 MB compressed)
```

**Upload Time Estimates:**
- Fast connection (100 Mbps): ~5-10 minutes
- Medium connection (50 Mbps): ~10-20 minutes
- Slow connection (10 Mbps): ~40-60 minutes

### Option 2 (Build Output)
```
dist/           :   ~5 MB
Total           :   ~5 MB
```

**Upload Time**: 1-2 minutes

---

## ⚡ Quick Deployment Commands

### Full Deployment Script

Create `deploy.sh`:

```bash
#!/bin/bash
# Kiaalap Deployment Script

echo "🚀 Starting Kiaalap Deployment..."

# Configuration
SERVER="user@your-server.com"
REMOTE_PATH="/var/www/html"

# Exclude unnecessary files
EXCLUDE=(
  ".git"
  ".vscode"
  "*.log"
  ".DS_Store"
  ".env"
  "node_modules/.cache"
  "dist"
  "RELEASE_NOTES.md"
  "DEPLOYMENT_GUIDE.md"
)

# Build exclude arguments
EXCLUDE_ARGS=""
for item in "${EXCLUDE[@]}"; do
  EXCLUDE_ARGS="$EXCLUDE_ARGS --exclude='$item'"
done

# Deploy
echo "📦 Uploading files..."
rsync -avz $EXCLUDE_ARGS \
  --progress \
  ./ $SERVER:$REMOTE_PATH/

echo "✅ Deployment complete!"
echo "🌐 Visit: https://your-domain.com"
```

Make it executable:
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 🔒 Security Checklist

Before deploying to production:

- [ ] Remove `.git` folder (contains history)
- [ ] Remove `.env` files (if any)
- [ ] Check for sensitive data in code
- [ ] Ensure proper file permissions (644 for files, 755 for directories)
- [ ] Enable HTTPS on your server
- [ ] Configure security headers (see below)
- [ ] Enable gzip compression
- [ ] Set up CDN (optional)

### Security headers

All JavaScript and CSS is now served from your own origin — the template loads
no third-party scripts — so a strict Content-Security-Policy works without
allow-listing external hosts. The only remote origins are image hosts and the
map tile servers used by the demo map pages.

**Nginx:**

```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://ui-avatars.com https://images.unsplash.com https://flagcdn.com https://*.tile.openstreetmap.org https://server.arcgisonline.com; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
```

**Apache (`.htaccess`):**

```apache
Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://ui-avatars.com https://images.unsplash.com https://flagcdn.com https://*.tile.openstreetmap.org https://server.arcgisonline.com; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
```

`'unsafe-inline'` is required because most pages carry inline `<script>` and
`<style>` blocks. To drop it, move that page-local code into files under
`src/js/` and `src/css/`, or add a per-request nonce.

If you serve the full source tree (Option 1), also deny direct access to
non-runtime files:

```nginx
location ~ /\.(git|env)     { deny all; }
location ~ /(src|scripts)/  { deny all; }   # only if you deploy the built dist/
```

---

## 🧪 Testing After Deployment

### Must-Test Pages

1. **Dashboard** (`index.html`)
   - [ ] Page loads
   - [ ] Charts render
   - [ ] Sidebar navigation works

2. **Code Editor** (`code-editor.html`)
   - [ ] Syntax highlighting works
   - [ ] Tab switching works
   - [ ] Code execution works

3. **Data Tables** (`data-table.html`)
   - [ ] Table loads
   - [ ] Sorting works
   - [ ] Search works
   - [ ] Pagination works

4. **Image Cropper** (`images-cropper.html`)
   - [ ] Cropper loads
   - [ ] Image upload works
   - [ ] Crop controls work

5. **Maps** (`google-map.html`, `data-maps.html`)
   - [ ] Maps load
   - [ ] Markers display
   - [ ] Interactions work

6. **Charts** (`rounded-chart.html`, `bar-charts.html`, etc.)
   - [ ] Charts render
   - [ ] Data displays correctly

---

## 🐛 Common Issues & Solutions

### Issue 1: "node_modules not found"
**Solution**: Ensure `node_modules/` folder is uploaded completely.

### Issue 2: "404 Not Found for CSS/JS"
**Solution**: Check server configuration allows access to `node_modules/`.

### Issue 3: "Handlebars templates not rendering"
**Solution**: You're using Option 2 (build) but need Option 1 (source deployment).

### Issue 4: "Some pages not working"
**Solution**: Make sure all `.html` files are uploaded.

### Issue 5: "Slow page load"
**Solution**: Enable gzip compression on your server.

---

## 📈 Performance Optimization

### After Deployment

1. **Enable Gzip Compression**
   - Reduces file sizes by 70-80%
   - Faster page loads

2. **Enable Browser Caching**
   ```apache
   <IfModule mod_expires.c>
       ExpiresActive On
       ExpiresByType text/css "access plus 1 year"
       ExpiresByType application/javascript "access plus 1 year"
       ExpiresByType image/x-icon "access plus 1 year"
       ExpiresByType image/png "access plus 1 year"
   </IfModule>
   ```

3. **Enable HTTP/2**
   - Faster parallel resource loading
   - Configure in your web server

4. **Use CDN** (Optional)
   - Serve static assets from CDN
   - Examples: Cloudflare, AWS CloudFront

---

## 📝 Post-Deployment Checklist

- [ ] All pages accessible
- [ ] Navigation working
- [ ] No console errors
- [ ] CSS styles loading
- [ ] JavaScript working
- [ ] Images displaying
- [ ] Forms submitting
- [ ] Mobile responsive
- [ ] HTTPS enabled
- [ ] Performance optimized

---

## 🔄 Updating Your Site

### To Update After Initial Deployment:

```bash
# Make your changes locally

# Test locally
npm run dev

# Upload only changed files via SFTP
# Or run the deploy script
./deploy.sh
```

### For Quick Updates (Changed Files Only):

```bash
# Upload specific files
sftp user@server.com
put path/to/changed-file.html
```

---

## 🎯 Recommended: Option 1

**Use Option 1 (Full Source Deployment)** for the following reasons:

✅ **Pros:**
- Works immediately with all 65+ pages
- No build configuration needed
- Easy to update individual files
- Handlebars templates work
- All features functional

❌ **Cons:**
- Larger upload size (~50 MB compressed)
- Slightly slower first load (negligible with caching)
- node_modules exposed (mitigate with proper server config)

---

## 📞 Need Help?

If you encounter issues:

1. Check browser console for errors
2. Check server error logs
3. Verify file permissions
4. Test locally first with `npm run dev`
5. Open an issue on GitHub

---

## ✅ Final Recommendation

**Deploy with Option 1 (Full Source)**:

```bash
# 1. Upload via SFTP or rsync
rsync -avz --exclude='.git' ./ user@server:/var/www/html/

# 2. Configure server (Apache/Nginx)
# 3. Enable gzip compression
# 4. Test all pages
# 5. Done! 🎉
```

Your Kiaalap dashboard will be live and fully functional!

---

**Happy Deploying!** 🚀