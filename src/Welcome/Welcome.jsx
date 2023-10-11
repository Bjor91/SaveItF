import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

import Correlation from "./Correlation";

function Welcome({ savingsGoal, setSavingsGoal, purpose, setPurpose }) {
  const navigate = useNavigate();
  const [goal, setGoal] = useState(savingsGoal);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const startTimer = () => {
    setLoading(true);
    setMessage("Fetching data from your bank...");

    setTimeout(() => {
      setLoading(false);
      setMessage("");
      navigate("/app");
    }, 10000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (goal && !isNaN(goal)) {
      setSavingsGoal(Number(goal));
      setPurpose(purpose);
      startTimer();
    } else {
      alert("Please enter a valid number");
    }
  };
  return (
    <div className="welcome-container">
      <h1 className="logo">SaveIt</h1>
      <p className="welcome-text">
        Please enter what you are saving for and your savings goal:
      </p>
      <form onSubmit={handleSubmit} className="goal-form">
        <div className="inputs-container">
          <input
            type="text"
            placeholder="What are you saving for?"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="purpose-input"
          />
          <input
            type="number"
            placeholder="Enter goal amount"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="goal-input"
          />
        </div>
        <button type="submit" className="goal-button" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>

      {loading && (
        <div className="loading-overlay">
          <div className="spinner-message-container">
            <div className="loading-spinner"></div>
            <div className={`loading-message ${loading ? "visible" : ""}`}>
              {message}
            </div>
          </div>
          <Correlation />
        </div>
      )}
    </div>
  );
}

export default Welcome;
