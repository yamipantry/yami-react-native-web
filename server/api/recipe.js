const router = require('express').Router()
const {Recipes, User, Items, Ingredients} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const userPantry = await User.findById(req.user.id, {
      attributes: ['pantryItems']
    })
    const recipes = await Recipes.findIngredients()
    const obj = {userPantry, recipes}
    res.json(obj)
  } catch (err) {
    next(err)
  }
})

module.exports = router
