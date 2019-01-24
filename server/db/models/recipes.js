const Sequelize = require('sequelize')
const db = require('../db')

const Recipes = db.define('recipes', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  ingredientsIds: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
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
  ingredientAmounts: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  hashOutput: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Recipes
