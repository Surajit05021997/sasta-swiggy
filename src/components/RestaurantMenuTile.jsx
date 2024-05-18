import PropTypes from 'prop-types';
import FoodTile from './FoodTile.jsx';
import './RestaurantMenuTile.css';

const RestaurantMenuTile = ({ restaurantMenuTileInfo }) => {
  return (
    <div className="restaurant-menu-tile">
      <h3>{restaurantMenuTileInfo.card.card.title}</h3>
      {
        restaurantMenuTileInfo.card.card.itemCards.map((food) => {
          const { info } = food.card;
          return <FoodTile key={info.id} foodInfo={info} />
        })
      }
    </div>
  );
};

RestaurantMenuTile.propTypes = {
  restaurantMenuTileInfo: PropTypes.object.isRequired,
}

export default RestaurantMenuTile;
