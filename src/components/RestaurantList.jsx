import useFetchRestaurants from '../utilities/useFeatchRestaurants.jsx';
import RestaurantTile from './RestaurantTile.jsx';
import AppShimmer from './AppShimmer.jsx';
import { Link } from 'react-router-dom';
import './RestaurantList.css';

const RestaurantList = () => {
  const restaurants = useFetchRestaurants();
  return (
    <section className="restaurant-list">
      {
        restaurants.length == 0 ? <AppShimmer /> :
        restaurants.map((restaurant) => {
          return (
            <Link to={`/restaurant/${restaurant.info.id}`} key={restaurant.info.id}>
              <RestaurantTile restaurant={restaurant} />
            </Link>
          );
        })
      }
    </section>
  );
}

export default RestaurantList;
