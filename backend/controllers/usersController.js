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
const updateUser = async (req, res) => {
    const { id, username, email, currentPassword, newPassword } = req.body

    // Confirm User ID
    if (!id) {
        return res.status(400).json({ message: 'User ID is required' })
    }

    // Confirm user exists to update
    const user = await User.findById(id).exec() // if we requested the lean data in return we would not recieve save method below

    // Check if the user exists
    if (!user) {
        return res.status(400).json({ message: "User not found" })
    }

    // Count the number of truthy values among username, email and newPassword
    const numTruthyValues = [username, email, newPassword].filter(Boolean).length;

    // If the count is 0, handle it as an error
    if (numTruthyValues === 0) {
        return res.status(400).json({ message: 'At least one field from username, email, or newPassword is required' });
    }

    // Update the user based on which parameter is present
    if (username) {
        // Check for duplicate usernames in a case-insensitive manner
        const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()

        // Deny updates if the current user already has this username
        if (duplicate && duplicate._id.toString() === id) {
            return res.status(409).json({ message: 'You already have this username. No changes made.' });
        }

        // Deny updates if another user already has this username
        if (duplicate && duplicate._id.toString() !== id) {
            return res.status(409).json({ message: 'Username already in use by another user. Please choose a different one.' });
        }

        user.username = username
        
    } if (email) {
        
        // Check for duplicate emails
        const duplicate = await User.findOne({ email: email }).lean().exec();

         // Deny updates if the current user already has this email
        if (duplicate && duplicate._id.toString() === id) {
            return res.status(409).json({ message: 'You already have this email. No changes made.' });
        }

        // Deny updates if another user already has this email
        if (duplicate && duplicate._id.toString() !== id) {
            return res.status(409).json({ message: 'Email already in use by another user. Please choose a different one.' });
        }

        user.email = email

    } if (newPassword) {
        // Check if current password exists
        if (!currentPassword) {
            return res.status(400).json({ message: 'Current password is required to update the password' })
        }

        // Check if the current password is correct
        const matchPrev = await bcrypt.compare(currentPassword, user.password)

        if (!matchPrev) return res.status(401).json({ message: 'Current password is incorrect' })

        // Check if the new password is different 
        const matchNew = await bcrypt.compare(newPassword, user.password)

        if (matchNew) return res.status(401).json({ message: 'New password must be different from the current password' })

        // Hash password
        user.password = await bcrypt.hash(newPassword, 10) // salt rounds
    }

    const updatedUser = await user.save();

    // Return a success response if the update is successful
    res.json({ message: `${updatedUser.username} updated successfully` })
};

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = async (req, res) => {
    const { id } = req.body;

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' });
    }

    // Confirm user exists to delete
    const user = await User.findById(id).exec();
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const result = await user.deleteOne();
    const reply = `Username ${user.username} with ID ${user._id} deleted`;
    res.json(reply);
};

module.exports = {
    getUserById,
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
};