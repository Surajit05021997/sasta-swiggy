import axios from 'axios';
import './PaymentPage.css';
import swiggyLogo from '../assets/swiggy_logo.svg';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import CartContext from '../utilities/CartContext.jsx';
import RestaurantContext from '../utilities/RestaurantContext.jsx';
import { updateIsOrderPlaced } from '../store/deliveryDetailsSlice.js';

const PaymentPage = () => {
  const user = useSelector((state) => state.user);
  const { cart, setCart } = useContext(CartContext);
  const { checkoutRestaurant, setCheckoutRestaurant } = useContext(RestaurantContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePayment = async (event) => {
    const totalFoodAmount = cart?.reduce((totalFoodAmount, item) => totalFoodAmount = totalFoodAmount + ((item.price/100)*item.quantity), 0);
    const toPay = totalFoodAmount + ((5*totalFoodAmount)/100) + 5 + ((checkoutRestaurant?.feeDetails?.totalFee)/100);
    const response = await axios.post('https://sasta-swiggy-server.vercel.app/order', {
      amount: toPay * 100,
    });
    const {amount, id} = response.data;

    var options = {
      key_id: "",
      amount,
      currency: "INR",
      name: "Sasta Swiggy",
      description: "Test Transaction",
      image: swiggyLogo,
      order_id: id,
      handler: async function (response){
        dispatch(updateIsOrderPlaced(true));
        setCart([]);
        setCheckoutRestaurant(null);
        localStorage.setItem('cartDetails', JSON.stringify([]));
        navigate('/');
      },
      prefill: {
          name: user.displayName,
          email: user.email, 
          // contact: "9000090000"
      },
      notes: {
          address: "Razorpay Corporate Office"
      },
      theme: {
          color: "#FC8019"
      }
    };
    let rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response){
            // alert(response.error.code);
            // alert(response.error.description);
            // alert(response.error.source);
            // alert(response.error.step);
            // alert(response.error.reason);
            // alert(response.error.metadata.order_id);
            // alert(response.error.metadata.payment_id);
            alert('Payment failed')
    });
    rzp1.open();
    event.preventDefault();
  }

  return (
    <div>
      <button className="payment-btn" onClick={handlePayment}>PROCEED TO PAY</button>
    </div>
  )
}

export default PaymentPage;
