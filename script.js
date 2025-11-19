// --- Element References for Generator ---
const generateBtn = document.getElementById('generate-btn');
const animationIframe = document.getElementById('juggling-animation-iframe');
const patternInput = document.getElementById('pattern');
const examplePatternBtns = document.querySelectorAll('.example-pattern-btn');

// --- Generator Function ---
    const generateAnimation = () => {
        const pattern = patternInput.value;
        if (!pattern) {
            return;
        }

        let gifWidth = 600;
        let gifHeight = 550;

        // Check if on a mobile device
        if (window.innerWidth < 768) {
            gifWidth = 300;
            gifHeight = 275;
        }

        const baseURL = 'https://jugglinglab.org/anim';
        const params = new URLSearchParams({
            pattern: pattern,
            width: gifWidth,
            height: gifHeight,
            view: 'simple'
        });

        const animationURL = `${baseURL}?${params.toString()}`;
        if (animationIframe.src !== animationURL) {
            animationIframe.src = animationURL;
        }
    };
const initGenerator = () => {
    if (generateBtn) {
        generateBtn.addEventListener('click', generateAnimation);
    }

    if (patternInput) {
        patternInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                generateAnimation();
            }
        });
    }

    examplePatternBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (patternInput) {
                patternInput.value = btn.dataset.pattern;
                generateAnimation();
            }
        });
    });

    // --- Initial Load for Generator ---
    generateAnimation();
}


document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.cd-hero-slider');
    if(!slider) return;
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                const fifthPage = slider.children[4];
                if (fifthPage.classList.contains('selected')) {
                    initGenerator();
                }
            }
        });
    });

    observer.observe(slider, {
        attributes: true,
        subtree: true,
        attributeFilter: ['class']
    });

});