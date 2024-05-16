import { useRouteError } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="error-block">
      <p>Oops!</p>
      <p>Something went wrong.</p>
      <p>{error.statusText || error.message}</p>
    </div>
  );
}

export default ErrorPage;
