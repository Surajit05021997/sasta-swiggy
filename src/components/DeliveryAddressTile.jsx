import './DeliveryAddressTile.css';

const DeliveryAddressTile = ({markerAddress}) => {
  return (
    <div className="delivery-address-tile">
      <div className="address">{markerAddress}</div>
      <button>DELIVER HERE</button>
    </div>
  );
}

export default DeliveryAddressTile;
