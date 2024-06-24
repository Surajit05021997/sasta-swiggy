import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import deliveryDetailsReducer from './deliveryDetailsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    deliveryDetails: deliveryDetailsReducer,
  },
});

export default store;
