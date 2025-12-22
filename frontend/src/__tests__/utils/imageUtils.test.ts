import { 
  IMAGE_PATHS, 
  getDefaultImage, 
  getProjectImage, 
  getAvatarImage 
} from '../../utils/imageUtils';

describe('imageUtils', () => {
  describe('IMAGE_PATHS', () => {
    it('должен содержать правильные пути к изображениям', () => {
      expect(IMAGE_PATHS).toEqual({
        AVATAR: '/images/default-avatar.svg',
        PROJECT: '/images/default-project.svg',
        LOGO: '/images/logo.svg',
      });
    });
  });

  describe('getDefaultImage', () => {
    it('должен возвращать аватар по умолчанию', () => {
      expect(getDefaultImage()).toBe(IMAGE_PATHS.AVATAR);
      expect(getDefaultImage('avatar')).toBe(IMAGE_PATHS.AVATAR);
    });

    it('должен возвращать проект по умолчанию', () => {
      expect(getDefaultImage('project')).toBe(IMAGE_PATHS.PROJECT);
    });

    it('должен возвращать логотип по умолчанию', () => {
      expect(getDefaultImage('logo')).toBe(IMAGE_PATHS.LOGO);
    });
  });

  describe('getProjectImage', () => {
    it('должен возвращать переданный URL изображения проекта', () => {
      const testUrl = 'https://example.com/project.jpg';
      expect(getProjectImage(testUrl)).toBe(testUrl);
      expect(getProjectImage('/custom/path.jpg')).toBe('/custom/path.jpg');
    });

    it('должен возвращать дефолтное изображение проекта, если URL пустой', () => {
      expect(getProjectImage('')).toBe(IMAGE_PATHS.PROJECT);
      expect(getProjectImage(undefined)).toBe(IMAGE_PATHS.PROJECT);
    });
  });

  describe('getAvatarImage', () => {
    it('должен возвращать переданный URL аватара', () => {
      const testUrl = 'https://example.com/avatar.jpg';
      expect(getAvatarImage(testUrl)).toBe(testUrl);
      expect(getAvatarImage('/uploads/avatar.png')).toBe('/uploads/avatar.png');
    });

    it('должен возвращать дефолтный аватар, если URL пустой', () => {
      expect(getAvatarImage('')).toBe(IMAGE_PATHS.AVATAR);
      expect(getAvatarImage(undefined)).toBe(IMAGE_PATHS.AVATAR);
    });
  });

  describe('сравнение getProjectImage и getAvatarImage', () => {
    it('должны возвращать разные дефолтные изображения', () => {
      expect(getProjectImage()).toBe(IMAGE_PATHS.PROJECT);
      expect(getAvatarImage()).toBe(IMAGE_PATHS.AVATAR);
      expect(getProjectImage()).not.toBe(getAvatarImage());
    });
  });
});
