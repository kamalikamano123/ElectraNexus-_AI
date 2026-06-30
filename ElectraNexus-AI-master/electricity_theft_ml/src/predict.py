import numpy as np
import pandas as pd
from tensorflow.keras.models import load_model
import joblib


# 🔥 Load trained model
model = load_model("../models/lstm_model.h5")


# 🔥 Load scaler (IMPORTANT)
# You must save scaler once during training
# For now, assume you saved it as scaler.pkl
scaler = joblib.load("../models/scaler.pkl")


# 🔧 Feature creation (same as training)
def create_features(df):
    df["Ir_diff"] = df["Ir"].diff().fillna(0)
    df["Ir_mean"] = df["Ir"].rolling(5).mean().fillna(0)
    df["Ir_std"] = df["Ir"].rolling(5).std().fillna(0)
    return df


# 🔧 Convert to sequence
def create_sequence(data, window_size=80):
    return np.array([data[-window_size:]])


# 🚨 REAL-TIME PREDICTION FUNCTION
def predict_realtime(input_df):

    df = create_features(input_df)

    features = [
        "Ir", "Ir_diff", "Ir_mean", "Ir_std",
        "RMS", "Variance", "Peak", "Harmonics"
    ]

    X = df[features].values

    # Scale
    X_scaled = scaler.transform(X)

    # Sequence
    X_seq = create_sequence(X_scaled)

    # Predict
    prob = model.predict(X_seq)[0][0]

    return prob


# 🔥 DECISION LOGIC (FINAL SYSTEM)
def decision(prob, Ir):

    if (Ir > 0.1) and (prob > 0.6):
        return "🚨 Unauthorized Tapping"

    elif (Ir > 0.05) and (prob > 0.5):
        return "⚠️ Suspicious Activity"

    else:
        return "✅ Normal"


# 🧪 TEST (simulate real-time input)
if __name__ == "__main__":

    # simulate incoming data (last 80 readings)
    df = pd.read_csv("../data/realistic_electricity_dataset.csv").tail(80)

    prob = predict_realtime(df)

    latest_Ir = df["Ir"].iloc[-1]

    result = decision(prob, latest_Ir)

    print("\nPrediction Probability:", prob)
    print("Residual Current:", latest_Ir)
    print("Final Decision:", result)