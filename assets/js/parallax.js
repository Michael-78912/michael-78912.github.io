document.addEventListener("DOMContentLoaded", function () {
    const heroBg = document.querySelector('.parallax-bg');
    const overlay = document.querySelector('.connect-overlay');
    const heroContent = document.querySelector('.hero-content');

    // Initialize Lenis
    const lenis = new Lenis({ smooth: true, lerp: 0.08 });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Prevent parallax jump
    heroBg.style.transform = `translateY(0px)`;

    function handleScroll() {
        const scroll = window.scrollY;
        const heroHeight = document.querySelector('.hero').offsetHeight;
        const windowHeight = window.innerHeight;

        // Parallax
        heroBg.style.transform = `translateY(${scroll * 0.4}px)`;

        // Connect overlay reveal when top of hero reaches mid-screen
        const overlayTop = overlay.getBoundingClientRect().top;
        if (overlayTop < windowHeight * 0.75) {
            overlay.style.opacity = 1;
            overlay.style.transform = 'translate(-50%, 0)';
        } else {
            overlay.style.opacity = 0;
            overlay.style.transform = 'translate(-50%, 100px)';
        }
    }


    lenis.on('scroll', handleScroll);

    // Hero content entrance animation
    heroContent.style.opacity = 0;
    heroContent.style.transform = 'translateY(-30px)';
    setTimeout(() => {
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        heroContent.style.opacity = 1;
        heroContent.style.transform = 'translateY(0)';
    }, 100);

    // Initial check
    handleScroll();
});
