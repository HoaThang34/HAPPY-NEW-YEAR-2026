/* === MASCOT - Linh vật Ngựa Lửa === */

const Mascot = (() => {
    const MESSAGES = [
        'Chúc bạn năm mới bứt phá như ngựa phi! 🐴',
        'Lộc đang về nè! 🧧',
        'Xuân Bính Ngọ an khang thịnh vượng!',
        'Phi như ngựa, phát như rồng! 🔥',
        'Năm mới vạn sự như ý!',
        'Ngựa lửa mang lộc đến cho bạn! ✨'
    ];

    let svg, speech, speechTimeout;

    function init() {
        svg = document.querySelector('.mascot-svg');
        speech = document.querySelector('.mascot-speech');
        if (!svg) return;

        // Show random message on hover
        const wrapper = document.querySelector('.mascot-wrapper');
        if (wrapper) {
            wrapper.addEventListener('mouseenter', () => showMessage());
            wrapper.addEventListener('mouseleave', () => hideMessage());
        }

        // React to lì xì
        App.on('lixi-sent', () => jump());
        App.on('milestone-reached', () => {
            wave();
            showMessage('🎆 5 TRIỆU! Pháo hoa nổ rồi nè!');
        });

        // Random idle messages
        setInterval(() => {
            if (Math.random() > 0.7) {
                showMessage();
                setTimeout(() => hideMessage(), 3000);
            }
        }, 15000);
    }

    function jump() {
        if (!svg) return;
        svg.classList.remove('jumping', 'waving');
        void svg.offsetWidth; // force reflow
        svg.classList.add('jumping');
        svg.addEventListener('animationend', () => svg.classList.remove('jumping'), { once: true });
    }

    function wave() {
        if (!svg) return;
        svg.classList.remove('jumping', 'waving');
        void svg.offsetWidth;
        svg.classList.add('waving');
        svg.addEventListener('animationend', () => svg.classList.remove('waving'), { once: true });
    }

    function showMessage(msg) {
        if (!speech) return;
        clearTimeout(speechTimeout);
        speech.textContent = msg || MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
        speech.classList.add('show');
        speechTimeout = setTimeout(() => hideMessage(), 4000);
    }

    function hideMessage() {
        if (speech) speech.classList.remove('show');
    }

    return { init, jump, wave, showMessage };
})();
