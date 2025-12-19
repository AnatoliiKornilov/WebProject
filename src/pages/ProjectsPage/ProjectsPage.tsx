import React, { useState } from 'react';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import styles from './ProjectsPage.module.css';

// Временные данные для демонстрации
const mockProjects = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'Полнофункциональная платформа электронной коммерции с системой управления заказами, платежами и инвентарем.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    role: 'Full-stack разработчик',
    demoUrl: 'https://demo.example.com',
    codeUrl: 'https://github.com/username/ecommerce',
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Приложение для управления задачами с реальным временем обновления и совместной работой.',
    technologies: ['Vue.js', 'Firebase', 'SCSS'],
    role: 'Frontend разработчик',
    demoUrl: 'https://tasks.example.com',
    codeUrl: 'https://github.com/username/taskapp',
  },
  {
    id: '3',
    title: 'AI Chatbot',
    description: 'Интеллектуальный чат-бот с обработкой естественного языка и интеграцией с популярными мессенджерами.',
    technologies: ['Python', 'TensorFlow', 'Docker', 'AWS'],
    role: 'ML Engineer',
    demoUrl: 'https://chatbot.example.com',
    codeUrl: 'https://github.com/username/chatbot',
  },
];

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState(mockProjects);
  const [isEditable, setIsEditable] = useState(false);

  const handleEditProject = (id: string) => {
    console.log('Редактировать проект:', id);
    // Здесь будет логика редактирования
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот проект?')) {
      setProjects(projects.filter(project => project.id !== id));
    }
  };

  const handleAddProject = () => {
    console.log('Добавить новый проект');
    // Здесь будет логика добавления
  };

  return (
    <div className={styles.projectsPage}>
      <div className="container">
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>Мои проекты</h1>
          </div>
          
          <div className={styles.pageActions}>
            <Button 
              variant={isEditable ? "primary" : "outline"} 
              onClick={() => setIsEditable(!isEditable)}
            >
              {isEditable ? 'Завершить редактирование' : 'Редактировать проекты'}
            </Button>
            <Button variant="primary" onClick={handleAddProject}>
              + Добавить проект
            </Button>
          </div>
        </div>

        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <Card
              key={project.id}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              role={project.role}
              demoUrl={project.demoUrl}
              codeUrl={project.codeUrl}
              isEditable={isEditable}
              onEdit={() => handleEditProject(project.id)}
              onDelete={() => handleDeleteProject(project.id)}
            />
          ))}
        </div>

        {projects.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>📂</div>
            <h3>Проектов пока нет</h3>
            <p>Добавьте свой первый проект, чтобы начать создавать портфолио.</p>
            <Button variant="primary" onClick={handleAddProject}>
              Добавить первый проект
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
