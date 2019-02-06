const Sequelize = require('sequelize')
const db = require('../db')

const Messages = db.define('messages', {
  yammiDinnerId: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  userId: {
    type: Sequelize.INTEGER
  },

  message: {
    type: Sequelize.STRING
  }
})

module.exports = Messages
