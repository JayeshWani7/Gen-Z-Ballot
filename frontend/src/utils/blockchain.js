import { ethers } from 'ethers';
import { BLOCKCHAIN_CONFIG } from './constants';

/**
 * Initialize the blockchain provider
 * @returns {Promise<ethers.JsonRpcProvider>} Provider instance
 */
export const initializeProvider = async () => {
  try {
    const provider = new ethers.JsonRpcProvider(BLOCKCHAIN_CONFIG.RPC_URL);
    
    // Test the connection
    await provider.getNetwork();
    
    return provider;
  } catch (err) {
    throw new Error(`Failed to connect to Hardhat node. Make sure it's running on ${BLOCKCHAIN_CONFIG.RPC_URL}`);
  }
};

/**
 * Create a wallet instance for the given account
 * @param {Object} account - Account object with privateKey
 * @param {ethers.Provider} provider - Blockchain provider
 * @returns {ethers.Wallet} Wallet instance
 */
export const createWallet = (account, provider) => {
  if (!account || !account.privateKey) {
    throw new Error('Invalid account or missing private key');
  }
  
  if (!provider) {
    throw new Error('Provider is required');
  }
  
  return new ethers.Wallet(account.privateKey, provider);
};

/**
 * Format address for display (shows first 10 chars + ...)
 * @param {string} address - Ethereum address
 * @returns {string} Formatted address
 */
export const formatAddress = (address) => {
  if (!address || typeof address !== 'string') return '';
  
  if (address.length <= 12) return address;
  
  return `${address.slice(0, 10)}...`;
};

/**
 * Format ETH amount for display
 * @param {string|number} amount - Amount in wei or ETH
 * @param {boolean} isWei - Whether the amount is in wei
 * @returns {string} Formatted ETH amount
 */
export const formatEthAmount = (amount, isWei = false) => {
  try {
    if (isWei) {
      return ethers.formatEther(amount.toString());
    }
    return parseFloat(amount).toFixed(4);
  } catch {
    return '0.0000';
  }
};

/**
 * Parse ETH amount to wei
 * @param {string|number} amount - Amount in ETH
 * @returns {bigint} Amount in wei
 */
export const parseEthAmount = (amount) => {
  try {
    return ethers.parseEther(amount.toString());
  } catch {
    return ethers.parseEther('0');
  }
};

/**
 * Encode string to bytes32 for Solidity
 * @param {string} str - String to encode
 * @param {number} maxLength - Maximum length to slice
 * @returns {string} Encoded bytes
 */
export const encodeStringToBytes = (str, maxLength = 32) => {
  try {
    const encoded = ethers.encodeBytes32String(str);
    return maxLength < 32 ? encoded.slice(0, maxLength + 2) : encoded; // +2 for '0x'
  } catch {
    return ethers.encodeBytes32String('');
  }
};

/**
 * Decode bytes32 to string
 * @param {string} bytes - Bytes32 string
 * @returns {string} Decoded string
 */
export const decodeBytesToString = (bytes) => {
  try {
    return ethers.decodeBytes32String(bytes);
  } catch {
    return '';
  }
};

/**
 * Wait for transaction confirmation
 * @param {Promise} txPromise - Transaction promise
 * @param {number} confirmations - Number of confirmations to wait for
 * @returns {Promise<Object>} Transaction receipt
 */
export const waitForTransaction = async (txPromise, confirmations = 1) => {
  try {
    const tx = await txPromise;
    console.log('Transaction sent:', tx.hash);
    
    const receipt = await tx.wait(confirmations);
    console.log('Transaction confirmed:', receipt.hash);
    
    return receipt;
  } catch (error) {
    console.error('Transaction failed:', error);
    throw error;
  }
};

/**
 * Check if an address is valid
 * @param {string} address - Ethereum address to validate
 * @returns {boolean} Whether address is valid
 */
export const isValidAddress = (address) => {
  try {
    return ethers.isAddress(address);
  } catch {
    return false;
  }
};

/**
 * Get network information
 * @param {ethers.Provider} provider - Blockchain provider
 * @returns {Promise<Object>} Network information
 */
export const getNetworkInfo = async (provider) => {
  try {
    const network = await provider.getNetwork();
    const blockNumber = await provider.getBlockNumber();
    
    return {
      chainId: network.chainId,
      name: network.name,
      blockNumber
    };
  } catch (error) {
    console.error('Failed to get network info:', error);
    throw error;
  }
};