const router = require('express').Router()
const {Bookmarks} = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    const ranking = req.body.rank + ''
    const bookmark = await Bookmarks.create({
      rank: ranking,
      userId: req.user.id,
      recipeId: req.body.recipeId
    })
    res.status(201).json(bookmark)
  } catch (err) {
    next(err)
  }
})

module.exports = router
