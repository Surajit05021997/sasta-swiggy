import { useContext, useEffect } from "react";
import CartContext from "../utilities/CartContext";
import PropTypes from 'prop-types';
import './Notification.css';
import RestaurantContext from '../utilities/RestaurantContext.jsx';



const Notification = ({ setShowNotification }) => {
  const { setCart } = useContext(CartContext);
  const {  setCheckoutRestaurant } = useContext(RestaurantContext);

  useEffect(() => {
    const dialog = document.querySelector("dialog");
    const confirmBtn = document.querySelector(".confirm-btn") ; 
    const cancelBtn = document.querySelector(".cancel-btn") ; 
    confirmBtn.addEventListener('click', () => {
      setCart([]);
      dialog.close();
      setCheckoutRestaurant(null)
      setShowNotification(false);
    });
    cancelBtn.addEventListener('click', () => {
      dialog.close();
      setShowNotification(false);
    });
  });

  return (
    <div className="notification">
      <dialog open>
        <p className="notification-heading">Items already in cart</p>
        <p>Your cart contains items from other restaurant.
          Would you like to reset your cart for adding items from this restaurant?</p>
        <div className="btn-grp">
          <button className="cancel-btn">NO</button>
          <button className="confirm-btn">YES</button>
        </div>
      </dialog>
    </div>
  );
}

Notification.propTypes = {
  setShowNotification: PropTypes.func.isRequired,
}

export default Notification;
