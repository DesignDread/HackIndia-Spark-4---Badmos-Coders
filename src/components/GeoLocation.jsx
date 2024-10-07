import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const GeolocationApproval = () => {
  const [hostCoords, setHostCoords] = useState({ lat: '', lng: '', range: '' });
  const [userCoords, setUserCoords] = useState(null);
  const [isApproved, setIsApproved] = useState(false);
  const [error, setError] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Haversine formula to calculate distance
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
    return R * c; // Distance in km
  };

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

  const checkApproval = () => {
    if (userCoords && hostCoords.lat && hostCoords.lng && hostCoords.range) {
      const distance = calculateDistance(
        hostCoords.lat,
        hostCoords.lng,
        userCoords.lat,
        userCoords.lng
      );

      setIsApproved(distance <= hostCoords.range);
    }
  };

  useEffect(() => {
    fetchUserLocation();
  }, []);

  useEffect(() => {
    if (userCoords) {
      checkApproval();
    }
  }, [userCoords, hostCoords]);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        setHostCoords((prev) => ({ ...prev, lat, lng }));
        setSelectedLocation([lat, lng]);
      },
    });
    return null;
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
        <MapContainer center={selectedLocation || [0, 0]} zoom={4} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapClickHandler />
          {selectedLocation && <Marker position={selectedLocation} icon={new L.Icon({ iconUrl: 'https://example.com/marker-icon.png' })} />}
          {userCoords && <Marker position={[userCoords.lat, userCoords.lng]} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default GeolocationApproval;
