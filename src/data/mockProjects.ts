import type { Project } from '../types';

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description:
      'Полнофункциональная платформа электронной коммерции с системой управления заказами, платежами и инвентарем.',
    image:
      'image.png',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    role: 'Full-stack разработчик',
    demoUrl: 'https://demo.example.com',
    codeUrl: 'https://github.com/username/ecommerce',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Task Management App',
    description:
      'Приложение для управления задачами с обновлением в реальном времени и совместной работой.',
    image:
      'image.png',
    technologies: ['Vue.js', 'Firebase', 'SCSS'],
    role: 'Frontend разработчик',
    demoUrl: 'https://tasks.example.com',
    codeUrl: 'https://github.com/username/taskapp',
    createdAt: '2024-02-20',
    updatedAt: '2024-02-20',
  },
  {
    id: '3',
    title: 'AI Chatbot',
    description:
      'Интеллектуальный чат-бот с обработкой естественного языка и интеграцией с популярными мессенджерами.',
    image:
      'image.png',
    technologies: ['Python', 'TensorFlow', 'Docker', 'AWS'],
    role: 'ML Engineer',
    demoUrl: 'https://chatbot.example.com',
    codeUrl: 'https://github.com/username/chatbot',
    createdAt: '2024-03-10',
    updatedAt: '2024-03-10',
  },
];
