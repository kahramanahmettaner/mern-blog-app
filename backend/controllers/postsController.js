const Post = require('../models/Post')
const User = require('../models/User')

// @desc Get all posts
// @route GET /posts
// @access Private
const getAllPosts =  (req, res) => {
    return res.json({
        message: 'not implemented'
    })
};

// @desc Create new post
// @route POST /posts
// @access Private
const createNewPost = (req, res) => {
    return res.json({
        message: 'not implemented'
    })
};

// @desc Update a post
// @route PATCH /posts
// @access Private
const updatePost = (req, res) => {
    return res.json({
        message: 'not implemented'
    })
};

// @desc Delete a post
// @route DELETE /posts
// @access Private
const deletePost = (req, res) => {
    return res.json({
        message: 'not implemented'
    })
};


module.exports = {
    getAllPosts, 
    createNewPost,
    updatePost,
    deletePost
};