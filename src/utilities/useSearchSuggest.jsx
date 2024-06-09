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
    const response = await axios.get(`${SEARCH_SUGGEST_URL}?lat=${location.lat}&lng=${location.lng}&str=${searchText}`);
    setSearchSuggest(response.data.data.suggestions);
  }

  return searchSuggest;
}

export default useSearchSuggest;
