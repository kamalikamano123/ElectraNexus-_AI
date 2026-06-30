# ⚡ ElectraNexus AI — React Frontend Dashboard

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-3-22C55E?style=for-the-badge)

This is the **React frontend** for ElectraNexus AI — a premium dark-mode dashboard for real-time electric fence monitoring, AI-driven theft detection, and field team dispatch management.

---

## 📁 Directory Structure

```
dashboard/
├── src/
│   ├── pages/
│   │   ├── Home.jsx            # System overview & status cards
│   │   ├── LiveDashboard.jsx   # Real-time sensor charts + AI predictions
│   │   ├── Dispatch.jsx        # Alert routing & field team management
│   │   ├── DataLogs.jsx        # Historical sensor logs & exports
│   │   ├── Map.jsx             # Interactive geo-fence map (Leaflet)
│   │   ├── AIInsights.jsx      # AI analytics & trend recommendations
│   │   ├── Simulation.jsx      # Manual sensor simulation panel
│   │   ├── About.jsx           # System documentation & help
│   │   ├── Profile.jsx         # User profile management
│   │   ├── Login.jsx           # Authentication page
│   │   ├── Signup.jsx          # User registration page
│   │   └── Splash.jsx          # Animated boot splash screen
│   ├── components/
│   │   ├── Layout.jsx          # App shell with animated sidebar
│   │   └── ProtectedRoute.jsx  # Auth-gated route wrapper
│   ├── context/
│   │   └── AuthContext.jsx     # Global auth state (Context API)
│   ├── App.jsx                 # Root component & React Router setup
│   ├── App.css                 # Global component styles
│   ├── index.css               # Base styles & CSS variables
│   └── main.jsx                # Vite entry point
├── public/
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js ≥ 18
- npm

### Install Dependencies

```bash
cd dashboard
npm install
```

### Start Development Server

```bash
npm run dev
```

Dashboard available at: `http://localhost:5173`

### Build for Production

```bash
npm run build
```

---

## 🔗 Backend Connection

The frontend communicates with the Flask ML backend at `http://localhost:5000`.

Make sure the backend is running before using the Live Dashboard or Simulation features.

See [electricity_theft_ml/README.md](../../electricity_theft_ml/README.md) for backend setup.

---

## 📦 Dependencies

| Package               | Purpose                              |
|----------------------|--------------------------------------|
| `react` `react-dom`  | Core UI library                      |
| `react-router-dom`   | Client-side routing                  |
| `recharts`           | Real-time charts and data visualization |
| `leaflet` `react-leaflet` | Interactive geo maps            |
| `lucide-react`       | Icon library                         |
| `tailwindcss`        | Utility-first CSS framework          |
| `clsx` `tailwind-merge` | Conditional class utilities       |

---

## 🗺️ Routing

| Path           | Page            | Protected |
|----------------|-----------------|-----------|
| `/login`       | Login           | ❌ Public  |
| `/signup`      | Signup          | ❌ Public  |
| `/`            | Home            | ✅ Auth    |
| `/dashboard`   | Live Dashboard  | ✅ Auth    |
| `/dispatch`    | Dispatch        | ✅ Auth    |
| `/logs`        | Data Logs       | ✅ Auth    |
| `/map`         | Map             | ✅ Auth    |
| `/about`       | About           | ✅ Auth    |
| `/profile`     | Profile         | ✅ Auth    |

---

## 🎨 Design System

- **Theme:** Dark mode glassmorphism
- **Accent:** Cyan / Electric Blue (`#00d4ff`)
- **Background:** Deep dark `#0a0f1e`
- **Font:** System UI / Inter
- **Animations:** Smooth CSS transitions and micro-animations throughout

---

## 📌 Key Features

### 🔴 Live Dashboard
- Streams real-time sensor data from the ML API
- Animated line charts for `Ir`, `RMS`, `Peak`, `Variance`, and `Harmonics`
- AI classification result with probability confidence bar
- Color-coded status: Normal / Suspicious / Unauthorized

### 🗺️ Geo Map
- Leaflet-powered interactive map
- Visual representation of fence perimeter nodes
- Alert markers for flagged locations

### 🚨 Dispatch Panel
- Real-time alert list with severity levels
- Field team assignment and status tracking
- Resolution tracking and audit log

### 📊 Data Logs
- Historical log of all sensor events
- Filterable and exportable records

### 🧠 AI Insights
- Trend analysis and pattern recognition
- Recommendation engine output
- Risk scoring per fence segment

### 🎮 Simulation
- Manually input sensor values
- Test different theft scenarios
- Live prediction feedback
