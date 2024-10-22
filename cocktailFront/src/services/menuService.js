import axios from 'axios';
const API_URL = "http://localhost:5001/savedMenus"; 

const createMenu = async (createMenu) => {
  try {
    const response = await axios.post(API_URL, createMenu);
    console.log("Recipe saved successfully!", response.data);
    return response.data;
  } catch (error) {
    console.error("Error saving recipe:", error);
    throw error;
  }
};

const fetchMenus = async () => {
  try {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
      throw new Error("Failed to fetch menus");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching menus:", error);
    throw error;
  }
};

export default { createMenu,  fetchMenus};
