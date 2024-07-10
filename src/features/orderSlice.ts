import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Order } from '../types/types';
import { RootState } from '../store';

interface OrderState {
  orders : Order[];
  loading: boolean;
  isOrderLastFetched: boolean;
}

const initialState: OrderState = {
  orders : [],
  loading: false,
  isOrderLastFetched: false
};

export const fetchAllOrders = createAsyncThunk<Order[], void, {state: RootState}>(
  'orders/fetchAllOrders',
  async (_, {getState}) => {

    const state = getState();
    const response = await axios.get('api/orders');
    return response.data;
  }
)

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder
    .addCase(fetchAllOrders.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchAllOrders.fulfilled, (state, action : PayloadAction<Order[]>)=>{
      state.loading = false;
      state.orders =  action.payload;
      state.isOrderLastFetched = true;
    })
    .addCase(fetchAllOrders.rejected, (state)=>{
      state.loading =  false;
    });
  }
});

export default orderSlice.reducer;