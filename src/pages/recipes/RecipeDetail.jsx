import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import mockCocktails from "../../data/mockCocktails"; 
import styles from "../../styles/recipedetail.module.css"; 

const RecipeDetail = () => {
  const { id } = useParams();
  const cocktail = mockCocktails.find((cocktail) => cocktail.id === Number(id));

  const images = [
    { id: 1, src: "placeholder1", alt: "Pic 1" },
    { id: 2, src: "placeholder2", alt: "Pic 2" },
    { id: 3, src: "placeholder3", alt: "Pic 3" },
    { id: 4, src: "placeholder4", alt: "Pic 4" },
    { id: 5, src: "placeholder5", alt: "Pic 5" },
  ];

  const [mainImage, setMainImage] = useState(images[1].src);

  const mainImageSrc = require(`../../assets/images/${mainImage}.png`);
  console.log(mainImageSrc)

  if (!cocktail) {
    return <div className={styles.error}>Cocktail not found!</div>;
  }

  return (
    <>
      <div className={styles.recipeDetail}>
        <div className={styles.leftContainer}>
          <div className={styles.imageContainer}>
            <img
              src={mainImageSrc} // Use the dynamic src
              className={styles.image}
              alt={cocktail.name}
            />
          </div>

          <div className={styles.carousel}>
            {images.map((image) => (
              <img
                key={image.id}
                src={require(`../../assets/images/${image.src}.png`)} // Dynamically load each carousel image
                alt={image.alt}
                className={`${styles.carouselImage} ${
                  image.src === mainImage ? styles.carouselImageActive : ""
                }`}
                onClick={() => setMainImage(image.src)}  // Update the main image on click
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
        <Link to="/recipes" className={styles.goBackLink}>
          Go Back
        </Link>
      </div>
    </>
  );
};

export default RecipeDetail;
