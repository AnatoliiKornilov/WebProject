import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../lib/supabase';
import type { User, UserFormData, PublicProfile, DbProfile } from '../../types';

export interface UsersState {
  currentUser: User | null;
  publicProfiles: PublicProfile[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

interface RootState {
  auth: {
    user?: {
      id: string;
    } | null;
  };
}

const initialState: UsersState = {
  currentUser: null,
  publicProfiles: [],
  status: 'idle',
  error: null,
};

const mapDbProfileToPublic = (dbProfile: DbProfile, projectsCount: number = 0): PublicProfile => ({
  id: dbProfile.id,
  username: dbProfile.username,
  fullName: dbProfile.full_name || dbProfile.username,
  position: dbProfile.position || '',
  bio: dbProfile.bio || '',
  avatar: dbProfile.avatar_url || '/images/default-avatar.svg',
  github: dbProfile.github_url,
  gitlab: dbProfile.gitlab_url,
  email: dbProfile.email,
  phone: dbProfile.phone,
  birthDate: dbProfile.birth_date,
  experience: dbProfile.experience,
  education: dbProfile.education,
  createdAt: dbProfile.created_at,
  isPublic: true,
  projectsCount: projectsCount,
});

export const updateUserProfile = createAsyncThunk(
  'users/updateProfile',
  async (userData: UserFormData, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const userId = state.auth.user?.id;

      if (!userId) {
        throw new Error('Пользователь не авторизован');
      }

      const { data, error } = await supabase
        .from('profiles')
        .update({
          username: userData.username,
          full_name: userData.fullName,
          position: userData.position,
          bio: userData.bio,
          avatar_url: userData.avatar,
          github_url: userData.github,
          gitlab_url: userData.gitlab,
          phone: userData.phone,
          birth_date: userData.birthDate,
          experience: userData.experience,
          education: userData.education,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;

      const updatedUser: User = {
        id: data.id,
        username: data.username,
        email: data.email,
        name: data.full_name || data.username,
        avatar: data.avatar_url || '/images/default-avatar.svg',
        fullName: data.full_name,
        position: data.position,
        bio: data.bio,
        github: data.github_url,
        gitlab: data.gitlab_url,
        phone: data.phone,
        birthDate: data.birth_date,
        experience: data.experience,
        education: data.education,
        createdAt: data.created_at,
      };

      return updatedUser;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка обновления профиля';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchPublicProfiles = createAsyncThunk(
  'users/fetchPublicProfiles',
  async (_, { rejectWithValue }) => {
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      const profilesWithProjects = await Promise.all(
        profiles.map(async (profile) => {
          const { count, error: projectsError } = await supabase
            .from('projects')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', profile.id);

          if (projectsError) {
            console.error('Ошибка при получении количества проектов:', projectsError);
            return mapDbProfileToPublic(profile, 0);
          }

          return mapDbProfileToPublic(profile, count || 0);
        })
      );

      return profilesWithProjects;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка загрузки профилей';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'users/fetchUserProfile',
  async (username: string, { rejectWithValue }) => {
    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single();

      if (profileError) throw profileError;

      const { count, error: projectsError } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', profile.id);

      if (projectsError) {
        console.error('Ошибка при получении количества проектов:', projectsError);
      }

      return mapDbProfileToPublic(profile, count || 0);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка загрузки профиля';
      return rejectWithValue(errorMessage);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
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

export const { clearUsersError } = usersSlice.actions;
export default usersSlice.reducer;
