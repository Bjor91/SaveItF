import React from "react";

/*Responsible for producing progressbars based on negative transactions*/

function ExpenseIncomeProgressbars({
  showExpenses,
  setShowExpenses,
  sortTransactions,
  negativeTransactionTotals,
  setSelectedCategory,
  currentOwnerCurrency,
  ARBITRARY_GOAL,
}) {
  return (
    <div className="negative-progress-bars-container">
      <h3>
        {" "}
        <button onClick={() => setShowExpenses(!showExpenses)}>
          {showExpenses ? "Hide" : "Show"} Expenses:
        </button>
      </h3>
      <div className="progress-bars-container">
        {showExpenses &&
          sortTransactions(
            Object.entries(negativeTransactionTotals).map(
              ([description, totalAmount]) => ({
                description,
                totalAmount,
              })
            ),
            true
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
                    width: `${(Math.abs(totalAmount) / ARBITRARY_GOAL) * 100}%`,
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

export default ExpenseIncomeProgressbars;
