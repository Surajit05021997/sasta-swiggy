import swiggyLogo from '../assets/swiggy_logo.svg';
import cartIcon from '../assets/cart.svg';
import searchIcon from '../assets/search.svg';
import userIcon from '../assets/user.svg';
import downArrow from '../assets/down_arrow.svg';
import logout from '../assets/logout.svg';
import cross from '../assets/cross.svg';
import './AppHeader.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CartContext from '../utilities/CartContext.jsx';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';

const AppHeader = () => {
  const { cart, setCart } = useContext(CartContext);
  const [cartCount, setCartCount] = useState(0);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cartDetails')));

    // added click event listner to hide profile menu
    document.addEventListener('click', (e) => {
      const profile = document.querySelector('.profile');
      const profileMenu = document.querySelector('.profile-menu');
      if (!profile?.contains(e.target) && !profileMenu?.contains(e.target)) {
        setShowProfileMenu(false);
      }
    });
  }, []);

  useEffect(() => {
    const cartCountCopy = cart ? cart.reduce((totalCount, currentFood) => {
      return currentFood.quantity + totalCount;
    }, 0) : 0;
    setCartCount(cartCountCopy);
  }, [cart]);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  }

  const closeProfileMenu = () => {
    setShowProfileMenu(false);
  }

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('Logout successful :)');
      setShowProfileMenu(false);
      navigate('/login', { state: { from: 'homepage' }});
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
        <div className='main-navbar-container'>
          <nav className="main-navbar">
            <ul>
              <li className="main-nav-items">
                <Link className={location.pathname === '/search' ? 'active-tab' : ''} to="/search">
                  <div className="nav-item">
                    <img src={searchIcon} alt="Search Icon" />
                    <div className='nav-item-text'>Search</div>
                  </div>
                </Link>
              </li>
              <li className="main-nav-items">
                {
                  !user ? (
                    <Link className={location.pathname === '/login' ? 'active-tab' : ''} to="/login" state={{from: 'homepage'}}>
                      <div className="nav-item">
                        <img src={userIcon} alt="User Icon" />
                        <div>Login</div>
                      </div>
                    </Link>
                  ) : (
                    <div className="profile">
                      <div className="profile-menu-invoker nav-item" onClick={toggleProfileMenu}>
                        <img src={userIcon} alt="User Icon" />
                        <div className="use-name">You</div>
                        <img src={downArrow} alt="" className={showProfileMenu ? 'profile-menu-indicator expanded' : 'profile-menu-indicator collapsed'} />
                      </div>
                    </div>
                  )
                }
              </li>
              <li className="main-nav-items">
                <Link className={location.pathname === '/checkout' ? 'active-tab' : ''} to="/checkout">
                  <div className="nav-item">
                    <img src={cartIcon} alt="Cart Icon" className="cart-icon" />
                    <div className="cart-count">{cartCount}</div>
                    <div className='nav-item-text'>Cart</div>
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
          <div className={showProfileMenu ? "profile-menu" : "profile-menu hidden"}>
            <div className="profile-menu-use-info">
              <img className='close-profile-menu' src={cross} alt="Close Profile Menu" onClick={closeProfileMenu} />
              <img src={userIcon} alt="User Icon" />
              <div className="fw-bold">{user?.displayName}</div>
            </div>
            <hr />
            <div className="profile-menu-item-list">
              <Link to="/your-orders">
                <div className="your-orders">
                  <img src={cartIcon} alt="Logout icon" />
                  <div>Your orders</div>
                </div>
              </Link>
              <div className="logout" onClick={handleLogout}>
                <img src={logout} alt="Your order icon" />
                <div>Logout</div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default AppHeader;
