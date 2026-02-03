<div align="center">

# 💰 Home Wallet

### Modern Household Expense Management App

A beautiful, feature-rich web application for couples to track and manage their household expenses together.

[![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[🚀 Live Demo](https://home-wallet-4254d.web.app) • [📚 Documentation](./docs/)

</div>

---

## ✨ Features

### 🎯 Core Features

- **🔐 Secure Authentication** - Email/password authentication via Firebase
- **💸 Expense Management** - Full CRUD operations for household expenses
- **📊 Interactive Dashboard** - Real-time statistics and visual insights
- **🏷️ Custom Categories** - Personalized expense categorization with emoji icons
- **📸 Receipt Upload** - Automatic image compression and storage

### 🎨 User Experience

- **🌙 Dark Mode** - Seamless light/dark theme switching
- **📱 PWA Support** - Install as a native app on any device
- **🔍 Smart Search** - Quick filtering across expenses
- **🌍 RTL Support** - Full Arabic language interface
- **📲 Mobile-First** - Responsive design optimized for all screen sizes
- **♻️ Pull to Refresh** - Native-like mobile interactions

### 📈 Analytics

- Monthly expense totals with trend analysis
- Husband vs Wife spending comparison
- Category-wise breakdown with percentages
- Flexible date range filtering

---

## 🛠️ Tech Stack

| Technology        | Version | Purpose                          |
| ----------------- | ------- | -------------------------------- |
| **Vue 3**         | 3.5.27  | Progressive JavaScript framework |
| **TypeScript**    | 5.9.3   | Type-safe development            |
| **Vite**          | 7.3.1   | Lightning-fast build tool        |
| **Tailwind CSS**  | 4.x     | Utility-first styling            |
| **Firebase Auth** | 12.x    | User authentication              |
| **Firestore**     | 12.x    | Real-time NoSQL database         |
| **PWA Plugin**    | 1.2.0   | Progressive web app features     |

---

## 🚀 Quick Start

### Prerequisites

- Node.js `v20.19+` or `v22.12+`
- npm or yarn
- Firebase account

### Installation

```bash
# Clone the repository
git clone https://github.com/abanoub2017/home-wallet.git
cd home-wallet

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Firebase credentials
```

### Development

```bash
# Start dev server (http://localhost:5173)
npm run dev

# Run type checking
npm run type-check

# Format code
npm run format
```

### Production

```bash
# Build for production
npm run build

# Deploy to Firebase
npm run deploy
```

---

## 📁 Project Structure

```
src/
├── assets/styles/      # Global CSS files
├── components/
│   ├── common/         # Reusable UI components
│   └── layout/         # Layout components (Header, Nav)
├── composables/        # Vue composition functions
├── config/             # Firebase & app configuration
├── router/             # Vue Router setup
├── types/              # TypeScript type definitions
├── utils/              # Helper functions
└── views/              # Page components
```

---

## 🎯 Key Pages

| Route       | Description                  |
| ----------- | ---------------------------- |
| `/`         | Dashboard with monthly stats |
| `/expenses` | Expense list with filters    |
| `/add`      | Add new expense              |
| `/edit/:id` | Edit existing expense        |
| `/profile`  | User profile settings        |
| `/settings` | Category management          |
| `/login`    | Authentication page          |

---

## 🔧 Firebase Setup

1. Create a new project at [Firebase Console](https://console.firebase.google.com/)
2. Enable **Authentication** → Email/Password provider
3. Create a **Firestore Database** (Start in production mode)
4. Copy your Firebase config to `.env`:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /expenses/{expenseId} {
      allow read, write: if request.auth != null;
    }
    match /categories/{categoryId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 📱 PWA Features

- ✅ Offline functionality
- ✅ Install prompt
- ✅ App-like experience
- ✅ Automatic updates
- ✅ Responsive icons

---

## 🎨 Design System

### Color Palette

- **Primary**: Indigo (#6366f1)
- **Husband**: Blue (#3b82f6)
- **Wife**: Pink (#ec4899)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Danger**: Red (#ef4444)

### Typography

- **Font**: Cairo (Google Fonts) - Optimized for Arabic
- **Weights**: 300, 400, 600, 700

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available for personal use.

---

## 👨‍💻 Author

**Abanoub George**

---

## 🙏 Acknowledgments

- Vue.js team for the amazing framework
- Firebase for backend infrastructure
- Tailwind CSS for the utility-first approach
- The open-source community

---

<div align="center">

**Built with ❤️ using Vue 3 + TypeScript + Firebase**

[⬆ Back to Top](#-home-wallet)

</div>
