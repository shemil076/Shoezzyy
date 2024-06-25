import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Order } from '../types/types';

interface OrderState {
  jobId: string | null;
  orderStatus: Order | null;
  loading: boolean;
}

const initialState: OrderState = {
  jobId: null,
  orderStatus: null,
  loading: false
};

export const createOrder = createAsyncThunk<{ jobId: string }, string>('orders/createOrder', async (shoeId) => {
  const response = await axios.post('/api/orders', { shoeId });
  return response.data;
});

export const fetchOrderStatus = createAsyncThunk<Order, string>('orders/fetchOrderStatus', async (jobId) => {
  const response = await axios.get(`/api/orders/${jobId}`);
  return response.data;
});

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<{ jobId: string }>) => {
        state.loading = false;
        state.jobId = action.payload.jobId;
      })
      .addCase(createOrder.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchOrderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderStatus.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.orderStatus = action.payload;
      })
      .addCase(fetchOrderStatus.rejected, (state) => {
        state.loading = false;
      });
  }
});

export default orderSlice.reducer;