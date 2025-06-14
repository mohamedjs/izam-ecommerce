import axiosInstance from '@/config/axios';
import { mockAuthResponse } from '@/data/mockAuth';
import { LoginCredentials, SignupCredentials, AuthResponse } from './auth.types';

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulate API call with mock data
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const response = mockAuthResponse.login(credentials.email, credentials.password);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }, 1000);
    });
  }

  static async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    // Simulate API call with mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        const response = mockAuthResponse.signup(credentials.email, credentials.password, credentials.name);
        resolve(response);
      }, 1000);
    });
  }

  static async logout(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }
}