/* ============================================
   APP.JS - Main Application Logic
   State Management & Event System
   ============================================ */

const App = (() => {
  // Constants
  const STORAGE_KEY = 'hny2026_data';
  const MILESTONE_AMOUNT = 5000000;

  // State
  let state = {
    lixiList: [],
    totalAmount: 0,
    milestoneReached: false
  };

  // Event listeners
  const listeners = {};

  function on(event, callback) {
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push(callback);
  }

  function emit(event, data) {
    if (listeners[event]) {
      listeners[event].forEach(cb => cb(data));
    }
  }

  // LocalStorage
  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* ignore */ }
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        state.lixiList = parsed.lixiList || [];
        state.milestoneReached = parsed.milestoneReached || false;
        recalcTotal();
      }
    } catch (e) { /* ignore */ }
  }

  function recalcTotal() {
    state.totalAmount = state.lixiList.reduce((sum, item) => sum + item.amount, 0);
  }

  // Actions
  function sendLixi(name, amount, design, message) {
    const item = {
      id: Date.now() + Math.random(),
      name: name.trim(),
      amount: parseInt(amount),
      design: design,
      message: message ? message.trim() : '',
      timestamp: new Date().toISOString()
    };
    state.lixiList.push(item);
    recalcTotal();
    saveState();

    emit('lixi-sent', item);
    emit('total-updated', state.totalAmount);

    // Check milestone
    if (state.totalAmount >= MILESTONE_AMOUNT && !state.milestoneReached) {
      state.milestoneReached = true;
      saveState();
      emit('milestone-reached', state.totalAmount);
    }

    return item;
  }

  function getRecentLixi() {
    // Return copy of list sorted by new -> old
    return state.lixiList.slice().reverse();
  }

  function getTotal() { return state.totalAmount; }
  function getMilestone() { return MILESTONE_AMOUNT; }
  function isMilestoneReached() { return state.milestoneReached; }

  function resetData() {
    state = { lixiList: [], totalAmount: 0, milestoneReached: false };
    localStorage.removeItem(STORAGE_KEY);
    emit('total-updated', 0);
    emit('list-updated', []);
  }

  // Mock data for demo
  function loadMockData() {
    if (state.lixiList.length > 0) return;

    // Add Special VIP Hòa Quang Thắng
    sendLixi('Hòa Quang Thắng', 9999999, '1', 'Chúc mừng năm mới 2026! Vạn sự như ý, tỷ sự như mơ, triệu triệu bất ngờ, không chờ cũng đến! 🚀');

    const mockNames = [
      'Nguyễn Văn An', 'Trần Thị Bình', 'Lê Hoàng Cường',
      'Phạm Minh Đức', 'Hoàng Thu Hà', 'Vũ Quang Huy',
      'Đỗ Thanh Lan', 'Bùi Xuân Mai'
    ];
    const amounts = [100000, 200000, 500000, 50000, 100000, 200000];
    const designs = [1, 2, 3, 4];
    const wishes = [
      'Năm mới phát tài!', 'Sức khỏe dồi dào', 'An khang thịnh vượng',
      'Tiền vào như nước', 'Vạn sự như ý', ''
    ];

    for (let i = 0; i < 20; i++) {
      const name = mockNames[Math.floor(Math.random() * mockNames.length)];
      const amount = amounts[Math.floor(Math.random() * amounts.length)];
      const design = designs[Math.floor(Math.random() * designs.length)];
      const wish = wishes[Math.floor(Math.random() * wishes.length)];
      sendLixi(name, amount, design, wish);
    }
  }

  // Init
  function init() {
    loadState();
    if (state.lixiList.length === 0) {
      loadMockData();
    }
    emit('total-updated', state.totalAmount);
  }

  return {
    init, on, emit, sendLixi,
    getRecentLixi, getTotal, getMilestone,
    isMilestoneReached, resetData
  };
})();
