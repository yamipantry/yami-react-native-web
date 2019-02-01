const router = require('express').Router()
const {User} = require('../db/models')

module.exports = router

//  /api/pantry

router.put('/:method', async (req, res, next) => {
  try {
    const updated = await User.modifyIngredients(
      req.user.id,
      req.body.item,
      req.params.method
    )
    res.json(updated[1])
  } catch (err) {
    next(err)
  }
})
