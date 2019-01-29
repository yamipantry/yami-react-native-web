const Sequelize = require('sequelize')
const db = require('../db')

const Items = db.define('items', {
  amount: {
    type: Sequelize.STRING
  }
})

module.exports = Items
