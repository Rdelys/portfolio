// Navbar DEVART - Version améliorée
class NavbarDevart {
    constructor() {
        console.log('🚀 NAVBAR DEVART INITIALISATION');
        
        this.navbar = document.querySelector('.navbar-devart');
        this.hamburger = document.getElementById('mobileToggle');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.mobileOverlay = document.getElementById('mobileOverlay');
        this.mobileClose = document.getElementById('mobileClose');
        
        this.init();
    }
    
    init() {
        if (!this.checkElements()) {
            console.error('Navbar: éléments DOM manquants');
            return;
        }
        
        this.setupEventListeners();
        this.setupScrollEffects();
        this.setupActiveLinks();
        this.setupKeyboardNavigation();
        
        console.log('✅ Navbar initialisée avec succès');
    }
    
    checkElements() {
        return this.navbar && this.hamburger && this.mobileMenu && this.mobileOverlay;
    }
    
    setupEventListeners() {
        // Burger menu
        this.hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.openMobileMenu();
        });
        
        // Overlay click
        this.mobileOverlay.addEventListener('click', (e) => {
            if (e.target === this.mobileOverlay) {
                this.closeMobileMenu();
            }
        });
        
        // Close button
        if (this.mobileClose) {
            this.mobileClose.addEventListener('click', this.closeMobileMenu.bind(this));
        }
        
        // Close on ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
        
        // Close menu on link click
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', this.closeMobileMenu.bind(this));
        });
        
        // Prevent body scroll when menu is open
        document.addEventListener('touchmove', (e) => {
            if (this.mobileMenu.classList.contains('active')) {
                e.preventDefault();
            }
        }, { passive: false });
    }
    
    setupScrollEffects() {
        let lastScroll = 0;
        const scrollThreshold = 100;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Effet de scroll sur la navbar
            if (currentScroll > scrollThreshold) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            
            // Hide/show on scroll direction
            if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
                this.navbar.style.transform = 'translateX(-50%) translateY(-100px)';
            } else {
                this.navbar.style.transform = 'translateX(-50%) translateY(0)';
            }
            
            lastScroll = currentScroll;
            
            // Update active link based on scroll position
            this.updateActiveLinkOnScroll();
        }, { passive: true });
    }
    
    setupActiveLinks() {
        const links = document.querySelectorAll('.compact-link, .mobile-nav-link');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                // Remove active class from all links
                links.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
                
                // Add active state to parent item
                const parentItem = link.closest('.compact-item');
                if (parentItem) {
                    document.querySelectorAll('.compact-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    parentItem.classList.add('active');
                }
            });
        });
        
        // Set initial active link
        const currentPath = window.location.hash || '#';
        const initialLink = document.querySelector(`[href="${currentPath}"]`);
        if (initialLink) {
            initialLink.classList.add('active');
        }
    }
    
    updateActiveLinkOnScroll() {
        const sections = document.querySelectorAll('section[id], div[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                const correspondingLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (correspondingLink) {
                    document.querySelectorAll('.compact-link, .mobile-nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (!this.mobileMenu.classList.contains('active')) return;
            
            const focusableElements = this.mobileMenu.querySelectorAll(
                'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }
    
    openMobileMenu() {
        this.mobileMenu.classList.add('active');
        this.mobileOverlay.classList.add('active');
        this.hamburger.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus management
        setTimeout(() => {
            const firstFocusable = this.mobileMenu.querySelector(
                'a[href], button, [tabindex]:not([tabindex="-1"])'
            );
            if (firstFocusable) firstFocusable.focus();
        }, 100);
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('navMenuOpen'));
    }
    
    closeMobileMenu() {
        this.mobileMenu.classList.remove('active');
        this.mobileOverlay.classList.remove('active');
        this.hamburger.classList.remove('active');
        document.body.style.overflow = '';
        
        // Return focus to hamburger
        this.hamburger.focus();
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('navMenuClose'));
    }
    
    // Public methods
    toggleMobileMenu() {
        if (this.mobileMenu.classList.contains('active')) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }
    
    // Cleanup method
    destroy() {
        // Remove event listeners if needed
        console.log('🧹 Navbar cleanup');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.navbar = new NavbarDevart();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavbarDevart;
}