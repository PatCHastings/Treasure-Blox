// src/app/reducers/gameReducer.js
import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    assets: [],
  },
  reducers: {
    setAssets: (state, action) => {
      state.assets = action.payload;
    },
  },
});

export const { setAssets } = gameSlice.actions;
export default gameSlice.reducer;
