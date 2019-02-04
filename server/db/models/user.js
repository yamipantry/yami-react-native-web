const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  userName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  streetName: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  zip: {
    type: Sequelize.STRING
  },
  pantryItems: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  },
  profileImage: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

User.modifyIngredients = async function(id, ingredient, method) {
  //finds user by id
  // const pantryRes = await User.findById(req.user.id)
  //finds users pantry
  // let pantry = pantryRes.pantryItems

  //req.body === 'coffee'
  let {pantryItems} = await this.findById(id, {
    attributes: ['pantryItems']
  })
  //capitalizes first letter
  // 'Coffee' if pantryItems includes 'Coffee'
  if (method === 'add') {
    let ing = ingredient.charAt(0).toUpperCase() + ingredient.slice(1)
    if (pantryItems.includes(ing) || pantryItems.includes(`${ing}s`)) {
      pantryItems = [...pantryItems]
    } else {
      pantryItems = [...pantryItems, ing]
    }
  } else if (method === 'deleted') {
    pantryItems = [
      ...pantryItems.filter(function(value) {
        return value !== ingredient
      })
    ]
  }
  const updated = await this.update(
    {
      pantryItems: pantryItems
    },
    {
      where: {id: id},
      returning: true,
      plain: true
    }
  )
  return updated
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
