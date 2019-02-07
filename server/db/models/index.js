const User = require('./user')
const Ingredients = require('./ingredients')
const Recipes = require('./recipes')
const db = require('../db')
const Items = require('./ingredientList')
const Bookmarks = require('./bookmarks')
const yamiDinners = require('./yamiDinners')
const Messages = require('./messages')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

// Items.belongsToMany(Ingredients, {through: 'items'})
Items.belongsTo(Recipes)
Recipes.hasMany(Items, {as: 'ingredientsIncluded'})
Recipes.belongsToMany(Ingredients, {through: Items})
Ingredients.belongsToMany(Recipes, {through: Items})
User.hasMany(Items)
User.belongsToMany(Recipes, {through: Bookmarks})
Bookmarks.belongsTo(Recipes)
Recipes.belongsToMany(User, {through: Bookmarks})
User.belongsToMany(User, {as: 'friends', through: 'userfriends'})
yamiDinners.belongsTo(User)
User.hasOne(yamiDinners)

const Userfriends = db.model('userfriends')

module.exports = {
  User,
  Ingredients,
  Recipes,
  Userfriends,
  Items,
  Bookmarks,
  yamiDinners,
  Messages
}
