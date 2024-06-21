import { useSelector } from 'react-redux';
import './CheckoutJourney.css';
import { useNavigate } from 'react-router-dom';
import check from '../assets/check.svg';

const CheckoutJourney = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    !user ? (
      <div className="checkout-journey">
        <div className="accout">
          <div className="flex-column gap-1">
            <div>
              <div className="fw-bold">Account</div>
              <div>To place your order now, log in to your existing account or sign up.</div>
            </div>
            <div className="login-control">
              <button onClick={() => navigate('/login', { state: { from: 'checkout' }})}>LOG IN</button>
              <button onClick={() => navigate('/sign-up', { state: { from: 'checkout' }})}>SIGN UP</button>
            </div>
          </div>
          <div>
            <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_147,h_140/Image-login_btpq7r" alt="Food Image" />
          </div>
        </div>
        <div className="delivery-address disabled">Delivery address</div>
        <div className="payment disabled">Payment</div>
      </div>
    ) : (
      <div className="checkout-journey">
        <div className="accout">
          <div className="fw-bold">Logged in</div>
          <img src={check} alt="" />
        </div>
        <div className="delivery-address">
          <div className="fw-bold">Select delivery address</div>
        </div>
        <div className="payment">
          <div className="fw-bold">Choose payment method</div>
        </div>
      </div>
    )
  )
}

export default CheckoutJourney;
