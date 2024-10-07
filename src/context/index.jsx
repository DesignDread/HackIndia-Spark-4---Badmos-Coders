/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { BrowserProvider } from 'ethers';
import StakeNSeekGameV3ABI from '../abis/StakeNSeekGameV3.json';

export const ContractContext = createContext();

const ContractProvider = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  // Add your contract address here
  const contractAddress = '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512'
;

  // Connect the wallet and initialize provider, signer, and contract
  const connectWallet = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        // Initialize provider from MetaMask
        const provider = new BrowserProvider(window.ethereum);
        setProvider(provider);

        // Request account access
        const accounts = await provider.send('eth_requestAccounts', []);
        setCurrentAccount(accounts[0]);
        console.log('Connected account:', accounts[0]);

        // Set signer for interacting with the contract
        const signer = provider.getSigner();
        setSigner(signer);

        // Create contract instance with signer
        const contractInstance = new ethers.Contract(contractAddress, StakeNSeekGameV3ABI, signer);
        setContract(contractInstance);
      } catch (err) {
        console.error('Error connecting wallet:', err.message);
      }
    } else {
      console.log('Please install MetaMask.');
    }
  };

  // Create a new game
  const createGame = async (gameData) => {
    if (contract) {
      try {
        const tx = await contract.createGame(
          gameData.numClues,
          ethers.utils.parseEther(gameData.prizeMoney.toString()),  // Convert prizeMoney to wei
          ethers.utils.parseEther(gameData.entryFee.toString()),  // Convert entryFee to wei
          gameData.startTime,
          gameData.endTime,
          gameData.clues,
          gameData.latitudes,
          gameData.longitudes,
          gameData.maxParticipants
        );
        await tx.wait();  // Wait for the transaction to be mined
        console.log('Game created successfully!');
      } catch (error) {
        console.error('Error creating game:', error);
      }
    }
  };

  // Complete the game and claim reward
  const completeGame = async (gameId) => {
    if (contract) {
      try {
        const tx = await contract.completeGame(gameId);
        await tx.wait();
        console.log('Game completed, reward claimed!');
      } catch (error) {
        console.error('Error completing game:', error);
      }
    }
  };

  // Update player progress in the game
  const updatePlayerProgress = async (gameId, progress) => {
    if (contract && currentAccount) {
      try {
        const tx = await contract.updatePlayerProgress(gameId, currentAccount, progress);
        await tx.wait();
        console.log('Player progress updated!');
      } catch (error) {
        console.error('Error updating player progress:', error);
      }
    }
  };

  // Join a game
  const joinGame = async (gameId, entryFee) => {
    if (contract && currentAccount) {
      try {
        const tx = await contract.joinGame(gameId, {
          value: ethers.utils.parseEther(entryFee.toString())  // Convert entryFee to wei
        });
        await tx.wait();
        console.log('Game joined successfully!');
      } catch (error) {
        console.error('Error joining game:', error);
      }
    }
  };

  // Cancel a game (only for the owner)
  const cancelGame = async (gameId) => {
    if (contract) {
      try {
        const tx = await contract.cancelGame(gameId);
        await tx.wait();
        console.log('Game cancelled successfully!');
      } catch (error) {
        console.error('Error cancelling game:', error);
      }
    }
  };

  // Get all live games
  const getAllGames = async () => {
    if (contract) {
      try {
        const games = await contract.getAllGames();
        return games;  // Return the array of live games
      } catch (error) {
        console.error('Error fetching live games:', error);
      }
    }
  };

  // Check if the wallet is already connected on page load
  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length) {
          setCurrentAccount(accounts[0]);
          setSigner(provider.getSigner());
          const contractInstance = new ethers.Contract(contractAddress, StakeNSeekGameV3ABI, provider.getSigner());
          setContract(contractInstance);
        }
      }
    };

    checkIfWalletIsConnected();
  }, []);

  return (
    <ContractContext.Provider
      value={{
        connectWallet,
        currentAccount,
        contract,
        setContract,
        setCurrentAccount,
        createGame,
        completeGame,
        updatePlayerProgress,
        joinGame,
        cancelGame,
        getAllGames
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export default ContractProvider;