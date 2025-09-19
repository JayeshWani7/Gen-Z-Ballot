import React from 'react';

const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'voter', label: 'Voter Registration', icon: '👥' },
    { id: 'candidate', label: 'Candidate Registration', icon: '🗳️' },
    { id: 'voting', label: 'Voting', icon: '✅' },
    { id: 'verification', label: 'Verification', icon: '🔍' },
    { id: 'events', label: 'Event Log', icon: '📊' }
  ];

  return (
    <div className="glass-tabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`glass-tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="tab-icon">{tab.icon}</span>
          <span className="tab-label">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;