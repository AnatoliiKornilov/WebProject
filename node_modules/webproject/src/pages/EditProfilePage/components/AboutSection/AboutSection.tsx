import React from 'react';
import type { FormSectionProps } from '../../types';
import styles from './AboutSection.module.css';

const AboutSection: React.FC<FormSectionProps> = ({ formData, onChange }) => {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>О себе</h3>
      
      <div className={styles.textareaGroup}>
        <label className={styles.label}>Биография</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={onChange}
          className={styles.textarea}
          rows={4}
          placeholder="Расскажите о себе, своих интересах и опыте..."
        />
      </div>

      <div className={styles.textareaGroup}>
        <label className={styles.label}>Опыт работы (каждый пункт с новой строки)</label>
        <textarea
          name="experience"
          value={formData.experience}
          onChange={onChange}
          className={styles.textarea}
          rows={3}
          placeholder="Senior Developer в TechCompany (2020-настоящее время)"
        />
      </div>

      <div className={styles.textareaGroup}>
        <label className={styles.label}>Образование (каждый пункт с новой строки)</label>
        <textarea
          name="education"
          value={formData.education}
          onChange={onChange}
          className={styles.textarea}
          rows={2}
          placeholder="Бакалавр компьютерных наук, Университет IT (2014-2018)"
        />
      </div>
    </div>
  );
};

export default AboutSection;
