import recipeService from "./recipeService";
export const handleChange = (e, recipe, setRecipe, index) => {
  const { name, value } = e.target;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  if (index !== undefined) {
    const newIngredients = [...recipe.ingredients];
    if (name === "name") {
      newIngredients[index][name] = capitalizeFirstLetter(value);
    } else {
      newIngredients[index][name] = value;
    }
    setRecipe({ ...recipe, ingredients: newIngredients });
  } else {
    if (name === "name") {
      setRecipe({ ...recipe, [name]: capitalizeFirstLetter(value) });
    } else {
      setRecipe({ ...recipe, [name]: value });
    }
  }
};

export const handleAddIngredient = (recipe, setRecipe) => {
  setRecipe({
    ...recipe,
    ingredients: [
      ...recipe.ingredients,
      { name: "", quantity: "", id: Date.now() },
    ],
  });
};

export const handleRemove = (index, recipe, setRecipe) => {
  const updatedIngredients = recipe.ingredients.filter((_, i) => i !== index);
  setRecipe({ ...recipe, ingredients: updatedIngredients });
};

export const handleSubmit = async (e, recipe, setRecipe, navigate) => {
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

    // Construct the image name based on recipe ID
    const imageName = `recipe_${recipe.id}_image`;

    // Check if the image exists in localStorage
    const imgData = localStorage.getItem(imageName);
    const smallPictureName = imgData ? imageName : "placeholder_small.png";

    // Save the recipe using the image name or fallback placeholder
    await recipeService.saveRecipe({
      ...recipe,
      date: formattedDate,
      smallPicture: smallPictureName,
    });

    // Reset recipe state after saving
    setRecipe({
      id: Date.now().toString(),
      name: "",
      cocktailStyle: "",
      complexityLevel: "",
      glassType: "",
      ingredients: [{ name: "", quantity: "", id: Date.now() }],
      recipe: "",
      alcoholValue: 0,
      price: "",
      date: "",
      description: "",
      smallPicture: "", // Reset to empty for a new recipe
    });
  } catch (error) {
    console.error("Error saving recipe:", error);
  }

  navigate("/whereto", { state: { key: recipe.id } });
};
