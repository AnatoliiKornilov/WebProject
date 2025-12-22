import React from 'react';
import Input from '../../../../components/common/Input/Input';
import TagInput from '../../../../components/common/TagInput/TagInput';
import type { ProjectFormData } from '../../../../types';
import styles from './ProjectForm.module.css';

interface ProjectFormProps {
  formData: ProjectFormData;
  errors: Partial<Record<keyof ProjectFormData, string>>;
  isSubmitting: boolean;
  isEditMode: boolean;
  onInputChange: (field: keyof ProjectFormData) => 
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onTagsChange: (tags: string[]) => void;
  onPreviewClick: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  formData,
  errors,
  isSubmitting,
  onInputChange,
  onTagsChange,
  onPreviewClick,
}) => {
  return (
    <form className={styles.form}>
      <div className={styles.formGrid}>
        {/* Левая колонка */}
        <div className={styles.formColumn}>
          <Input
            label="Название проекта *"
            value={formData.title}
            onChange={onInputChange('title')}
            error={errors.title}
            placeholder="Например: E-commerce Platform"
            disabled={isSubmitting}
            fullWidth
          />

          <div className={styles.formGroup}>
            <label className={styles.label}>Описание проекта *</label>
            <textarea
              className={`${styles.textarea} ${errors.description ? styles.error : ''}`}
              value={formData.description}
              onChange={onInputChange('description')}
              placeholder="Опишите ваш проект, его цели, особенности, используемые подходы и технологии..."
              rows={6}
              disabled={isSubmitting}
            />
            {errors.description && (
              <span className={styles.errorText}>{errors.description}</span>
            )}
          </div>

          <Input
            label="Ссылка на изображение"
            value={formData.image}
            onChange={onInputChange('image')}
            error={errors.image}
            placeholder="https://example.com/project-image.jpg"
            type="url"
            disabled={isSubmitting}
            fullWidth
          />

          {formData.image && (
            <div className={styles.imagePreview}>
              <img 
                src={formData.image} 
                alt="Предпросмотр" 
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Ошибка+загрузки';
                }}
              />
              <p className={styles.imagePreviewText}>Предпросмотр изображения</p>
            </div>
          )}
        </div>

        {/* Правая колонка */}
        <div className={styles.formColumn}>
          <TagInput
            tags={formData.technologies}
            onChange={onTagsChange}
            placeholder="Введите технологию и нажмите Enter"
            maxTags={10}
            disabled={isSubmitting}
            label="Технологии *"
            error={errors.technologies}
          />

          <Input
            label="Ваша роль в проекте *"
            value={formData.role}
            onChange={onInputChange('role')}
            error={errors.role}
            placeholder="Например: Full-stack разработчик"
            disabled={isSubmitting}
            fullWidth
          />

          <Input
            label="Ссылка на демо (опционально)"
            value={formData.demoUrl}
            onChange={onInputChange('demoUrl')}
            error={errors.demoUrl}
            placeholder="https://demo.example.com"
            type="url"
            disabled={isSubmitting}
            fullWidth
          />

          <Input
            label="Ссылка на исходный код (опционально)"
            value={formData.codeUrl}
            onChange={onInputChange('codeUrl')}
            error={errors.codeUrl}
            placeholder="https://github.com/username/project"
            type="url"
            disabled={isSubmitting}
            fullWidth
          />

          <button
            type="button"
            className={styles.previewButton}
            onClick={onPreviewClick}
            disabled={isSubmitting}
          >
            👁️ Предпросмотр карточки
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProjectForm;
