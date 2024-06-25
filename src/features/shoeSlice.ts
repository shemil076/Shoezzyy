import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Shoe } from '../types/types';

interface ShoeState {
  shoes: Shoe[];
  loading: boolean;
}

const initialState: ShoeState = {
  shoes: [],
  loading: false
};

export const fetchShoes = createAsyncThunk<Shoe[], string>('shoes/fetchShoes', async (category) => {
  const response = await axios.get(`/api/shoes/${category}`);
  return response.data;
});

const shoeSlice = createSlice({
  name: 'shoes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShoes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShoes.fulfilled, (state, action: PayloadAction<Shoe[]>) => {
        state.loading = false;
        state.shoes = action.payload;
      })
      .addCase(fetchShoes.rejected, (state) => {
        state.loading = false;
      });
  }
});

export default shoeSlice.reducer;