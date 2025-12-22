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
    username: '',
    password: '',
  });
  const [localErrors, setLocalErrors] = useState({
    username: '',
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
    
    // Валидация
    const newErrors = {
      username: formData.username ? '' : 'Введите имя пользователя',
      password: formData.password ? '' : 'Введите пароль',
    };

    setLocalErrors(newErrors);

    if (!newErrors.username && !newErrors.password) {
      const result = await dispatch(login({
        username: formData.username,
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
              label="Имя пользователя"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={localErrors.username}
              placeholder="Введите имя пользователя"
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

          <div className={styles.demoNotice}>
            <p className={styles.demoText}>
              ⚠️ Демо-версия: используйте любые данные для входа
            </p>
            <p className={styles.demoText}>
              Например: username: <strong>demo</strong>, пароль: <strong>любой</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
