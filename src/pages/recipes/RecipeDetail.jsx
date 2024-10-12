import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import mockCocktails from "../../data/mockCocktails"; // Import mock cocktail data
import styles from "../../styles/recipedetail.module.css"; // Import CSS module for styling
import placeholderImage1 from "../../assets/images/placeholder1.png";
import placeholderImage2 from "../../assets/images/placeholder2.png";
import placeholderImage3 from "../../assets/images/placeholder3.png";
import placeholderImage4 from "../../assets/images/placeholder4.png";
import placeholderImage5 from "../../assets/images/placeholder5.png";

const RecipeDetail = () => {
  const { id } = useParams();
  const cocktail = mockCocktails.find((cocktail) => cocktail.id === Number(id));

  const [mainImage, setMainImage] = useState(placeholderImage1); // State to hold the main image

  // Example images for the carousel
  const images = [
    { id: 1, src: placeholderImage1, alt: "Pic 1" },
    { id: 2, src: placeholderImage2, alt: "Pic 2" },
    { id: 3, src: placeholderImage3, alt: "Pic 3" },
    { id: 4, src: placeholderImage4, alt: "Pic 4" },
    { id: 5, src: placeholderImage5, alt: "Pic 5" },
  ];

  if (!cocktail) {
    return <div className={styles.error}>Cocktail not found!</div>;
  }

  return (<>
 
    <div className={styles.recipeDetail}>
      <div className={styles.leftContainer}>
        <div className={styles.imageContainer}>
          <img src={mainImage} className={styles.image} alt={cocktail.name} />
        </div>

        <div className={styles.carousel}>
          {images.map((image) => (
            <img
              key={image.id}
              src={image.src}
              alt={image.alt}
              className={`${styles.carouselImage} ${
                image.src === mainImage ? styles.carouselImageActive : ""
              }`}
              onClick={() => setMainImage(image.src)} // Change main image on click
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
                  cocktail.complexityLevel === "Easy" ||
                  cocktail.complexityLevel === "Medium" ||
                  cocktail.complexityLevel === "Hard"
                    ? styles.barActive
                    : ""
                }`}
              ></div>
              <div
                className={`${styles.bar} ${
                  cocktail.complexityLevel === "Medium" ||
                  cocktail.complexityLevel === "Hard"
                    ? styles.barActive
                    : ""
                }`}
              ></div>
              <div
                className={`${styles.bar} ${
                  cocktail.complexityLevel === "Hard" ? styles.barActive : ""
                }`}
              ></div>
            </div>
          </div>
          <div>
            <h2>Style: {cocktail.style}</h2>
          </div>
        </div>
        <h4>Ingredients:</h4>
        <div className={styles.ingredientsContainer}>
          {cocktail.ingredients.map((ingredient, index) => (
            <div className={styles.ingredient} key={index}>
              {ingredient}
            </div>
          ))}
        </div>
        <h4>Recipe:</h4>
        <div className={styles.recipeContainer}>
          <p>{cocktail.recipe}</p>
        </div>
      </div>
    
    </div>
      <div className={styles.goBackContainer}>
      <Link to="/recipes" className={styles.goBackLink}>Go Back</Link>
    </div>
    </>
  );
};

export default RecipeDetail;
