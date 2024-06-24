import { createSlice } from "@reduxjs/toolkit";

const deliveryDetailsSlice = createSlice({
  name: 'deliveryDetails',
  initialState: {
    address: null,
  },
  reducers: {
    addAddress: (state, action) => {
      state.address = action.payload;
    }
  }
});

export const { addAddress } = deliveryDetailsSlice.actions;

export default deliveryDetailsSlice.reducer;
