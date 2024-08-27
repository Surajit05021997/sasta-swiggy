import { useState, useEffect } from "react";
import useLocation from './useLocation';
import axios from 'axios';
import { PRE_SEARCH_URL } from '../constants/constants';
import baseUrl from './getBaseUrl';
import { useDispatch } from 'react-redux';
import { updateServiceError } from '../store/errorSlice';

const usePreSearch = () => {
  const [preSearchData, setPreSearchData] = useState([]);
  
  const { location } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if(location.lat && location.lng) {
      fetchPreSearchtData();
    }
  }, [location]);

  const fetchPreSearchtData = async () => {
    try {
      const response = await axios.get(`${baseUrl}${PRE_SEARCH_URL}?lat=${location.lat}&lng=${location.lng}`);
      const filteredData =  response.data.data.cards.find((card) => card.card.card['@type'] === 'type.googleapis.com/swiggy.gandalf.widgets.v2.GridWidget').card.card.imageGridCards.info;
      setPreSearchData(filteredData);
    } catch(error) {
      dispatch(updateServiceError(true));
    }
  }

  return preSearchData;
}

export default usePreSearch;
