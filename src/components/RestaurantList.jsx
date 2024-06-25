import useFetchRestaurants from '../utilities/useFetchRestaurants.jsx';
import RestaurantTile from './RestaurantTile.jsx';
import RestaurantListShimmer from './shimmer/RestaurantListShimmer.jsx';
import { Link } from 'react-router-dom';
import './RestaurantList.css';

const RestaurantList = () => {
  const {restaurants, restaurantListTitle, restaurantNotAvailableData} = useFetchRestaurants();
  console.log(restaurantNotAvailableData)
  console.log(restaurants)
  return (
    <div>
      <div className="restaurant-list-title">{restaurantListTitle}</div>
      <section className="restaurant-list">
        {
          !restaurants && !restaurantNotAvailableData ? <RestaurantListShimmer /> :
          ( !restaurants && restaurantNotAvailableData ? (
            <div className="restaurant-not-available">
              <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png" alt="No restaurant available image" />
              <div className="title">Location Unserviceable</div>
              <div>We don’t have any services at you location till now.</div>
            </div>
          ) : (restaurants?.map((restaurant) => {
            return (
              <Link to={`/restaurant/${restaurant.info.id}`} key={restaurant.info.id}>
                <RestaurantTile restaurant={restaurant} />
              </Link>
            );
          })))
        }
      </section>
    </div>
  );
}

export default RestaurantList;
