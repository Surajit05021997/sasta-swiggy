import { createSlice } from "@reduxjs/toolkit";

const deliveryDetailsSlice = createSlice({
  name: 'deliveryDetails',
  initialState: {
    address: null,
    isOrderPlaced: false,
  },
  reducers: {
    addAddress: (state, action) => {
      state.address = action.payload;
    },
    updateIsOrderPlaced: (state, action) => {
      state.isOrderPlaced = action.payload;
    }
  }
});

export const { addAddress, updateIsOrderPlaced } = deliveryDetailsSlice.actions;

export default deliveryDetailsSlice.reducer;
