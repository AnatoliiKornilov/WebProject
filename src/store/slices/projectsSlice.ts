// src/store/slices/projectsSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Project, ProjectFormData } from '../../types';
import type { ProjectsState } from '../types';
import { mockProjects } from '../../data/mockProjects';

// Начальное состояние
const initialState: ProjectsState = {
  projects: mockProjects, // Начинаем с мок данных
  currentProject: null,
  status: 'idle',
  error: null,
};

// Асинхронные thunks
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      // Имитация API запроса
      const response = await new Promise<Project[]>((resolve) => {
        setTimeout(() => {
          resolve(mockProjects);
        }, 500);
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка загрузки проектов');
    }
  }
);

export const addProject = createAsyncThunk(
  'projects/addProject',
  async (projectData: ProjectFormData, { rejectWithValue }) => {
    try {
      const response = await new Promise<Project>((resolve) => {
        setTimeout(() => {
          const newProject: Project = {
            id: Date.now().toString(),
            ...projectData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          resolve(newProject);
        }, 1000);
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка добавления проекта');
    }
  }
);

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ id, data }: { id: string; data: ProjectFormData }, { rejectWithValue }) => {
    try {
      const response = await new Promise<Project>((resolve) => {
        setTimeout(() => {
          const updatedProject: Project = {
            id,
            ...data,
            updatedAt: new Date().toISOString(),
            createdAt: data.createdAt || new Date().toISOString(),
          };
          resolve(updatedProject);
        }, 1000);
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка обновления проекта');
    }
  }
);

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (projectId: string, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 500);
      });
      return projectId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка удаления проекта');
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
        state.projects.push(action.payload);
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
