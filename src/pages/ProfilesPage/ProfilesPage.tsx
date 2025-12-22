import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPublicProfiles } from '../../store/slices/usersSlice';
import styles from './ProfilesPage.module.css';

const ProfilesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { publicProfiles, status } = useAppSelector((state) => state.users);
  
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchPublicProfiles());
  }, [dispatch]);

  const filteredProfiles = publicProfiles.filter(profile =>
    profile.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.bio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isLoading = status === 'loading';

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Загрузка профилей...</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Публичные портфолио</h1>
          <p className={styles.subtitle}>
            Найдите вдохновение в работах других разработчиков
          </p>
          
          <div className={styles.searchContainer}>
            <div className={styles.searchInputWrapper}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Поиск по имени, должности, технологиям..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              {searchTerm && (
                <button 
                  className={styles.clearButton}
                  onClick={() => setSearchTerm('')}
                >
                  ×
                </button>
              )}
            </div>
            <div className={styles.searchStats}>
              Найдено: {filteredProfiles.length} профилей
            </div>
          </div>
        </div>

        {filteredProfiles.length > 0 ? (
          <div className={styles.profilesGrid}>
            {filteredProfiles.map((profile) => (
              <Link 
                key={profile.id} 
                to={`/profiles/${profile.username}`}
                className={styles.profileCard}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.avatarWrapper}>
                    <img 
                      src={profile.avatar} 
                      alt={profile.fullName}
                      className={styles.profileAvatar}
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/150?text=Avatar';
                      }}
                    />
                  </div>
                  <div className={styles.profileInfo}>
                    <h3 className={styles.profileName}>{profile.fullName}</h3>
                    <p className={styles.profileUsername}>@{profile.username}</p>
                    <p className={styles.profilePosition}>{profile.position}</p>
                  </div>
                </div>
                
                <div className={styles.cardContent}>
                  <p className={styles.profileBio}>
                    {profile.bio.length > 120 
                      ? `${profile.bio.substring(0, 120)}...` 
                      : profile.bio}
                  </p>
                  
                  <div className={styles.stats}>
                    <div className={styles.stat}>
                      <span className={styles.statNumber}>{profile.id}</span>
                      <span className={styles.statLabel}>проектов</span>
                    </div>
                  </div>
                </div>
                
                <div className={styles.cardFooter}>
                  <span className={styles.viewProfile}>
                    Посмотреть портфолио →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>🔍</div>
            <h3>Ничего не найдено</h3>
            <p>Попробуйте изменить поисковый запрос</p>
            {searchTerm && (
              <button 
                className={styles.clearSearchButton}
                onClick={() => setSearchTerm('')}
              >
                Очистить поиск
              </button>
            )}
          </div>
        )}

        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Хотите, чтобы ваше портфолио было здесь?</h2>
            <p className={styles.ctaText}>
              Зарегистрируйтесь и добавьте свои проекты. Это бесплатно!
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/register" className={styles.ctaButtonPrimary}>
                Создать портфолио
              </Link>
              <Link to="/" className={styles.ctaButtonSecondary}>
                Узнать больше
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilesPage;
