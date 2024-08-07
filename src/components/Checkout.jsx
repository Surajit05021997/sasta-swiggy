import RestaurantBill from "./RestaurantBill";
import CheckoutJourney from "./CheckoutJourney";
import SpinnerLoader from "./SpinnerLoader";
import emptyCartImg from '../assets/empty_cart.webp';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import CartContext from '../utilities/CartContext.jsx';
import { useSelector } from 'react-redux';
import './Checkout.css';
import ServiceErrorPage from './ServiceErrorPage.jsx';

const Checkout = () => {
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const { cart } = useContext(CartContext);

  const deliveryDetails = useSelector((state) => state.deliveryDetails);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    setIsCartEmpty(JSON.parse(localStorage.getItem('cartDetails')) ? JSON.parse(localStorage.getItem('cartDetails')).length === 0 : true)
  }, [cart]);
  const navigate = useNavigate();

  return (
    isCartEmpty ? (
      <div className="empty-checkout">
        <img className="empty-cart-img" src={emptyCartImg} />
        <p className="title">Your cart is empty</p>
        <p className="sub-title">You can go to home page to view more restaurants</p>
        <button className="home-btn" onClick={() => navigate('/')}>SEE RESTAURANTS</button>
      </div>
    ) : (
      error.serviceError ? (
        <ServiceErrorPage />
      ) : (
        <div className="checkout">
          <CheckoutJourney />
          <RestaurantBill />
          {
            deliveryDetails.isPaymentLoading ? <SpinnerLoader /> : ''
          }
        </div>
      )
    )
  )
}

export default Checkout;
