import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/recipecomponent.module.css";

const RecipeComponent = ({ cocktail }) => {
  return (
    <Link
      key={cocktail.id}
      to={`/recipes/${cocktail.id}`}
      className={styles.recipeLink}
    >
      <div className={styles.recipeCard}>
        <div className={styles.infoContainer}>
          <h2>{cocktail.name}</h2>
          <div className={styles.moreInfo}>
            <p>
              <strong>Style:</strong> {cocktail.cocktailStyle}
            </p>
            <p>
              <strong>Complexity:</strong> {cocktail.complexityLevel}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeComponent;
