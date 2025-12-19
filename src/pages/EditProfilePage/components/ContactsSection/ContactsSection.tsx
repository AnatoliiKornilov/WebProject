import React from 'react';
import Input from '../../../../components/common/Input/Input';
import type { FormSectionProps } from '../../types';
import styles from './ContactsSection.module.css';

const ContactsSection: React.FC<FormSectionProps> = ({ formData, errors, onChange }) => {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Контакты</h3>
      <div className={styles.formGrid}>
        <Input
          label="Телефон"
          name="phone"
          value={formData.phone}
          onChange={onChange}
          placeholder="+7 (999) 123-45-67"
          fullWidth
        />

        <Input
          label="GitHub"
          name="github"
          value={formData.github}
          onChange={onChange}
          placeholder="https://github.com/username"
          fullWidth
        />

        <Input
          label="GitLab"
          name="gitlab"
          value={formData.gitlab}
          onChange={onChange}
          placeholder="https://gitlab.com/username"
          fullWidth
        />
      </div>
    </div>
  );
};

export default ContactsSection;
