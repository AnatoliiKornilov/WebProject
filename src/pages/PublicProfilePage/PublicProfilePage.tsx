import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUserProfile } from '../../store/slices/usersSlice';
import { fetchProjects } from '../../store/slices/projectsSlice';
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
  const { projects, status: projectsStatus } = useAppSelector((state) => state.projects);
  
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);

  useEffect(() => {
    if (username) {
      dispatch(fetchUserProfile(username));
      dispatch(fetchProjects());
    }
  }, [dispatch, username]);

  const profile = publicProfiles.find(p => p.username === username);

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

  return (
    <div className={styles.page}>
      <div className="container">
        <ProfileHeader profile={profile} />
        
        <div className={styles.content}>
          <div className={styles.mainColumn}>
            <ProfileProjects 
              projects={projects} 
              onViewProject={handleViewProject}
            />
          </div>
          
          <div className={styles.sidebar}>
            <ProfileInfo profile={profile} />
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
