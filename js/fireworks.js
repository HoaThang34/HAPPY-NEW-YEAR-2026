/* === FIREWORKS - Canvas Pháo Hoa === */

const Fireworks = (() => {
    let canvas, ctx, particles = [], animId = null, isActive = false;

    function init() {
        canvas = document.getElementById('fireworks-canvas');
        if (!canvas) return;
        ctx = canvas.getContext('2d');
        resize();
        window.addEventListener('resize', resize);
        App.on('milestone-reached', () => start());
    }

    function resize() {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function start() {
        if (isActive) return;
        isActive = true;
        canvas.classList.add('active');

        const celeb = document.querySelector('.fireworks-celebration');
        if (celeb) celeb.classList.add('active');

        // Launch fireworks over 8 seconds
        let count = 0;
        const launchInterval = setInterval(() => {
            createBurst(
                Math.random() * canvas.width,
                Math.random() * canvas.height * 0.6
            );
            count++;
            if (count > 30) clearInterval(launchInterval);
        }, 250);

        animate();

        // Auto stop after 10s
        setTimeout(() => stop(), 10000);
    }

    function stop() {
        isActive = false;
        canvas.classList.remove('active');
        const celeb = document.querySelector('.fireworks-celebration');
        if (celeb) celeb.classList.remove('active');
        cancelAnimationFrame(animId);
        particles = [];
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function fire() {
        // Quick burst
        if (!canvas) return;
        isActive = true;
        canvas.classList.add('active');
        if (!animId) animate();

        // 3 bursts
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createBurst(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height * 0.8
                );
            }, i * 300);
        }

        // Auto clear if not running full show
        setTimeout(() => {
            if (!document.querySelector('.fireworks-celebration.active')) {
                // Only stop if main celebration is not active
                // But wait for particles to fade
                setTimeout(() => {
                    if (!document.querySelector('.fireworks-celebration.active')) {
                        isActive = false;
                        canvas.classList.remove('active');
                        particles = [];
                        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
                        cancelAnimationFrame(animId);
                        animId = null;
                    }
                }, 2000);
            }
        }, 1000);
    }

    function createBurst(x, y) {
        const colors = ['#FFD700', '#FF6F00', '#E53935', '#FF8F00', '#FFF', '#FFAB00'];
        const count = 40 + Math.floor(Math.random() * 30);
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
            const speed = 2 + Math.random() * 4;
            particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                decay: 0.01 + Math.random() * 0.015,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: 1.5 + Math.random() * 2.5
            });
        }
    }

    function animate() {
        if (!isActive) return;
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.04; // gravity
            p.life -= p.decay;

            if (p.life <= 0) { particles.splice(i, 1); continue; }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life;
            ctx.fill();
            ctx.globalAlpha = 1;
        }

        animId = requestAnimationFrame(animate);
    }

    return { init, start, stop, fire };
})();
