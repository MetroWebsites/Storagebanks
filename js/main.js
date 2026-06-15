// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu nav a');

    // Open mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('open');
        });
    }

    // Close mobile menu
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    }

    // Close mobile menu when clicking a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.remove('open');
        }
    });
});

// Form Handler - Opens email client with filled form data
function handleFormSubmit(event, recipientEmail) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Build email subject
    const subject = formData.get('subject') || 'Storage Banks Contact Form';
    
    // Build email body with all form data
    let emailBody = 'Contact Form Submission from Storage Banks Website\n';
    emailBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
    
    // Add all form fields to email body
    for (let [key, value] of formData.entries()) {
        if (key !== 'subject' && value) {
            // Format field name (capitalize first letter, replace underscores/hyphens with spaces)
            const fieldName = key.charAt(0).toUpperCase() + key.slice(1).replace(/[_-]/g, ' ');
            emailBody += `${fieldName}: ${value}\n\n`;
        }
    }
    
    emailBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    emailBody += `Submitted on: ${new Date().toLocaleString()}\n`;
    emailBody += 'From: www.storagebanks.com';
    
    // Encode for mailto link
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(emailBody);
    
    // Create mailto link
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodedSubject}&body=${encodedBody}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Reset form after short delay
    setTimeout(() => {
        form.reset();
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.textContent = 'Your email client has opened with the form filled out. Please send the email to complete your submission.';
        successMsg.style.cssText = 'background: #d4edda; color: #155724; padding: 1rem; border-radius: 5px; margin-top: 1rem; text-align: center;';
        form.parentElement.appendChild(successMsg);
        setTimeout(() => successMsg.remove(), 10000);
    }, 500);
}

// Attach form handlers to all forms on page load
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => handleFormSubmit(e, 'storagebanksllc@gmail.com'));
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});
