# 🐴🔥 Happy New Year 2026 – Xuân Bính Ngọ

> Website chúc mừng năm mới 2026 — Tết Bính Ngọ, với hiệu ứng pháo hoa, bao lì xì 3D và minigame bốc thăm may mắn.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/HoaThang34/HAPPY-NEW-YEAR-2026)

## ✨ Tính Năng

| Tính năng | Mô tả |
|-----------|-------|
| 🧧 **Gửi Lì Xì Ảo** | Form nhập tên, số tiền, lời chúc (bắt buộc), 4 mẫu bao |
| 🎁 **Bao Lì Xì 3D** | Hiệu ứng mở bao CSS 3D transform |
| 🎆 **Pháo Hoa** | Canvas animation khi gửi lì xì |
| 🎰 **Minigame Bốc Thăm** | Chọn 1 trong 3 bao để nhận lộc may mắn |
| 💌 **Lời Chúc Welcome** | Modal chào mừng khi vào trang |
| ⏰ **Đếm Ngược** | Countdown đến Mùng 1 Tết (17/02/2026) |
| 🐴 **Mascot Ngựa Lửa** | SVG animation tương tác |
| 📱 **Responsive** | Tối ưu cho mọi kích thước màn hình |

## 🛠️ Tech Stack

- **HTML5** / **CSS3** / **Vanilla JavaScript**
- Không framework, không build tools
- Google Fonts: [Be Vietnam Pro](https://fonts.google.com/specimen/Be+Vietnam+Pro)

## 📁 Cấu Trúc

```
├── index.html          # Trang chính
├── css/
│   ├── style.css       # Design system & layout
│   ├── envelope.css    # Bao lì xì 3D
│   ├── mascot.css      # Ngựa lửa animation
│   ├── fireworks.css   # Pháo hoa
│   └── darkmode.css    # Override dark mode
├── js/
│   ├── app.js          # State management & localStorage
│   ├── countdown.js    # Đồng hồ đếm ngược
│   ├── envelope.js     # Logic bao lì xì
│   ├── leaderboard.js  # Danh sách lì xì mới nhất
│   ├── mascot.js       # Linh vật tương tác
│   └── fireworks.js    # Canvas pháo hoa
├── vercel.json         # Cấu hình Vercel
└── README.md
```

## 🚀 Deploy Lên Vercel

### Cách 1: One-click Deploy
Nhấn nút **Deploy with Vercel** ở trên.

### Cách 2: CLI
```bash
# Cài Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Cách 3: GitHub Integration
1. Push code lên [GitHub repo](https://github.com/HoaThang34/HAPPY-NEW-YEAR-2026)
2. Truy cập [vercel.com/new](https://vercel.com/new)
3. Import repo → Deploy tự động

## 💻 Chạy Local

```bash
# Python
python -m http.server 8000

# Node.js
npx serve .

# Hoặc mở trực tiếp index.html
```

## 📄 License

MIT © [Hoa Quang Thang](https://github.com/HoaThang34)
