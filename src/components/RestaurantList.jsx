import useFetchRestaurants from '../utilities/useFetchRestaurants.jsx';
import RestaurantTile from './RestaurantTile.jsx';
import RestaurantListShimmer from './shimmer/RestaurantListShimmer.jsx';
import { Link } from 'react-router-dom';
import './RestaurantList.css';
import closeButton from '../assets/cross.svg';
import orderPlacedImage from '../assets/order_placed.png';
import { useSelector, useDispatch } from 'react-redux';
import { updateIsOrderPlaced } from '../store/deliveryDetailsSlice.js';
import ServiceErrorPage from './ServiceErrorPage.jsx';

const RestaurantList = () => {
  const {restaurants, restaurantListTitle, restaurantNotAvailableData} = useFetchRestaurants();
  const dispatch = useDispatch();
  const deliveryDetails = useSelector((state) => state.deliveryDetails);
  const error = useSelector((state) => state.error);

  const closeOrderPlacedDialog =() => {
    dispatch(updateIsOrderPlaced(false));
    const orderPlacedDialog = document.querySelector('.order-placed-dialog');
    orderPlacedDialog.close();
  }

  return (
    error.serviceError ? (
      <ServiceErrorPage />
    ) : (
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
        {
          deliveryDetails.isOrderPlaced ? (
            <div className="order-placed-dialog-container">
              <dialog className="order-placed-dialog" open>
                <div>
                  <img src={closeButton} alt="Close Button" className="close-button" onClick={closeOrderPlacedDialog} />
                  <img className="order-placed-image" src={orderPlacedImage} alt="Orer placed Image" />
                  <div className="order-placed-dialog-title">
                    Order Placed
                  </div>
                </div>
              </dialog>
            </div>
          ) : ('')
        }
      </div>
    )
  );
}

export default RestaurantList;
