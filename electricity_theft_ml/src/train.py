import os
import numpy as np
import joblib

from preprocessing import load_data, preprocess, create_sequences
from model import build_model

from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau
from sklearn.metrics import confusion_matrix, classification_report
from sklearn.utils import class_weight


# ==============================
# 1️⃣ Load data
# ==============================
df = load_data("../data/realistic_electricity_dataset.csv")


# ==============================
# 2️⃣ Preprocess
# ==============================
X, y, scaler = preprocess(df)


# ==============================
# 3️⃣ Create sequences
# ==============================
WINDOW_SIZE = 80
X_seq, y_seq = create_sequences(X, y, window_size=WINDOW_SIZE)


# ==============================
# 4️⃣ Time-based split
# ==============================
split = int(0.8 * len(X_seq))

X_train, X_test = X_seq[:split], X_seq[split:]
y_train, y_test = y_seq[:split], y_seq[split:]


# ==============================
# 5️⃣ Handle class imbalance
# ==============================
weights = class_weight.compute_class_weight(
    class_weight='balanced',
    classes=np.unique(y_train),
    y=y_train
)

class_weights = dict(enumerate(weights))

print("\nClass Weights:", class_weights)


# ==============================
# 6️⃣ Build model
# ==============================
model = build_model((X_train.shape[1], X_train.shape[2]))


# ==============================
# 7️⃣ Callbacks
# ==============================
early_stop = EarlyStopping(
    monitor='val_loss',
    patience=5,
    restore_best_weights=True
)

reduce_lr = ReduceLROnPlateau(
    monitor='val_loss',
    factor=0.5,
    patience=3
)


# ==============================
# 8️⃣ Train model
# ==============================
history = model.fit(
    X_train, y_train,
    epochs=30,
    batch_size=32,
    validation_data=(X_test, y_test),
    callbacks=[early_stop, reduce_lr],
    class_weight=class_weights
)


# ==============================
# 9️⃣ Evaluate
# ==============================
loss, acc = model.evaluate(X_test, y_test)
print(f"\nFinal Test Accuracy: {acc}")


# ==============================
# 🔟 Predictions
# ==============================
pred_probs = model.predict(X_test)

print("\nSample Prediction Probabilities:")
print(pred_probs[:10])


# ==============================
# 11️⃣ Threshold decision
# ==============================
THRESHOLD = 0.5
y_pred = (pred_probs > THRESHOLD).astype("int32")


# ==============================
# 12️⃣ Metrics
# ==============================
print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))

print("\nClassification Report:")
print(classification_report(y_test, y_pred))


# ==============================
# 13️⃣ Save everything (CRITICAL)
# ==============================
os.makedirs("../models", exist_ok=True)

# Save model
model.save("../models/lstm_model.h5")

# 🔥 Save scaler (VERY IMPORTANT for real-time)
joblib.dump(scaler, "../models/scaler.pkl")

print("\nModel + Scaler saved successfully.")