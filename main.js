// Initialize Swiper.js
const swiper = new Swiper('.mySwiper', {
    loop: true,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
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
        
        setTimeout(() => {
            alert("Thank you! Your message has been sent to AK Robotic. We will contact you shortly.");
            contactForm.reset();
            btn.innerText = originalText;
            btn.disabled = false;
        }, 1500);
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
        
        // Simulate network request
        setTimeout(() => {
            bookingForm.classList.add('hidden');
            bookingSuccess.classList.remove('hidden');
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }, 1200);
    });
}
