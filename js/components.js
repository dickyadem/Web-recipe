/**
 * Component Loader - Load reusable navbar and footer
 * Usage: Add <script src="js/components.js"></script> after Bootstrap JS
 */

(function() {
    // Get root path
    const getRootPath = () => {
        const path = window.location.pathname;
        return path.includes('/html/') ? '../' : '';
    };

    // Load component
    const loadComponent = async (url, container) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to load ${url}`);
            const html = await response.text();
            container.outerHTML = html;
            
            // Reinitialize components after loading
            if (typeof initNavbarTransition === 'function') {
                initNavbarTransition();
            }
        } catch (error) {
            console.error('Error loading component:', error);
            container.style.display = 'block';
            container.innerHTML = `<div class="alert alert-danger">Error loading ${url}</div>`;
        }
    };

    // Load navbar
    const loadNavbar = () => {
        const navbarPlaceholder = document.getElementById('navbar-placeholder');
        if (!navbarPlaceholder) return;
        
        const rootPath = getRootPath();
        const navbarUrl = `${rootPath}components/navbar.html`;
        
        loadComponent(navbarUrl, navbarPlaceholder);
    };

    // Load footer
    const loadFooter = () => {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (!footerPlaceholder) return;
        
        const rootPath = getRootPath();
        const footerUrl = `${rootPath}components/footer.html`;
        
        loadComponent(footerUrl, footerPlaceholder);
    };

    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', () => {
        loadNavbar();
        loadFooter();
    });
})();
