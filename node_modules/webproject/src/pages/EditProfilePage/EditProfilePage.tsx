import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateUserProfile } from '../../store/slices/usersSlice';
import { setUser } from '../../store/slices/authSlice'; // Добавили импорт
import BasicInfoSection from './components/BasicInfoSection/BasicInfoSection';
import ContactsSection from './components/ContactsSection/ContactsSection';
import AboutSection from './components/AboutSection/AboutSection';
import FormActions from './components/FormActions/FormActions';
import type { UserFormData } from '../../types';
import styles from './EditProfilePage.module.css';

const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { user } = useAppSelector((state) => state.auth);
  const { status, error } = useAppSelector((state) => state.users);

  const [formData, setFormData] = useState<UserFormData>({
    username: '',
    email: '',
    fullName: '',
    position: '',
    bio: '',
    avatar: '',
    github: '',
    gitlab: '',
    phone: '',
    birthDate: '',
    experience: '',
    education: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      console.log('Загружаем данные пользователя в форму:', user);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        username: user.username || '',
        email: user.email || '',
        fullName: user.fullName || user.name || '',
        position: user.position || '',
        bio: user.bio || '',
        avatar: user.avatar || '',
        github: user.github || '',
        gitlab: user.gitlab || '',
        phone: user.phone || '',
        birthDate: user.birthDate || '',
        experience: user.experience || '',
        education: user.education || '',
      });
    }
  }, [user]);

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

    const result = await dispatch(updateUserProfile(formData));
    
    if (updateUserProfile.fulfilled.match(result)) {
      dispatch(setUser(result.payload));
      
      alert('Профиль успешно обновлён!');
      
      navigate('/profile');
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

  const isSubmitting = status === 'loading';

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
              error={error || errors.submit}
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
