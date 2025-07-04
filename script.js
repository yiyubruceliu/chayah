// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = '#FFFFFF';
        navbar.style.backdropFilter = 'none';
    }
});

// Gallery Lightbox
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('.gallery-img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'block') {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    const submitBtn = contactForm.querySelector('.submit-button');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch('send-email.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert(result.message);
            contactForm.reset();
        } else {
            alert(result.message || 'There was an error sending your message. Please try again.');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        alert('There was an error sending your message. Please try again or contact us directly.');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Preserve spacing for negative value
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-item, .stat-card, .gallery-item, .contact-item');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Stats counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (counter.textContent.includes('%')) {
                counter.textContent = Math.floor(current) + '%';
            } else if (counter.textContent.includes(',')) {
                counter.textContent = Math.floor(current).toLocaleString();
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Trigger counter animation when work section is visible
const workSection = document.querySelector('#work');
const workObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            workObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

workObserver.observe(workSection);

// Preload gallery images
function preloadImages() {
    const imageUrls = [
        'img/gallery/DSF9200.JPG',
        'img/gallery/DSF9194.JPG',
        'img/gallery/DSF9190.JPG',
        'img/gallery/DSF9188.JPG',
        'img/gallery/DSF9185.JPG',
        'img/gallery/DSF9179.JPG'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Call preload function when page loads
window.addEventListener('load', preloadImages);

// Add loading state to images
document.querySelectorAll('.gallery-img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    img.addEventListener('error', function() {
        this.style.opacity = '0.5';
        this.style.filter = 'grayscale(100%)';
        this.alt = 'Image not available';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-orange) !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
    .gallery-img {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);

// Full Gallery Modal Functionality
const viewMoreBtn = document.getElementById('viewMoreBtn');
const fullGalleryModal = document.getElementById('fullGalleryModal');
const modalClose = document.querySelector('.modal-close');
const fullGalleryGrid = document.getElementById('fullGalleryGrid');

// All gallery images with descriptions
const allGalleryImages = [
    { src: 'img/gallery/DSF9200.JPG', alt: 'Young meerkat receiving veterinary care during rehabilitation at Chayah Kalahari Project' },
    { src: 'img/gallery/DSF9194.JPG', alt: 'Meerkat mob socializing in natural Kalahari desert habitat during rehabilitation' },
    { src: 'img/gallery/DSF9190.JPG', alt: 'Meerkat rehabilitation activities and survival skills training at Chayah facility' },
    { src: 'img/gallery/DSF9188.JPG', alt: 'Stunning Kalahari desert landscape where meerkats are rehabilitated and released' },
    { src: 'img/gallery/DSF9185.JPG', alt: 'Successful meerkat release back into the wild Kalahari desert environment' },
    { src: 'img/gallery/DSF9179.JPG', alt: 'Conservation work and meerkat monitoring in the Kalahari desert ecosystem' },
    { src: 'img/gallery/XPN5438.JPG', alt: 'Meerkat family group in their natural Kalahari desert environment' },
    { src: 'img/gallery/XPN5433.JPG', alt: 'Meerkat standing guard while others forage in the desert landscape' },
    { src: 'img/gallery/XPN5406.JPG', alt: 'Meerkat rehabilitation progress showing natural behaviors restored' },
    { src: 'img/gallery/XPN5343.JPG', alt: 'Meerkat mob interaction and social bonding during rehabilitation' },
    { src: 'img/gallery/XPN5340.JPG', alt: 'Meerkat exploring rehabilitated habitat in the Kalahari desert' },
    { src: 'img/gallery/XPN5334.JPG', alt: 'Meerkat receiving specialized care and attention from conservation team' },
    { src: 'img/gallery/XPN5333.JPG', alt: 'Meerkat showing natural foraging behaviors in desert environment' },
    { src: 'img/gallery/XPN5316.JPG', alt: 'Meerkat family unit demonstrating successful rehabilitation outcomes' },
    { src: 'img/gallery/XPN5307.JPG', alt: 'Meerkat social interaction and communication in natural habitat' },
    { src: 'img/gallery/XPN5304.JPG', alt: 'Meerkat rehabilitation facility showing professional care standards' },
    { src: 'img/gallery/XPN5246.JPG', alt: 'Meerkat release preparation and final health checks before return to wild' },
    { src: 'img/gallery/DSF9227.JPG', alt: 'Meerkat conservation work and habitat monitoring in Kalahari desert' },
    { src: 'img/gallery/DSF9225.JPG', alt: 'Meerkat rehabilitation success story showing natural behaviors' },
    { src: 'img/gallery/DSF9220.JPG', alt: 'Meerkat family dynamics and social structure in rehabilitation' },
    { src: 'img/gallery/DSF9216.JPG', alt: 'Meerkat adaptation to natural desert environment during rehabilitation' },
    { src: 'img/gallery/DSF9214.JPG', alt: 'Meerkat conservation education and community outreach activities' },
    { src: 'img/gallery/DSF9202.JPG', alt: 'Meerkat rehabilitation facility and professional care environment' }
];

// Function to populate full gallery
function populateFullGallery() {
    fullGalleryGrid.innerHTML = '';
    
    allGalleryImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'full-gallery-item';
        galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.alt}" class="full-gallery-img" loading="lazy">
        `;
        
        // Add click event to open lightbox
        galleryItem.addEventListener('click', () => {
            lightboxImg.src = image.src;
            lightboxImg.alt = image.alt;
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
        
        fullGalleryGrid.appendChild(galleryItem);
    });
}

// Open full gallery modal
viewMoreBtn.addEventListener('click', () => {
    populateFullGallery();
    fullGalleryModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// Close full gallery modal
modalClose.addEventListener('click', () => {
    fullGalleryModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
fullGalleryModal.addEventListener('click', (e) => {
    if (e.target === fullGalleryModal) {
        fullGalleryModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (fullGalleryModal.style.display === 'block') {
            fullGalleryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (lightbox.style.display === 'block') {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
}); 