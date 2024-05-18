import './RestaurantInfoTile.css';
import PropTypes from 'prop-types';

const RestaurantInfoTile = ({ restaurantInfo }) => {
  const getRatingClassName = () => {
    const ratingColorClass = restaurantInfo.avgRating >= 4 ? 'rating-green' : 'rating-red';
    return `rating ${ratingColorClass}`;
  };

  const getDelivertyCostInfo = () => {
    const startIndex = restaurantInfo.feeDetails.message.indexOf('kms') - 4;
    const endIndex = startIndex + 7;
    const distance = restaurantInfo.feeDetails.message.slice(startIndex, endIndex);
    const deliveryCost = restaurantInfo.feeDetails.totalFee/100;
    return `${distance} | ₹ ${deliveryCost} Delivery fee will apply`;
  }

  return (
    <section className="restaurant-info-tile">
      <h1>{restaurantInfo.name}</h1>
      <div className="restaurant-info">
        <div className="rating-cost-info">
          <div className={getRatingClassName()}>{restaurantInfo.avgRating}</div>
          <div>&nbsp;{`(${restaurantInfo.totalRatingsString}) • ${restaurantInfo.costForTwoMessage}`}</div>
        </div>
        <div className="cuisine-info">
          {restaurantInfo.cuisines.join(', ')}
        </div>
        <div className="divider"></div>
        <div className="delivery-cost-info">
          {getDelivertyCostInfo()}
        </div>
      </div>
    </section>
  );
}

RestaurantInfoTile.propTypes = {
  restaurantInfo: PropTypes.object.isRequired,
};

export default RestaurantInfoTile;