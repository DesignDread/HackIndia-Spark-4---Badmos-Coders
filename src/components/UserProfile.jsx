import React, { useState } from 'react';

const UserProfile = () => {
  // States to handle user inputs
  const [username, setUsername] = useState(''); 
  const [bio, setBio] = useState(''); 
  const [victories, setVictories] = useState([]);
  const [profileImage, setProfileImage] = useState(null); 

  // Handle file input for profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProfileImage(URL.createObjectURL(file));
  };

  // Handle form submission (for demo, just log the data)
  const handleSubmit = (e) => {
    e.preventDefault();
    const userProfileData = {
      username,
      bio,
      victories,
      profileImage,
    };
    console.log('User Profile Data: ', userProfileData);
    // You can add logic here to save the data to a database or server
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Treasure Hunt Profile</h1>

      {/* Profile Image */}
      <div className="flex justify-center items-center mb-6">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="rounded-full w-40 h-40 object-cover"
          />
        ) : (
          <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
            No Image
          </div>
        )}
      </div>
      
      {/* Profile Upload Button */}
      <div className="flex justify-center mb-6">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload} 
          className="cursor-pointer px-3 py-1 bg-blue-500 text-white rounded-md"
        />
      </div>

      {/* Form for Profile Info */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-lg font-semibold">Username</label>
          <input
            type="text"
            className="w-full mt-2 p-2 border rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold">Bio</label>
          <textarea
            className="w-full mt-2 p-2 border rounded-md"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us something about yourself"
            rows="4"
            required
          />
        </div>

        {/* Victories Section */}
        <div className="mb-4">
          <label className="block text-lg font-semibold">Victories / Completed Challenges</label>
          <input
            type="text"
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="Add your past victories"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                setVictories([...victories, e.target.value]);
                e.target.value = ''; // Clear input after adding victory
              }
            }}
          />
          <ul className="mt-3">
            {victories.map((victory, index) => (
              <li key={index} className="text-green-600">
                🏆 {victory}
              </li>
            ))}
          </ul>
        </div>

        {/* Additional Fields (Optional for Treasure Hunt Profile) */}
        <div className="mb-4">
          <label className="block text-lg font-semibold">Total Treasure Hunts Joined</label>
          <input
            type="number"
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="Enter number of hunts joined"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold">Hidden Gems Discovered</label>
          <input
            type="number"
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="Enter number of treasures found"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
