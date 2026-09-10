// --- Juggling Lab Generator ---
const ANIMATION_URL = 'https://jugglinglab.org/anim?pattern=3';

let isGeneratorInitialized = false;

const initGenerator = () => {
    if (isGeneratorInitialized) return;

    const animationIframe = document.getElementById('juggling-animation-iframe');
    const fullscreenBtn = document.getElementById('generator-fullscreen-btn');

    if (!animationIframe) return;

    isGeneratorInitialized = true;

    // Load clean URL without outdated/incompatible parameters
    if (animationIframe.src !== ANIMATION_URL) {
        animationIframe.src = ANIMATION_URL;
    }

    // Handle fullscreen toggle
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (animationIframe.requestFullscreen) {
                animationIframe.requestFullscreen();
            } else if (animationIframe.webkitRequestFullscreen) {
                animationIframe.webkitRequestFullscreen();
            } else if (animationIframe.mozRequestFullScreen) {
                animationIframe.mozRequestFullScreen();
            } else if (animationIframe.msRequestFullscreen) {
                animationIframe.msRequestFullscreen();
            } else {
                window.open(ANIMATION_URL, '_blank');
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.cd-hero-slider');
    if (!slider) return;

    const checkAndInit = () => {
        const fifthPage = slider.children[4];
        if (fifthPage && fifthPage.classList.contains('selected')) {
            initGenerator();
        }
    };

    // Check on initial load in case page 5 is open
    checkAndInit();

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                checkAndInit();
            }
        });
    });

    observer.observe(slider, {
        attributes: true,
        subtree: true,
        attributeFilter: ['class']
    });
});