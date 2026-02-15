/* === ENVELOPE 3D - Bao lì xì 3D === */

const Envelope = (() => {
    let display, envelope3d, isOpen = false;

    function init() {
        display = document.getElementById('envelope-display');
        if (!display) return;
        display.querySelector('.envelope-3d-overlay')?.addEventListener('click', close);
    }

    function show(amount, design, message) {
        if (!display) return;
        isOpen = false;
        const env = display.querySelector('.envelope-3d');
        if (!env) return;

        // Reset classes
        env.className = 'envelope-3d envelope-design-' + design;
        env.classList.remove('opening');

        // Set amount
        const moneyEl = env.querySelector('.money-amount');
        if (moneyEl) moneyEl.textContent = formatMoney(amount) + 'đ';

        // Set message
        let msgEl = env.querySelector('.envelope-message');
        if (!msgEl) {
            msgEl = document.createElement('div');
            msgEl.className = 'envelope-message';
            env.querySelector('.envelope-money').appendChild(msgEl);
        }
        msgEl.textContent = message || '';
        msgEl.style.display = message ? 'block' : 'none';

        // Create sparkles
        createSparkles(env);

        display.classList.add('active');

        // Parallax on mouse move
        const body = env.querySelector('.envelope-body');
        const moveHandler = (e) => {
            if (!display.classList.contains('active')) return;
            const rect = env.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
            const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
            body.style.transform = `rotateY(${x * 15}deg) rotateX(${-y * 10}deg)`;
        };
        display.addEventListener('mousemove', moveHandler);
        display._moveHandler = moveHandler;

        // Click to open
        env.onclick = () => {
            if (isOpen) return;
            isOpen = true;
            env.classList.add('opening');
        };

        // Close button
        const closeBtn = env.querySelector('.envelope-close');
        if (closeBtn) {
            closeBtn.onclick = (e) => {
                e.stopPropagation();
                close();
            };
        }
    }

    function close() {
        if (!display) return;
        display.classList.remove('active');
        if (display._moveHandler) {
            display.removeEventListener('mousemove', display._moveHandler);
        }
        const body = display.querySelector('.envelope-body');
        if (body) body.style.transform = '';
        isOpen = false;
    }

    function createSparkles(env) {
        const container = env.querySelector('.envelope-sparkles');
        if (!container) return;
        container.innerHTML = '';
        for (let i = 0; i < 12; i++) {
            const s = document.createElement('div');
            s.className = 'sparkle';
            const angle = (i / 12) * Math.PI * 2;
            const dist = 60 + Math.random() * 40;
            s.style.cssText = `
        left: 50%; top: 50%;
        --sx: ${Math.cos(angle) * dist}px;
        --sy: ${Math.sin(angle) * dist}px;
        animation-delay: ${Math.random() * 0.3}s;
        background: ${['var(--gold-primary)', 'var(--orange-fire)', 'var(--red-bright)'][i % 3]};
      `;
            container.appendChild(s);
        }
    }

    function formatMoney(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    return { init, show, close };
})();
