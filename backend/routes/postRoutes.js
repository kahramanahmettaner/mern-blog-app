const express = require('express')
const router = express.Router()
const postsController = require('../controllers/postsController')

router.route('/') // this will match '/posts' 
    .get(postsController.getAllPosts)
    .post(postsController.createNewPost)
    .patch(postsController.updatePost)
    .delete(postsController.deletePost)

module.exports = router