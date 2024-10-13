import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import mockCocktails from "../../data/mockCocktails";
import styles from "../../styles/recipelist.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAlphaAsc,
  faSortAlphaDesc,
} from "@fortawesome/free-solid-svg-icons";
import loadImageAsBase64 from "../../utils/loadImageAsBase64.js"; // Your utility function

const RecipeList = () => {
  const [filter, setFilter] = useState("");
  const [complexity, setComplexity] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [base64Images, setBase64Images] = useState({}); // To store base64 images

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  useEffect(() => {
    mockCocktails.forEach(async (cocktail) => {
      const imageName = cocktail.imageName;
      const storedImage = localStorage.getItem(imageName);

      if (!storedImage) {
        try {
          const base64Image = await loadImageAsBase64(imageName);
          localStorage.setItem(imageName, base64Image);
          setBase64Images((prev) => ({ ...prev, [imageName]: base64Image }));
        } catch (error) {
          console.error("Error loading image:", error);
        }
      } else {
        setBase64Images((prev) => ({ ...prev, [imageName]: storedImage }));
      }
    });
  }, []);

  const filteredCocktails = mockCocktails
    .filter((cocktail) => {
      const matchesStyle = filter ? cocktail.style === filter : true;
      const matchesComplexity = complexity
        ? cocktail.complexityLevel === complexity
        : true;
      return matchesStyle && matchesComplexity;
    })
    .sort((a, b) => {
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

        <button onClick={toggleSortOrder} className={styles.sortButton}>
          <FontAwesomeIcon
            icon={sortOrder === "asc" ? faSortAlphaAsc : faSortAlphaDesc}
          />
        </button>
      </div>

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
                  src={
                    base64Images[cocktail.imageName] ||
                    require(`../../assets/images/${cocktail.imageName}`)
                  }
                  alt={cocktail.name}
                />
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
