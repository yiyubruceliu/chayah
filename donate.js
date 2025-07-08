// Donate Page Specific JavaScript

// Bank Modal Functionality
function openBankModal() {
    const bankModal = document.getElementById('bankModal');
    if (bankModal) {
        bankModal.style.display = 'block';
    }
}

function closeBankModal() {
    const bankModal = document.getElementById('bankModal');
    if (bankModal) {
        bankModal.style.display = 'none';
    }
}

// Close bank modal when clicking outside
window.addEventListener('click', function(event) {
    const bankModal = document.getElementById('bankModal');
    if (bankModal && event.target === bankModal) {
        closeBankModal();
    }
});

// Copy to clipboard functionality
function copyToClipboard(text, id) {
    navigator.clipboard.writeText(text).then(function() {
        console.log('Text copied to clipboard', text);
        const element = document.getElementById(id);
        const originalText = element.textContent;
        const originalColor = element.style.color;
        
        element.textContent = 'Copied!';
        element.classList.add('copied');
        element.style.color = 'green';
        
        setTimeout(function() {
            // Fade to white
            element.style.transition = 'color 0.5s ease';
            element.style.color = '#ffffff';
            
            setTimeout(function() {
                // Fade back to original color
                element.style.color = originalColor;
                element.textContent = originalText;
                element.classList.remove('copied');
                
                // Remove transition after animation
                setTimeout(function() {
                    element.style.transition = '';
                }, 500);
            }, 500);
        }, 1000);
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
        alert('Could not copy to clipboard. Please copy manually: ' + text);
    });
}

// Mobile Navigation Toggle (for donate page)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Nav logo click to navigate to index.html and scroll to top
const navLogo = document.querySelector('.nav-logo');
if (navLogo) {
    navLogo.addEventListener('click', () => {
        // Navigate to index.html and scroll to top
        window.location.href = 'index.html#top';
    });
    
    // Add cursor pointer to indicate it's clickable
    navLogo.style.cursor = 'pointer';
} 