import React from 'react';
import Button from '../../components/common/Button/Button';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>DevPortfolio</h1>
          <p className={styles.heroSubtitle}>
            Создай впечатляющее IT-портфолио
          </p>
          <p className={styles.heroDescription}>
            Современная платформа для презентации проектов и навыков.
            Покажи свои работы в лучшем свете и привлекай внимание рекрутеров.
          </p>
          <div className={styles.heroButtons}>
            <Button variant="primary" size="large">Создать портфолио</Button>
            <Button variant="outline" size="large">Посмотреть примеры</Button>
          </div>
        </div>
        <div className={styles.heroImage}>
          <div className={styles.imagePlaceholder}>
            <span>🎨</span>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Почему DevPortfolio?</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🎨</div>
              <h3 className={styles.featureTitle}>Визуальная привлекательность</h3>
              <p>Показывай проекты через красивые карточки с изображениями</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⚡</div>
              <h3 className={styles.featureTitle}>Мгновенное обновление</h3>
              <p>Добавляй новые проекты без перепубликации резюме</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📱</div>
              <h3 className={styles.featureTitle}>Адаптивный дизайн</h3>
              <p>Идеальное отображение на любом устройстве</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
