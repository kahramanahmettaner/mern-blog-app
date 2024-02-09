const Post = require('../models/Post')
const User = require('../models/User')

// @desc Get all posts
// @route GET /posts
// @access Private
const getAllPosts = async (req, res) => {
    // Get all posts from MongoDB
    const posts = await Post.find().lean() // without lean mongoose would give a full document with methods like save() we only need data 
    
    // if no posts
    if (!posts?.length) {
        return res.status(400).json({ message: 'No posts found' })
    }

    // Add username to each post before sending the response
    const postsWithUser = await Promise.all(posts.map(async (post) => {
        const author = await User.findById(post.author).lean().exec()
        if (!author) {
            return { ...post, username: 'Unknown Author' }
        }
        return { ...post, username: author.username }
    }))

    res.json(postsWithUser)
};

// @desc Create new post
// @route POST /posts
// @access Private
const createNewPost = async (req, res) => {
    const { author, title, text, tags } = req.body

    // Confirm data
    if (!author || !title || !text ) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    
    const postObject = (!Array.isArray(tags) || !tags.length)
    ? { author, title, text }
    : { author, title, text, tags }
    
    // Create and store new post
    const post = await Post.create(postObject)
    
    if (post) { // Created
        res.status(201).json({ message: "New post created"})
    } else {
        res.status(400).json({ message: "Invalid post data received" })
    }
};

// @desc Update a post
// @route PATCH /posts
// @access Private
const updatePost = async (req, res) => {
    const { id, title, text, tags } = req.body

    // Confirm data
    if (!id || !title || !text || !Array.isArray(tags)) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm post exists to update
    const post = await Post.findById(id).exec() // if we requested the lean data in return we would not recieve save method below

    if (!post) {
        return res.status(400).json({ message: "Post not found" })
    }

    post.title = title
    post.text = text
    post.tags = tags

    const updatedPost = await post.save()
    console.log(updatedPost)
    res.json({ message: `${updatedPost.title} updated` })
};

// @desc Delete a post
// @route DELETE /posts
// @access Private
const deletePost = async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Post ID Required' })
    }

    // Confirm post exists to delete 
    const post = await Post.findById(id).exec()

    if (!post) {
        return res.status(400).json({ message: "Post not found" })
    }

    const result = await post.deleteOne()
    const reply = `Post ${result.title} with ID ${result._id} deleted`
    res.json(reply)
};


module.exports = {
    getAllPosts, 
    createNewPost,
    updatePost,
    deletePost
};