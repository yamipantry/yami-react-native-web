const router = require('express').Router()
const {Recipes, User, Items, Ingredients} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    // OB/MS: great opportunity for a function
    const userPantry = await User.findById(req.user.id, {
      // OB/MS: might help querying logic if this was an explicit join
      attributes: ['pantryItems']
    })
    const recipes = await Recipes.findIngredients()
    let result = []
    let ingredientsArr = []
    // OB/MS: don't need to go through .dataValues
    const pantry = userPantry.dataValues.pantryItems
    const recipeToAdd = recipes
    for (let i = 0; i < recipeToAdd.length; i++) {
      let len = recipeToAdd[i].ingredientsIncluded.filter(
        x => !pantry.includes(x.ingredientName)
      )
      if (len.length <= 2) {
        // OB/MS: an easier data model might be one array:
        /*
        [{
          recipe: RECIPE_HERE,
          ingredientsNeeded: INGREDIENTS_HERE
        }, {
          recipe: RECIPE_HERE,
          ingredientsNeeded: INGREDIENTS_HERE
        }]
        */
        ingredientsArr.push(len)
        result.push(recipeToAdd[i])
      }
    }
    const obj = {result, ingredientsArr}

    res.json(obj)
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
