import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Welcome from './Welcome.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'
import { useState } from 'react';

function Main() {
  const [savingsGoal, setSavingsGoal] = useState(20000);
  const [purpose, setPurpose] = useState('Economic security');

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <Welcome 
              savingsGoal={savingsGoal} 
              setSavingsGoal={setSavingsGoal} 
              purpose={purpose} 
              setPurpose={setPurpose}  // pass the setter for purpose 
            />
          } 
        />
        <Route 
          path="/app" 
          element={
            <App 
              savingsGoal={savingsGoal} 
              purpose={purpose}  // pass purpose to App
            />
          } 
        />
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
)
