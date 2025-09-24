// Mobile menu functionality
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Newsletter form submission
const newsletterForm = document.querySelector('form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        if (emailInput.value) {
            // Here you would typically send this to your backend
            alert('Thank you for subscribing! We\'ll be in touch soon.');
            emailInput.value = '';
        }
    });
}

// Add animation classes on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animate-fadeIn');
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
});

// Form validation for contact form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const name = contactForm.querySelector('input[name="name"]')?.value;
        const email = contactForm.querySelector('input[name="email"]')?.value;
        const message = contactForm.querySelector('textarea[name="message"]')?.value;
        
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Here you would typically send this to your backend
        alert('Thank you for your message! We\'ll get back to you soon.');
        contactForm.reset();
    });
}

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Portfolio Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('[class*="px-6 py-2"]');
    const portfolioCards = document.querySelectorAll('[class*="bg-white rounded-lg"]');
    
    // Add data attributes to cards for filtering
    portfolioCards.forEach((card, index) => {
        const cardText = card.querySelector('.text-blue-600.font-semibold')?.textContent.toLowerCase();
        
        // Set filter categories based on card content
        switch(index) {
            case 0: // SEO card
                card.setAttribute('data-category', 'seo');
                break;
            case 1: // Marketing Automation
                card.setAttribute('data-category', 'marketing');
                break;
            case 2: // AI Solutions
                card.setAttribute('data-category', 'ai-solutions');
                break;
            case 3: // Web Development
                card.setAttribute('data-category', 'web-development');
                break;
            case 4: // SEO & Content
                card.setAttribute('data-category', 'seo');
                break;
            case 5: // Marketing
                card.setAttribute('data-category', 'marketing');
                break;
        }
    });
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-blue-600', 'text-white');
                btn.classList.add('bg-white', 'text-blue-600');
            });
            
            // Add active class to clicked button
            this.classList.remove('bg-white', 'text-blue-600');
            this.classList.add('bg-blue-600', 'text-white');
            
            const filterText = this.textContent.toLowerCase().trim();
            
            // Show all cards if "All" is clicked
            if (filterText === 'all') {
                portfolioCards.forEach(card => {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                });
                return;
            }
            
            // Filter cards based on category
            portfolioCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                let shouldShow = false;
                
                // Check if card matches the filter
                switch(filterText) {
                    case 'seo':
                        shouldShow = cardCategory === 'seo';
                        break;
                    case 'marketing':
                        shouldShow = cardCategory === 'marketing';
                        break;
                    case 'ai solutions':
                        shouldShow = cardCategory === 'ai-solutions';
                        break;
                    case 'web development':
                        shouldShow = cardCategory === 'web-development';
                        break;
                }
                
                // Show/hide card with animation
                if (shouldShow) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Add CSS transitions for smooth animations
    portfolioCards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
});