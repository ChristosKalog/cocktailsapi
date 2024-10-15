
import React, { useState } from "react";

const AddRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    style: "",
    complexityLevel: "",
    ingredients: "",
    recipe: ""
  });

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...recipe,
          ingredients: recipe.ingredients.split(",") // Split ingredients by commas
        })
      });

      if (response.ok) {
        console.log("Recipe created successfully!");
        setRecipe({
          name: "",
          style: "",
          complexityLevel: "",
          ingredients: "",
          recipe: ""
        });
      }
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={recipe.name}
        onChange={handleChange}
        placeholder="Recipe Name"
      />
      <input
        type="text"
        name="style"
        value={recipe.style}
        onChange={handleChange}
        placeholder="Style"
      />
      <input
        type="text"
        name="complexityLevel"
        value={recipe.complexityLevel}
        onChange={handleChange}
        placeholder="Complexity Level"
      />
      <input
        type="text"
        name="ingredients"
        value={recipe.ingredients}
        onChange={handleChange}
        placeholder="Ingredients (comma-separated)"
      />
      <textarea
        name="recipe"
        value={recipe.recipe}
        onChange={handleChange}
        placeholder="Recipe Instructions"
      />
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default AddRecipe;
