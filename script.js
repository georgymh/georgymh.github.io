// Personal Brand Website - GitHub Pages Compatible
document.addEventListener('DOMContentLoaded', function() {
    
    // Add subtle parallax effect for background pattern
    document.addEventListener('mousemove', function(e) {
        const bg = document.querySelector('.bg-animation');
        if (bg) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const x = (mouseX - 0.5) * 10;
            const y = (mouseY - 0.5) * 10;
            
            bg.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        }
    });
    
    // Add click effect to profile image
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(function() {
                profileImage.style.transform = '';
            }, 150);
        });
    }
    
    // Add touch feedback for mobile devices
    const socialLinks = document.querySelectorAll('.social-link');
    if ('ontouchstart' in window) {
        socialLinks.forEach(function(link) {
            link.addEventListener('touchstart', function() {
                this.style.opacity = '0.8';
            });
            
            link.addEventListener('touchend', function() {
                this.style.opacity = '1';
            });
        });
    }
    
    // Keyboard navigation support for accessibility
    socialLinks.forEach(function(link) {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Simple click tracking (console only)
    socialLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            console.log('Clicked on ' + platform + ' link');
        });
    });
});