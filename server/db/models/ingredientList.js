const Sequelize = require('sequelize')
const db = require('../db')

// OB/MS: file name change

const Items = db.define('items', {
  amount: {
    type: Sequelize.STRING
  }
})

module.exports = Items
