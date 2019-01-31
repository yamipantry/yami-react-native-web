const router = require('express').Router()
const {User} = require('../db/models')

module.exports = router

//  /api/pantry

router.put('/', async (req, res, next) => {
  try {
    const added = await User.modifyIngredients(req.user.id, req.body, 'add')
    res.json(added)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const deleted = await User.modifyIngredients(
      req.user.id,
      req.body,
      'delete'
    )
    res.json(deleted)

    // const pantryRes = await User.findById(req.user.id)
    // let pantry = pantryRes.pantryItems
    // let ing =
    //   req.body.ingredient.charAt(0).toUpperCase() + req.body.ingredient.slice(1)

    // await User.update(
    //   {
    //     pantryItems: pantryfil
    //   },
    //   {
    //     where: {id: req.user.id},
    //     returning: true,
    //     plain: true
    //   }
    // )
  } catch (err) {
    next(err)
  }
})
