import type { User, Project, PublicProfile } from '../types';

export interface AuthState {
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isAuthenticated: boolean;
}

export interface ProjectsState {
  projects: Project[];
  currentProject: Project | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface UsersState {
  currentUser: User | null;
  publicProfiles: PublicProfile[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface RootState {
  auth: AuthState;
  projects: ProjectsState;
  users: UsersState;
}
