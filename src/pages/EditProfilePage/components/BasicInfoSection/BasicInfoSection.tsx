import React from 'react';
import Input from '../../../../components/common/Input/Input';
import type { FormSectionProps } from '../../types';
import styles from './BasicInfoSection.module.css';

const BasicInfoSection: React.FC<FormSectionProps> = ({ formData, errors, onChange }) => {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Основная информация</h3>
      <div className={styles.formGrid}>
        <Input
          label="Имя пользователя *"
          name="username"
          value={formData.username}
          onChange={onChange}
          error={errors.username}
          placeholder="Введите имя пользователя"
          fullWidth
          required
        />

        <Input
          label="Email *"
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          error={errors.email}
          placeholder="example@email.com"
          fullWidth
          required
        />

        <Input
          label="Полное имя *"
          name="fullName"
          value={formData.fullName}
          onChange={onChange}
          error={errors.fullName}
          placeholder="Иван Иванов"
          fullWidth
          required
        />

        <Input
          label="Должность"
          name="position"
          value={formData.position}
          onChange={onChange}
          placeholder="Full-stack разработчик"
          fullWidth
        />

        <Input
          label="Аватар (ссылка)"
          name="avatar"
          value={formData.avatar}
          onChange={onChange}
          placeholder="https://example.com/avatar.jpg"
          fullWidth
        />

        <Input
          label="Дата рождения"
          name="birthDate"
          type="date"
          value={formData.birthDate}
          onChange={onChange}
          fullWidth
        />
      </div>
    </div>
  );
};

export default BasicInfoSection;
