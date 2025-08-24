// Personal Brand Website Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Add staggered animation to social links
    const socialLinks = document.querySelectorAll('.social-link');
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Initialize social links with hidden state for animation
    socialLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
        link.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(link);
    });
    
    // Add click analytics tracking
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.getAttribute('data-platform');
            
            // Track the click (for future analytics integration)
            console.log(`Clicked on ${platform} link`);
            
            // Add a subtle click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Add keyboard navigation support
    socialLinks.forEach(link => {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Subtle parallax effect for background pattern
    document.addEventListener('mousemove', (e) => {
        const bg = document.querySelector('.bg-animation');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const x = (mouseX - 0.5) * 10;
        const y = (mouseY - 0.5) * 10;
        
        bg.style.transform = `translate(${x}px, ${y}px)`;
    });
    
    // Profile image interaction
    const profileImage = document.querySelector('.profile-image');
    
    profileImage.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
    
    // Add loading state management
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger entrance animations
        const profileSection = document.querySelector('.profile-section');
        const socialSection = document.querySelector('.social-links-section');
        const footer = document.querySelector('.footer');
        
        setTimeout(() => profileSection.style.opacity = '1', 100);
        setTimeout(() => socialSection.style.opacity = '1', 300);
        setTimeout(() => footer.style.opacity = '1', 500);
    });
    
    // Handle connection status
    function updateConnectionStatus() {
        if (navigator.onLine) {
            document.body.classList.remove('offline');
        } else {
            document.body.classList.add('offline');
            console.warn('You are currently offline. Some features may not work properly.');
        }
    }
    
    window.addEventListener('online', updateConnectionStatus);
    window.addEventListener('offline', updateConnectionStatus);
    updateConnectionStatus();
    
    // Smooth scroll for any internal links (future-proofing)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add touch feedback for mobile devices
    if ('ontouchstart' in window) {
        socialLinks.forEach(link => {
            link.addEventListener('touchstart', function() {
                this.style.opacity = '0.8';
            });
            
            link.addEventListener('touchend', function() {
                this.style.opacity = '1';
            });
        });
    }
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`Page loaded in ${loadTime}ms`);
            }, 0);
        });
    }
    
    // Add service worker registration for potential PWA features
    if ('serviceWorker' in navigator) {
        // Future implementation for offline capabilities
        console.log('Service Worker supported');
    }
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle resize events efficiently
const handleResize = debounce(() => {
    // Future responsive adjustments
    console.log('Window resized');
}, 250);

window.addEventListener('resize', handleResize);

// Error handling for external resources
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'LINK' && e.target.rel === 'stylesheet') {
        console.warn('Failed to load stylesheet:', e.target.href);
    }
    if (e.target.tagName === 'IMG') {
        console.warn('Failed to load image:', e.target.src);
        // Could implement fallback image here
    }
});
