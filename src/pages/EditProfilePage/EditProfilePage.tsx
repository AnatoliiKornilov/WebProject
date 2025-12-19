import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicInfoSection from './components/BasicInfoSection/BasicInfoSection';
import ContactsSection from './components/ContactsSection/ContactsSection';
import AboutSection from './components/AboutSection/AboutSection';
import FormActions from './components/FormActions/FormActions';
import type { UserFormData } from './types';
import styles from './EditProfilePage.module.css';

const initialUserData: UserFormData = {
  username: 'ivanov_dev',
  email: 'ivan@example.com',
  fullName: 'Иван Иванов',
  position: 'Full-stack разработчик',
  bio: 'Увлекаюсь разработкой высоконагруженных систем и машинным обучением. Участвую в open-source проектах.',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  github: 'https://github.com/ivanov',
  gitlab: 'https://gitlab.com/ivanov',
  phone: '+7 (999) 123-45-67',
  birthDate: '1995-03-15',
  experience: 'Senior Developer в TechCompany (2020-настоящее время)\nMiddle Developer в StartupInc (2018-2020)',
  education: 'Бакалавр компьютерных наук, Университет IT (2014-2018)',
};

const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserFormData>(initialUserData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log('Загрузка данных пользователя для редактирования');
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Введите имя пользователя';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Введите полное имя';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('Сохранение профиля:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/profile');
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      setErrors({ submit: 'Не удалось сохранить изменения. Попробуйте позже.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCancel = () => {
    if (window.confirm('Вы уверены? Все несохраненные изменения будут потеряны.')) {
      navigate('/profile');
    }
  };

  return (
    <div className={styles.editProfilePage}>
      <div className="container">
        <div className={styles.editProfileContainer}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Редактирование профиля</h1>
            <p className={styles.pageSubtitle}>Измените информацию о себе</p>
          </div>

          <form className={styles.editProfileForm} onSubmit={handleSubmit}>
            <div className={styles.formSections}>
              <BasicInfoSection 
                formData={formData} 
                errors={errors} 
                onChange={handleChange} 
              />
              
              <ContactsSection 
                formData={formData} 
                errors={errors} 
                onChange={handleChange} 
              />
              
              <AboutSection 
                formData={formData} 
                errors={errors} 
                onChange={handleChange} 
              />
            </div>

            <FormActions
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              error={errors.submit}
            />
          </form>

          <div className={styles.formNotice}>
            <p className={styles.noticeText}>
              Поля помеченные * обязательны для заполнения
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
