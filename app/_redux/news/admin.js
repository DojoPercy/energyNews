// redux/adminSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAdmin: false,  // Default to false
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminStatus(state, action) {
      state.isAdmin = action.payload;
    },
  },
});

export const { setAdminStatus } = adminSlice.actions;
export default adminSlice.reducer;
