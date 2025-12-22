import React from 'react';
import type { ProfileHeaderProps } from '../../../../types';
import styles from './ProfileHeader.module.css';


const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  onEditProfile,
  onAddProject,
}) => {
  return (
    <div className={styles.profileHeader}>
      <div className={styles.headerContent}>
        <img 
          src={user.avatar} 
          alt={user.fullName} 
          className={styles.avatar}
        />
        <div className={styles.userInfo}>
          <h1 className={styles.userName}>{user.fullName}</h1>
          <p className={styles.userPosition}>{user.position}</p>
          <p className={styles.userUsername}>@{user.username}</p>
        </div>
      </div>
      <div className={styles.headerActions}>
        <button 
          className={styles.editButton}
          onClick={onEditProfile}
        >
          Редактировать профиль
        </button>
        <button 
          className={styles.addButton}
          onClick={onAddProject}
        >
          + Добавить проект
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
