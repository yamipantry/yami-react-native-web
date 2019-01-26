const Sequelize = require('sequelize')
const db = require('../db')
const {hash} = require('../../../util')

const Recipes = db.define('recipes', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  ingredientsIds: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },
  instructions: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = Recipes
