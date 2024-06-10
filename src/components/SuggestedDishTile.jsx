import './SuggestedDishTile.css';
import { IMAGE_URL } from '../constants/constants';
import PropTypes from 'prop-types';
import rightArrow from '../assets/right_arrow.svg';
import { useNavigate } from 'react-router-dom';
import vegIcon from '../assets/veg_icon.svg';
import nonVegIcon from '../assets/non_veg_icon.svg';
import AddButton from './AddButton.jsx';

const SuggestedDishTile = (props) => {
  const { dishInfo, restaurantInfo } = props;
  const navigate = useNavigate();

  const naviagteToRestaurant = () => {
    navigate(`/restaurant/${restaurantInfo.info.id}`);
  }

  return (
    <div className="suggested-dish-tile">
      <div className="suggested-dish-tile-top" onClick={naviagteToRestaurant}>
        <div>
          <div className="suggested-restaurant-name">By {restaurantInfo.info.name}</div>
          <div>{restaurantInfo.info.costForTwoMessage}</div>
        </div>
        <div>
          <img src={rightArrow} alt="Right Arrow" />
        </div>
      </div>
      <div className="suggested-dish-tile-bottom">
        <div>
          {
            dishInfo.isVeg === 1 ? (
              <img src={vegIcon} alt="Veg Icon" />
            ) : (
              <img src={nonVegIcon} alt="Non Veg Icon" />
            )
          }
          <div>{dishInfo.name}</div>
          <div>₹{dishInfo.price/100}</div>
        </div>
        <div className="flex-column gap-1 align-items-center">
          {
            dishInfo.imageId ? (<div className='suggested-dish-image-container'>
              {
                dishInfo.imageId ? <img src={`${IMAGE_URL}${dishInfo.imageId}`} alt="Search Image" /> : ''
              }
            </div>) : ''
          }
          <AddButton id={dishInfo.id} name={dishInfo.name} price={dishInfo.price} vegClassifier={dishInfo.isVeg === 1 ? 'VEG' : 'NONVEG'} restaurantInfo={restaurantInfo.info} />
        </div>
      </div>
    </div>
  )
}

export default SuggestedDishTile;

SuggestedDishTile.propTypes = {
  dishInfo: PropTypes.object.isRequired,
  restaurantInfo: PropTypes.object.isRequired,
};
