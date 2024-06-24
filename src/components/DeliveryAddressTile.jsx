import './DeliveryAddressTile.css';
import { useDispatch } from 'react-redux';
import { addAddress } from '../store/deliveryDetailsSlice';

const DeliveryAddressTile = ({address}) => {
  const dispatch = useDispatch();

  const handleDeliveryAddressSelection = () => {
    dispatch(addAddress(address));
  }

  return (
    <div className="delivery-address-tile">
      <div className="address">{address.markerAddress}</div>
      <button onClick={handleDeliveryAddressSelection}>DELIVER HERE</button>
    </div>
  );
}

export default DeliveryAddressTile;
