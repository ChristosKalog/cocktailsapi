import React, { useState } from "react";
import { Link } from "react-router-dom";
import mockCocktails from "../../data/mockCocktails"; // Import the mock cocktail data
import styles from "../../styles/recipelist.module.css"; // Import CSS module for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAlphaAsc,
  faSortAlphaDesc,
} from "@fortawesome/free-solid-svg-icons";
// import placeholder_sm from "../../assets/images/placeholder1.png";

const RecipeList = () => {
  const [filter, setFilter] = useState("");
  const [complexity, setComplexity] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // New state for sorting, default to ascending

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // Filter cocktails based on style and complexity
  const filteredCocktails = mockCocktails
    .filter((cocktail) => {
      const matchesStyle = filter ? cocktail.style === filter : true;
      const matchesComplexity = complexity
        ? cocktail.complexityLevel === complexity
        : true;
      return matchesStyle && matchesComplexity;
    })
    .sort((a, b) => {
      // Sort cocktails alphabetically based on the selected sort order
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  // Get unique styles and complexities for filter options
  const stylesOptions = [
    ...new Set(mockCocktails.map((cocktail) => cocktail.style)),
  ];
  const complexityOptions = [
    ...new Set(mockCocktails.map((cocktail) => cocktail.complexityLevel)),
  ];

  return (
    <div className={styles.recipeList}>
      <h1>Cocktail Recipes</h1>

      {/* Filter Options */}
      <div className={styles.filters}>
        <label>
          Filter by Style:
          <select onChange={(e) => setFilter(e.target.value)} value={filter}>
            <option value="">All</option>
            {stylesOptions.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </label>

        <label>
          Filter by Complexity:
          <select
            onChange={(e) => setComplexity(e.target.value)}
            value={complexity}
          >
            <option value="">All</option>
            {complexityOptions.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </label>

        {/* Sort Button */}
        <button onClick={toggleSortOrder} className={styles.sortButton}>
          <FontAwesomeIcon
            icon={sortOrder === "asc" ? faSortAlphaAsc : faSortAlphaDesc}
          />
        </button>
      </div>

      {/* Cocktail List */}
      <div className={styles.recipeGrid}>
        {filteredCocktails.map((cocktail) => (
          <Link
            key={cocktail.id}
            to={`/recipes/${cocktail.id}`}
            className={styles.recipeLink}
          >
            <div className={styles.recipeCard}>
              <div className={styles.imageContainer}>
                <img
                  className={styles.image}
                  src={require(`../../assets/images/${cocktail.imageName}`)}
                  alt={cocktail.name}
                />{" "}
              </div>

              <div className={styles.infoContainer}>
                <h2>{cocktail.name}</h2>
                <div className={styles.moreInfo}>
                  <p>
                    <strong>Style:</strong> {cocktail.style}
                  </p>
                  <p>
                    <strong>Complexity:</strong> {cocktail.complexityLevel}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
