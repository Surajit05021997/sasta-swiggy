import { useState, useEffect } from 'react';

const useLocation = () => {
  const [location, setLocation] = useState({});
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  const success = (position) => {
    const locationCopy = {};
    locationCopy.lat = position.coords.latitude;
    locationCopy.lng = position.coords.longitude;
    setLocation(locationCopy);
  }

  const error = (error) => {
    console.log('Pleasse enable location');
    if(error.message === 'User denied Geolocation') {
      setLocationError({
        message:"Please allow location",
      });
    }
  }

  return { location, locationError };
}

export default useLocation;
