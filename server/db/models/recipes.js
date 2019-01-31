const Sequelize = require('sequelize')
const db = require('../db')
const Items = require('./ingredientList')
const User = require('./user')

const Recipes = db.define('recipes', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
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

// OB/MS: could just return the promise and ditch `async..await`
Recipes.findIngredients = async function() {
  const recipes = await this.findAll({
    include: [{model: Items, as: 'ingredientsIncluded'}]
  })
  return recipes
}

module.exports = Recipes
