import { useState, useEffect } from 'react';
import axios from 'axios';
import { SWIGGY_API_URL, SWIGGY_MOBILE_API_URL } from '../constants/constants';
import useLocation from './useLocation';
import baseUrl from './getBaseUrl';
import { useDispatch } from 'react-redux';
import { updateServiceError } from '../store/errorSlice';

const useFetchRestaurants = () => {
  const [restaurants, setRestaurants] = useState(null);
  const [topRestaurants, setTopRestaurants] = useState(null);
  const [topRestaurantsTitle, setTopRestaurantsTitle] = useState('');
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
      const restaurantListData = restaurantData?.data?.data?.cards.find((card) => card?.card?.card?.id === 'restaurant_grid_listing');
      const restaurantsList = restaurantListData?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      setRestaurants(restaurantsList);
      const restaurantListTitleData = restaurantData?.data?.data?.cards.find((card) => card?.card?.card?.id === 'popular_restaurants_title')?.card?.card?.title;
      setRestaurantListTitle(restaurantListTitleData);

      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        const mobileRestaurantData = await axios.get(`${baseUrl}${SWIGGY_MOBILE_API_URL}?lat=${location.lat}&lng=${location.lng}`);
        const topRestaurantsData = mobileRestaurantData.data.data.success.cards.find((card) => card.gridWidget.header.title === 'Top Picks For You').gridWidget.gridElements.infoWithStyle.restaurants;
        setTopRestaurants(topRestaurantsData);
        setTopRestaurantsTitle('Top Picks For You');
      }else{
        const topRestaurantsData = restaurantData?.data?.data?.cards?.find((card) => card?.card?.card?.id === 'top_brands_for_you')?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        const topRestaurantsTitleData = restaurantData?.data?.data?.cards?.find((card) => card?.card?.card?.id === 'top_brands_for_you')?.card?.card?.header?.title;
        setTopRestaurants(topRestaurantsData);
        setTopRestaurantsTitle(topRestaurantsTitleData);
      }
    } catch(error) {
      dispatch(updateServiceError(true));
    }
  }
  return {restaurants, restaurantListTitle, topRestaurants, topRestaurantsTitle, restaurantNotAvailableData};
}

export default useFetchRestaurants;
