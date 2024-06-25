// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './newSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
  },
});
