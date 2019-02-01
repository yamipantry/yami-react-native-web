const router = require('express').Router()
const {Ingredients} = require('../db/models')
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

module.exports = router
