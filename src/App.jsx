import './App.css'
import AppHeader from './components/AppHeader.jsx';
import { Outlet } from 'react-router-dom';
import CartContext from './utilities/CartContext.jsx';
import { useState } from 'react';

function App() {
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <div>
        <AppHeader />
        <main>
          <Outlet />
        </main>
      </div>
    </CartContext.Provider>
  );
}

export default App
