// Personal Brand Website - GitHub Pages Compatible with Dark/Light Mode
document.addEventListener('DOMContentLoaded', function() {
    
    // Theme Management
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;
    
    // Get user's location and calculate sunset time
    function getSunsetTime(lat, lng, date = new Date()) {
        // Simplified sunset calculation using sunrise-equation
        const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
        const P = Math.asin(0.39795 * Math.cos(0.98563 * (dayOfYear - 173) * Math.PI/180));
        const argument = (Math.sin(-0.83 * Math.PI/180) - Math.sin(lat * Math.PI/180) * Math.sin(P)) / (Math.cos(lat * Math.PI/180) * Math.cos(P));
        
        if (argument < -1 || argument > 1) {
            // Polar day or night
            return null;
        }
        
        const hourAngle = Math.acos(argument);
        const decimalHours = 12 + hourAngle * 180 / Math.PI / 15 + lng / 15;
        
        const hours = Math.floor(decimalHours);
        const minutes = Math.floor((decimalHours - hours) * 60);
        
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes);
    }
    
    // Determine initial theme based on time and location
    function determineInitialTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        
        // Try to get user's location
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    const now = new Date();
                    const sunset = getSunsetTime(lat, lng, now);
                    
                    if (sunset && now > sunset) {
                        setTheme('dark');
                    } else {
                        setTheme('light');
                    }
                },
                function(error) {
                    // Fallback to time-based detection (assume sunset at 6 PM)
                    const hour = new Date().getHours();
                    setTheme(hour >= 18 || hour < 6 ? 'dark' : 'light');
                }
            );
        } else {
            // Fallback to time-based detection
            const hour = new Date().getHours();
            setTheme(hour >= 18 || hour < 6 ? 'dark' : 'light');
        }
        
        // Return default for immediate application
        const hour = new Date().getHours();
        return hour >= 18 || hour < 6 ? 'dark' : 'light';
    }
    
    // Set theme function
    function setTheme(theme) {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            themeIcon.className = 'fas fa-moon';
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }
    }
    
    // Toggle theme function
    function toggleTheme() {
        const currentTheme = body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }
    
    // Initialize theme
    const initialTheme = determineInitialTheme();
    setTheme(initialTheme);
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', toggleTheme);
    
    // Keyboard support for theme toggle
    themeToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTheme();
        }
    });
    
    // Smooth parallax effect for circuit background (no rotation)
    document.addEventListener('mousemove', function(e) {
        const bg = document.querySelector('.bg-animation');
        if (bg) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const x = (mouseX - 0.5) * 15;
            const y = (mouseY - 0.5) * 15;
            
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
    
    // Auto-update theme based on time (check every hour)
    setInterval(function() {
        const savedTheme = localStorage.getItem('theme');
        if (!savedTheme) {
            // Only auto-update if user hasn't manually set a preference
            determineInitialTheme();
        }
    }, 3600000); // 1 hour
});