import React from "react";

function IncomeProgressBars({
  showIncome,
  setShowIncome,
  positiveTransactionTotals,
  setSelectedCategory,
  ARBITRARY_GOAL,
  currentOwnerCurrency,
  sortTransactions, // ensure you pass this function as prop, or define it within this component if it's not dependent on the outer state
}) {
  return (
    <div className="positive-progress-bars-container">
      <h3>
        <button onClick={() => setShowIncome(!showIncome)}>
          {showIncome ? "Hide" : "Show"} Income:
        </button>
      </h3>
      <div className="progress-bars-container">
        {showIncome &&
          sortTransactions(
            Object.entries(positiveTransactionTotals).map(
              ([description, totalAmount]) => ({
                description,
                totalAmount,
              })
            )
          ).map(({ description, totalAmount }) => (
            <div
              key={description}
              className="progress-bar-item"
              onClick={() => setSelectedCategory(description)}
            >
              <p className="description-label"> {description}</p>
              <div className="progress-bar">
                <div
                  className={`progress-fill ${
                    totalAmount < 0 ? "negative" : "positive"
                  }`}
                  style={{
                    width: `${(totalAmount / ARBITRARY_GOAL) * 100}%`,
                  }}
                />
              </div>
              <p className="total-amount">
                {totalAmount.toFixed(2)} {currentOwnerCurrency}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default IncomeProgressBars;
