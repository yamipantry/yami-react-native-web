const router = require('express').Router()
const {Userfriends} = require('../db/models')

module.exports = router

//GET /api/friends
router.get('/', async (req, res, next) => {
  if (!req.user && process.env.NODE_ENV !== 'test') {
    res.status(401).send('Sorry, try again.  You are not logged in.')
  } else {
    try {
      const friends = await Userfriends.findAll({
        where: {
          userId: req.user.id
        },
        attributes: ['friendId']
      })

      res.json(friends)
    } catch (err) {
      next(err)
    }
  }
})
