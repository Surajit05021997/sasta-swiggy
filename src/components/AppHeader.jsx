import swiggyLogo from '../assets/swiggy_logo.svg';
import cartIcon from '../assets/cart.png';
import searchIcon from '../assets/search.svg';
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
    <div className="main-header-container">
      <header className="main-header">
        <div className="brand-logo">
          <Link to="/">
            <img src={swiggyLogo} alt="Swiggy Logo" />
          </Link>
        </div>
        <nav className="main-navbar">
          <ul>
            <li className="main-nav-items">
              <Link to="/search">
                <div className="nav-item">
                  <img src={searchIcon} alt="Search Icon" />
                  <div>Search</div>
                </div>
              </Link>
            </li>
            <li className="main-nav-items">
              <Link to="/checkout">
                <div className="nav-item">
                  <img src={cartIcon} alt="Cart Icon" />
                  <div className="cart-count">{getCartCount()}</div>
                  <div>Cart</div>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default AppHeader;