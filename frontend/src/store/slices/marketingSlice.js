import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';

// Async thunks
export const getCampaigns = createAsyncThunk(
  'marketing/getCampaigns',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/marketing/campaigns');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const createCampaign = createAsyncThunk(
  'marketing/createCampaign',
  async (campaignData, { rejectWithValue }) => {
    try {
      const response = await api.post('/marketing/campaigns', campaignData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const initialState = {
  campaigns: [],
  loading: false,
  error: null,
  creatingCampaign: false,
  creationError: null
};

const marketingSlice = createSlice({
  name: 'marketing',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.creationError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get Campaigns
      .addCase(getCampaigns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns = action.payload;
      })
      .addCase(getCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch campaigns';
      })
      // Create Campaign
      .addCase(createCampaign.pending, (state) => {
        state.creatingCampaign = true;
        state.creationError = null;
      })
      .addCase(createCampaign.fulfilled, (state, action) => {
        state.creatingCampaign = false;
        state.campaigns.unshift(action.payload);
      })
      .addCase(createCampaign.rejected, (state, action) => {
        state.creatingCampaign = false;
        state.creationError = action.payload?.message || 'Failed to create campaign';
      });
  }
});

export const { clearErrors } = marketingSlice.actions;

export default marketingSlice.reducer;