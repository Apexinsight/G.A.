// ===== DOM Elements =====
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');
const newsletterForms = document.querySelectorAll('.newsletter form');
const faqItems = document.querySelectorAll('.faq-item');
const faqQuestions = document.querySelectorAll('.faq-question');

// ===== HAMBURGER MENU =====
hamburger?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks?.classList.remove('active');
        hamburger?.classList.remove('active');
    });
});

// ===== NAVBAR ANIMATION ON SCROLL =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
    }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    if (!current) {
        return;
    }

    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (!href || !href.startsWith('#')) {
            return;
        }

        item.classList.remove('active');
        if (href.slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
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

// ===== PROJECT FILTER =====
function applyProjectFilter(filterValue) {
    projectCards.forEach(card => {
        const isMatch = card.getAttribute('data-category') === filterValue;
        card.style.display = isMatch ? 'block' : 'none';
        card.style.opacity = isMatch ? '1' : '0';
        card.style.transform = isMatch ? 'scale(1)' : 'scale(0.9)';
    });
}

if (filterButtons.length && projectCards.length) {
    const activeFilterButton = document.querySelector('.filter-btn.active') || filterButtons[0];

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            applyProjectFilter(button.getAttribute('data-filter'));
        });
    });

    activeFilterButton.classList.add('active');
    applyProjectFilter(activeFilterButton.getAttribute('data-filter'));
}

// ===== CONTACT FORM HANDLING =====
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Preparing message...';
        submitBtn.disabled = true;

        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        const emailTarget = this.dataset.email || 'info@gaconsultants.co.ke';
        const emailCc = this.dataset.cc || '';
        const whatsappTarget = (this.dataset.whatsapp || '254733721855').replace(/[^\d]/g, '');

        if (!data.name || !data.email || !data.subject || !data.message || !data.privacy) {
            showFormMessage('Please fill in all required fields and accept the privacy checkbox.', 'error');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            return;
        }

        const subjectLabels = {
            'project-inquiry': 'Project Inquiry',
            'service-request': 'Service Request',
            partnership: 'Partnership Opportunity',
            feedback: 'Feedback',
            other: 'Other'
        };
        const serviceLabels = {
            civil: 'Civil Engineering',
            structural: 'Structural Engineering',
            transportation: 'Transportation Engineering',
            water: 'Water & Sanitation Engineering',
            'project-mgmt': 'Project Management',
            consulting: 'Consulting Services'
        };

        const formattedMessage = [
            'New website message for G.A. Consultants Ltd',
            '',
            `Name: ${data.name}`,
            `Email: ${data.email}`,
            `Phone: ${data.phone || 'Not provided'}`,
            `Company: ${data.company || 'Not provided'}`,
            `Subject: ${subjectLabels[data.subject] || data.subject}`,
            `Service: ${serviceLabels[data.service] || data.service || 'Not selected'}`,
            '',
            'Message:',
            data.message
        ].join('\n');

        const mailtoParams = new URLSearchParams({
            subject: `Website inquiry: ${subjectLabels[data.subject] || data.subject}`,
            body: formattedMessage
        });

        if (emailCc) {
            mailtoParams.set('cc', emailCc);
        }

        const mailtoUrl = `mailto:${emailTarget}?${mailtoParams.toString()}`;
        const whatsappUrl = `https://wa.me/${whatsappTarget}?text=${encodeURIComponent(formattedMessage)}`;

        window.open(whatsappUrl, '_blank', 'noopener');
        window.location.href = mailtoUrl;

        showFormMessage('Your email app and WhatsApp have been opened with the same message. Please press send in both windows to complete delivery.', 'success');

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Show form message
function showFormMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = `form-message ${type}`;
    }
}

// ===== NEWSLETTER HANDLING =====
newsletterForms.forEach(form => {
    form.addEventListener('submit', event => {
        event.preventDefault();
        const input = form.querySelector('input[type="email"]');
        const email = input?.value.trim();

        if (!email) {
            showToast('Please enter your email address.', 'error');
            return;
        }

        const target = 'info@gaconsultants.co.ke';
        const subject = encodeURIComponent('Newsletter subscription request');
        const body = encodeURIComponent(`Please add ${email} to the G.A. Consultants Ltd newsletter list.`);
        window.location.href = `mailto:${target}?subject=${subject}&body=${body}`;
        showToast('Your email app has opened to complete the subscription request.', 'success');
        form.reset();
    });
});

// ===== FAQ ACCORDION =====
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        
        // Close other open FAQs
        faqItems.forEach(item => {
            if (item !== faqItem && item.classList.contains('active')) {
                item.classList.remove('active');
            }
        });
        
        // Toggle current FAQ
        faqItem.classList.toggle('active');
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInScale 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll('.service-card, .project-card, .team-member, .cert-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// ===== NUMBER COUNTER ANIMATION =====
const statCards = document.querySelectorAll('.stat-card h3, .stat-item h3, .stat-box h4');

const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const finalValue = parseFloat(element.textContent);
            
            if (!isNaN(finalValue)) {
                let currentValue = 0;
                const increment = finalValue / 50;
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        element.textContent = element.textContent;
                        clearInterval(timer);
                    } else {
                        element.textContent = Math.ceil(currentValue) + (element.textContent.includes('+') ? '+' : '');
                    }
                }, 30);
            }
            
            counterObserver.unobserve(element);
        }
    });
}, { threshold: 0.5 });

statCards.forEach(card => counterObserver.observe(card));

// ===== PARALLAX EFFECT ON SCROLL =====
window.addEventListener('scroll', () => {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground && window.scrollY < 600) {
        heroBackground.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    }
});

// ===== ACTIVE PAGE INDICATOR =====
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Call on page load
window.addEventListener('load', highlightCurrentPage);

// ===== ADD LOADING STATE =====
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0.8';
});

// ===== MOBILE RESPONSIVE ADJUSTMENTS =====
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks?.classList.remove('active');
        hamburger?.classList.remove('active');
    }
});

// ===== SERVICES HOVER EFFECT =====
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== STAR RATING ANIMATION =====
document.querySelectorAll('.stars').forEach(stars => {
    const starElements = stars.querySelectorAll('i');
    starElements.forEach((star, index) => {
        star.style.animation = `fadeIn 0.3s ease ${index * 0.1}s forwards`;
        star.style.opacity = '0';
    });
});

// ===== TOAST NOTIFICATION FUNCTION =====
function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // Close menu on Escape
    if (e.key === 'Escape') {
        navLinks?.classList.remove('active');
        hamburger?.classList.remove('active');
    }
});

// ===== BACK TO TOP BUTTON =====
function createBackToTopButton() {
    const button = document.createElement('button');
    button.id = 'backToTop';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #ff8c00, #1a3a52);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 999;
        font-size: 20px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// Create back to top button on page load
document.addEventListener('DOMContentLoaded', createBackToTopButton);

// ===== ADD ANIMATION KEYFRAMES DYNAMICALLY =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// ===== PERFORMANCE OPTIMIZATION: LAZY LOAD IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ===== INIT =====
console.log('G.A. Consultants Ltd Website - JavaScript Loaded Successfully');
