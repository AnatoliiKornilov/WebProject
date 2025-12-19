import React from 'react';
import type { ProfileStatsProps } from '../../../../types';
import styles from './ProfileStats.module.css';

const ProfileStats: React.FC<ProfileStatsProps> = ({ user, projectCount }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Подсчет уникальных технологий из проектов
  const technologiesCount = 8; // Временное значение

  return (
    <div className={styles.statsSection}>
      <h3 className={styles.statsTitle}>Статистика</h3>
      
      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>{projectCount}</div>
          <div className={styles.statLabel}>Проектов</div>
        </div>
        
        <div className={styles.statItem}>
          <div className={styles.statNumber}>{technologiesCount}</div>
          <div className={styles.statLabel}>Технологий</div>
        </div>
        
        <div className={styles.statItem}>
          <div className={styles.statDate}>{formatDate(user.createdAt)}</div>
          <div className={styles.statLabel}>С нами с</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
