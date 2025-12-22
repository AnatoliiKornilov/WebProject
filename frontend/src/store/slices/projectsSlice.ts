import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '../../lib/supabase';
import type { Project, ProjectFormData, DbProject } from '../../types';
import type { ProjectsState } from '../types';

interface RootState {
  auth: {
    user?: {
      id: string;
    } | null;
  };
}

const initialState: ProjectsState = {
  projects: [],
  currentProject: null,
  status: 'idle',
  error: null,
};

const mapDbProjectToProject = (dbProject: DbProject): Project => ({
  id: dbProject.id,
  title: dbProject.title,
  description: dbProject.description,
  image: dbProject.image_url || '',
  technologies: dbProject.technologies || [],
  role: dbProject.role,
  demoUrl: dbProject.demo_url || '',
  codeUrl: dbProject.code_url || '',
  createdAt: dbProject.created_at,
  updatedAt: dbProject.updated_at,
  userId: dbProject.user_id,
});

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const userId = state.auth.user?.id;

      if (!userId) {
        throw new Error('Пользователь не авторизован');
      }

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(mapDbProjectToProject);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка загрузки проектов';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchPublicProjects = createAsyncThunk(
  'projects/fetchPublicProjects',
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(mapDbProjectToProject);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка загрузки проектов';
      return rejectWithValue(errorMessage);
    }
  }
);

export const addProject = createAsyncThunk(
  'projects/addProject',
  async (projectData: ProjectFormData, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const userId = state.auth.user?.id;

      if (!userId) {
        throw new Error('Пользователь не авторизован');
      }

      const { data, error } = await supabase
        .from('projects')
        .insert({
          user_id: userId,
          title: projectData.title,
          description: projectData.description,
          image_url: projectData.image || null,
          technologies: projectData.technologies,
          role: projectData.role,
          demo_url: projectData.demoUrl || null,
          code_url: projectData.codeUrl || null,
        })
        .select()
        .single();

      if (error) throw error;

      return mapDbProjectToProject(data);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка добавления проекта';
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ id, data }: { id: string; data: ProjectFormData }, { rejectWithValue }) => {
    try {
      const { data: updatedProject, error } = await supabase
        .from('projects')
        .update({
          title: data.title,
          description: data.description,
          image_url: data.image || null,
          technologies: data.technologies,
          role: data.role,
          demo_url: data.demoUrl || null,
          code_url: data.codeUrl || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return mapDbProjectToProject(updatedProject);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка обновления проекта';
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (projectId: string, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      return projectId;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка удаления проекта';
      return rejectWithValue(errorMessage);
    }
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setCurrentProject: (state, action: PayloadAction<Project | null>) => {
      state.currentProject = action.payload;
    },
    clearProjectsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(addProject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects.unshift(action.payload);
      })
      .addCase(addProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(updateProject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.projects.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(deleteProject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects = state.projects.filter(p => p.id !== action.payload);
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentProject, clearProjectsError } = projectsSlice.actions;
export default projectsSlice.reducer;
