import React from 'react';
import styles from '../../styles/deleteConfirmation.module.css'; // Adjust path as necessary

const DeleteConfirmation = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.confirmationDialog}>
      <p>Are you sure?</p>
      <button className={styles.confirmButton} onClick={onConfirm}>
        Yes
      </button>
      <button className={styles.cancelButton} onClick={onCancel}>
        No
      </button>
    </div>
  );
};

export default DeleteConfirmation;