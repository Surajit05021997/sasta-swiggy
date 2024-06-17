import { useContext, useState, useEffect } from "react";
import RestaurantContext from "../utilities/RestaurantContext";
import CartContext from "../utilities/CartContext";
import { IMAGE_URL } from '../constants/constants.js';
import './Checkout.css';
import emptyCartImg from '../assets/empty_cart.webp';
import { useNavigate } from 'react-router-dom';
import AddButton from './AddButton.jsx';
import vegIcon from '../assets/veg_icon.svg';
import nonVegIcon from '../assets/non_veg_icon.svg';
import useFetchRestaurantMenu from '../utilities/useFetchRestaurantMenu.jsx';


const Checkout = () => {
  const [cartDetails, setCartDetails] = useState([]);
  const [totalFoodAmount, setTotalFoodAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const { checkoutRestaurant, setSelectedRestaurant, setCheckoutRestaurant } = useContext(RestaurantContext);
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  // const restaurantMenu = useFetchRestaurantMenu(JSON.parse(localStorage.getItem('cartDetails'))[0] ? JSON.parse(localStorage.getItem('cartDetails'))[0].restaurantId : undefined);
  const restaurantMenu = useFetchRestaurantMenu(cartDetails.length ? cartDetails[0].restaurantId : null);

  useEffect(() => {
    setSelectedRestaurant(checkoutRestaurant);
  });
  
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cartDetails')));
  }, []);

  useEffect(() => {
    setCartDetails(JSON.parse(localStorage.getItem('cartDetails')));
  }, [cart]);

  useEffect(() => {
    const restaurantInfo = restaurantMenu?.restaurantInfo;
    setCheckoutRestaurant(restaurantInfo);
    const total = cartDetails.reduce((totalFoodAmount, item) => totalFoodAmount = totalFoodAmount + ((item.price/100)*item.quantity), 0);
    setTotalFoodAmount(total);
    setTotalAmount(total + ((5*totalFoodAmount)/100) + 5);
  }, [totalFoodAmount, cartDetails, restaurantMenu]);

  if(JSON.parse(localStorage.getItem('cartDetails')).length === 0) {
    return (
      <div className="checkout">
        <div className="empty-checkout">
          <img className="empty-cart-img" src={emptyCartImg} />
          <p className="title">Your cart is empty</p>
          <p className="sub-title">You can go to home page to view more restaurants</p>
          <button className="home-btn" onClick={() => navigate('/')}>SEE RESTAURANTS</button>
        </div>
      </div>
    );
  }
  // const { name, cloudinaryImageId, areaName } = checkoutRestaurant;
  return (
    checkoutRestaurant ? (<div className="checkout">
       <div className="checkout-restaurant-info">
         <img src={`${IMAGE_URL}${checkoutRestaurant?.cloudinaryImageId}`} alt="Restaurant Image" />
         <div className="restaurant-details">
           <div>{checkoutRestaurant?.name}</div>
           <div>{checkoutRestaurant?.areaName}</div>
         </div>
       </div>
      <div className="cart-item-list">
        {
          cartDetails.map((foodItem) => {
            return (
              <div className="cart-item" key={foodItem.id}>
                <div className="left-info">
                  <div>
                  {foodItem.vegClassifier === 'VEG' ? <img className="food-classifier-icon" src={vegIcon} alt="Veg Icon" />: <img className="food-classifier-icon" src={nonVegIcon} alt="Non Veg Icon" />}
                  </div>
                  <div>{foodItem.name}</div>
                </div>
                <div className="right-info">
                  <AddButton id={foodItem.id} name={foodItem.name} price={foodItem.price} restaurantInfo={checkoutRestaurant} />
                  <div className="item-price">₹{(foodItem.price * foodItem.quantity)/100}</div>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="bill-details">
        <div className="bill-details-title">Bill Details</div>
        <div className="bill-detail-row">
          <div>Item Total</div>
          <div>₹{totalFoodAmount}</div>
        </div>
        <div className="bill-detail-row">
          <div>Platform fee</div>
          <div>₹5</div>
        </div>
        <div className="bill-detail-row">
          <div>GST and Restaurant Charges</div>
          <div>₹{(5*totalFoodAmount)/100}</div>
        </div>
      </div>
      <div className="total-amount">
        <div>TO PAY</div>
        <div>₹{totalAmount}</div>
      </div>
    </div>) : ''
  );
}

export default Checkout;
