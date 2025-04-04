import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import distributionReducer from './slices/distributionSlice';
import codesReducer from './slices/codesSlice';
import marketingReducer from './slices/marketingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    distribution: distributionReducer,
    codes: codesReducer,
    marketing: marketingReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;