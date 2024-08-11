import './OrderTile.scss';
import PropTypes from 'prop-types';
import { IMAGE_URL } from '../constants/constants.js';
import { Link } from 'react-router-dom';
import vegIcon from '../assets/veg_icon.svg';
import nonVegIcon from '../assets/non_veg_icon.svg';

const OrderTile = ({ order }) => {
  const { orderDetails, totalAmount, orderDate, orderTime } = order;
  return (
    <div className="order-tile">
      <div className="restaurant-info">
        <div>
          <img className="restaurant-img" src={`${IMAGE_URL}${orderDetails[0].restaurantImageId}`} alt="Restaurant Image" />
        </div>
        <div>
          <div>{orderDetails[0].restaurantName}</div>
          <div>{`${orderDetails[0].areaName}, ${orderDetails[0].city}`}</div>
          <Link to={`/restaurant/${orderDetails[0].restaurantId}`}>View menu</Link>
        </div>
      </div>
      <div>
        {
          orderDetails.map((orderItem) => {
            return (
              <div className="items" key={orderItem.id}>
                <img src={orderItem.vegClassifier === 'VEG' ? vegIcon : nonVegIcon} alt="Veg Classifier" />
                {orderItem.quantity} X {orderItem.name}
              </div>
            )
          })
        }
      </div>
      <div className="delivery-info">
        <div>Order placed on {orderDate}, {orderTime}</div>
        <div>₹{totalAmount}</div>
      </div>
    </div>
  );
}

OrderTile.propTypes = {
  order: PropTypes.object.isRequired,
}

export default OrderTile;
