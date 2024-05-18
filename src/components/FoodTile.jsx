import PropTypes from 'prop-types';
import { IMAGE_URL } from '../constants/constants.js';
import AddButton from './AddButton.jsx';
import './FoodTile.css';

const FoodTile = ({ foodInfo }) => {
  const { id, name, imageId, price, defaultPrice, description } = foodInfo;
  return (
    <div className="food-tile">
      <div className="food-info">
        <h4>{name}</h4>
        <div>₹{price/100 || defaultPrice/100}</div>
        <p className="food-description">{description}</p>
      </div>
      <div className="imgae-button-container">
        <div className="food-image">
          {
            imageId ? <img src={`${IMAGE_URL}${imageId}`} alt="Food Image" /> : ''
          }
        </div>
        <AddButton id={id} name={name} price={price} defaultPrice={defaultPrice} />
      </div>
    </div>
  );
}

FoodTile.propTypes = {
  foodInfo: PropTypes.object.isRequired,
}

export default FoodTile;
