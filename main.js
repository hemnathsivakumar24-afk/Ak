// Initialize Swiper.js
const swiper = new Swiper('.mySwiper', {
    loop: true,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    autoplay: {
        delay: 20000, // Updated to 20 seconds per user request
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

// Scroll Reveal Animation
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);

// Navbar Scroll Effect
window.addEventListener("scroll", function() {
    const header = document.getElementById("header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        mobileMenuBtn.classList.toggle("open");
    });
}

// Smooth Scroll for local links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offset = 80; // nav height
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = targetElement.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileMenuBtn) mobileMenuBtn.classList.remove('open');
            }
        }
    });
});

// Initial reveal call
reveal();

// Form Submission Simulation
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector("button");
        const originalText = btn.innerText;
        btn.innerText = "Sending...";
        btn.disabled = true;
        
        // Extract Data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subjectNode = document.getElementById('subject');
        const subject = subjectNode.options[subjectNode.selectedIndex].text;
        const message = document.getElementById('message').value;

        // WhatsApp Integration
        const whatsappNumber = "917358895609";
        const whatsappMessage = `*AK Robotic Contact Form*\n\n*Name:* ${name}\n*Email:* ${email}\n*Interest:* ${subject}\n*Message:* ${message}`;
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        // Email submission using Web3Forms
        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: "f761bcfa-0b21-4a11-b0dd-db53bc48d12d",
                subject: `New Website Inquiry from ${name} (${subject})`,
                name: name,
                email: email,
                service: subject,
                message: message,
                from_name: "AK Robotic Website"
            })
        })
        .then(response => response.json())
        .then(data => {
            window.open(whatsappUrl, '_blank');
            alert("Thank you! Your inquiry has been sent to AK Robotic. We will contact you shortly.");
            contactForm.reset();
            btn.innerText = originalText;
            btn.disabled = false;
        })
        .catch(error => {
            console.log("Email fallback, opening WhatsApp");
            window.open(whatsappUrl, '_blank');
            alert("Thank you! Your inquiry has been sent. We will contact you shortly.");
            contactForm.reset();
            btn.innerText = originalText;
            btn.disabled = false;
        });
    });
}

// Appointment Booking Logic
const floatingBookBtn = document.getElementById('floating-book-btn');
const bookingModal = document.getElementById('booking-modal');
const closeModalBtn = document.querySelector('.close-modal');
const closeSuccessBtn = document.querySelector('.close-success-btn');
const bookingForm = document.getElementById('booking-form');
const bookingSuccess = document.getElementById('booking-success');
const serviceSelect = document.getElementById('book-service');
const serviceButtons = document.querySelectorAll('.btn-book-service');

// Open modal function
function openModal(serviceValue = null) {
    if (bookingModal) {
        // Reset view state
        bookingForm.classList.remove('hidden');
        bookingSuccess.classList.add('hidden');
        bookingForm.reset();
        
        // Auto-select service if passed
        if (serviceValue) {
            const optionExists = Array.from(serviceSelect.options).some(opt => opt.value === serviceValue);
            if (optionExists) {
                serviceSelect.value = serviceValue;
            }
        }
        
        bookingModal.showModal();
        document.body.style.overflow = 'hidden'; // prevent bg scroll
    }
}

// Close modal function
function closeModal() {
    if (bookingModal) {
        bookingModal.close();
        document.body.style.overflow = ''; // restore bg scroll
    }
}

// Event Listeners for opening modal
if (floatingBookBtn) {
    floatingBookBtn.addEventListener('click', () => openModal());
}

serviceButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const serviceId = e.target.getAttribute('data-service');
        openModal(serviceId);
    });
});

// Event Listeners for closing modal
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', closeModal);
}

if (bookingModal) {
    // Close when clicking outside of modal content
    bookingModal.addEventListener('click', (e) => {
        const dialogDimensions = bookingModal.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            closeModal();
        }
    });
}

// Appointment Form Submission
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        
        submitBtn.innerText = "Confirming...";
        submitBtn.disabled = true;
        
        // Form Data Extraction
        const serviceNode = document.getElementById('book-service');
        const service = serviceNode.options[serviceNode.selectedIndex].text;
        const date = document.getElementById('book-date').value;
        const time = document.getElementById('book-time').value;
        const name = document.getElementById('book-name').value;
        const phone = document.getElementById('book-contact').value;

        // WhatsApp Generation
        const whatsappNumber = "917358895609";
        const whatsappMessage = `Hello AK Robotic!\n\nI would like to book an appointment.\n*Name:* ${name}\n*Phone:* ${phone}\n*Service:* ${service}\n*Date:* ${date}\n*Time:* ${time}`;
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        // Email submission using Web3Forms
        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: "f761bcfa-0b21-4a11-b0dd-db53bc48d12d",
                subject: `New Appointment Booking from ${name}`,
                name: name,
                phone: phone,
                service: service,
                date: date,
                time: time,
                message: `Service: ${service}\nDate: ${date}\nTime: ${time}\nPhone: ${phone}`,
                from_name: "AK Robotic Bookings"
            })
        })
        .then(response => response.json())
        .then(data => {
            // Open WhatsApp immediately after triggering email
            window.open(whatsappUrl, '_blank');
            
            // Show success modal
            bookingForm.classList.add('hidden');
            bookingSuccess.classList.remove('hidden');
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        })
        .catch(error => {
            console.log("Email fallback, opening WhatsApp.");
            window.open(whatsappUrl, '_blank');
            bookingForm.classList.add('hidden');
            bookingSuccess.classList.remove('hidden');
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        });
    });
}

// ===== Case Study Lightbox =====
const csModal = document.getElementById('case-study-modal');
const csCloseBtn = document.querySelector('.case-close-btn');

// Animated counter function
function animateCounter(element, target, suffix, duration = 1500) {
    const isDecimal = String(target).includes('.');
    let start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * target;
        
        element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = isDecimal ? target.toFixed(1) : target;
        }
    }
    requestAnimationFrame(update);
}

// Click handler for project cards
document.querySelectorAll('.project-card[data-title]').forEach(card => {
    card.addEventListener('click', () => {
        // Populate modal
        document.getElementById('cs-image').src = card.dataset.img;
        document.getElementById('cs-tag').textContent = card.dataset.tag;
        document.getElementById('cs-title').textContent = card.dataset.title;
        document.getElementById('cs-desc').textContent = card.dataset.desc;
        
        // Set suffixes and labels
        document.getElementById('cs-suffix1').textContent = card.dataset.suffix1;
        document.getElementById('cs-suffix2').textContent = card.dataset.suffix2;
        document.getElementById('cs-suffix3').textContent = card.dataset.suffix3;
        document.getElementById('cs-label1').textContent = card.dataset.label1;
        document.getElementById('cs-label2').textContent = card.dataset.label2;
        document.getElementById('cs-label3').textContent = card.dataset.label3;
        
        // Reset counters to 0
        document.getElementById('cs-stat1').textContent = '0';
        document.getElementById('cs-stat2').textContent = '0';
        document.getElementById('cs-stat3').textContent = '0';
        
        // Open modal
        csModal.showModal();
        document.body.style.overflow = 'hidden';
        
        // Start counter animations after a tiny delay for visual effect
        setTimeout(() => {
            animateCounter(document.getElementById('cs-stat1'), parseFloat(card.dataset.stat1), card.dataset.suffix1);
            animateCounter(document.getElementById('cs-stat2'), parseFloat(card.dataset.stat2), card.dataset.suffix2, 1800);
            animateCounter(document.getElementById('cs-stat3'), parseFloat(card.dataset.stat3), card.dataset.suffix3, 2000);
        }, 300);
    });
});

// Close handlers
if (csCloseBtn) {
    csCloseBtn.addEventListener('click', () => {
        csModal.close();
        document.body.style.overflow = '';
    });
}

if (csModal) {
    csModal.addEventListener('click', (e) => {
        if (e.target === csModal) {
            csModal.close();
            document.body.style.overflow = '';
        }
    });
}

// ===== Command Center Enhancements =====

// 1. Preloader Removal - Ultra Fast Strategy
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader && preloader.style.opacity !== '0') {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.visibility = 'hidden';
            initHeroTyping();
        }, 300);
    }
}

// Hide when DOM is ready (don't wait for images)
window.addEventListener('DOMContentLoaded', hidePreloader);

// Fail-safe: Always hide after 2 seconds max
setTimeout(hidePreloader, 2000);

// Force Play Videos on Mobile (Bypass Autoplay Blocks)
document.addEventListener('touchstart', function() {
    const videos = document.querySelectorAll('.hero-video');
    videos.forEach(video => {
        if (video.paused) {
            video.play().catch(e => console.log("Video play pending interaction"));
        }
    });
}, { once: true });



// 2. Hero Typing Animation
function initHeroTyping() {
    const heroH1 = document.querySelector('.swiper-slide-active .text-gradient');
    if (!heroH1) return;
    
    // We can expand this with more complex typing logic if needed
    // For now, let's add a pulse effect to the ticker colors
    setInterval(() => {
        const dots = document.querySelectorAll('.ticker-dot');
        dots.forEach(dot => {
            dot.style.transform = 'scale(1.2)';
            setTimeout(() => dot.style.transform = 'scale(1)', 500);
        });
    }, 3000);
}

// 3. Status Ticker Dynamic Content (Optional extra polish)
// Adding a small visual indicator for the swipeable sections on mobile
const swipeSections = document.querySelectorAll('.project-grid, .enterprise-services-grid');
if (window.innerWidth < 768) {
    swipeSections.forEach(section => {
        const hint = document.createElement('div');
        hint.className = 'swipe-hint';
        hint.innerHTML = '<span>Swipe to explore →</span>';
        hint.style.cssText = 'text-align: center; font-size: 12px; color: var(--accent); margin-top: -20px; margin-bottom: 20px; font-weight: 600; opacity: 0.7; transition: opacity 0.5s;';
        section.parentNode.insertBefore(hint, section.nextSibling);
    });
}

// 4. Auto-Swipe Logic (Every 20 seconds) - Projects & Services
if (typeof swipeSections !== 'undefined' && swipeSections.length > 0) {
    setInterval(() => {
        swipeSections.forEach(section => {
            if (!section) return;
            
            const cardWidth = section.querySelector('.enterprise-card, .project-card')?.offsetWidth + 20 || 300;
            const currentScroll = section.scrollLeft;
            const maxScroll = section.scrollWidth - section.clientWidth;
            
            if (currentScroll >= maxScroll - 10) {
                // Return to start
                section.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                // Move to next card
                section.scrollTo({ left: currentScroll + cardWidth, behavior: 'smooth' });
            }
        });
    }, 20000); // 20 Seconds
}

// 5. Global Kiosk Mode (Auto-Scroll Loop) - 10s Smart Idle Detection
const sections = ['home', 'about', 'services', 'portfolio', 'contact'];
let currentSectionIndex = 0;
let lastInteractionTime = Date.now();
let isUserTouching = false;

// Reset idle timer on any user interaction
const resetIdleTimer = () => {
    lastInteractionTime = Date.now();
};

window.addEventListener('wheel', resetIdleTimer);
window.addEventListener('touchstart', () => { isUserTouching = true; resetIdleTimer(); });
window.addEventListener('touchmove', resetIdleTimer);
window.addEventListener('touchend', () => { isUserTouching = false; resetIdleTimer(); });
window.addEventListener('scroll', resetIdleTimer);
window.addEventListener('click', resetIdleTimer);

setInterval(() => {
    // Only scroll if idle for 10s AND user is not currently touching the screen
    const isIdle = (Date.now() - lastInteractionTime) > 10000; 
    
    if (isIdle && !isUserTouching) {
        currentSectionIndex = (currentSectionIndex + 1) % sections.length;
        const targetId = sections[currentSectionIndex];
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const offset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
}, 10000); // Updated to 10 Seconds

