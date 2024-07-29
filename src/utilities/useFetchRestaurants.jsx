import { useState, useEffect } from 'react';
import axios from 'axios';
import { SWIGGY_API_URL } from '../constants/constants';
import useLocation from './useLocation';
import baseUrl from './getBaseUrl';
import { useDispatch } from 'react-redux';
import { updateServiceError } from '../store/errorSlice';

const useFetchRestaurants = () => {
  const [restaurants, setRestaurants] = useState(null);
  const [restaurantListTitle, setRestaurantListTitle] = useState('');
  const [restaurantNotAvailableData, setRestaurantNotAvailableData] = useState(null);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if(location.lat && location.lng) {
      fetchRestaurantData();
    }
  }, [location]);
  
  
  const fetchRestaurantData = async () => {
    try {
      const restaurantData = await axios.get(`${baseUrl}${SWIGGY_API_URL}&lat=${location.lat}&lng=${location.lng}`);
      const restaurantNotAvailableDataResponse = restaurantData?.data?.data?.cards.find((card) => card?.card?.card?.id === 'swiggy_not_present');
      setRestaurantNotAvailableData(restaurantNotAvailableDataResponse?.card?.card);
      const restaurantListData = restaurantData?.data?.data?.cards.find((res) => res?.card?.card?.gridElements?.infoWithStyle['@type'] === 'type.googleapis.com/swiggy.presentation.food.v2.FavouriteRestaurantInfoWithStyle');
      const restaurantsList = restaurantListData?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      setRestaurants(restaurantsList);
      const restaurantListTitleData = restaurantData?.data?.data?.cards.find((card) => card?.card?.card?.id === 'popular_restaurants_title')?.card?.card?.title;
      setRestaurantListTitle(restaurantListTitleData);
    } catch(error) {
      dispatch(updateServiceError(true));
    }
  }
  return {restaurants, restaurantListTitle, restaurantNotAvailableData};
}

export default useFetchRestaurants;
