const Sequelize = require('sequelize')
const db = require('../db')
const {hash} = require('../../../util')

const Recipes = db.define(
  'recipes',
  {
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
      type: Sequelize.BIGINT,
      // allowNull: false
      defaultValue: 0
    }
  },
  {
    hooks: {
      beforeCreate: recipe => {
        recipe.hashOutput = hash(recipe.ingredientsIds)
      }
    }
  }
)

module.exports = Recipes
