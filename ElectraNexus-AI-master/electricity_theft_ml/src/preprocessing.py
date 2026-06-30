import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler


def load_data(path):
    df = pd.read_csv(path)

    # 🔥 Temporal features
    df["Ir_diff"] = df["Ir"].diff().fillna(0)

    # 🔥 Rolling features (VERY IMPORTANT)
    df["Ir_mean"] = df["Ir"].rolling(window=5).mean().fillna(0)
    df["Ir_std"] = df["Ir"].rolling(window=5).std().fillna(0)

    # 🔍 Check class balance
    print("\nClass Distribution:")
    print(df["Label"].value_counts())

    return df


def preprocess(df):
    # 🔥 Final strong feature set
    features = [
        "Ir", "Ir_diff", "Ir_mean", "Ir_std",
        "RMS", "Variance", "Peak", "Harmonics"
    ]

    X = df[features].values
    y = df["Label"].values

    scaler = MinMaxScaler()
    X_scaled = scaler.fit_transform(X)

    return X_scaled, y, scaler


def create_sequences(X, y, window_size=80):
    X_seq, y_seq = [], []

    for i in range(len(X) - window_size):
        X_seq.append(X[i:i+window_size])
        y_seq.append(y[i+window_size])

    return np.array(X_seq), np.array(y_seq)


if __name__ == "__main__":
    df = load_data("../data/realistic_electricity_dataset.csv")

    X, y, scaler = preprocess(df)

    X_seq, y_seq = create_sequences(X, y)

    print("\nSequence shape:", X_seq.shape)
    print("Labels shape:", y_seq.shape)