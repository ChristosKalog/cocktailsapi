import React, { useState } from "react";
import styles from "../../styles/AddRecipe.module.css"; // Import CSS module
import rangeStyles from "../../styles/Range.module.css"; // Import CSS module
import { saveRecipe } from '../../services/recipeService';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faAdd } from "@fortawesome/free-solid-svg-icons"; // Import the download icon



const AddRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    cocktailStyle: "",
    complexityLevel: "",
    ingredients: [{ name: "", quantity: "", id: Date.now() }],
    recipe: "",
    alcoholValue: 0, // Initialize alcoholValue
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (index !== undefined) {
      const newIngredients = [...recipe.ingredients];
      newIngredients[index][name] = value;
      setRecipe({ ...recipe, ingredients: newIngredients });
    } else {
      setRecipe({ ...recipe, [name]: value });
    }
  };

  const handleAddIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [
        ...recipe.ingredients,
        { name: "", quantity: "", id: Date.now() },
      ],
    });
  };

  const handleRemove = (index) => {
    const updatedIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save the recipe to the JSON database
      saveRecipe(recipe);
      console.log("Recipe created successfully!");
      setRecipe({
        name: "",
        cocktailStyle: "",
        complexityLevel: "",
        ingredients: [{ name: "", quantity: "" }],
        recipe: "",
        alcoholValue: 0,
      });
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1>Add New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input
            type="text"
            name="name"
            value={recipe.name}
            onChange={(e) => handleChange(e)}
            placeholder="Recipe Name"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <select
            name="cocktailStyle"
            value={recipe.cocktailStyle}
            onChange={(e) => handleChange(e)}
            required
            className={styles.selectInput}
          >
            <option value="" disabled>
              Cocktail Style
            </option>
            <option value="Classic">Classic</option>
            <option value="Modern">Modern</option>
            <option value="Tropical">Tropical</option>
          </select>
          <select
            name="complexityLevel"
            value={recipe.complexityLevel}
            onChange={(e) => handleChange(e)}
            required
            className={styles.selectInput}
          >
            <option value="" disabled>
              Complexity
            </option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <div className={styles.alcoholValue}>
            <label htmlFor="alcoholValue">Alc/Vol:</label>
          </div>
          <input
            type="range"
            name="alcoholValue"
            min="0"
            max="100"
            step="5"
            value={recipe.alcoholValue}
            onChange={(e) => handleChange(e)}
            className={rangeStyles.rangeInput}
          />
          <p>{recipe.alcoholValue} %</p>
        </div>
        {recipe.ingredients.map((ingredient, index) => (
          <div className={styles.formGroup} key={ingredient.id}>
            <div className={styles.ingredients}>
              <input
                className={styles.ingredient}
                type="text"
                name="name"
                value={ingredient.name}
                onChange={(e) => handleChange(e, index)}
                placeholder="Ingredient"
                required
              />
              <input
                className={styles.ingredient}
                type="number"
                name="quantity"
                step="1"
                min="1"
                max="1500"
                value={ingredient.quantity}
                onChange={(e) => handleChange(e, index)}
                placeholder="Quantity (ml)"
              />
              {index > 0 && (
                <div
                  onClick={() => handleRemove(index)}
                  className={styles.removeIngredient}
                >
                  <FontAwesomeIcon icon={faClose} />
                </div>
              )}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddIngredient}
          className={styles.addMoreButton}
        >
          <div className={styles.addIcon}>
            <FontAwesomeIcon icon={faAdd} />
          </div>
          add more
        </button>
        <div className={styles.formGroup}>
          <textarea
            name="recipe"
            value={recipe.recipe}
            onChange={(e) => handleChange(e)}
            placeholder="Recipe Instructions"
            required
          />
        </div>

        <button className={styles.submitButton} type="submit">
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
