export const IMAGE_PATHS = {
  AVATAR: '/images/default-avatar.svg',
  PROJECT: '/images/default-project.svg',
  LOGO: '/images/logo.svg',
} as const;

export const getDefaultImage = (type: 'avatar' | 'project' | 'logo' = 'avatar'): string => {
  switch (type) {
    case 'project':
      return IMAGE_PATHS.PROJECT;
    case 'logo':
      return IMAGE_PATHS.LOGO;
    case 'avatar':
    default:
      return IMAGE_PATHS.AVATAR;
  }
};

export const getProjectImage = (imageUrl?: string): string => {
  return imageUrl || IMAGE_PATHS.PROJECT;
};

export const getAvatarImage = (avatarUrl?: string): string => {
  return avatarUrl || IMAGE_PATHS.AVATAR;
};
