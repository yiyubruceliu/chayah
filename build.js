const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Import sharp for image compression (optional - will work without it)
let sharp;
try {
    sharp = require('sharp');
} catch (error) {
    console.log('⚠️  Sharp not installed. Images will be copied without compression.');
    console.log('💡 Install with: npm install sharp');
}

// Create docs directory if it doesn't exist
if (!fs.existsSync('docs')) {
    fs.mkdirSync('docs');
}

console.log('🚀 Starting build process...');

// Function to minify HTML
function minifyHTML() {
    console.log('📄 Minifying HTML...');
    const html = fs.readFileSync('index.html', 'utf8');
    
    // Remove comments
    let minified = html.replace(/<!--[\s\S]*?-->/g, '');
    
    // Remove extra whitespace
    minified = minified.replace(/\s+/g, ' ');
    minified = minified.replace(/>\s+</g, '><');
    minified = minified.replace(/\s+>/g, '>');
    minified = minified.replace(/<\s+/g, '<');
    
    // Remove line breaks
    minified = minified.replace(/\n/g, '');
    minified = minified.replace(/\r/g, '');
    
    // Update CSS and JS references to minified versions
    minified = minified.replace('styles.css', 'styles.min.css');
    minified = minified.replace('script.js', 'script.min.js');
    
    fs.writeFileSync('docs/index.html', minified);
    console.log('✅ HTML minified');
}

// Function to minify CSS
function minifyCSS() {
    console.log('🎨 Minifying CSS...');
    const css = fs.readFileSync('styles.css', 'utf8');
    
    // Remove comments
    let minified = css.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Remove extra whitespace
    minified = minified.replace(/\s+/g, ' ');
    minified = minified.replace(/\s*{\s*/g, '{');
    minified = minified.replace(/\s*}\s*/g, '}');
    minified = minified.replace(/\s*:\s*/g, ':');
    minified = minified.replace(/\s*;\s*/g, ';');
    minified = minified.replace(/\s*,\s*/g, ',');
    
    // Remove unnecessary semicolons
    minified = minified.replace(/;}/g, '}');
    
    // Remove line breaks
    minified = minified.replace(/\n/g, '');
    minified = minified.replace(/\r/g, '');
    
    fs.writeFileSync('docs/styles.min.css', minified);
    console.log('✅ CSS minified');
}

// Function to minify JavaScript
function minifyJS() {
    console.log('⚡ Minifying JavaScript...');
    const js = fs.readFileSync('script.js', 'utf8');
    
    // Remove comments (single line and multi-line)
    let minified = js.replace(/\/\/.*$/gm, '');
    minified = minified.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Remove extra whitespace
    minified = minified.replace(/\s+/g, ' ');
    minified = minified.replace(/\s*{\s*/g, '{');
    minified = minified.replace(/\s*}\s*/g, '}');
    minified = minified.replace(/\s*;\s*/g, ';');
    minified = minified.replace(/\s*,\s*/g, ',');
    minified = minified.replace(/\s*=\s*/g, '=');
    minified = minified.replace(/\s*\+\s*/g, '+');
    minified = minified.replace(/\s*-\s*/g, '-');
    minified = minified.replace(/\s*\*\s*/g, '*');
    minified = minified.replace(/\s*\/\s*/g, '/');
    
    // Remove line breaks
    minified = minified.replace(/\n/g, '');
    minified = minified.replace(/\r/g, '');
    
    fs.writeFileSync('docs/script.min.js', minified);
    console.log('✅ JavaScript minified');
}

// Function to compress and copy images
async function compressImages() {
    console.log('🖼️ Processing images...');
    
    // Create img directory in docs
    if (!fs.existsSync('docs/img')) {
        fs.mkdirSync('docs/img', { recursive: true });
    }
    
    // Create gallery directory
    if (!fs.existsSync('docs/img/gallery')) {
        fs.mkdirSync('docs/img/gallery', { recursive: true });
    }
    
    let totalOriginalSize = 0;
    let totalCompressedSize = 0;
    let processedCount = 0;
    
    // Process logo
    if (fs.existsSync('img/Logo.jpg')) {
        const logoStats = fs.statSync('img/Logo.jpg');
        totalOriginalSize += logoStats.size;
        
        if (sharp) {
            try {
                await sharp('img/Logo.jpg')
                    .jpeg({ quality: 85, progressive: true })
                    .toFile('docs/img/Logo.jpg');
                
                const compressedStats = fs.statSync('docs/img/Logo.jpg');
                totalCompressedSize += compressedStats.size;
                processedCount++;
                
                const savings = ((logoStats.size - compressedStats.size) / logoStats.size * 100).toFixed(1);
                console.log(`   Logo.jpg: ${(logoStats.size / 1024 / 1024).toFixed(2)}MB → ${(compressedStats.size / 1024 / 1024).toFixed(2)}MB (${savings}% smaller)`);
            } catch (error) {
                console.log(`   ⚠️  Could not compress Logo.jpg, copying original`);
                fs.copyFileSync('img/Logo.jpg', 'docs/img/Logo.jpg');
                totalCompressedSize += logoStats.size;
                processedCount++;
            }
        } else {
            fs.copyFileSync('img/Logo.jpg', 'docs/img/Logo.jpg');
            totalCompressedSize += logoStats.size;
            processedCount++;
        }
    }
    
    // Process gallery images
    const galleryDir = 'img/gallery';
    if (fs.existsSync(galleryDir)) {
        const files = fs.readdirSync(galleryDir);
        const imageFiles = files.filter(file => file.match(/\.(jpg|jpeg|png|gif)$/i));
        
        console.log(`   Processing ${imageFiles.length} gallery images...`);
        
        for (const file of imageFiles) {
            const inputPath = path.join(galleryDir, file);
            const outputPath = path.join('docs/img/gallery', file);
            const stats = fs.statSync(inputPath);
            totalOriginalSize += stats.size;
            
            if (sharp) {
                try {
                    const ext = path.extname(file).toLowerCase();
                    
                    if (ext === '.jpg' || ext === '.jpeg') {
                        await sharp(inputPath)
                            .jpeg({ 
                                quality: 80, 
                                progressive: true,
                                mozjpeg: true 
                            })
                            .toFile(outputPath);
                    } else if (ext === '.png') {
                        await sharp(inputPath)
                            .png({ 
                                quality: 80,
                                compressionLevel: 9 
                            })
                            .toFile(outputPath);
                    } else {
                        // For other formats, just copy
                        fs.copyFileSync(inputPath, outputPath);
                    }
                    
                    const compressedStats = fs.statSync(outputPath);
                    totalCompressedSize += compressedStats.size;
                    processedCount++;
                    
                    const savings = ((stats.size - compressedStats.size) / stats.size * 100).toFixed(1);
                    if (savings > 5) { // Only show significant savings
                        console.log(`   ${file}: ${(stats.size / 1024 / 1024).toFixed(2)}MB → ${(compressedStats.size / 1024 / 1024).toFixed(2)}MB (${savings}% smaller)`);
                    }
                    
                } catch (error) {
                    console.log(`   ⚠️  Could not compress ${file}, copying original`);
                    fs.copyFileSync(inputPath, outputPath);
                    totalCompressedSize += stats.size;
                    processedCount++;
                }
            } else {
                fs.copyFileSync(inputPath, outputPath);
                totalCompressedSize += stats.size;
                processedCount++;
            }
        }
    }
    
    // Calculate and display compression statistics
    const totalOriginalMB = (totalOriginalSize / 1024 / 1024).toFixed(2);
    const totalCompressedMB = (totalCompressedSize / 1024 / 1024).toFixed(2);
    const totalSavings = ((totalOriginalSize - totalCompressedSize) / totalOriginalSize * 100).toFixed(1);
    
    console.log(`✅ Images processed: ${processedCount} files`);
    console.log(`📊 Total size: ${totalOriginalMB}MB → ${totalCompressedMB}MB (${totalSavings}% smaller)`);
    
    if (sharp) {
        console.log('🎯 Image compression completed with Sharp');
    } else {
        console.log('📋 Images copied without compression (install Sharp for compression)');
    }
}

// Function to create a deployment manifest
function createManifest() {
    console.log('📋 Creating deployment manifest...');
    
    const manifest = {
        name: 'Chayah Kalahari Project NPC',
        version: '1.0.0',
        buildDate: new Date().toISOString(),
        files: {
            html: 'index.html',
            css: 'styles.min.css',
            js: 'script.min.js',
            images: 'img/'
        },
        optimization: {
            htmlMinified: true,
            cssMinified: true,
            jsMinified: true,
            imagesOptimized: !!sharp // Set to true if Sharp is available
        }
    };
    
    fs.writeFileSync('docs/manifest.json', JSON.stringify(manifest, null, 2));
    console.log('✅ Manifest created');
}

// Function to create .htaccess for Apache servers
function createHtaccess() {
    console.log('🔧 Creating .htaccess file...');
    
    const htaccess = `# Chayah Kalahari Project NPC - Apache Configuration

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Set browser caching
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Redirect to HTTPS (uncomment if using SSL)
# RewriteEngine On
# RewriteCond %{HTTPS} off
# RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
`;
    
    fs.writeFileSync('docs/.htaccess', htaccess);
    console.log('✅ .htaccess created');
}

// Function to create robots.txt
function createRobotsTxt() {
    console.log('🤖 Creating robots.txt...');
    
    const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://chayahkalahari.org/sitemap.xml

# Crawl-delay
Crawl-delay: 1`;
    
    fs.writeFileSync('docs/robots.txt', robotsTxt);
    console.log('✅ robots.txt created');
}

// Function to create sitemap.xml
function createSitemap() {
    console.log('🗺️ Creating sitemap.xml...');
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://chayahkalahari.org/</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
</urlset>`;
    
    fs.writeFileSync('docs/sitemap.xml', sitemap);
    console.log('✅ sitemap.xml created');
}

// Main build function
async function build() {
    try {
        await compressImages();
        minifyHTML();
        minifyCSS();
        minifyJS();
        createManifest();
        createHtaccess();
        createRobotsTxt();
        createSitemap();
        
        console.log('\n🎉 Build completed successfully!');
        console.log('📁 Output directory: docs/');
        console.log('📊 File sizes:');
        
        // Show file sizes
        const files = ['index.html', 'styles.min.css', 'script.min.js'];
        files.forEach(file => {
            if (fs.existsSync(`docs/${file}`)) {
                const stats = fs.statSync(`docs/${file}`);
                const sizeKB = (stats.size / 1024).toFixed(2);
                console.log(`   ${file}: ${sizeKB} KB`);
            }
        });
        
        // Show image directory size
        if (fs.existsSync('docs/img')) {
            const imgStats = getDirectorySize('docs/img');
            const imgSizeMB = (imgStats / 1024 / 1024).toFixed(2);
            console.log(`   img/: ${imgSizeMB} MB`);
        }
        
        console.log('\n🚀 Ready for deployment!');
        console.log('💡 Tip: Upload the contents of the docs/ folder to your web server.');
        
    } catch (error) {
        console.error('❌ Build failed:', error.message);
        process.exit(1);
    }
}

// Helper function to calculate directory size
function getDirectorySize(dirPath) {
    let totalSize = 0;
    
    if (fs.existsSync(dirPath)) {
        const items = fs.readdirSync(dirPath);
        
        for (const item of items) {
            const itemPath = path.join(dirPath, item);
            const stats = fs.statSync(itemPath);
            
            if (stats.isDirectory()) {
                totalSize += getDirectorySize(itemPath);
            } else {
                totalSize += stats.size;
            }
        }
    }
    
    return totalSize;
}

// Run build
build(); 