import { createSlice } from "@reduxjs/toolkit";

const deliveryDetailsSlice = createSlice({
  name: 'deliveryDetails',
  initialState: {
    address: null,
    isOrderPlaced: false,
    isPaymentLoading: false
  },
  reducers: {
    addAddress: (state, action) => {
      state.address = action.payload;
    },
    updateIsOrderPlaced: (state, action) => {
      state.isOrderPlaced = action.payload;
    },
    updatePaymentLoading: (state, action) => {
      state.isPaymentLoading = action.payload;
    },
  }
});

export const { addAddress, updateIsOrderPlaced, updatePaymentLoading } = deliveryDetailsSlice.actions;

export default deliveryDetailsSlice.reducer;
