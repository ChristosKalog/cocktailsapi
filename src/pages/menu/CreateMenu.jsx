import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cocktailsData from "../../data/db.json";
import menuService from "../../services/menuService"; // Import your menu service
import styles from "../../styles/CreateMenu.module.css";

const CreateMenu = () => {
  const [title, setTitle] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [selectedCocktails, setSelectedCocktails] = useState([]);
  const navigate = useNavigate();

  const handleCocktailSelect = (cocktailId) => {
    setSelectedCocktails((prevSelected) =>
      prevSelected.includes(cocktailId)
        ? prevSelected.filter((id) => id !== cocktailId)
        : [...prevSelected, cocktailId]
    );
  };

  const handleSaveMenu = async () => {
    if (title.trim() === "" || selectedCocktails.length < 3) {
      alert("Please enter a title and select at least 3 cocktails.");
      return;
    }

    const newMenu = {
      title,
      cocktails: cocktailsData.savedCocktails.filter((cocktail) =>
        selectedCocktails.includes(cocktail.id)
      ),
    };

    try {
      const savedMenu = await menuService.createMenu(newMenu);
      console.log("Saved Menu:", savedMenu);
      setIsSaved(true);
    } catch (error) {
      console.error("Error saving menu:", error);
      alert("There was an error saving your menu. Please try again."); // Optional: Display user-friendly message
    }
  };

  const handleViewMenu = () => {
    const menus = JSON.parse(localStorage.getItem("menus")) || [];
    const latestMenu = menus[menus.length - 1]; // Get the latest saved menu
    navigate(`/viewmenu/${latestMenu.id}`);
  };

  const handleCreateAnother = () => {
    setIsSaved(false);
    setTitle("");
    setSelectedCocktails([]);
  };

  return (
    <div className={styles.createMenu}>
      <h1>Create a Menu</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Menu Title"
        required
        className={styles.inputField}
      />

      <h3>Select Cocktails</h3>
      <div className={styles.mobileWrapper}>
        <div className={styles.cocktailSelection}>
          {cocktailsData.savedCocktails.map((cocktail) => (
            <label key={cocktail.id} className={styles.cocktailLabel}>
              <input
                type="checkbox"
                value={cocktail.id}
                checked={selectedCocktails.includes(cocktail.id)}
                onChange={() => handleCocktailSelect(cocktail.id)}
              />
              {cocktail.name} - ${cocktail.price}
            </label>
          ))}
        </div>
      </div>

      {!isSaved ? (
        <button onClick={handleSaveMenu} className={styles.saveButton}>
          Save Menu
        </button>
      ) : (
        <div className={styles.menuOptions}>
          <button onClick={handleViewMenu} className={styles.viewButton}>
            View Menu
          </button>
          <button
            onClick={handleCreateAnother}
            className={styles.createAnotherButton}
          >
            Create Another
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateMenu;
