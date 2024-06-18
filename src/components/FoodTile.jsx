import PropTypes from 'prop-types';
import { useContext, useEffect } from "react";
import { IMAGE_URL } from '../constants/constants.js';
import AddButton from './AddButton.jsx';
import './FoodTile.css';
import vegIcon from '../assets/veg_icon.svg';
import nonVegIcon from '../assets/non_veg_icon.svg';
import RestaurantContext from "../utilities/RestaurantContext";
import CartContext from "../utilities/CartContext";

const FoodTile = ({ foodInfo }) => {
  const { id, name, imageId, price, defaultPrice, description, itemAttribute } = foodInfo;
  const vegClassifier = itemAttribute?.vegClassifier;
  const { selectedRestaurant } = useContext(RestaurantContext);
  const { setCart } = useContext(CartContext);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cartDetails')));
  }, []);

  return (
    <div className="food-tile">
      <div className="food-info">
        <div>{vegClassifier === 'VEG' ? <img className="food-classifier-icon" src={vegIcon} alt="Veg Icon" />: <img className="food-classifier-icon" src={nonVegIcon} alt="Non Veg Icon" />}</div>
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
        <AddButton id={id} name={name} price={price} vegClassifier={vegClassifier} defaultPrice={defaultPrice} restaurantInfo={selectedRestaurant} />
      </div>
    </div>
  );
}

FoodTile.propTypes = {
  foodInfo: PropTypes.object.isRequired,
}

export default FoodTile;
