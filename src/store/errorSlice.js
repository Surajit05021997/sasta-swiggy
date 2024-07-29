import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: 'deliveryDetails',
  initialState: {
    serviceError: false,
  },
  reducers: {
    updateServiceError: (state, action) => {
      state.serviceError = action.payload;
    },
  }
});

export const { updateServiceError } = errorSlice.actions;

export default errorSlice.reducer;
