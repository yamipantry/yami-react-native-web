const router = require('express').Router()
const {User, Userfriends} = require('../db/models')
const Sequelize = require('Sequelize')

module.exports = router

//GET /api/friends

router.get('/', async (req, res, next) => {
  try {
    const response = await User.findAll({
      where: {
        id: req.user.id
      },
      include: [
        {
          model: User,
          as: 'friends',
          attributes: [
            'userName',
            'pantryItems',
            'profileImage',
            'id',
            'firstName',
            'lastName'
          ]
        }
      ],
      plain: true
    })

    res.json(response.friends)
  } catch (err) {
    next(err)
  }
})

// POST api/friends
// Assumes friends will be added by username or email

router.post('/', async (req, res, next) => {
  try {
    const findFriend = await User.findOne({
      where: Sequelize.or({userName: req.body.input}, {email: req.body.input}),
      attributes: ['id'],
      raw: true
    })
    const foundId = findFriend.id
    const friend = await Userfriends.findOrCreate({
      userId: req.user.id,
      friendId: foundId
    })
    res.status(201).json(friend)
  } catch (error) {
    next(error)
  }
})
