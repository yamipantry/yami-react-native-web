const router = require('express').Router()
const {Recipes, User, Items, Ingredients} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const person = await User.findById(1, {
      attributes: ['pantryItems']
    })
    const persArr = person.dataValues.pantryItems
    let result = []
    let resRecipe = []
    const recipe = await Recipes.findAll()
    for (let i = 0; i < persArr.length; i++) {
      let len = recipe[i].ingredientsIds.filter(x => !persArr.includes(x))
      if (len.length <= 2) {
        result.push({recipe: recipe[i].id, needed: len})
      }
    }
    for (let k = 0; k < result.length; k++) {
      const rec = await Recipes.findById(result[k].recipe)
      resRecipe.push({recipe: rec, needed: result[k].needed})
    }
    res.json(resRecipe)
  } catch (err) {
    next(err)
  }
})

module.exports = router
