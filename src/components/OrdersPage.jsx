import './OrdersPage.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
  const user = useSelector((state) => state.user);

  return (
    !user ? (
      <div>
        <div>To check your orders now, log in to your account.</div>
        <Link to="/login">
          <button className='login-btn'>LOGIN</button>
        </Link>
      </div>
    ) : (
      <div>Order Details</div>
    )
  );
}

export default OrdersPage;
