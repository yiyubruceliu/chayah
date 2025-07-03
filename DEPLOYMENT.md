# Deployment Guide - Chayah Kalahari Project NPC

This guide will help you deploy the optimized website to your web server.

## 🚀 Quick Start

### Option 1: Using the Build Script (Recommended)

1. **Install Node.js** (if not already installed)
   - Download from: https://nodejs.org/
   - Version 14 or higher recommended

2. **Run the build process**
   ```bash
   node build.js
   ```

3. **Upload the `dist/` folder contents** to your web server

### Option 2: Manual Build

If you prefer to build manually or don't have Node.js:

1. **Minify HTML**: Remove comments and whitespace from `index.html`
2. **Minify CSS**: Remove comments and whitespace from `styles.css`
3. **Minify JS**: Remove comments and whitespace from `script.js`
4. **Copy images**: Copy the `img/` folder
5. **Upload all files** to your web server

## 📁 Build Output

After running the build script, you'll have a `dist/` folder containing:

```
dist/
├── index.html          # Minified HTML
├── styles.min.css      # Minified CSS
├── script.min.js       # Minified JavaScript
├── img/                # All images
│   ├── Logo.jpg
│   └── gallery/        # All gallery images
├── .htaccess          # Apache configuration
├── robots.txt         # Search engine instructions
├── sitemap.xml        # Site map for search engines
└── manifest.json      # Build information
```

## 🌐 Web Server Setup

### Apache Server (Most Common)

1. **Upload all files** from the `dist/` folder to your web root
2. **The `.htaccess` file** will automatically:
   - Enable GZIP compression
   - Set browser caching
   - Add security headers
   - Optimize performance

### Nginx Server

If using Nginx, add this configuration to your server block:

```nginx
server {
    listen 80;
    server_name chayahkalahari.org www.chayahkalahari.org;
    root /path/to/your/website;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Browser caching
    location ~* \.(css|js|jpg|jpeg|png|gif|ico)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Static Hosting (Netlify, Vercel, etc.)

1. **Connect your repository** to your hosting service
2. **Set build command**: `node build.js`
3. **Set publish directory**: `dist`
4. **Deploy automatically** on git push

## 🔧 Performance Optimization

### Before Deployment

1. **Image Optimization** (Optional)
   ```bash
   # Install image optimization tools
   npm install -g imagemin-cli imagemin-mozjpeg imagemin-pngquant
   
   # Optimize images
   imagemin img/**/* --out-dir=dist/img
   ```

2. **Enable HTTPS**
   - Get an SSL certificate (Let's Encrypt is free)
   - Update the `.htaccess` file to redirect HTTP to HTTPS

3. **CDN Setup** (Optional)
   - Consider using a CDN for faster global delivery
   - Popular options: Cloudflare, AWS CloudFront, Google Cloud CDN

### After Deployment

1. **Test Performance**
   - Use Google PageSpeed Insights: https://pagespeed.web.dev/
   - Use GTmetrix: https://gtmetrix.com/
   - Aim for 90+ scores

2. **Monitor Analytics**
   - Set up Google Analytics
   - Monitor Core Web Vitals
   - Track user engagement

## 🔍 SEO Checklist

- [ ] **Meta tags** are properly set
- [ ] **Structured data** is included
- [ ] **Sitemap** is accessible at `/sitemap.xml`
- [ ] **Robots.txt** is accessible at `/robots.txt`
- [ ] **Canonical URLs** are set
- [ ] **Alt text** is present on all images
- [ ] **Page titles** are descriptive
- [ ] **Meta descriptions** are compelling

## 🛡️ Security Checklist

- [ ] **HTTPS** is enabled
- [ ] **Security headers** are set
- [ ] **XSS protection** is enabled
- [ ] **Content type sniffing** is disabled
- [ ] **Frame embedding** is restricted
- [ ] **Referrer policy** is set

## 📊 Monitoring

### Essential Metrics to Track

1. **Performance**
   - Page load time
   - Core Web Vitals
   - Time to First Byte (TTFB)

2. **SEO**
   - Search rankings
   - Organic traffic
   - Click-through rates

3. **User Experience**
   - Bounce rate
   - Time on page
   - Conversion rate

## 🚨 Troubleshooting

### Common Issues

1. **Images not loading**
   - Check file paths
   - Verify file permissions
   - Ensure images are uploaded

2. **CSS/JS not loading**
   - Check file paths in HTML
   - Verify minified files exist
   - Check server configuration

3. **Slow loading**
   - Enable GZIP compression
   - Optimize images
   - Use a CDN

4. **SEO issues**
   - Verify meta tags
   - Check structured data
   - Submit sitemap to search engines

## 📞 Support

If you encounter issues:

1. **Check the browser console** for JavaScript errors
2. **Verify file permissions** on the server
3. **Test locally** before deploying
4. **Contact your hosting provider** for server-specific issues

## 🎯 Next Steps

After successful deployment:

1. **Submit to search engines**
   - Google Search Console
   - Bing Webmaster Tools

2. **Set up monitoring**
   - Google Analytics
   - Performance monitoring

3. **Regular maintenance**
   - Update content regularly
   - Monitor performance
   - Keep dependencies updated

---

**Good luck with your deployment!** 🚀

The Chayah Kalahari Project NPC website is now optimized and ready to make a positive impact on meerkat conservation. 