/* eslint-disable no-unused-vars */

import { useState, useContext } from 'react';
import { ContractContext } from '../context';
import { Navigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Pirate1 , Pirate2 , Pirate4 } from '../constants';

const CreateGame = () => {
  const { createGame, connectWallet, currentAccount } = useContext(ContractContext);
  const [gameData, setGameData] = useState({
    name: '',
    description: '',
    banner: null,
    numClues: 3,
    clues: ['', '', ''],
    latitudes: ['', '', ''],
    longitudes: ['', '', ''],
    prizeMoney: 1, // In ETH
    maxParticipants: 10,
    entryFee: 0.1, // In ETH
    startDate: '',
    endDate: '',
  });
  


  const handleCreateGame = async () => {
    if (!currentAccount) {
      await connectWallet(); // Ensure the user is connected to a wallet
    }
  
    // Call the createGame function from the context
    await createGame({
      ...gameData,
      clues: gameData.clues,  // Array of clues
      latitudes: gameData.latitudes.map(lat => Number(lat)),  // Convert to numbers
      longitudes: gameData.longitudes.map(lon => Number(lon)), // Convert to numbers
      startTime: new Date(gameData.startDate).getTime() / 1000,  // Convert to UNIX timestamp
      endTime: new Date(gameData.endDate).getTime() / 1000,      // Convert to UNIX timestamp
    });
  
    console.log("Game Created Successfully!");
  };






  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGameData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGameData((prevData) => ({
        ...prevData,
        banner: file.name,  // Setting the file name as the banner URL
      }));
    }
  };

  const handleCluesChange = (index, field, value) => {
    const updatedClues = [...gameData[field]];
    updatedClues[index] = value;
    setGameData((prevData) => ({
      ...prevData,
      [field]: updatedClues,
    }));
  };

  const handleNumCluesChange = (e) => {
    const numClues = Number(e.target.value);

    setGameData((prevData) => ({
      ...prevData,
      numClues,
      clues: Array.from({ length: numClues }, (_, i) => prevData.clues[i] || ''),
      latitudes: Array.from({ length: numClues }, (_, i) => prevData.latitudes[i] || ''),
      longitudes: Array.from({ length: numClues }, (_, i) => prevData.longitudes[i] || ''),
    }));
  };

  return (<>
  
  <img src={`${Pirate1}`} alt="" className='absolute h-52 right-12 animate-moveUpDown fixed ' />
  <img src={`${Pirate1}`} alt="" className='absolute h-52 left-12 animate-moveUpDown ' />
  

    <div
    className="relative mt-36 p-6 m-auto max-w-3xl mx-auto shadow-md rounded-md space-y-6  bg-cover text-yellow-600">
      
      <h2 className="text-6xl font-extrabold relativefont-semibold text-yellow-600 z-10 ">Create a Treasure Hunt</h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Treasure Hunt Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={gameData.name}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            type="text"
            id="description"
            name="description"
            value={gameData.description}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="banner">Banner Image</Label>
          <Input
            type="file"
            id="banner"
            accept="image/*"
            onChange={handleBannerUpload}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="numClues">Number of Clues</Label>
          <Input
            type="number"
            id="numClues"
            name="numClues"
            min="1"
            value={gameData.numClues}
            onChange={handleNumCluesChange}
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="prizeMoney">Prize Money (ETH)</Label>
            <Input
              type="number"
              id="prizeMoney"
              name="prizeMoney"
              step="0.01"
              value={gameData.prizeMoney}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="maxParticipants">Maximum Participants</Label>
            <Input
              type="number"
              id="maxParticipants"
              name="maxParticipants"
              value={gameData.maxParticipants}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="entryFee">Entry Fee (ETH)</Label>
            <Input
              type="number"
              id="entryFee"
              name="entryFee"
              step="0.01"
              value={gameData.entryFee}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate">Start Date and Time</Label>
            <Input
              type="datetime-local"
              id="startDate"
              name="startDate"
              value={gameData.startDate}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="endDate">End Date and Time</Label>
            <Input
              type="datetime-local"
              id="endDate"
              name="endDate"
              value={gameData.endDate}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
        </div>

 {/* Dynamically render clues based on the number of clues */}
{Array.from({ length: gameData.numClues }).map((_, index) => (
  <div key={index} className="space-y-4 p-4 border rounded-md ">
    <h3 className="text-lg font-semibold text-gray-700">Clue {index + 1}</h3>

    <div>
      <Label htmlFor={`clue-${index}`}>Clue</Label>
      <Input
        type="text"
        id={`clue-${index}`}
        value={gameData.clues[index]}
        onChange={(e) => handleCluesChange(index, 'clues', e.target.value)}
        className="mt-1"
      />
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor={`latitude-${index}`}>Latitude</Label>
        <Input
          type="text"
          id={`latitude-${index}`}
          value={gameData.latitudes[index]}
          onChange={(e) => handleCluesChange(index, 'latitudes', e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor={`longitude-${index}`}>Longitude</Label>
        <Input
          type="text"
          id={`longitude-${index}`}
          value={gameData.longitudes[index]}
          onChange={(e) => handleCluesChange(index, 'longitudes', e.target.value)}
          className="mt-1"
        />
      </div>
    </div>
  </div>
))}


        <Button className="w-full mt-6" onClick={handleCreateGame}  >Create Game</Button>
      </div>
    </div>

    </>
  );
};

export default CreateGame;
