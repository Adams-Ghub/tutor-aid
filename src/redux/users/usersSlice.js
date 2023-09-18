// userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  GetAllUsers,
  RegisterUser,
  UserLogin,
  Logout,
  UpdateProfile,
  ApproveTutor,
} from './usersAction';

const initialState = {
  user: [],
  allUsers: [],
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
    updateUser: (state, action) => {
      state.user = action.payload; // Update the state correctly here
    },
    approval: (state, action) => {
      state.allUsers.map((user) => {
        if (user.id === action.payload.id) {
          user.status = action.payload.status;
        }
      });
    },
    clearUpdateMsg: (state) => {
      state.updateMsg = ''; // Clear the updateMsg
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
      .addCase(GetAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
        state.loading = false;
      })
      .addCase(GetAllUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
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
       
      })
      .addCase(ApproveTutor.pending, (state) => {
        state.updateMsg = 'updating...';
      })
      .addCase(ApproveTutor.fulfilled, (state) => {
        state.updateMsg = 'profile updated successfully';
      })
      .addCase(ApproveTutor.rejected, (state, action) => {
        state.error = action.payload;
        state.updateMsg = '';
      });
  },
});

export const { updateUser, approval,clearUpdateMsg } = usersSlice.actions;
export default usersSlice.reducer;
