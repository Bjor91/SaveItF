import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import { months, years, keywordToCategoryMapping } from "./config";

import "react-circular-progressbar/dist/styles.css";
//importing modules
import yourImage from "./assets/images/53046423664_b63955243d_6k.jpg";
import Header from "./components/1. Header component/Header";
import AccountButtonsContainer from "./components/1. Header component/AccountButtonsContainer";
import SavingsGoalCard from "./components/2. Content component/SavingsGoalCard";
import Footer from "./components/3. Footer component/Footer component";
import TransactionDropdown from "./components/2. Content component/transActionDropdown";
import ExpenseIncomeProgressbars from "./components/2. Content component/Expenses and Income visuals/ExpenseIncomeProgressbars";
import { fetchTransactions } from "./components/4. Utility component/fetchTransactions";
import { fetchAccounts } from "./components/4. Utility component/fetchAccounts";
import { handleIsScrollable } from "./components/4. Utility component/handleIsScrollable";
import DreamImage from "./components/2. Content component/DreamImage/DreamImage";

const ARBITRARY_GOAL = 20000;

function App({ savingsGoal, purpose }) {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [accountId, setAccountId] = useState("brukskonto");
  const [accountData, setAccountData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [currentOwnerBalance, setCurrentOwnerBalance] = useState(0);
  const [currentOwnerCurrency, setCurrentOwnerCurrency] = useState("NOK");
  const [showTransactions, setShowTransactions] = useState(false);
  const [showSavingsGoal, setShowSavingsGoal] = useState(false);
  const [currentAccountType, setCurrentAccountType] = useState("Savings");
  const [negativeTransactionTotals, setNegativeTransactionTotals] = useState(
    {}
  );
  const [positiveTransactionTotals, setPositiveTransactionTotals] = useState(
    {}
  );
  const [isScrollable, setIsScrollable] = useState(false);
  const [showIncome, setShowIncome] = useState(false);
  const [showExpenses, setShowExpenses] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const sortTransactions = (transactions, ascending = false) => {
    return transactions.slice().sort((a, b) => {
      if (ascending) {
        return a.totalAmount - b.totalAmount;
      } else {
        return b.totalAmount - a.totalAmount;
      }
    });
  };
  const progressPercentage = (currentOwnerBalance / savingsGoal) * 100;
  const toggleShowTransactions = () => {
    setShowTransactions(!showTransactions);
  };

  //useEffect hooks
  useEffect(() => {
    handleIsScrollable(setIsScrollable);
  }, []);

  useEffect(() => {
    fetchAccounts(setAccountData);
  }, []);

  useEffect(() => {
    fetchTransactions(
      accountId,
      selectedMonth,
      setTransactionData,
      setPositiveTransactionTotals,
      setNegativeTransactionTotals,
      keywordToCategoryMapping
    );
  }, [accountId, selectedMonth]);

  //set constants for account data
  const handleSetConstant = (
    newAccountId,
    balance,
    currency,
    name,
    accountType
  ) => {
    setAccountId(newAccountId);
    setCurrentOwnerBalance(balance);
    setCurrentOwnerCurrency(currency);
    setCurrentAccountType(accountType);
    setIsButtonClicked(true);
    if (accountType === "Savings") {
      setShowSavingsGoal(true);
    } else {
      setShowSavingsGoal(false);
    }
    console.log(selectedMonth);
    console.log(selectedYear);
  };
  return (
    <>
      <AccountButtonsContainer
        accountData={accountData}
        handleSetConstant={handleSetConstant}
      />
      <Header />

      {isButtonClicked && (
        <div>
          <div className="card">
            <h2>
              {currentAccountType} balance: {currentOwnerBalance}{" "}
              {currentOwnerCurrency}
            </h2>
          </div>
          {showSavingsGoal && (
            <div className="app-container">
              <DreamImage goal={purpose} />
              <SavingsGoalCard
                savingsGoal={savingsGoal}
                progressPercentage={progressPercentage}
                currentOwnerCurrency={currentOwnerCurrency}
                purpose={purpose}
              />
            </div>
          )}

          <ExpenseIncomeProgressbars
            showExpenses={showExpenses}
            setShowExpenses={setShowExpenses}
            setShowIncome={setShowIncome}
            showIncome={showIncome}
            sortTransactions={sortTransactions}
            negativeTransactionTotals={negativeTransactionTotals}
            positiveTransactionTotals={positiveTransactionTotals}
            setSelectedCategory={setSelectedCategory}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            currentOwnerCurrency={currentOwnerCurrency}
            months={months}
            years={years}
            ARBITRARY_GOAL={ARBITRARY_GOAL}
          />

          <div>
            <TransactionDropdown
              showTransactions={showTransactions}
              toggleShowTransactions={toggleShowTransactions}
              transactionData={transactionData}
              selectedCategory={selectedCategory}
              keywordToCategoryMapping={keywordToCategoryMapping}
              showExpenses={showExpenses}
              showIncome={showIncome}
            />
          </div>
        </div>
      )}

      <img src={yourImage} alt="Example Image" width="900" />
      <Footer />
    </>
  );
}
export default App;
