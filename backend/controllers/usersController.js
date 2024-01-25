// @desc Get a user by ID
// @route GET /users/:userId
// @access Public
const getUserById = (req, res) => {
    return res.json({
        message: 'not implemented'
    })
}

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