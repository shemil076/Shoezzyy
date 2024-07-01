import { createSlice, createAsyncThunk, PayloadAction, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';
import { Shoe } from '../types/types';
import { RootState } from '../store';

interface ShoeState {
  shoes: Shoe[];
  loading: boolean;
  lastFetched: boolean;
}

const initialState: ShoeState = {
  shoes: [],
  loading: false,
  lastFetched: false
};

export const fetchAllShoes = createAsyncThunk<Shoe[], void, { state: RootState }>(
  'shoes/fetchAllShoes',
  async (_, { getState }) => {
    const { shoes } = getState();
    if (shoes.lastFetched) {
      return [];
    }
    const response = await axios.get('/api/shoes');
    return response.data;
  }
);

export const deleteShoe = createAsyncThunk<string, string, {state: RootState}>(
  'shoes/deleteShoe',
  async (_shoeId, {rejectWithValue}) =>{
    try{
      await axios.delete(`api/shoes/${_shoeId}`);
      return _shoeId;
    }catch(error){
      return rejectWithValue('Error deleting shoe');
    }
  }
);

const shoeSlice = createSlice({
  name: 'shoes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllShoes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllShoes.fulfilled, (state, action: PayloadAction<Shoe[]>) => {
        state.loading = false;
        state.shoes = action.payload;
        state.lastFetched = true;
      })
      .addCase(fetchAllShoes.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteShoe.pending, (state) =>{
        state.loading = true;
      })
      .addCase(deleteShoe.fulfilled, (state, action: PayloadAction<string>) =>{
        state.loading = false;
        state.shoes = state.shoes.filter((shoe)=> shoe._id !== action.payload);
      })
      .addCase(deleteShoe.rejected, (state) => {
        state.loading = false;
      });
  }
});

export default shoeSlice.reducer;
