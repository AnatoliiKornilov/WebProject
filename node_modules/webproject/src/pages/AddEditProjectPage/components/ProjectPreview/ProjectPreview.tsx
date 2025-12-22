import React from 'react';
import Card from '../../../../components/common/Card/Card';
import type { Project } from '../../../../types';
import styles from './ProjectPreview.module.css';

interface ProjectPreviewProps {
  project: Project;
}

const ProjectPreview: React.FC<ProjectPreviewProps> = ({ project }) => {
  return (
    <div className={styles.preview}>
      <Card
        title={project.title}
        description={project.description}
        image={project.image}
        technologies={project.technologies}
        role={project.role}
        demoUrl={project.demoUrl}
        codeUrl={project.codeUrl}
      />
      <div className={styles.hint}>
        <p>Это предварительный вид карточки проекта. После сохранения она будет выглядеть так.</p>
      </div>
    </div>
  );
};

export default ProjectPreview;
