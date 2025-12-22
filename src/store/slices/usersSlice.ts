import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { User, UserFormData, PublicProfile } from '../../types';

export interface UsersState {
  currentUser: User | null;
  publicProfiles: PublicProfile[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UsersState = {
  currentUser: JSON.parse(localStorage.getItem('devportfolio_user') || 'null'),
  publicProfiles: [],
  status: 'idle',
  error: null,
};

export const updateUserProfile = createAsyncThunk(
  'users/updateProfile',
  async (userData: UserFormData, { rejectWithValue }) => {
    try {
      const response = await new Promise<User>((resolve) => {
        setTimeout(() => {
          const updatedUser: User = {
            id: '1',
            username: userData.username,
            email: userData.email,
            name: userData.fullName || userData.username,
            avatar: userData.avatar || '/images/default-avatar.svg',
            createdAt: new Date().toISOString(),
            ...userData,
          };
          resolve(updatedUser);
        }, 1000);
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка обновления профиля');
    }
  }
);

export const fetchPublicProfiles = createAsyncThunk(
  'users/fetchPublicProfiles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await new Promise<PublicProfile[]>((resolve) => {
        setTimeout(() => {
          const mockProfiles: PublicProfile[] = [
            {
              id: '1',
              username: 'ivanov_dev',
              fullName: 'Иван Иванов',
              position: 'Full-stack разработчик',
              bio: 'Увлекаюсь разработкой высоконагруженных систем и машинным обучением.',
              avatar: '/images/default-avatar.svg',
              github: 'https://github.com/ivanov',
              gitlab: 'https://gitlab.com/ivanov',
              email: 'ivan@example.com',
              phone: '+7 (999) 123-45-67',
              birthDate: '1995-03-15',
              experience: 'Senior Developer в TechCompany (2020-настоящее время)',
              education: 'Бакалавр компьютерных наук, Университет IT (2014-2018)',
              createdAt: '2020-01-15',
              isPublic: true,
            },
            // ... другие профили
          ];
          resolve(mockProfiles);
        }, 500);
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка загрузки профилей');
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'users/fetchUserProfile',
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await new Promise<PublicProfile>((resolve, reject) => {
        setTimeout(() => {
          if (username === 'ivanov_dev') {
            resolve({
              id: '1',
              username: 'ivanov_dev',
              fullName: 'Иван Иванов',
              position: 'Full-stack разработчик',
              bio: 'Увлекаюсь разработкой высоконагруженных систем и машинным обучением.',
              avatar: '/images/default-avatar.svg',
              github: 'https://github.com/ivanov',
              gitlab: 'https://gitlab.com/ivanov',
              email: 'ivan@example.com',
              phone: '+7 (999) 123-45-67',
              birthDate: '1995-03-15',
              experience: 'Senior Developer в TechCompany (2020-настоящее время)',
              education: 'Бакалавр компьютерных наук, Университет IT (2014-2018)',
              createdAt: '2020-01-15',
              isPublic: true,
            });
          } else {
            reject(new Error('Профиль не найден'));
          }
        }, 500);
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка загрузки профиля');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
      if (action.payload) {
        localStorage.setItem('devportfolio_user', JSON.stringify(action.payload));
      } else {
        localStorage.removeItem('devportfolio_user');
      }
    },
    clearUsersError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchPublicProfiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPublicProfiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.publicProfiles = action.payload;
      })
      .addCase(fetchPublicProfiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentUser, clearUsersError } = usersSlice.actions;
export default usersSlice.reducer;
