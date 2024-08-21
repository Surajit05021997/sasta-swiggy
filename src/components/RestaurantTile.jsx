import PropTypes from 'prop-types';
import { IMAGE_URL } from '../constants/constants';
import './RestaurantTile.css';

const RestaurantTile = (props) => {

  const { name, areaName, cloudinaryImageId, cuisines, sla, avgRating, aggregatedDiscountInfoV3,aggregatedDiscountInfoV2 } = props.restaurant.info;

  const getRatingClassName = () => {
    const ratingColorClass = avgRating >= 4 ? 'rating-green' : 'rating-red';
    return `rating ${ratingColorClass}`;
  };

  return (
    <div className={props.isTopRestaurant ? "restaurant-tile top-restaurant" : "restaurant-tile"}>
      <div className="restaurant-tile-image-container">
        <img className="restaurant-tile-image" src={`${IMAGE_URL}${cloudinaryImageId}`} alt="Restaurant Image" />
        {
          aggregatedDiscountInfoV3 ? (
            <div className="discount-info">{`${aggregatedDiscountInfoV3?.header ? aggregatedDiscountInfoV3.header : ''} ${aggregatedDiscountInfoV3?.subHeader ? aggregatedDiscountInfoV3.subHeader : ''}`}</div>
          ) : (
            <div className="discount-info">{`${aggregatedDiscountInfoV2?.descriptionList ? aggregatedDiscountInfoV2.descriptionList[0].meta.substring(0, aggregatedDiscountInfoV2.descriptionList[0].meta.indexOf('|')) : ''}`}</div>
          )
        }
      </div>
      <div className="restaurant-tile-info">  
        <div className="restaurant-name">{name}</div>
        <div className="restaurant-tile-info-group">
          <div className={getRatingClassName()}>{avgRating}</div>
          <div className="delivery-time">{sla.slaString}</div>
        </div>
        <div className="cuisine">{cuisines.join(', ')}</div>
        <div className="area-name">{areaName}</div>
      </div>
    </div>
  );
};

RestaurantTile.propTypes = {
  restaurant: PropTypes.object.isRequired,
  isTopRestaurant: PropTypes.bool.isRequired,
};

export default RestaurantTile;
