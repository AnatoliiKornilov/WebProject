import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProjects } from '../../store/slices/projectsSlice';
import ProfileHeader from './components/ProfileHeader/ProfileHeader';
import ProfileInfo from './components/ProfileInfo/ProfileInfo';
import ProfileProjects from './components/ProfileProjects/ProfileProjects';
import ProfileStats from './components/ProfileStats/ProfileStats';
import styles from './ProfilePage.module.css';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { projects, status } = useAppSelector((state) => state.projects);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    dispatch(fetchProjects());
  }, [dispatch, isAuthenticated, navigate]);

  useEffect(() => {
    console.log('Текущий пользователь в ProfilePage:', user);
  }, [user]);

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  const handleAddProject = () => {
    navigate('/projects/add');
  };

  const handleEditProject = (id: string) => {
    navigate(`/projects/edit/${id}`);
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот проект?')) {
      console.log('Удалить проект:', id);
    }
  };

  if (!user) {
    return (
      <div className={styles.loading}>
        <p>Загрузка профиля...</p>
      </div>
    );
  }

  return (
    <div className={styles.profilePage}>
      <div className="container">
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>Профиль</h1>
            <p className={styles.pageSubtitle}>
              Ваша личная информация и проекты
            </p>
          </div>
        </div>

        <ProfileHeader 
          user={user}
          onEditProfile={handleEditProfile}
          onAddProject={handleAddProject}
        />

        <div className={styles.profileContent}>
          <div className={styles.mainColumn}>
            <ProfileInfo user={user} />
          </div>

          <div className={styles.sidebarColumn}>
            <ProfileProjects 
              projects={projects}
              onEditProject={handleEditProject}
              onDeleteProject={handleDeleteProject}
              isLoading={status === 'loading'}
            />
            <ProfileStats 
              user={user}
              projectCount={projects.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
