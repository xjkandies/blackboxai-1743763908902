import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';

// Async thunks
export const createCheckoutSession = createAsyncThunk(
  'codes/createCheckoutSession',
  async ({ codeType, quantity }, { rejectWithValue }) => {
    try {
      const response = await api.post('/payments/create-checkout-session', {
        codeType,
        quantity
      });
      // Redirect to Stripe Checkout
      window.location.href = response.data.url;
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const getCodes = createAsyncThunk(
  'codes/getCodes',
  async ({ type }, { rejectWithValue }) => {
    try {
      const response = await api.endpoints.codes.getCodes({ type });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const generateCodes = createAsyncThunk(
  'codes/generateCodes',
  async ({ type, quantity }, { rejectWithValue }) => {
    try {
      const response = await api.endpoints.codes.generateCodes({ type, quantity });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const initialState = {
  codes: [],
  loading: false,
  error: null,
  generatingCodes: false,
  generationError: null,
  checkoutLoading: false,
  checkoutError: null
};

const codesSlice = createSlice({
  name: 'codes',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.generationError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Checkout Session
      .addCase(createCheckoutSession.pending, (state) => {
        state.checkoutLoading = true;
        state.checkoutError = null;
      })
      .addCase(createCheckoutSession.fulfilled, (state) => {
        state.checkoutLoading = false;
      })
      .addCase(createCheckoutSession.rejected, (state, action) => {
        state.checkoutLoading = false;
        state.checkoutError = action.payload?.message || 'Failed to create checkout session';
      })
      // Get Codes
      .addCase(getCodes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCodes.fulfilled, (state, action) => {
        state.loading = false;
        state.codes = action.payload;
      })
      .addCase(getCodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch codes';
      })
      // Generate Codes
      .addCase(generateCodes.pending, (state) => {
        state.generatingCodes = true;
        state.generationError = null;
      })
      .addCase(generateCodes.fulfilled, (state, action) => {
        state.generatingCodes = false;
        state.codes = [...action.payload, ...state.codes];
      })
      .addCase(generateCodes.rejected, (state, action) => {
        state.generatingCodes = false;
        state.generationError = action.payload?.message || 'Failed to generate codes';
      });
  }
});

export const { clearErrors } = codesSlice.actions;

export default codesSlice.reducer;