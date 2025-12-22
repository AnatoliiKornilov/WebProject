import React from 'react';
import type { PublicProject } from '../../../../types';
import styles from './ProfileProjects.module.css';

interface ProfileProjectsProps {
  projects: PublicProject[];
  onViewProject: (project: PublicProject) => void;
}

const ProfileProjects: React.FC<ProfileProjectsProps> = ({ projects, onViewProject }) => {
  if (projects.length === 0) {
    return (
      <div className={styles.emptyProjects}>
        <div className={styles.emptyIcon}>📁</div>
        <h3 className={styles.emptyTitle}>Проекты отсутствуют</h3>
        <p className={styles.emptyText}>У этого пользователя пока нет публичных проектов</p>
      </div>
    );
  }

  return (
    <div className={styles.projectsSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>📂 Проекты ({projects.length})</h2>
        <p className={styles.sectionSubtitle}>Работы, которыми поделился пользователь</p>
      </div>

      <div className={styles.projectsGrid}>
        {projects.map((project) => (
          <div 
            key={project.id} 
            className={styles.projectCard}
            onClick={() => onViewProject(project)}
          >
            <div className={styles.projectImage}>
              <img 
                src={project.image} 
                alt={project.title}
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Project';
                }}
              />
            </div>
            
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              
              <p className={styles.projectDescription}>
                {project.description.length > 100 
                  ? `${project.description.substring(0, 100)}...` 
                  : project.description}
              </p>
              
              <div className={styles.projectTech}>
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <span key={index} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className={styles.moreTechs}>
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
              
              <div className={styles.projectMeta}>
                <span className={styles.projectRole}>{project.role}</span>
                <span className={styles.projectDate}>
                  {new Date(project.createdAt).toLocaleDateString('ru-RU')}
                </span>
              </div>
              
              <button className={styles.viewButton}>
                👁️ Посмотреть проект
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileProjects;
