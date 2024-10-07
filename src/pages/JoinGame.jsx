/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { ContractContext } from '../context/ContractContext';

const JoinGame = () => {
  const { joinGame, connectWallet, currentAccount } = useContext(ContractContext);
  const [gameId, setGameId] = useState('');

  const handleJoinGame = async () => {
    await joinGame(gameId);
  };

  return (
    <div>
      <h1>Join Game</h1>
      {!currentAccount ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <>
          <div>Wallet Connected: {currentAccount}</div>
          <input
            type="text"
            placeholder="Enter Game ID"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
          />
          <button onClick={handleJoinGame}>Join Game</button>
        </>
      )}
    </div>
  );
};

export default JoinGame;
