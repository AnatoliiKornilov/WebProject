import { useAppSelector } from '../store/hooks';

export const useProfileOwnership = (profileUsername?: string) => {
  const { user } = useAppSelector((state) => state.auth);
  const isOwnProfile = profileUsername === user?.username;
  const canEditProfile = isOwnProfile;
  const canEditProjects = isOwnProfile;
  
  return {
    isOwnProfile,
    canEditProfile,
    canEditProjects,
  };
};
