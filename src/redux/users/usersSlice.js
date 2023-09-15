// userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  GetUser,
  RegisterUser,
  UserLogin,
  Logout,
  UpdateProfile,
} from './usersAction';

const initialState = {
  user: [],
  currentUser: null,
  error: null,
  loading: false,
  logged: false,
  updateMsg: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Update the state correctly here
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(UserLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UserLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.logged = true;
      })
      .addCase(UserLogin.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(GetUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(GetUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(Logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Logout.fulfilled, (state) => {
        state.user = [];
        state.logged = false;
      })
      .addCase(Logout.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(UpdateProfile.pending, (state) => {
        state.updateMsg = 'updating...';
      })
      .addCase(UpdateProfile.fulfilled, (state) => {
        state.updateMsg = 'profile updated successfully';
      })
      .addCase(UpdateProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.updateMsg = '';
      });
  },
});

export const { setUser, updateUser } = usersSlice.actions;
export default usersSlice.reducer;
