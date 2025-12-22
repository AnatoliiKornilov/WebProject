import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { login, clearError } from '../../store/slices/authSlice';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { status, error, isAuthenticated } = useAppSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [localErrors, setLocalErrors] = useState({
    email: '',
    password: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      email: formData.email ? '' : 'Введите email',
      password: formData.password ? '' : 'Введите пароль',
    };

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }

    setLocalErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      // ВНИМАНИЕ: Передаём email вместо username
      const result = await dispatch(login({
        email: formData.email,
        password: formData.password,
      }));
      
      if (login.fulfilled.match(result)) {
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
    <div className={styles.loginPage}>
      <div className="container">
        <div className={styles.loginContainer}>
          <div className={styles.loginHeader}>
            <h1 className={styles.title}>Вход в аккаунт</h1>
            <p className={styles.subtitle}>
              Войдите, чтобы управлять своими проектами
            </p>
          </div>

          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <Input
              label="Email"  // Изменили label
              name="email"   // Изменили name
              type="email"   // Добавили type
              value={formData.email}
              onChange={handleChange}
              error={localErrors.email}
              placeholder="Введите email"
              fullWidth
              required
              disabled={isLoading}
            />

            <Input
              label="Пароль"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={localErrors.password}
              placeholder="Введите пароль"
              fullWidth
              required
              disabled={isLoading}
            />

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
                {isLoading ? 'Вход...' : 'Войти'}
              </Button>
            </div>

            <div className={styles.formFooter}>
              <p className={styles.footerText}>
                Нет аккаунта?{' '}
                <Link to="/register" className={styles.footerLink}>
                  Зарегистрироваться
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
