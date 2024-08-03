import { useEffect } from 'react';
import './RestaurantListShimmer.css';

const RestaurantListShimmer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const shimmerContentArr = [1,2,3,4,5,6,7,8,9];
  return (
    <div className="shimmer-container">
      {
      shimmerContentArr.map((item) => {
        return (
          <div className="shimmer-tile" key={item}>
            <div className="shimmer-image-container"></div>
            <div className="shimmer-info-container"></div>
            <div className="shimmer-info-container"></div>
          </div>
        )
      })
    }
    </div>
  );
};

export default RestaurantListShimmer;
