// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    // Toggle active state for menu icon
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when a link is clicked
const navItems = document.querySelectorAll('.nav-link');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.style.display = 'none';
        mobileMenuBtn.classList.remove('active');
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.04)';
    }
});

// Intersection Observer for fade-in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply observer to elements that should fade in
const fadeInElements = document.querySelectorAll(
    '.portfolio-item, .service-card, .testimonial-card, .process-step'
);

fadeInElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease-out';
    observer.observe(element);
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        // Simulate server response delay
        setTimeout(() => {
            submitBtn.textContent = '✓ Message envoyé !';
            submitBtn.style.background = '#7CB342';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }, 1500);
        
        // Log form data (in production, this would be sent to a server)
        console.log('Form submitted with data:', data);
    });
}

// Smooth scroll enhancement for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Portfolio filter (optional enhancement)
const portfolioItems = document.querySelectorAll('.portfolio-item');

// Add click handlers for future filtering capability
portfolioItems.forEach(item => {
    item.addEventListener('click', function() {
        // Could add modal functionality here
        console.log('Category:', this.dataset.category);
    });
});

// Counter animation for statistics
const animateCounters = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalValue = element.textContent.replace(/\D/g, '');
                const duration = 2000;
                const increment = finalValue / (duration / 16);
                
                let current = 0;
                const counter = setInterval(() => {
                    current += increment;
                    if (current >= finalValue) {
                        element.textContent = element.textContent.replace(/\d+/, finalValue);
                        clearInterval(counter);
                    } else {
                        element.textContent = element.textContent.replace(/\d+/, Math.floor(current));
                    }
                }, 16);
                
                counterObserver.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(number => counterObserver.observe(number));
};

// Call counter animation when page loads
window.addEventListener('load', animateCounters);

// Parallax effect for hero section
const heroImage = document.querySelector('.hero-image');

window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
        const scrollPosition = window.scrollY;
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    }
});

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.style.color = 'var(--primary-light)';
        } else {
            item.style.color = '';
        }
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Prevent flash of unstyled content
document.documentElement.style.opacity = '0';
document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.style.opacity = '1';
    document.documentElement.style.transition = 'opacity 0.3s ease';
});

// Service card click with ripple effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(124, 179, 66, 0.6)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to stylesheet dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            width: 20px;
            height: 20px;
            opacity: 1;
        }
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
