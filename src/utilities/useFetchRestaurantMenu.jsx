import axios from 'axios';
import { RESTAURANT_MENU } from '../constants/constants.js';
import { useState, useEffect } from 'react';
import useLocation from './useLocation';
import baseUrl from './getBaseUrl';

const useFetchRestaurantMenu = (restaurantId) => {
  const [restaurantMenu, setRestaurantMenu] = useState(null);

  const location = useLocation();

  useEffect(() => {
    if(restaurantId && location.lat && location.lng) {
      fetchRestaurantMenuData(restaurantId);
    }
  }, [restaurantId, location]);

  const fetchRestaurantMenuData = async (restaurantId) => {
    const restaurantMenuData = await axios.get(`${baseUrl}${RESTAURANT_MENU}&restaurantId=${restaurantId}&lat=${location.lat}&lng=${location.lng}`);
    const restaurantInfo = restaurantMenuData.data.data.cards.find((res) =>
      res.card.card['@type'] === 'type.googleapis.com/swiggy.presentation.food.v2.Restaurant').card.card.info;
    const restaurantMenuInfoWrapper = restaurantMenuData.data.data.cards.find((res) =>
      res?.groupedCard?.cardGroupMap?.REGULAR?.cards.find((card) =>
          card?.card?.card['@type'] === 'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'));
    const restaurantMenuInfo = restaurantMenuInfoWrapper?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((res) => res.card.card['@type'] === 'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory');
    setRestaurantMenu({
      restaurantInfo,
      restaurantMenuInfo,
    });
  }

  return restaurantMenu;
};

export default useFetchRestaurantMenu;
