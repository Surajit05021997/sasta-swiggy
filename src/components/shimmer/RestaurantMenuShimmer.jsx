import './RestaurantMenuShimmer.css';

const RestaurantMenuShimmer = () => {
  const shimmerContentArr = [1,2,3,4];
  return (
    <div className="restaurant-menu-shimmer">
      <div className="restaurant-info-holder"></div>
      {
      shimmerContentArr.map((item) => {
        return (
          <div className="food-tile-holder" key={item}>
            <div className="info-holder-container">
              <div className="info-holder info-holder-1"></div>
              <div className="info-holder info-holder-2"></div>
              <div className="info-holder info-holder-3"></div>
            </div>
            <div className="image-holder"></div>
          </div>
        )
      })
    }
    </div>
  );
};

export default RestaurantMenuShimmer;