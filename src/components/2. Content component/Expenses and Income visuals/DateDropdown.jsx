import React from "react";

function DateDropdown({
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  months,
  years,
  showExpenses,
  showIncome,
}) {
  return (
    (showExpenses || showIncome) && (
      <div className="dateDropdown">
        <div className="monthDropdown">
          <label></label>
          <select
            value={selectedMonth}
            onChange={(e) => {
              if (e.target.value === "All Year") {
                setSelectedMonth("");
              } else {
                setSelectedMonth(e.target.value);
              }
            }}
          >
            {months.map((month, index) => (
              <option key={index} value={month === "All Year" ? null : month}>
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
    )
  );
}

export default DateDropdown;
