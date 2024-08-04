import { useEffect, useState } from "react";
import axios from 'axios';
import  { SEARCH_SUGGEST_URL } from '../constants/constants';
import useLocation from './useLocation';
import baseUrl from './getBaseUrl';
import { useDispatch } from 'react-redux';
import { updateServiceError } from '../store/errorSlice';

const useSearchSuggest = (searchText) => {
  const [searchSuggest, setSearchSuggest] = useState(null);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if(location.lat && location.lng) {
      setSearchSuggest(null);
      if (searchText) {
        fetchSearchSuggestData();
      }
    }
  }, [searchText]);

  const fetchSearchSuggestData = async () => {
    try {
      const response = await axios.get(`${baseUrl}${SEARCH_SUGGEST_URL}&lat=${location.lat}&lng=${location.lng}&str=${searchText}`);
      let filteredData = [];
      if(response.data.data.cards[0].groupedCard.cardGroupMap.DISH.cards) {
        const filteredDataList = response.data.data.cards[0].groupedCard.cardGroupMap.DISH.cards.filter((card) => card.card.card['@type'] === 'type.googleapis.com/swiggy.presentation.food.v2.DishGroup');
        filteredData = filteredDataList.map((data) => data.card.card);
      }
      setSearchSuggest(filteredData);
    } catch(error) {
      dispatch(updateServiceError(true));
    }
  }

  return searchSuggest;
}

export default useSearchSuggest;
