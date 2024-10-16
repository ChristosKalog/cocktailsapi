// menuService.js
const API_URL = 'http://localhost:5001/savedMenus';

// Create a new menu
const createMenu = async (menuData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(menuData),
    });

    if (!response.ok) {
      throw new Error('Failed to create the menu');
    }

    return await response.json(); // Return the created menu
  } catch (error) {
    console.error('Error creating menu:', error);
    throw error;
  }
};

// Fetch all menus
const fetchMenus = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch menus');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching menus:', error);
    throw error;
  }
};

// Update an existing menu (assuming each menu has an id)
const updateMenu = async (menuId, menuData) => {
  try {
    const response = await fetch(`${API_URL}/${menuId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(menuData),
    });

    if (!response.ok) {
      throw new Error('Failed to update the menu');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating menu:', error);
    throw error;
  }
};

// Delete a menu
const deleteMenu = async (menuId) => {
  try {
    const response = await fetch(`${API_URL}/${menuId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete the menu');
    }
  } catch (error) {
    console.error('Error deleting menu:', error);
    throw error;
  }
};

export default {
  createMenu,
  fetchMenus,
  updateMenu,
  deleteMenu,
};
