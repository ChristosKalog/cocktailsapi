import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackButton = ({ onClick }) => {
  return (
    <button className="back-button" onClick={onClick}>
      <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
      <span>Back</span>
    </button>
  );
};

export default BackButton;
