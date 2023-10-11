import React from "react";

import AccountButton  from "./AccountButton.jsx";


function AccountButtonsContainer({ accountData, handleSetConstant }) {
    return (
      <div className="button-container">
        {accountData.map(account => (
          <AccountButton key={account.id} account={account} onClick={handleSetConstant} />
        ))}
      </div>
    );
  }
  
  export default AccountButtonsContainer;