import React, { useState } from 'react';

const VoterRegistration = ({ onRegister, voters, loading }) => {
  const [voterForm, setVoterForm] = useState({
    name: '',
    age: '',
    aadharNumber: '',
    voterIdNumber: '',
    constituencyId: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(voterForm);
    setVoterForm({ name: '', age: '', aadharNumber: '', voterIdNumber: '', constituencyId: '' });
  };

  return (
    <div className="glass-panel">
      <h3 className="panel-title">Register as Voter</h3>
      <form onSubmit={handleSubmit} className="glass-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={voterForm.name}
            onChange={(e) => setVoterForm({...voterForm, name: e.target.value})}
            className="glass-input"
            required
          />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            value={voterForm.age}
            onChange={(e) => setVoterForm({...voterForm, age: e.target.value})}
            className="glass-input"
            min="18"
            required
          />
        </div>
        <div className="form-group">
          <label>Aadhar Number:</label>
          <input
            type="text"
            value={voterForm.aadharNumber}
            onChange={(e) => setVoterForm({...voterForm, aadharNumber: e.target.value})}
            className="glass-input"
            maxLength="12"
            required
          />
        </div>
        <div className="form-group">
          <label>Voter ID Number:</label>
          <input
            type="text"
            value={voterForm.voterIdNumber}
            onChange={(e) => setVoterForm({...voterForm, voterIdNumber: e.target.value})}
            className="glass-input"
            required
          />
        </div>
        <div className="form-group">
          <label>Constituency ID:</label>
          <select
            value={voterForm.constituencyId}
            onChange={(e) => setVoterForm({...voterForm, constituencyId: e.target.value})}
            className="glass-input"
            required
          >
            <option value="">Select Constituency</option>
            <option value="1">Constituency 1</option>
            <option value="2">Constituency 2</option>
            <option value="3">Constituency 3</option>
          </select>
        </div>
        <button type="submit" className="glass-btn glass-btn-primary" disabled={loading}>
          {loading ? 'Registering...' : 'Register Voter'}
        </button>
      </form>

      <h4 className="section-title">Registered Voters</h4>
      <ul className="glass-list">
        {voters.map(voter => (
          <li key={voter.id} className="glass-list-item">
            <div className="voter-info">
              <div className="voter-name">{voter.name}</div>
              <div className="voter-details">
                Age: {voter.age} | Constituency: {voter.constituencyId} | 
                <span className={`status-badge ${voter.isAllowedToVote ? 'status-verified' : 'status-pending'}`}>
                  {voter.isAllowedToVote ? 'Verified' : 'Pending'}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VoterRegistration;