import { useParams } from "react-router-dom";
import useFetchRestaurantMenu from '../utilities/useFetchRestaurantMenu.jsx';
import RestaurantInfoTile from "./RestaurantInfoTile.jsx";
import './RestaurantMenu.css';

const RestaurantMenu = () => {
  const { restaurantId } = useParams();
  const restaurantMenu = useFetchRestaurantMenu(restaurantId);
  
  if(restaurantMenu) {
    const { restaurantInfo, restaurantMenuInfo } = restaurantMenu;
    return (
      <div className="restaurant">
        <RestaurantInfoTile restaurantInfo={restaurantInfo}/>
      </div>
    )
  } else {
    return (<div>Loading</div>);
  }
  
}

export default RestaurantMenu;
