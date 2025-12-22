import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addProject, updateProject, deleteProject } from '../../store/slices/projectsSlice';
import Button from '../../components/common/Button/Button';
import Modal from '../../components/common/Modal/Modal';
import ProjectForm from './components/ProjectForm/ProjectForm';
import ProjectPreview from './components/ProjectPreview/ProjectPreview';
import DeleteConfirmation from './components/DeleteConfirmation/DeleteConfirmation';
import type { Project, ProjectFormData } from '../../types';
import styles from './AddEditProjectPage.module.css';

const AddEditProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isEditMode = !!id;

  const { projects, status } = useAppSelector((state) => state.projects);

  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    image: '',
    technologies: [],
    role: '',
    demoUrl: '',
    codeUrl: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ProjectFormData, string>>>({});
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (isEditMode && id) {
      const projectToEdit = projects.find(p => p.id === id);
      if (projectToEdit) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFormData({
          id: projectToEdit.id,
          title: projectToEdit.title,
          description: projectToEdit.description,
          image: projectToEdit.image,
          technologies: projectToEdit.technologies,
          role: projectToEdit.role,
          demoUrl: projectToEdit.demoUrl || '',
          codeUrl: projectToEdit.codeUrl || '',
        });
      } else {
        navigate('/projects');
      }
    }
  }, [id, isEditMode, projects, navigate]);

  const handleInputChange = (field: keyof ProjectFormData) => 
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    };

  const handleTagsChange = (tags: string[]) => {
    setFormData(prev => ({ ...prev, technologies: tags }));
    if (errors.technologies) {
      setErrors(prev => ({ ...prev, technologies: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ProjectFormData, string>> = {};

    if (!formData.title.trim()) newErrors.title = 'Введите название проекта';
    if (!formData.description.trim()) newErrors.description = 'Введите описание проекта';
    if (formData.technologies.length === 0) newErrors.technologies = 'Добавьте хотя бы одну технологию';
    if (!formData.role.trim()) newErrors.role = 'Укажите вашу роль в проекте';
    
    if (formData.demoUrl && !isValidUrl(formData.demoUrl)) {
      newErrors.demoUrl = 'Введите корректный URL';
    }
    if (formData.codeUrl && !isValidUrl(formData.codeUrl)) {
      newErrors.codeUrl = 'Введите корректный URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (isEditMode && formData.id) {
      const result = await dispatch(updateProject({
        id: formData.id,
        data: formData,
      }));
      
      if (updateProject.fulfilled.match(result)) {
        navigate('/projects');
      }
    } else {
      const result = await dispatch(addProject(formData));
      
      if (addProject.fulfilled.match(result)) {
        navigate('/projects');
      }
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    
    const result = await dispatch(deleteProject(id));
    
    if (deleteProject.fulfilled.match(result)) {
      navigate('/projects');
    }
  };

  const handleCancel = () => {
    if (window.confirm('Все несохраненные изменения будут потеряны. Продолжить?')) {
      navigate('/projects');
    }
  };

  const previewProject: Project = {
    id: formData.id || 'preview',
    title: formData.title || 'Название проекта',
    description: formData.description || 'Описание проекта',
    image: formData.image || '/images/default-project.svg',
    technologies: formData.technologies.length > 0 ? formData.technologies : ['Технология 1', 'Технология 2'],
    role: formData.role || 'Роль в проекте',
    demoUrl: formData.demoUrl || '#',
    codeUrl: formData.codeUrl || '#',
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
  };

  const isSubmitting = status === 'loading';

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>
            {isEditMode ? 'Редактирование проекта' : 'Добавление нового проекта'}
          </h1>
          <p className={styles.subtitle}>
            {isEditMode 
              ? 'Внесите изменения в информацию о проекте' 
              : 'Заполните форму ниже, чтобы добавить новый проект в портфолио'
            }
          </p>
        </div>

        <div className={styles.content}>
          <form onSubmit={handleSubmit}>
            <ProjectForm
              formData={formData}
              errors={errors}
              isSubmitting={isSubmitting}
              isEditMode={isEditMode}
              onInputChange={handleInputChange}
              onTagsChange={handleTagsChange}
              onPreviewClick={() => setShowPreviewModal(true)}
            />

            <div className={styles.actions}>
              <div className={styles.leftActions}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Отмена
                </Button>
                
                {isEditMode && (
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => setShowDeleteConfirm(true)}
                    disabled={isSubmitting}
                  >
                    Удалить проект
                  </Button>
                )}
              </div>

              <div className={styles.rightActions}>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                >
                  {isEditMode ? 'Сохранить изменения' : 'Добавить проект'}
                </Button>
              </div>
            </div>
          </form>

          <div className={styles.existingProjects}>
            <h3 className={styles.existingProjectsTitle}>
              {isEditMode ? 'Другие проекты' : 'Существующие проекты'}
            </h3>
            <p className={styles.existingProjectsText}>
              Посмотрите другие проекты в вашем портфолио:
            </p>
            <Link to="/projects" className={styles.projectsLink}>
              Перейти к списку проектов →
            </Link>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        title="Предпросмотр карточки проекта"
        size="lg"
      >
        <ProjectPreview project={previewProject} />
      </Modal>

      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Подтверждение удаления"
        size="sm"
      >
        <DeleteConfirmation
          projectTitle={formData.title}
          isSubmitting={isSubmitting}
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={handleDelete}
        />
      </Modal>
    </div>
  );
};

export default AddEditProjectPage;
