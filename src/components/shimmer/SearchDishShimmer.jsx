import './SearchDishShimmer.css';

const SearchDishShimmer = () => {
  return (
    <div className="search-dish-shimmer">
      {
        [1,2,3,4,5,6].map((item) => (
          <div className="search-dish-tile" key={item}>
            <div className="search-dish-info-placeholder">
              <div className="info-placeholder info-1"></div>
              <div className="info-placeholder info-2"></div>
            </div>
            <div className="search-dish-image-placeholder"></div>
          </div>
        ))
      }
    </div>
  )
}

export default SearchDishShimmer;
