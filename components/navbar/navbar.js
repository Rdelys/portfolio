function initNavbar() {
    console.log('=== NAVBAR INIT ===');
    const hamburger = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileClose = document.getElementById('mobileClose');

    if (!hamburger || !mobileMenu || !mobileOverlay) {
        console.error('Navbar: éléments manquants après injection');
        return;
    }

    const openMenu = () => {
        mobileMenu.classList.add('active');
        mobileOverlay.classList.add('active');
        hamburger.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', openMenu);
    mobileOverlay.addEventListener('click', closeMenu);

    if (mobileClose) {
        mobileClose.addEventListener('click', closeMenu);
    }

    document.querySelectorAll('.mobile-nav-link')
        .forEach(link => link.addEventListener('click', closeMenu));

    console.log('Navbar mobile fonctionnelle');
}

window.initNavbar = initNavbar;
