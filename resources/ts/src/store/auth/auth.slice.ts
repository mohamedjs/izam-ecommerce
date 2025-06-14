import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from './auth.types';
import { AuthService } from './auth.service';
import { AuthActions } from './auth.actions';
import Cookie from 'js-cookie';

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: !!Cookie.get('authToken'),
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: AuthActions.setUser,
    setError: AuthActions.setError,
    setLoading: AuthActions.setLoading,
    setToken: AuthActions.setToken,
  },
  extraReducers: (builder) => {
    builder
      .addCase(AuthService.loginAsync.pending, AuthService.handleLoginPending)
      .addCase(AuthService.loginAsync.fulfilled, AuthService.handleLoginFulfilled)
      .addCase(AuthService.loginAsync.rejected, AuthService.handleLoginRejected)
      .addCase(AuthService.logoutAsync.pending, AuthService.handleLogoutPending)
      .addCase(AuthService.logoutAsync.rejected, AuthService.handleLogoutRejected)
      .addCase(AuthService.logoutAsync.fulfilled, AuthService.handleLogoutFulfilled);
  },
});

export const { setUser, setError, setLoading, setToken } = authSlice.actions;
export default authSlice.reducer;