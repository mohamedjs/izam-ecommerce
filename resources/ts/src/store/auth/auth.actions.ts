import { AuthState } from './auth.types';

export class AuthActions {
  static setUser(state: AuthState, action: any) {
    state.user = action.payload;
  }

  static setError(state: AuthState, action: any) {
    state.error = action.payload;
  }

  static setLoading(state: AuthState, action: any) {
    state.loading = action.payload;
  }

  static setToken(state: AuthState, action: any) {
    state.token = action.payload;
  }
} 