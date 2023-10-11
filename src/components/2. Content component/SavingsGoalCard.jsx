import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";

const SavingsGoalCard = ({
  savingsGoal,
  progressPercentage,
  currentOwnerCurrency,
  purpose,
}) => {
  return (
    <div className="goal-card">
      <h2>Savings Goal</h2>
      <p>
         {savingsGoal} {currentOwnerCurrency} for {purpose}
      </p>
      <div className="progress-circle">
        <CircularProgressbar
          value={progressPercentage}
          text={`${progressPercentage.toFixed(0)}%`}
          strokeWidth={10}
          styles={{
            root: { width: "200px", height: "200px" },
          }}
        />
      </div>
    </div>
  );
};

export default SavingsGoalCard;
