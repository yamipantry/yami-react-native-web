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

Recipes.turnToArray = function(object, id) {
  const obj = object.split(', ')
  let result = []
  for (let i = 0; i < obj.length; i++) {
    let newObj = {}
    newObj.userId = id
    newObj.amount = obj[i]
      .split(' ')
      .slice(0, 2)
      .join(' ')
    newObj.ingredientName = obj[i]
      .split(' ')
      .slice(2)
      .join(' ')
    newObj.ingredientName =
      newObj.ingredientName.charAt(0).toUpperCase() +
      newObj.ingredientName.slice(1)
    result.push(newObj)
  }
  return result
}

Recipes.findMatchingRecipesWithIngredients = async function(id) {
  //all recipes, including their ingredients
  const recipes = await this.findAll({
    include: [{model: Items, as: 'ingredientsIncluded'}]
  })
  //finds user pantryItems by id
  const pantry = await User.findById(id, {
    attributes: ['pantryItems']
  })
  //result is an array of each matching recipe
  let result = []
  //ingredientsArr is an array of objects containing ingredients that are missing from user pantry
  let ingredientsArr = []
  //finds the attribute pantryitems
  const userPantry = pantry.pantryItems
  //mapping through all recipes
  for (let i = 0; i < recipes.length; i++) {
    /* nonMatchingIngredients will be an array of objects 'ingredientsIncluded' that have ingredientName that is not in userPantry */
    let nonMatchingIngredients = recipes[i].ingredientsIncluded.filter(
      ingredient => !userPantry.includes(ingredient.ingredientName)
    )
    //checks how long ingredients list is i.e. how many missing ingredients are in the recipe
    if (nonMatchingIngredients.length <= 2) {
      ingredientsArr.push(nonMatchingIngredients)
      result.push(recipes[i])
    }
  }
  //possible refactoring to just have ingredients instead of ingredient objects
  const obj = {result, ingredientsArr}

  return obj
}

module.exports = Recipes
