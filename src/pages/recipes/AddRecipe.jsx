import React, { useState } from "react";
import styles from "../../styles/AddRecipe.module.css";
import rangeStyles from "../../styles/Range.module.css";
import { saveRecipe } from "../../services/recipeService";
import ButtonComponent from "../../components/ui/ButtonComponent";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faAdd } from "@fortawesome/free-solid-svg-icons";

const AddRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    cocktailStyle: "",
    complexityLevel: "",
    ingredients: [{ name: "", quantity: "", id: Date.now() }],
    recipe: "",
    alcoholValue: 0,
    price: "",
    date: "",
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
      const currentDate = new Date();

      const formattedDate = `${String(currentDate.getHours()).padStart(
        2,
        "0"
      )}:${String(currentDate.getMinutes()).padStart(2, "0")} ${String(
        currentDate.getDate()
      ).padStart(2, "0")}/${String(currentDate.getMonth() + 1).padStart(
        2,
        "0"
      )}/${currentDate.getFullYear()}`;

      await saveRecipe({ ...recipe, date: formattedDate });
      console.log("Recipe created successfully!");

      setRecipe({
        name: "",
        cocktailStyle: "",
        complexityLevel: "",
        ingredients: [{ name: "", quantity: "" }],
        recipe: "",
        alcoholValue: 0,
        price: "",
        date: "",
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
            className={styles.textarea}
            type="text"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            placeholder="Recipe Name"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <select
            name="cocktailStyle"
            value={recipe.cocktailStyle}
            onChange={handleChange}
            required
            className={styles.selectInput}
          >
            <option value="" disabled>
              Cocktail Style
            </option>
            <option value="Classic">Classic</option>
            <option value="Modern">Modern</option>
            <option value="Tropical">Tropical</option>
            <option value="Tiki">Tiki</option>
            <option value="Sour">Sour</option>
            <option value="Highballs">Highballs</option>
          </select>
          <select
            name="complexityLevel"
            value={recipe.complexityLevel}
            onChange={handleChange}
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
          <label htmlFor="alcoholValue">Alc/Vol:</label>
          <input
            type="range"
            name="alcoholValue"
            min="0"
            max="100"
            step="5"
            value={recipe.alcoholValue}
            onChange={handleChange}
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
          <FontAwesomeIcon icon={faAdd} />
          Add More
        </button>
        <div className={styles.formGroup}>
          <label htmlFor="price">Recipe Price</label>
          <input
            className={styles.recipePrice}
            type="number"
            name="price"
            min="1"
            value={recipe.price}
            onChange={handleChange}
            placeholder="--"
            required
          />
          <span>EUR</span>
        </div>
        <div className={styles.formGroup}>
          <textarea
            className={styles.recipeArea}
            name="recipe"
            value={recipe.recipe}
            onChange={handleChange}
            placeholder="Recipe Instructions"
            required
          />
        </div>
        <ButtonComponent type="sumbit" category="save">
          Save Recipe
        </ButtonComponent>
      </form>
    </div>
  );
};

export default AddRecipe;
