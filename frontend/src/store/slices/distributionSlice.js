import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';

// Async thunks
export const getDistributionStatus = createAsyncThunk(
  'distribution/getDistributionStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/distribution/status');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const uploadDistribution = createAsyncThunk(
  'distribution/uploadDistribution',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/distribution', formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const initialState = {
  status: {
    pending: [],
    approved: [],
    rejected: []
  },
  uploadStatus: {
    progress: 0,
    success: false,
    error: null
  },
  loading: false,
  error: null
};

const distributionSlice = createSlice({
  name: 'distribution',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    resetUploadStatus: (state) => {
      state.uploadStatus = {
        progress: 0,
        success: false,
        error: null
      };
    },
    updateUploadProgress: (state, action) => {
      state.uploadStatus.progress = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get Distribution Status
      .addCase(getDistributionStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDistributionStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;
      })
      .addCase(getDistributionStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch distribution status';
      })
      // Upload Distribution
      .addCase(uploadDistribution.pending, (state) => {
        state.uploadStatus.progress = 0;
        state.uploadStatus.error = null;
      })
      .addCase(uploadDistribution.fulfilled, (state, action) => {
        state.uploadStatus.success = true;
        state.uploadStatus.progress = 100;
        state.status.pending.unshift(action.payload);
      })
      .addCase(uploadDistribution.rejected, (state, action) => {
        state.uploadStatus.error = action.payload?.message || 'Upload failed';
        state.uploadStatus.progress = 0;
      });
  }
});

export const { clearErrors, resetUploadStatus, updateUploadProgress } = distributionSlice.actions;

export default distributionSlice.reducer;