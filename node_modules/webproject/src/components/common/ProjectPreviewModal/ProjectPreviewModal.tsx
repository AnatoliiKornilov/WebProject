import React from 'react';
import Modal from '../Modal/Modal';
import Card from '../Card/Card';
import { getProjectImage } from '../../../utils/imageUtils';
import type { Project } from '../../../types';
import styles from './ProjectPreviewModal.module.css';

interface ProjectPreviewModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (projectId: string) => void;
  onDelete?: (projectId: string) => void;
}

const ProjectPreviewModal: React.FC<ProjectPreviewModalProps> = ({
  project,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  if (!project) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project.title}
      size="lg"
    >
      <div className={styles.modalContent}>
        <Card
          title={project.title}
          description={project.description}
          image={getProjectImage(project.image)}
          technologies={project.technologies}
          role={project.role}
          demoUrl={project.demoUrl}
          codeUrl={project.codeUrl}
          isEditable={!!onEdit && !!onDelete}
          onEdit={() => onEdit?.(project.id)}
          onDelete={() => onDelete?.(project.id)}
        />

        <div className={styles.additionalInfo}>
          <div className={styles.infoSection}>
            <h4 className={styles.sectionTitle}>📅 Даты проекта</h4>
            <div className={styles.dates}>
              <div className={styles.dateItem}>
                <span className={styles.dateLabel}>Создан:</span>
                <span className={styles.dateValue}>
                  {new Date(project.createdAt).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div className={styles.dateItem}>
                <span className={styles.dateLabel}>Обновлён:</span>
                <span className={styles.dateValue}>
                  {new Date(project.updatedAt).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.infoSection}>
            <h4 className={styles.sectionTitle}>🔗 Ссылки проекта</h4>
            <div className={styles.links}>
              {project.demoUrl && (
                <a 
                  href={project.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  🚀 Живое демо
                </a>
              )}
              {project.codeUrl && (
                <a 
                  href={project.codeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  💻 Исходный код
                </a>
              )}
            </div>
          </div>

          <div className={styles.infoSection}>
            <h4 className={styles.sectionTitle}>📝 Полное описание</h4>
            <p className={styles.fullDescription}>{project.description}</p>
          </div>
        </div>

        <div className={styles.modalActions}>
          <button 
            className={styles.closeButton}
            onClick={onClose}
          >
            Закрыть
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ProjectPreviewModal;
