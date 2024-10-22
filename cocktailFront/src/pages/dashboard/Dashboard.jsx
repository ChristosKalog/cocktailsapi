import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Dashboard.module.css";
import menuService from "../../services/menuService";
import recipeService from "../../services/recipeService";
import ButtonComponent from "../../components/ui/ButtonComponent";

const Dashboard = () => {
  const [menus, setMenus] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const retrievedMenus = await menuService.fetchMenus();
        setMenus(retrievedMenus);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus();

    const fetchCocktails = async () => {
      try {
        const retrievedRecipes = await recipeService.getAllRecipes();
        setRecipes(retrievedRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchCocktails();
  }, []);

  // Get the last 5 items for menus and recipes
  const latestMenus = menus.slice(-5);
  const latestRecipes = recipes.slice(-5);

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <div className={styles.bigContainer}>
              {/* Menus Section */}
      <div className={styles.menusList}>
        <h3>Your Latest Menus</h3>
        {latestMenus.length > 0 ? (
          <div className={styles.menuItemsContainer}>
            {latestMenus.map((menu) => (
              <div key={menu.id} className={styles.itemContainer}>
                <Link className={styles.menuLink} to={`/viewmenu/${menu.id}`}>
                  {menu.title}
                </Link>
              </div>
            ))}
            <Link to="/menus" className={styles.viewAllLink}>
              View All Menus
            </Link>
          </div>
        ) : (
          <>
            <p>
              No menus yet!
              <Link className={styles.link} to="/menu/create">
                {" "}
                Create your first!
              </Link>
            </p>
          </>
        )}
      </div>

      {/* Cocktails Section */}
      <div className={styles.menusList}>
        <h3>Your Latest Cocktails</h3>
        {latestRecipes.length > 0 ? (
          <div className={styles.menuItemsContainer}>
            {latestRecipes.map((recipe) => (
              <div key={recipe.id} className={styles.itemContainer}>
                <Link className={styles.menuLink} to={`/viewrecipe/${recipe.id}`}>
                  {recipe.name}
                </Link>
              </div>
            ))}
            <Link to="/recipes" className={styles.viewAllLink}>
              View All Cocktails
            </Link>
          </div>
        ) : (
          <>
            <p>
              No cocktails yet!
              <Link className={styles.link} to="/recipe/Add">
                {" "}
                Add your first!
              </Link>
            </p>
          </>
        )}
      </div>

      {/* Add Recipe Button */}
      <div className={styles.buttonContainer}>
        <ButtonComponent category="add">
          <Link to="/recipe/Add">Add a recipe!</Link>
        </ButtonComponent>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
