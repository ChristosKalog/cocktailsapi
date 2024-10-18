import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { handleDownloadPDF } from "./download";
import styles from "../../styles/ViewMenu.module.css";
import menuService from "../../services/menuService"; 
import cocktailsData from "../../data/db.json"; 
import ButtonComponent from "../../components/ui/ButtonComponent";
import CocktailComponent from "../../components/ui/CocktailComponent";

const ViewMenu = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState(null);
  const [cocktailDetails, setCocktailDetails] = useState([]); // Store the actual cocktail details

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const retrievedMenus = await menuService.fetchMenus();
        const foundMenu = retrievedMenus.find((menu) => menu.id === id);
        if (foundMenu) {
          setMenu(foundMenu);
          const selectedCocktails = foundMenu.cocktailIds.map((cocktailId) =>
            cocktailsData.savedCocktails.find(
              (cocktail) => cocktail.id === cocktailId
            )
          );
          setCocktailDetails(selectedCocktails);
        }
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenu();
  }, [id]);

  if (!menu) {
    return <p>Menu not found</p>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.menuTitle}>
        <h3>The</h3>
        <h1>{menu.title}</h1>
        <h3>Menu</h3>
      </div>
      <div className={styles.viewMenu}>
        {cocktailDetails.map((cocktail) => (
          <CocktailComponent key={cocktail.id} cocktail={cocktail} />
        ))}
      </div>

      <div className={styles.buttonContainer}>
        <ButtonComponent 
          onClick={() => handleDownloadPDF(menu, cocktailDetails)}  // Pass menu and cocktailDetails here
          category="download"
        >
          PDF
        </ButtonComponent>
      </div>
    </div>
  );
};

export default ViewMenu;
