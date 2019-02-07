const router = require('express').Router()
const {yamiDinners} = require('../db/models')
const GOOGLE_MAP_KEY = require('../../secrets')
const googleMapsClient = require('@google/maps').createClient({
  key: GOOGLE_MAP_KEY,
  Promise: Promise
})
// const Messages = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    // there is going to be some logic as to how to get yami dinners
    // close by for now well get all the yami dinners
    const allDinners = await yamiDinners.findAll()
    res.json(allDinners)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const location = await yamiDinners.geo(
      req.body.streetName,
      req.body.city,
      req.body.state,
      req.body.zip,
      googleMapsClient
    )
    const yamiDinner = await yamiDinners.create({
      ...req.body,
      lat: location.lat,
      lng: location.lng,
      userId: req.user.id
    })
    //yamiDinnerId = `${yamiDinner.lng}, ${yamiDinner.lat}, ${Date.now()}`
    //userId = req.user.id
    //messages Dammit Tom

    // const chatObj = {
    //   yamiDinnerId = `${yamiDinner.lng}, ${yamiDinner.lat}, ${Date.now()}`,
    //   userId: req.user.id,
    //   messages: 'Dammit Tom'
    // }
    // await Messages.create(chatObj)
    res.json(yamiDinner)
  } catch (err) {
    next(err)
  }
})

module.exports = router
