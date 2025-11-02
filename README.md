# 🚢 Titanic Survival Predictor - ML + Flask + React

A complete machine learning application that predicts Titanic passenger survival. Features a trained ML model served via Flask API with a responsive React frontend.

---

## 📋 Quick Overview

| Component | Technology | Port |
|-----------|-----------|------|
| **Model** | Scikit-Learn (Random Forest) | - |
| **Backend** | Python Flask + CORS | 5000 |
| **Frontend** | React + Vite | 5173 |
| **Model Storage** | Joblib (.pkl file) | - |

---

## 🚀 Quick Start (3 Steps)

### Step 1️⃣ Clone & Setup Backend

```bash
# Clone repository
https://github.com/kartikshingde/ML_Mini_Project.git


# Create virtual environment
python3 -m venv venv

# Activate virtual environment

# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run Flask backend
python app.py
```

✅ **Backend running at:** `http://localhost:5000`  
*(Keep this terminal open)*

---

### Step 2️⃣ Setup Frontend

Open a **new terminal** in the same project folder:

```bash
cd frontend
npm install
npm run dev
```

✅ **Frontend running at:** `http://localhost:5173`

---

### Step 3️⃣ Open Browser

Go to `http://localhost:5173` and start predicting! 🎯

---

## 📁 Project Structure

```
titanic-ml-project/
├── app.py                      # Flask backend
├── titanic_model.pkl           # Trained ML model (Required!)
├── requirements.txt            # Python dependencies
├── train_model.py              # Model training script
├── README.md
└── frontend/
    ├── src/
    │   ├── App.jsx             # Main React component
    │   ├── App.css             # Responsive styling
    │   └── main.jsx
    ├── package.json
    ├── vite.config.js
    └── index.html
```

---

## ⚠️ Required Files

Before running, make sure these files exist in the **root folder**:

- ✅ `app.py` - Flask backend API
- ✅ `titanic_model.pkl` - Trained ML model
- ✅ `requirements.txt` - Python dependencies
- ✅ `train.csv` - Training dataset (for model training)

**If `titanic_model.pkl` is missing:**
```bash
python train_model.py
```

---

## 📦 Backend Requirements

All dependencies are in `requirements.txt`:

```
flask==3.0.0
flask-cors==4.0.0
pandas==2.1.0
numpy==1.24.0
scikit-learn==1.3.0
joblib==1.3.0
gunicorn==21.0.0
```

**Install manually:**
```bash
pip install flask flask-cors pandas numpy scikit-learn joblib gunicorn
```

---

## 🔌 API Endpoints

### 1. Health Check
```http
GET /health
```
**Response:**
```json
{
  "status": "Backend is running ✅"
}
```

---

### 2. Predict Survival
```http
POST /predict
Content-Type: application/json
```

**Request Body:**
```json
{
  "Pclass": "3",
  "Sex": "male",
  "Age": "22",
  "SibSp": "1",
  "Parch": "0",
  "Fare": "7.25",
  "Embarked": "S"
}
```

**Response (Survived):**
```json
{
  "prediction": "Survived ✅",
  "probability": 0.78,
  "confidence": "78%"
}
```

**Response (Did Not Survive):**
```json
{
  "prediction": "Did Not Survive ❌",
  "probability": 0.65,
  "confidence": "65%"
}
```

---

## 📊 Input Parameters Explained

| Parameter | Description | Valid Values | Example |
|-----------|-------------|--------------|---------|
| **Pclass** | Passenger Class | 1, 2, or 3 | 1 (First Class) |
| **Sex** | Passenger Gender | male, female | male |
| **Age** | Passenger Age | 0-100 | 25 |
| **SibSp** | Siblings/Spouses Aboard | 0-8 | 1 |
| **Parch** | Parents/Children Aboard | 0-6 | 0 |
| **Fare** | Ticket Price | 0-500+ | 52.86 |
| **Embarked** | Port of Embarkation | C, Q, or S | S (Southampton) |

### Port Codes:
- **C** = Cherbourg
- **Q** = Queenstown
- **S** = Southampton

---

## 🧠 Model Information

- **Algorithm**: Random Forest Classifier
- **Trees**: 100
- **Training Data**: 891 passengers
- **Features Used**: 7
- **Accuracy**: ~84%
- **Output**: Survival prediction + confidence score

---

## 🎨 Frontend Features

✅ Responsive design (mobile, tablet, desktop)  
✅ Real-time backend connection status  
✅ Manual form input for predictions  
✅ Quick example buttons (Rose, Jack, Child)  
✅ Beautiful UI with animations  
✅ Clean, professional styling (pure CSS)  

---

## 🛠️ Troubleshooting

### ❌ "Module not found" Error

**Solution:**
```bash
pip install -r requirements.txt
```

Or install manually:
```bash
pip install flask flask-cors pandas numpy scikit-learn joblib
```

---

### ❌ "titanic_model.pkl not found"

**Solution:** Train the model first:
```bash
python train_model.py
```

This creates the model file in the root folder.

---

### ❌ Backend not connecting (Red dot on frontend)

**Checklist:**
1. Is Flask running? (Terminal shows "Running on http://127.0.0.1:5000")
2. Try refreshing the browser (Ctrl+R or Cmd+R)
3. Check if port 5000 is available (see below)

---

### ❌ Port 5000 Already in Use

**Solution:** Change Flask port in `app.py`:
```python
if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Use 5001 instead
```

Then access backend at: `http://localhost:5001`

---

### ❌ Port 5173 Already in Use

**Solution:** Vite will auto-assign a new port. Check terminal for the new address.

---

### ❌ Virtual Environment Not Activating

**Windows:**
```bash
venv\Scripts\activate
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

If still not working:
```bash
python -m venv venv
# Then activate again
```

---

### ❌ npm: command not found

**Solution:** Install Node.js from [nodejs.org](https://nodejs.org/)

Then verify:
```bash
node --version
npm --version
```

---

## 📝 Testing with cURL

Test the API endpoints without frontend:

```bash
# Test health endpoint
curl http://localhost:5000/health

# Test prediction
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "Pclass": "1",
    "Sex": "female",
    "Age": "25",
    "SibSp": "0",
    "Parch": "0",
    "Fare": "100",
    "Embarked": "S"
  }'
```

---

## 🚀 Running Everything (Terminal Commands)

**Terminal 1 - Train Model (One-time only):**
```bash
python train_model.py
```

**Terminal 2 - Start Backend:**
```bash
source venv/bin/activate  # macOS/Linux
python app.py
# Windows: venv\Scripts\activate
```

**Terminal 3 - Start Frontend:**
```bash
cd frontend
npm run dev
```

**Browser:**
```
http://localhost:5173
```

---

## 💻 System Requirements

- **Python**: 3.7 or higher
- **Node.js**: 14.0 or higher
- **Disk Space**: ~500MB (for node_modules + Python packages)
- **RAM**: 2GB minimum (4GB recommended)
- **Internet**: Required for npm/pip setup (first-time only)

---

## 📖 How the Application Works

```
┌─────────────────────┐
│   React Frontend    │
│  (Localhost:5173)   │
└──────────┬──────────┘
           │
      Form Input
           │
           ▼
┌─────────────────────┐
│  Flask Backend      │
│  (Localhost:5000)   │
└──────────┬──────────┘
           │
  Process Data
           │
           ▼
┌─────────────────────┐
│  ML Model (.pkl)    │
│  (Random Forest)    │
└──────────┬──────────┘
           │
    Make Prediction
           │
           ▼
┌─────────────────────┐
│  Return Result      │
│  Survived/Not + %   │
└─────────────────────┘
```

---

## 📚 File Descriptions

### `app.py`
Flask backend with two main endpoints:
- `/health` - Status check
- `/predict` - Makes ML predictions

### `titanic_model.pkl`
Pre-trained Random Forest model loaded with joblib. Created by `train_model.py`.

### `train_model.py`
Trains the ML model from CSV data and saves it as `titanic_model.pkl`.

### `frontend/src/App.jsx`
Main React component with:
- Form for passenger data input
- Backend connection status
- Prediction display
- Example buttons for quick testing

### `frontend/src/App.css`
Responsive CSS styling (no frameworks):
- Mobile-first design
- Tablet optimization
- Desktop layout
- Smooth animations

---

## 🎓 Learning Resources

- **Flask Docs**: [flask.palletsprojects.com](https://flask.palletsprojects.com/)
- **React Docs**: [react.dev](https://react.dev/)
- **Vite Docs**: [vitejs.dev](https://vitejs.dev/)
- **Scikit-Learn**: [scikit-learn.org](https://scikit-learn.org/)
- **Titanic Dataset**: [kaggle.com/c/titanic](https://www.kaggle.com/c/titanic)

---

## 🚢 Example Predictions

### Rose - First Class Female (High Survival)
```json
{
  "Pclass": "1",
  "Sex": "female",
  "Age": "17",
  "SibSp": "1",
  "Parch": "1",
  "Fare": "71.28",
  "Embarked": "S"
}
```
**Result:** Survived ✅ (90% confidence)

---

### Jack - Third Class Male (Low Survival)
```json
{
  "Pclass": "3",
  "Sex": "male",
  "Age": "20",
  "SibSp": "0",
  "Parch": "0",
  "Fare": "7.75",
  "Embarked": "S"
}
```
**Result:** Did Not Survive ❌ (72% confidence)

---


## 🐛 Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| "Connection refused" | Flask not running | Run `python app.py` |
| "ModuleNotFoundError" | Missing dependencies | Run `pip install -r requirements.txt` |
| "Port already in use" | Another app using port | Change port in app.py or frontend config |
| "Model not found" | Missing .pkl file | Run `python train_model.py` |
| Frontend shows red dot | Backend unreachable | Check Flask is running on port 5000 |

---



## ✨ What's Next?

- 🎨 Customize the UI
- 📊 Add more features/visualization
- 🌍 Deploy to production
- 🔧 Improve model accuracy
- 📱 Add mobile app
- 🤖 Experiment with other ML algorithms

---

## 📝 Notes

- Keep both Flask and React terminals open while using the app
- Default form fields are empty (user fills in data)
- All 7 features are required for prediction
- Model predictions based on historical Titanic data

---

## ⭐ You're All Set!

Follow the **Quick Start** section above and you'll be predicting Titanic survival in minutes! 🎉

**Questions?** Check the **Troubleshooting** section or refer to the learning resources above.

Happy coding! 🚀
