import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUserProfile } from '../../store/slices/usersSlice';
import { fetchPublicProjects } from '../../store/slices/projectsSlice';
import ProfileHeader from './components/ProfileHeader/ProfileHeader';
import ProfileInfo from './components/ProfileInfo/ProfileInfo';
import ProfileProjects from './components/ProfileProjects/ProfileProjects';
import ProjectPreviewModal from '../../components/common/ProjectPreviewModal/ProjectPreviewModal';
import type { Project } from '../../types';
import styles from './PublicProfilePage.module.css';

const PublicProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { publicProfiles, status: usersStatus } = useAppSelector((state) => state.users);
  const { status: projectsStatus } = useAppSelector((state) => state.projects);
  
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);

  useEffect(() => {
    if (username) {
      dispatch(fetchUserProfile(username));
    }
  }, [dispatch, username]);

  const profile = publicProfiles.find(p => p.username === username);

  useEffect(() => {
    if (profile?.id) {
      const loadUserProjects = async () => {
        try {
          const result = await dispatch(fetchPublicProjects(profile.id)).unwrap();
          setUserProjects(result);
        } catch (error) {
          console.error('Ошибка загрузки проектов пользователя:', error);
          setUserProjects([]);
        }
      };
      
      loadUserProjects();
    }
  }, [dispatch, profile?.id]);

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const isLoading = usersStatus === 'loading' || projectsStatus === 'loading';

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Загрузка профиля...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className={styles.notFound}>
        <h2>Профиль не найден</h2>
        <p>Пользователь с именем "{username}" не существует</p>
        <button 
          className={styles.backButton}
          onClick={() => navigate('/')}
        >
          Вернуться на главную
        </button>
      </div>
    );
  }

  const updatedProfile = {
    ...profile,
    projectsCount: userProjects.length
  };

  return (
    <div className={styles.page}>
      <div className="container">
        <ProfileHeader profile={updatedProfile} />
        
        <div className={styles.content}>
          <div className={styles.mainColumn}>
            <ProfileProjects 
              projects={userProjects} 
              onViewProject={handleViewProject}
            />
          </div>
          
          <div className={styles.sidebar}>
            <ProfileInfo profile={updatedProfile} />
          </div>
        </div>
      </div>

      <ProjectPreviewModal
        project={selectedProject}
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
      />
    </div>
  );
};

export default PublicProfilePage;
