// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');
const contactForm = document.getElementById('contactForm');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Animate hamburger
    const hamburgers = navToggle.querySelectorAll('.hamburger');
    hamburgers.forEach((hamburger, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) hamburger.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) hamburger.style.opacity = '0';
            if (index === 2) hamburger.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            hamburger.style.transform = 'none';
            hamburger.style.opacity = '1';
        }
    });
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // Only close menu on mobile devices
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            // Reset hamburger
            const hamburgers = navToggle.querySelectorAll('.hamburger');
            hamburgers.forEach(hamburger => {
                hamburger.style.transform = 'none';
                hamburger.style.opacity = '1';
            });
        }
    });
});

// Simple navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 40px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    }
});

// Close mobile menu on window resize to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        
        // Reset hamburger
        const hamburgers = navToggle.querySelectorAll('.hamburger');
        hamburgers.forEach(hamburger => {
            hamburger.style.transform = 'none';
            hamburger.style.opacity = '1';
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Simple intersection observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .service-card, .industry-item, .contact-item, .stat-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(el);
    });
});

// Counter animation for statistics
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                const displayValue = Math.floor(current);
                
                // Add + or other suffixes
                if (counter.textContent.includes('+')) {
                    if (displayValue >= 1000) {
                        counter.textContent = displayValue.toLocaleString() + '+';
                    } else {
                        counter.textContent = displayValue + '+';
                    }
                } else if (counter.textContent.includes('Years')) {
                    counter.textContent = displayValue + '+';
                } else {
                    counter.textContent = displayValue;
                }
                
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = counter.textContent;
            }
        };
        
        updateCounter();
    });
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Form validation and submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.email || !data.message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!isValidEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Thank you for your message! We will get back to you soon.', 'success');
    contactForm.reset();
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        backdrop-filter: blur(10px);
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 500;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Optimized parallax effect for hero section
let heroParallaxAnimating = false;
let heroCurrentScroll = 0;
let heroTargetScroll = 0;
let heroParallaxTimeout;

function updateHeroParallax() {
    heroCurrentScroll += (heroTargetScroll - heroCurrentScroll) * 0.1;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const rate = heroCurrentScroll * -0.2; // Reduced intensity for better performance
        hero.style.transform = `translateY(${rate}px)`;
    }
    
    if (Math.abs(heroTargetScroll - heroCurrentScroll) > 0.5) {
        requestAnimationFrame(updateHeroParallax);
    } else {
        heroParallaxAnimating = false;
    }
}

// Throttled scroll handler for parallax
window.addEventListener('scroll', () => {
    if (heroParallaxTimeout) return;
    
    heroParallaxTimeout = setTimeout(() => {
        heroTargetScroll = window.pageYOffset;
        
        if (!heroParallaxAnimating) {
            heroParallaxAnimating = true;
            requestAnimationFrame(updateHeroParallax);
        }
        heroParallaxTimeout = null;
    }, 16); // ~60fps
}, { passive: true });


// Optimized hover effects for cards - using CSS only for better performance
document.addEventListener('DOMContentLoaded', () => {
    // Remove unnecessary JavaScript hover handlers - let CSS handle hover effects
    // This improves performance by reducing JavaScript event listeners
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transform = 'scale(1)';
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add loading styles
    document.body.style.opacity = '0';
    document.body.style.transform = 'scale(0.95)';
    document.body.style.transition = 'all 0.8s ease';
    
    // Add scroll indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = '<i class="fas fa-chevron-down"></i>';
    scrollIndicator.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        color: #00d4ff;
        font-size: 24px;
        animation: bounce 2s infinite;
        z-index: 1000;
        cursor: pointer;
    `;
    
    // Add optimized bounce animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(-8px); }
        }
        .scroll-indicator {
            will-change: transform;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(scrollIndicator);
    
    // Optimized scroll indicator handler
    let scrollIndicatorTimeout;
    window.addEventListener('scroll', () => {
        if (scrollIndicatorTimeout) return;
        
        scrollIndicatorTimeout = setTimeout(() => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
            }
            scrollIndicatorTimeout = null;
        }, 16);
    }, { passive: true });
    
    // Scroll to next section on click
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Performance optimization: Improved throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Remove duplicate scroll listeners - already handled above with specific optimizations

// Theme Toggle Functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;
    
    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('themeIcon');
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-moon';
    } else {
        themeIcon.className = 'fas fa-sun';
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeThemeToggle();
});