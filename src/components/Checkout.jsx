import { useContext } from "react";
import RestaurantContext from "../utilities/RestaurantContext";
import { IMAGE_URL } from '../constants/constants.js';
import './Checkout.css';

const Checkout = () => {
  const { selectedRestaurant } = useContext(RestaurantContext);
  const { name, cloudinaryImageId, areaName } = selectedRestaurant;
  return (
    <div className="checkout">
      <div className="checkout-restaurant-info">
        <img src={`${IMAGE_URL}${cloudinaryImageId}`} alt="Restaurant Image" />
        <div>
          <div>{name}</div>
          <div>{areaName}</div>
        </div>
      </div>
      <div className="food-items"></div>
      <div className="bill-details"></div>
    </div>
  );
}

export default Checkout;
