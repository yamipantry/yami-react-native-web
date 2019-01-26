const Sequelize = require('sequelize')
const db = require('../db')

const Ingredients = db.define('ingredients', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Ingredients
