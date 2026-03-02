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
    initRecipeSearchFilter();
    initRatingSystem();
    initViewCounter();
    initContactFormValidation();
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
 * Recipe Search and Filter Functionality
 */
function initRecipeSearchFilter() {
    const searchInput = document.getElementById('recipeSearch');
    const categoryFilter = document.getElementById('filterCategory');
    const timeFilter = document.getElementById('filterTime');
    const resetButton = document.getElementById('resetFilters');
    const recipeCount = document.getElementById('recipeCount');
    const totalRecipes = document.getElementById('totalRecipes');
    
    if (!searchInput || !categoryFilter || !timeFilter) return;
    
    // Get all recipe cards
    const allRecipes = document.querySelectorAll('[data-category]');
    const total = allRecipes.length;
    
    if (totalRecipes) totalRecipes.textContent = total;
    
    // Filter function
    function filterRecipes() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const category = categoryFilter.value;
        const time = timeFilter.value;
        let visibleCount = 0;
        
        allRecipes.forEach(recipe => {
            const recipeCard = recipe.querySelector('.recipe-card');
            const recipeTitle = recipeCard.querySelector('.recipe-title').textContent.toLowerCase();
            const recipeCategory = recipe.getAttribute('data-category');
            const recipeTime = recipe.getAttribute('data-time');
            
            // Check search match
            const matchesSearch = searchTerm === '' || recipeTitle.includes(searchTerm);
            
            // Check category match
            const matchesCategory = category === 'all' || recipeCategory === category;
            
            // Check time match
            const matchesTime = time === 'all' || recipeTime === time;
            
            // Show/hide based on filters
            if (matchesSearch && matchesCategory && matchesTime) {
                recipe.style.display = 'block';
                recipeCard.style.opacity = '1';
                recipeCard.style.transform = 'scale(1)';
                visibleCount++;
            } else {
                recipe.style.display = 'none';
                recipeCard.style.opacity = '0';
                recipeCard.style.transform = 'scale(0.8)';
            }
        });
        
        // Update count
        if (recipeCount) recipeCount.textContent = visibleCount;
        
        // Show no results message
        const existingMessage = document.querySelector('.no-results-message');
        if (existingMessage) existingMessage.remove();
        
        if (visibleCount === 0) {
            const message = document.createElement('div');
            message.className = 'no-results-message text-center py-5';
            message.innerHTML = `
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h4 class="text-muted">Tidak ada resep yang ditemukan</h4>
                <p class="text-muted">Coba ubah filter atau kata kunci pencarian Anda</p>
            `;
            document.getElementById('recipes').appendChild(message);
        }
    }
    
    // Event listeners
    searchInput.addEventListener('input', filterRecipes);
    categoryFilter.addEventListener('change', filterRecipes);
    timeFilter.addEventListener('change', filterRecipes);
    
    // Reset button
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            searchInput.value = '';
            categoryFilter.value = 'all';
            timeFilter.value = 'all';
            filterRecipes();
            searchInput.focus();
        });
    }
    
    // Initial count
    filterRecipes();
}

// Export functions for external use
window.AlaDapoerAdem = {
    showAlert,
    searchRecipes,
    printRecipe,
    downloadRecipePDF
};

/**
 * Print Recipe
 */
function printRecipe() {
    window.print();
}

/**
 * Download Recipe as PDF (using browser's print to PDF)
 */
function downloadRecipePDF() {
    const message = `
To save this recipe as PDF:

1. Click the Print button (or press Ctrl+P / Cmd+P)
2. Select "Save as PDF" as the destination
3. Click "Save" and choose your location
    `;
    showAlert(message.replace(/\n/g, '<br>'), 'info');
    setTimeout(() => window.print(), 2000);
}

/**
 * Rating & Review System
 */
function initRatingSystem() {
    const ratingForm = document.getElementById('ratingForm');
    if (!ratingForm) return;
    
    const recipeName = getRecipeNameFromURL();
    
    // Load existing reviews
    loadReviews(recipeName);
    
    // Handle form submission
    ratingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get rating value
        const ratingInput = document.querySelector('input[name="rating"]:checked');
        if (!ratingInput) {
            showAlert('Silakan pilih rating bintang!', 'warning');
            return;
        }
        
        const rating = parseInt(ratingInput.value);
        const name = document.getElementById('reviewerName').value.trim();
        const comment = document.getElementById('reviewComment').value.trim();
        
        if (!name || !comment) {
            showAlert('Mohon lengkapi nama dan komentar!', 'warning');
            return;
        }
        
        // Create review object
        const review = {
            id: Date.now(),
            recipe: recipeName,
            name: name,
            rating: rating,
            comment: comment,
            date: new Date().toISOString(),
            helpful: 0
        };
        
        // Save review
        saveReview(review);
        
        // Update UI
        loadReviews(recipeName);
        updateRatingSummary(recipeName);
        
        // Reset form
        ratingForm.reset();
        showAlert('Terima kasih! Ulasan Anda telah berhasil dikirim.', 'success');
    });
    
    // Update rating summary
    updateRatingSummary(recipeName);
}

/**
 * Get recipe name from URL
 */
function getRecipeNameFromURL() {
    const path = window.location.pathname;
    const fileName = path.split('/').pop();
    return fileName.replace('.html', '');
}

/**
 * Save review to localStorage
 */
function saveReview(review) {
    const reviews = getReviews();
    reviews.push(review);
    localStorage.setItem('recipeReviews', JSON.stringify(reviews));
}

/**
 * Get all reviews from localStorage
 */
function getReviews() {
    const reviews = localStorage.getItem('recipeReviews');
    return reviews ? JSON.parse(reviews) : [];
}

/**
 * Get reviews for specific recipe
 */
function getRecipeReviews(recipeName) {
    const allReviews = getReviews();
    return allReviews.filter(r => r.recipe === recipeName);
}

/**
 * Load and display reviews
 */
function loadReviews(recipeName) {
    const reviewsList = document.getElementById('reviewsList');
    const noReviews = document.getElementById('noReviews');
    const reviewCount = document.getElementById('reviewCount');
    
    if (!reviewsList) return;
    
    const reviews = getRecipeReviews(recipeName);
    
    if (reviewCount) {
        reviewCount.textContent = reviews.length;
    }
    
    if (reviews.length === 0) {
        if (noReviews) noReviews.style.display = 'block';
        reviewsList.innerHTML = '';
        return;
    }
    
    if (noReviews) noReviews.style.display = 'none';
    
    // Sort by newest first
    reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    reviewsList.innerHTML = reviews.map(review => createReviewCard(review)).join('');
    
    // Add helpful button event listeners
    document.querySelectorAll('.btn-helpful').forEach(btn => {
        btn.addEventListener('click', function() {
            const reviewId = parseInt(this.dataset.reviewId);
            toggleHelpful(reviewId, this);
        });
    });
}

/**
 * Create review card HTML
 */
function createReviewCard(review) {
    const date = new Date(review.date);
    const formattedDate = date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const initials = review.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    
    const stars = Array(5).fill(0).map((_, i) => 
        i < review.rating ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>'
    ).join('');
    
    return `
        <div class="review-card fade-in" data-review-id="${review.id}">
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar" aria-hidden="true">${initials}</div>
                    <div>
                        <div class="reviewer-name">${escapeHtml(review.name)}</div>
                        <div class="review-date">${formattedDate}</div>
                    </div>
                </div>
                <div class="review-stars" aria-label="Rating: ${review} dari 5 bintang">
                    ${stars}
                </div>
            </div>
            <p class="review-comment">${escapeHtml(review.comment)}</p>
            <div class="review-helpful">
                <button class="btn-helpful" data-review-id="${review.id}" aria-label="Tandai ulasan ini membantu">
                    <i class="far fa-thumbs-up me-1" aria-hidden="true"></i>
                    <span class="helpful-count">${review.helpful || 0}</span> Orang merasa ini membantu
                </button>
            </div>
        </div>
    `;
}

/**
 * Toggle helpful vote
 */
function toggleHelpful(reviewId, btn) {
    const reviews = getReviews();
    const reviewIndex = reviews.findIndex(r => r.id === reviewId);
    
    if (reviewIndex === -1) return;
    
    // Check if already voted (using sessionStorage)
    const votedReviews = JSON.parse(sessionStorage.getItem('votedReviews') || '[]');
    
    if (votedReviews.includes(reviewId)) {
        // Remove vote
        reviews[reviewIndex].helpful = (reviews[reviewIndex].helpful || 0) - 1;
        btn.classList.remove('active');
        votedReviews.splice(votedReviews.indexOf(reviewId), 1);
    } else {
        // Add vote
        reviews[reviewIndex].helpful = (reviews[reviewIndex].helpful || 0) + 1;
        btn.classList.add('active');
        votedReviews.push(reviewId);
    }
    
    // Save updates
    localStorage.setItem('recipeReviews', JSON.stringify(reviews));
    sessionStorage.setItem('votedReviews', JSON.stringify(votedReviews));
    
    // Update button count
    const countSpan = btn.querySelector('.helpful-count');
    if (countSpan) {
        countSpan.textContent = reviews[reviewIndex].helpful;
    }
}

/**
 * Update rating summary
 */
function updateRatingSummary(recipeName) {
    const reviews = getRecipeReviews(recipeName);
    
    if (reviews.length === 0) {
        return;
    }
    
    // Calculate average
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    const average = (total / reviews.length).toFixed(1);
    
    // Count each rating
    const counts = [0, 0, 0, 0, 0, 0]; // 0-5 stars
    reviews.forEach(r => counts[r.rating]++);
    
    // Update average display
    const avgElement = document.getElementById('averageRating');
    const totalElement = document.getElementById('totalRatings');
    
    if (avgElement) avgElement.textContent = average;
    if (totalElement) totalElement.textContent = reviews.length;
    
    // Update rating bars
    const maxCount = Math.max(...counts.slice(1));
    const bars = document.querySelectorAll('.rating-bar-item');
    
    bars.forEach((bar, index) => {
        const rating = 5 - index;
        const count = counts[rating];
        const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
        const progressBar = bar.querySelector('.progress-bar');
        const countSpan = bar.querySelector('.rating-count');
        
        if (progressBar) progressBar.style.width = percentage + '%';
        if (countSpan) countSpan.textContent = count;
    });
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * View Counter
 */
function initViewCounter() {
    const viewCountElement = document.getElementById('viewCount');
    if (!viewCountElement) return;
    
    const recipeName = getRecipeNameFromURL();
    const storageKey = `recipeViews_${recipeName}`;
    
    // Get current views
    let views = parseInt(localStorage.getItem(storageKey) || '0');
    
    // Check if this is a new visit (not refresh)
    const hasViewed = sessionStorage.getItem(`viewed_${recipeName}`);
    
    if (!hasViewed) {
        views++;
        localStorage.setItem(storageKey, views.toString());
        sessionStorage.setItem(`viewed_${recipeName}`, 'true');
    }
    
    // Display with formatting
    viewCountElement.textContent = views.toLocaleString('id-ID');
}

/**
 * Contact Form Validation
 */
function initContactFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('formSuccess');

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate single field
    const validateField = (field, rules) => {
        const value = field.value.trim();
        const errorDiv = document.getElementById(`${field.id}Error`);
        let error = '';

        // Required check
        if (rules.required && !value) {
            error = 'Field ini wajib diisi';
        }
        // Min length check
        else if (rules.minlength && value.length < rules.minlength) {
            error = `Minimal ${rules.minlength} karakter`;
        }
        // Max length check
        else if (rules.maxlength && value.length > rules.maxlength) {
            error = `Maksimal ${rules.maxlength} karakter`;
        }
        // Email format check
        else if (rules.email && value && !emailRegex.test(value)) {
            error = 'Format email tidak valid (contoh: nama@email.com)';
        }

        // Update UI
        if (error) {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
            if (errorDiv) errorDiv.textContent = error;
            return false;
        } else {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
            if (errorDiv) errorDiv.textContent = '';
            return true;
        }
    };

    // Real-time validation on input
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        if (!input) return;

        input.addEventListener('input', function() {
            const rules = {
                name: { required: true, minlength: 3, maxlength: 100 },
                email: { required: true, email: true, maxlength: 255 },
                subject: { required: true, minlength: 5, maxlength: 200 },
                message: { required: true, minlength: 10, maxlength: 2000 }
            }[this.id];

            if (rules) {
                validateField(this, rules);
            }

            // Update character counter for message
            if (this.id === 'message') {
                const counter = document.getElementById('messageCounter');
                if (counter) {
                    counter.textContent = `${this.value.length}/2000 karakter`;
                }
            }
        });

        // Validate on blur
        input.addEventListener('blur', function() {
            const rules = {
                name: { required: true, minlength: 3, maxlength: 100 },
                email: { required: true, email: true, maxlength: 255 },
                subject: { required: true, minlength: 5, maxlength: 200 },
                message: { required: true, minlength: 10, maxlength: 2000 }
            }[this.id];

            if (rules) {
                validateField(this, rules);
            }
        });
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate all fields
        const isNameValid = validateField(nameInput, { required: true, minlength: 3, maxlength: 100 });
        const isEmailValid = validateField(emailInput, { required: true, email: true, maxlength: 255 });
        const isSubjectValid = validateField(subjectInput, { required: true, minlength: 5, maxlength: 200 });
        const isMessageValid = validateField(messageInput, { required: true, minlength: 10, maxlength: 2000 });

        // Check if all valid
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Mengirim...';

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Show success message
                if (formSuccess) {
                    formSuccess.classList.remove('d-none');
                    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }

                // Reset form
                contactForm.reset();
                [nameInput, emailInput, subjectInput, messageInput].forEach(field => {
                    if (field) {
                        field.classList.remove('is-valid');
                    }
                });

                // Reset character counter
                const counter = document.getElementById('messageCounter');
                if (counter) counter.textContent = '0/2000 karakter';

                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Pesan';

                // Hide success message after 5 seconds
                if (formSuccess) {
                    setTimeout(() => {
                        formSuccess.classList.add('d-none');
                    }, 5000);
                }
            }, 1500);
        } else {
            // Show error alert
            showAlert('Mohon perbaiki error pada form sebelum mengirim.', 'danger');

            // Focus on first invalid field
            const firstInvalid = contactForm.querySelector('.is-invalid');
            if (firstInvalid) {
                firstInvalid.focus();
            }
        }
    });
}
