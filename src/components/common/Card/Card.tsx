import React from 'react';
import Button from '../Button/Button';
import styles from './Card.module.css';

export interface CardProps {
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  demoUrl?: string;
  codeUrl?: string;
  role?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  isEditable?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  technologies,
  demoUrl,
  codeUrl,
  role,
  onEdit,
  onDelete,
  isEditable = false,
}) => {
  return (
    <div className={styles.card}>
      {/* Изображение проекта */}
      <div className={styles.imageContainer}>
        {image ? (
          <img src={image} alt={title} className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span>💻</span>
          </div>
        )}
      </div>

      {/* Контент карточки */}
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          {role && <span className={styles.role}>{role}</span>}
        </div>

        <p className={styles.description}>{description}</p>

        {/* Технологии */}
        {technologies.length > 0 && (
          <div className={styles.technologies}>
            {technologies.map((tech, index) => (
              <span key={index} className={styles.techTag}>
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Кнопки действий */}
        <div className={styles.actions}>
          {demoUrl && (
            <a href={demoUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="small">Демо</Button>
            </a>
          )}
          {codeUrl && (
            <a href={codeUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="small">Код</Button>
            </a>
          )}
          
          {isEditable && (
            <>
              {onEdit && (
                <Button variant="secondary" size="small" onClick={onEdit}>
                  Редактировать
                </Button>
              )}
              {onDelete && (
                <Button variant="danger" size="small" onClick={onDelete}>
                  Удалить
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
