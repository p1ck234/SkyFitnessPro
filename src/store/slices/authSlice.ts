import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { saveUser } from "@/services/firestoreService";
import { login, register, resetPassword } from "@/services/authService";

interface RegisterPayload {
  email: string;
  password: string;
  username: string;
  confirmPassword?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  error: string | null;
  isLoading: boolean;
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
  isLoading: false,
  email: "",
  password: "",
  confirmPassword: "",
  username: "",
};

export const fetchRegisterUser = createAsyncThunk(
  "auth/registerUser",
  async (payload: RegisterPayload, { rejectWithValue }) => {
    const { email, password, username, confirmPassword } = payload;
    if (!email) return rejectWithValue("Введите email");
    if (!password) return rejectWithValue("Введите пароль");
    if (!username) return rejectWithValue("Введите имя");
    if (password !== confirmPassword) return rejectWithValue("Пароли не совпадают");
    if (password.length < 6) return rejectWithValue("Пароль должен содержать не менее 6 символов");

    try {
      const user = await register(email, password, username);
      await saveUser(user.uid, { email, username });
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message || "Registration failed");
    }
  }
);

export const fetchLogin = createAsyncThunk<string, { email: string; password: string }>(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await login(email, password);
      return email;
    } catch (error: any) {
      return rejectWithValue(error.message || "Пароль введен неверно, попробуйте еще раз.");
    }
  }
);

export const fetchResetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      await resetPassword(email);
    } catch (error: any) {
      return rejectWithValue("Не удалось отправить письмо для восстановления пароля. Пожалуйста, попробуйте еще раз.");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setConfirmPassword(state, action: PayloadAction<string>) {
      state.confirmPassword = action.payload;
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.uid;
        state.isLoading = false;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchResetPassword.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(fetchResetPassword.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const {
  logout,
  setEmail,
  setPassword,
  setConfirmPassword,
  setUsername,
  setError,
} = authSlice.actions;
export default authSlice.reducer;