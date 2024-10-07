import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const GeolocationApproval = () => {
  const [hostCoords, setHostCoords] = useState({ lat: '', lng: '', range: '' });
  const [userCoords, setUserCoords] = useState(null);
  const [isApproved, setIsApproved] = useState(false);
  const [error, setError] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null); // for map selected coordinates

  // Function to calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  // Function to fetch user's current coordinates
  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setError('Unable to retrieve your location');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  // Function to check if the user's location is within the host's range
  const checkApproval = () => {
    if (userCoords && hostCoords.lat && hostCoords.lng && hostCoords.range) {
      const distance = calculateDistance(
        hostCoords.lat,
        hostCoords.lng,
        userCoords.lat,
        userCoords.lng
      );

      // If distance is less than or equal to host's defined range, approve
      if (distance <= hostCoords.range) {
        setIsApproved(true);
      } else {
        setIsApproved(false);
      }
    }
  };

  // Trigger the location fetch when the component mounts
  useEffect(() => {
    fetchUserLocation();
  }, []);

  useEffect(() => {
    if (userCoords) {
      checkApproval();
    }
  }, [userCoords, hostCoords]);

  // Handle click on the map to set the selected coordinates
  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setHostCoords((prev) => ({ ...prev, lat, lng }));
    setSelectedLocation({ lat, lng });
  };

  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Geolocation Approval</h2>

      <div className="mb-4">
        <label>Host Latitude: </label>
        <input
          type="number"
          className="border p-2"
          value={hostCoords.lat}
          onChange={(e) => setHostCoords({ ...hostCoords, lat: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label>Host Longitude: </label>
        <input
          type="number"
          className="border p-2"
          value={hostCoords.lng}
          onChange={(e) => setHostCoords({ ...hostCoords, lng: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label>Range (km): </label>
        <input
          type="number"
          className="border p-2"
          value={hostCoords.range}
          onChange={(e) => setHostCoords({ ...hostCoords, range: e.target.value })}
        />
      </div>

      <div className="mt-4">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p>User Location: {userCoords ? `(${userCoords.lat}, ${userCoords.lng})` : 'Fetching...'}</p>
        )}
      </div>

      <div className="mt-4">
        {isApproved ? (
          <p className="text-green-500 font-bold">User Approved!</p>
        ) : (
          <p className="text-red-500 font-bold">User Not Approved!</p>
        )}
      </div>

      <div className="mt-4">
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={selectedLocation || { lat: 0, lng: 0 }}
            zoom={4}
            onClick={handleMapClick}
          >
            {selectedLocation && <Marker position={selectedLocation} />}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default GeolocationApproval;
