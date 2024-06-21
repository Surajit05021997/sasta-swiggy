import { useContext, useState, useEffect } from "react";
import RestaurantContext from "../utilities/RestaurantContext.jsx";
import CartContext from "../utilities/CartContext.jsx";
import { IMAGE_URL } from '../constants/constants.js';
import './RestaurantBill.css';
import AddButton from './AddButton.jsx';
import BillShimmer from './shimmer/BillShimmer.jsx';
import vegIcon from '../assets/veg_icon.svg';
import nonVegIcon from '../assets/non_veg_icon.svg';
import useFetchRestaurantMenu from '../utilities/useFetchRestaurantMenu.jsx';

const RestaurantBill = () => {
  const [cartDetails, setCartDetails] = useState([]);
  const [totalFoodAmount, setTotalFoodAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const { checkoutRestaurant, setSelectedRestaurant, setCheckoutRestaurant } = useContext(RestaurantContext);
  const { cart, setCart } = useContext(CartContext);
  
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
    const restaurantInfo = restaurantMenu?.restaurantInfo ? restaurantMenu?.restaurantInfo : null;
    setCheckoutRestaurant(restaurantInfo);
  }, [restaurantMenu]);

  useEffect(() => {
    const total = cartDetails?.reduce((totalFoodAmount, item) => totalFoodAmount = totalFoodAmount + ((item.price/100)*item.quantity), 0);
    setTotalFoodAmount(total);
    setTotalAmount(total + ((5*totalFoodAmount)/100) + 5);
  }, [totalFoodAmount, cartDetails]);

  return (
    checkoutRestaurant ? (<div className="restaurant-bill">
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
    </div>) : <BillShimmer />
  );
}

export default RestaurantBill;
