import { useState, useEffect } from 'react';
import axios from 'axios';
import { SWIGGY_API_URL } from '../constants/constants';

const useFetchRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurantData();
  }, []);
  
  const fetchRestaurantData = async () => {
    const restaurantData = await axios.get(SWIGGY_API_URL);
    const restaurantListData = restaurantData.data.data.cards.find((res) => res.card.card.gridElements.infoWithStyle['@type'] === 'type.googleapis.com/swiggy.presentation.food.v2.FavouriteRestaurantInfoWithStyle');
    const restaurantsList = restaurantListData.card.card.gridElements.infoWithStyle.restaurants;
    setRestaurants(restaurantsList);
  }
  return restaurants;
}

export default useFetchRestaurants;
