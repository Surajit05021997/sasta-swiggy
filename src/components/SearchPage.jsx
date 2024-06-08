import './SearchPage.css';
import searchIcon from '../assets/search.svg';

const SearchPage = () => {
  return (
    <div className="search">
      <div className="search-bar">
        <input type="text" placeholder="Search for restaurants and food" />
        <img src={searchIcon} alt="Search Icon" />
      </div>
    </div>
  );
}

export default SearchPage;
