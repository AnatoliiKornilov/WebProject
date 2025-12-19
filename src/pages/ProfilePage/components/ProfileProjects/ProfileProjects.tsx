import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../../components/common/Card/Card';
import type { ProfileProjectsProps } from '../../../../types';
import styles from './ProfileProjects.module.css';

const ProfileProjects: React.FC<ProfileProjectsProps> = ({
  projects,
  onEditProject,
  onDeleteProject,
}) => {
  return (
    <div className={styles.projectsSection}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Мои проекты</h3>
        <Link to="/projects" className={styles.viewAllLink}>
          Все проекты →
        </Link>
      </div>

      <div className={styles.projectsList}>
        {projects.length > 0 ? (
          projects.map((project) => (
            <Card
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              technologies={project.technologies}
              role={project.role}
              demoUrl={project.demoUrl}
              codeUrl={project.codeUrl}
              isEditable={false}
              onEdit={() => onEditProject(project.id)}
              onDelete={() => onDeleteProject(project.id)}
            />
          ))
        ) : (
          <div className={styles.noProjects}>
            <p className={styles.noProjectsText}>У вас пока нет проектов</p>
            <Link to="/projects/add" className={styles.addProjectLink}>
              Добавить проект
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileProjects;
