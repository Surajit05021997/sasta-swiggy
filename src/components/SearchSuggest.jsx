import PropTypes from 'prop-types';
import './SearchSuggest.css';
import SuggestedDishTile from './SuggestedDishTile';

const SearchSuggest = (props) => {
  return (
    <div className="search-suggestions">
      {
        props.searchSuggestData.map((suggestion) => {
          const { info, restaurant } = suggestion.card.card;
          return (
            <SuggestedDishTile key={info.id} dishInfo={info} restaurantInfo={restaurant} />
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
