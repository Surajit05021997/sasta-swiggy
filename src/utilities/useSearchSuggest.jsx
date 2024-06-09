import { useEffect, useState } from "react";
import axios from 'axios';
import  { SEARCH_SUGGEST_URL } from '../constants/constants';
import useLocation from './useLocation';

const useSearchSuggest = (searchText) => {
  const [searchSuggest, setSearchSuggest] = useState([]);

  const location = useLocation();

  useEffect(() => {
    if(location.lat && location.lng) {
      fetchSearchSuggestData();
    }
  }, [searchText]);

  const fetchSearchSuggestData = async () => {
    const response = await axios.get(`${SEARCH_SUGGEST_URL}&lat=${location.lat}&lng=${location.lng}&str=${searchText}`);
    const filteredData = response.data.data.cards[0].groupedCard.cardGroupMap.DISH.cards.filter((card) => card.card.card['@type'] === 'type.googleapis.com/swiggy.presentation.food.v2.Dish');
    setSearchSuggest(filteredData);
  }

  return searchSuggest;
}

export default useSearchSuggest;
