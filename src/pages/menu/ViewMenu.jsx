import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { handleDownloadPDF } from "./download"; 
import styles from "../../styles/ViewMenu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons"; // Import the download icon
import menuService from "../../services/menuService"; // Adjust the path if needed


const ViewMenu = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState(null);


  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const retrievedMenus = await menuService.fetchMenus();
        const foundMenu = retrievedMenus.find((menu) => menu.id === id);
        setMenu(foundMenu);

      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus(); // Call the fetchMenus function
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