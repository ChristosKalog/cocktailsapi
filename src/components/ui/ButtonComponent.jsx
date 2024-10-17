import React from "react";
import styles from "../../styles/DeleteButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faSave,
  faAdd,
  faSignIn,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const ButtonComponent = ({ onClick, category, children, type }) => {
  const iconValue =
    category === "delete"
      ? faTrash
      : category === "edit"
      ? faEdit
      : category === "save"
      ? faSave
      : category === "add"
      ? faAdd
      : category === "login"
      ? faSignIn
      : category === "register"
      ? faUser
      : null;
      
  const typeValue = type === "submit" ? "submit" : "";

  return (
    <button className={styles.deleteButton} type={typeValue} onClick={onClick}>
      {iconValue && (
        <FontAwesomeIcon className={styles.deleteIcon} icon={iconValue} />
      )}
      {children}
    </button>
  );
};

export default ButtonComponent;
