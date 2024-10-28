import React, { useState } from "react";
import cocktailsData from "../../data/db.json";
import menuService from "../../services/menuService";
import styles from "../../styles/CreateMenu.module.css";
import ButtonComponent from "../../components/ui/ButtonComponent";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons"; // Import the download icon
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"; // Import the download icon

const CreateMenu = () => {
  const [title, setTitle] = useState("");
  const [selectedCocktails, setSelectedCocktails] = useState([]);
  const navigate = useNavigate();

  const resetSelection = () => {
    setSelectedCocktails([]);
  };

  const handleCocktailSelect = (cocktailId) => {
    setSelectedCocktails((prevSelected) => {
      const isSelected = prevSelected.some((c) => c.id === cocktailId);
      if (isSelected) {
        return prevSelected.filter((c) => c.id !== cocktailId);
      } else {
        return [
          ...prevSelected,
          { id: cocktailId, order: prevSelected.length },
        ];
      }
    });
  };

  const moveCocktail = (index, direction) => {
    setSelectedCocktails((prevSelected) => {
      const newSelected = [...prevSelected];
      const [movedCocktail] = newSelected.splice(index, 1);
      newSelected.splice(index + direction, 0, movedCocktail);
      return newSelected.map((c, i) => ({ ...c, order: i })); // Recalculate order
    });
  };

  const handleSaveMenu = async () => {
    if (title.trim() === "" || selectedCocktails.length < 3) {
      alert("Please enter a title and select at least 3 cocktails.");
      return;
    }

    const newMenu = {
      title,
      cocktailIds: selectedCocktails.map((c) => c.id),
      dateCreated: new Date().toISOString(),
    };

    try {
      const savedMenu = await menuService.createMenu(newMenu);
    } catch (error) {
      console.error("Error saving menu:", error);
      alert("There was an error saving your menu. Please try again.");
    }
    navigate("/", { state: { status: "Menu was created" } });
  };

  return (
    <div className={styles.createMenu}>
      <h1>Create Menu</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Menu Title"
        required
        className={styles.inputField}
      />
      <div className={styles.columnsContainer}>
        <div className={styles.mobileWrapper}>
          <div className={styles.cocktailSelection}>
            {cocktailsData.savedCocktails.map((cocktail) => (
              <label
                key={cocktail.id}
                className={`${styles.cocktailLabel} ${
                  selectedCocktails.some((c) => c.id === cocktail.id)
                    ? styles.selectedCocktail
                    : ""
                }`}
                onClick={() => handleCocktailSelect(cocktail.id)}
              >
                <input
                  type="checkbox"
                  value={cocktail.id}
                  checked={selectedCocktails.some((c) => c.id === cocktail.id)}
                  onChange={() => handleCocktailSelect(cocktail.id)}
                  className={styles.cocktailCheckbox}
                />
                <div className={styles.cocktailInfo}>
                  <span>{cocktail.name}</span>
                  <span>${cocktail.price}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.selectedCocktails}>
          {selectedCocktails.map((cocktail, index) => (
            <div key={cocktail.id} className={styles.selectedCocktailItem}>
              <span>
                {
                  cocktailsData.savedCocktails.find((c) => c.id === cocktail.id)
                    .name
                }
              </span>
              <div className={styles.buttonsOrder}>
                <button
                  className={styles.orderButton}
                  onClick={() => moveCocktail(index, -1)}
                  disabled={index === 0}
                >
                  <FontAwesomeIcon icon={faArrowUp} />
                </button>
                <button
                  className={styles.orderButton}
                  onClick={() => moveCocktail(index, 1)}
                  disabled={index === selectedCocktails.length - 1}
                >
                  <FontAwesomeIcon icon={faArrowDown} />
                </button>
              </div>
            </div>
          ))}
          {selectedCocktails.length > 0 && (
            <h3>Selected Cocktails ({selectedCocktails.length})</h3>
          )}
        </div>
      </div>
      <>
        <div className={styles.buttonsContainer}>
          <ButtonComponent onClick={resetSelection} category="reset">
            Reset Menu
          </ButtonComponent>
          <ButtonComponent onClick={handleSaveMenu} category="save">
            Save Menu
          </ButtonComponent>
        </div>
      </>
    </div>
  );
};

export default CreateMenu;
