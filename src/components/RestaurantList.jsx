import useFetchRestaurants from '../utilities/useFeatchRestaurants.jsx';
import RestaurantTile from './RestaurantTile.jsx';
import AppShimmer from './AppShimmer.jsx';
import './RestaurantList.css';

const RestaurantList = () => {
  const restaurants = useFetchRestaurants();
  return (
    <section className="restaurant-list">
      {
        restaurants.length == 0 ? <AppShimmer /> :
        restaurants.map((restaurant) => {
          return <RestaurantTile key={restaurant.info.id} restaurant={restaurant} />
        })
      }
    </section>
  );
}

export default RestaurantList;
