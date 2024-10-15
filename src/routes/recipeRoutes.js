// routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Add a new recipe
router.post('/recipes', (req, res) => {
  const { name, style, complexityLevel, ingredients, recipe } = req.body;

  try {
    // Get the current list of cocktails
    const cocktails = db.getData('/cocktails') || [];
    // Add new recipe with a unique ID
    const newCocktail = {
      id: cocktails.length ? cocktails[cocktails.length - 1].id + 1 : 1,
      name,
      style,
      complexityLevel,
      ingredients,
      recipe,
    };
    cocktails.push(newCocktail);
    // Save the new cocktail in the database
    db.push('/cocktails', cocktails);
    
    res.status(201).json({ message: 'Recipe added successfully', cocktail: newCocktail });
  } catch (error) {
    res.status(500).json({ message: 'Error adding recipe', error });
  }
});

module.exports = router;
