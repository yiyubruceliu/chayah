# Chayah Kalahari Project NPC Website

A clean, single-page scroller website for the Chayah Kalahari Project NPC, a South African non-profit company focused on meerkat rehabilitation and conservation.

## Features

- **Responsive Design**: Fully mobile-friendly with clean, modern UI
- **Single Page Scroller**: Smooth navigation between sections
- **Interactive Gallery**: Lightbox functionality for image viewing
- **Contact Form**: Functional contact form with validation
- **Statistics Animation**: Animated counters for impact metrics
- **Modern Typography**: Clean sans-serif fonts (Montserrat)
- **Conservation-Focused**: Trustworthy, scientific tone

## Color Scheme

- **Primary Orange**: #D08C2B (warm earthy orange for accents and headings)
- **Secondary Beige**: #F4E8D2 (sandy beige for backgrounds)
- **Text Dark**: #333333 (charcoal grey for body text)
- **White**: #FFFFFF (base color)

## Sections

1. **Hero Section**: Logo, headline, and call-to-action
2. **About Section**: Mission and background information
3. **Services Section**: Six key service areas with icons
4. **Our Work Section**: Statistics and impact metrics
5. **Gallery Section**: Responsive image grid with lightbox
6. **Urgent Appeal Section**: Emergency relocation appeal
7. **Contact Section**: Contact information and form
8. **Footer**: Quick links and organization details

## File Structure

```
Chayah/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── donate.html         # Donation page
├── donate.js           # Donation page JavaScript
├── build.js            # Build script for production
├── package.json        # Node.js dependencies
├── README.md           # This file
└── img/
    ├── Logo.jpg        # Organization logo
    ├── Background.jpg  # Hero background image
    └── gallery/        # Gallery images directory
        ├── DSF9179.JPG
        ├── DSF9185.JPG
        ├── DSF9188.JPG
        ├── DSF9190.JPG
        ├── DSF9194.JPG
        ├── DSF9200.JPG
        ├── DSF9202.JPG
        ├── DSF9214.JPG
        ├── DSF9216.JPG
        ├── DSF9220.JPG
        ├── DSF9225.JPG
        ├── DSF9227.JPG
        ├── XPN5246.JPG
        ├── XPN5304.JPG
        ├── XPN5307.JPG
        ├── XPN5316.JPG
        ├── XPN5333.JPG
        ├── XPN5334.JPG
        ├── XPN5340.JPG
        ├── XPN5343.JPG
        ├── XPN5406.JPG
        ├── XPN5433.JPG
        └── XPN5438.JPG
```

## Build Process

The website includes a build script (`build.js`) that optimizes all files for production deployment. The build process creates a `docs/` directory with minified and optimized files.

### Prerequisites

1. **Node.js**: Ensure you have Node.js installed (version 14 or higher)
2. **Dependencies**: Install required packages:
   ```bash
   npm install
   ```

### Running the Build

Execute the build script to create production-ready files:

```bash
node build.js
```

### What the Build Does

The build process performs the following optimizations:

#### 📄 **HTML Minification**
- Removes comments and unnecessary whitespace
- Updates CSS/JS references to minified versions with cache-busting
- Creates `docs/index.html` and `docs/donate.html`

#### 🎨 **CSS Minification**
- Removes comments and whitespace
- Optimizes selectors and properties
- Creates `docs/styles.min.css`

#### ⚡ **JavaScript Minification**
- Removes comments and whitespace
- Optimizes code structure
- Creates `docs/script.min.js` and `docs/donate.min.js`

#### 🖼️ **Image Optimization**
- Compresses images using Sharp (if installed)
- Maintains quality while reducing file sizes
- Copies all images to `docs/img/` directory

#### 📋 **Additional Files Created**
- `docs/manifest.json` - Build information and cache settings
- `docs/.htaccess` - Apache server configuration
- `docs/robots.txt` - Search engine crawling rules
- `docs/sitemap.xml` - Site structure for search engines
- `docs/version.txt` - Version information and timestamps

### Build Output

After running the build, you'll have a `docs/` directory containing:

```
docs/
├── index.html          # Minified main page
├── donate.html         # Minified donation page
├── styles.min.css      # Minified CSS
├── script.min.js       # Minified main JavaScript
├── donate.min.js       # Minified donation JavaScript
├── manifest.json       # Build manifest
├── .htaccess          # Apache configuration
├── robots.txt         # SEO configuration
├── sitemap.xml        # Search engine sitemap
├── version.txt        # Version information
└── img/               # Optimized images
    ├── Logo.jpg
    ├── Background.jpg
    └── gallery/
        └── [all gallery images]
```

### Deployment

1. **Upload**: Upload the contents of the `docs/` folder to your web server
2. **Server Configuration**: The `.htaccess` file provides optimal server settings
3. **Cache Busting**: Version parameters ensure browsers load updated files

### Optional: Image Compression

For better image optimization, install Sharp:

```bash
npm install sharp
```

This will enable automatic image compression during the build process.

### Build Versioning

Each build generates a unique version timestamp (YYYYMMDDHHMM format) that:
- Prevents browser caching issues
- Ensures users always get the latest version
- Provides easy rollback identification

## Adding Gallery Images

To add images to the gallery section:

1. Place your images in the `img/gallery/` directory
2. Name them `meerkat1.jpg`, `meerkat2.jpg`, etc. (or update the HTML to match your naming)
3. Recommended image specifications:
   - **Format**: JPG or PNG
   - **Aspect Ratio**: 4:3 or 16:9 (landscape orientation works best)
   - **Size**: Minimum 800x600px, optimal 1200x900px
   - **File Size**: Keep under 500KB for fast loading

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- **Lazy Loading**: Gallery images load as needed
- **Image Optimization**: Responsive images with proper sizing
- **Smooth Animations**: CSS transitions and JavaScript animations
- **Mobile Optimized**: Touch-friendly interactions

## Contact Information

- **Phone**: +27 83 388 0898
- **Email**: info@meerkatrescue.org
- **Address**: Village House 15, Ward 4, Van Zylsrus, South Africa
- **Facebook**: https://www.facebook.com/SolidearthMeerkat

## Organization Details

- **Name**: Chayah Kalahari Project NPC
- **Registration**: 2025/268702/08
- **Founded**: 2014
- **Mission**: Meerkat rehabilitation and conservation

## Technical Notes

- Built with semantic HTML5
- Responsive CSS Grid and Flexbox
- Vanilla JavaScript (no frameworks)
- Optimized for accessibility
- Ready for CMS integration

## Future Enhancements

- Blog section for conservation updates
- Donation integration
- Newsletter signup
- Volunteer application form
- Impact stories section
- Multi-language support

## License

© 2024 Chayah Kalahari Project NPC. All rights reserved. 