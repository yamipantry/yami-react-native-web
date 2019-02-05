const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/friends', require('./friends'))
router.use('/recipe', require('./recipe'))
router.use('/pantry', require('./pantry'))
router.use('/bookmarks', require('./bookmarks'))
router.use('/ingredients', require('./ingredients'))
router.use('/yamiDinners', require('./yamiDinners'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
