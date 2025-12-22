import React, { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import Button from '../common/Button/Button';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <NavLink to="/">DevPortfolio</NavLink>
          </div>

          <button 
            className={styles.mobileMenuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Меню"
            aria-expanded={isMenuOpen}
          >
            <span className={styles.menuIcon}></span>
          </button>

          <div className={`${styles.navLinks} ${isMenuOpen ? styles.menuOpen : ''}`}>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
              }
              onClick={() => setIsMenuOpen(false)}
              end
            >
              🏠 Главная
            </NavLink>
            
            <NavLink 
              to="/profiles" 
              className={({ isActive }) => 
                isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
              }
              onClick={() => setIsMenuOpen(false)}
            >
              👥 Портфолио
            </NavLink>
            
            <NavLink 
              to="/projects" 
              className={({ isActive }) => 
                isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
              }
              onClick={() => setIsMenuOpen(false)}
            >
              📁 Проекты
            </NavLink>

            {isAuthenticated && (
              <>
                <NavLink 
                  to="/projects/add" 
                  className={({ isActive }) => 
                    isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  ➕ Добавить проект
                </NavLink>
                <NavLink 
                  to="/profile" 
                  className={({ isActive }) => 
                    isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  👤 Мой профиль
                </NavLink>
              </>
            )}

            {isAuthenticated ? (
              <div className={styles.userSection}>
                {user?.avatar && (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className={styles.userAvatar}
                  />
                )}
                <span className={styles.userName}>{user?.name}</span>
                <Button 
                  variant="outline" 
                  size="small"
                  onClick={handleLogout}
                  className={styles.logoutButton}
                >
                  Выйти
                </Button>
              </div>
            ) : (
              <div className={styles.authButtons}>
                <Link to="/login">
                  <Button variant="outline" size="small">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="small">Регистрация</Button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
