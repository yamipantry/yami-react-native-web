const router = require('express').Router()
const {Bookmarks} = require('../db/models')

router.post('/bookmarks', async (req, res, next) => {
  try {
    const bookmark = await Bookmarks.create({
      rank: rq.body.rank,
      userId: req.user.id,
      recipeId: req.body.recipeId
    })
    res.status(201).json(bookmark)
  } catch (err) {
    next(err)
  }
})

module.exports = router
