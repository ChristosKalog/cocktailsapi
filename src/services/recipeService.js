import axios from 'axios';


const API_URL = 'http://localhost:5000/savedCocktails';


const saveRecipe = async (recipe) => {
  try {
    const response = await axios.post(API_URL, recipe);
    console.log('Recipe saved successfully!', response.data);
    return response.data; // You can return the saved recipe or an ID for further actions
  } catch (error) {
    console.error('Error saving recipe:', error);
    throw error; // Handle the error accordingly in your component
  }
};

const getAllRecipes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error retrieving recipes:', error);
    return [];
  }
};

export { saveRecipe, getAllRecipes };