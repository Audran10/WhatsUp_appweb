import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '../models/User';

interface UserState {
  value: User | null;
}

const initialState: UserState = {
  value: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
