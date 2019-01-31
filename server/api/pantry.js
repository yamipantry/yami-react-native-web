const router = require('express').Router()
const {User} = require('../db/models')

module.exports = router

// OB/MS: in RESTful conventions "add" / "create" / "delete" should not appear in the URL, the URL identifies the resource, the VERB identifies the necessary action
router.put('/add', async (req, res, next) => {
  try {
    const pantryRes = await User.findById(req.user.id)
    let pantry = pantryRes.pantryItems
    let ing =
      req.body.ingredient.charAt(0).toUpperCase() + req.body.ingredient.slice(1)
    if (pantry.includes(req.body.ingredient) === true) {
      if (ing.endsWith('s') !== true) {
        res.send(`${ing} already exists in your pantry.`)
      } else {
        res.send(`${ing} already exist in your pantry.`)
      }
    } else {
      pantry.push(req.body.ingredient)
      await User.update(
        {
          pantryItems: pantry
        },
        {
          where: {id: req.user.id},
          returning: true,
          plain: true
        }
      )

      res.send(`Added '${ing}' to your pantry.`)
    }
  } catch (err) {
    next(err)
  }
})

// OB/MS: if you change to DELETE route (instead of PUT) you can't use the request body anymore
router.put('/delete', async (req, res, next) => {
  try {
    // OB/MS: could also be a function
    const pantryRes = await User.findById(req.user.id)
    let pantry = pantryRes.pantryItems
    let ing =
      req.body.ingredient.charAt(0).toUpperCase() + req.body.ingredient.slice(1)
    let pantryfil = pantry.filter(function(value) {
      return value !== req.body.ingredient
    })
    await User.update(
      {
        pantryItems: pantryfil
      },
      {
        where: {id: req.user.id},
        returning: true,
        plain: true
      }
    )

    res.send(`Removed '${ing}' from your pantry.`)
  } catch (err) {
    next(err)
  }
})
