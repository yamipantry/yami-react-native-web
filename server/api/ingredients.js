const router = require('express').Router()
const {Ingredients, User, Recipes, Items} = require('../db/models')
const Sequelize = require('sequelize')

router.get('/', async (req, res, next) => {
  try {
    const Op = Sequelize.Op
    const suggestions = await Ingredients.findAll({
      where: {
        name: {
          [Op.like]: req.query.name + '%'
        }
      },
      limit: 10
    })
    res.json(suggestions)
  } catch (err) {
    next(err)
  }
})

//work in progress
router.get('/ings', async (req, res, next) => {
  try {
    const Op = Sequelize.Op
    const {pantryItems} = await User.findById(3, {
      attributes: ['pantryItems']
    })
    let result = []
    const recipes = await Recipes.findAll({
      include: [
        {
          model: Items,
          as: 'ingredientsIncluded',
          where: {
            ingredientName: {
              [Op.like]: {[Op.any]: pantryItems}
            }
          }
        }
      ]
    })
    for (let i = 0; i < recipes.length; i++) {
      const floor = Math.floor(
        recipes[i].ingredientsIncluded.length / pantryItems.length * 100
      )
      if (floor > 60) {
        result.push(recipes[i])
      }
    }
    res.json(result)
  } catch (err) {
    next(err)
  }
})

module.exports = router
