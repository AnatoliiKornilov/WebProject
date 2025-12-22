import React from 'react';
import Button from '../../../../components/common/Button/Button';
import styles from './DeleteConfirmation.module.css';

interface DeleteConfirmationProps {
  projectTitle: string;
  isSubmitting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  projectTitle,
  isSubmitting,
  onCancel,
  onConfirm,
}) => {
  return (
    <div className={styles.container}>
      <p className={styles.message}>
        Вы уверены, что хотите удалить проект "{projectTitle}"?
      </p>
      <p className={styles.warning}>Это действие нельзя отменить.</p>
      
      <div className={styles.actions}>
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Отмена
        </Button>
        <Button
          variant="danger"
          onClick={onConfirm}
          isLoading={isSubmitting}
        >
          Удалить
        </Button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
