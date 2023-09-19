// userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  GetRequests,
  MakeRequests,
  UserLogin,
  Logout,
  UpdateProfile,
  AcceptRequest,
} from './requestsActions';

const initialState = {
  requests: [],
  error: null,
  message: null,
};

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    acceptReqUpdate: (state, action) => {
      // state.requests.map((request) => {
      //   if (request.id === action.payload.id) {
      //     request.status = 'accepted';
      //   }
      // });
      console.log("payload:",action.payload)
    },
    setRequestUpdate:(state,action)=>{
      state.requests=action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(MakeRequests.pending, (state) => {
        state.message = 'sending request...';
        state.error = null;
      })
      .addCase(MakeRequests.fulfilled, (state) => {
        state.message = 'request sent successfully';
        state.error = null;
      })
      .addCase(MakeRequests.rejected, (state, action) => {
        state.error = action.payload;
        state.message = '';
      })
      .addCase(GetRequests.pending, (state) => {
        state.message = 'fetching request...';
        state.error = null;
      })
      .addCase(GetRequests.fulfilled, (state, action) => {
        state.message = 'fetched requests successfully';
        state.requests = action.payload;
        state.error = null;
      })
      .addCase(GetRequests.rejected, (state, action) => {
        state.error = action.payload;
        state.message = '';
      })
      .addCase(AcceptRequest.pending, (state) => {
        state.message = 'fetching request...';
        state.error = null;
      })
      .addCase(AcceptRequest.fulfilled, (state, action) => {
        state.message = 'requests successfully';
        state.error = null;
      })
      .addCase(AcceptRequest.rejected, (state, action) => {
        state.error = action.payload;
        state.message = '';
      });
  },
});

export const { acceptReqUpdate,setRequestUpdate } = requestsSlice.actions;
export default requestsSlice.reducer;
