// redux/statusSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: null,
};

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setStatusMessage: (state, action) => {
      state.message = action.payload;
    },
    clearStatusMessage: (state) => {
      state.message = null;
    },
  },
});

export const { setStatusMessage, clearStatusMessage } = statusSlice.actions;
export default statusSlice.reducer;
