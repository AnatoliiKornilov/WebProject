import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProjects } from '../../store/slices/projectsSlice';
import Button from '../../components/common/Button/Button';
import ProjectPreviewModal from '../../components/common/ProjectPreviewModal/ProjectPreviewModal';
import styles from './ProjectsPage.module.css';
import type { Project } from '../../types';
import { getProjectImage } from '../../utils/imageUtils';

const ProjectsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  
  const { projects, status } = useAppSelector((state) => state.projects);
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const handleEditProject = (projectId: string) => {
    console.log('Редактировать проект:', projectId);
    handleClosePreview();
  };

  const handleDeleteProject = (projectId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот проект?')) {
      console.log('Удаление проекта:', projectId);
      handleClosePreview();
    }
  };

  const isLoading = status === 'loading';

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Мои проекты</h1>
          {isAuthenticated && (
            <Link to="/projects/add">
              <Button variant="primary">
                ➕ Добавить проект
              </Button>
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Загрузка проектов...</p>
          </div>
        ) : projects.length > 0 ? (
          <div className={styles.projectsGrid}>
            {projects.map((project) => (
              <div key={project.id} className={styles.projectCard}>
                <div 
                  className={styles.imageContainer}
                  onClick={() => handleViewProject(project)}
                  style={{ cursor: 'pointer' }}
                >
                  <img 
                    src={getProjectImage(project.image)} 
                    alt={project.title}
                    className={styles.projectImage}
                  />
                </div>
                
                <div className={styles.projectContent}>
                  <h2 
                    className={styles.projectTitle}
                    onClick={() => handleViewProject(project)}
                    style={{ cursor: 'pointer' }}
                  >
                    {project.title}
                  </h2>
                  <p className={styles.projectDescription}>{project.description}</p>
                  
                  <div className={styles.techStack}>
                    {project.technologies.map((tech, index) => (
                      <span key={index} className={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {project.role && (
                    <div className={styles.role}>
                      <span className={styles.roleLabel}>Роль:</span>
                      <span className={styles.roleValue}>{project.role}</span>
                    </div>
                  )}
                  
                  <div className={styles.projectActions}>
                    <button 
                      className={styles.viewButton}
                      onClick={() => handleViewProject(project)}
                    >
                      Подробнее
                    </button>
                    
                    {isAuthenticated && (
                      <div className={styles.editActions}>
                        <Link 
                          to={`/projects/edit/${project.id}`}
                          className={styles.editButton}
                        >
                          ✏️ Редактировать
                        </Link>
                        <button 
                          className={styles.deleteButton}
                          onClick={() => {
                            if (window.confirm(`Удалить проект "${project.title}"?`)) {
                              console.log('Удаление проекта:', project.id);
                            }
                          }}
                        >
                          🗑️ Удалить
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📁</div>
            <h2 className={styles.emptyTitle}>Проекты не найдены</h2>
            <p className={styles.emptyText}>
              {isAuthenticated 
                ? 'Добавьте свой первый проект, чтобы начать создавать портфолио'
                : 'Войдите в систему, чтобы увидеть проекты'
              }
            </p>
            {isAuthenticated && (
              <Link to="/projects/add">
                <Button variant="primary">
                  ➕ Добавить первый проект
                </Button>
              </Link>
            )}
          </div>
        )}

        <ProjectPreviewModal
          project={selectedProject}
          isOpen={isPreviewOpen}
          onClose={handleClosePreview}
          onEdit={handleEditProject}
          onDelete={handleDeleteProject}
        />
      </div>
    </div>
  );
};

export default ProjectsPage;
