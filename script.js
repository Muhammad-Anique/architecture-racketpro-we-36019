'use strict';

/**
 * RacketPro Web - Main Interaction Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    initContactForm();
    initTestimonialCarousel();
    initNavbarScroll();
});

/**
 * Mobile Navigation Toggle
 */
function initMobileMenu() {
    const navbar = document.querySelector('.navbar .container');
    const navLinks = document.querySelector('.nav-links');
    
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-toggle';
    menuBtn.innerHTML = '<span></span><span></span><span></span>';
    menuBtn.ariaLabel = 'Toggle Menu';
    
    // Minimal style for toggle
    Object.assign(menuBtn.style, {
        display: 'none',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        flexDirection: 'column',
        gap: '5px'
    });

    navbar.appendChild(menuBtn);

    const toggleMenu = () => {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('open');
    };

    menuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking links
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('open');
        });
    });
}

/**
 * Smooth Scrolling with Offset for Sticky Header
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(targetId);
            
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Lead Generation Form Logic
 * Handles validation and simulated submission to Supabase
 */
function initContactForm() {
    const contactForm = document.querySelector('#contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const formData = new FormData(contactForm);
        const payload = Object.fromEntries(formData.entries());

        // Basic Validation
        if (!payload.name || !payload.email || !payload.message) {
            alert('Please fill out all required fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(payload.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Submit State
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            // Simulated Supabase/API Call
            // In Next.js, this would be: await supabase.from('leads').insert([payload])
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            contactForm.innerHTML = `
                <div class="success-msg" style="text-align: center; padding: 2rem; background: #f1f5f9; border-radius: 8px;">
                    <h3 style="color: #0f172a; margin-bottom: 0.5rem;">Message Received!</h3>
                    <p>Thank you, ${payload.name}. Our pro stringing team will contact you shortly.</p>
                </div>
            `;
        } catch (error) {
            console.error('Submission error:', error);
            alert('Something went wrong. Please try again later.');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

/**
 * Simple Testimonials Fade Rotation (P1 Requirement)
 */
function init