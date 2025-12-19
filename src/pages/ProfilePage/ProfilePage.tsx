import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileHeader from './components/ProfileHeader/ProfileHeader';
import ProfileInfo from './components/ProfileInfo/ProfileInfo';
import ProfileProjects from './components/ProfileProjects/ProfileProjects';
import ProfileStats from './components/ProfileStats/ProfileStats';
import { mockUser, mockUserProjects } from './mockData';
import styles from './ProfilePage.module.css';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

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
      // Здесь будет логика удаления
    }
  };

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
          user={mockUser}
          onEditProfile={handleEditProfile}
          onAddProject={handleAddProject}
        />

        <div className={styles.profileContent}>
          <div className={styles.mainColumn}>
            <ProfileInfo user={mockUser} />
          </div>

          <div className={styles.sidebarColumn}>
            <ProfileProjects 
              projects={mockUserProjects}
              onEditProject={handleEditProject}
              onDeleteProject={handleDeleteProject}
            />
            <ProfileStats 
              user={mockUser}
              projectCount={mockUserProjects.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
