import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { AuthService } from './auth.service';
import { AuthState, LoginCredentials, SignupCredentials } from './auth.types';

const initialState: AuthState = {
  user: null,
  token: Cookies.get('authToken') || null,
  isAuthenticated: !!Cookies.get('authToken'),
  loading: false,
  error: null,
};

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials) => {
    const response = await AuthService.login(credentials);
    Cookies.set('authToken', response.token, { expires: response.expiresIn / 86400 });
    return response;
  }
);

export const signupAsync = createAsyncThunk(
  'auth/signup',
  async (credentials: SignupCredentials) => {
    const response = await AuthService.signup(credentials);
    Cookies.set('authToken', response.token, { expires: response.expiresIn / 86400 });
    return response;
  }
);

export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async () => {
    await AuthService.logout();
    Cookies.remove('authToken');
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      // Signup
      .addCase(signupAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Signup failed';
      })
      // Logout
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;