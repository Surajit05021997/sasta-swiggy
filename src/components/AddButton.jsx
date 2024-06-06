import { useContext, useState } from 'react';
import './AddButton.css';
import CartContext from '../utilities/CartContext.jsx';
import PropTypes from 'prop-types';
import RestaurantContext from '../utilities/RestaurantContext.jsx';
import Notification from './Notification.jsx';


const AddButton = ({ id, name, price, defaultPrice, vegClassifier }) => {
  const [showNotification, setShowNotification] = useState(false);
  const { cart, setCart } = useContext(CartContext);
  const { selectedRestaurant, checkoutRestaurant, setCheckoutRestaurant } = useContext(RestaurantContext);

  let currentFoodIndex;
  const getCurrentFoodCount = () => {
    const currentFood = cart.find((food, index) => {
      currentFoodIndex = index;
      return food.id === id
    });
    return currentFood?.quantity;
  }

  const handleAddRemoveClick = (action) => {
    if((checkoutRestaurant?.id !== selectedRestaurant?.id) && checkoutRestaurant !== null) {
      setShowNotification(true);
      return;
    }

    let cartCopy = [...cart];
    let foodObj = cart.find((food) => food.id === id);
    if(foodObj) {
      if(action === 'add') {
        foodObj.quantity += 1;
        cartCopy = [...cart];
      } else if (action === 'remove') {
        foodObj.quantity === 1 ? cartCopy.splice(currentFoodIndex, 1) :
          foodObj.quantity -= 1;
      }
    } else {
      foodObj = {
        id,
        name,
        price: price ? price : defaultPrice,
        quantity: 1,
        vegClassifier,
      }
      cartCopy = [...cart, foodObj];
    }
    setCart(cartCopy);
    cartCopy.length ? setCheckoutRestaurant(selectedRestaurant) : setCheckoutRestaurant(null);
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
}

export default AddButton;
