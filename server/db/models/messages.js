const Sequelize = require('sequelize')
const db = require('../db')

const Messages = db.define('messages', {
  yammiDinnerId: {
    type: Sequelize.STRING
  },
  userId: {
    type: Sequelize.INTEGER
  },

  message: {
    type: Sequelize.STRING
  }
})

module.exports = Messages
