import React from 'react';

const VerificationPanel = ({ 
  currentAccount, 
  voters, 
  candidates, 
  onVerifyVoter, 
  onVerifyCandidate, 
  loading,
  hardhatAccounts 
}) => {
  const pendingVoters = voters.filter(v => !v.isAllowedToVote);
  const pendingCandidates = candidates.filter(c => !c.canContest);

  const handleVerifyVoter = (voter) => {
    const voterAccount = hardhatAccounts.find(acc => acc.role.includes('Voter'));
    if (voterAccount) {
      onVerifyVoter(voterAccount.address, '123456789012', 'VOTER001');
    }
  };

  const handleVerifyCandidate = (candidate) => {
    const candidateAccount = hardhatAccounts.find(acc => acc.role.includes('Candidate'));
    if (candidateAccount) {
      onVerifyCandidate(candidateAccount.address);
    }
  };

  return (
    <div className="glass-panel">
      <h3 className="panel-title">Verify Voters and Candidates</h3>
      <div className="current-role">
        <strong>Current Role:</strong> 
        <span className="role-badge">{currentAccount.role}</span>
      </div>
      
      {currentAccount.role.includes('Officer') ? (
        <div className="verification-sections">
          {/* Voter Verification Section */}
          <div className="verification-section">
            <h4 className="section-title">
              Pending Voter Verifications 
              <span className="count-badge">{pendingVoters.length}</span>
            </h4>
            {pendingVoters.length === 0 ? (
              <div className="empty-state">
                <p>No pending voter verifications.</p>
              </div>
            ) : (
              <ul className="glass-list">
                {pendingVoters.map(voter => (
                  <li key={voter.id} className="glass-list-item verification-item">
                    <div className="voter-info">
                      <div className="voter-name">{voter.name}</div>
                      <div className="voter-details">
                        Age: {voter.age} | Constituency: {voter.constituencyId}
                      </div>
                    </div>
                    <button 
                      className="glass-btn glass-btn-success"
                      onClick={() => handleVerifyVoter(voter)}
                      disabled={loading}
                    >
                      {loading ? 'Verifying...' : 'Verify'}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Candidate Verification Section */}
          <div className="verification-section">
            <h4 className="section-title">
              Pending Candidate Verifications
              <span className="count-badge">{pendingCandidates.length}</span>
            </h4>
            {pendingCandidates.length === 0 ? (
              <div className="empty-state">
                <p>No pending candidate verifications.</p>
              </div>
            ) : (
              <ul className="glass-list">
                {pendingCandidates.map(candidate => (
                  <li key={candidate.id} className="glass-list-item verification-item">
                    <div className="candidate-info">
                      <div className="candidate-name">{candidate.name}</div>
                      <div className="candidate-details">
                        <span className="party-name">{candidate.politicalParty}</span>
                        <span className="separator">•</span>
                        <span>Constituency: {candidate.constituencyId}</span>
                      </div>
                    </div>
                    <button 
                      className="glass-btn glass-btn-success"
                      onClick={() => handleVerifyCandidate(candidate)}
                      disabled={loading}
                    >
                      {loading ? 'Verifying...' : 'Verify'}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <div className="access-denied">
          <div className="access-denied-icon">🔒</div>
          <p>Only Election Officers can verify voters and candidates.</p>
          <p className="access-note">
            Switch to an Officer account to access verification features.
          </p>
        </div>
      )}
    </div>
  );
};

export default VerificationPanel;