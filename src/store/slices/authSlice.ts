import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

interface User {
  uid: string;
  email: string;
}

interface AuthState {
  isProfile: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isProfile: false,
  isAuthenticated: false,
  user: null,
};

export const registerUser = createAsyncThunk<
  User,
  { email: string; password: string }
>("auth/registerUser", async ({ email, password }, { rejectWithValue }) => {
  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return { uid: user.uid, email: user.email! };
  } catch (error) {
    return rejectWithValue("Registration failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isProfile = true;
    },
    logout(state) {
      state.isProfile = false;
      state.user = null;
    },
    setProfileState(state, action: PayloadAction<boolean>) {
      state.isProfile = action.payload;
    },
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthenticated = false; // Optional: Update state if needed on failure
      });
  },
});

export const { login, logout, setProfileState, setAuthenticated } =
  authSlice.actions;
export default authSlice.reducer;
