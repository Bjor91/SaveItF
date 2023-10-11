import React from "react";
import IncomeProgressBars from "./IncomeProgressbars";
import ExpenseProgressBars from "./ExpenseProgressBars";
import DateDropdown from "./DateDropdown";

function ExpenseIncomeProgressbars({
  showExpenses,
  showIncome,
  setShowExpenses,
  setShowIncome,
  sortTransactions,
  negativeTransactionTotals,
  positiveTransactionTotals,
  setSelectedCategory,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  currentOwnerCurrency,
  months,
  years,
  ARBITRARY_GOAL,
}) {
  return (
    <div className="side-by-side-container">
      <ExpenseProgressBars
        showExpenses={showExpenses}
        setShowExpenses={setShowExpenses}
        sortTransactions={sortTransactions}
        negativeTransactionTotals={negativeTransactionTotals}
        setSelectedCategory={setSelectedCategory}
        currentOwnerCurrency={currentOwnerCurrency}
        ARBITRARY_GOAL={ARBITRARY_GOAL}
      />
      <DateDropdown
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        months={months}
        years={years}
        showExpenses={showExpenses}
        showIncome={showIncome}
      />

      <IncomeProgressBars
        showIncome={showIncome}
        setShowIncome={setShowIncome}
        positiveTransactionTotals={positiveTransactionTotals}
        setSelectedCategory={setSelectedCategory}
        ARBITRARY_GOAL={ARBITRARY_GOAL}
        currentOwnerCurrency={currentOwnerCurrency}
        sortTransactions={sortTransactions}
      />
    </div>
  );
}
export default ExpenseIncomeProgressbars;
