import React from 'react';
import type { PublicProfile } from '../../../../types';
import styles from './ProfileHeader.module.css';
import { getAvatarImage } from '../../../../utils/imageUtils';

interface ProfileHeaderProps {
  profile: PublicProfile;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
  return (
    <div className={styles.header}>
      <div className={styles.avatarContainer}>
        <img 
          src={getAvatarImage(profile.avatar)} 
          alt={profile.fullName}
          className={styles.avatar}
        />
      </div>
      
      <div className={styles.info}>
        <h1 className={styles.fullName}>{profile.fullName}</h1>
        <p className={styles.username}>@{profile.username}</p>
        <p className={styles.position}>{profile.position}</p>
        
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{profile.projectsCount || 0}</span>
            <span className={styles.statLabel}>Проектов</span>
          </div>
        </div>
        
        <div className={styles.bio}>
          <p>{profile.bio}</p>
        </div>
        
        <div className={styles.socialLinks}>
          {profile.github && (
            <a 
              href={profile.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <span className={styles.socialIcon}>🐙</span>
              GitHub
            </a>
          )}
          {profile.gitlab && (
            <a 
              href={profile.gitlab} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <span className={styles.socialIcon}>🦊</span>
              GitLab
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
