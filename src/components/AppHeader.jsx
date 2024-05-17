import swiggyLogo from '../assets/swiggy_logo.svg';
import './AppHeader.css';
import { Link } from 'react-router-dom';

const AppHeader = () => {
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
            <a href="/cart">Cart</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;