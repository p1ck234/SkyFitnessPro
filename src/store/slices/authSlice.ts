import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
