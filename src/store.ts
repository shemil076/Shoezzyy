import { combineReducers, configureStore } from '@reduxjs/toolkit';
import shoeReducer from './features/shoeSlice';
import orderReducer from './features/orderSlice';
import adminReducer from './features/adminSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistPartial } from 'redux-persist/lib/persistReducer';



const rootReducer = combineReducers({
  shoes: shoeReducer,
  orders: orderReducer,
  admin: adminReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['shoes', 'orders'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware : (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck:{
        ignoredActions : [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER'
        ]
      }
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState> & PersistPartial;
export type AppDispatch = typeof store.dispatch;