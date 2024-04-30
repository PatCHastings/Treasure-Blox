// src/app/reducers/userReducer.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    address: null,
    ethBalance: "",
    tbxBalance: "",
  },
  reducers: {
    setUserAddress: (state, action) => {
      state.address = action.payload;
    },
    setUserBalance: (state, action) => {
      state.ethBalance = action.payload.ethBalance;
      state.tbxBalance = action.payload.tbxBalance;
    },
  },
});

export const { setUserAddress, setUserBalance } = userSlice.actions;
export default userSlice.reducer;
