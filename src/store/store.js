import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import deliveryDetailsReducer from './deliveryDetailsSlice';
import errorSliceReducer from './errorSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    deliveryDetails: deliveryDetailsReducer,
    error: errorSliceReducer,
  },
});

export default store;
