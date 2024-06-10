import { useState } from 'react';
import './SearchPage.css';
import searchIcon from '../assets/search.svg';
import usePreSearch from '../utilities/usePreSearch';
import useSearchSuggest from '../utilities/useSearchSuggest';
import { IMAGE_URL } from '../constants/constants';
import SearchSuggest from './SearchSuggest';

const SearchPage = () => {
  const [searchText, setSearchText] = useState('');

  const preSearchData = usePreSearch();
  const searchSuggestData = useSearchSuggest(searchText);

  const showSuggestion = (cuisine) => {
    const index = cuisine.action.link.indexOf('=');
    setSearchText(cuisine.action.link.slice(index+1));
  }

  return (
    <div className="search">
      <div className="search-bar">
        <input type="text" placeholder="Search for restaurants and food" />
        <img src={searchIcon} alt="Search Icon" />
      </div>
      <div className="popular-cuisines">
        <div className="popular-cuisines-title">Popular Cuisines</div>
        <div className="popular-cuisine-list">
          {
            preSearchData.length ? (preSearchData.map((cuisine) => {
              return (
                <div key={cuisine.id}>
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
      <SearchSuggest searchSuggestData={searchSuggestData} />
    </div>
  );
}

export default SearchPage;
