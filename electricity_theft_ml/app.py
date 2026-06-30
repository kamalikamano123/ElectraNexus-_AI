from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from tensorflow.keras.models import load_model
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ==============================
# Load model and scaler
# ==============================
model = load_model("models/lstm_model.h5")
scaler = joblib.load("models/scaler.pkl")

WINDOW_SIZE = 80

# 🔥 STORE REAL-TIME DATA HERE
latest_data = []

# ==============================
# Home route
# ==============================
@app.route("/")
def home():
    return "✅ Electricity Theft Detection API is running"

# ==============================
# 🔥 LIVE DATA (NOW REAL DATA)
# ==============================
@app.route("/live-data", methods=["GET"])
def live_data():
    return jsonify(latest_data)

# ==============================
# Feature Engineering
# ==============================
def create_features(df):
    df["Ir_diff"] = df["Ir"].diff().fillna(0)
    df["Ir_mean"] = df["Ir"].rolling(5).mean().fillna(0)
    df["Ir_std"] = df["Ir"].rolling(5).std().fillna(0)
    return df

# ==============================
# Sequence creation
# ==============================
def create_sequence(data):
    return np.array([data[-WINDOW_SIZE:]])

# ==============================
# Decision Logic
# ==============================
def decision_logic(prob, Ir):

    # 🔥 SIMPLIFIED (MODEL-BASED)
    if prob > 0.8:
        return "🚨 Unauthorized Tapping"

    elif prob > 0.6:
        return "⚠️ Suspicious Activity"

    else:
        return "✅ Normal"

# ==============================
# Prediction Endpoint
# ==============================
@app.route("/predict", methods=["POST"])
def predict():
    global latest_data   # 🔥 IMPORTANT

    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "No input data provided"}), 400

        # 🔥 STORE DATA FOR FRONTEND
        latest_data = data

        df = pd.DataFrame(data)

        required_cols = ["Ir", "RMS", "Peak", "Variance", "Harmonics"]
        for col in required_cols:
            if col not in df.columns:
                return jsonify({"error": f"Missing column: {col}"}), 400

        if len(df) < WINDOW_SIZE:
            return jsonify({
                "error": f"Minimum {WINDOW_SIZE} data points required"
            }), 400

        df = create_features(df)

        features = [
            "Ir", "Ir_diff", "Ir_mean", "Ir_std",
            "RMS", "Variance", "Peak", "Harmonics"
        ]

        X = df[features].values
        X_scaled = scaler.transform(X)
        X_seq = create_sequence(X_scaled)

        prob = float(model.predict(X_seq)[0][0])
        latest_Ir = float(df["Ir"].iloc[-1])

        result = decision_logic(prob, latest_Ir)

        return jsonify({
            "probability": prob,
            "Ir": latest_Ir,
            "result": result
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ==============================
# Run server
# ==============================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)