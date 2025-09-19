import React from 'react';

const AccountSelector = ({ accounts, currentAccount, onAccountChange }) => {
  return (
    <div className="glass-card">
      <h3>Account Selection</h3>
      <div className="account-selector">
        <label>Select Account:</label>
        <select 
          value={accounts.indexOf(currentAccount)} 
          onChange={(e) => onAccountChange(parseInt(e.target.value))}
          className="glass-input"
        >
          {accounts.map((account, index) => (
            <option key={index} value={index}>
              {account.role} - {account.address.slice(0, 10)}...
            </option>
          ))}
        </select>
      </div>
      <div className="account-info glass-info">
        <div><strong>Role:</strong> {currentAccount.role}</div>
        <div><strong>Address:</strong> {currentAccount.address}</div>
      </div>
    </div>
  );
};

export default AccountSelector;