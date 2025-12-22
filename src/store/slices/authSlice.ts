// src/store/slices/authSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types';
import type { AuthState } from '../types';

// Начальное состояние
const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('devportfolio_user') || 'null'),
  token: localStorage.getItem('devportfolio_token') || null,
  status: 'idle',
  error: null,
  isAuthenticated: !!localStorage.getItem('devportfolio_token'),
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await new Promise<{ user: User; token: string }>((resolve, reject) => {
        setTimeout(() => {
          if (credentials.username && credentials.password) {
            resolve({
              user: {
                id: '1',
                username: credentials.username,
                email: `${credentials.username}@example.com`,
                name: credentials.username,
                avatar: '/images/default-avatar.svg',
                createdAt: new Date().toISOString(),
              },
              token: 'fake-jwt-token-' + Date.now(),
            });
          } else {
            reject(new Error('Неверные данные'));
          }
        }, 1000);
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка входа');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: { username: string; email: string; password: string; fullName?: string }, { rejectWithValue }) => {
    try {
      const response = await new Promise<{ user: User; token: string }>((resolve, reject) => {
        setTimeout(() => {
          if (userData.username && userData.email && userData.password) {
            resolve({
              user: {
                id: Date.now().toString(),
                username: userData.username,
                email: userData.email,
                name: userData.fullName || userData.username,
                avatar: '/images/default-avatar.svg',
                createdAt: new Date().toISOString(),
              },
              token: 'fake-jwt-token-' + Date.now(),
            });
          } else {
            reject(new Error('Не все поля заполнены'));
          }
        }, 1000);
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка регистрации');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('devportfolio_user');
      localStorage.removeItem('devportfolio_token');
    },
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem('devportfolio_user', JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem('devportfolio_user', JSON.stringify(action.payload.user));
        localStorage.setItem('devportfolio_token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Ошибка входа';
      })
      // Register
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem('devportfolio_user', JSON.stringify(action.payload.user));
        localStorage.setItem('devportfolio_token', action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Ошибка регистрации';
      });
  },
});

export const { logout, clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
