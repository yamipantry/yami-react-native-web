const router = require('express').Router()
const {User, Userfriends} = require('../db/models')
const Sequelize = require('sequelize')

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
      attributes: [
        'firstName',
        'id',
        'lastName',
        'pantryItems',
        'profileImage',
        'userName'
      ],
      raw: true
    })
    const foundId = findFriend.id

    await Userfriends.findOrCreate({
      where: {
        userId: req.user.id,
        friendId: foundId
      }
    })
    res.status(201).json(findFriend)
  } catch (error) {
    next(error)
  }
})

// DELETE api/friends
// Delete a friend

router.delete('/:Id', async (req, res, next) => {
  try {
    await Userfriends.destroy({
      where: {
        userId: req.user.id,
        friendId: req.params.Id
      }
    })
    res
      .status(200)
      .send('Friend removed.')
      .end()
  } catch (err) {
    next(err)
  }
})
