const router = require('express').Router()
const {Bookmarks, Recipes} = require('../db/models')

router.put('/', async (req, res, next) => {
  try {
    const rank = req.body.rank + ''
    const updated = await Bookmarks.update(
      {
        rank: rank
      },
      {
        where: {
          recipeId: req.body.id,
          userId: req.user.id
        },
        returning: true,
        plain: true
      }
    )
    console.log(updated)
    res.json(updated[1])
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const bookmarks = await Bookmarks.findAll({
      where: {
        userId: req.query.userId
      },
      include: [{model: Recipes}]
    })
    res.json(bookmarks)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const bookmark = await Bookmarks.findOrCreate({
      where: {
        recipeId: req.body.recipeId,
        userId: req.user.id
      }
    })
    res.status(201).json(bookmark)
  } catch (err) {
    next(err)
  }
})

module.exports = router
