import swiggyLogo from '../assets/swiggy_logo.svg';
import cartIcon from '../assets/cart.png';
import searchIcon from '../assets/search.svg';
import userIcon from '../assets/user.svg';
import './AppHeader.css';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../utilities/CartContext.jsx';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';

const AppHeader = () => {
  const { cart, setCart } = useContext(CartContext);
  const [cartCount, setCartCount] = useState(0);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cartDetails')));
  }, []);

  useEffect(() => {
    const cartCountCopy = cart ? cart.reduce((totalCount, currentFood) => {
      return currentFood.quantity + totalCount;
    }, 0) : 0;
    setCartCount(cartCountCopy);
  }, [cart]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('Logout successful :)');
      navigate('/login');
    }).catch((error) => {
      // An error happened.
    });
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
              {
                !user ? (
                  <Link to="/login">
                    <div className="nav-item">
                      <img src={userIcon} alt="User Icon" />
                      <div>Login</div>
                    </div>
                  </Link>
                ) : (
                  <div className="nav-item">
                    <img src={userIcon} alt="User Icon" />
                    <div className="logout" onClick={handleLogout}>Logout</div>
                  </div>
                )
              }
            </li>
            <li className="main-nav-items">
              <Link to="/checkout">
                <div className="nav-item">
                  <img src={cartIcon} alt="Cart Icon" />
                  <div className="cart-count">{cartCount}</div>
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
