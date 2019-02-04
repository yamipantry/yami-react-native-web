const Sequelize = require('sequelize')
const db = require('../db')
// not adding this but there appears to be a geometry data type for
// postgres will need to research this later
const yamiDinners = db.define('yamiDinners', {
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  streetName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  zip: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lat: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lng: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  expir: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

yamiDinners.geo = async function(
  streetName,
  city,
  state,
  zip,
  googleMapsClient
) {
  const oldLocation = await this.findOne({
    where: {
      streetName: streetName,
      city: city,
      state: state,
      zip: zip
    },
    attributes: ['lat', 'lng']
  })
  if (oldLocation) {
    return {
      lat: oldLocation.lat,
      lng: oldLocation.lng
    }
  } else {
    const location = await googleMapsClient
      .geocode({
        address: `${streetName}, ${city}, ${state} ${zip}`
      })
      .asPromise()
    return location.json.results[0].geometry.location
  }
}

module.exports = yamiDinners
