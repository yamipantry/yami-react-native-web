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

router.post('/', async (req, res, next) => {
  try {
    let ingredients = await Recipes.turnToArray(
      req.body.ingredientsIncluded,
      req.user.id
    )
    req.body.ingredientsIncluded = ingredients
    const obj = {...req.body}
    const recipe = await Recipes.create(obj, {
      include: [{model: Items, as: 'ingredientsIncluded'}, {model: User}]
    })
    res.json(recipe)
  } catch (err) {
    next(err)
  }
})

module.exports = router
