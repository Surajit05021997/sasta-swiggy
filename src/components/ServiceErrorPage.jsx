import './ServiceErrorPage.css';

const ServiceErrorPage = () => {
  const refreshPage = () => {
    location.reload();
  }

  return (
    <div className="service-error">
      <img className="image" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/connection_error_bsppck" alt="" />
      <div className="title">Uh-oh!</div>
      <p className="subtitle">Sorry! This should not have happened. Please retry.</p>
      <button className="retry-btn" onClick={refreshPage}>RETRY</button>
    </div>
  );
}

export default ServiceErrorPage;
