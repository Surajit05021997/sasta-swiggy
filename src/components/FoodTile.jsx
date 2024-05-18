import PropTypes from 'prop-types';
import { IMAGE_URL } from '../constants/constants.js';
import './FoodTile.css';

const FoodTile = ({ foodInfo }) => {
  console.log(foodInfo);
  const { name, imageId, price, defaultPrice } = foodInfo;
  return (
    <div className="food-tile">
      <div className="food-info">
        <h4>{name}</h4>
        <div>₹{price/100 || defaultPrice/100}</div>
      </div>
      <div className="food-image">
        {
          imageId ? <img src={`${IMAGE_URL}${imageId}`} alt="Food Image" /> : ''
        }
      </div>
    </div>
  );
}

FoodTile.propTypes = {
  foodInfo: PropTypes.object.isRequired,
}

export default FoodTile;
