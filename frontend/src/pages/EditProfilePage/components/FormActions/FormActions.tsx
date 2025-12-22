import React from 'react';
import Button from '../../../../components/common/Button/Button';
import styles from './FormActions.module.css';

interface FormActionsProps {
  isSubmitting: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  error?: string;
}

const FormActions: React.FC<FormActionsProps> = ({
  isSubmitting,
  onSubmit,
  onCancel,
  error,
}) => {
  return (
    <>
      {error && (
        <div className={styles.submitError}>
          {error}
        </div>
      )}

      <div className={styles.actions}>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Отмена
        </Button>
        <Button
          type="submit"
          variant="primary"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
        </Button>
      </div>
    </>
  );
};

export default FormActions;
