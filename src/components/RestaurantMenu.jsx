import { useParams } from "react-router-dom";
import useFetchRestaurantMenu from '../utilities/useFetchRestaurantMenu.jsx';
import RestaurantInfoTile from "./RestaurantInfoTile.jsx";
import RestaurantMenuTile from "./RestaurantMenuTile.jsx";
import './RestaurantMenu.css';
import { useState, useContext, useEffect } from 'react';
import RestaurantContext from '../utilities/RestaurantContext';
import CartContext from "../utilities/CartContext";
import { useNavigate } from 'react-router-dom';
import RestaurantMenuShimmer from "./shimmer/RestaurantMenuShimmer.jsx";

const RestaurantMenu = () => {
  const [totalItem, setTotalItem] = useState(0);
  const { restaurantId } = useParams();
  const restaurantMenu = useFetchRestaurantMenu(restaurantId);
  const { setSelectedRestaurant } = useContext(RestaurantContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const total = cart?.reduce((acc, item) => acc = acc + item.quantity, 0);
    setTotalItem(total);
  }, [cart]);

  useEffect(() => {
    setSelectedRestaurant(restaurantMenu?.restaurantInfo);
  }, [restaurantMenu, setSelectedRestaurant]);

  if(restaurantMenu) {
    const { restaurantInfo, restaurantMenuInfo } = restaurantMenu;
    return (
      <div>
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
        <div>
          {
            cart?.length > 0 ? (
              <div className="cart-notification">
                <div className="cart-notification-container">
                  <div>{totalItem} items added</div>
                  <div onClick={() => navigate('/checkout')}>VIEW CART</div>
                </div>
              </div>
            ) : ''
          }
        </div>
      </div>
    )
  } else {
    return (<RestaurantMenuShimmer />);
  }
  
}

export default RestaurantMenu;
