import PropTypes from 'prop-types';
import FoodTile from './FoodTile.jsx';
import './RestaurantMenuTile.css';
import { useState } from 'react';
import downArrow from '../assets/down_arrow.svg';

const RestaurantMenuTile = ({ restaurantMenuTileInfo, isFirstTile }) => {
  const [isCollapsed, setIsCollapsed] = useState(isFirstTile ? false : true);

  const handleFoodCategoryClick = () => {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="restaurant-menu-tile">
      <div className="food-category" onClick={handleFoodCategoryClick}>
        <h3>{restaurantMenuTileInfo.card.card.title}</h3>
        <img src={downArrow} alt="Down Arrow" />
      </div>
      <div className={ isCollapsed ? 'collapsed ' : 'expanded ' + 'food-tile-block'}>
        {
          restaurantMenuTileInfo.card.card.itemCards.map((food) => {
            const { info } = food.card;
            return <FoodTile key={info.id} foodInfo={info} />
          })
        }
      </div>
    </div>
  );
};

RestaurantMenuTile.propTypes = {
  restaurantMenuTileInfo: PropTypes.object.isRequired,
}

RestaurantMenuTile.propTypes = {
  isFirstTile: PropTypes.bool.isRequired,
}

export default RestaurantMenuTile;
