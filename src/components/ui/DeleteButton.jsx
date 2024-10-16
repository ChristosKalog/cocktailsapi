// src/components/ui/DeleteButton.js
import React from 'react';
import styles from '../../styles/DeleteButton.module.css'; // Adjust the path if necessary
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const DeleteButton = ({ onClick, children }) => {
  return (
    <button className={styles.deleteButton} onClick={onClick}>
      <FontAwesomeIcon className={styles.deleteIcon} icon={faTrash} />
      {children}
    </button>
  );
};

export default DeleteButton;
