/**
 * Ala Dapoer Adem - Main JavaScript
 * Handles interactive functionality for the website
 */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initScrollToTop();
    initFeedbackForm();
    initSmoothScroll();
    initNavbarTransition();
});

/**
 * Scroll to Top Button Functionality
 */
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (!scrollTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    // Scroll to top on click
    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Feedback Form Handler
 */
function initFeedbackForm() {
    const feedbackForm = document.getElementById('feedbackForm');

    if (!feedbackForm) return;

    feedbackForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const name = formData.get('name');
        const message = formData.get('message');

        // Simple validation
        if (!name || !message) {
            showAlert('Mohon isi semua field!', 'warning');
            return;
        }

        // Simulate form submission (replace with actual API call)
        console.log('Feedback submitted:', { name, message });

        // Show success message
        showAlert('Terima kasih! Saran & masukan Anda telah diterima.', 'success');

        // Reset form
        this.reset();
    });
}

/**
 * Smooth Scroll for Internal Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Navbar Background Transition on Scroll
 */
function initNavbarTransition() {
    const navbar = document.querySelector('.navbar');

    if (!navbar) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/**
 * Show Alert Message
 * @param {string} message - Alert message
 * @param {string} type - Alert type (success, warning, danger, info)
 */
function showAlert(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 80px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alertDiv);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

/**
 * Animation on Scroll Observer
 */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
}

/**
 * Recipe Search Functionality (for future use)
 */
function searchRecipes(query) {
    const recipeCards = document.querySelectorAll('.recipe-card');
    const searchTerm = query.toLowerCase();

    recipeCards.forEach(card => {
        const recipeName = card.querySelector('.recipe-link').textContent.toLowerCase();

        if (recipeName.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

/**
 * Loading Animation for Images
 */
function initImageLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Export functions for external use
window.AlaDapoerAdem = {
    showAlert,
    searchRecipes
};
