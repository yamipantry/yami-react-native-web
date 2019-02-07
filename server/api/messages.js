const router = require('express').Router()
const {Messages} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const messages = await Messages.findAll()
    res.json(messages)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newObj = {
      yamiDinnerId: req.body.yamiDinnerId,
      userId: 1,
      ...req.body
    }
    const message = await Messages.create(newObj)
    res.json(message)
  } catch (err) {
    next(err)
  }
})

module.exports = router
