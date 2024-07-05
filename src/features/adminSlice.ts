import { createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

interface AdminState{
    token : string | null;
    loading: boolean;
    error : string | null;
};

const initialState : AdminState = {
    token: null,
    loading: false,
    error: null,
};

export const adminSignin = createAsyncThunk(
  'admin/adminSignin',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post<{ token: string }>('/api/admin', { email, password });
      return response.data.token;
    } catch (error) {
      console.log('Sign-in failed', error);

      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || 'Sign-in failed');
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);




const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers:{
      adminLogout: (state) => {
        state.token = null;
        state.loading = false;
        state.error = null;
      }
    },
    extraReducers : (builder) => {
        builder
        .addCase(adminSignin.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(adminSignin.fulfilled, (state, action : PayloadAction<string>)=>{
            state.loading = false;
            state.token = action.payload;
            state.error = null;
        })
        .addCase(adminSignin.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload as string;
        });
    }
});

export const { adminLogout } = adminSlice.actions;
export default adminSlice.reducer;