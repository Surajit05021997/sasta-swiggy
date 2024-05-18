import { useParams } from "react-router-dom";
import useFetchRestaurantMenu from '../utilities/useFetchRestaurantMenu.jsx';
import RestaurantInfoTile from "./RestaurantInfoTile.jsx";
import RestaurantMenuTile from "./RestaurantMenuTile.jsx";
import './RestaurantMenu.css';

const RestaurantMenu = () => {
  const { restaurantId } = useParams();
  const restaurantMenu = useFetchRestaurantMenu(restaurantId);
  
  if(restaurantMenu) {
    const { restaurantInfo, restaurantMenuInfo } = restaurantMenu;
    return (
      <div className="restaurant">
        <RestaurantInfoTile restaurantInfo={restaurantInfo}/>
        <section className="restaurant-menu">
          <h2>Menu</h2>
          {
            restaurantMenuInfo.map((restaurantMenuTileInfo, index) => {
              return <RestaurantMenuTile
                        key={restaurantMenuTileInfo.card.card.title}
                        restaurantMenuTileInfo={restaurantMenuTileInfo}
                        isFirstTile={index === 0 ? true : false}
                      />
            })
          }
        </section>
      </div>
    )
  } else {
    return (<div>Loading</div>);
  }
  
}

export default RestaurantMenu;
