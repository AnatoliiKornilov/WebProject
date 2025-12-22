import React from 'react';
import type { User } from '../../../../types';
import styles from './ProfileInfo.module.css';

interface ProfileInfoProps {
  user: User;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Не указано';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Неверный формат даты';
      }
      
      return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch (error) {
      console.error('Ошибка форматирования даты:', error);
      return 'Не указано';
    }
  };

  // Функция для безопасного разбиения строки
  const safeSplit = (text?: string, separator: string = '\n') => {
    if (!text || typeof text !== 'string') return [];
    return text.split(separator).filter(item => item.trim());
  };

  return (
    <div className={styles.profileInfo}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Контактная информация</h3>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Email:</span>
            <span className={styles.infoValue}>{user.email || 'Не указано'}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Телефон:</span>
            <span className={styles.infoValue}>{user.phone || 'Не указано'}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Дата рождения:</span>
            <span className={styles.infoValue}>
              {formatDate(user.birthDate)}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Ссылки</h3>
        <div className={styles.links}>
          {user.github && (
            <a 
              href={user.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.link}
            >
              GitHub
            </a>
          )}
          {user.gitlab && (
            <a 
              href={user.gitlab} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.link}
            >
              GitLab
            </a>
          )}
          {!user.github && !user.gitlab && (
            <span className={styles.noLinks}>Ссылки не указаны</span>
          )}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>О себе</h3>
        <p className={styles.bio}>{user.bio || 'Информация о себе не добавлена'}</p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Опыт работы</h3>
        <div className={styles.list}>
          {safeSplit(user.experience).length > 0 ? (
            safeSplit(user.experience).map((item, index) => (
              <p key={index} className={styles.listItem}>{item}</p>
            ))
          ) : (
            <p className={styles.emptyText}>Опыт работы не указан</p>
          )}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Образование</h3>
        <div className={styles.list}>
          {safeSplit(user.education).length > 0 ? (
            safeSplit(user.education).map((item, index) => (
              <p key={index} className={styles.listItem}>{item}</p>
            ))
          ) : (
            <p className={styles.emptyText}>Образование не указано</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
