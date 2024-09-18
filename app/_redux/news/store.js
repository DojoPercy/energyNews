// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './newSlice';
import adsReducer from './ads';
import personality from './personality';
import digitalIssues from './digitalEdition';
import admin from './admin';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    ads: adsReducer,
    personality: personality,
    digitalIssues: digitalIssues,
    admin: admin,
  },
});
