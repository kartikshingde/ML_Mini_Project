// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    Pclass: '3',
    Sex: 'male',
    Age: '22',
    SibSp: '0',
    Parch: '0',
    Fare: '7.25',
    Embarked: 'S'
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/health')
      .then(res => res.ok && setConnected(true))
      .catch(() => setConnected(false));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setPrediction(data);
      setConnected(true);
    } catch (error) {
      setConnected(false);
      alert('❌ Backend not connected!\n\nRun: python app.py');
    }
    setLoading(false);
  };

  const examples = [
    { name: "Rose", Pclass: '1', Sex: 'female', Age: '17', SibSp: '0', Parch: '2', Fare: '80', Embarked: 'S' },
    { name: "Jack", Pclass: '3', Sex: 'male', Age: '20', SibSp: '0', Parch: '0', Fare: '7.25', Embarked: 'S' },
    { name: "Child", Pclass: '2', Sex: 'male', Age: '8', SibSp: '1', Parch: '2', Fare: '20', Embarked: 'S' }
  ];

  return (
    <div className="app-container">
      <div className="app-wrapper">
        
        {/* Header */}
        <header className="header">
          <h1 className="header-title">🚢 Titanic Survival Predictor</h1>
          <p className="header-subtitle">Machine Learning Prediction System</p>
          <div className={`status-badge ${connected ? 'connected' : 'disconnected'}`}>
            <span className="status-dot"></span>
            <span className="status-text">Backend: {connected ? 'Connected' : 'Disconnected'}</span>
          </div>
        </header>

        {/* Main Content */}
        <div className="main-grid">
          
          {/* Form Section */}
          <div className="form-card">
            <h2 className="form-title">Passenger Information</h2>
            
            <div className="form-content">
              <div className="form-group">
                <label className="form-label">Passenger Class</label>
                <select 
                  name="Pclass" 
                  value={formData.Pclass} 
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="1">1st Class</option>
                  <option value="2">2nd Class</option>
                  <option value="3">3rd Class</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Gender</label>
                <div className="gender-buttons">
                  <button 
                    type="button" 
                    onClick={() => setFormData({...formData, Sex: 'male'})}
                    className={`gender-btn ${formData.Sex === 'male' ? 'active male' : ''}`}
                  >
                    👨 Male
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setFormData({...formData, Sex: 'female'})}
                    className={`gender-btn ${formData.Sex === 'female' ? 'active female' : ''}`}
                  >
                    👩 Female
                  </button>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Age</label>
                  <input 
                    type="number" 
                    name="Age" 
                    value={formData.Age} 
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Fare (£)</label>
                  <input 
                    type="number" 
                    name="Fare" 
                    value={formData.Fare} 
                    onChange={handleChange} 
                    step="0.01"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Siblings/Spouses</label>
                  <input 
                    type="number" 
                    name="SibSp" 
                    value={formData.SibSp} 
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Parents/Children</label>
                  <input 
                    type="number" 
                    name="Parch" 
                    value={formData.Parch} 
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Port of Embarkation</label>
                <select 
                  name="Embarked" 
                  value={formData.Embarked} 
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="C">Cherbourg</option>
                  <option value="Q">Queenstown</option>
                  <option value="S">Southampton</option>
                </select>
              </div>

              <button 
                onClick={handlePredict} 
                disabled={loading}
                className="predict-btn"
              >
                {loading ? '🔄 Predicting...' : '🚢 Predict Survival'}
              </button>

              <div className="examples-section">
                <p className="examples-label">Try Examples:</p>
                <div className="examples-buttons">
                  {examples.map((ex, i) => (
                    <button 
                      key={i} 
                      onClick={() => { setFormData(ex); setPrediction(null); }}
                      className="example-btn"
                    >
                      {ex.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="results-section">
            {prediction && (
              <div className={`result-card ${prediction.survived ? 'survived' : 'died'}`}>
                <div className="result-content">
                  <div className="result-icon">{prediction.survived ? '✅' : '❌'}</div>
                  <h2 className="result-title">{prediction.prediction}</h2>
                  
                  <div className="probability-box">
                    <div className="prob-label">Survival Probability</div>
                    <div className="prob-value">{(prediction.survival_probability * 100).toFixed(1)}%</div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{width: `${prediction.survival_probability * 100}%`}}
                      ></div>
                    </div>
                  </div>

                  <div className="details-grid">
                    <div className="detail-item">
                      <div className="detail-label">Confidence</div>
                      <div className="detail-value">{(prediction.confidence * 100).toFixed(1)}%</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Class</div>
                      <div className="detail-value">{prediction.input_data.class}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Gender</div>
                      <div className="detail-value">{prediction.input_data.gender}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Age</div>
                      <div className="detail-value">{prediction.input_data.age} yrs</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Family Size</div>
                      <div className="detail-value">{prediction.input_data.family_size}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Fare</div>
                      <div className="detail-value">£{prediction.input_data.fare}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="info-card">
              <h3 className="info-title">📊 Model Information</h3>
              <div className="info-content">
                <div className="info-item">
                  <span className="info-label">Algorithm</span>
                  <span className="info-value">Random Forest</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Dataset</span>
                  <span className="info-value">Titanic (Kaggle)</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Accuracy</span>
                  <span className="info-value">~83%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;