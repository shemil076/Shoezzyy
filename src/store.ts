import { configureStore } from '@reduxjs/toolkit';
import shoeReducer from './features/shoeSlice';
import orderReducer from './features/orderSlice';

export const store = configureStore({
  reducer: {
    shoes: shoeReducer,
    orders: orderReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;