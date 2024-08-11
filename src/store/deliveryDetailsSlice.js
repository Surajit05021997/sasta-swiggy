import { createSlice } from "@reduxjs/toolkit";

const deliveryDetailsSlice = createSlice({
  name: 'deliveryDetails',
  initialState: {
    address: null,
    totalAmount: 0,
    orderDate: null,
    orderTime: null,
    isOrderPlaced: false,
    isPaymentLoading: false
  },
  reducers: {
    addAddress: (state, action) => {
      state.address = action.payload;
    },
    updateTotalAmount(state, action) {
      state.totalAmount = action.payload;
    },
    updateOrderDate(state, action) {
      state.orderDate = action.payload;
    },
    updateOrderTime(state, action) {
      state.orderTime = action.payload;
    },
    updateIsOrderPlaced: (state, action) => {
      state.isOrderPlaced = action.payload;
    },
    updatePaymentLoading: (state, action) => {
      state.isPaymentLoading = action.payload;
    },
  }
});

export const { addAddress, updateIsOrderPlaced, updatePaymentLoading, updateTotalAmount, updateOrderDate, updateOrderTime } = deliveryDetailsSlice.actions;

export default deliveryDetailsSlice.reducer;
