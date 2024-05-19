import './App.css'
import AppHeader from './components/AppHeader.jsx';
import { Outlet } from 'react-router-dom';
import CartContext from './utilities/CartContext.jsx';
import RestaurantContext from './utilities/RestaurantContext.jsx';
import { useState } from 'react';

function App() {
  const [cart, setCart] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  return (
    <RestaurantContext.Provider value={{ selectedRestaurant, setSelectedRestaurant }}>
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
