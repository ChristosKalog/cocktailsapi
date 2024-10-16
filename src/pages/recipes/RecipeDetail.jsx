import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import cocktailsData from "../../data/db.json"; // import the whole default export
import styles from "../../styles/recipedetail.module.css";
import { deleteRecipe } from '../../services/recipeService';
import DeleteConfirmation from "../../components/ui/DeleteConfirmationComponent"; // Adjust the import path
import DeleteButton from "../../components/ui/DeleteButton"; // Import the DeleteButton component


// Static imports for images
import placeholder1 from "../../assets/images/placeholder1.png";
import placeholder2 from "../../assets/images/placeholder2.png";
import placeholder3 from "../../assets/images/placeholder3.png";
import placeholder4 from "../../assets/images/placeholder4.png";
import placeholder5 from "../../assets/images/placeholder5.png";

const RecipeDetail = () => {
  const { id } = useParams();
  const cocktail = cocktailsData.savedCocktails.find((cocktail) => cocktail.id === id);

  // Define images with static imports
  const images = [
    { id: 1, src: placeholder1, alt: "Pic 1" },
    { id: 2, src: placeholder2, alt: "Pic 2" },
    { id: 3, src: placeholder3, alt: "Pic 3" },
    { id: 4, src: placeholder4, alt: "Pic 4" },
    { id: 5, src: placeholder5, alt: "Pic 5" },
  ];

  const [mainImage, setMainImage] = useState(images[0].src); // Set the first image as default
  const [showConfirmation, setShowConfirmation] = useState(false); // State to manage confirmation dialog
  const [deletedMessage, setDeletedMessage] = useState(false); // State for deletion message

  if (!cocktail) {
    return <div className={styles.error}>Cocktail not found!</div>;
  }

  const deleteHandle = async () => {
    setShowConfirmation(true); // Show confirmation dialog
  };

  const confirmDelete = async () => {
    await deleteRecipe(id); // Call deleteRecipe function
    setDeletedMessage(true); // Show deletion message
    setShowConfirmation(false); // Close confirmation dialog

    // Redirect or perform any additional actions after deletion if needed
    setTimeout(() => {
      setDeletedMessage(false);
    }, 2000); // Remove message after 2 seconds
  };

  const cancelDelete = () => {
    setShowConfirmation(false); // Close confirmation dialog without deletion
  };

  return (
    <>
      <div className={styles.recipeDetail}>
        <div className={styles.leftContainer}>
          <div className={styles.imageContainer}>
            <img
              src={mainImage} // Use the static main image
              className={styles.image}
              alt={cocktail.name}
            />
          </div>

          <div className={styles.carousel}>
            {images.map((image) => (
              <img
                key={image.id}
                src={image.src} // Use static image source
                alt={image.alt}
                className={`${styles.carouselImage} ${
                  image.src === mainImage ? styles.carouselImageActive : ""
                }`}
                onClick={() => setMainImage(image.src)} // Update the main image on click
              />
            ))}
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.mobileTitle}>
            <h1>{cocktail.name}</h1>
          </div>
          <div className={styles.info}>
            <div className={styles.complexicityContainer}>
              <h2>Complexity:</h2>
              <div className={styles.barContainer}>
                <div
                  className={`${styles.bar} ${
                    ["easy", "medium", "hard"].includes(
                      cocktail.complexityLevel.toLowerCase()
                    )
                      ? styles.barActive
                      : ""
                  }`}
                ></div>
                <div
                  className={`${styles.bar} ${
                    ["medium", "hard"].includes(
                      cocktail.complexityLevel.toLowerCase()
                    )
                      ? styles.barActive
                      : ""
                  }`}
                ></div>
                <div
                  className={`${styles.bar} ${
                    cocktail.complexityLevel.toLowerCase() === "hard"
                      ? styles.barActive
                      : ""
                  }`}
                ></div>
              </div>
            </div>
            <div>
              <h2>Style: {cocktail.cocktailStyle}</h2>
            </div>
          </div>
          <h4>Ingredients:</h4>
          <div className={styles.ingredientsContainer}>
            {cocktail.ingredients.map((ingredient, index) => (
              <div className={styles.ingredient} key={index}>
                {ingredient.name}
              </div>
            ))}
          </div>
          <h4>Recipe:</h4>
          <div className={styles.recipeContainer}>
            <p>{cocktail.recipe}</p>
          </div>
          <DeleteButton onClick={deleteHandle}>
            Delete Recipe
          </DeleteButton>

          {/* Conditional rendering for the DeleteConfirmation dialog */}
          {showConfirmation && (
            <DeleteConfirmation
              onConfirm={confirmDelete}
              onCancel={cancelDelete}
            />
          )}
          {/* Show deletion message */}
          {deletedMessage && (
            <div className={styles.deletedMessage}>
              <p>Recipe deleted successfully!</p>
            </div>
          )}
        </div>
      </div>
      <div className={styles.goBackContainer}>
        <Link to="/recipes" className={styles.goBackLink}>
          Go Back
        </Link>
      </div>
    </>
  );
};

export default RecipeDetail;
