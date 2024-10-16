import React from "react";
import styles from "../../styles/DeleteButton.module.css"; // Adjust the path if necessary
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const ButtonComponent = ({ onClick, category, children }) => {
  // Determine the icon based on the category
  const iconValue = category === "delete" ? faTrash : category === "edit" ? faEdit : null;

  console.log("button component rendered");
  console.log(iconValue);

  return (
    <button className={styles.deleteButton} onClick={onClick}>
      {iconValue && <FontAwesomeIcon className={styles.deleteIcon} icon={iconValue} />}
      {children}
    </button>
  );
};

export default ButtonComponent;
