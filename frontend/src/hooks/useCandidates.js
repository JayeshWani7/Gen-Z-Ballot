import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export const useCandidates = (contracts, currentAccount) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (contracts.candidate) {
      loadCandidates();
      setupCandidateEventListeners();
    }
  }, [contracts.candidate]);

  const loadCandidates = async () => {
    if (!contracts.candidate) return;
    
    try {
      setLoading(true);
      const candidateCount = await contracts.candidate.totalCandidates();
      const candidateList = [];
      
      for (let i = 1; i <= candidateCount; i++) {
        try {
          const candidateDetails = await contracts.candidate.getCandidateDetails(i);
          candidateList.push({
            id: i,
            name: candidateDetails.name,
            politicalParty: candidateDetails.politicalParty,
            age: candidateDetails.age.toString(),
            constituencyId: candidateDetails.constituencyId.toString(),
            canContest: candidateDetails.canContest,
            isVerified: candidateDetails.isVerified
          });
        } catch (err) {
          console.log(`Candidate ${i} not found or error:`, err.message);
        }
      }
      
      setCandidates(candidateList);
    } catch (err) {
      console.error('Error loading candidates:', err);
      setError('Failed to load candidates');
    } finally {
      setLoading(false);
    }
  };

  const setupCandidateEventListeners = () => {
    if (!contracts.candidate) return;

    const handleCandidateRegistered = (candidateAddress, name, constituencyId) => {
      console.log('CandidateRegistered event:', { candidateAddress, name, constituencyId });
      loadCandidates(); // Reload candidates when new registration occurs
    };

    const handleCandidateVerified = (candidateAddress, isVerified) => {
      console.log('CandidateVerified event:', { candidateAddress, isVerified });
      loadCandidates(); // Reload candidates when verification occurs
    };

    contracts.candidate.on('CandidateRegistered', handleCandidateRegistered);
    contracts.candidate.on('CandidateVerified', handleCandidateVerified);

    // Cleanup function
    return () => {
      contracts.candidate.off('CandidateRegistered', handleCandidateRegistered);
      contracts.candidate.off('CandidateVerified', handleCandidateVerified);
    };
  };

  const registerCandidate = async (candidateForm) => {
    if (!contracts.candidate) {
      throw new Error('Candidate contract not available');
    }

    try {
      setLoading(true);
      setError('');

      const depositAmount = ethers.parseEther(candidateForm.securityDeposit);
      
      const tx = await contracts.candidate.candidateRegistration(
        currentAccount.address,
        candidateForm.name,
        candidateForm.politicalParty,
        parseInt(candidateForm.securityDeposit),
        parseInt(candidateForm.age),
        parseInt(candidateForm.constituencyId),
        { value: depositAmount }
      );
      
      await tx.wait();
      return { success: true, message: 'Candidate registered successfully!' };
    } catch (err) {
      const errorMessage = `Registration failed: ${err.message}`;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const verifyCandidate = async (candidateAddress) => {
    if (!contracts.candidate) {
      throw new Error('Candidate contract not available');
    }

    try {
      setLoading(true);
      setError('');

      const tx = await contracts.candidate.candidateVerification(candidateAddress, true);
      await tx.wait();
      return { success: true, message: 'Candidate verified successfully!' };
    } catch (err) {
      const errorMessage = `Verification failed: ${err.message}`;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    candidates,
    loading,
    error,
    registerCandidate,
    verifyCandidate,
    loadCandidates
  };
};