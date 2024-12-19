import React, { useState, useRef } from "react";
import styles from "../../styles/AddRecipe.module.css";
import rangeStyles from "../../styles/Range.module.css";
import ButtonComponent from "../../components/ui/ButtonComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faAdd } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {
  handleChange,
  handleAddIngredient,
  handleRemove,
  handleSubmit,
} from "../../services/recipeFormService";
import ReactCropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const AddRecipe = () => {
  const [recipe, setRecipe] = useState({
    id: Date.now().toString(),
    name: "",
    description: "This is description",
    date: "",
    cocktailStyle: "",
    complexityLevel: "",
    glassType: "",
    recipe: "",
    alcoholValue: 0,
    price: "",
    ingredients: [{ name: "", quantity: "", id: Date.now() }],
    smallPicture: "",
  });

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isCropped, setIsCropped] = useState(false); // Track whether the image has been cropped
  const [hasImage, setHasImage] = useState(false); // Track whether the image has been cropped
  const cropperRef = useRef(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setHasImage(true);
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl); // Set image for cropping
      setImageUrl(imageUrl); // Store the original image URL
      setIsCropped(false); // Reset cropped status
    }
  };

  const handleCrop = () => {
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current?.cropper.getCroppedCanvas({
        width: 400,
        height: 400,
      });

      // Convert canvas to Base64
      const croppedImage = croppedCanvas.toDataURL();

      // Use a fixed localStorage key for the recipe's image
      const imageName = `recipe_${recipe.id}_image`; // Unique per recipe ID
      try {
        localStorage.setItem(imageName, croppedImage); // Overwrite existing storage item
        setRecipe({
          ...recipe,
          smallPicture: imageName, // Save the same key in recipe state
        });
        setIsCropped(true);
      } catch (error) {
        if (error.name === "QuotaExceededError") {
          alert(
            "LocalStorage quota exceeded. Consider clearing space or using a smaller image."
          );
          console.error(
            "QuotaExceededError: Could not save image in localStorage.",
            error
          );
        }
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1>Add New Recipe</h1>
      <form onSubmit={(e) => handleSubmit(e, recipe, setRecipe, navigate)}>
        <div className={styles.formGroup}>
          <input
            className={styles.textarea}
            type="text"
            name="name"
            value={recipe.name}
            onChange={(e) => handleChange(e, recipe, setRecipe)}
            placeholder="Recipe Name"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <select
            name="cocktailStyle"
            value={recipe.cocktailStyle}
            onChange={(e) => handleChange(e, recipe, setRecipe)}
            required
            className={styles.selectInput}
          >
            <option value="" disabled>
              Style
            </option>
            <option value="Classic">Classic</option>
            <option value="Modern">Modern</option>
            <option value="Tropical">Tropical</option>
            <option value="Tiki">Tiki</option>
            <option value="Sour">Sour</option>
            <option value="Highballs">Highballs</option>
          </select>
          <select
            name="complexityLevel"
            value={recipe.complexityLevel}
            onChange={(e) => handleChange(e, recipe, setRecipe)}
            required
            className={styles.selectInput}
          >
            <option value="" disabled>
              Complexity
            </option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select
            name="glassType"
            value={recipe.glassType}
            onChange={(e) => handleChange(e, recipe, setRecipe)}
            required
            className={styles.selectInput}
          >
            <option value="" disabled>
              Glass Type
            </option>
            <option value="Martini">Martini</option>
            <option value="Highball">Highball</option>
            <option value="Old Fashioned">Old Fashioned</option>
            <option value="Coupe">Coupe</option>
            <option value="Wine Glass">Wine Glass</option>
            <option value="Shot Glass">Shot Glass</option>
            <option value="Collins">Collins</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="alcoholValue">Alc/Vol:</label>
          <input
            type="range"
            name="alcoholValue"
            min="0"
            max="100"
            step="5"
            value={recipe.alcoholValue}
            onChange={(e) => handleChange(e, recipe, setRecipe)}
            className={rangeStyles.rangeInput}
          />
          <p>{recipe.alcoholValue} %</p>
        </div>
        {recipe.ingredients.map((ingredient, index) => (
          <div className={styles.formGroup} key={ingredient.id}>
            <div className={styles.ingredients}>
              <input
                className={styles.ingredient}
                type="text"
                name="name"
                value={ingredient.name}
                onChange={(e) => handleChange(e, recipe, setRecipe, index)}
                placeholder="Ingredient"
                required
                list="suggestions"
              />
              <input
                className={styles.ingredient}
                type="number"
                name="quantity"
                step="1"
                min="1"
                max="1500"
                value={ingredient.quantity}
                onChange={(e) => handleChange(e, recipe, setRecipe, index)}
                placeholder="Quantity (ml)"
              />
              {index > 0 && (
                <div
                  onClick={() => handleRemove(index, recipe, setRecipe)}
                  className={styles.removeIngredient}
                >
                  <FontAwesomeIcon icon={faClose} />
                </div>
              )}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => handleAddIngredient(recipe, setRecipe)}
          className={styles.addMoreButton}
        >
          <FontAwesomeIcon icon={faAdd} />
          <p>Add More</p>
        </button>

        {/* Recipe Price input */}
        <div className={styles.formGroup}>
          <label htmlFor="price">Recipe Price</label>
          <input
            className={styles.recipePrice}
            type="number"
            name="price"
            min="1"
            value={recipe.price}
            onChange={(e) => handleChange(e, recipe, setRecipe)}
            placeholder="--"
            required
          />
          <span>EUR</span>
        </div>

        <div className={styles.formGroup}>
          <textarea
            className={styles.recipeArea}
            name="recipe"
            value={recipe.recipe}
            onChange={(e) => handleChange(e, recipe, setRecipe)}
            placeholder="Recipe Instructions"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="imageUpload">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="imageUpload"
          />
        </div>

        {image && (
          <div className={styles.flexer}>
            <ReactCropper
              src={image}
              background={true}
              style={{ width: "100%", height: "400px" }}
              initialAspectRatio={1}
              aspectRatio={1}
              ref={cropperRef}
              viewMode={2}
              center={true}
              highlight={true}
              crop={() => setIsCropped(false)} // Reset crop state when the crop region changes
            />
            <button
              className={
                isCropped
                  ? `${styles.cropped} ${styles.cropButton}`
                  : styles.cropButton
              }
              type="button"
              onClick={handleCrop}
            >
              {isCropped ? "Cropped!" : "Crop"}
            </button>
          </div>
        )}

        <ButtonComponent
          type="submit"
          category="save"
          disabled={!isCropped} // Disable the save button if the image is not cropped
        >
          Save Recipe
        </ButtonComponent>
      </form>
    </div>
  );
};

export default AddRecipe;
