const User = require('../models/User')
const bcrypt = require('bcrypt')

// @desc Get a user by ID
// @route GET /users/:userId
// @access Private
const getUserById = async (req, res) => {
    const userId = req.params.userId;
    
    // Check userId
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' })
    }

    // Find the user by ID
    const user = await User.findById(userId).select('-password').lean() // don't return password  // without lean mongoose would give a full document with methods like save() we only need data ;

    // Check if the user exists
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    // Return the user data
    res.json({ user });

};

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = async (req, res) => {
    // Get all users from MongoDB
    const users = await User.find().select('-password').lean() // don't return password  // without lean mongoose would give a full document with methods like save() we only need data 
    
    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }
    res.json(users)
};

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = async (req, res) => {
    const { username, password, email } = req.body

    // Confirm data
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicates
    const duplicateUsername = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec() // exec method will execute the query and return a Promise
    
    const duplicateEmail = await User.findOne({ email }).lean().exec() // exec method will execute the query and return a Promise


    if (duplicateUsername) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    if (duplicateEmail) {
        return res.status(409).json({ message: 'Duplicate email address' })
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = { username, "password": hashedPwd, email }
    
    // Create and store new user
    const user = await User.create(userObject)

    if (user) { // Created
        res.status(201).json({ message: `New user '${username}' created` })
    } else {
        res.status(400).json({ message: "Invalid user data received" })
    }
};

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = (req, res) => {
    return res.json({
        message: 'not implemented'
    })
}

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = (req, res) => {
    return res.json({
        message: 'not implemented'
    })
}

module.exports = {
    getUserById,
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
};