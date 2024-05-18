import { useContext } from 'react';
import './AddButton.css';
import CartContext from '../utilities/CartContext.jsx';
import PropTypes from 'prop-types';


const AddButton = ({ id, name, price, defaultPrice }) => {
  const { cart, setCart } = useContext(CartContext);

  const handleAddClick = () => {
    let cartCopy;
    let foodObj = cart.find((food) => food.id === id);
    if(foodObj) {
      foodObj.quantity += 1;
      cartCopy = [...cart];
    } else {
      foodObj = {
        id,
        name,
        price: price ? price : defaultPrice,
        quantity: 1,
      }
      cartCopy = [...cart, foodObj];
    }
    setCart(cartCopy);
  }

  return (
    <div className="add-buttom">
      <button onClick={handleAddClick}>ADD</button>
    </div>
  );
}

AddButton.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number,
  defaultPrice: PropTypes.number,
}

export default AddButton;
