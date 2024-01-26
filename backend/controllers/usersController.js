const User = require('../models/User')

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
const getAllUsers = (req, res) => {
    return res.json({
        message: 'not implemented'
    })
}

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = (req, res) => {
    return res.json({
        message: 'not implemented'
    })
}

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