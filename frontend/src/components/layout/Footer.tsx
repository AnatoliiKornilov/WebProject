import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>DevPortfolio</h3>
          <p className={styles.footerDescription}>
            Современная платформа для создания IT-портфолио.
            Покажи свои проекты в лучшем свете.
          </p>
        </div>

        <div className={styles.footerSection}>
          <h4 className={styles.footerSubtitle}>Навигация</h4>
          <ul className={styles.footerLinks}>
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  isActive ? `${styles.footerLink} ${styles.activeLink}` : styles.footerLink
                }
                end
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/profiles" 
                className={({ isActive }) => 
                  isActive ? `${styles.footerLink} ${styles.activeLink}` : styles.footerLink
                }
              >
                Портфолио
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/projects" 
                className={({ isActive }) => 
                  isActive ? `${styles.footerLink} ${styles.activeLink}` : styles.footerLink
                }
              >
                Проекты
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/projects/add" 
                className={({ isActive }) => 
                  isActive ? `${styles.footerLink} ${styles.activeLink}` : styles.footerLink
                }
              >
                Добавить проект
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/login" 
                className={({ isActive }) => 
                  isActive ? `${styles.footerLink} ${styles.activeLink}` : styles.footerLink
                }
              >
                Войти
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/register" 
                className={({ isActive }) => 
                  isActive ? `${styles.footerLink} ${styles.activeLink}` : styles.footerLink
                }
              >
                Регистрация
              </NavLink>
            </li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4 className={styles.footerSubtitle}>Контакты</h4>
          <ul className={styles.footerLinks}>
            <li><a href="mailto:kornilov.anatolii@phystech.edu" className={styles.footerLink}>kornilov.anatolii@phystech.edu</a></li>
            <li><a href="https://github.com/AnatoliiKornilov" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>GitHub</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p className={styles.copyright}>
          © {currentYear} DevPortfolio. Все права защищены.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
