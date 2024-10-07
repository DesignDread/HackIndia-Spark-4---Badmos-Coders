/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState , useContext } from 'react';
import { ethers } from 'ethers';
import { BrowserProvider } from 'ethers';
import StakeNSeekGameV3ABI from '../abis/StakeNSeekGameV3.json';


export const ContractContext = createContext();

const ContractProvider = ({ children }) => {

  const [contract, setContract] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  
  const contractAddress = '0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9';

  
  const connectWallet = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        // MetaMask is installed
        const provider = new BrowserProvider(window.ethereum);
        setProvider(provider);
        
        const accounts = await provider.send('eth_requestAccounts', []);
        setCurrentAccount(accounts[0]);
        console.log(accounts[0]);
        
        const signer = provider.getSigner();
        setSigner(signer);
        
        const contractInstance = new ethers.Contract(contractAddress, StakeNSeekGameV3ABI, signer);
        setContract(contractInstance);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      // MetaMask is not installed
      console.log("Please install MetaMask");
    }
  };
  
  const createGame = async (gameData) => {
    if (contract) {
      try {
        const tx = await contract.createGame(
          gameData.numClues,
          gameData.prizeMoney,  // Directly use prizeMoney
          gameData.entryFee,
          gameData.startTime,
          gameData.endTime,
          gameData.clues,
          gameData.latitudes,
          gameData.longitudes,
          gameData.maxParticipants
        );
        
        await tx.wait();  // Wait for the transaction to be mined
        console.log("Game created successfully!");
        
      } catch (error) {
        console.error("Error creating game:", error);
      }
    }
  };
  

  // Function to complete the game and claim reward
  const completeGame = async (gameId) => {
    if (contract) {
      const tx = await contract.completeGame(gameId);
      await tx.wait();
    }
  };

  // Function to update player progress
  const updatePlayerProgress = async (gameId, progress) => {
    if (contract) {
      const tx = await contract.updatePlayerProgress(gameId, currentAccount, progress);
      await tx.wait();
    }
  };

  // Check if the wallet is already connected
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
        completeGame, // Added the completeGame method
        updatePlayerProgress, // Added the updatePlayerProgress method
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export default ContractProvider;
