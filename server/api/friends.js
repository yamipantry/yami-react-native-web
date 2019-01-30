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
