import PropTypes from 'prop-types';
import './SearchSuggest.css';
import SuggestedDishTile from './SuggestedDishTile';

const SearchSuggest = (props) => {
  return props.searchSuggestData.length ? (
    <div className="search-suggestions">
      {
        props.searchSuggestData.map((suggestion) => {
          const { info } = suggestion.dishes[0];
          return (
            <SuggestedDishTile key={info.id} dishInfo={info} restaurantInfo={suggestion.restaurant} />
          )
        })
      }
    </div>
  ) : ''
}

export default SearchSuggest;

SearchSuggest.propTypes = {
  searchSuggestData: PropTypes.array.isRequired,
};
