import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { handleDownloadPDF } from "./download"; 
import styles from "../../styles/ViewMenu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons"; // Import the download icon

const ViewMenu = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    // Retrieve menus from localStorage and find the one matching the id
    const savedMenus = JSON.parse(localStorage.getItem("menus")) || [];
    const foundMenu = savedMenus.find((menu) => menu.id === parseInt(id));
    setMenu(foundMenu);
  }, [id]);

  if (!menu) {
    return <p>Menu not found</p>;
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.viewMenu}>
        <div className={styles.menuTitle}>
          <h3>The</h3>
          <h1>{menu.title}</h1>
          <h3>Menu</h3>
        </div>
        <ul>
          {menu.cocktails.map((cocktail) => (
            <li key={cocktail.id}>
              <p>{cocktail.name}</p>
              <p>€{cocktail.price}</p>
            </li>
          ))}
        </ul>
        {/* Use the extracted PDF download function */}
        <div className={styles.buttonContainer}>
          <p>Download PDF</p>
          <button onClick={() => handleDownloadPDF(menu)} className={styles.downloadButton}>
            <FontAwesomeIcon icon={faDownload} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewMenu;