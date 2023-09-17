import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import yourImage from "./assets/images/53046423664_b63955243d_6k.jpg";
import { Link } from "react-router-dom";

const ARBITRARY_GOAL = 20000;

function App({ savingsGoal, purpose }) {


  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const months = [
    "All Year",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = ["2020", "2021", "2022", "2023"];
  const [isScrollable, setIsScrollable] = useState(false);
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

  const [showIncome, setShowIncome] = useState(true);
  const [showExpenses, setShowExpenses] = useState(true);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [keywordToCategoryMapping, setKeywordToCategoryMapping] = useState({
    meny: "Dagligvare",
    narvesen: "Dagligvare",
    sammen: "Cafè",
    platou: "Sportsutstyr",
    "havn hjellestad": "Cafè",
    rema: "Dagligvare",
    coop: "Dagligvare",
    ica: "Dagligvare",
    bunnpris: "Dagligvare",
    kiwi: "Dagligvare",
    spar: "Dagligvare",
    felles: "Overføring til felleskonto",
    vipps: "Overføringer via Vipps",
    sport: "Sportsutstyr",
    gym: "Gym membership",
    outdoor: "Sportsutstyr",
    subscription: "Subscriptions",
    "redd barna": "Subscriptions",
    "apple.com": "Subscriptions",
    vinyl: "Spise/drikke ute",
    fjell: "Spise/drikke ute",
    skyss: "Kollektivtransport",
    "electronic arts": "Gaming",
    apotek: "Medisin",
    steam: "Gaming",
    zalando: "Klær",
    overføring: "Sparing ",
    kasse: "Lånekassen",
    valeri: "Spise/drikke ute",
    kino: "Kino",
    eleven: "Spise/drikke ute",
    dromedar: "cafè",
    fantofthallen: "Sportsutstyr",
    amazon: "Subscriptions",
    "coca-cola": "Spise/drikke ute",
    mcd: "Spise/drikke ute",
    faktura: "Faktura",
    tempo: "Spise/drikke ute",
    xxl: "Sportsutstyr",
    vinmonopolet: "Dagligvare",
    legal: "spise/drikke ute",
    stereo: "Spise/drikke ute",
    zettle: "Spise/drikke ute",
    "may sawai": "Ferie",
    trevarefabrikken: "Ferie",
    travel: "Ferie",
    svolvaer: "Ferie",
    point: "Ferie",
    "avis rent": "Ferie",
    kebab: "Spise/drikke ute",
    elbil: "Bil",
    mobil: "Telefon",
    ahlens: "Klær",
    cafe: "Cafè",
    systembolaget: "Ferie",
    "a days march": "Klær",
    "recharge sweden": "Bil",
    shell: "Bil",
    "fra meg til noen": "Overføring fra noen via vipps",
    "til meg fra noen": "Overføring til noen via vipps",
    chili: "Telefon",
    "fredrik & l": "Dagligvare",
    "baker brun": "cafè",
    hotel: "Ferie",
    ferie: "Ferie",
    elkjoep: "Elektronikk",
    espresso: "cafè",
    "hjelle bakeren": "cafè",

    // ... add more mappings as needed
  });
  const sortTransactions = (transactions, ascending = false) => {
    return transactions.slice().sort((a, b) => {
      if (ascending) {
        return a.totalAmount - b.totalAmount;
      } else {
        return b.totalAmount - a.totalAmount;
      }
    });
  };

  useEffect(() => {
    const container = document.querySelector(".progress-bars-container");
    if (container) {
      setIsScrollable(container.scrollHeight > container.clientHeight);
    }
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/accounts")
      .then((response) => {
        setAccountData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching accounts", error);
      });
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/accounts/${accountId}/withTransactions`
        );
        if (response.data && response.data.transactions) {
          setTransactionData(response.data.transactions);

          // Calculate positive and negative transaction totals
          const positiveTotals = {};
          const negativeTotals = {};
          response.data.transactions.forEach((transaction) => {
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
    fetchTransactions();
  }, [accountId]);

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
    console.log(accountType);
  };

  const progressPercentage = (currentOwnerBalance / savingsGoal) * 100;

  const toggleShowTransactions = () => {
    setShowTransactions(!showTransactions);
  };

  return (
    <>
      <div className="dateButtons"></div>
      <h1 className="logo">SaveIt</h1>

      <div className="button-container">
        {accountData.map((account) => (
          <button
            key={account.id}
            onClick={() =>
              handleSetConstant(
                account.id,
                account.balance,
                account.currency,
                account.owner,
                account.account_type
              )
            }
          >
            {account.account_type}
          </button>
        ))}
      </div>

      <div className="App">
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
                <div className="goal-card">
                  <h2>Savings Goal</h2>
                  <p>
                    Your savings goal: {savingsGoal} {currentOwnerCurrency}
                  </p>
                  <p>{purpose}</p>
                  <div className="progress-circle">
                    <CircularProgressbar
                      value={progressPercentage}
                      text={`${progressPercentage.toFixed(0)}%`}
                      strokeWidth={10}
                      styles={{
                        root: { width: "200px", height: "200px", color: "" },
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="side-by-side-container">
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
                              width: `${
                                (Math.abs(totalAmount) / ARBITRARY_GOAL) * 100
                              }%`,
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
              <div className="dateDropdown">
                <div className="monthDropdown">
                  <label></label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    {months.map((month, index) => (
                      <option
                        key={index}
                        value={month === "All Year" ? null : month}
                      >
                        {month}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="yearDropdown">
                  <label></label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    {years.map((year, index) => (
                      <option key={index} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="positive-progress-bars-container">
                <h3>
                  {" "}
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
            </div>

            <div className="transaction-dropdown">
              <button onClick={toggleShowTransactions}>
                {showTransactions
                  ? "Hide Recent Transactions"
                  : "Show Recent Transactions"}
              </button>

              {showTransactions && (
                <div className="selected-category-transactions">
                  <h3>
                    Transactions{selectedCategory && ` for ${selectedCategory}`}
                  </h3>
                  <ul>
                    {transactionData
                      .filter((transaction) => {
                        if (!selectedCategory) {
                          return true;
                        } else if (selectedCategory === "other") {
                          for (let keyword in keywordToCategoryMapping) {
                            if (
                              transaction.description
                                .toLowerCase()
                                .includes(keyword)
                            ) {
                              return false;
                            }
                          }
                          return true;
                        } else {
                          for (let keyword in keywordToCategoryMapping) {
                            if (
                              transaction.description
                                .toLowerCase()
                                .includes(keyword) &&
                              keywordToCategoryMapping[keyword] ===
                                selectedCategory
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
                              transaction.description
                                .toLowerCase()
                                .includes(keyword)
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
          </div>
        )}
      </div>
      <img src={yourImage} alt="Example Image" width="900" />
      
      <h2>Don't let your dreams be dreams</h2>
    </>
  );
}

export default App;
