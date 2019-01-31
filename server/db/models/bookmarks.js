const Sequelize = require('sequelize')
const db = require('../db')

const Bookmarks = db.define('bookmarks', {
  rank: {
    type: Sequelize.ENUM('1', '2', '3', '4', '5')
  }
})

module.exports = Bookmarks
