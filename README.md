# ⚡ ElectraNexus AI — Smart Electric Fence Monitoring & Theft Detection System

<div align="center">

![ElectraNexus AI](https://img.shields.io/badge/ElectraNexus-AI-00d4ff?style=for-the-badge&logo=lightning&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.x-000000?style=for-the-badge&logo=flask&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-LSTM-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)

**A real-time AI-powered electric fencing monitoring platform with ML-based electricity theft detection.**

[🚀 Live Demo](#) • [📖 Docs](#project-structure) • [🐛 Report Bug](https://github.com/Mohxmd-01/ElectraNexus-AI/issues) • [💡 Feature Request](https://github.com/Mohxmd-01/ElectraNexus-AI/issues)

</div>

---

## 🌟 Overview

**ElectraNexus AI** is a full-stack intelligent monitoring system for electric fencing infrastructure. It combines a modern **React dashboard** with a **Flask + LSTM ML backend** to deliver:

- 🔴 **Real-time anomaly detection** — Classifies fence current as Normal, Suspicious, or Unauthorized Tampering
- 📊 **Live dashboards** — Dynamic charts, sensor feeds, and AI confidence scoring
- 🗺️ **Geo-mapping** — Visual map of fence nodes and alert locations
- 🚨 **Dispatch management** — Alert routing and field team coordination
- 🧠 **AI insights** — Contextual analysis and recommendation engine
- 🔐 **Auth-gated access** — Secure login/signup with protected routes

---

## 🏗️ Project Structure

```
electric fencing full/
│
├── 📁 electric fencing frontend/     # React + Vite Frontend
│   └── dashboard/
│       ├── src/
│       │   ├── pages/               # All page components
│       │   │   ├── Home.jsx         # Overview & system status
│       │   │   ├── LiveDashboard.jsx# Real-time sensor charts
│       │   │   ├── Dispatch.jsx     # Alert & dispatch management
│       │   │   ├── DataLogs.jsx     # Historical data logs
│       │   │   ├── Map.jsx          # Geo-fence map view
│       │   │   ├── AIInsights.jsx   # AI analysis & recommendations
│       │   │   ├── About.jsx        # System documentation
│       │   │   ├── Profile.jsx      # User profile management
│       │   │   ├── Login.jsx        # Authentication
│       │   │   ├── Signup.jsx       # User registration
│       │   │   ├── Simulation.jsx   # Sensor simulation tool
│       │   │   └── Splash.jsx       # Boot splash screen
│       │   ├── components/
│       │   │   ├── Layout.jsx       # App shell & sidebar
│       │   │   └── ProtectedRoute.jsx
│       │   ├── context/
│       │   │   └── AuthContext.jsx  # Auth state management
│       │   ├── App.jsx              # Root component & routing
│       │   └── main.jsx             # Entry point
│       ├── package.json
│       └── vite.config.js
│
└── 📁 electricity_theft_ml/          # Python + Flask ML Backend
    ├── app.py                        # Flask API server
    ├── test_api.py                   # API test script
    ├── src/
    │   ├── train.py                 # LSTM model training
    │   ├── model.py                 # Model architecture
    │   ├── preprocessing.py         # Data preprocessing
    │   └── predict.py              # Inference utilities
    ├── models/
    │   ├── lstm_model.h5            # Trained LSTM model
    │   └── scaler.pkl              # Feature scaler
    └── data/
        └── realistic_electricity_dataset.csv
```

---

## 🤖 Tech Stack

| Layer          | Technology                                                |
|----------------|-----------------------------------------------------------|
| **Frontend**   | React 19, Vite 8, React Router 7, TailwindCSS 4          |
| **Charts**     | Recharts 3                                                |
| **Maps**       | Leaflet + React-Leaflet                                   |
| **Icons**      | Lucide React                                              |
| **Backend**    | Flask 3, Flask-CORS                                       |
| **ML Model**   | TensorFlow/Keras LSTM (Binary Classification)             |
| **Data**       | Pandas, NumPy, Scikit-learn, Joblib                       |

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- Python ≥ 3.10
- pip

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Mohxmd-01/ElectraNexus-AI.git
cd ElectraNexus-AI
```

### 2️⃣ Start the ML Backend

```bash
cd electricity_theft_ml

# Install Python dependencies
pip install flask flask-cors tensorflow numpy pandas scikit-learn joblib

# Start the Flask API
python app.py
```

The API will be live at `http://localhost:5000`

### 3️⃣ Start the React Frontend

```bash
cd "electric fencing frontend/dashboard"

# Install Node dependencies
npm install

# Start development server
npm run dev
```

The dashboard will be live at `http://localhost:5173`

---

## 🧠 ML Model — LSTM Electricity Theft Detector

The backend uses a **Long Short-Term Memory (LSTM)** neural network trained on time-series electrical sensor data.

### Features Used

| Feature      | Description                              |
|-------------|------------------------------------------|
| `Ir`        | Residual current (primary indicator)     |
| `Ir_diff`   | Rate of change of Ir                     |
| `Ir_mean`   | Rolling 5-point mean of Ir               |
| `Ir_std`    | Rolling 5-point std deviation of Ir      |
| `RMS`       | Root mean square voltage/current         |
| `Variance`  | Signal variance                          |
| `Peak`      | Peak amplitude                           |
| `Harmonics` | Harmonic distortion level                |

### Detection Thresholds

| Probability Range | Classification              |
|-------------------|-----------------------------|
| `> 0.80`          | 🚨 Unauthorized Tapping      |
| `0.60 – 0.80`     | ⚠️ Suspicious Activity       |
| `< 0.60`          | ✅ Normal                    |

### Training

```bash
cd electricity_theft_ml/src
python train.py
```

---

## 🌐 API Endpoints

| Method | Endpoint      | Description                            |
|--------|--------------|----------------------------------------|
| `GET`  | `/`          | Health check                           |
| `GET`  | `/live-data` | Returns the latest sensor data batch   |
| `POST` | `/predict`   | Runs LSTM inference on sensor readings |

### Example `/predict` Request

```json
POST /predict
Content-Type: application/json

[
  { "Ir": 0.15, "RMS": 230.5, "Peak": 325.0, "Variance": 0.02, "Harmonics": 0.05 },
  ...
]
```

### Example Response

```json
{
  "probability": 0.87,
  "Ir": 0.15,
  "result": "🚨 Unauthorized Tapping"
}
```

---

## 📸 Pages Overview

| Page             | Description                                          |
|-----------------|------------------------------------------------------|
| **Home**         | System status overview and quick navigation          |
| **Live Dashboard** | Real-time charts with LSTM predictions             |
| **Dispatch**     | Alert management and field team dispatch            |
| **Data Logs**   | Historical sensor readings and event logs           |
| **Map**          | Geographic visualization of fence segments          |
| **AI Insights** | Contextual AI analytics and trend recommendations   |
| **Simulation**  | Test sensor scenarios with manual input             |
| **About**        | System documentation and help                      |

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👤 Author

**Mohammed** — [@Mohxmd-01](https://github.com/Mohxmd-01)

---

<div align="center">
⚡ Built with passion for smart infrastructure security ⚡
</div>
