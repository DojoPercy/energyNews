// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './newSlice';
import adsReducer from './ads';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    ads: adsReducer,
  },
});
