import React from 'react';

const VotingPanel = ({ candidates, onVote, loading }) => {
  const verifiedCandidates = candidates.filter(c => c.canContest);

  return (
    <div className="glass-panel">
      <h3 className="panel-title">Cast Your Vote</h3>
      <p className="panel-subtitle">Select a candidate from your constituency to vote for:</p>
      
      {verifiedCandidates.length === 0 ? (
        <div className="empty-state">
          <p>No verified candidates available for voting yet.</p>
        </div>
      ) : (
        <ul className="glass-list voting-list">
          {verifiedCandidates.map(candidate => (
            <li key={candidate.id} className="glass-list-item voting-item">
              <div className="candidate-info">
                <div className="candidate-name">{candidate.name}</div>
                <div className="candidate-details">
                  <span className="party-name">{candidate.politicalParty}</span>
                  <span className="separator">•</span>
                  <span>Constituency: {candidate.constituencyId}</span>
                </div>
              </div>
              <button 
                className="glass-btn glass-btn-success vote-button"
                onClick={() => onVote(candidate.id)}
                disabled={loading}
              >
                {loading ? 'Voting...' : 'Vote'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VotingPanel;