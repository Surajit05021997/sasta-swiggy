import './App.css'
import AppHeader from './components/AppHeader.jsx';
import { Outlet } from 'react-router-dom';
import CartContext from './utilities/CartContext.jsx';
import RestaurantContext from './utilities/RestaurantContext.jsx';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from './store/userSlice';

function App() {
  const [cart, setCart] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [checkoutRestaurant, setCheckoutRestaurant] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { accessToken, displayName, email, uid } = user;
        dispatch(addUser({ accessToken, displayName, email, uid }));
      } else {
        dispatch(removeUser(null));
      }
    });

    // setting checkout restaurant on lapp load
    if(JSON.parse(localStorage.getItem('cartDetails'))?.length) {
      setCheckoutRestaurant({id: JSON.parse(localStorage.getItem('cartDetails'))[0].restaurantId});
    }
  }, []);

  return (
    <RestaurantContext.Provider value={{ selectedRestaurant, setSelectedRestaurant, checkoutRestaurant, setCheckoutRestaurant }}>
      <CartContext.Provider value={{ cart, setCart}}>
        <div>
          <AppHeader />
          <main>
            <Outlet />
          </main>
        </div>
      </CartContext.Provider>
    </RestaurantContext.Provider>
  );
}

export default App
