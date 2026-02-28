import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id?: string;
  name: string;
  email?: string;
  role: string;
  phone?: string;
};

export type AuthStata = {
  isAuthenticated: boolean;
  userInfo: null | User;
};

const initialState: AuthStata = {
  isAuthenticated: false,
  userInfo: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
    },

    updateUserName: (state, action: PayloadAction<string>) => {
      if (state.userInfo) {
        state.userInfo.name = action.payload;
      }
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
    },
  },
});

export const authreducer = AuthSlice.reducer;
export const { setUserInfo, updateUserName, logout } = AuthSlice.actions;
