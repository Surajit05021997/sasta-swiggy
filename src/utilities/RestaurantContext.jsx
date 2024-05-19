import { createContext } from "react";

const RestaurantContext = createContext({
  selectedRestaurant: null,
  checkoutRestaurant: null,
});

export default RestaurantContext;
