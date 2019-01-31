const router = require('express').Router()
const {User, Ingredients} = require('../db/models')
const Sequelize = require('sequelize')

module.exports = router

router.get('/', async (req, res, next) => {
  // makes sure no one can get id or email of user that is not logged in
  // by just going to /api/users/1
  if (!req.user && process.env.NODE_ENV !== 'test') {
    res.status(401).send('Sorry Not Logged In')
  } else {
    try {
      const users = await User.findAll({
        // explicitly select only the id, email, and pantryItems fields
        attributes: ['id', 'email']
      })
      res.json(users)
    } catch (err) {
      next(err)
    }
  }
})

// OB/MS: dead code
router.get('/testSQL', async (req, res, next) => {
  const Op = Sequelize.Op
  const suggestions = await Ingredients.findAll({
    where: {
      name: {
        [Op.like]: req.query.name + '%'
      }
    },
    limit: 5
  })
  res.json(suggestions)
})

router.put('/:userId', async (req, res, next) => {
  // if (/*!req.user &&*/ process.env.NODE_ENV !== 'test') {
  //   res.status(401).send('Sorry Not Logged In')
  // } else {
  try {
    // OB/MS: unnecessary logs
    console.log(req.body)
    const user = await User.findById(req.params.userId * 1)
    let message = await user.update(req.body)
    res.json(message)
  } catch (err) {
    next(err)
  }
  //}
})
