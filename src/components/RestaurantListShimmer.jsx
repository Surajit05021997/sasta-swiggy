import './RestaurantListShimmer.css';

const RestaurantListShimmer = () => {
  const shimmerContentArr = [1,2,3,4,5,6,7,8,9];
  return (
    <div className="shimmer-container">
      {
      shimmerContentArr.map((item) => {
        return (
          <div key={item}>
            <div className="shimmer-tile">
              <div className="shimmer-image-container"></div>
              <div className="shimmer-info-container"></div>
              <div className="shimmer-info-container"></div>
            </div>
          </div>
        )
      })
    }
    </div>
  );
};

export default RestaurantListShimmer;
