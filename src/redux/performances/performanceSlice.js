// userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  AddPerformance,
  UpdatePerformance,
  GetPerformances,
} from './performanceActions';

const initialState = {
  performances: [],
  error: null,
  performanceMsg: null,
};

const performanceSlice = createSlice({
  name: 'performances',
  initialState,
  reducers: {
    setPerformanceUpdate: (state, action) => {
      state.performances = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddPerformance.pending, (state) => {
        state.performanceMsg = 'adding performance...';
        state.error = null;
      })
      .addCase(AddPerformance.fulfilled, (state) => {
        state.performanceMsg = 'performance added successfully';
        state.error = null;
      })
      .addCase(AddPerformance.rejected, (state, action) => {
        state.error = action.payload;
        state.performanceMsg = '';
      })
      .addCase(UpdatePerformance.pending, (state) => {
        state.performanceMsg = 'updating...';
        state.error = null;
      })
      .addCase(UpdatePerformance.fulfilled, (state, action) => {
        state.performanceMsg = 'performance updated successfully';
        state.error = null;
      })
      .addCase(UpdatePerformance.rejected, (state, action) => {
        state.error = action.payload;
        state.performanceMsg = '';
      })
      .addCase(GetPerformances.pending, (state) => {
        state.performanceMsg = 'fetching performances...';
        state.error = null;
      })
      .addCase(GetPerformances.fulfilled, (state, action) => {
        state.performanceMsg = 'performance fetched successfully';
        state.performances = action.payload;
        state.error = null;
      })
      .addCase(GetPerformances.rejected, (state, action) => {
        state.error = action.payload;
        state.performanceMsg = '';
      });
  },
});

export const { setPerformanceUpdate } = performanceSlice.actions;
export default performanceSlice.reducer;
