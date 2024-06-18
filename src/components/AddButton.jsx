import { useContext, useState } from 'react';
import './AddButton.css';
import CartContext from '../utilities/CartContext.jsx';
import PropTypes from 'prop-types';
import RestaurantContext from '../utilities/RestaurantContext.jsx';
import Notification from './Notification.jsx';


const AddButton = ({ id, name, price, defaultPrice, vegClassifier, restaurantInfo }) => {
  const [showNotification, setShowNotification] = useState(false);
  const { cart, setCart } = useContext(CartContext);
  const { setSelectedRestaurant, checkoutRestaurant, setCheckoutRestaurant } = useContext(RestaurantContext);

  let currentFoodIndex;
  const getCurrentFoodCount = () => {
    const currentFood = cart?.find((food, index) => {
      currentFoodIndex = index;
      return food.id === id
    });
    return currentFood?.quantity;
  }

  const handleAddRemoveClick = (action) => {
    if (checkoutRestaurant !== null && checkoutRestaurant.id !== restaurantInfo.id) {
      setShowNotification(true);
      return;
    }

    let cartCopy = [];
    let foodObj = cart?.find((food) => food.id === id);
    if (cart !== null) {
      if (cart?.length && foodObj) {
        cartCopy = [...cart];
        if(action === 'add') {
          foodObj.quantity += 1;
          cartCopy = [...cart];
        } else if (action === 'remove') {
          if (foodObj.quantity === 1) {
            if (cart.length === 1) {
              cartCopy.splice(currentFoodIndex, 1);
              setCheckoutRestaurant(null);
            } else {
              cartCopy.splice(currentFoodIndex, 1);
            }
          } else {
            foodObj.quantity -= 1;
          }
        }
      } else {
        setSelectedRestaurant(restaurantInfo);
        setCheckoutRestaurant(restaurantInfo);
        foodObj = {
          restaurantId: restaurantInfo.id,
          id,
          name,
          price: price ? price : defaultPrice,
          quantity: 1,
          vegClassifier,
        }
        cartCopy = [...cart, foodObj];
      }
    }
    setCart(cartCopy);
    localStorage.setItem('cartDetails', JSON.stringify(cartCopy));
  }

  return (
    <div className="add-buttom">
      {
        getCurrentFoodCount() ? (
          <div className="plus-minus-button">
            <button onClick={() => handleAddRemoveClick('remove')}>-</button>
            <div>{getCurrentFoodCount()}</div>
            <button onClick={() => handleAddRemoveClick('add')}>+</button>
          </div>
        ) : (
          <button onClick={() => handleAddRemoveClick('add')}>ADD</button>
        )
      }
      {
        showNotification ? (
          <Notification setShowNotification={setShowNotification} />
        ) : ''
      }
    </div>
  );
}

AddButton.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number,
  defaultPrice: PropTypes.number,
  vegClassifier: PropTypes.string,
  restaurantInfo: PropTypes.object,
}

export default AddButton;
