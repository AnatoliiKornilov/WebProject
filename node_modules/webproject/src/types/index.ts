export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  fullName?: string;
  name?: string;
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
  userId: string;
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

export interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  disabled?: boolean;
  label?: string;
  error?: string;
}

export interface ProjectFormData {
  id?: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  role: string;
  demoUrl?: string;
  codeUrl?: string;
}

export interface PublicProfile {
  id: string;
  username: string;
  fullName: string;
  position: string;
  bio: string;
  avatar: string;
  github?: string;
  gitlab?: string;
  email?: string;
  phone?: string;
  birthDate?: string;
  experience?: string;
  education?: string;
  createdAt: string;
  isPublic: boolean;
  projectsCount?: number;
}

export interface PublicProject {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  role: string;
  demoUrl?: string;
  codeUrl?: string;
  createdAt: string;
}

export interface UserFormData {
  username: string;
  email: string;
  fullName?: string;
  position?: string;
  bio?: string;
  avatar?: string;
  github?: string;
  gitlab?: string;
  phone?: string;
  birthDate?: string;
  experience?: string;
  education?: string;
}

export interface DbProject {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  technologies: string[];
  role: string;
  demo_url?: string;
  code_url?: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface DbProfile {
  id: string;
  username: string;
  email: string;
  full_name?: string;
  position?: string;
  bio?: string;
  avatar_url?: string;
  github_url?: string;
  gitlab_url?: string;
  phone?: string;
  birth_date?: string;
  experience?: string;
  education?: string;
  created_at: string;
  updated_at?: string;
}
