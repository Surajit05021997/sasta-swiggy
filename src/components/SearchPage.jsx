import { useState, useEffect } from 'react';
import './SearchPage.css';
import searchIcon from '../assets/search.svg';
import usePreSearch from '../utilities/usePreSearch';
import useSearchSuggest from '../utilities/useSearchSuggest';
import { IMAGE_URL } from '../constants/constants';
import SearchSuggest from './SearchSuggest';
import SearchDishShimmer from './shimmer/SearchDishShimmer';
import { useSelector } from 'react-redux';
import ServiceErrorPage from './ServiceErrorPage.jsx';

const SearchPage = () => {
  const [searchText, setSearchText] = useState('');
  const [searchInputText, setSearchInputText] = useState('');

  const preSearchData = usePreSearch();
  const searchSuggestData = useSearchSuggest(searchText);
  const error = useSelector((state) => state.error);

  const showSuggestion = (cuisine) => {
    const index = cuisine.action.link.indexOf('=');
    setSearchText(cuisine.action.link.slice(index+1));
    setSearchInputText(cuisine.action.link.slice(index+1));
  }

  useEffect(() => {
    const getData = setTimeout(() => {
      setSearchText(searchInputText);
    }, 1000);
    return () => clearTimeout(getData);
  }, [searchInputText]);

  const handleChange = (event) => {
    const value = event.target.value 
    setSearchInputText(value);
  };

  return (
    error.serviceError? (
      <ServiceErrorPage />
    ) : (
      <div className="search">
        <div className="search-bar">
          <input type="text" placeholder="Search for food" value={searchInputText} onChange={(e) => handleChange(e)} />
          <img src={searchIcon} alt="Search Icon" />
        </div>
        <div className="popular-cuisines">
          <div className="popular-cuisines-title">Popular Cuisines</div>
          <div className="popular-cuisine-list">
            {
              preSearchData.length ? (preSearchData.map((cuisine) => {
                return (
                  <div className="popular-cuisine-item" key={cuisine.id}>
                    <img src={`${IMAGE_URL}${cuisine.imageId}`} onClick={() => showSuggestion(cuisine)} />
                  </div>
                )
              })) : (
                <div className="popular-cuisine-shimmer">
                  {
                    [1,2,3,4,5,6,7,8,9,10,11,12].map((item) => {
                      return (
                        <div className="" key={item}>
                          <div className="shimmer-image-holder"></div>
                          <div className="shimmer-title-holder"></div>
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        </div>
        {
          (searchInputText&&!searchSuggestData) ? <SearchDishShimmer /> : (searchInputText&&searchSuggestData.length) ? <SearchSuggest searchSuggestData={searchSuggestData} /> : searchInputText ? (
            <div>
              <div className="fw-bold">Search result for {`"${searchInputText}"`}</div>
              <div>No dishes found!</div>
            </div>
          ) : ''
        }
      </div>
    )
  );
}

export default SearchPage;
