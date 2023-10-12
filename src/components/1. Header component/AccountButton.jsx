import React from "react";

function AccountButton({ account, onClick }) {
  return (
    <button
      className="account-button"
      key={account.id}
      onClick={() =>
        onClick(
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
  );
}

export default AccountButton;
