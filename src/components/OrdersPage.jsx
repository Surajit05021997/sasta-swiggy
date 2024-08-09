import { useEffect, useState } from 'react';
import './OrdersPage.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import orderList from '../utilities/orderList';
import OrderTile from './OrderTile.jsx';

const OrdersPage = () => {
  const user = useSelector((state) => state.user);
  const [orderHistory, setOrderHistory] = useState([]);


  useEffect(() => {
    if(user) {
      orderList.get().then((data) => {
        console.log(data)
        setOrderHistory(data);
      })
    }
  }, [user]);

  return (
    !user ? (
      <div>
        <div>To check your orders now, log in to your account.</div>
        <Link to="/login">
          <button className='login-btn'>LOGIN</button>
        </Link>
      </div>
    ) : (
      <div>
        <div className="order-history-title">Order History</div>
        {
          orderHistory.map((order) => {
            return (<OrderTile order={order} key={order.orderId} />)
          })
        }
      </div>
    )
  );
}

export default OrdersPage;
