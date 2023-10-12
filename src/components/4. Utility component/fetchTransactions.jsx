import axios from "axios";

//handles fetching transactions from the backend

export const fetchTransactions = async (
  accountId,
  selectedMonth,
  setTransactionData,
  setPositiveTransactionTotals,
  setNegativeTransactionTotals,
  keywordToCategoryMapping
) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/accounts/${accountId}/withTransactions`
    );
    if (response.data && response.data.transactions) {
      let filteredTransactions = response.data.transactions;
      if (selectedMonth) {
        filteredTransactions = filteredTransactions.filter((transaction) => {
          const month = transaction.date.split(".")[1];
          return month === selectedMonth;
        });
      }

      setTransactionData(filteredTransactions);
      const positiveTotals = {};
      const negativeTotals = {};
      filteredTransactions.forEach((transaction) => {
        // If no keyword matches, categorize as "Other Income" or "Other Expenses" based on the transaction amount
        let category = null;
        for (let keyword in keywordToCategoryMapping) {
          if (transaction.description.toLowerCase().includes(keyword)) {
            category = keywordToCategoryMapping[keyword];
            break;
          }
        }
        // If no keyword matches, categorize as "Other Income" or "Other Expenses" based on the transaction amount
        if (!category) {
          category =
            transaction.amount >= 0 ? "Other Income" : "Other Expenses";
        }
        // Add the transaction amount to the respective totals dictionary based on the transaction amount
        if (transaction.amount >= 0) {
          positiveTotals[category] =
            (positiveTotals[category] || 0) + transaction.amount;
        } else {
          negativeTotals[category] =
            (negativeTotals[category] || 0) + transaction.amount;
        }
      });

      setPositiveTransactionTotals(positiveTotals);
      setNegativeTransactionTotals(negativeTotals);
    }
  } catch (error) {
    console.error("Error fetching transactions", error);
  }
};
