import { useState } from 'react';

export const useVoting = (contracts, voters) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const castVote = async (candidateId, currentAccount) => {
    if (!contracts.generalElections) {
      throw new Error('GeneralElections contract not available');
    }

    try {
      setLoading(true);
      setError('');

      // Find current user's voter ID
      const currentVoter = voters.find(v => 
        // This is a simplified approach - in a real app, you'd have better voter-address mapping
        v.name.toLowerCase().includes(currentAccount.role.toLowerCase())
      );
      
      if (!currentVoter) {
        throw new Error('Current account is not registered as a voter');
      }

      const tx = await contracts.generalElections.registerVote(
        currentVoter.id,
        candidateId
      );
      
      await tx.wait();
      return { success: true, message: 'Vote cast successfully!' };
    } catch (err) {
      const errorMessage = `Voting failed: ${err.message}`;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    castVote
  };
};