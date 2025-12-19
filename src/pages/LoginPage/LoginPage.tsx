import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация
    const newErrors = {
      username: formData.username ? '' : 'Введите имя пользователя',
      password: formData.password ? '' : 'Введите пароль',
    };

    setErrors(newErrors);

    if (!newErrors.username && !newErrors.password) {
      console.log('Вход с данными:', formData);
      // Здесь будет логика входа
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
              error={errors.username}
              placeholder="Введите имя пользователя"
              fullWidth
              required
            />

            <Input
              label="Пароль"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="Введите пароль"
              fullWidth
              required
            />

            <div className={styles.formActions}>
              <Button type="submit" variant="primary" fullWidth>
                Войти
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
