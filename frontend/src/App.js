import React, { useState, useEffect } from 'react';
import './App.css';

// Import components
import {
  AccountSelector,
  TabNavigation,
  VoterRegistration,
  CandidateRegistration,
  VotingPanel,
  VerificationPanel,
  EventLog
} from './components';

// Import custom hooks
import {
  useContract,
  useVoters,
  useCandidates,
  useVoting
} from './hooks';

// Import utilities
import {
  HARDHAT_ACCOUNTS,
  initializeProvider,
  eventManager,
  setupBlockchainEventListeners
} from './utils';

function App() {
  const [provider, setProvider] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(HARDHAT_ACCOUNTS[0]);
  const [activeTab, setActiveTab] = useState('voter');
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Initialize blockchain connection
  useEffect(() => {
    const init = async () => {
      try {
        const blockchainProvider = await initializeProvider();
        setProvider(blockchainProvider);
      } catch (err) {
        setError(err.message);
      }
    };
    
    init();
  }, []);

  // Initialize contracts using custom hook
  const { contracts, loading: contractLoading, error: contractError } = useContract(currentAccount, provider);

  // Initialize voters hook
  const { 
    voters, 
    loading: voterLoading, 
    registerVoter, 
    verifyVoter 
  } = useVoters(contracts);

  // Initialize candidates hook
  const { 
    candidates, 
    loading: candidateLoading, 
    registerCandidate, 
    verifyCandidate 
  } = useCandidates(contracts, currentAccount);

  // Initialize voting hook
  const { 
    loading: votingLoading, 
    castVote 
  } = useVoting(contracts, voters);

  // Setup event listeners and event manager
  useEffect(() => {
    if (Object.keys(contracts).length > 0) {
      const cleanup = setupBlockchainEventListeners(contracts, eventManager);
      
      const unsubscribe = eventManager.subscribe(setEvents);
      
      // Load initial events
      setEvents(eventManager.getEvents());
      
      return () => {
        cleanup();
        unsubscribe();
      };
    }
  }, [contracts]);

  // Handle account changes
  const handleAccountChange = (accountIndex) => {
    setCurrentAccount(HARDHAT_ACCOUNTS[accountIndex]);
    setError('');
    setSuccess('');
  };

  // Handle form submissions with success/error handling
  const handleVoterRegistration = async (voterForm) => {
    try {
      setError('');
      setSuccess('');
      const result = await registerVoter(voterForm);
      setSuccess(result.message);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCandidateRegistration = async (candidateForm) => {
    try {
      setError('');
      setSuccess('');
      const result = await registerCandidate(candidateForm);
      setSuccess(result.message);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleVoterVerification = async (voterAddress, aadharNumber, voterIdNumber) => {
    try {
      setError('');
      setSuccess('');
      const result = await verifyVoter(voterAddress, aadharNumber, voterIdNumber);
      setSuccess(result.message);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCandidateVerification = async (candidateAddress) => {
    try {
      setError('');
      setSuccess('');
      const result = await verifyCandidate(candidateAddress);
      setSuccess(result.message);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleVote = async (candidateId) => {
    try {
      setError('');
      setSuccess('');
      const result = await castVote(candidateId, currentAccount);
      setSuccess(result.message);
    } catch (err) {
      setError(err.message);
    }
  };

  // Determine overall loading state
  const isLoading = contractLoading || voterLoading || candidateLoading || votingLoading;

  // Show loading screen if provider is not ready
  if (!provider) {
    return (
      <div className="app-container">
        <div className="loading-screen glass-card">
          <div className="loading-spinner"></div>
          <h2>Connecting to Blockchain...</h2>
          <p>Make sure Hardhat node is running on http://127.0.0.1:8545</p>
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="app-container glass-bg">
      <div className="glass-header">
        <div className="container">
          <h1 className="app-title">🗳️ Gen-Z Ballot</h1>
          <p className="app-subtitle">Decentralized Voting System</p>
          <p className="app-description">Blockchain-based transparent voting with Hardhat integration</p>
        </div>
      </div>

      <div className="container">
        {/* Account Selector */}
        <AccountSelector
          accounts={HARDHAT_ACCOUNTS}
          currentAccount={currentAccount}
          onAccountChange={handleAccountChange}
        />

        {/* Error/Success Messages */}
        {error && <div className="glass-message error-message">{error}</div>}
        {success && <div className="glass-message success-message">{success}</div>}
        {contractError && <div className="glass-message error-message">{contractError}</div>}

        {/* Main Content */}
        <div className="glass-card main-content">
          <TabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className="tab-content">
            {/* Voter Registration Tab */}
            {activeTab === 'voter' && (
              <VoterRegistration
                onRegister={handleVoterRegistration}
                voters={voters}
                loading={isLoading}
              />
            )}

            {/* Candidate Registration Tab */}
            {activeTab === 'candidate' && (
              <CandidateRegistration
                onRegister={handleCandidateRegistration}
                candidates={candidates}
                loading={isLoading}
              />
            )}

            {/* Voting Tab */}
            {activeTab === 'voting' && (
              <VotingPanel
                candidates={candidates}
                onVote={handleVote}
                loading={isLoading}
              />
            )}

            {/* Verification Tab */}
            {activeTab === 'verification' && (
              <VerificationPanel
                currentAccount={currentAccount}
                voters={voters}
                candidates={candidates}
                onVerifyVoter={handleVoterVerification}
                onVerifyCandidate={handleCandidateVerification}
                loading={isLoading}
                hardhatAccounts={HARDHAT_ACCOUNTS}
              />
            )}

            {/* Events Tab */}
            {activeTab === 'events' && (
              <EventLog events={events} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;