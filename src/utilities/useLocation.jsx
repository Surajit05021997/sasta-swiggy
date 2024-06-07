import { useState, useEffect } from 'react';

const useLocation = () => {
  const [location, setLocation] = useState({});
  const [locationError, setLocationError] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  const success = (position) => {
    const locationCopy = {};
    locationCopy.lat = position.coords.latitude;
    locationCopy.lng = position.coords.longitude;
    setLocation(locationCopy);
  }

  const error = () => {
    console.log('Pleasse enable location');
    setLocationError(true);
  }

  return location;
}

export default useLocation;
