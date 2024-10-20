import React, { useState } from "react";
import { Link } from "react-router-dom";
import cocktailsData from "../../data/db.json";
import ButtonComponent from "../../components/ui/ButtonComponent";
import RecipeComponent from "../../components/ui/RecipeComponent"; // Import RecipeComponent
import styles from "../../styles/recipelist.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAlphaAsc,
  faSortAlphaDesc,
} from "@fortawesome/free-solid-svg-icons";

const RecipeList = () => {
  const [filter, setFilter] = useState("");
  const [complexity, setComplexity] = useState("");
  const [ingredient, setIngredient] = useState(""); // New state for ingredient filter
  const [searchTerm, setSearchTerm] = useState(""); // New state for search bar
  const [sortOrder, setSortOrder] = useState("asc");

  const clearFilters = () => {
    setFilter("");
    setComplexity("");
    setIngredient("");
    setSearchTerm(""); // Clear search bar as well
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // Filter cocktails by style, complexity, ingredient, and search term
  const filteredCocktails = cocktailsData.savedCocktails
    .filter((cocktail) => {
      const matchesStyle = filter ? cocktail.cocktailStyle === filter : true;
      const matchesComplexity = complexity
        ? cocktail.complexityLevel === complexity
        : true;
      const matchesIngredient = ingredient
        ? cocktail.ingredients.some((ing) =>
            ing.name.toLowerCase().includes(ingredient.toLowerCase())
          )
        : true;

      // Check if search term matches the name, ingredients, or other details
      const matchesSearchTerm = searchTerm
        ? cocktail.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cocktail.ingredients.some((ing) =>
            ing.name.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          cocktail.cocktailStyle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cocktail.description?.toLowerCase().includes(searchTerm.toLowerCase()) // Optional description
        : true;

      return matchesStyle && matchesComplexity && matchesIngredient && matchesSearchTerm;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  // Get unique styles, complexities, and ingredients for filter options
  const stylesOptions = [
    ...new Set(
      cocktailsData.savedCocktails.map((cocktail) => cocktail.cocktailStyle)
    ),
  ];
  const complexityOptions = [
    ...new Set(
      cocktailsData.savedCocktails.map((cocktail) => cocktail.complexityLevel)
    ),
  ];

  const ingredientOptions = [
    ...new Set(
      cocktailsData.savedCocktails.flatMap((cocktail) =>
        cocktail.ingredients.map((ing) => ing.name)
      )
    ),
  ].sort((a, b) => a.localeCompare(b)); // Sort alphabetically

  return (
    <div className={styles.recipeList}>
      <h1>Cocktail Recipes</h1>

      {/* New search bar */}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search for recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.inputField}
        />
      </div>

      <div className={styles.filters}>
        <label>
          Style:
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
          Complexity:
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

        <label>
          Ingredient:
          <select
            onChange={(e) => setIngredient(e.target.value)}
            value={ingredient}
          >
            <option value="">All</option>
            {ingredientOptions.map((ing) => (
              <option key={ing} value={ing}>
                {ing}
              </option>
            ))}
          </select>
        </label>

        <button onClick={toggleSortOrder} className={styles.sortButton}>
          <FontAwesomeIcon
            icon={sortOrder === "asc" ? faSortAlphaAsc : faSortAlphaDesc}
          />
        </button>
        <button onClick={clearFilters}>Clear Filters</button>
      </div>

      <div className={styles.recipeGrid}>
        {filteredCocktails.map((cocktail) => (
          <RecipeComponent key={cocktail.id} cocktail={cocktail} />
        ))}
      </div>

      <div className={styles.buttonContainer}>
        <ButtonComponent category="add">
          <Link to="/recipe/Add">add more</Link>
        </ButtonComponent>
      </div>
    </div>
  );
};

export default RecipeList;
