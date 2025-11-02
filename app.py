# app.py
# Flask Backend for Titanic Survival Prediction

from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)

# Load the trained model
try:
    model = joblib.load('titanic_model.pkl')
    print("✅ Model loaded successfully!")
except:
    print("❌ Error: titanic_model.pkl not found. Run train_model.py first.")
    model = None


@app.route('/health')
def health():
    return jsonify({'status': 'connected', 'model_loaded': model is not None})


@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 503
    
    try:
        data = request.json
        
        # Create input DataFrame
        input_df = pd.DataFrame([{
            'Pclass': int(data['Pclass']),
            'Sex': 0 if data['Sex'].lower() == 'female' else 1,
            'Age': float(data['Age']),
            'SibSp': int(data['SibSp']),
            'Parch': int(data['Parch']),
            'Fare': float(data['Fare']),
            'Embarked': {'C': 0, 'Q': 1, 'S': 2}.get(data['Embarked'].upper(), 2)
        }])
        
        # Make prediction
        prediction = model.predict(input_df)[0]
        probabilities = model.predict_proba(input_df)[0]
        
        # Prepare response
        response = {
            'prediction': "Survived ✅" if prediction == 1 else "Did Not Survive ❌",
            'survived': bool(prediction == 1),
            'survival_probability': round(float(probabilities[1]), 4),
            'death_probability': round(float(probabilities[0]), 4),
            'confidence': round(float(max(probabilities)), 4),
            'input_data': {
                'class': f"{'1st' if data['Pclass'] == '1' else '2nd' if data['Pclass'] == '2' else '3rd'} Class",
                'gender': data['Sex'],
                'age': float(data['Age']),
                'family_size': int(data['SibSp']) + int(data['Parch']) + 1,
                'fare': float(data['Fare']),
                'embarked': data['Embarked']
            }
        }
        
        return jsonify(response)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    print("\n🚢 Titanic Survival Prediction API")
    print("🌐 Server: http://localhost:5000")
    print("✅ Ready to receive predictions\n")
    
    app.run(debug=True, port=5000)