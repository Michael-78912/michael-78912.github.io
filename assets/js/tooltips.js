

document.querySelectorAll('.tooltip').forEach(el => {
    el.addEventListener('touchstart', () => {
        el.classList.add('show-tooltip');
        setTimeout(() => el.classList.remove('show-tooltip'), 2000);
    });
});
