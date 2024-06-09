import './SuggestedDishTile.css';
import { IMAGE_URL } from '../constants/constants';
import PropTypes from 'prop-types';

const SuggestedDishTile = (props) => {
  const { dishInfo, restaurantInfo } = props;
  return (
    <div className="search-suggest-tile">
      <div className='suggest-image-container'>
        {
          dishInfo.imageId ? <img src={`${IMAGE_URL}${dishInfo.imageId}`} alt="Search Image" /> : ''
        }
      </div>
      <div>
        <div>{dishInfo.name}</div>
      </div>
    </div>
  )
}

export default SuggestedDishTile;

SuggestedDishTile.propTypes = {
  dishInfo: PropTypes.object.isRequired,
  restaurantInfo: PropTypes.object.isRequired,
};
