// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

export const store = configureStore({
    reducer: rootReducer, // Directly assign rootReducer here
  });
