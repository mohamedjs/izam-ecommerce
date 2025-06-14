import axiosInstance from '@/config/axios';
import { LoginCredentials, AuthResponse } from './auth.types';
import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import Cookie from 'js-cookie'
import { AuthState } from './auth.types';

export class AuthService {
    static loginAsync = createAsyncThunk(
        'auth/login',
        async (credentials: LoginCredentials, thunkApi) => {
            try {
                const response = await axiosInstance.post('/v1/login', credentials)
                return response.data;
            } catch (err: any) {
                return thunkApi.rejectWithValue(err)
            }
        }
    );

    static logoutAsync = createAsyncThunk(
        'auth/logout',
        async (_, thunkApi) => {
            try {
                const response = await axiosInstance.post('/v1/logout')
                return response.data;
            } catch (err: any) {
                return thunkApi.rejectWithValue(err)
            }
        }
    );

    static handleLoginPending(state: AuthState) {
        state.loading = true;
        state.error = null;
        state.isAuthenticated=false
    }

    static handleLoginFulfilled(state: AuthState, action: PayloadAction<AuthResponse>) {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        const options = { expires: new Date(action.payload.expire_at) };
        Cookie.set("authToken", state.token, options)
        state.isAuthenticated = true;
    }

    static handleLoginRejected(state: AuthState, action: PayloadAction<any>) {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
    }

    static handleLogoutPending(state: AuthState) {
        state.loading = true;
        state.error = null;
        state.isAuthenticated=false
    }

    static handleLogoutRejected(state: AuthState, action: PayloadAction<any>) {
        state.loading = false;
        state.error = action.error.message || 'Logout failed';
    }

    static handleLogoutFulfilled(state: AuthState) {
        Cookie.remove('authToken')
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
    }
}