import { useEffect } from 'react';
import './SearchPage.css';
import searchIcon from '../assets/search.svg';
import usePreSearch from '../utilities/usePreSearch';
import { IMAGE_URL } from '../constants/constants';

const SearchPage = () => {
  const preSearchData = usePreSearch();

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
            preSearchData.map((cuisine) => {
              return (
                <div key={cuisine.id}>
                  <img src={`${IMAGE_URL}${cuisine.imageId}`}/>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
