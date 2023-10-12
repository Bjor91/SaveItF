import React from "react";

/*module responsible for showing the transactions in the dropdown. 
Sorts the transactions by date and category if wanted. */

function TransactionDropdown({
  showTransactions,
  toggleShowTransactions,
  transactionData,
  selectedCategory,
  keywordToCategoryMapping,
  showExpenses,
  showIncome,
}) {
  return (
    <div className="transaction-dropdown">
      <button onClick={toggleShowTransactions}>
        {showTransactions
          ? "Hide Recent Transactions"
          : "Show Recent Transactions"}
      </button>
      {showTransactions && (
        <div className="selected-category-transactions">
          <h3>Transactions{selectedCategory && ` for ${selectedCategory}`}</h3>
          <ul>
            {transactionData
              .filter((transaction) => {
                if (!selectedCategory) {
                  return true;
                } else if (selectedCategory === "other") {
                  for (let keyword in keywordToCategoryMapping) {
                    if (
                      transaction.description.toLowerCase().includes(keyword)
                    ) {
                      return false;
                    }
                  }
                  return true;
                } else {
                  for (let keyword in keywordToCategoryMapping) {
                    if (
                      transaction.description.toLowerCase().includes(keyword) &&
                      keywordToCategoryMapping[keyword] === selectedCategory
                    ) {
                      return true;
                    }
                  }
                  return false;
                }
              })
              .map((transaction) => (
                <li key={transaction.id}>
                  {transaction.date}, {transaction.description},{" "}
                  {transaction.amount}, {transaction.currency}
                </li>
              ))}
            {((selectedCategory === "Other Expenses" && showExpenses) ||
              (selectedCategory === "Other Income" && showIncome)) &&
              transactionData
                .filter((transaction) => {
                  let category = null;
                  // Check if any keyword matches the transaction description
                  for (let keyword in keywordToCategoryMapping) {
                    if (
                      transaction.description.toLowerCase().includes(keyword)
                    ) {
                      category = keywordToCategoryMapping[keyword];
                      break;
                    }
                  }
                  // If no keyword matches, categorize as "Other Income" or "Other Expenses" based on the transaction amount
                  if (!category) {
                    category =
                      transaction.amount >= 0
                        ? "Other Income"
                        : "Other Expenses";
                  }
                  return category === selectedCategory;
                })
                .map((transaction) => (
                  <li key={transaction.id}>
                    {transaction.date}, {transaction.description},{" "}
                    {transaction.amount}, {transaction.currency}
                  </li>
                ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TransactionDropdown;
