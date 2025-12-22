import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { register, clearError } from '../../store/slices/authSlice';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import styles from './RegisterPage.module.css';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { status, error, isAuthenticated } = useAppSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });
  const [localErrors, setLocalErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

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

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }

    setLocalErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const result = await dispatch(register({
        email: formData.email,
        password: formData.password,
        username: formData.username,
        fullName: formData.fullName,
      }));
      
      if (register.fulfilled.match(result)) {
        navigate('/profile');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (localErrors[name as keyof typeof localErrors]) {
      setLocalErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (error) {
      dispatch(clearError());
    }
  };

  const isLoading = status === 'loading';

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
                label="Email *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={localErrors.email}
                placeholder="example@email.com"
                fullWidth
                required
                disabled={isLoading}
              />

              <Input
                label="Пароль *"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={localErrors.password}
                placeholder="Не менее 6 символов"
                fullWidth
                required
                disabled={isLoading}
              />

              <Input
                label="Подтверждение пароля *"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={localErrors.confirmPassword}
                placeholder="Повторите пароль"
                fullWidth
                required
                disabled={isLoading}
              />

              <Input
                label="Имя пользователя"
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={localErrors.username}
                placeholder="Введите имя пользователя (опционально)"
                fullWidth
                disabled={isLoading}
              />

              <Input
                label="Полное имя"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                error={localErrors.fullName}
                placeholder="Иван Иванов (опционально)"
                fullWidth
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className={styles.errorMessage}>
                {error}
              </div>
            )}

            <div className={styles.formActions}>
              <Button 
                type="submit" 
                variant="primary" 
                fullWidth
                isLoading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
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
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
