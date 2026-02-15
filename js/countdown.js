/* === COUNTDOWN - Đếm ngược đến Tết Nguyên Đán 2026 === */
/* Tết Bính Ngọ 2026: 17/02/2026 (Mùng 1 Tết) */

const Countdown = (() => {
    // Tết Nguyên Đán 2026 (Mùng 1 Tết Bính Ngọ)
    const TARGET = new Date('2026-02-17T00:00:00+07:00');
    let interval = null;

    function getTimeRemaining() {
        const now = new Date();
        const diff = TARGET - now;
        if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
            seconds: Math.floor((diff / 1000) % 60),
            total: diff
        };
    }

    function updateDOM() {
        const t = getTimeRemaining();
        const setVal = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = String(val).padStart(2, '0');
        };
        setVal('cd-days', t.days);
        setVal('cd-hours', t.hours);
        setVal('cd-minutes', t.minutes);
        setVal('cd-seconds', t.seconds);

        if (t.total <= 0) {
            clearInterval(interval);
            const wrap = document.querySelector('.countdown-wrapper');
            if (wrap) {
                wrap.innerHTML = '<div style="text-align:center;color:var(--gold-primary);font-size:2rem;font-weight:700;">🎉 Chúc Mừng Năm Mới Bính Ngọ 2026! 🎉</div>';
            }
        }
    }

    function init() {
        updateDOM();
        interval = setInterval(updateDOM, 1000);
    }

    return { init };
})();
