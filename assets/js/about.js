document.addEventListener("DOMContentLoaded", function () {
    const heroBg = document.querySelector('.about-hero-bg');
    const heroContent = document.querySelector('.about-hero-content');

    // Initialize Lenis
    const lenis = new Lenis({ smooth: true, lerp: 0.08 });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Prevent jump on load
    heroBg.style.transform = `translateY(0px)`;

    // Scroll handler for parallax
    lenis.on('scroll', ({ scroll }) => {
        heroBg.style.transform = `translateY(${scroll * 0.25}px)`;
        heroContent.style.transform = `translateY(${scroll * 0.05}px)`; // subtle depth
    });

    // Hero text fade-in animation
    heroContent.style.opacity = 0;
    heroContent.style.transform = 'translateY(-30px)';
    setTimeout(() => {
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        heroContent.style.opacity = 1;
        heroContent.style.transform = 'translateY(0)';
    }, 100);
});
