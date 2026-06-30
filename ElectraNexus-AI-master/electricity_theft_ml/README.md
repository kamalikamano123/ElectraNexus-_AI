# 🧠 ElectraNexus AI — Electricity Theft Detection ML Backend

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-API-000000?style=for-the-badge&logo=flask&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-LSTM-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)

This is the **ML backend** for ElectraNexus AI — a Flask REST API that runs a trained **LSTM neural network** to detect electricity theft in real time from sensor data streams.

---

## 📁 Directory Structure

```
electricity_theft_ml/
├── app.py                    # Main Flask API server
├── test_api.py               # API integration tests
├── src/
│   ├── train.py              # Model training pipeline
│   ├── model.py              # LSTM model architecture
│   ├── preprocessing.py      # Data loading & feature engineering
│   └── predict.py            # Standalone prediction utilities
├── models/
│   ├── lstm_model.h5         # Saved trained LSTM model
│   └── scaler.pkl            # Saved MinMaxScaler
└── data/
    └── realistic_electricity_dataset.csv  # Training dataset
```

---

## ⚙️ Installation

```bash
cd electricity_theft_ml

pip install flask flask-cors tensorflow numpy pandas scikit-learn joblib
```

---

## 🚀 Running the API

```bash
python app.py
```

Server starts at: `http://localhost:5000`

---

## 🌐 API Reference

### `GET /`
Health check endpoint.

**Response:**
```
✅ Electricity Theft Detection API is running
```

---

### `GET /live-data`
Returns the latest batch of sensor readings that were passed to `/predict`.

**Response:** Array of sensor data objects.

---

### `POST /predict`
Runs the LSTM model on a batch of sensor readings.

**Request Body:** JSON array with at least **80 data points** (WINDOW_SIZE).

```json
[
  {
    "Ir": 0.12,
    "RMS": 228.5,
    "Peak": 322.0,
    "Variance": 0.018,
    "Harmonics": 0.04
  },
  ...
]
```

**Required fields per reading:**

| Field        | Type   | Description                 |
|-------------|--------|-----------------------------|
| `Ir`        | float  | Residual current reading    |
| `RMS`       | float  | RMS voltage/current value   |
| `Peak`      | float  | Signal peak amplitude       |
| `Variance`  | float  | Signal variance             |
| `Harmonics` | float  | Harmonic distortion level   |

**Response:**

```json
{
  "probability": 0.87,
  "Ir": 0.12,
  "result": "🚨 Unauthorized Tapping"
}
```

**Classification Logic:**

| Probability  | Result                    |
|-------------|---------------------------|
| `> 0.80`    | 🚨 Unauthorized Tapping    |
| `0.60–0.80` | ⚠️ Suspicious Activity     |
| `< 0.60`    | ✅ Normal                  |

---

## 🏋️ Training the Model

The LSTM model was trained on a realistic electricity dataset with 8 engineered features.

```bash
cd src
python train.py
```

**Training Pipeline:**
1. Load CSV dataset
2. Feature engineering (rolling mean, std, diff on `Ir`)
3. Create 80-step sequences
4. Time-based 80/20 train-test split
5. Handle class imbalance with `class_weight`
6. Train LSTM with `EarlyStopping` + `ReduceLROnPlateau`
7. Save model to `models/lstm_model.h5`
8. Save scaler to `models/scaler.pkl`

---

## 🔢 Feature Engineering

The following features are auto-generated at prediction time:

| Feature      | Formula                          |
|-------------|----------------------------------|
| `Ir_diff`   | `Ir.diff()`                      |
| `Ir_mean`   | `Ir.rolling(5).mean()`           |
| `Ir_std`    | `Ir.rolling(5).std()`            |

These 3 derived features are combined with the 5 raw features for a total of **8 input features** per time step.

---

## 🧪 Testing the API

```bash
python test_api.py
```

---

## 📊 Dataset

- **File:** `data/realistic_electricity_dataset.csv`
- **Size:** ~800KB
- **Content:** Time-series electrical sensor readings with labeled theft/normal events
- **Label column:** Binary — `0` (normal), `1` (theft)
