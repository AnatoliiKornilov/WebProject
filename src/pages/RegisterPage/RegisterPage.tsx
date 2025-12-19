import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import styles from './RegisterPage.module.css';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });

  const validateForm = () => {
    const newErrors = {
      username: formData.username ? '' : 'Введите имя пользователя',
      email: formData.email ? '' : 'Введите email',
      password: formData.password ? '' : 'Введите пароль',
      confirmPassword: formData.confirmPassword 
        ? formData.password === formData.confirmPassword 
          ? '' 
          : 'Пароли не совпадают'
        : 'Подтвердите пароль',
      fullName: '',
    };

    // Валидация email
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }

    // Валидация пароля
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Регистрация с данными:', formData);
      // Здесь будет логика регистрации
      navigate('/profile');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Очищаем ошибку при вводе
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className={styles.registerPage}>
      <div className="container">
        <div className={styles.registerContainer}>
          <div className={styles.registerHeader}>
            <h1 className={styles.title}>Регистрация</h1>
            <p className={styles.subtitle}>
              Создайте аккаунт, чтобы начать создавать портфолио
            </p>
          </div>

          <form className={styles.registerForm} onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <Input
                label="Имя пользователя *"
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={errors.username}
                placeholder="Введите имя пользователя"
                fullWidth
                required
              />

              <Input
                label="Email *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="example@email.com"
                fullWidth
                required
              />

              <Input
                label="Полное имя"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
                placeholder="Иван Иванов"
                fullWidth
              />

              <Input
                label="Пароль *"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="Не менее 6 символов"
                fullWidth
                required
              />

              <Input
                label="Подтверждение пароля *"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                placeholder="Повторите пароль"
                fullWidth
                required
              />
            </div>

            <div className={styles.formActions}>
              <Button type="submit" variant="primary" fullWidth>
                Зарегистрироваться
              </Button>
            </div>

            <div className={styles.formFooter}>
              <p className={styles.footerText}>
                Уже есть аккаунт?{' '}
                <Link to="/login" className={styles.footerLink}>
                  Войти
                </Link>
              </p>
            </div>
          </form>

          <div className={styles.termsNotice}>
            <p className={styles.termsText}>
              Нажимая "Зарегистрироваться", вы соглашаетесь с нашими{' '}
              <a href="#" className={styles.termsLink}>
                Условиями использования
              </a>{' '}
              и{' '}
              <a href="#" className={styles.termsLink}>
                Политикой конфиденциальности
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
