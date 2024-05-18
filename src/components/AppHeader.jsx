import swiggyLogo from '../assets/swiggy_logo.svg';
import cartIcon from '../assets/cart.svg';
import './AppHeader.css';
import { Link } from 'react-router-dom';
import CartContext from '../utilities/CartContext.jsx';
import { useContext } from 'react';

const AppHeader = () => {
  const { cart } = useContext(CartContext);

  const getCartCount = () => {
    return cart.reduce((totalCount, currentFood) => {
      return currentFood.quantity + totalCount;
    }, 0);
  }

  return (
    <header className="main-header">
      <div className="brand-logo">
        <Link to='/'>
          <img src={swiggyLogo} alt="Swiggy Logo" />
        </Link>
      </div>
      <nav className="main-navbar">
        <ul>
          <li className="main-nav-items">
            <a href="/search">Search</a>
          </li>
          <li className="main-nav-items">
            <a href="/help">Offer</a>
          </li>
          <li className="main-nav-items">
            <a href="/help">Help</a>
          </li>
          <li className="main-nav-items">
            <a href="/login">Sign In</a>
          </li>
          <li className="main-nav-items">
            <a href="/cart">
              <div className="cart-nav-item">
                <img src={cartIcon} alt="Cart Icon" />
                <div className="cart-count">{getCartCount()}</div>
                <div>Cart</div>
              </div>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;