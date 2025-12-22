import React, { useState, useRef, useEffect } from 'react';
import type { KeyboardEvent } from 'react';
import styles from './TagInput.module.css';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  disabled?: boolean;
  label?: string;
  error?: string;
}

const TagInput: React.FC<TagInputProps> = ({
  tags,
  onChange,
  placeholder = 'Введите технологию и нажмите Enter',
  maxTags = 10,
  disabled = false,
  label,
  error,
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const addTag = () => {
    const trimmedValue = inputValue.trim();
    
    if (!trimmedValue || tags.length >= maxTags) return;
    
    if (!tags.includes(trimmedValue)) {
      onChange([...tags, trimmedValue]);
      setInputValue('');
    }
  };

  const removeTag = (index: number) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  const handleBlur = () => {
    if (inputValue.trim()) {
      addTag();
    }
  };

  const handleContainerClick = () => {
    if (!disabled) {
      focusInput();
    }
  };

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      
      <div 
        className={`${styles.tagInputContainer} ${disabled ? styles.disabled : ''} ${error ? styles.error : ''}`}
        onClick={handleContainerClick}
      >
        <div className={styles.tagsWrapper}>
          <div className={styles.tagsContainer}>
            {tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
                {!disabled && (
                  <button
                    type="button"
                    className={styles.removeTag}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTag(index);
                    }}
                    aria-label={`Удалить ${tag}`}
                    disabled={disabled}
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
          </div>
          
          {tags.length < maxTags && !disabled && (
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              placeholder={tags.length === 0 ? placeholder : ''}
              className={styles.input}
              disabled={disabled}
              maxLength={30}
            />
          )}
        </div>
      </div>

      {error && <span className={styles.errorText}>{error}</span>}
      
      <div className={styles.hint}>
        {disabled ? (
          <span>Технологии заблокированы для редактирования</span>
        ) : tags.length >= maxTags ? (
          <span className={styles.maxTagsWarning}>
            Достигнуто максимальное количество технологий: {maxTags}
          </span>
        ) : (
          <span>
            Нажмите Enter или введите запятую для добавления. 
            Максимум: {maxTags} технологий
          </span>
        )}
      </div>
    </div>
  );
};

export default TagInput;
