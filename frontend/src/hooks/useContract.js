import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import {
  CONTRACT_ADDRESSES,
  ELECTIONOFFICER_ABI,
  VOTER_ABI,
  CANDIDATE_ABI,
  GENERALELECTIONS_ABI
} from '../contracts';

export const useContract = (currentAccount, provider) => {
  const [contracts, setContracts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (provider && currentAccount) {
      initializeContracts();
    }
  }, [provider, currentAccount]);

  const initializeContracts = async () => {
    try {
      setLoading(true);
      setError('');
      
      const wallet = new ethers.Wallet(currentAccount.privateKey, provider);
      
      const electionOfficer = new ethers.Contract(
        CONTRACT_ADDRESSES.electionOfficer,
        ELECTIONOFFICER_ABI,
        wallet
      );
      
      const voter = new ethers.Contract(
        CONTRACT_ADDRESSES.voter,
        VOTER_ABI,
        wallet
      );
      
      const candidate = new ethers.Contract(
        CONTRACT_ADDRESSES.candidate,
        CANDIDATE_ABI,
        wallet
      );
      
      const generalElections = new ethers.Contract(
        CONTRACT_ADDRESSES.generalElections,
        GENERALELECTIONS_ABI,
        wallet
      );

      setContracts({
        electionOfficer,
        voter,
        candidate,
        generalElections
      });

    } catch (err) {
      console.error('Contract initialization error:', err);
      setError('Failed to initialize contracts. Make sure they are deployed.');
    } finally {
      setLoading(false);
    }
  };

  return { contracts, loading, error };
};