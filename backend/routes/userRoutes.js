const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.route('/') // this will match '/users'
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

router.route('/:userId') // this will match '/users/:userId'
    .get(usersController.getUserById);

module.exports = router