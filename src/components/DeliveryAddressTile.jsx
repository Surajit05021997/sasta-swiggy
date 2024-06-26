import './DeliveryAddressTile.css';
import { useDispatch } from 'react-redux';
import { addAddress } from '../store/deliveryDetailsSlice';
import PropTypes from 'prop-types';

const DeliveryAddressTile = ({address}) => {
  const dispatch = useDispatch();

  const handleDeliveryAddressSelection = () => {
    dispatch(addAddress(address));
  }

  return (
    <div className="delivery-address-tile">
      <div className="address truncate">{address.markerAddress}</div>
      <button onClick={handleDeliveryAddressSelection}>DELIVER HERE</button>
    </div>
  );
}

DeliveryAddressTile.propTypes = {
  address: PropTypes.object.isRequired,
}

export default DeliveryAddressTile;
