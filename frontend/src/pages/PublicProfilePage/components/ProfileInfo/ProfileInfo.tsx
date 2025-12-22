import React from 'react';
import type { PublicProfile } from '../../../../types';
import styles from './ProfileInfo.module.css';

interface ProfileInfoProps {
  profile: PublicProfile;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ profile }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Не указано';
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.profileInfo}>
      <div className={styles.infoCard}>
        <h3 className={styles.cardTitle}>👤 Контактная информация</h3>
        
        <div className={styles.infoGrid}>
          {profile.email && (
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email:</span>
              <a href={`mailto:${profile.email}`} className={styles.infoValue}>
                {profile.email}
              </a>
            </div>
          )}
          
          {profile.phone && (
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Телефон:</span>
              <a href={`tel:${profile.phone}`} className={styles.infoValue}>
                {profile.phone}
              </a>
            </div>
          )}
          
          {profile.birthDate && (
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Дата рождения:</span>
              <span className={styles.infoValue}>{formatDate(profile.birthDate)}</span>
            </div>
          )}
          
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>На платформе с:</span>
            <span className={styles.infoValue}>{formatDate(profile.createdAt)}</span>
          </div>
        </div>
      </div>

      {profile.experience && (
        <div className={styles.infoCard}>
          <h3 className={styles.cardTitle}>💼 Опыт работы</h3>
          <div className={styles.experienceContent}>
            {profile.experience.split('\n').map((item, index) => (
              <div key={index} className={styles.experienceItem}>
                <div className={styles.experienceBullet}>•</div>
                <div className={styles.experienceText}>{item.trim()}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {profile.education && (
        <div className={styles.infoCard}>
          <h3 className={styles.cardTitle}>🎓 Образование</h3>
          <div className={styles.educationContent}>
            {profile.education.split('\n').map((item, index) => (
              <div key={index} className={styles.educationItem}>
                <div className={styles.educationBullet}>🎓</div>
                <div className={styles.educationText}>{item.trim()}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
