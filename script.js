document.addEventListener('DOMContentLoaded', () => {
    // --- Element References ---
    const generateBtn = document.getElementById('generate-btn');
    const animationIframe = document.getElementById('juggling-animation-iframe');
    const patternInput = document.getElementById('pattern');
    const examplePatternBtns = document.querySelectorAll('.example-pattern-btn');

    // --- Main Function ---
    const generateAnimation = () => {
        const pattern = patternInput.value;
        if (!pattern) {
            alert('Пожалуйста, введите паттерн.');
            return;
        }

        // --- URL Construction ---
        const baseURL = 'https://jugglinglab.org/anim';
        const params = new URLSearchParams({
            pattern: pattern,
            width: 600,
            height: 550,
            view: 'simple' // Use the simple view to avoid extra page elements
        });

        // --- Update Iframe ---
        const animationURL = `${baseURL}?${params.toString()}`;
        animationIframe.src = animationURL;
    };

    // --- Event Listeners ---
    generateBtn.addEventListener('click', generateAnimation);

    // Allow pressing Enter in the input field to generate
    patternInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            generateAnimation();
        }
    });

    examplePatternBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            patternInput.value = btn.dataset.pattern;
            generateAnimation();
        });
    });

    // --- Initial Load ---
    generateAnimation();
});
