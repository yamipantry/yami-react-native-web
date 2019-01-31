const router = require('express').Router()
const {User} = require('../db/models')

module.exports = router

//GET /api/friends

router.get('/', async (req, res, next) => {
  try {
    const friends = await User.findAll({
      include: [
        {model: User, as: 'friends', attributes: ['userName', 'pantryItems']}
      ],
      where: {
        id: req.user.id
      }
    })

    res.json(friends)
  } catch (err) {
    next(err)
  }
})

// POST api/friends
// We assume req.body contains an Id of a friend to add. E.g., {friendId:17}

router.post('/', async (req, res, next) => {
  try {
    const friend = await User.create(req.body, {
      include: [{model: User, as: 'friends', attributes: ['userName']}],
      where: {
        id: req.user.id
      }
    })
    res.status(201).json(friend)
  } catch (error) {
    next(error)
  }
})
