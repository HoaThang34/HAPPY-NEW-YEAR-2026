/* === DANH SÁCH LÌ XÌ MỚI NHẤT === */

const RecentList = (() => {
    function render() {
        const list = document.getElementById('leaderboard-list');
        if (!list) return;

        // Get 20 most recent items
        const data = App.getRecentLixi().slice(0, 20);

        if (data.length === 0) {
            list.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted);">Chưa có lì xì nào</div>';
            return;
        }

        let html = '';
        data.forEach((item, i) => {
            const timeStr = formatTime(item.timestamp);

            html += `
        <div class="lb-item" style="animation: fadeInUp 0.4s ease ${i * 0.05}s both;">
          <div class="lb-info" style="width:100%;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
              <div class="lb-name">${escHtml(item.name)}</div>
              <div class="lb-time" style="font-size:0.75rem;color:var(--text-muted);">${timeStr}</div>
            </div>
            <div class="lb-amount-value" style="font-size:1.1rem;color:var(--gold-primary);margin-bottom:4px;">${formatMoney(item.amount)}đ</div>
            ${item.message ? `<div class="lb-message-bubble">${escHtml(item.message)}</div>` : ''}
          </div>
        </div>`;
        });

        list.innerHTML = html;
    }

    function formatTime(isoString) {
        if (!isoString) return '';
        const date = new Date(isoString);
        const now = new Date();
        const diff = (now - date) / 1000; // seconds

        if (diff < 60) return 'Vừa xong';
        if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
        return `${date.getDate()}/${date.getMonth() + 1}`;
    }

    function formatMoney(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    function escHtml(s) {
        const d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
    }

    function init() {
        render();
        App.on('lixi-sent', () => render());
        // Fire border on scroll
        initFireBorder();
    }

    function initFireBorder() {
        const section = document.querySelector('.leaderboard-section');
        const border = document.querySelector('.leaderboard-fire-border');
        if (!section || !border) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                border.classList.toggle('active', entry.isIntersecting);
            });
        }, { threshold: 0.3 });
        observer.observe(section);
    }

    return { init, render };
})();
