import { createContext } from "react";

const RestaurantContext = createContext({
  selectedRestaurant: null,
});

export default RestaurantContext;
