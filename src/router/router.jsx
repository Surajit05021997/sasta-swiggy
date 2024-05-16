import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import ErrorPage from '../components/ErrorPage.jsx';
import RestaurantList from '../components/RestaurantList.jsx';
import RestaurantDetailsPage from '../components/RestaurantDetailsPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <RestaurantList />,
      },
      {
        path: '/restaurant/:restaurantId',
        element: <RestaurantDetailsPage />
      }
    ],
  },
]);

export default router;
