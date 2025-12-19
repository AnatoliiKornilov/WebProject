import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Button from '../common/Button/Button';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <NavLink to="/">DevPortfolio</NavLink>
        </div>
        <div className={styles.navLinks}>
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
            }
            end
          >
            Главная
          </NavLink>
          <NavLink 
            to="/projects" 
            className={({ isActive }) => 
              isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
            }
          >
            Проекты
          </NavLink>
          <NavLink 
            to="/profile" 
            className={({ isActive }) => 
              isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
            }
          >
            Профиль
          </NavLink>
          <div className={styles.authButtons}>
            <NavLink to="/login">
              <Button variant="outline" size="small">Войти</Button>
            </NavLink>
            <NavLink to="/register">
              <Button variant="primary" size="small">Регистрация</Button>
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
