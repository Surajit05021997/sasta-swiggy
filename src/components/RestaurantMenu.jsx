import { useParams } from "react-router-dom";
import useFetchRestaurantMenu from '../utilities/useFetchRestaurantMenu.jsx';
import RestaurantInfoTile from "./RestaurantInfoTile.jsx";
import ServiceErrorPage from "./ServiceErrorPage.jsx";
import RestaurantMenuTile from "./RestaurantMenuTile.jsx";
import './RestaurantMenu.css';
import { useState, useContext, useEffect } from 'react';
import RestaurantContext from '../utilities/RestaurantContext';
import CartContext from "../utilities/CartContext";
import { useNavigate } from 'react-router-dom';
import RestaurantMenuShimmer from "./shimmer/RestaurantMenuShimmer.jsx";
import { useSelector } from 'react-redux';

const RestaurantMenu = () => {
  const [totalItem, setTotalItem] = useState(0);
  const { restaurantId } = useParams();
  const restaurantMenu = useFetchRestaurantMenu(restaurantId);
  const { setSelectedRestaurant } = useContext(RestaurantContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const error = useSelector((state) => state.error);

  useEffect(() => {
    const total = cart?.reduce((acc, item) => acc = acc + item.quantity, 0);
    setTotalItem(total);
  }, [cart]);

  useEffect(() => {
    setSelectedRestaurant(restaurantMenu?.restaurantInfo);
  }, [restaurantMenu, setSelectedRestaurant]);

    return (
      error.serviceError ? (
        <ServiceErrorPage />
      ) : (
        restaurantMenu ? (
          <div>
            <div className="restaurant">
              <RestaurantInfoTile restaurantInfo={restaurantMenu.restaurantInfo}/>
              <section className="restaurant-menu">
                <h2>Menu</h2>
                {
                  restaurantMenu.restaurantMenuInfo.map((restaurantMenuTileInfo, index) => {
                    return <RestaurantMenuTile
                              key={restaurantMenuTileInfo.card.card.title}
                              restaurantMenuTileInfo={restaurantMenuTileInfo}
                              isFirstTile={index === 0 ? true : false}
                            />
                  })
                }
              </section>
            </div>
            <div>
              <div className={cart?.length > 0 ? "cart-notification show" : "cart-notification hide"}>
                <div className="cart-notification-container">
                  <div>{totalItem} items added</div>
                  <div onClick={() => navigate('/checkout')}>VIEW CART</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <RestaurantMenuShimmer />
        )
      )
    )
}

export default RestaurantMenu;
