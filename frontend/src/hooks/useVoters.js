import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export const useVoters = (contracts) => {
  const [voters, setVoters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (contracts.voter) {
      loadVoters();
      setupVoterEventListeners();
    }
  }, [contracts.voter]);

  const loadVoters = async () => {
    if (!contracts.voter) return;
    
    try {
      setLoading(true);
      const voterCount = await contracts.voter.voterCount();
      const voterList = [];
      
      for (let i = 1; i <= voterCount; i++) {
        try {
          const voterDetails = await contracts.voter.getVoterDetails(i);
          voterList.push({
            id: i,
            name: voterDetails.name,
            age: voterDetails.age.toString(),
            constituencyId: voterDetails.constituencyId.toString(),
            hasVoted: voterDetails.hasVoted,
            isAllowedToVote: voterDetails.isAllowedToVote,
            hasRegistered: voterDetails.hasRegistered
          });
        } catch (err) {
          console.log(`Voter ${i} not found or error:`, err.message);
        }
      }
      
      setVoters(voterList);
    } catch (err) {
      console.error('Error loading voters:', err);
      setError('Failed to load voters');
    } finally {
      setLoading(false);
    }
  };

  const setupVoterEventListeners = () => {
    if (!contracts.voter) return;

    const handleVoterRegistered = (voterAddress, name, constituencyId) => {
      console.log('VoterRegistered event:', { voterAddress, name, constituencyId });
      loadVoters(); // Reload voters when new registration occurs
    };

    const handleVoterVerified = (voterAddress, isVerified) => {
      console.log('VoterVerified event:', { voterAddress, isVerified });
      loadVoters(); // Reload voters when verification occurs
    };

    contracts.voter.on('VoterRegistered', handleVoterRegistered);
    contracts.voter.on('VoterVerified', handleVoterVerified);

    // Cleanup function
    return () => {
      contracts.voter.off('VoterRegistered', handleVoterRegistered);
      contracts.voter.off('VoterVerified', handleVoterVerified);
    };
  };

  const registerVoter = async (voterForm) => {
    if (!contracts.voter) {
      throw new Error('Voter contract not available');
    }

    try {
      setLoading(true);
      setError('');

      const aadharBytes = ethers.encodeBytes32String(voterForm.aadharNumber).slice(0, 26);
      
      const tx = await contracts.voter.registerAsVoter(
        voterForm.name,
        parseInt(voterForm.age),
        aadharBytes,
        voterForm.voterIdNumber,
        parseInt(voterForm.constituencyId)
      );
      
      await tx.wait();
      return { success: true, message: 'Voter registered successfully!' };
    } catch (err) {
      const errorMessage = `Registration failed: ${err.message}`;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const verifyVoter = async (voterAddress, aadharNumber, voterIdNumber) => {
    if (!contracts.voter) {
      throw new Error('Voter contract not available');
    }

    try {
      setLoading(true);
      setError('');

      const aadharBytes = ethers.encodeBytes32String(aadharNumber).slice(0, 26);
      
      const tx = await contracts.voter.verifyVoters(
        voterAddress,
        aadharBytes,
        voterIdNumber,
        true
      );
      
      await tx.wait();
      return { success: true, message: 'Voter verified successfully!' };
    } catch (err) {
      const errorMessage = `Verification failed: ${err.message}`;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    voters,
    loading,
    error,
    registerVoter,
    verifyVoter,
    loadVoters
  };
};