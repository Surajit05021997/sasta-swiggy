import { useState, useEffect } from 'react';
import axios from 'axios';
import { SWIGGY_API_URL } from '../constants/constants';

const useFetchRestaurants = () => {
  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    fetchRestaurantData();
  }, []);
  
  const fetchRestaurantData = async () => {
    const restaurantData = await axios.get(SWIGGY_API_URL);
    const restaurantsList = restaurantData.data.data.cards[4].card.card.gridElements.infoWithStyle.restaurants;
    setRestaurants(restaurantsList);
  }
  return restaurants;
}

export default useFetchRestaurants;
