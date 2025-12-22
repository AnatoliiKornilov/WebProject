import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '../../lib/supabase';
import type { User } from '../../types';
import type { AuthState } from '../types';

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
  isAuthenticated: false,
};

const getUserProfile = async (userId: string): Promise<User | null> => {
  try {
    console.log('Получение профиля для пользователя:', userId);
    
    const { data: profile, error, status } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    console.log('Результат запроса профиля:', { error, status, profile });

    if (error) {
      if (status === 406 || error.code === 'PGRST116') {
        console.log('Профиль не найден, будет создан позже');
        return null;
      }
      throw error;
    }

    if (!profile) {
      return null;
    }

    return {
      id: profile.id,
      username: profile.username,
      email: profile.email,
      name: profile.full_name || profile.username,
      avatar: profile.avatar_url || '/images/default-avatar.svg',
      fullName: profile.full_name,
      position: profile.position,
      bio: profile.bio,
      github: profile.github_url,
      gitlab: profile.gitlab_url,
      phone: profile.phone,
      birthDate: profile.birth_date,
      experience: profile.experience,
      education: profile.education,
      createdAt: profile.created_at,
    };
  } catch (error) {
    console.error('Ошибка getUserProfile:', error);
    return null;
  }
};

export const checkAuthSession = createAsyncThunk(
  'auth/checkSession',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Проверка сессии...');
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Ошибка получения сессии:', error);
        throw error;
      }
      
      if (!session) {
        console.log('Сессия не найдена');
        return null;
      }

      console.log('Сессия найдена, ID пользователя:', session.user.id);
      
      const userProfile = await getUserProfile(session.user.id);
      
      if (!userProfile) {
        console.log('Профиль не найден, создаём базовый профиль...');
        
        const username = session.user.email?.split('@')[0] || `user_${session.user.id.slice(0, 8)}`;
        
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: session.user.id,
            username: username,
            email: session.user.email!,
            full_name: session.user.user_metadata?.full_name || username,
          });

        if (profileError) {
          console.error('Ошибка создания профиля:', profileError);
        } else {
          console.log('Базовый профиль создан');
        }
        
        const newProfile = await getUserProfile(session.user.id);
        if (!newProfile) {
          throw new Error('Не удалось создать профиль');
        }
        
        return {
          user: newProfile,
          token: session.access_token,
        };
      }

      console.log('Профиль найден:', userProfile.username);
      return {
        user: userProfile,
        token: session.access_token,
      };
    } catch (error: unknown) {
      console.error('Ошибка checkAuthSession:', error);
      const errorMessage = error instanceof Error ? error.message : 'Ошибка проверки сессии';
      return rejectWithValue(errorMessage);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw error;

      const userProfile = await getUserProfile(data.user.id);
      
      if (!userProfile) {
        throw new Error('Профиль пользователя не найден');
      }

      return {
        user: userProfile,
        token: data.session?.access_token,
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка входа';
      return rejectWithValue(errorMessage);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: { 
    email: string; 
    password: string; 
    username?: string; 
    fullName?: string 
  }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            username: userData.username || userData.email.split('@')[0],
            full_name: userData.fullName,
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            username: userData.username || data.user.email?.split('@')[0] || `user_${data.user.id.slice(0, 8)}`,
            email: userData.email,
            full_name: userData.fullName,
          });

        if (profileError) {
          console.warn('Профиль не создан:', profileError);
        }

        const userProfile = await getUserProfile(data.user.id);
        
        return {
          user: userProfile || {
            id: data.user.id,
            username: userData.username || data.user.email?.split('@')[0] || '',
            email: userData.email,
            name: userData.fullName || userData.username || 'Пользователь',
            avatar: '/images/default-avatar.svg',
            createdAt: new Date().toISOString(),
          },
          token: data.session?.access_token,
        };
      }

      throw new Error('Пользователь не создан');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка регистрации';
      return rejectWithValue(errorMessage);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка выхода';
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthSession.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthSession.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        }
      })
      .addCase(checkAuthSession.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Ошибка входа';
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Ошибка регистрации';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.status = 'idle';
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload as string || 'Ошибка выхода';
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
