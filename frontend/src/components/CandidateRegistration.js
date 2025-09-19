import React, { useState } from 'react';

const CandidateRegistration = ({ onRegister, candidates, loading }) => {
  const [candidateForm, setCandidateForm] = useState({
    name: '',
    politicalParty: '',
    age: '',
    constituencyId: '',
    securityDeposit: '1'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(candidateForm);
    setCandidateForm({ name: '', politicalParty: '', age: '', constituencyId: '', securityDeposit: '1' });
  };

  return (
    <div className="glass-panel">
      <h3 className="panel-title">Register as Candidate</h3>
      <form onSubmit={handleSubmit} className="glass-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={candidateForm.name}
            onChange={(e) => setCandidateForm({...candidateForm, name: e.target.value})}
            className="glass-input"
            required
          />
        </div>
        <div className="form-group">
          <label>Political Party:</label>
          <input
            type="text"
            value={candidateForm.politicalParty}
            onChange={(e) => setCandidateForm({...candidateForm, politicalParty: e.target.value})}
            className="glass-input"
            required
          />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            value={candidateForm.age}
            onChange={(e) => setCandidateForm({...candidateForm, age: e.target.value})}
            className="glass-input"
            min="25"
            required
          />
        </div>
        <div className="form-group">
          <label>Constituency ID:</label>
          <select
            value={candidateForm.constituencyId}
            onChange={(e) => setCandidateForm({...candidateForm, constituencyId: e.target.value})}
            className="glass-input"
            required
          >
            <option value="">Select Constituency</option>
            <option value="1">Constituency 1</option>
            <option value="2">Constituency 2</option>
            <option value="3">Constituency 3</option>
          </select>
        </div>
        <div className="form-group">
          <label>Security Deposit (ETH):</label>
          <input
            type="number"
            value={candidateForm.securityDeposit}
            onChange={(e) => setCandidateForm({...candidateForm, securityDeposit: e.target.value})}
            className="glass-input"
            min="1"
            step="0.1"
            required
          />
        </div>
        <button type="submit" className="glass-btn glass-btn-primary" disabled={loading}>
          {loading ? 'Registering...' : 'Register Candidate'}
        </button>
      </form>

      <h4 className="section-title">Registered Candidates</h4>
      <ul className="glass-list">
        {candidates.map(candidate => (
          <li key={candidate.id} className="glass-list-item">
            <div className="candidate-info">
              <div className="candidate-name">{candidate.name}</div>
              <div className="candidate-details">
                {candidate.politicalParty} | Age: {candidate.age} | Constituency: {candidate.constituencyId} | 
                <span className={`status-badge ${candidate.canContest ? 'status-verified' : 'status-pending'}`}>
                  {candidate.canContest ? 'Verified' : 'Pending'}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateRegistration;