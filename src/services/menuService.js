
import axios from 'axios';

const API_URL = "http://localhost:5001/savedMenus"; // Check if this matches your backend API

// Function to create a menu via POST request

const createMenu = async (createMenu) => {
  try {
    const response = await axios.post(API_URL, createMenu);
    console.log("Recipe saved successfully!", response.data);
    return response.data; // You can return the saved recipe or an ID for further actions
  } catch (error) {
    console.error("Error saving recipe:", error);
    throw error; // Handle the error accordingly in your component
  }
};
// const createMenu = async (createMenu) => {
//   try {
//     const response = await fetch(`${API_URL}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(menuData),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to create the menu');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error creating menu:', error);
//     throw error; // Rethrow the error so it can be caught in the component
//   }
// };

// Function to fetch all menus via GET request
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

export default {
  createMenu,
  fetchMenus,
};
