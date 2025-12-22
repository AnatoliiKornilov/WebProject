import React from 'react';
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
            <li><a href="/" className={styles.footerLink}>Главная</a></li>
            <li><a href="/projects" className={styles.footerLink}>Проекты</a></li>
            <li><a href="/profile" className={styles.footerLink}>Профиль</a></li>
            <li><a href="/login" className={styles.footerLink}>Войти</a></li>
            <li><a href="/register" className={styles.footerLink}>Регистрация</a></li>
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
