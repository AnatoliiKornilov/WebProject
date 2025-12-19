export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  fullName?: string;
  position?: string;
  bio?: string;
  github?: string;
  gitlab?: string;
  phone?: string;
  birthDate?: string;
  experience?: string;
  education?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  role: string;
  demoUrl?: string;
  codeUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
}

export type LoadingState = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface ProfileProjectsProps {
  projects: Project[];
  onEditProject: (id: string) => void;
  onDeleteProject: (id: string) => void;
}

export interface ProfileStatsProps {
  user: User;
  projectCount: number;
}

export interface ProfileHeaderProps {
  user: User;
  onEditProfile: () => void;
  onAddProject: () => void;
}
