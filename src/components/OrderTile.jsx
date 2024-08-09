import './OrderTile.css';
import PropTypes from 'prop-types';

const OrderTile = ({ order }) => {
  const { orderDetails } = order;
  return (
    <div>{orderDetails[0].restaurantName}</div>
  );
}

OrderTile.propTypes = {
  order: PropTypes.object.isRequired,
}

export default OrderTile;
