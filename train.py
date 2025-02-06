import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import joblib
from sklearn import datasets

# Load Diabetes Dataset
diabetes = datasets.load_diabetes()
X = diabetes.data
y = diabetes.target  # This represents the progression of diabetes after one year.

# Convert to DataFrame
columns = diabetes.feature_names
df = pd.DataFrame(X, columns=columns)
df["Target"] = y

# Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(df.drop("Target", axis=1), df["Target"], test_size=0.2, random_state=42)

# Train Linear Regression Model
model = LinearRegression()
model.fit(X_train, y_train)

# Save the Model
joblib.dump(model, "diabetes_model.pkl")

print("Diabetes Model Trained and Saved!")
