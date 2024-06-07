import { useState, useEffect } from 'react';
import axios from 'axios';
import { SWIGGY_API_URL } from '../constants/constants';
import useLocation from './useLocation';

const useFetchRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  const location = useLocation();

  useEffect(() => {
    if(location.lat && location.lng) {
      fetchRestaurantData();
    }
  }, [location]);
  
  
  const fetchRestaurantData = async () => {
    const restaurantData = await axios.get(`${SWIGGY_API_URL}&lat=${location.lat}&lng=${location.lng}`);
    const restaurantListData = restaurantData?.data?.data?.cards.find((res) => res?.card?.card?.gridElements?.infoWithStyle['@type'] === 'type.googleapis.com/swiggy.presentation.food.v2.FavouriteRestaurantInfoWithStyle');
    const restaurantsList = restaurantListData?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    setRestaurants(restaurantsList);
  }
  return restaurants;
}

export default useFetchRestaurants;
