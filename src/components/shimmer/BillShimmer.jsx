import './BillShimmer.css';

const BillShimmer = () => {
  return (
    <div className="bill-shimmer">
      <div className="bill-restaurant-info">
        <div className="restaurant-img-holder"></div>
        <div>
          <div className="restaurant-name-holder info"></div>
          <div className="restaurant-name-holder info"></div>
        </div>
      </div>
      <div className="bill-items">
        <div className="item-holder">
          <div className="flex-row">
            <div className="item-category"></div>
            <div className="item-name info"></div>
          </div>
          <div className="item-price info"></div>
        </div>
        <div className="item-holder">
          <div className="flex-row">
            <div className="item-category"></div>
            <div className="item-name info"></div>
          </div>
          <div className="item-price info"></div>
        </div>
        <div className="item-holder">
          <div className="flex-row">
            <div className="item-category"></div>
            <div className="item-name info"></div>
          </div>
          <div className="item-price info"></div>
        </div>
        <div className="item-holder">
          <div className="flex-row">
            <div className="item-category"></div>
            <div className="item-name info"></div>
          </div>
          <div className="item-price info"></div>
        </div>
      </div>
      <div className="title-holder"></div>
      <div className="amount-breakdown">
        <div className="price-detail">
          <div className="price-detail-name info"></div>
          <div className="item-price info"></div>
        </div>
        <div className="price-detail">
          <div className="price-detail-name info"></div>
          <div className="item-price info"></div>
        </div>
        <div className="price-detail">
          <div className="price-detail-name info"></div>
          <div className="item-price info"></div>
        </div>
        <div className="price-detail">
          <div className="price-detail-name info"></div>
          <div className="item-price info"></div>
        </div>
      </div>
    </div>
  )
}

export default BillShimmer;
