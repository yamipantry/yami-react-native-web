const router = require('express').Router()
const {Recipes, User, Items, Ingredients} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const recipes = await Recipes.findMatchingRecipesWithIngredients(
      req.user.id
    )
    res.json(recipes)
  } catch (err) {
    next(err)
  }
})

router.get('/:recipeId', async (req, res, next) => {
  try {
    const recipe = await Recipes.findById(req.params.recipeId, {
      include: [{model: Items, as: 'ingredientsIncluded'}]
    })
    res.json(recipe)
  } catch (err) {
    next(err)
  }
})

module.exports = router
