import type { User, Project } from '../../types';

export const mockUser: User = {
  id: '1',
  username: 'ivanov_dev',
  email: 'ivan@example.com',
  fullName: 'Иван Иванов',
  position: 'Full-stack разработчик',
  bio: 'Увлекаюсь разработкой высоконагруженных систем и машинным обучением. Участвую в open-source проектах.',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  github: 'https://github.com/ivanov',
  gitlab: 'https://gitlab.com/ivanov',
  phone: '+7 (999) 123-45-67',
  birthDate: '1995-03-15',
  experience: 'Senior Developer в TechCompany (2020-настоящее время)\nMiddle Developer в StartupInc (2018-2020)',
  education: 'Бакалавр компьютерных наук, Университет IT (2014-2018)',
  createdAt: '2023-01-15',
};

export const mockUserProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'Полнофункциональная платформа электронной коммерции.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    role: 'Full-stack разработчик',
    demoUrl: 'https://demo.example.com',
    codeUrl: 'https://github.com/ivanov/ecommerce',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Приложение для управления задачами.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
    technologies: ['Vue.js', 'Firebase', 'SCSS'],
    role: 'Frontend разработчик',
    demoUrl: 'https://tasks.example.com',
    codeUrl: 'https://github.com/ivanov/taskapp',
    createdAt: '2024-02-20',
    updatedAt: '2024-02-20',
  },
];
