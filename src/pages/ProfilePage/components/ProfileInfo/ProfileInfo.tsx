import React from 'react';
import type { User } from '../../../../types';
import styles from './ProfileInfo.module.css';

interface ProfileInfoProps {
  user: User;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className={styles.profileInfo}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Контактная информация</h3>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Email:</span>
            <span className={styles.infoValue}>{user.email}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Телефон:</span>
            <span className={styles.infoValue}>{user.phone}</span>
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
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>О себе</h3>
        <p className={styles.bio}>{user.bio}</p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Опыт работы</h3>
        <div className={styles.list}>
          {user.experience.split('\n').map((item, index) => (
            <p key={index} className={styles.listItem}>{item}</p>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Образование</h3>
        <div className={styles.list}>
          {user.education.split('\n').map((item, index) => (
            <p key={index} className={styles.listItem}>{item}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
