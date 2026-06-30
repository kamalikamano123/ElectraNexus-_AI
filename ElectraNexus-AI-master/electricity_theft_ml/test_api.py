import requests
import pandas as pd

# Load sample data
df = pd.read_csv("data/realistic_electricity_dataset.csv").tail(80)

data = df[["Ir", "RMS", "Peak", "Variance", "Harmonics"]].to_dict(orient="records")

response = requests.post(
    "http://127.0.0.1:5000/predict",
    json=data
)

print(response.json())