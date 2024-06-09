import PropTypes from 'prop-types';
import { IMAGE_URL } from '../constants/constants';
import './SearchSuggest.css';

const SearchSuggest = (props) => {
  return (
    <div className="search-suggestions">
      {
        props.searchSuggestData.map((suggestion, index) => {
          return (
            <div className="search-suggest-tile" key={index}>
              <div className='suggest-image-container'>
                <img src={`${IMAGE_URL}${suggestion.cloudinaryId}`} alt="Search Image" />
              </div>
              <div>
                <div>{suggestion.text}</div>
                <div>{suggestion.tagToDisplay}</div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default SearchSuggest;

SearchSuggest.propTypes = {
  searchSuggestData: PropTypes.array.isRequired,
};
