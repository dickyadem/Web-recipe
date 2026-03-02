/**
 * Rating System Injector
 * Automatically adds rating/review system to all recipe pages
 * Run this once to inject rating HTML into recipe pages
 */

(function() {
    // Recipe data with default ratings
    const recipeData = {
        'rendang': {
            name: 'Rendang',
            time: '3-4 jam',
            servings: '4-5',
            difficulty: 'Sulit',
            avgRating: '4.8',
            totalRatings: 156,
            distribution: [117, 23, 8, 5, 3] // 5,4,3,2,1 stars
        },
        'nasigoreng': {
            name: 'Nasi Goreng',
            time: '30 menit',
            servings: '2-3',
            difficulty: 'Mudah',
            avgRating: '4.7',
            totalRatings: 203,
            distribution: [142, 41, 12, 6, 2]
        },
        'gudeg': {
            name: 'Gudeg',
            time: '2 Jam',
            servings: '4-5',
            difficulty: 'Sedang',
            avgRating: '4.6',
            totalRatings: 128,
            distribution: [85, 28, 10, 3, 2]
        },
        'soto-betawi': {
            name: 'Soto Betawi',
            time: '90 menit',
            servings: '4',
            difficulty: 'Sedang',
            avgRating: '4.8',
            totalRatings: 175,
            distribution: [130, 30, 10, 3, 2]
        },
        'terong-balado': {
            name: 'Terong Balado',
            time: '25 menit',
            servings: '3',
            difficulty: 'Mudah',
            avgRating: '4.5',
            totalRatings: 92,
            distribution: [55, 25, 8, 3, 1]
        },
        'cahkangkung': {
            name: 'Cah Kangkung',
            time: '15 menit',
            servings: '3',
            difficulty: 'Mudah',
            avgRating: '4.6',
            totalRatings: 87,
            distribution: [55, 22, 7, 2, 1]
        }
    };

    // Get current recipe name from URL
    function getRecipeName() {
        const path = window.location.pathname;
        const fileName = path.split('/').pop();
        return fileName.replace('.html', '');
    }

    // Inject rating summary HTML
    function injectRatingSummary(recipe) {
        const summaryHTML = `
            <!-- Recipe Info Box -->
            <div class="recipe-info-box mb-4 p-3 bg-light rounded-3">
                <div class="row text-center">
                    <div class="col-4">
                        <i class="fas fa-clock text-primary fa-2x mb-2"></i>
                        <p class="mb-0"><strong>${recipe.time}</strong></p>
                        <small class="text-muted">Waktu Masak</small>
                    </div>
                    <div class="col-4">
                        <i class="fas fa-users text-primary fa-2x mb-2"></i>
                        <p class="mb-0"><strong>${recipe.servings}</strong></p>
                        <small class="text-muted">Porsi</small>
                    </div>
                    <div class="col-4">
                        <i class="fas fa-fire text-primary fa-2x mb-2"></i>
                        <p class="mb-0"><strong>${recipe.difficulty}</strong></p>
                        <small class="text-muted">Kesulitan</small>
                    </div>
                </div>
            </div>

            <!-- Rating Summary -->
            <div class="rating-summary mb-4 p-4 bg-white rounded-3 shadow-sm">
                <div class="row align-items-center">
                    <div class="col-md-4 text-center border-end">
                        <h2 class="display-4 fw-bold text-warning mb-0" id="averageRating">${recipe.avgRating}</h2>
                        <div class="star-rating-display mb-2">
                            <i class="fas fa-star" aria-hidden="true"></i>
                            <i class="fas fa-star" aria-hidden="true"></i>
                            <i class="fas fa-star" aria-hidden="true"></i>
                            <i class="fas fa-star" aria-hidden="true"></i>
                            <i class="fas fa-star-half-alt" aria-hidden="true"></i>
                        </div>
                        <p class="text-muted mb-0">
                            <strong id="totalRatings">${recipe.totalRatings}</strong> penilaian
                        </p>
                    </div>
                    <div class="col-md-8">
                        <div class="rating-bars">
                            ${recipe.distribution.map((count, index) => {
                                const stars = 5 - index;
                                const percentage = (count / recipe.distribution[0]) * 100;
                                return `
                                    <div class="rating-bar-item">
                                        <span class="star-label">${stars} <i class="fas fa-star text-warning"></i></span>
                                        <div class="progress flex-grow-1 mx-2">
                                            <div class="progress-bar bg-warning" style="width: ${percentage}%"></div>
                                        </div>
                                        <span class="rating-count">${count}</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Insert before first .card element
        const firstCard = document.querySelector('.col-lg-8 .card');
        if (firstCard) {
            firstCard.insertAdjacentHTML('beforebegin', summaryHTML);
        }
    }

    // Inject rating form and reviews
    function injectRatingForm() {
        const formHTML = `
            <!-- Rating & Reviews Section -->
            <div class="row mt-5">
                <div class="col-12">
                    <!-- Rating Form -->
                    <div class="rating-form-section mb-5 p-4 bg-white rounded-3 shadow-sm">
                        <h3 class="mb-4">
                            <i class="fas fa-star text-warning me-2" aria-hidden="true"></i>Beri Penilaian
                        </h3>
                        <form id="ratingForm" class="mb-4">
                            <div class="mb-3">
                                <label class="form-label d-block">
                                    <i class="fas fa-star text-warning me-1" aria-hidden="true"></i>Rating Anda
                                </label>
                                <div class="star-rating-input" role="group" aria-label="Rating bintang">
                                    <input type="radio" name="rating" id="star5" value="5" class="star-input" />
                                    <label for="star5" title="5 bintang" aria-label="5 bintang">
                                        <i class="fas fa-star" aria-hidden="true"></i>
                                    </label>
                                    <input type="radio" name="rating" id="star4" value="4" class="star-input" />
                                    <label for="star4" title="4 bintang" aria-label="4 bintang">
                                        <i class="fas fa-star" aria-hidden="true"></i>
                                    </label>
                                    <input type="radio" name="rating" id="star3" value="3" class="star-input" />
                                    <label for="star3" title="3 bintang" aria-label="3 bintang">
                                        <i class="fas fa-star" aria-hidden="true"></i>
                                    </label>
                                    <input type="radio" name="rating" id="star2" value="2" class="star-input" />
                                    <label for="star2" title="2 bintang" aria-label="2 bintang">
                                        <i class="fas fa-star" aria-hidden="true"></i>
                                    </label>
                                    <input type="radio" name="rating" id="star1" value="1" class="star-input" />
                                    <label for="star1" title="1 bintang" aria-label="1 bintang">
                                        <i class="fas fa-star" aria-hidden="true"></i>
                                    </label>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="reviewerName" class="form-label">Nama Anda</label>
                                <input type="text" id="reviewerName" class="form-control" placeholder="Masukkan nama Anda" required maxlength="50" />
                            </div>
                            <div class="mb-3">
                                <label for="reviewComment" class="form-label">Komentar / Ulasan</label>
                                <textarea id="reviewComment" class="form-control" rows="4" placeholder="Bagaimana pengalaman Anda membuat resep ini?" required maxlength="500"></textarea>
                                <div class="form-text">Maksimal 500 karakter</div>
                            </div>
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-paper-plane me-2" aria-hidden="true"></i>Kirim Ulasan
                            </button>
                        </form>
                    </div>

                    <!-- Reviews List -->
                    <div class="reviews-section">
                        <h3 class="mb-4">
                            <i class="fas fa-comments me-2" aria-hidden="true"></i>Ulasan Pengunjung
                            <span class="badge bg-primary ms-2" id="reviewCount">0</span>
                        </h3>
                        <div id="reviewsList">
                            <!-- Reviews will be loaded here dynamically -->
                        </div>
                        <div id="noReviews" class="text-center py-4" style="display: none;">
                            <i class="fas fa-comment-slash fa-3x text-muted mb-3"></i>
                            <p class="text-muted">Belum ada ulasan. Jadilah yang pertama!</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Insert before closing </article> tag (before main closing)
        const main = document.querySelector('main');
        if (main) {
            const article = main.querySelector('article');
            if (article) {
                article.insertAdjacentHTML('beforeend', formHTML);
            }
        }
    }

    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', function() {
        const recipeName = getRecipeName();
        const recipe = recipeData[recipeName];

        if (recipe) {
            injectRatingSummary(recipe);
            injectRatingForm();
            
            // Initialize rating system (from app.js)
            if (typeof initRatingSystem === 'function') {
                initRatingSystem();
            }
        }
    });
})();
