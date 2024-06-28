import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import ErrorPage from '../components/ErrorPage.jsx';
import RestaurantList from '../components/RestaurantList.jsx';
import RestaurantMenu from '../components/RestaurantMenu.jsx';
import Checkout from '../components/Checkout.jsx';
import SearchPage from '../components/SearchPage.jsx';
import SignUpPage from '../components/SignUpPage.jsx';
import LoginPage from '../components/LoginPage.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';

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
        element: <ProtectedRoute />,
        children: [
          {
            path: '/sign-up',
            element: <SignUpPage />
          },
          {
            path: '/login',
            element: <LoginPage />
          },
        ],
      },
      {
        path: '/restaurant/:restaurantId',
        element: <RestaurantMenu />
      },
      {
        path: '/checkout',
        element: <Checkout />
      },
      {
        path: '/search',
        element: <SearchPage />
      }
    ],
  },
]);

export default router;
