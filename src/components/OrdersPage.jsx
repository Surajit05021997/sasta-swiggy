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
        <div className="order-history-container">
          {
            orderHistory.length ? (
              orderHistory.map((order) => {
                return (<OrderTile order={order} key={order.orderId} />)
              })
            ) : (
              <div>
                <div>No Orders</div>
                <div>You haven't placed any order yet.</div>
              </div>
            )
          }
        </div>
      </div>
    )
  );
}

export default OrdersPage;
